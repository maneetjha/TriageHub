"""
Taxonomy Manager for PocketToons Support Triage Engine.
Handles category taxonomy loading, keyword matching heuristics, and validation.
"""

import json
import os
from typing import Dict, List, Optional, Tuple

class TaxonomyManager:
    def __init__(self, taxonomy_path: str = "data/taxonomy.json"):
        self.taxonomy_path = taxonomy_path
        self.taxonomy_data = self._load_taxonomy()
        self.categories = {cat["name"]: cat for cat in self.taxonomy_data["categories"]}

    def _load_taxonomy(self) -> Dict:
        if not os.path.exists(self.taxonomy_path):
            raise FileNotFoundError(f"Taxonomy file not found at {self.taxonomy_path}")
        with open(self.taxonomy_path, "r") as f:
            return json.load(f)

    def get_category_names(self) -> List[str]:
        return list(self.categories.keys())

    def get_subcategories(self, category_name: str) -> List[str]:
        if category_name in self.categories:
            return self.categories[category_name]["subcategories"]
        return []

    def get_keywords(self, category_name: str) -> List[str]:
        if category_name in self.categories:
            return self.categories[category_name].get("keywords", [])
        return []

    def is_auto_reply_eligible(self, category_name: str) -> bool:
        if category_name in self.categories:
            return self.categories[category_name].get("auto_reply_eligible", True)
        return False

    def keyword_score(self, text: str, category_name: str) -> float:
        text_lower = text.lower()
        keywords = self.get_keywords(category_name)
        if not keywords:
            return 0.0

        matches = sum(1 for kw in keywords if kw.lower() in text_lower)
        # Score normalized between 0 and 1 with diminishing returns
        score = min(1.0, matches / 3.0)
        return score

    def check_global_escalation_rules(self, text: str) -> Tuple[bool, Optional[str]]:
        text_lower = text.lower()
        global_rules = self.taxonomy_data.get("global_escalation_rules", {})

        # Check legal keywords
        for kw in global_rules.get("legal_keywords", []):
            if kw.lower() in text_lower:
                return True, f"Legal/Regulatory escalation trigger ('{kw}')"

        # Check abuse/fraud keywords
        for kw in global_rules.get("abuse_keywords", []):
            if kw.lower() in text_lower:
                return True, f"High risk security/fraud phrase ('{kw}')"

        return False, None
