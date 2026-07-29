"""
Synthetic Support Ticket Generator for PocketToons (Consumer Audio/Webtoon App)
Generates 200 anonymized, realistic support tickets across 5 categories,
plus a 25-ticket gold-labeled evaluation dataset.
"""

import json
import os
import random
import pandas as pd
from datetime import datetime, timedelta

def generate_tickets(num_tickets=200, seed=42):
    random.seed(seed)

    devices = ["iPhone 14 Pro (iOS 17.4)", "Samsung Galaxy S23 (Android 14)", "Pixel 8 (Android 14)", "iPad Air (iOS 17.2)", "Xiaomi Redmi Note 12 (Android 13)", "Web Browser (Chrome 122)"]
    app_versions = ["v3.12.0", "v3.12.1", "v3.11.8", "v3.10.4"]
    channels = ["Mobile App", "In-App Form", "Email Support", "Web Help Center"]
    users = [f"USR-{random.randint(10000, 99999)}" for _ in range(150)]

    categories_template = {
        "Billing & Refunds": [
            {
                "sub": "Double Billing",
                "subjects": [
                    "Charged twice for 500 Coin Pack",
                    "Duplicate charge on my credit card receipt #{order_id}",
                    "App Store charged me two times for VIP monthly pass",
                    "Double billing issue on order {order_id}"
                ],
                "bodies": [
                    "Hi, I bought the $9.99 coin bundle yesterday on my iPhone. My bank statement shows two pending charges of $9.99 on the same minute! Transaction ID: {order_id}. Please refund the extra $9.99.",
                    "Hello team, I was charged twice for the monthly VIP pass ($14.99 x 2). I only pressed subscribe once. Please reverse the duplicate payment immediately.",
                    "I checked my Google Play receipt and saw two transactions for order {order_id}. I only received 500 coins once. Please refund the second charge."
                ],
                "expected_escalate": False,
                "reason": None
            },
            {
                "sub": "Unauthorized Charge",
                "subjects": [
                    "Unrecognized charge of $49.99 on my statement",
                    "Unauthorized auto-renewal after cancellation",
                    "Fraudulent charge from PocketToons",
                    "I did not authorize this purchase"
                ],
                "bodies": [
                    "I noticed a charge of $49.99 from PocketToons on my credit card today. I cancelled my subscription last month! This is an unauthorized charge. Refund me now or I will file a bank chargeback.",
                    "My credit card was charged $19.99 for coins I never purchased. I haven't opened the app in weeks. Please investigate this fraudulent charge and issue a full refund.",
                    "I am contacting my bank and attorney if this $50 unauthorized renewal is not refunded immediately. Order ID {order_id}."
                ],
                "expected_escalate": True,
                "reason": "Threat of bank chargeback / legal action or unauthorized fraud report"
            },
            {
                "sub": "Refund Request",
                "subjects": [
                    "Refund request for accidental purchase",
                    "Need refund for coin pack - child purchased by mistake",
                    "Refund for unlistened audiobook season",
                    "Requesting refund for Order #{order_id}"
                ],
                "bodies": [
                    "My 6-year-old toddler tapped the screen and accidentally bought the 2000 coins pack for $29.99. None of the coins have been used yet. Can you please process a refund?",
                    "I accidentally bought the wrong coin tier ($19.99 instead of $4.99). I haven't spent any of the coins. Please refund Order #{order_id} so I can buy the correct one.",
                    "The audio quality of the series 'The Billionaire's Secret' is unlistenable and muffled. I want a refund of the $9.99 VIP pass I bought 2 hours ago."
                ],
                "expected_escalate": False,
                "reason": None
            },
            {
                "sub": "Subscription Cancellation Issue",
                "subjects": [
                    "Cannot cancel monthly subscription",
                    "Charged after cancelling VIP membership",
                    "Subscription cancellation button not working",
                    "How to stop recurring billing?"
                ],
                "bodies": [
                    "I tried cancelling my $9.99 monthly pass in settings last week, but I was still billed today. Please verify my cancellation and refund this month's charge.",
                    "Where is the cancel button for PocketToons VIP? It keeps giving me an error message when I click 'Manage Subscription'. Stop billing my card!",
                    "Please cancel my subscription immediately and send confirmation to my email. I do not want auto-renew enabled."
                ],
                "expected_escalate": False,
                "reason": None
            }
        ],

        "Content Access & Coins": [
            {
                "sub": "Coins Not Credited",
                "subjects": [
                    "Coins not added after successful payment",
                    "Purchased 1000 coins but balance is still 0",
                    "Payment went through but no coins received (Order #{order_id})",
                    "Missing coin purchase"
                ],
                "bodies": [
                    "I purchased the $14.99 coin pack 30 minutes ago via Apple Pay. Money was deducted from my account (Order #{order_id}), but my in-app coin wallet still shows 0. Please credit my coins!",
                    "Hey support, I bought 500 coins for $9.99. Receipt #{order_id} received, but coins haven't shown up after restarting the app. User ID: {user_id}.",
                    "Payment was successful on Google Play but the app threw an error 'Transaction Pending' and my coins are missing. Please help credit them."
                ],
                "expected_escalate": False,
                "reason": None
            },
            {
                "sub": "Episode Locked After Unlock",
                "subjects": [
                    "Episode 25 locked despite using 10 coins",
                    "Coins deducted but episode won't play",
                    "Paid coins to unlock show but it asks for coins again",
                    "Episode unlock error on 'CEO's Hidden Heiress'"
                ],
                "bodies": [
                    "I spent 15 coins to unlock Episode 45 of 'Shadow Monarch', my coins were deducted, but when I click play it asks me to spend another 15 coins! Please fix this lock state.",
                    "Unlocked Episodes 10 to 15 in bulk for 50 coins. Episodes 12 and 13 are still showing a padlock icon. Please restore my unlocked episodes.",
                    "Coins were deducted twice for unlocking the same episode! Check my transaction history."
                ],
                "expected_escalate": False,
                "reason": None
            },
            {
                "sub": "VIP Membership Missing",
                "subjects": [
                    "VIP status lost after app update",
                    "Purchased annual VIP pass but still seeing ads and paywalls",
                    "VIP membership inactive on my account",
                    "Restore purchase not working for VIP pass"
                ],
                "bodies": [
                    "I paid for the Annual VIP Pass last month. Today after updating to {app_version}, my account reverted to Free Tier and asks me to buy coins again. I pressed 'Restore Purchases' but nothing happened.",
                    "My VIP membership is active on iOS but when I log into iPad, it says I don't have VIP. Please sync my account privileges.",
                    "Paid $49.99 for yearly VIP membership. Order #{order_id}. Still showing lock icons on exclusive episodes."
                ],
                "expected_escalate": False,
                "reason": None
            }
        ],

        "Technical & Playback Bugs": [
            {
                "sub": "Audio Stutter / Buffering",
                "subjects": [
                    "Audio keeps pausing every 5 seconds",
                    "Buffering error on episode playback",
                    "Audio speeds up and sounds robot-like",
                    "Playback stops continuously on Wi-Fi"
                ],
                "bodies": [
                    "Whenever I play any audio show, the track plays 5 seconds then buffers endlessly. My internet connection is fast (100 Mbps). Device: {device}.",
                    "The audio player pitch is distorted and plays at 2x speed automatically even when 1x is selected. Please fix this player bug.",
                    "Audio cuts out when my phone screen turns off. Background playback is broken on app version {app_version}."
                ],
                "expected_escalate": False,
                "reason": None
            },
            {
                "sub": "App Crash",
                "subjects": [
                    "App crashes immediately on launch",
                    "Crash when opening 'My Library' tab",
                    "PocketToons keeps stopping on {device}",
                    "App freeze during coin checkout"
                ],
                "bodies": [
                    "Ever since updating to {app_version}, the PocketToons app crashes immediately to the home screen upon launch. I cleared cache and reinstalled but issue persists on {device}.",
                    "The app freezes completely and screen turns black whenever I open my downloaded shows tab. Needs urgent bug fix.",
                    "Crash report: app crashes every time I try to play Episode 10 of any series."
                ],
                "expected_escalate": False,
                "reason": None
            },
            {
                "sub": "Offline Download Failed",
                "subjects": [
                    "Downloaded episodes won't play offline",
                    "Download stuck at 99%",
                    "Error downloading episode for offline listening",
                    "Storage full error despite 20GB free space"
                ],
                "bodies": [
                    "I downloaded 20 episodes for my flight, but when I turned on Airplane Mode, the app says 'No internet connection' and won't play offline files. What's the point of offline mode?",
                    "Downloads get stuck at 99% and fail with code ERR_STORAGE_WRITE. Device has over 30GB free storage available.",
                    "Downloaded files disappeared from my library after signing out and signing back in."
                ],
                "expected_escalate": False,
                "reason": None
            }
        ],

        "Account & Security": [
            {
                "sub": "Suspicious Activity / Hacked Account",
                "subjects": [
                    "Urgently help - someone hacked my account!",
                    "Unrecognized device login from another country",
                    "My coin balance was drained by an unauthorized login",
                    "Account compromised / Security breach"
                ],
                "bodies": [
                    "I received an email alert about a login from an IP address in Europe. I live in US. Someone logged into my account, changed my nickname, and spent 800 of my saved coins! Please lock my account and restore my coins immediately!",
                    "I can no longer log into my account with my email. It says 'User does not exist'. I think my account was hacked and email was changed without my permission.",
                    "Urgent: Unauthorized password change notification received. I did not request this. Freeze my account to prevent fraud!"
                ],
                "expected_escalate": True,
                "reason": "Account compromise / Security breach / Hacked account"
            },
            {
                "sub": "Cannot Login / OTP Fail",
                "subjects": [
                    "OTP SMS code not arriving",
                    "Cannot log into my account after phone change",
                    "Login error code 500",
                    "SMS verification failed for phone number"
                ],
                "bodies": [
                    "I'm trying to log in using my phone number, but the 6-digit OTP SMS code is never delivered to my phone. I tried 5 times. Please help me log in.",
                    "Changed my phone number and now I can't access my old account with 1500 purchased coins. How can I transfer my account?",
                    "When logging in with Google SSO, the app throws 'Authentication failed - Invalid token'. I am locked out of my profile."
                ],
                "expected_escalate": False,
                "reason": None
            },
            {
                "sub": "Account Deletion Request",
                "subjects": [
                    "GDPR data deletion request",
                    "Request to delete my account and personal data",
                    "Permanently close my PocketToons account",
                    "Remove my personal info from your servers"
                ],
                "bodies": [
                    "Under GDPR / CCPA regulations, I hereby request the permanent deletion of my PocketToons account (User ID: {user_id}) and all associated personal data from your systems.",
                    "Please delete my account and purge my email address and payment history from your database.",
                    "I want to close my account permanently. How do I delete my profile data?"
                ],
                "expected_escalate": True,
                "reason": "Regulatory compliance / GDPR / CCPA data erasure request"
            }
        ],

        "Feedback & General": [
            {
                "sub": "Narrator Voice Feedback",
                "subjects": [
                    "Feedback on narrator for 'Vampire Prince'",
                    "Audio volume balance between voice and background music",
                    "Great voice actor choice!",
                    "Suggestion for narrator sound quality"
                ],
                "bodies": [
                    "I love the audio show 'Vampire Prince', but the background music is way too loud compared to the narrator's voice. Could you adjust the audio mixing in future episodes?",
                    "The new voice actor for Season 2 of 'Reborn Legend' sounds very monotone compared to Season 1. Please consider bringing back the original voice cast!",
                    "Just wanted to say the narration team for 'Alpha King' is phenomenal! Amazing sound effects and performance."
                ],
                "expected_escalate": False,
                "reason": None
            },
            {
                "sub": "App UI / UX Suggestion",
                "subjects": [
                    "Please add Dark Mode support",
                    "Feature request: Playback speed control 2.5x",
                    "Library organization suggestion",
                    "Sleep timer option request"
                ],
                "bodies": [
                    "Great app! It would be amazing if you could add a Sleep Timer feature (15m, 30m, end of episode) so I can listen to audiobooks before sleeping without wasting battery.",
                    "Can we get a 2.5x or 3.0x playback speed option? Currently 2.0x is the maximum speed.",
                    "Please add a folder or playlist feature in 'My Library' to organize finished vs. ongoing shows."
                ],
                "expected_escalate": False,
                "reason": None
            }
        ]
    }

    # Desired category distribution weights (~200 total)
    # Billing & Refunds: 70 (~35%)
    # Content Access & Coins: 60 (~30%)
    # Technical & Playback Bugs: 36 (~18%)
    # Account & Security: 20 (~10%)
    # Feedback & General: 14 (~7%)
    counts = {
        "Billing & Refunds": 70,
        "Content Access & Coins": 60,
        "Technical & Playback Bugs": 36,
        "Account & Security": 20,
        "Feedback & General": 14
    }

    tickets = []
    ticket_counter = 1001

    base_time = datetime.now() - timedelta(days=14)

    for cat_name, total_count in counts.items():
        sub_templates = categories_template[cat_name]
        for i in range(total_count):
            tmpl = random.choice(sub_templates)
            user_id = random.choice(users)
            order_id = f"ORD-{random.randint(100000, 999999)}"
            device = random.choice(devices)
            app_ver = random.choice(app_versions)
            channel = random.choice(channels)

            subj_str = random.choice(tmpl["subjects"]).format(order_id=order_id, user_id=user_id, device=device, app_version=app_ver)
            body_str = random.choice(tmpl["bodies"]).format(order_id=order_id, user_id=user_id, device=device, app_version=app_ver)

            # Random timestamp within last 14 days
            created_at = (base_time + timedelta(minutes=random.randint(0, 20000))).strftime("%Y-%m-%d %H:%M:%S")

            ticket_id = f"TCK-{ticket_counter}"
            ticket_counter += 1

            # Check if text contains extra escalation keywords
            escalate = tmpl["expected_escalate"]
            reason = tmpl["reason"]

            if any(k in body_str.lower() or k in subj_str.lower() for k in ["lawyer", "attorney", "chargeback", "hacked", "gdpr"]):
                escalate = True
                if not reason:
                    reason = "High risk keyword (legal / security / compliance)"

            ticket_record = {
                "ticket_id": ticket_id,
                "created_at": created_at,
                "user_id": user_id,
                "channel": channel,
                "device_info": device,
                "app_version": app_ver,
                "subject": subj_str,
                "body": body_str,
                "ground_truth_category": cat_name,
                "ground_truth_subcategory": tmpl["sub"],
                "ground_truth_escalate": escalate,
                "ground_truth_escalation_reason": reason
            }
            tickets.append(ticket_record)

    # Shuffle dataset
    random.shuffle(tickets)
    return tickets


def build_gold_evaluation_dataset():
    """Returns 25 hand-crafted benchmark test tickets with verified ground-truth labels."""
    gold_tickets = [
        # Billing & Refunds (6)
        {
            "ticket_id": "GOLD-001",
            "subject": "Double charged for 1000 coin bundle on App Store",
            "body": "I purchased 1000 coins for $14.99 on my iPhone yesterday. Apple billed my credit card twice ($14.99 x 2). Order ID: ORD-992104. Please refund the duplicate $14.99 charge.",
            "ground_truth_category": "Billing & Refunds",
            "ground_truth_subcategory": "Double Billing",
            "ground_truth_escalate": False,
            "ground_truth_reason": None
        },
        {
            "ticket_id": "GOLD-002",
            "subject": "Fraudulent charge of $49.99 on my Visa - reporting to bank",
            "body": "I saw an unrecognized charge of $49.99 from PocketToons on my credit card statement. I never downloaded your app! I am filing a bank chargeback and notifying my lawyer if not refunded.",
            "ground_truth_category": "Billing & Refunds",
            "ground_truth_subcategory": "Unauthorized Charge",
            "ground_truth_escalate": True,
            "ground_truth_reason": "Legal threat / Bank chargeback threat / Fraudulent charge claim"
        },
        {
            "ticket_id": "GOLD-003",
            "subject": "Toddler bought 2000 coins by mistake, need refund",
            "body": "My toddler was holding my phone and accidentally bought the $29.99 coin pack. The 2000 coins are completely untouched. Please issue a refund for order ORD-110293.",
            "ground_truth_category": "Billing & Refunds",
            "ground_truth_subcategory": "Refund Request",
            "ground_truth_escalate": False,
            "ground_truth_reason": None
        },
        {
            "ticket_id": "GOLD-004",
            "subject": "Cancel VIP membership subscription",
            "body": "I want to cancel my auto-renewing $9.99 VIP pass starting next month. The cancel button in settings keeps loading forever. Please cancel it for me.",
            "ground_truth_category": "Billing & Refunds",
            "ground_truth_subcategory": "Subscription Cancellation Issue",
            "ground_truth_escalate": False,
            "ground_truth_reason": None
        },
        {
            "ticket_id": "GOLD-005",
            "subject": "Payment failed but money debited from bank account",
            "body": "I tried buying 500 coins for $9.99. The app said 'Transaction Failed' but my bank debited $9.99. Reference ORD-771239. Either give me coins or refund money.",
            "ground_truth_category": "Billing & Refunds",
            "ground_truth_subcategory": "Payment Method Failed",
            "ground_truth_escalate": False,
            "ground_truth_reason": None
        },
        {
            "ticket_id": "GOLD-006",
            "subject": "Overcharged for monthly pass",
            "body": "The price listed in app was $4.99 but my receipt shows $9.99 for order ORD-331902. Please refund the $5 difference.",
            "ground_truth_category": "Billing & Refunds",
            "ground_truth_subcategory": "Refund Request",
            "ground_truth_escalate": False,
            "ground_truth_reason": None
        },

        # Content Access & Coins (6)
        {
            "ticket_id": "GOLD-007",
            "subject": "Paid $9.99 for 500 coins but wallet balance is 0",
            "body": "I bought the $9.99 coin bundle 1 hour ago. Received Google Play receipt ORD-881203, but my coin wallet still says 0 coins. User ID USR-49120. Please add my coins.",
            "ground_truth_category": "Content Access & Coins",
            "ground_truth_subcategory": "Coins Not Credited",
            "ground_truth_escalate": False,
            "ground_truth_reason": None
        },
        {
            "ticket_id": "GOLD-008",
            "subject": "Episode 15 locked after I spent 10 coins",
            "body": "I unlocked Episode 15 of 'CEO Billionaire' for 10 coins. Coins were deducted, but the episode still shows a padlock icon and asks for 10 coins again. Please unlock it.",
            "ground_truth_category": "Content Access & Coins",
            "ground_truth_subcategory": "Episode Locked After Unlock",
            "ground_truth_escalate": False,
            "ground_truth_reason": None
        },
        {
            "ticket_id": "GOLD-009",
            "subject": "Annual VIP member status disappeared",
            "body": "I purchased the yearly VIP pass 3 months ago. After today's update, the app says I am a Free User and locks all VIP episodes. Restore purchases is failing.",
            "ground_truth_category": "Content Access & Coins",
            "ground_truth_subcategory": "VIP Membership Missing",
            "ground_truth_escalate": False,
            "ground_truth_reason": None
        },
        {
            "ticket_id": "GOLD-010",
            "subject": "Purchased audiobook season missing from library",
            "body": "I purchased Season 1 of 'Shadow Hunter' for 300 coins. It was in my library yesterday, but today the show page says I have to buy it again.",
            "ground_truth_category": "Content Access & Coins",
            "ground_truth_subcategory": "Show Missing",
            "ground_truth_escalate": False,
            "ground_truth_reason": None
        },
        {
            "ticket_id": "GOLD-011",
            "subject": "Promo code redeemed but no bonus coins added",
            "body": "I redeemed code POCKET2026 for 50 free bonus coins. It showed 'Success', but my coin balance didn't change from 20.",
            "ground_truth_category": "Content Access & Coins",
            "ground_truth_subcategory": "Coins Not Credited",
            "ground_truth_escalate": False,
            "ground_truth_reason": None
        },
        {
            "ticket_id": "GOLD-012",
            "subject": "Lost 5000 coins after signing into new phone",
            "body": "I had over 5000 paid coins on my old phone. Signed into my new iPhone and my balance is 0! User ID USR-99120. Where did all my paid coins go?",
            "ground_truth_category": "Content Access & Coins",
            "ground_truth_subcategory": "Content Sync Error",
            "ground_truth_escalate": True,
            "ground_truth_reason": "High coin balance discrepancy (>1000 coins)"
        },

        # Technical & Playback Bugs (5)
        {
            "ticket_id": "GOLD-013",
            "subject": "App crashes immediately on open on Samsung Galaxy S23",
            "body": "Since updating to v3.12.1, PocketToons crashes to home screen 1 second after tapping the icon. Device: Samsung Galaxy S23 (Android 14). Clearing cache didn't help.",
            "ground_truth_category": "Technical & Playback Bugs",
            "ground_truth_subcategory": "App Crash",
            "ground_truth_escalate": False,
            "ground_truth_reason": None
        },
        {
            "ticket_id": "GOLD-014",
            "subject": "Audio stutters and pauses every 10 seconds on Wi-Fi",
            "body": "Every episode I play buffers endlessly and stutters even though my Wi-Fi is 200Mbps. Other apps like Spotify stream fine.",
            "ground_truth_category": "Technical & Playback Bugs",
            "ground_truth_subcategory": "Audio Stutter / Buffering",
            "ground_truth_escalate": False,
            "ground_truth_reason": None
        },
        {
            "ticket_id": "GOLD-015",
            "subject": "Offline downloaded episodes will not play in airplane mode",
            "body": "I downloaded 15 episodes for my flight. When I turn on airplane mode, the app displays 'No Network' and locks all downloaded episodes.",
            "ground_truth_category": "Technical & Playback Bugs",
            "ground_truth_subcategory": "Offline Download Failed",
            "ground_truth_escalate": False,
            "ground_truth_reason": None
        },
        {
            "ticket_id": "GOLD-016",
            "subject": "Audio stops whenever screen locks",
            "body": "Background playback isn't working. As soon as my iPhone display turns off, the audio playback immediately freezes.",
            "ground_truth_category": "Technical & Playback Bugs",
            "ground_truth_subcategory": "Background Playback Issue",
            "ground_truth_escalate": False,
            "ground_truth_reason": None
        },
        {
            "ticket_id": "GOLD-017",
            "subject": "CarPlay audio disconnected and app crashed phone",
            "body": "When connected to Apple CarPlay, starting episode 4 froze my head unit and crashed the app completely on iOS 17.",
            "ground_truth_category": "Technical & Playback Bugs",
            "ground_truth_subcategory": "CarPlay / Bluetooth Glitch",
            "ground_truth_escalate": False,
            "ground_truth_reason": None
        },

        # Account & Security (5)
        {
            "ticket_id": "GOLD-018",
            "subject": "URGENT: Someone hacked my account and spent my coins!",
            "body": "I got a notification that my account was logged into from Germany. I live in Texas! Someone spent 600 of my coins on random shows. Freeze my account immediately and reset password!",
            "ground_truth_category": "Account & Security",
            "ground_truth_subcategory": "Suspicious Activity / Hacked Account",
            "ground_truth_escalate": True,
            "ground_truth_reason": "Account security breach / Unauthorized access"
        },
        {
            "ticket_id": "GOLD-019",
            "subject": "OTP verification SMS code never arrives",
            "body": "I'm trying to log in with my phone number +15550192, but I have been waiting for the 6-digit SMS code for 20 minutes. Resend OTP button doesn't work.",
            "ground_truth_category": "Account & Security",
            "ground_truth_subcategory": "Cannot Login / OTP Fail",
            "ground_truth_escalate": False,
            "ground_truth_reason": None
        },
        {
            "ticket_id": "GOLD-020",
            "subject": "GDPR Right to be Forgotten - Delete my account data",
            "body": "Under GDPR Article 17, I formally request full erasure of my account USR-88129 and all stored personal/billing data from your servers within 30 days.",
            "ground_truth_category": "Account & Security",
            "ground_truth_subcategory": "Account Deletion Request",
            "ground_truth_escalate": True,
            "ground_truth_reason": "Regulatory compliance (GDPR data erasure)"
        },
        {
            "ticket_id": "GOLD-021",
            "subject": "Password reset link link expired error",
            "body": "I clicked 'Forgot Password' and got the email, but clicking the link immediately gives 'Token Expired' error.",
            "ground_truth_category": "Account & Security",
            "ground_truth_subcategory": "Password Reset Issue",
            "ground_truth_escalate": False,
            "ground_truth_reason": None
        },
        {
            "ticket_id": "GOLD-022",
            "subject": "Changed email address and lost access",
            "body": "I updated my email address in profile settings but made a typo. Now I am logged out and cannot receive verification emails to log back in.",
            "ground_truth_category": "Account & Security",
            "ground_truth_subcategory": "Cannot Login / OTP Fail",
            "ground_truth_escalate": False,
            "ground_truth_reason": None
        },

        # Feedback & General (3)
        {
            "ticket_id": "GOLD-023",
            "subject": "Love the app! Suggestion for Sleep Timer",
            "body": "PocketToons is amazing! It would be really helpful to have a 30-minute Sleep Timer option in the player so it stops playing after I fall asleep.",
            "ground_truth_category": "Feedback & General",
            "ground_truth_subcategory": "App UI / UX Suggestion",
            "ground_truth_escalate": False,
            "ground_truth_reason": None
        },
        {
            "ticket_id": "GOLD-024",
            "subject": "Narrator voice change in Season 2 of Alpha King",
            "body": "The narrator for Season 2 of Alpha King sounds very different from Season 1. Is it possible to bring back the original narrator?",
            "ground_truth_category": "Feedback & General",
            "ground_truth_subcategory": "Narrator Voice Feedback",
            "ground_truth_escalate": False,
            "ground_truth_reason": None
        },
        {
            "ticket_id": "GOLD-025",
            "subject": "Dark mode feature request for Android app",
            "body": "The app is great when listening at night, but the bright white background hurts my eyes. Please add a Dark Theme toggle!",
            "ground_truth_category": "Feedback & General",
            "ground_truth_subcategory": "App UI / UX Suggestion",
            "ground_truth_escalate": False,
            "ground_truth_reason": None
        }
    ]
    return gold_tickets


def main():
    os.makedirs("data", exist_ok=True)
    os.makedirs("output", exist_ok=True)

    print("Generating 200 realistic support tickets...")
    tickets_200 = generate_tickets(num_tickets=200, seed=42)

    # Save to CSV
    df = pd.DataFrame(tickets_200)
    df.to_csv("data/support_tickets_200.csv", index=False)

    # Save to JSON
    with open("data/support_tickets_200.json", "w") as f:
        json.dump(tickets_200, f, indent=2)

    print(f"Saved 200 tickets to data/support_tickets_200.csv and data/support_tickets_200.json")

    # Generate Gold benchmark
    print("Generating 25 hand-labeled gold evaluation dataset...")
    gold_tickets = build_gold_evaluation_dataset()
    with open("data/gold_eval_dataset.json", "w") as f:
        json.dump(gold_tickets, f, indent=2)

    gold_df = pd.DataFrame(gold_tickets)
    gold_df.to_csv("data/gold_eval_dataset.csv", index=False)
    print("Saved gold evaluation dataset to data/gold_eval_dataset.json")

    # Print summary statistics
    print("\n--- Synthetic Dataset Summary ---")
    cat_counts = df['ground_truth_category'].value_counts()
    for cat, count in cat_counts.items():
        print(f"  • {cat}: {count} tickets ({count/len(df)*100:.1f}%)")

    esc_count = df['ground_truth_escalate'].sum()
    print(f"\nTotal Ground Truth Escalations Flagged: {esc_count} ({esc_count/len(df)*100:.1f}%)")

if __name__ == "__main__":
    main()
