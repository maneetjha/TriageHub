"""
Batch Processing Pipeline for Support Tickets.
Reads support_tickets_200.json, passes them through SupportTriageEngine,
computes category volume statistics, and exports deliverables:
- output/triage_results.csv
- output/triage_results.json
"""

import json
import os
import sys

# Ensure root directory is in python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import pandas as pd
from src.triage_engine import SupportTriageEngine

def run_batch_triage(
    input_path: str = "data/support_tickets_200.json",
    csv_output_path: str = "output/triage_results.csv",
    json_output_path: str = "output/triage_results.json"
):
    print(f"Loading support tickets from {input_path}...")
    if not os.path.exists(input_path):
        raise FileNotFoundError(f"Input file not found: {input_path}")

    with open(input_path, "r") as f:
        tickets = json.load(f)

    print(f"Initializing Support Triage Engine...")
    engine = SupportTriageEngine()

    print(f"Processing {len(tickets)} tickets through triage engine...")
    triage_results = engine.batch_process(tickets)

    os.makedirs("output", exist_ok=True)

    # Export to JSON
    with open(json_output_path, "w") as f:
        json.dump(triage_results, f, indent=2)
    print(f"Saved JSON deliverables to {json_output_path}")

    # Export to CSV
    df = pd.DataFrame(triage_results)

    # Reorder columns for clean delivery
    col_order = [
        "ticket_id", "subject", "body", "predicted_category", "predicted_subcategory",
        "confidence_score", "sentiment", "escalate_to_human", "escalation_reason", "suggested_reply"
    ]
    if "ground_truth_category" in df.columns:
        col_order.append("ground_truth_category")

    df = df[[c for c in col_order if c in df.columns]]
    df.to_csv(csv_output_path, index=False)
    print(f"Saved CSV deliverables to {csv_output_path}")

    # Print Volume Breakdown & Top 2 Categories
    print("\n" + "="*50)
    print("        TRIAGE BATCH EXECUTION SUMMARY        ")
    print("="*50)
    cat_counts = df['predicted_category'].value_counts()
    print(f"\nTotal Tickets Processed: {len(df)}")
    print("\nCategory Volume Breakdown:")
    for cat, count in cat_counts.items():
        pct = (count / len(df)) * 100
        print(f"  • {cat:<28}: {count:>3} ({pct:>5.1f}%)")

    top2 = cat_counts.head(2)
    print("\n🔥 TOP 2 CATEGORIES BY VOLUME:")
    for rank, (cat, count) in enumerate(top2.items(), 1):
        print(f"  Rank {rank}: {cat} ({count} tickets, {count/len(df)*100:.1f}%)")

    esc_count = df['escalate_to_human'].sum()
    print(f"\nTotal Flagged for Human Escalation: {esc_count} ({esc_count/len(df)*100:.1f}%)")
    print("="*50 + "\n")

    return triage_results

if __name__ == "__main__":
    run_batch_triage()
