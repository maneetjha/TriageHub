"""
Core Support Triage Engine for PocketToons.
Handles multi-class ticket classification, confidence scoring, sentiment detection,
safety/risk escalation guardrails, and suggested reply generation.
Features a hybrid local ML classifier and an out-of-the-box LLM classifier.
"""

import sys
import os
import re
import json
from typing import Dict, Any, List, Tuple, Optional
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline

# Ensure sys.path includes project root
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from src.taxonomy import TaxonomyManager
from src.response_generator import ResponseGenerator

class SupportTriageEngine:
    def __init__(self, taxonomy_path: str = "data/taxonomy.json"):
        self.taxonomy = TaxonomyManager(taxonomy_path)
        self.response_generator = ResponseGenerator(app_name=self.taxonomy.taxonomy_data.get("app_name", "PocketToons"))
        self.model_pipeline = None
        self._is_trained = False
        self._init_classifier()

    def _init_classifier(self):
        """Initializes and trains an enriched classifier pipeline on domain taxonomy patterns."""
        train_texts = []
        train_labels = []

        categories = self.taxonomy.taxonomy_data["categories"]

        for cat in categories:
            cat_name = cat["name"]
            desc = cat["description"]
            keywords = cat.get("keywords", [])
            subcategories = cat.get("subcategories", [])

            for _ in range(3):
                train_texts.append(desc)
                train_labels.append(cat_name)

            for _ in range(5):
                train_texts.append(" ".join(keywords))
                train_labels.append(cat_name)

            for sub in subcategories:
                for _ in range(3):
                    train_texts.append(f"{sub} {cat_name}")
                    train_labels.append(cat_name)

            if cat_name == "Billing & Refunds":
                samples = [
                    "charged twice duplicate charge refund credit card money back receipt",
                    "double billed charged 2 times apple pay google play purchase",
                    "request refund accidental purchase overcharged money auto renewal cancellation",
                    "bank statement duplicate charge cancel subscription payment failed invoice",
                    "subscription cancelled still charged overcharge money back receipt"
                ]
            elif cat_name == "Content Access & Coins":
                samples = [
                    "purchased coins balance 0 coins missing coin wallet uncredited",
                    "episode locked spent coins unlock error chapter won't play padlock",
                    "vip membership pass lost restore purchases missing audio show",
                    "bought 500 1000 coins did not receive coins wallet sync error",
                    "redeemed promo code bonus coins missing content library missing"
                ]
            elif cat_name == "Technical & Playback Bugs":
                samples = [
                    "app crash buffering stutter freezing download offline airplane mode",
                    "audio playback error stops screen off bluetooth carplay crash freeze",
                    "black screen app stopped working offline download failed error code",
                    "playback stutter distortion pitch audio cuts off phone screen locked"
                ]
            elif cat_name == "Account & Security":
                samples = [
                    "hacked account unauthorized login otp sms code missing reset password",
                    "gdpr right to be forgotten delete account delete data sign in fail",
                    "stolen account verification code phone number change account locked",
                    "unauthorized access someone logged into my account from foreign country"
                ]
            else: # Feedback & General
                samples = [
                    "love the app narrator voice feedback sleep timer feature request dark mode",
                    "great audio show suggestion add more episodes user interface improvement",
                    "praise voice actor narrator quality content recommendation season 2 request"
                ]

            for s in samples:
                for _ in range(4):
                    train_texts.append(s)
                    train_labels.append(cat_name)

        self.model_pipeline = Pipeline([
            ('tfidf', TfidfVectorizer(ngram_range=(1, 2), min_df=1, sublinear_tf=True)),
            ('clf', LogisticRegression(C=5.0, max_iter=1000))
        ])
        self.model_pipeline.fit(train_texts, train_labels)
        self._is_trained = True

    def _predict_subcategory(self, category: str, text: str) -> str:
        """Determines the subcategory based on keyword matching within the category."""
        subcategories = self.taxonomy.get_subcategories(category)
        if not subcategories:
            return "General"

        text_lower = text.lower()
        sub_scores = {}
        for sub in subcategories:
            sub_words = sub.lower().split()
            score = sum(1 for w in sub_words if w in text_lower)
            sub_scores[sub] = score

        max_sub = max(sub_scores, key=sub_scores.get)
        if sub_scores[max_sub] > 0:
            return max_sub
        return subcategories[0]

    def _analyze_sentiment(self, text: str) -> str:
        """Analyzes text sentiment (Positive, Neutral, Negative, Severe/Frustrated)."""
        text_lower = text.lower()
        severe_keywords = ["hacked", "lawyer", "attorney", "scam", "scammers", "thieves", "police", "chargeback", "horrible", "terrible", "worst app", "stole my money", "sue"]
        negative_keywords = ["error", "fail", "failed", "broken", "issue", "bug", "stuck", "frustrated", "cancel", "disappointed", "refund", "locked"]
        positive_keywords = ["love", "great", "awesome", "amazing", "good", "enjoy", "fantastic", "thanks", "thank you"]

        severe_count = sum(1 for kw in severe_keywords if kw in text_lower)
        if severe_count > 0 or ("!" in text and any(w in text_lower for w in ["refund", "stole", "never"])):
            return "Severe/Frustrated"

        neg_count = sum(1 for kw in negative_keywords if kw in text_lower)
        pos_count = sum(1 for kw in positive_keywords if kw in text_lower)

        if neg_count > pos_count:
            return "Negative"
        elif pos_count > neg_count:
            return "Positive"
        else:
            return "Neutral"

    def _check_escalation(
        self,
        text: str,
        category: str,
        subcategory: str,
        confidence: float,
        sentiment: str
    ) -> Tuple[bool, List[str]]:
        """
        Evaluates escalation safety guardrails.
        Returns (escalate_boolean, list_of_reasons).
        """
        reasons = []
        text_lower = text.lower()

        is_global, g_reason = self.taxonomy.check_global_escalation_rules(text)
        if is_global:
            reasons.append(g_reason)

        if any(kw in text_lower for kw in ["hacked", "unauthorized login", "stolen account", "security breach", "compromised"]):
            reasons.append("Account security / compromise alert")

        if any(kw in text_lower for kw in ["gdpr", "ccpa", "delete my account", "data erasure", "delete personal data"]):
            reasons.append("Regulatory compliance / Data deletion request")

        min_conf = self.taxonomy.taxonomy_data.get("global_escalation_rules", {}).get("min_confidence_threshold", 0.60)
        if confidence < min_conf:
            reasons.append(f"Low classifier confidence ({confidence:.2f} < {min_conf:.2f})")

        if not self.taxonomy.is_auto_reply_eligible(category):
            reasons.append(f"Category '{category}' requires human agent review")

        cat_data = self.taxonomy.categories.get(category, {})
        for trigger in cat_data.get("escalation_triggers", []):
            if trigger.lower() in text_lower:
                reasons.append(f"Category escalation trigger ('{trigger}')")

        if sentiment == "Severe/Frustrated" and category in ["Billing & Refunds", "Account & Security"]:
            if "Severe frustration on sensitive category" not in reasons:
                reasons.append("Severe frustration on sensitive category")

        escalate = len(reasons) > 0
        return escalate, reasons

    def _extract_entities(self, text: str) -> Dict[str, Any]:
        """Extracts customer metadata and transaction parameters from the ticket text using NLP patterns."""
        entities = {
            "user_id": None,
            "order_id": None,
            "amount": None,
            "series": None,
            "device": None
        }

        user_match = re.search(r'\bUSR-\d+\b', text, re.IGNORECASE)
        if user_match:
            entities["user_id"] = user_match.group(0).upper()

        order_match = re.search(r'\b(?:ORD-\d+|GP\.\d+-\d+|order\s*#?\s*\d+)\b', text, re.IGNORECASE)
        if order_match:
            raw_match = order_match.group(0)
            entities["order_id"] = re.sub(r'(?i)order\s*#?\s*', '', raw_match).upper()

        amount_match = re.search(r'\$\d+(?:\.\d{2})?', text)
        if amount_match:
            entities["amount"] = amount_match.group(0)
        else:
            coin_match = re.search(r'\b\d+\s*(?:coins?|coin\s*pack|coin\s*bundle)\b', text, re.IGNORECASE)
            if coin_match:
                entities["amount"] = coin_match.group(0)

        device_keywords = ["iPhone", "Samsung", "Galaxy", "Pixel", "iPad", "Android", "iOS", "CarPlay", "Bluetooth", "Chrome", "Safari", "MacBook"]
        for dev in device_keywords:
            if dev.lower() in text.lower():
                entities["device"] = dev
                break

        shows = [
            "CEO Billionaire", "Vampire Prince", "CEO's Hidden Heiress", "Shadow Monarch",
            "Shadow Hunter", "Vampire Prince", "Reborn Legend", "Alpha King", "Alpha Dragon King"
        ]
        for show in shows:
            if show.lower() in text.lower():
                entities["series"] = show
                break

        return entities

    def _classify_with_llm(
        self,
        api_key: str,
        provider: str,
        subject: str,
        body: str
    ) -> Optional[Dict[str, Any]]:
        """
        Performs out-of-the-box classification using a live generative LLM (Gemini or OpenAI).
        Returns a dictionary containing predicted_category, predicted_subcategory, sentiment, confidence, reasoning.
        """
        categories_list = self.taxonomy.get_category_names()
        
        prompt = (
            f"You are a sophisticated Customer Support Triage AI for PocketToons (an audio-webtoon app).\n"
            f"Your task is to classify the support ticket into exactly one primary category from the taxonomy list below.\n\n"
            f"--- TAXONOMY CATEGORIES ---\n"
        )
        for cat in self.taxonomy.taxonomy_data["categories"]:
            prompt += f"- {cat['name']}: {cat['description']}\n  Subcategories: {', '.join(cat['subcategories'])}\n"

        prompt += (
            f"\n--- SUPPORT TICKET ---\n"
            f"Subject: {subject}\n"
            f"Body: {body}\n\n"
            f"--- INSTRUCTIONS ---\n"
            f"Analyze the ticket and return a JSON object with the following fields:\n"
            f"1. 'category': Must match EXACTLY one of the names in the taxonomy list above: {categories_list}.\n"
            f"2. 'subcategory': A matching subcategory from that category's subcategory list.\n"
            f"3. 'sentiment': One of: ['Positive', 'Neutral', 'Negative', 'Severe/Frustrated'].\n"
            f"4. 'confidence_score': A float between 0.0 and 1.0 indicating your confidence.\n"
            f"5. 'reasoning': A brief 1-sentence explanation of your classification decision.\n\n"
            f"Return ONLY valid JSON. Do not include markdown wraps."
        )

        try:
            if provider == "openai":
                import openai
                client = openai.OpenAI(api_key=api_key)
                response = client.chat.completions.create(
                    model="gpt-4o-mini",
                    messages=[{"role": "user", "content": prompt}],
                    response_format={"type": "json_object"},
                    temperature=0.0
                )
                return json.loads(response.choices[0].message.content.strip())
            elif provider == "gemini":
                import requests
                url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
                headers = {"Content-Type": "application/json"}
                data = {
                    "contents": [{"parts": [{"text": prompt}]}],
                    "generationConfig": {
                        "responseMimeType": "application/json",
                        "temperature": 0.0
                    }
                }
                r = requests.post(url, headers=headers, json=data)
                if r.status_code == 200:
                    result = r.json()
                    raw_text = result['candidates'][0]['content']['parts'][0]['text'].strip()
                    return json.loads(raw_text)
        except Exception as e:
            # Fall back to local classifier if LLM call fails
            print(f"LLM Classification Failed: {e}", file=sys.stderr)
        return None

    def process_ticket(self, ticket: Dict[str, Any], api_key: Optional[str] = None, provider: str = "gemini") -> Dict[str, Any]:
        """
        Main entry point to triage a ticket.
        If an API key is provided, performs semantic classification using the live LLM.
        Otherwise, falls back to the hybrid local ML/keyword classifier.
        """
        subject = ticket.get("subject", "")
        body = ticket.get("body", "")
        full_text = f"{subject} {body}"

        # Try live LLM classifier first if API key is provided
        llm_classified = None
        classification_reasoning = "Derived from local hybrid ML & keyword mapping."
        
        if api_key and api_key.strip():
            llm_classified = self._classify_with_llm(
                api_key=api_key,
                provider=provider,
                subject=subject,
                body=body
            )

        if llm_classified and "category" in llm_classified:
            category = llm_classified["category"]
            subcategory = llm_classified.get("subcategory", "General")
            sentiment = llm_classified.get("sentiment", "Neutral")
            confidence = round(float(llm_classified.get("confidence_score", 0.95)), 2)
            classification_reasoning = llm_classified.get("reasoning", "Decided by live Generative LLM.")
        else:
            # Local ML classification fallback
            probs = self.model_pipeline.predict_proba([full_text])[0]
            classes = self.model_pipeline.classes_
            best_idx = np.argmax(probs)
            ml_category = classes[best_idx]
            raw_prob = float(probs[best_idx])

            # Keyword heuristic boosting
            kw_scores = {cat: self.taxonomy.keyword_score(full_text, cat) for cat in classes}
            best_kw_cat = max(kw_scores, key=kw_scores.get)
            best_kw_score = kw_scores[best_kw_cat]

            if best_kw_score > 0:
                category = ml_category if raw_prob >= 0.35 else best_kw_cat
                confidence = min(0.99, max(raw_prob, 0.70 + (best_kw_score * 0.25)))
            else:
                category = ml_category
                confidence = raw_prob

            confidence = round(float(confidence), 2)
            subcategory = self._predict_subcategory(category, full_text)
            sentiment = self._analyze_sentiment(full_text)

        # 5. Entity Extraction
        entities = self._extract_entities(full_text)

        # 6. Escalation guardrails check
        escalate, escalation_reasons = self._check_escalation(
            full_text, category, subcategory, confidence, sentiment
        )
        escalation_reason_str = " | ".join(escalation_reasons) if escalate else None

        # 7. Suggested response drafting
        suggested_reply = self.response_generator.generate_draft_reply(
            category=category,
            subcategory=subcategory,
            ticket_subject=subject,
            ticket_body=body,
            sentiment=sentiment,
            escalate=escalate,
            entities=entities,
            escalation_reason=escalation_reason_str,
            api_key=api_key,
            provider=provider
        )

        return {
            "ticket_id": ticket.get("ticket_id"),
            "subject": subject,
            "body": body,
            "predicted_category": category,
            "predicted_subcategory": subcategory,
            "confidence_score": confidence,
            "sentiment": sentiment,
            "escalate_to_human": escalate,
            "escalation_reason": escalation_reason_str,
            "suggested_reply": suggested_reply,
            "extracted_entities": entities,
            "classification_reasoning": classification_reasoning,
            "used_llm_classifier": llm_classified is not None
        }

    def batch_process(self, tickets: List[Dict[str, Any]], api_key: Optional[str] = None, provider: str = "gemini") -> List[Dict[str, Any]]:
        """Batch processes a list of tickets."""
        results = []
        for t in tickets:
            res = self.process_ticket(t, api_key=api_key, provider=provider)
            if "ground_truth_category" in t:
                res["ground_truth_category"] = t["ground_truth_category"]
            if "ground_truth_escalate" in t:
                res["ground_truth_escalate"] = t["ground_truth_escalate"]
            results.append(res)
        return results
