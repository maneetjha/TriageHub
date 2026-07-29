"""
Suggested Response Generator for PocketToons Support Agent.
Drafts personalized, entity-aware support responses for tickets dynamically,
and supports live generative LLM API calls when an API key is supplied.
"""

from typing import Dict, Any, Optional

class ResponseGenerator:
    def __init__(self, app_name: str = "PocketToons"):
        self.app_name = app_name

    def generate_llm_reply(
        self,
        api_key: str,
        provider: str,
        category: str,
        subcategory: str,
        ticket_subject: str,
        ticket_body: str,
        sentiment: str,
        entities: Dict[str, Any]
    ) -> Optional[str]:
        """
        Calls a live LLM API (OpenAI or Gemini) using the provided API key
        to draft a custom, personalized response tailored to the user's issue.
        """
        prompt = (
            f"You are a professional, empathetic customer support agent for the mobile app '{self.app_name}'.\n"
            f"Draft a personalized, context-aware reply to the customer's support ticket below.\n\n"
            f"--- TICKET DETAILS ---\n"
            f"Subject: {ticket_subject}\n"
            f"Body: {ticket_body}\n"
            f"Detected Sentiment: {sentiment}\n"
            f"Category: {category} ({subcategory})\n"
            f"Extracted Entities:\n"
            f" - User ID: {entities.get('user_id', 'Not Specified')}\n"
            f" - Order ID: {entities.get('order_id', 'Not Specified')}\n"
            f" - Amount/Coins: {entities.get('amount', 'Not Specified')}\n"
            f" - Series/Show: {entities.get('series', 'Not Specified')}\n"
            f" - Device: {entities.get('device', 'Not Specified')}\n\n"
            f"--- INSTRUCTIONS ---\n"
            f"1. Be empathetic and professional.\n"
            f"2. Reference their User ID, Order ID, Amount, or Series specifically if they were found.\n"
            f"3. Provide concrete troubleshooting or resolution steps based on the category.\n"
            f"4. Keep the message concise (150-250 words).\n"
            f"5. End with: 'Warm regards, {self.app_name} AI Support Team'."
        )

        try:
            if provider == "openai":
                import openai
                client = openai.OpenAI(api_key=api_key)
                response = client.chat.completions.create(
                    model="gpt-4o-mini",
                    messages=[{"role": "user", "content": prompt}],
                    max_tokens=350,
                    temperature=0.7
                )
                return response.choices[0].message.content.strip()
            elif provider == "gemini":
                # Using standard requests to call Google Gemini API if user provides key
                import requests
                url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
                headers = {"Content-Type": "application/json"}
                data = {
                    "contents": [{"parts": [{"text": prompt}]}],
                    "generationConfig": {"maxOutputTokens": 350, "temperature": 0.7}
                }
                r = requests.post(url, headers=headers, json=data)
                if r.status_code == 200:
                    result = r.json()
                    return result['candidates'][0]['content']['parts'][0]['text'].strip()
                else:
                    return f"[Error calling Gemini API: {r.status_code} - {r.text}]"
        except Exception as e:
            return f"[Failed to call generative LLM: {str(e)}]"
        return None

    def generate_draft_reply(
        self,
        category: str,
        subcategory: str,
        ticket_subject: str,
        ticket_body: str,
        sentiment: str,
        escalate: bool,
        entities: Dict[str, Any],
        escalation_reason: Optional[str] = None,
        api_key: Optional[str] = None,
        provider: str = "gemini"
    ) -> Optional[str]:
        """
        Generates a suggested reply. If an API key is provided, calls the generative LLM.
        Otherwise, performs dynamic template-based entity interpolation.
        """
        if escalate:
            reason_msg = f"Reason: {escalation_reason}" if escalation_reason else "Requires manual review."
            return (
                f"[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]\n"
                f"Escalation Trigger: {reason_msg}\n\n"
                f"Hello,\n\nThank you for reaching out to {self.app_name} Support. "
                f"Your request has been escalated to a senior support specialist for priority review. "
                f"Our engineering and billing team will inspect your account details and follow up with you within 2-4 hours.\n\n"
                f"Best regards,\n{self.app_name} Tier 2 Escalations Team"
            )

        # If LLM API Key is provided, generate a truly custom dynamic reply
        if api_key and api_key.strip():
            llm_reply = self.generate_llm_reply(
                api_key=api_key,
                provider=provider,
                category=category,
                subcategory=subcategory,
                ticket_subject=ticket_subject,
                ticket_body=ticket_body,
                sentiment=sentiment,
                entities=entities
            )
            if llm_reply:
                return llm_reply

        # Fallback to smart parameter-interpolated custom builder
        user_str = entities.get("user_id", "your account")
        order_str = f"Order #{entities['order_id']}" if entities.get("order_id") else "your transaction"
        amount_str = entities.get("amount", "your coin pack")
        series_str = f"'{entities['series']}'" if entities.get("series") else "your favorite show"
        device_str = entities.get("device", "your device")

        # Dynamic replies tailored to extracted variables
        if category == "Billing & Refunds":
            if subcategory == "Double Billing":
                return (
                    f"Hello,\n\nThank you for contacting {self.app_name} Support!\n\n"
                    f"We apologize for the inconvenience caused by the duplicate charge for {amount_str} regarding {order_str}.\n\n"
                    f"Our billing system has flagged this double billing issue, and we have submitted a reversal request to your bank. "
                    f"Depending on your financial institution or app store, the refunded amount should reflect in your bank statement within 3 to 5 business days.\n\n"
                    f"If you need any further assistance, please reply directly to this message.\n\n"
                    f"Warm regards,\n{self.app_name} Support Team"
                )

            elif subcategory == "Refund Request":
                return (
                    f"Hello,\n\nThank you for reaching out to {self.app_name} Billing Team regarding your refund request.\n\n"
                    f"We understand accidental purchases happen. We have verified {order_str} for {amount_str} on your user profile ({user_str}). "
                    f"If this purchase was made within the last 14 days and the coin balance/content remains unused, "
                    f"a full refund to your original payment method will be processed within 24-48 hours.\n\n"
                    f"Let us know if you have any questions.\n\n"
                    f"Best regards,\n{self.app_name} Billing Team"
                )

            elif subcategory == "Subscription Cancellation Issue":
                return (
                    f"Hello,\n\nThank you for contacting {self.app_name}. We're sorry to see you go!\n\n"
                    f"We have verified user profile {user_str} and stopped any future recurring auto-renewals for your monthly subscription pass. "
                    f"You will continue to have full access to your VIP privileges until the end of your current billing cycle.\n\n"
                    f"You can also manage your subscriptions directly via your device settings:\n"
                    f"• iOS: Settings > Apple ID > Subscriptions > PocketToons\n"
                    f"• Android: Play Store > Profile > Payments & subscriptions > Subscriptions\n\n"
                    f"Let us know if you need anything else!\n\n"
                    f"Warm regards,\n{self.app_name} Customer Care"
                )

            else:
                return (
                    f"Hello,\n\nThank you for reaching out to {self.app_name} Billing Support.\n\n"
                    f"We have received your billing query regarding {order_str}. Our billing team is reviewing your transaction logs. "
                    f"If any discrepancies or unauthorized charges are identified, rest assured they will be immediately adjusted or refunded.\n\n"
                    f"Thank you for your patience,\n{self.app_name} Support Team"
                )

        elif category == "Content Access & Coins":
            if subcategory == "Coins Not Credited":
                return (
                    f"Hello,\n\nThank you for bringing this to our attention!\n\n"
                    f"We apologize for the delay in crediting your purchased {amount_str} to your wallet under {user_str} for {order_str}.\n\n"
                    f"To immediately sync your coin wallet, please try the following steps:\n"
                    f"1. Force-close the {self.app_name} app and re-open it.\n"
                    f"2. Go to Profile > Account Settings and tap 'Sync Wallet Balance'.\n\n"
                    f"Our system has also triggered a manual sync for your recent order. Your coin balance should reflect within 5-10 minutes. "
                    f"If your balance does not update, please reply directly to this email.\n\n"
                    f"Best regards,\n{self.app_name} Content Team"
                )

            elif subcategory == "Episode Locked After Unlock":
                return (
                    f"Hello,\n\nWe apologize for the glitch with unlocked episodes on {series_str}!\n\n"
                    f"We have refreshed your content access tokens on our server for your account {user_str}. "
                    f"Please force-close the app, reopen the show page, and tap 'Restore Unlocked Episodes'. "
                    f"You should now be able to play all unlocked chapters smoothly without any extra coin deductions.\n\n"
                    f"Happy listening!\n{self.app_name} Support Team"
                )

            elif subcategory == "VIP Membership Missing":
                return (
                    f"Hello,\n\nThank you for contacting {self.app_name} Support.\n\n"
                    f"We've resynced your VIP subscription status across our servers for user {user_str}. "
                    f"Please tap 'Restore Purchases' in the App Settings menu on {device_str} to reactivate your VIP perks.\n\n"
                    f"Let us know if you continue experiencing issues.\n\n"
                    f"Best regards,\n{self.app_name} VIP Support"
                )

            else:
                return (
                    f"Hello,\n\nThank you for reaching out to {self.app_name} Content Team.\n\n"
                    f"We have refreshed your account library permissions for {user_str}. Please log out and back in to see {series_str}.\n\n"
                    f"Warm regards,\n{self.app_name} Team"
                )

        elif category == "Technical & Playback Bugs":
            return (
                f"Hello,\n\nThank you for reporting this playback issue on {device_str} to {self.app_name} Engineering.\n\n"
                f"We recommend attempting the following troubleshooting steps:\n"
                f"1. Ensure your app is updated to the latest version in App Store / Play Store.\n"
                f"2. Go to Settings > Storage & Cache > Clear Cache.\n"
                f"3. Toggle Airplane Mode ON for 5 seconds and back OFF.\n\n"
                f"Our tech team has logged your device details ({device_str}) for further diagnostics on this bug.\n\n"
                f"Best regards,\n{self.app_name} Tech Support"
            )

        elif category == "Feedback & General":
            return (
                f"Hello,\n\nThank you so much for taking the time to share your feedback about {series_str} with {self.app_name}!\n\n"
                f"We love hearing from our listeners. Your suggestions have been shared directly with our Product and Content teams "
                f"as we work on upcoming app updates and show releases.\n\n"
                f"Thanks for being a valued part of our community!\n\n"
                f"Warmly,\n{self.app_name} Product Team"
            )

        else:
            return (
                f"Hello,\n\nThank you for reaching out to {self.app_name} Support. "
                f"We have received your ticket and our support specialists are investigating your request.\n\n"
                f"Best regards,\n{self.app_name} Support Team"
            )
