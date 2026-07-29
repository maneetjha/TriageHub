#!/usr/bin/env python3
"""
CLI Tool for PocketToons Support Triage Agent.
Allows batch processing, evaluation benchmarking, and live interactive ticket classification from terminal.
"""

import sys
import os
import argparse
import json

# Ensure root directory is in python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from src.triage_engine import SupportTriageEngine
from src.batch_processor import run_batch_triage
from src.evaluator import evaluate_triage_engine

def main():
    parser = argparse.ArgumentParser(description="PocketToons Support Triage Agent CLI")
    subparsers = parser.add_subparsers(dest="command", help="Available commands")

    # Command 1: Batch process
    batch_parser = subparsers.add_parser("batch", help="Run batch triage on support tickets dataset")
    batch_parser.add_argument("--input", default="data/support_tickets_200.json", help="Path to input JSON tickets")
    batch_parser.add_argument("--output-csv", default="output/triage_results.csv", help="Path to save CSV output")
    batch_parser.add_argument("--output-json", default="output/triage_results.json", help="Path to save JSON output")

    # Command 2: Evaluate
    eval_parser = subparsers.add_parser("eval", help="Run evaluation benchmark on gold dataset")
    eval_parser.add_argument("--gold-set", default="data/gold_eval_dataset.json", help="Path to gold dataset")

    # Command 3: Classify single ticket
    single_parser = subparsers.add_parser("classify", help="Classify a single ticket input from CLI")
    single_parser.add_argument("--subject", required=True, help="Ticket subject line")
    single_parser.add_argument("--body", required=True, help="Ticket body text")

    args = parser.parse_args()

    if args.command == "batch":
        run_batch_triage(args.input, args.output_csv, args.output_json)

    elif args.command == "eval":
        evaluate_triage_engine(args.gold_set)

    elif args.command == "classify":
        engine = SupportTriageEngine()
        res = engine.process_ticket({"ticket_id": "CLI-SINGLE", "subject": args.subject, "body": args.body})

        print("\n" + "="*50)
        print("          POCKETTOONS TRIAGE PREDICTION         ")
        print("="*50)
        print(f"Subject           : {res['subject']}")
        print(f"Predicted Category: {res['predicted_category']}")
        print(f"Subcategory       : {res['predicted_subcategory']}")
        print(f"Confidence Score  : {res['confidence_score']:.2f}")
        print(f"Sentiment         : {res['sentiment']}")
        print(f"Escalate to Human : {'YES 🚨' if res['escalate_to_human'] else 'NO ✅'}")
        if res['escalate_to_human']:
            print(f"Escalation Reason : {res['escalation_reason']}")

        print("\nSuggested Draft Reply:")
        print("-" * 50)
        print(res['suggested_reply'])
        print("="*50 + "\n")

    else:
        # Default action if no sub-command provided: run batch + eval
        print("Running full batch triage and evaluation benchmark...\n")
        run_batch_triage()
        evaluate_triage_engine()

if __name__ == "__main__":
    main()
