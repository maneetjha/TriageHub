// Client-side triage classifier — faithful port of TriageHub's
// src/triage_engine.py (keyword/TF-IDF scoring) and src/response_generator.py
// (templated reply drafting). No ML model, no LLM calls — reproduces the
// same outputs for the same inputs so the Live Simulator and Inbound Ingestor
// stay fully functional without a backend.

import { taxonomy, type Ticket, type TaxonomyCategory } from "./triage-data";
import { createServerFn } from "@tanstack/react-start";

export const proxyLlmCall = createServerFn({ method: "POST" })
  .validator((data: { provider: string; apiKey: string; prompt: string; isJson: boolean }) => data)
  .handler(async ({ data }) => {
    const { provider, apiKey, prompt, isJson } = data;
    const lowerProvider = provider.toLowerCase();
    
    const envKey = lowerProvider === "openai" ? process.env.OPENAI_API_KEY : process.env.GEMINI_API_KEY;
    const finalApiKey = apiKey?.trim() || envKey?.trim();

    console.log(`[LLM Server Proxy] Provider: ${provider}, UI Key present: ${!!apiKey?.trim()}, Env Key present: ${!!envKey?.trim()}, Final Key present: ${!!finalApiKey}`);

    if (!finalApiKey) {
      throw new Error(`API Key for ${provider} is not configured. Please enter it in the settings sidebar or add it to your .env file as ${lowerProvider === "openai" ? "OPENAI_API_KEY" : "GEMINI_API_KEY"}.`);
    }
    
    if (lowerProvider === "openai") {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${finalApiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
          response_format: isJson ? { type: "json_object" } : undefined,
          temperature: isJson ? 0.0 : 0.7
        })
      });
      if (!response.ok) {
        throw new Error(`OpenAI request failed status: ${response.status}`);
      }
      const res = await response.json();
      return res.choices[0].message.content.trim();
    } else if (lowerProvider === "gemini") {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${finalApiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: isJson ? "application/json" : undefined,
            temperature: isJson ? 0.0 : 0.7
          }
        })
      });
      if (!response.ok) {
        const errText = await response.text().catch(() => "");
        throw new Error(`Gemini request failed status: ${response.status} (Details: ${errText})`);
      }
      const res = await response.json();
      return res.candidates[0].content.parts[0].text.trim();
    }
    throw new Error(`Unknown provider: ${provider}`);
  });

const SHOWS = [
  "CEO Billionaire", "Vampire Prince", "CEO's Hidden Heiress", "Shadow Monarch",
  "Shadow Hunter", "Reborn Legend", "Alpha King", "Alpha Dragon King",
];

const DEVICE_KEYWORDS = [
  "iPhone", "Samsung", "Galaxy", "Pixel", "iPad", "Android", "iOS", "CarPlay",
  "Bluetooth", "Chrome", "Safari", "MacBook",
];

function scoreCategory(text: string, cat: TaxonomyCategory): number {
  const t = text.toLowerCase();
  let score = 0;
  for (const kw of cat.keywords) {
    if (t.includes(kw.toLowerCase())) score += 2;
    // bigram-ish proximity boost
    const parts = kw.toLowerCase().split(/\s+/);
    if (parts.length > 1 && t.includes(parts[0])) score += 0.5;
  }
  for (const sub of cat.subcategories) {
    for (const w of sub.toLowerCase().split(/[\s/]+/)) {
      if (w.length > 2 && t.includes(w)) score += 0.8;
    }
  }
  for (const w of cat.description.toLowerCase().split(/\W+/)) {
    if (w.length > 4 && t.includes(w)) score += 0.2;
  }
  return score;
}

function predictSubcategory(category: string, text: string): string {
  const cat = taxonomy.categories.find((c) => c.name === category);
  if (!cat) return "General";
  const t = text.toLowerCase();
  let best = cat.subcategories[0];
  let bestScore = 0;
  for (const sub of cat.subcategories) {
    let s = 0;
    for (const w of sub.toLowerCase().split(/[\s/]+/)) {
      if (w.length > 2 && t.includes(w)) s += 1;
    }
    if (s > bestScore) { bestScore = s; best = sub; }
  }
  return best;
}

function analyzeSentiment(text: string): string {
  const t = text.toLowerCase();
  const severe = ["hacked", "lawyer", "attorney", "scam", "scammers", "thieves", "police", "chargeback", "horrible", "terrible", "worst app", "stole my money", "sue"];
  const negative = ["error", "fail", "failed", "broken", "issue", "bug", "stuck", "frustrated", "cancel", "disappointed", "refund", "locked"];
  const positive = ["love", "great", "awesome", "amazing", "good", "enjoy", "fantastic", "thanks", "thank you"];

  const severeCount = severe.filter((k) => t.includes(k)).length;
  if (severeCount > 0 || (t.includes("!") && ["refund", "stole", "never"].some((w) => t.includes(w)))) {
    return "Severe/Frustrated";
  }
  const neg = negative.filter((k) => t.includes(k)).length;
  const pos = positive.filter((k) => t.includes(k)).length;
  if (neg > pos) return "Negative";
  if (pos > neg) return "Positive";
  return "Neutral";
}

function checkEscalation(
  text: string,
  category: string,
  confidence: number,
  sentiment: string
): { escalate: boolean; reasons: string[] } {
  const t = text.toLowerCase();
  const reasons: string[] = [];
  const rules = taxonomy.global_escalation_rules;

  if (rules.legal_keywords.some((k) => t.includes(k.toLowerCase()))) {
    reasons.push("Legal/chargeback threat detected in message");
  }
  if (rules.abuse_keywords.some((k) => t.includes(k.toLowerCase()))) {
    reasons.push("Abuse / scam accusation language detected");
  }
  if (["hacked", "unauthorized login", "stolen account", "security breach", "compromised"].some((k) => t.includes(k))) {
    reasons.push("Account security / compromise alert");
  }
  if (["gdpr", "ccpa", "delete my account", "data erasure", "delete personal data"].some((k) => t.includes(k))) {
    reasons.push("Regulatory compliance / Data deletion request");
  }
  const minConf = rules.min_confidence_threshold ?? 0.6;
  if (confidence < minConf) reasons.push(`Low classifier confidence (${confidence.toFixed(2)} < ${minConf.toFixed(2)})`);

  const cat = taxonomy.categories.find((c) => c.name === category);
  if (cat && !cat.auto_reply_eligible) reasons.push(`Category '${category}' requires human agent review`);
  if (cat) {
    for (const trigger of cat.escalation_triggers) {
      if (t.includes(trigger.toLowerCase())) reasons.push(`Category escalation trigger ('${trigger}')`);
    }
  }
  if (sentiment === "Severe/Frustrated" && ["Billing & Refunds", "Account & Security"].includes(category)) {
    if (!reasons.includes("Severe frustration on sensitive category")) reasons.push("Severe frustration on sensitive category");
  }
  return { escalate: reasons.length > 0, reasons };
}

function extractEntities(text: string): Record<string, string | null> {
  const entities: Record<string, string | null> = {
    user_id: null, order_id: null, amount: null, series: null, device: null,
  };
  const userMatch = text.match(/\bUSR-\d+\b/i);
  if (userMatch) entities.user_id = userMatch[0].toUpperCase();
  const orderMatch = text.match(/\b(?:ORD-\d+|GP\.\d+-\d+|order\s*#?\s*\d+)\b/i);
  if (orderMatch) entities.order_id = orderMatch[0].replace(/order\s*#?\s*/i, "").toUpperCase();
  const amountMatch = text.match(/\$\d+(?:\.\d{2})?/);
  if (amountMatch) entities.amount = amountMatch[0];
  else {
    const coinMatch = text.match(/\b\d+\s*(?:coins?|coin\s*pack|coin\s*bundle)\b/i);
    if (coinMatch) entities.amount = coinMatch[0];
  }
  const tl = text.toLowerCase();
  for (const dev of DEVICE_KEYWORDS) {
    if (tl.includes(dev.toLowerCase())) { entities.device = dev; break; }
  }
  for (const show of SHOWS) {
    if (tl.includes(show.toLowerCase())) { entities.series = show; break; }
  }
  return entities;
}

export interface TriageResult {
  ticket_id: string;
  subject: string;
  body: string;
  predicted_category: string;
  predicted_subcategory: string;
  confidence_score: number;
  sentiment: string;
  escalate_to_human: boolean;
  escalation_reason: string | null;
  suggested_reply: string;
  extracted_entities: Record<string, string | null>;
  classification_reasoning: string;
  used_llm_classifier: boolean;
  device_info: string;
  app_version: string;
}

function buildReply(
  category: string,
  subcategory: string,
  escalate: boolean,
  entities: Record<string, string | null>,
  escalationReason: string | null
): string {
  const app = taxonomy.app_name;
  if (escalate) {
    const reasonMsg = escalationReason ? `Reason: ${escalationReason}` : "Requires manual review.";
    return (
      `[HUMAN AGENT DRAFT ONLY - DO NOT AUTO-SEND]\n` +
      `Escalation Trigger: ${reasonMsg}\n\n` +
      `Hello,\n\nThank you for reaching out to ${app} Support. ` +
      `Your request has been escalated to a senior support specialist for priority review. ` +
      `Our engineering and billing team will inspect your account details and follow up with you within 2-4 hours.\n\n` +
      `Best regards,\n${app} Tier 2 Escalations Team`
    );
  }
  const userStr = entities.user_id || "your account";
  const orderStr = entities.order_id ? `Order #${entities.order_id}` : "your transaction";
  const amountStr = entities.amount || "your coin pack";
  const seriesStr = entities.series ? `'${entities.series}'` : "your favorite show";
  const deviceStr = entities.device || "your device";

  if (category === "Billing & Refunds") {
    if (subcategory === "Double Billing")
      return `Hello,\n\nThank you for contacting ${app} Support!\n\nWe apologize for the inconvenience caused by the duplicate charge for ${amountStr} regarding ${orderStr}.\n\nOur billing system has flagged this double billing issue, and we have submitted a reversal request to your bank. Depending on your financial institution or app store, the refunded amount should reflect in your bank statement within 3 to 5 business days.\n\nIf you need any further assistance, please reply directly to this message.\n\nWarm regards,\n${app} Support Team`;
    if (subcategory === "Refund Request")
      return `Hello,\n\nThank you for reaching out to ${app} Billing Team regarding your refund request.\n\nWe understand accidental purchases happen. We have verified ${orderStr} for ${amountStr} on your user profile (${userStr}). If this purchase was made within the last 14 days and the coin balance/content remains unused, a full refund to your original payment method will be processed within 24-48 hours.\n\nLet us know if you have any questions.\n\nBest regards,\n${app} Billing Team`;
    if (subcategory === "Subscription Cancellation Issue")
      return `Hello,\n\nThank you for contacting ${app}. We're sorry to see you go!\n\nWe have verified user profile ${userStr} and stopped any future recurring auto-renewals for your monthly subscription pass. You will continue to have full access to your VIP privileges until the end of your current billing cycle.\n\nYou can also manage your subscriptions directly via your device settings:\n• iOS: Settings > Apple ID > Subscriptions > PocketToons\n• Android: Play Store > Profile > Payments & subscriptions > Subscriptions\n\nLet us know if you need anything else!\n\nWarm regards,\n${app} Customer Care`;
    return `Hello,\n\nThank you for reaching out to ${app} Billing Support.\n\nWe have received your billing query regarding ${orderStr}. Our billing team is reviewing your transaction logs. If any discrepancies or unauthorized charges are identified, rest assured they will be immediately adjusted or refunded.\n\nThank you for your patience,\n${app} Support Team`;
  }
  if (category === "Content Access & Coins") {
    if (subcategory === "Coins Not Credited")
      return `Hello,\n\nThank you for bringing this to our attention!\n\nWe apologize for the delay in crediting your purchased ${amountStr} to your wallet under ${userStr} for ${orderStr}.\n\nTo immediately sync your coin wallet, please try the following steps:\n1. Force-close the ${app} app and re-open it.\n2. Go to Profile > Account Settings and tap 'Sync Wallet Balance'.\n\nOur system has also triggered a manual sync for your recent order. Your coin balance should reflect within 5-10 minutes. If your balance does not update, please reply directly to this email.\n\nBest regards,\n${app} Content Team`;
    if (subcategory === "Episode Locked After Unlock")
      return `Hello,\n\nWe apologize for the glitch with your unlocked content for ${seriesStr}. Our content team has refreshed your library access permissions.\n\nTo resolve this immediately:\n1. Force-close and relaunch the app.\n2. Go to Profile > My Library > tap 'Restore Purchases'.\n\nYour episode should now be accessible. If still locked, reply with a screenshot and we'll fix it right away.\n\nBest regards,\n${app} Content Team`;
    if (subcategory === "VIP Membership Missing")
      return `Hello,\n\nThank you for reaching out about your VIP Pass.\n\nWe have verified your purchase and restored your VIP Membership on profile ${userStr}. Your premium access should now be active — please log out and back in to refresh your benefits.\n\nIf your VIP badge still doesn't appear, tap 'Restore Purchases' under Settings. We're here if you need anything else.\n\nBest regards,\n${app} VIP Support`;
    return `Hello,\n\nThank you for reaching out to ${app} Content Team.\n\nWe have refreshed your account library permissions for ${userStr}. Please log out and back in to see ${seriesStr}.\n\nWarm regards,\n${app} Team`;
  }
  if (category === "Technical & Playback Bugs")
    return `Hello,\n\nThank you for reporting this playback issue on ${deviceStr} to ${app} Engineering.\n\nWe recommend attempting the following troubleshooting steps:\n1. Ensure your app is updated to the latest version in App Store / Play Store.\n2. Go to Settings > Storage & Cache > Clear Cache.\n3. Toggle Airplane Mode ON for 5 seconds and back OFF.\n\nOur tech team has logged your device details (${deviceStr}) for further diagnostics on this bug.\n\nBest regards,\n${app} Tech Support`;
  if (category === "Feedback & General")
    return `Hello,\n\nThank you so much for taking the time to share your feedback about ${seriesStr} with ${app}!\n\nWe love hearing from our listeners. Your suggestions have been shared directly with our Product and Content teams as we work on upcoming app updates and show releases.\n\nThanks for being a valued part of our community!\n\nWarmly,\n${app} Product Team`;
  return `Hello,\n\nThank you for reaching out to ${app} Support. We have received your ticket and our support specialists are investigating your request.\n\nBest regards,\n${app} Support Team`;
}

export interface ProcessInput {
  ticket_id?: string;
  subject: string;
  body: string;
  device_info?: string;
  app_version?: string;
}

export async function processTicket(
  input: ProcessInput,
  provider?: string,
  apiKey?: string
): Promise<TriageResult> {
  const subject = input.subject || "";
  const body = input.body || "";
  const fullText = `${subject} ${body}`;

  let category = "";
  let subcategory = "";
  let sentiment = "";
  let confidence = 0.5;
  let reasoning = "";
  let usedLlm = false;

  if (apiKey && apiKey.trim() && provider && provider !== "Local") {
    try {
      const lowerProvider = provider.toLowerCase();
      const categoriesList = taxonomy.categories.map((c) => c.name);
      
      let prompt = `You are a sophisticated Customer Support Triage AI for PocketToons (an audio-webtoon app).
Your task is to classify the support ticket into exactly one primary category from the taxonomy list below.

--- TAXONOMY CATEGORIES ---
`;
      for (const cat of taxonomy.categories) {
        prompt += `- ${cat.name}: ${cat.description}\n  Subcategories: ${cat.subcategories.join(", ")}\n`;
      }

      prompt += `
--- SUPPORT TICKET ---
Subject: ${subject}
Body: ${body}

--- INSTRUCTIONS ---
Analyze the ticket and return a JSON object with the following fields:
1. 'category': Must match EXACTLY one of the names in the taxonomy list above: ${JSON.stringify(categoriesList)}.
2. 'subcategory': A matching subcategory from that category's subcategory list.
3. 'sentiment': One of: ['Positive', 'Neutral', 'Negative', 'Severe/Frustrated'].
4. 'confidence_score': A float between 0.0 and 1.0 indicating your confidence.
5. 'reasoning': A brief 1-sentence explanation of your classification decision.

Return ONLY valid JSON. Do not include markdown wraps.`;

      const rawResponseText = await proxyLlmCall({ data: { provider, apiKey, prompt, isJson: true } });

      if (rawResponseText) {
        const parsed = JSON.parse(rawResponseText);
        if (parsed.category) {
          category = parsed.category;
          subcategory = parsed.subcategory || "General";
          sentiment = parsed.sentiment || "Neutral";
          confidence = parsed.confidence_score || 0.95;
          reasoning = parsed.reasoning || "Decided by live Generative LLM.";
          usedLlm = true;
        }
      }
    } catch (e) {
      console.error("LLM classification failed, falling back to local model:", e);
    }
  }

  // Fallback to local classifier if not using LLM
  if (!usedLlm) {
    return processTicketSync(input);
  }

  const entities = extractEntities(fullText);
  const { escalate, reasons } = checkEscalation(fullText, category, confidence, sentiment);
  const escalationReason = reasons.length ? reasons.join("; ") : null;

  return {
    ticket_id: input.ticket_id || `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
    subject,
    body,
    predicted_category: category,
    predicted_subcategory: subcategory,
    confidence_score: confidence,
    sentiment,
    escalate_to_human: escalate,
    escalation_reason: escalationReason,
    suggested_reply: buildReply(category, subcategory, escalate, entities, escalationReason),
    extracted_entities: entities,
    classification_reasoning: reasoning,
    used_llm_classifier: usedLlm,
    device_info: input.device_info || "Unknown Device",
    app_version: input.app_version || "Unknown Version",
  };
}

export function processTicketSync(input: ProcessInput): TriageResult {
  const subject = input.subject || "";
  const body = input.body || "";
  const fullText = `${subject} ${body}`;

  const scores = taxonomy.categories.map((c) => ({ cat: c, score: scoreCategory(fullText, c) }));
  scores.sort((a, b) => b.score - a.score);
  const best = scores[0];

  const top = best.score;
  const runner = scores[1] ? scores[1].score : 0;
  let conf = top <= 0 ? 0.5 : Math.min(0.97, 0.62 + (top - runner) * 0.04 + top * 0.012);
  const confidence = Math.max(0.5, Math.round(conf * 100) / 100);

  const category = best.cat.name;
  const subcategory = predictSubcategory(category, fullText);
  const sentiment = analyzeSentiment(fullText);
  const reasoning = best.score > 0
    ? `Strong keyword match for {category} taxonomy terms in subject and body.`
    : `No strong taxonomy match; defaulted to closest category (${category}).`;

  const entities = extractEntities(fullText);
  const { escalate, reasons } = checkEscalation(fullText, category, confidence, sentiment);
  const escalationReason = reasons.length ? reasons.join("; ") : null;

  return {
    ticket_id: input.ticket_id || `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
    subject,
    body,
    predicted_category: category,
    predicted_subcategory: subcategory,
    confidence_score: confidence,
    sentiment,
    escalate_to_human: escalate,
    escalation_reason: escalationReason,
    suggested_reply: buildReply(category, subcategory, escalate, entities, escalationReason),
    extracted_entities: entities,
    classification_reasoning: reasoning,
    used_llm_classifier: false,
    device_info: input.device_info || "Unknown Device",
    app_version: input.app_version || "Unknown Version",
  };
}

export function resultToTicket(r: TriageResult): Ticket {
  return { ...r, escalation_reason: r.escalation_reason };
}

export const SIM_PRESETS = [
  {
    label: "Double Charge",
    subject: "Charged twice for 500 coins",
    body: "Hi, I bought the $9.99 coin pack on my iPhone yesterday. My bank shows two pending charges of $9.99 for order ORD-99120. Please refund the duplicate $9.99.",
  },
  {
    label: "Coins Missing",
    subject: "Coins not added after payment",
    body: "I purchased 1000 coins for $14.99 30 minutes ago via Apple Pay. Order ORD-881203, but my coin wallet still shows 0. User ID USR-49120. Credit my coins!",
  },
  {
    label: "Episode Locked",
    subject: "Episode locked after spending 10 coins",
    body: "I spent 10 coins to unlock Episode 15 of Alpha Dragon King. Coins were deducted, but the episode still shows a padlock icon. Unlock it please!",
  },
  {
    label: "Legal Threat",
    subject: "Fraudulent charge on card - contacting lawyer",
    body: "I saw a charge of $49.99 from PocketToons on my credit card. I never signed up! Refund me now or I will notify my lawyer and file a bank chargeback.",
  },
  {
    label: "Hacked Account",
    subject: "URGENT: Someone hacked my account!",
    body: "I got a notification about a login from Germany. I live in Texas! Someone spent 800 of my saved coins! Freeze my account and reset my password immediately!",
  },
];

export async function generateLlmReply(
  ticket: { subject: string; body: string; predicted_category: string; predicted_subcategory: string },
  provider: string,
  apiKey: string
): Promise<string> {
  const lowerProvider = provider.toLowerCase();
  const prompt = `You are a professional, empathetic customer support specialist for PocketToons (an audio-webtoon app).
Draft a concise, helpful, and polite reply to the support ticket below.

Ticket Subject: ${ticket.subject}
Ticket Body: ${ticket.body}
Predicted Category: ${ticket.predicted_category}
Predicted Subcategory: ${ticket.predicted_subcategory}

--- INSTRUCTIONS ---
- Address the user politely.
- Provide clear, actionable instructions or troubleshooting steps based on their category.
- Do not make up internal details, keep it professional.
- Do not wrap the response in quotes or markdown formatting. Keep it plain text ready to be sent.`;

  try {
    return await proxyLlmCall({ data: { provider, apiKey, prompt, isJson: false } });
  } catch (e) {
    console.error("AI reply generation failed:", e);
  }
  return "Failed to generate AI response. Please verify your API Key and connection.";
}
