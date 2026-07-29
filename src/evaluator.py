"""
Evaluation Module for PocketToons Support Triage Agent.
Evaluates classifier predictions against hand-labeled Gold Evaluation Dataset (25 test cases).
Computes Accuracy, Precision, Recall, F1 Scores, Escalation Metrics, and Confusion Matrix.
Outputs report to output/eval_metrics.json.
"""

import json
import os
import sys
from typing import Dict, Any, List

# Ensure root directory is in python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import numpy as np
import pandas as pd
from sklearn.metrics import (
    accuracy_score,
    precision_recall_fscore_support,
    confusion_matrix,
    classification_report
)

from src.triage_engine import SupportTriageEngine

def evaluate_triage_engine(
    eval_dataset_path: str = "data/gold_eval_dataset.json",
    metrics_output_path: str = "output/eval_metrics.json"
) -> Dict[str, Any]:
    print(f"\n--- Running Evaluation on {eval_dataset_path} ---")

    if not os.path.exists(eval_dataset_path):
        raise FileNotFoundError(f"Evaluation dataset not found at {eval_dataset_path}")

    with open(eval_dataset_path, "r") as f:
        gold_tickets = json.load(f)

    engine = SupportTriageEngine()

    # Predict on gold set
    predictions = engine.batch_process(gold_tickets)

    y_true_cat = [t["ground_truth_category"] for t in gold_tickets]
    y_pred_cat = [p["predicted_category"] for p in predictions]

    y_true_esc = [t["ground_truth_escalate"] for t in gold_tickets]
    y_pred_esc = [p["escalate_to_human"] for p in predictions]

    categories = engine.taxonomy.get_category_names()

    # Category classification metrics
    accuracy = accuracy_score(y_true_cat, y_pred_cat)
    macro_p, macro_r, macro_f1, _ = precision_recall_fscore_support(y_true_cat, y_pred_cat, average='macro', zero_division=0)
    weighted_p, weighted_r, weighted_f1, _ = precision_recall_fscore_support(y_true_cat, y_pred_cat, average='weighted', zero_division=0)

    # Per-category metrics
    per_cat_p, per_cat_r, per_cat_f1, per_cat_supp = precision_recall_fscore_support(
        y_true_cat, y_pred_cat, labels=categories, zero_division=0
    )

    per_category_metrics = {}
    for i, cat in enumerate(categories):
        per_category_metrics[cat] = {
            "precision": round(float(per_cat_p[i]), 4),
            "recall": round(float(per_cat_r[i]), 4),
            "f1_score": round(float(per_cat_f1[i]), 4),
            "support": int(per_cat_supp[i])
        }

    # Confusion matrix
    cm = confusion_matrix(y_true_cat, y_pred_cat, labels=categories)

    # Escalation signal metrics
    esc_acc = accuracy_score(y_true_esc, y_pred_esc)
    esc_p, esc_r, esc_f1, _ = precision_recall_fscore_support(y_true_esc, y_pred_esc, average='binary', zero_division=0)

    eval_results = {
        "dataset": eval_dataset_path,
        "sample_size": len(gold_tickets),
        "overall_classification_metrics": {
            "accuracy": round(float(accuracy), 4),
            "macro_precision": round(float(macro_p), 4),
            "macro_recall": round(float(macro_r), 4),
            "macro_f1": round(float(macro_f1), 4),
            "weighted_f1": round(float(weighted_f1), 4)
        },
        "escalation_metrics": {
            "escalation_accuracy": round(float(esc_acc), 4),
            "escalation_precision": round(float(esc_p), 4),
            "escalation_recall": round(float(esc_r), 4),
            "escalation_f1": round(float(esc_f1), 4)
        },
        "per_category_metrics": per_category_metrics,
        "confusion_matrix": {
            "labels": categories,
            "matrix": cm.tolist()
        }
    }

    os.makedirs("output", exist_ok=True)
    with open(metrics_output_path, "w") as f:
        json.dump(eval_results, f, indent=2)

    # Print Evaluation Summary
    print("\n==================================================")
    print("         BENCHMARK EVALUATION RESULTS             ")
    print("==================================================")
    print(f"Gold Test Sample Size: {len(gold_tickets)}")
    print(f"Classification Accuracy: {accuracy*100:.2f}%")
    print(f"Macro F1-Score         : {macro_f1*100:.2f}%")
    print(f"Weighted F1-Score      : {weighted_f1*100:.2f}%")
    print(f"Escalation Precision   : {esc_p*100:.2f}%")
    print(f"Escalation Recall      : {esc_r*100:.2f}%")
    print(f"Escalation F1-Score    : {esc_f1*100:.2f}%")

    print("\nPer-Category Breakdown:")
    for cat, m in per_category_metrics.items():
        print(f"  • {cat:<26} | P: {m['precision']:.2f} | R: {m['recall']:.2f} | F1: {m['f1_score']:.2f} | Count: {m['support']}")

    print("==================================================\n")
    return eval_results

if __name__ == "__main__":
    evaluate_triage_engine()
