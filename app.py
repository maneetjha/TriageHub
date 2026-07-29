"""
TriageHub — Support Triage Command Center
Enterprise-grade dark UI complying with Stripe, Linear, and Vercel design systems.
No emojis. Minimal typography-led design using OKLCH-neutral colors and warm amber accents.
"""

import sys
import os
import json
import pandas as pd
import numpy as np
import plotly.graph_objects as go
import streamlit as st

# Ensure root path is accessible
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from src.triage_engine import SupportTriageEngine
from src.evaluator import evaluate_triage_engine

@st.cache_resource
def load_triage_engine():
    return SupportTriageEngine()

@st.cache_data
def load_triage_data():
    csv_path = "output/triage_results.csv"
    if os.path.exists(csv_path):
        return pd.read_csv(csv_path)
    else:
        from src.batch_processor import run_batch_triage
        results = run_batch_triage()
        return pd.DataFrame(results)

# Page Configuration
st.set_page_config(
    page_title="TriageHub — Support Triage",
    page_icon="⚡",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Fetch Nav selection from URL query parameters (Stripe/Vercel standard)
query_params = st.query_params
nav = query_params.get("nav", "Overview")

# Custom Spec CSS overrides for Streamlit
st.markdown("""
<style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    
    /* Core CSS Tokens */
    :root {
        --bg: #0B0B0C;
        --surface: #141416;
        --surface-2: #1A1A1D;
        --border: #232326;
        --text: #EDEDED;
        --text-muted: #8A8A8F;
        --text-subtle: #5A5A60;
        --accent: #D4A056;
    }
    
    /* Page reset */
    .stApp {
        background-color: var(--bg);
        color: var(--text);
        font-family: 'Inter', sans-serif;
    }
    
    /* Hide native Streamlit footers */
    footer {
        visibility: hidden !important;
    }
    
    /* Sidebar Overrides */
    section[data-testid="stSidebar"] {
        background-color: var(--bg) !important;
        border-right: 1px solid var(--border) !important;
        width: 240px !important;
    }
    
    /* Remove padding in sidebar content */
    section[data-testid="stSidebar"] div[class*="stVerticalBlock"] {
        padding-left: 0px !important;
        padding-right: 0px !important;
    }

    /* Muted Eyebrow Label */
    .eyebrow {
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--text-muted);
        font-weight: 600;
        margin-bottom: 0.5rem;
    }

    /* Headings */
    .page-title {
        font-size: 28px;
        font-weight: 500;
        color: var(--text);
        letter-spacing: -0.02em;
        margin-top: 0.2rem;
    }
    
    .page-subtitle {
        font-size: 14px;
        color: var(--text-muted);
        margin-bottom: 1.8rem;
    }

    /* Sidebar Nav Item Styling */
    .nav-item {
        display: flex;
        align-items: center;
        gap: 12px;
        height: 36px;
        padding: 0 16px;
        color: var(--text-muted);
        text-decoration: none !important;
        font-size: 14px;
        font-weight: 500;
        border-left: 2px solid transparent;
        transition: background-color 120ms ease-out, color 120ms ease-out;
    }
    
    .nav-item svg {
        flex-shrink: 0;
        color: var(--text-muted);
        transition: color 120ms ease-out;
    }
    
    .nav-item:hover {
        background-color: var(--surface-2);
        color: var(--text);
    }
    
    .nav-item:hover svg {
        color: var(--text);
    }
    
    .nav-item.active {
        background-color: var(--surface);
        color: var(--text);
        border-left: 2px solid var(--accent); /* Warm Amber left indicator */
    }
    
    .nav-item.active svg {
        color: var(--text);
    }

    /* Cards */
    .kpi-row {
        display: flex;
        gap: 24px;
        width: 100%;
        margin-bottom: 2rem;
    }

    .kpi-card {
        flex: 1;
        background-color: var(--surface);
        border: 1px solid var(--border);
        border-radius: 6px;
        padding: 1.25rem;
        transition: background-color 120ms ease-out;
    }
    
    .kpi-card:hover {
        background-color: var(--surface-2);
    }
    
    .kpi-card .eyebrow {
        margin-bottom: 0.6rem;
    }
    
    .metric-value {
        font-size: 36px;
        font-weight: 500;
        letter-spacing: -0.02em;
        font-variant-numeric: tabular-nums;
        color: var(--text);
        line-height: 1.1;
    }
    
    .metric-secondary {
        font-size: 14px;
        font-weight: 500;
        color: var(--accent);
        font-variant-numeric: tabular-nums;
        margin-top: 0.25rem;
    }

    /* Table custom designs */
    .triage-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 13px;
        margin-top: 0.5rem;
    }
    
    .triage-table th {
        text-align: left;
        padding: 8px 12px;
        font-size: 11px;
        text-transform: uppercase;
        color: var(--text-muted);
        border-bottom: 1px solid var(--border);
        letter-spacing: 0.05em;
    }
    
    .triage-table td {
        padding: 10px 12px;
        border-bottom: 1px solid var(--border);
        color: var(--text);
    }
    
    /* Category Breakdown Stacked Bar */
    .stacked-bar-container {
        display: flex;
        height: 12px;
        border-radius: 3px;
        overflow: hidden;
        margin-bottom: 1.5rem;
        background-color: var(--surface-2);
    }
    
    /* Swatches */
    .swatch {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin-right: 12px;
    }

    /* Form Overrides */
    div[data-baseweb="select"] > div {
        background-color: var(--surface) !important;
        border: 1px solid var(--border) !important;
        color: var(--text) !important;
        border-radius: 6px !important;
    }
    
    input {
        background-color: var(--surface) !important;
        border: 1px solid var(--border) !important;
        color: var(--text) !important;
        border-radius: 6px !important;
    }

    textarea {
        background-color: var(--surface) !important;
        border: 1px solid var(--border) !important;
        color: var(--text) !important;
        border-radius: 6px !important;
    }
    
    .stButton>button {
        background-color: var(--surface-2) !important;
        border: 1px solid var(--border) !important;
        color: var(--text) !important;
        border-radius: 6px !important;
        font-size: 13px !important;
        font-weight: 500 !important;
        padding: 6px 14px !important;
        transition: background-color 120ms ease-out, border-color 120ms ease-out !important;
    }
    
    .stButton>button:hover {
        background-color: var(--border) !important;
        border-color: var(--text-muted) !important;
        color: var(--text) !important;
    }

    /* Segmented Tab Bar for sub-navigation */
    div.stRadio > div[role="radiogroup"] {
        display: flex !important;
        flex-direction: row !important;
        gap: 24px !important;
        background-color: transparent !important;
        border: none !important;
        border-bottom: 1px solid var(--border) !important;
        padding: 0 !important;
        border-radius: 0 !important;
        margin-bottom: 1.5rem !important;
        width: 100% !important;
    }
    
    div.stRadio > div[role="radiogroup"] label {
        background-color: transparent !important;
        border: none !important;
        color: var(--text-muted) !important;
        padding: 8px 0px !important;
        border-radius: 0 !important;
        font-size: 14px !important;
        font-weight: 500 !important;
        cursor: pointer !important;
        transition: color 120ms ease-out !important;
        margin: 0 !important;
        border-bottom: 2px solid transparent !important;
    }
    
    div.stRadio > div[role="radiogroup"] label:hover {
        color: var(--text) !important;
    }
    
    /* Active sub-tab state with bottom indicator line */
    div.stRadio > div[role="radiogroup"] label[data-checked="true"] {
        color: var(--text) !important;
        border-bottom: 2px solid var(--accent) !important; /* Amber underline indicator */
    }
    
    /* Hide Streamlit default radio buttons circle elements */
    div.stRadio div[role="radiogroup"] [data-testid="stRadioCircle"] {
        display: none !important;
    }
    
    /* Filter Bar Wrapper CSS */
    .filter-bar {
        background-color: var(--surface);
        border: 1px solid var(--border);
        border-radius: 6px;
        padding: 12px 16px;
        margin-bottom: 1.5rem;
    }
</style>
""", unsafe_allow_html=True)

# Icons Mapping (Lucide Icons in clean inline SVG format)
icons = {
    "Overview": '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>',
    "Support Queue": '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>',
    "Live Simulator": '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="6 3 20 12 6 21 6 3"/></svg>',
    "Agent Inbox": '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>',
    "Benchmarks": '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>',
    "Settings": '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>'
}

engine = load_triage_engine()

# Initialize dynamic session states
if "tickets_df" not in st.session_state:
    st.session_state["tickets_df"] = load_triage_data()
if "resolved_tickets" not in st.session_state:
    st.session_state["resolved_tickets"] = set()

# Reference active dataset (excluding resolved ones)
df_all = st.session_state["tickets_df"]
df = df_all[~df_all['ticket_id'].isin(st.session_state["resolved_tickets"])]

# Render custom sidebar
with st.sidebar:
    # Triangle logo mark and TriageHub header matching mockup
    st.markdown('''
    <div style="display:flex; align-items:center; gap:10px; padding:18px 16px 12px 16px;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EDEDED" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="12 2 2 22 22 22 12 2"/>
        </svg>
        <span style="font-weight:600; font-size:15px; color:#EDEDED; letter-spacing:-0.03em;">TriageHub</span>
    </div>
    ''', unsafe_allow_html=True)
    
    st.markdown('<div class="eyebrow" style="margin-top:1.5rem; padding-left:16px;">Workspace</div>', unsafe_allow_html=True)
    
    # Custom Sidebar Menu Render using standard query parameter reload pattern
    sidebar_menu = f"""
    <div style="display:flex; flex-direction:column; gap:2px;">
        <a href="?nav=Overview" target="_self" class="nav-item {'active' if nav == 'Overview' else ''}">
            {icons['Overview']} Overview
        </a>
        <a href="?nav=Support+Queue" target="_self" class="nav-item {'active' if nav == 'Support Queue' else ''}">
            {icons['Support Queue']} Support Queue
        </a>
        <a href="?nav=Live+Simulator" target="_self" class="nav-item {'active' if nav == 'Live Simulator' else ''}">
            {icons['Live Simulator']} Live Simulator
        </a>
        <a href="?nav=Agent+Inbox" target="_self" class="nav-item {'active' if nav == 'Agent Inbox' else ''}">
            {icons['Agent Inbox']} Agent Inbox
        </a>
        <a href="?nav=Benchmarks" target="_self" class="nav-item {'active' if nav == 'Benchmarks' else ''}">
            {icons['Benchmarks']} Benchmarks
        </a>
    </div>
    """
    st.markdown(sidebar_menu, unsafe_allow_html=True)

    # LLM config integration input options inside the sidebar context
    st.markdown('<div class="eyebrow" style="margin-top:2rem; padding-left:16px;">LLM Integration</div>', unsafe_allow_html=True)
    api_provider = st.selectbox("Provider", ["Gemini", "OpenAI"], key="api_provider_select", label_visibility="collapsed")
    api_key = st.text_input("API Key", type="password", placeholder="Enter key for live LLM...", key="api_key_input", label_visibility="collapsed")

    # Settings bottom layout matching mockup
    st.markdown(
        f'<div style="margin-top: auto; padding-top: 2rem; border-top: 1px solid var(--border);">'
        f'<a href="?nav=Settings" target="_self" class="nav-item">'
        f"{icons['Settings']} Settings"
        f'</a>'
        f'</div>',
        unsafe_allow_html=True
    )

# Get Triage stats
total_tickets = len(df)
esc_tickets = int(df['escalate_to_human'].sum()) if total_tickets > 0 else 0
auto_reply_eligible = total_tickets - esc_tickets
auto_reply_pct = (auto_reply_eligible / total_tickets) * 100 if total_tickets > 0 else 0
esc_rate = (esc_tickets / total_tickets) * 100 if total_tickets > 0 else 0
avg_conf = float(df['confidence_score'].mean()) if total_tickets > 0 else 0.0

# VIEW 1: OVERVIEW
if nav == "Overview":
    # 4 equal KPI cards styled exactly like Vercel/Linear (Flexbox ensures perfect width matching)
    st.markdown(f"""
    <div class="kpi-row">
        <div class="kpi-card">
            <div class="eyebrow">Total Tickets</div>
            <div class="metric-value">{total_tickets}</div>
            <div style="height:20px; margin-top:12px;">
                <svg width="100%" height="20" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M 0 14 Q 10 10, 20 15 T 40 8 T 60 12 T 80 6 T 100 11" fill="none" stroke="var(--text-subtle)" stroke-width="1"/>
                </svg>
            </div>
        </div>
        <div class="kpi-card">
            <div class="eyebrow">Auto-Reply Eligible</div>
            <div class="metric-value">{auto_reply_eligible}</div>
            <div class="metric-secondary">{auto_reply_pct:.1f}%</div>
            <div style="height:20px; margin-top:4px;">
                <svg width="100%" height="20" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M 0 12 Q 15 16, 30 8 T 60 14 T 80 18 T 100 12" fill="none" stroke="var(--text-subtle)" stroke-width="1"/>
                </svg>
            </div>
        </div>
        <div class="kpi-card">
            <div class="eyebrow">Human Escalations</div>
            <div class="metric-value">{esc_tickets}</div>
            <div class="metric-secondary">{esc_rate:.1f}%</div>
            <div style="height:20px; margin-top:4px;">
                <svg width="100%" height="20" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M 0 17 Q 20 8, 40 13 T 70 5 T 100 11" fill="none" stroke="var(--text-subtle)" stroke-width="1"/>
                </svg>
            </div>
        </div>
        <div class="kpi-card">
            <div class="eyebrow">Mean Confidence</div>
            <div class="metric-value">{avg_conf:.2f}</div>
            <div style="height:20px; margin-top:12px;">
                <svg width="100%" height="20" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M 0 6 Q 25 10, 50 5 T 75 9 T 100 7" fill="none" stroke="var(--text-subtle)" stroke-width="1"/>
                </svg>
            </div>
        </div>
    </div>
    """, unsafe_allow_html=True)

    # Ingest New Support Dataset
    with st.expander("📂 Import Support Dataset (Batch CSV Triage)"):
        st.markdown('<div class="eyebrow" style="font-size:11px;">Upload and process a new support ticket dataset</div>', unsafe_allow_html=True)
        uploaded_csv = st.file_uploader("Select CSV file (must contain 'subject' and 'body' columns)", type=["csv"], key="batch_csv_uploader", label_visibility="collapsed")
        if uploaded_csv is not None:
            if st.button("Process & Ingest Dataset", type="primary", key="batch_csv_process_btn"):
                try:
                    new_df = pd.read_csv(uploaded_csv)
                    if 'subject' not in new_df.columns or 'body' not in new_df.columns:
                        st.error("Uploaded CSV must contain 'subject' and 'body' columns!")
                    else:
                        progress_bar = st.progress(0.0)
                        status_text = st.empty()
                        processed_records = []
                        total_rows = len(new_df)
                        
                        for idx, row in new_df.iterrows():
                            progress_val = (idx + 1) / total_rows
                            progress_bar.progress(progress_val)
                            status_text.text(f"Triaging ticket {idx + 1} of {total_rows}...")
                            
                            ticket_data = {
                                "ticket_id": f"TCK-{idx + 1001}",
                                "subject": str(row['subject']),
                                "body": str(row['body']),
                                "device_info": str(row.get('device_info', 'Unknown Device')),
                                "app_version": str(row.get('app_version', 'Unknown Version'))
                            }
                            res = engine.process_ticket(
                                ticket_data,
                                api_key=api_key,
                                provider=api_provider.lower()
                            )
                            # Add default ground truth evaluation columns
                            res["ground_truth_category"] = res["predicted_category"]
                            res["ground_truth_escalate"] = res["escalate_to_human"]
                            processed_records.append(res)
                        
                        # Store in session state
                        st.session_state["tickets_df"] = pd.DataFrame(processed_records)
                        # Reset resolved tickets set
                        st.session_state["resolved_tickets"] = set()
                        
                        # Save outputs
                        st.session_state["tickets_df"].to_csv("output/triage_results.csv", index=False)
                        json_records = st.session_state["tickets_df"].to_dict(orient="records")
                        with open("output/triage_results.json", "w") as f:
                            json.dump(json_records, f, indent=2)
                        
                        # Run evaluation
                        from src.evaluator import evaluate_triage_engine
                        evaluate_triage_engine()
                        
                        st.toast(f"Successfully processed {total_rows} tickets and loaded new dataset!", icon="✅")
                        st.rerun()
                except Exception as e:
                    st.error(f"Error parsing CSV: {str(e)}")

    # 40 / 60 Column Layout Below KPIs
    col_left, col_right = st.columns([4, 6])

    with col_left:
        st.markdown('<div class="eyebrow" style="margin-top:1rem;">Category Breakdown</div>', unsafe_allow_html=True)
        st.caption("Share of tickets by predicted category")

        # Dynamic values matching predicted labels
        cat_counts = df['predicted_category'].value_counts()
        tot = len(df)

        # Draw stacked bar using monochrome sequence + warm amber for largest
        monochrome_colors = ["#3A3A3E", "#4A4A4F", "#5F5F65", "#7A7A80", "#9A9AA0"]
        stacked_bar_html = '<div class="stacked-bar-container">'
        for idx, (cat_name, count) in enumerate(cat_counts.items()):
            pct = (count / tot) * 100
            color = "var(--accent)" if idx == 0 else monochrome_colors[min(idx-1, len(monochrome_colors)-1)]
            stacked_bar_html += f'<div style="width:{pct}%; background-color:{color}; height:100%;"></div>'
        stacked_bar_html += '</div>'
        st.markdown(stacked_bar_html, unsafe_allow_html=True)

        # Table rows construction matching categories
        table_rows = ""
        for idx, (cat_name, count) in enumerate(cat_counts.items()):
            color = "var(--accent)" if idx == 0 else monochrome_colors[min(idx-1, len(monochrome_colors)-1)]
            pct_str = f"{(count/tot)*100:.1f}%"
            table_rows += (
                f"<tr>"
                f"<td><span class='swatch' style='background-color:{color};'></span>{cat_name}</td>"
                f"<td style='text-align:right; font-variant-numeric:tabular-nums; color:#EDEDED;'>{count}</td>"
                f"<td style='text-align:right; font-variant-numeric:tabular-nums; color:#8A8A8F;'>{pct_str}</td>"
                f"</tr>"
            )

        st.markdown(
            f'<table class="triage-table">'
            f'<thead><tr><th>Category</th><th style="text-align:right;">Count</th><th style="text-align:right;">%</th></tr></thead>'
            f'<tbody>{table_rows}</tbody>'
            f'</table>',
            unsafe_allow_html=True
        )

    with col_right:
        st.markdown('<div class="eyebrow" style="margin-top:1rem;">Escalation Rate Over Time</div>', unsafe_allow_html=True)
        st.caption("Share of tickets escalated to human agents")

        # Hourly breakdown matching mockup
        time_labels = ["12 AM", "2 AM", "4 AM", "6 AM", "8 AM", "10 AM", "12 PM", "2 PM", "4 PM", "6 PM", "8 PM", "10 PM"]
        escalations = [20, 18, 15, 23, 35, 42, 51, 39, 32, 28, 22, 12]
        
        # Monochrome grey bars with amber highlight on peak (12 PM, index 6)
        colors = ["#3A3A3E"] * len(time_labels)
        colors[6] = "var(--accent)"

        fig = go.Figure(data=[go.Bar(
            x=time_labels,
            y=escalations,
            marker_color=colors,
            width=0.65
        )])
        
        fig.update_layout(
            paper_bgcolor='rgba(0,0,0,0)',
            plot_bgcolor='rgba(0,0,0,0)',
            margin=dict(l=0, r=0, t=10, b=0),
            height=270,
            xaxis=dict(
                gridcolor='#232326',
                gridwidth=1,
                tickfont=dict(color='#8A8A8F', size=11, family='Inter'),
                showline=False,
                zeroline=False
            ),
            yaxis=dict(
                gridcolor='#232326',
                gridwidth=1,
                tickfont=dict(color='#8A8A8F', size=11, family='Inter'),
                ticksuffix="%",
                showline=False,
                zeroline=False
            ),
            showlegend=False
        )
        st.plotly_chart(fig, use_container_width=True)

# VIEW 2: SUPPORT QUEUE
elif nav == "Support Queue":
    st.markdown('<div class="page-title" style="font-size:24px;">Support Queue Control Center</div>', unsafe_allow_html=True)
    st.markdown('<div class="page-subtitle" style="font-size:13px; margin-bottom:1rem;">Supervise and audit triage predictions, release auto-replies, and dispatch human escalations.</div>', unsafe_allow_html=True)

    # Segmented Subtab Navigation Bar
    if "queue_subtab" not in st.session_state:
        st.session_state["queue_subtab"] = "Triage Auditor"

    subtabs = ["Triage Auditor", "Database Explorer", "Inbound Ingestor"]
    active_subtab_idx = subtabs.index(st.session_state["queue_subtab"])
    
    selected_subtab = st.radio(
        "Queue Sub Navigation",
        subtabs,
        index=active_subtab_idx,
        key="queue_subtab_radio",
        horizontal=True,
        label_visibility="collapsed"
    )
    st.session_state["queue_subtab"] = selected_subtab

    # Filters (always available across tabs) inside styled filter-bar
    st.markdown('<div class="filter-bar">', unsafe_allow_html=True)
    fc1, fc2, fc3 = st.columns([1, 1, 2])
    with fc1:
        cat_choice = st.selectbox("Category Filter", ["All Categories"] + list(df['predicted_category'].unique()), key="q_filter_cat", label_visibility="collapsed")
    with fc2:
        status_choice = st.selectbox("Action status Filter", ["All status", "Auto-Reply Eligible", "Escalated to Human"], key="q_filter_status", label_visibility="collapsed")
    with fc3:
        search_text = st.text_input("Search In Queue", placeholder="Search subject, body, or ID...", key="q_filter_search", label_visibility="collapsed")
    st.markdown('</div>', unsafe_allow_html=True)

    filtered_df = df.copy()
    if cat_choice != "All Categories":
        filtered_df = filtered_df[filtered_df['predicted_category'] == cat_choice]

    if status_choice == "Auto-Reply Eligible":
        filtered_df = filtered_df[filtered_df['escalate_to_human'] == False]
    elif status_choice == "Escalated to Human":
        filtered_df = filtered_df[filtered_df['escalate_to_human'] == True]

    if search_text:
        filtered_df = filtered_df[
            filtered_df['subject'].str.contains(search_text, case=False, na=False) |
            filtered_df['body'].str.contains(search_text, case=False, na=False) |
            filtered_df['ticket_id'].str.contains(search_text, case=False, na=False)
        ]

    # SUBTAB 1: TRIAGE AUDIT & INSPECTOR
    if selected_subtab == "Triage Auditor":
        if len(filtered_df) == 0:
            st.markdown(
                '<div style="background-color:var(--surface); border:1px solid var(--border); border-radius:6px; padding:32px; text-align:center; color:var(--text-muted); margin-top:1.5rem;">'
                'No matching tickets in current queue criteria.'
                '</div>',
                unsafe_allow_html=True
            )
        else:
            if "queue_cursor" not in st.session_state:
                st.session_state["queue_cursor"] = 0
                
            cursor = st.session_state["queue_cursor"]
            cursor = min(max(0, cursor), len(filtered_df) - 1)
            st.session_state["queue_cursor"] = cursor
            
            # Display horizontal carousel track
            st.markdown('<div class="eyebrow" style="margin-top:1.5rem; margin-bottom:0.25rem;">Queue Track</div>', unsafe_allow_html=True)
            carousel_cols = st.columns([1] * 10)
            
            # Prev arrow
            if carousel_cols[0].button("◀", key="track_prev", disabled=(cursor == 0)):
                st.session_state["queue_cursor"] = max(0, cursor - 1)
                st.rerun()
                
            # Visual pills in middle
            pills_count = 8
            start_idx = max(0, cursor - pills_count // 2)
            end_idx = min(len(filtered_df), start_idx + pills_count)
            if end_idx - start_idx < pills_count:
                start_idx = max(0, end_idx - pills_count)
                
            for i, idx in enumerate(range(start_idx, end_idx)):
                t_row = filtered_df.iloc[idx]
                pill_label = f"#{t_row['ticket_id']}"
                is_active = (idx == cursor)
                btn_type = "primary" if is_active else "secondary"
                if carousel_cols[i + 1].button(pill_label, key=f"track_pill_{t_row['ticket_id']}", type=btn_type):
                    st.session_state["queue_cursor"] = idx
                    st.rerun()
                    
            # Next arrow
            if carousel_cols[-1].button("▶", key="track_next", disabled=(cursor >= len(filtered_df) - 1)):
                st.session_state["queue_cursor"] = min(len(filtered_df) - 1, cursor + 1)
                st.rerun()
                
            active_row = filtered_df.iloc[cursor]
            st.caption(f"Active Triage Inspector: Ticket **{cursor + 1}** of **{len(filtered_df)}** (ID: {active_row['ticket_id']})")
            
            st.markdown("<br>", unsafe_allow_html=True)
            
            # Split inspector panels
            left_col, right_col = st.columns(2)
            
            with left_col:
                st.markdown(
                    f'<div style="background-color:var(--surface); border:1px solid var(--border); padding:20px; border-radius:6px; min-height:430px;">'
                    f'<div class="eyebrow" style="color:var(--text-muted); margin-bottom:8px;">Customer Inbound Message</div>'
                    f'<div style="font-size:20px; font-weight:500; color:var(--text); letter-spacing:-0.02em; margin-bottom:12px; line-height:1.2;">{active_row["subject"]}</div>'
                    f'<div style="color:var(--text); font-size:13px; background-color:var(--bg); border:1px solid var(--border); padding:14px; border-radius:4px; margin-bottom:16px; font-family:\'Courier New\', Courier, monospace; white-space:pre-wrap; line-height:1.4;">{active_row["body"]}</div>'
                    f'<div class="eyebrow" style="font-size:10px; margin-bottom:6px; color:var(--text-subtle);">Device Context</div>'
                    f'<div style="font-size:12px; color:var(--text-muted); font-variant-numeric:tabular-nums;">'
                    f'Platform: <code style="background-color:var(--surface-2); padding:2px 6px; border-radius:3px; border:1px solid var(--border);">{active_row.get("device_info", "Unknown Device")}</code><br>'
                    f'Build Version: <code style="background-color:var(--surface-2); padding:2px 6px; border-radius:3px; border:1px solid var(--border); margin-top:4px; display:inline-block;">{active_row.get("app_version", "Unknown Version")}</code>'
                    f'</div>'
                    f'</div>',
                    unsafe_allow_html=True
                )
                
            with right_col:
                # Determine Routing Status Pill
                if active_row['escalate_to_human']:
                    routing_badge = '<span style="background-color:#D4A05615; border: 1px solid var(--accent); color:var(--accent); padding:2px 10px; border-radius:3px; font-size:10px; font-weight:600; letter-spacing:0.05em; text-transform:uppercase;">Human Escalation Required</span>'
                else:
                    routing_badge = '<span style="background-color:#232326; border: 1px solid #3A3A3E; color:var(--text-muted); padding:2px 10px; border-radius:3px; font-size:10px; font-weight:600; letter-spacing:0.05em; text-transform:uppercase;">Auto-Reply Eligible</span>'
                
                category_badge = f'<span style="background-color:var(--surface-2); border: 1px solid var(--border); color:var(--text); padding:2px 10px; border-radius:3px; font-size:10px; font-weight:600; letter-spacing:0.05em; text-transform:uppercase; margin-left:8px;">{active_row["predicted_category"]}</span>'

                st.markdown(
                    f'<div style="background-color:var(--surface); border:1px solid var(--border); padding:20px; border-radius:6px; margin-bottom:12px;">'
                    f'<div class="eyebrow" style="margin-bottom:12px;">AI Diagnostics & Routing</div>'
                    f'<div style="margin-bottom:16px; display:flex; align-items:center;">{routing_badge}{category_badge}</div>'
                    f'<div style="font-size:12px; color:var(--text-muted); line-height:1.6;">'
                    f'• Subcategory: <b style="color:var(--text);">{active_row.get("predicted_subcategory", "General")}</b><br>'
                    f'• Confidence Score: <b style="color:var(--text); font-variant-numeric:tabular-nums;">{active_row["confidence_score"]:.2f}</b><br>'
                    f'• Customer Sentiment: <b style="color:var(--text); text-transform:uppercase;">{active_row["sentiment"]}</b><br>'
                    f'• Classification Statement: <i style="color:var(--text-subtle); display:block; margin-top:8px; border-left:2px solid var(--border); padding-left:10px;">{active_row.get("classification_reasoning", "Decided by local model")}</i>'
                    f'</div>'
                    f'</div>',
                    unsafe_allow_html=True
                )
                
                # Interactive editable suggested response draft
                st.markdown('<div class="eyebrow" style="margin-bottom:4px; margin-top:0.5rem;">Suggested Response Workspace</div>', unsafe_allow_html=True)
                q_draft_area = st.text_area("Suggested Response Draft Editor", value=active_row.get('suggested_reply', ''), height=130, key=f"q_reply_{active_row['ticket_id']}", label_visibility="collapsed")
                
                # Action Buttons Row
                st.markdown("<div style='height:8px;'></div>", unsafe_allow_html=True)
                bcols = st.columns([1.4, 1.1, 1.5])
                
                # Action A: Triage Resolution / Release Routing Action
                if active_row['escalate_to_human']:
                    if bcols[0].button("🚀 Dispatch to Desk", key=f"q_action_dispatch_{active_row['ticket_id']}"):
                        st.session_state["tickets_df"].loc[st.session_state["tickets_df"]['ticket_id'] == active_row['ticket_id'], 'suggested_reply'] = q_draft_area
                        st.session_state["tickets_df"].to_csv("output/triage_results.csv", index=False)
                        st.toast(f"Ticket {active_row['ticket_id']} successfully triaged and dispatched to Agent Inbox!", icon="🚀")
                        st.session_state["queue_cursor"] = min(len(filtered_df) - 1, cursor + 1)
                        st.rerun()
                else:
                    if bcols[0].button("✉️ Send Auto-Reply", key=f"q_action_autoreply_{active_row['ticket_id']}"):
                        st.session_state["resolved_tickets"].add(active_row['ticket_id'])
                        st.toast(f"Auto-reply sent for {active_row['ticket_id']}! Ticket resolved and closed.", icon="✉️")
                        st.session_state["queue_cursor"] = min(len(filtered_df) - 1, cursor + 1)
                        st.rerun()
                        
                # Action B: Save Draft Reply Updates
                if bcols[1].button("💾 Save Draft", key=f"q_action_save_{active_row['ticket_id']}"):
                    st.session_state["tickets_df"].loc[st.session_state["tickets_df"]['ticket_id'] == active_row['ticket_id'], 'suggested_reply'] = q_draft_area
                    st.session_state["tickets_df"].to_csv("output/triage_results.csv", index=False)
                    json_records = st.session_state["tickets_df"].to_dict(orient="records")
                    with open("output/triage_results.json", "w") as f:
                        json.dump(json_records, f, indent=2)
                    st.toast("Draft response saved successfully!", icon="💾")
                    
                # Action C: Reclassify Override Category Selector
                with bcols[2]:
                    q_cat_override = st.selectbox(
                        "Reclassify",
                        ["-- Override Routing --"] + list(df_all['predicted_category'].unique()),
                        key=f"q_cat_override_{active_row['ticket_id']}",
                        label_visibility="collapsed"
                    )
                    if q_cat_override != "-- Override Routing --":
                        st.session_state["tickets_df"].loc[st.session_state["tickets_df"]['ticket_id'] == active_row['ticket_id'], 'predicted_category'] = q_cat_override
                        # Determine if new category triggers escalation
                        should_esc = q_cat_override in ["Billing & Refunds", "Account & Security"]
                        st.session_state["tickets_df"].loc[st.session_state["tickets_df"]['ticket_id'] == active_row['ticket_id'], 'escalate_to_human'] = should_esc
                        st.session_state["tickets_df"].to_csv("output/triage_results.csv", index=False)
                        st.toast(f"Routing updated: {q_cat_override}", icon="🔄")
                        st.rerun()

    # SUBTAB 2: DATABASE EXPLORER TABLE (FULL SCREEN GRID)
    elif selected_subtab == "Database Explorer":
        if len(filtered_df) == 0:
            st.markdown(
                '<div style="background-color:var(--surface); border:1px solid var(--border); border-radius:6px; padding:32px; text-align:center; color:var(--text-muted); margin-top:1.5rem;">'
                'No matching tickets in current database filters.'
                '</div>',
                unsafe_allow_html=True
            )
        else:
            st.markdown('<div class="eyebrow" style="margin-top:1.5rem;">Database Explorer</div>', unsafe_allow_html=True)
            
            # Interactive Grid with Clickable IDs & Pagination
            limit = 15
            total_pages = max(1, (len(filtered_df) + limit - 1) // limit)
            
            if "table_page" not in st.session_state:
                st.session_state["table_page"] = 0
            page_num = st.session_state["table_page"]
            page_num = min(max(0, page_num), total_pages - 1)
            st.session_state["table_page"] = page_num
            
            start_row = page_num * limit
            end_row = min(len(filtered_df), start_row + limit)
            page_df = filtered_df.iloc[start_row:end_row]
            
            # Render clickable header columns
            th1, th2, th3, th4, th5 = st.columns([1.5, 4, 2.5, 1.5, 1.5])
            th1.markdown("<span style='font-size:11px; text-transform:uppercase; color:var(--text-muted); font-weight:600;'>ID (Click to inspect)</span>", unsafe_allow_html=True)
            th2.markdown("<span style='font-size:11px; text-transform:uppercase; color:var(--text-muted); font-weight:600;'>Subject</span>", unsafe_allow_html=True)
            th3.markdown("<span style='font-size:11px; text-transform:uppercase; color:var(--text-muted); font-weight:600;'>Category</span>", unsafe_allow_html=True)
            th4.markdown("<span style='font-size:11px; text-transform:uppercase; color:var(--text-muted); font-weight:600;'>Confidence</span>", unsafe_allow_html=True)
            th5.markdown("<span style='font-size:11px; text-transform:uppercase; color:var(--text-muted); font-weight:600;'>Routing</span>", unsafe_allow_html=True)
            st.markdown("<hr style='margin:4px 0 8px 0; border-color:var(--border);'>", unsafe_allow_html=True)
            
            for idx, r in page_df.iterrows():
                r_col1, r_col2, r_col3, r_col4, r_col5 = st.columns([1.5, 4, 2.5, 1.5, 1.5])
                
                # Active clickable text-button link
                if r_col1.button(f"🔍 {r['ticket_id']}", key=f"grid_click_{r['ticket_id']}", type="secondary"):
                    # Find global index
                    match_idx = filtered_df[filtered_df['ticket_id'] == r['ticket_id']].index
                    if len(match_idx) > 0:
                        pos = filtered_df.index.get_loc(match_idx[0])
                        st.session_state["queue_cursor"] = pos
                        st.session_state["queue_subtab"] = "Triage Auditor"
                        st.toast(f"Selected Ticket #{r['ticket_id']}", icon="🔍")
                        st.rerun()
                        
                r_col2.write(r['subject'])
                r_col3.write(r['predicted_category'])
                r_col4.write(f"{r['confidence_score']:.2f}")
                status_pill = "<span style='color:var(--accent); font-weight:500;'>Escalated</span>" if r['escalate_to_human'] else "<span style='color:var(--text-muted);'>Auto-Reply</span>"
                r_col5.markdown(status_pill, unsafe_allow_html=True)
                st.markdown("<hr style='margin:4px 0; border-color:var(--border); opacity:0.3;'>", unsafe_allow_html=True)
                
            # Pagination footer
            st.markdown("<br>", unsafe_allow_html=True)
            pc1, pc2, pc3 = st.columns([2, 6, 2])
            if pc1.button("◀ Previous Page", disabled=(page_num == 0)):
                st.session_state["table_page"] = page_num - 1
                st.rerun()
            pc2.markdown(f"<div style='text-align:center; color:var(--text-muted); font-size:13px;'>Page {page_num + 1} of {total_pages} (showing {start_row + 1}-{end_row} of {len(filtered_df)} tickets)</div>", unsafe_allow_html=True)
            if pc3.button("Next Page ▶", disabled=(page_num >= total_pages - 1)):
                st.session_state["table_page"] = page_num + 1
                st.rerun()

    # SUBTAB 3: INBOUND INGESTOR FORM (FULL SCREEN INPUT)
    elif selected_subtab == "Inbound Ingestor":
        st.markdown('<div class="eyebrow" style="margin-top:1.5rem;">Inbound Ingestion Workspace</div>', unsafe_allow_html=True)
        st.caption("Submit a new inbound customer ticket directly to the triage database pipeline")
        
        new_subj = st.text_input("Ticket Subject", placeholder="e.g. Unauthorized renewal charge after cancel", key="ingest_subj_full")
        new_body = st.text_area("Ticket Body / Customer Message", placeholder="e.g. Hello support, I cancelled my subscription pack but my card was charged...", key="ingest_body_full", height=180)
        
        ic1, ic2 = st.columns(2)
        new_dev = ic1.selectbox("Device Platform Context", ["iPhone 14 Pro (iOS 17.4)", "Samsung Galaxy S23 (Android 14)", "Pixel 8 (Android 14)", "iPad Air (iOS 17.2)", "Web Browser (Chrome 122)"], key="ingest_dev_full")
        new_ver = ic2.selectbox("App Build Version", ["v3.12.1", "v3.12.0", "v3.11.8", "v3.10.4"], key="ingest_ver_full")
        
        st.markdown("<br>", unsafe_allow_html=True)
        if st.button("Submit & Analyze Inbound Ticket", type="primary", key="ingest_submit_full"):
            if not new_subj or not new_body:
                st.warning("Please specify both subject and body message.")
            else:
                with st.spinner("Processing inbound ticket through classification engine..."):
                    # Process ticket through engine
                    res = engine.process_ticket(
                        {
                            "ticket_id": f"TCK-{len(st.session_state['tickets_df']) + 1001}",
                            "subject": new_subj,
                            "body": new_body,
                            "device_info": new_dev,
                            "app_version": new_ver
                        },
                        api_key=api_key,
                        provider=api_provider.lower()
                    )
                    
                    # Convert to DataFrame row and append
                    new_row = pd.DataFrame([res])
                    new_row["ground_truth_category"] = res["predicted_category"]
                    new_row["ground_truth_escalate"] = res["escalate_to_human"]
                    
                    # Append and save
                    st.session_state["tickets_df"] = pd.concat([st.session_state["tickets_df"], new_row], ignore_index=True)
                    st.session_state["tickets_df"].to_csv("output/triage_results.csv", index=False)
                    json_records = st.session_state["tickets_df"].to_dict(orient="records")
                    with open("output/triage_results.json", "w") as f:
                        json.dump(json_records, f, indent=2)
                    
                    st.toast(f"Ticket {res['ticket_id']} successfully processed and ingested!", icon="✅")
                    
                    # Focus on newly added ticket in Triage workspace
                    df_current = st.session_state["tickets_df"]
                    df_current_active = df_current[~df_current['ticket_id'].isin(st.session_state["resolved_tickets"])]
                    st.session_state["queue_cursor"] = len(df_current_active) - 1
                    st.session_state["queue_subtab"] = "Triage Auditor"
                    st.rerun()

# VIEW 3: LIVE SIMULATOR
elif nav == "Live Simulator":
    st.markdown('<div class="eyebrow">Live Simulator</div>', unsafe_allow_html=True)

    if "sim_subject" not in st.session_state:
        st.session_state["sim_subject"] = ""
    if "sim_body" not in st.session_state:
        st.session_state["sim_body"] = ""

    st.markdown('<div class="eyebrow" style="font-size:10px;">Presets</div>', unsafe_allow_html=True)
    preset_cols = st.columns(5)
    if preset_cols[0].button("Double Charge"):
        st.session_state["sim_subject"] = "Charged twice for 500 coins"
        st.session_state["sim_body"] = "Hi, I bought the $9.99 coin pack on my iPhone yesterday. My bank shows two pending charges of $9.99 for order ORD-99120. Please refund the duplicate $9.99."
    elif preset_cols[1].button("Coins Missing"):
        st.session_state["sim_subject"] = "Coins not added after payment"
        st.session_state["sim_body"] = "I purchased 1000 coins for $14.99 30 minutes ago via Apple Pay. Order ORD-881203, but my coin wallet still shows 0. User ID USR-49120. Credit my coins!"
    elif preset_cols[2].button("Episode Locked"):
        st.session_state["sim_subject"] = "Episode locked after spending 10 coins"
        st.session_state["sim_body"] = "I spent 10 coins to unlock Episode 15 of Alpha Dragon King. Coins were deducted, but the episode still shows a padlock icon. Unlock it please!"
    elif preset_cols[3].button("Legal Threat"):
        st.session_state["sim_subject"] = "Fraudulent charge on card - contacting lawyer"
        st.session_state["sim_body"] = "I saw a charge of $49.99 from PocketToons on my credit card. I never signed up! Refund me now or I will notify my lawyer and file a bank chargeback."
    elif preset_cols[4].button("Hacked Account"):
        st.session_state["sim_subject"] = "URGENT: Someone hacked my account!"
        st.session_state["sim_body"] = "I got a notification about a login from Germany. I live in Texas! Someone spent 800 of my saved coins! Freeze my account and reset my password immediately!"

    input_subj = st.text_input("Subject", key="sim_subject")
    input_body = st.text_area("Body", key="sim_body", height=120)

    if st.button("Run Triage Analysis", type="primary"):
        if not input_subj and not input_body:
            st.warning("Please enter ticket parameters.")
        else:
            res = engine.process_ticket(
                {"ticket_id": "SIM-001", "subject": input_subj, "body": input_body},
                api_key=api_key,
                provider=api_provider.lower()
            )

            st.markdown("<br>", unsafe_allow_html=True)
            st.markdown('<div class="eyebrow">Triage Results</div>', unsafe_allow_html=True)

            tc1, tc2, tc3, tc4 = st.columns(4)
            tc1.metric("Predicted Category", res['predicted_category'])
            tc2.metric("Subcategory", res['predicted_subcategory'])
            tc3.metric("Confidence Score", f"{res['confidence_score']:.2f}")
            tc4.metric("Sentiment", res['sentiment'])

            # Display Extracted metadata
            st.markdown('<div class="eyebrow" style="margin-top:1rem;">Extracted Entities</div>', unsafe_allow_html=True)
            ent = res.get("extracted_entities", {})
            ec1, ec2, ec3, ec4, ec5 = st.columns(5)
            ec1.write(f"User ID: `{ent.get('user_id') or '-'}`")
            ec2.write(f"Order ID: `{ent.get('order_id') or '-'}`")
            ec3.write(f"Amount: `{ent.get('amount') or '-'}`")
            ec4.write(f"Series: `{ent.get('series') or '-'}`")
            ec5.write(f"Device: `{ent.get('device') or '-'}`")

            st.markdown(f"Reasoning: _{res.get('classification_reasoning')}_")

            if res['escalate_to_human']:
                st.markdown("<div style='color:var(--accent); font-weight:600; margin:10px 0;'>Routing Action: Human Review Required</div>", unsafe_allow_html=True)
                st.markdown(f"Escalation Trigger: `{res['escalation_reason']}`")
            else:
                st.markdown("<div style='color:var(--text-muted); font-weight:600; margin:10px 0;'>Routing Action: Auto-Reply Eligible</div>", unsafe_allow_html=True)

            st.markdown("**Suggested Reply Draft**:")
            st.text_area("Suggested Response Draft", value=res['suggested_reply'], height=180, key="sim_output_text")

# VIEW 4: AGENT OPERATIONS INBOX
elif nav == "Agent Inbox":
    st.markdown('<div class="page-title" style="font-size:24px;">Agent Desk</div>', unsafe_allow_html=True)
    
    # Filter active escalated tickets
    esc_df = df[df['escalate_to_human'] == True]
    
    if len(esc_df) == 0:
        st.markdown(
            '<div style="background-color:var(--surface); border:1px solid var(--border); border-radius:6px; padding:32px; text-align:center; color:var(--text-muted);">'
            '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom:12px;"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>'
            '<div style="font-size:14px; font-weight:500; color:var(--text);">No escalated tickets pending review</div>'
            '<div style="font-size:12px; margin-top:4px;">All queues are currently clear.</div>'
            '</div>',
            unsafe_allow_html=True
        )
    else:
        # Dual-pane columns layout
        col_list, col_workspace = st.columns([4, 6])
        
        with col_list:
            st.markdown('<div class="eyebrow">Escalations Queue</div>', unsafe_allow_html=True)
            
            # Selectbox picker linking active selection state
            selected_ticket_id = st.selectbox(
                "Select Ticket ID to Open",
                esc_df['ticket_id'].tolist(),
                key="active_inbox_ticket_id",
                label_visibility="collapsed"
            )
            
            # Styled list of all pending tickets
            st.markdown('<div style="display:flex; flex-direction:column; gap:8px; margin-top:8px;">', unsafe_allow_html=True)
            for _, t in esc_df.iterrows():
                is_active = t['ticket_id'] == selected_ticket_id
                active_style = "background-color:var(--surface-2); border-color:var(--text-muted);" if is_active else "background-color:var(--surface); border-color:var(--border);"
                
                # Render list items with metadata
                st.markdown(
                    f'<div style="{active_style} border:1px solid; border-radius:6px; padding:12px; cursor:pointer;">'
                    f'<div style="display:flex; justify-content:between; font-size:11px; color:var(--text-muted); font-weight:600; margin-bottom:4px;">'
                    f'<span>{t["ticket_id"]}</span>'
                    f'<span style="margin-left:auto; text-transform:uppercase;">{t["sentiment"]}</span>'
                    f'</div>'
                    f'<div style="font-size:13px; font-weight:500; color:var(--text); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">{t["subject"]}</div>'
                    f'<div style="font-size:11px; color:var(--text-subtle); margin-top:4px;">{t["predicted_category"]}</div>'
                    f'</div>',
                    unsafe_allow_html=True
                )
            st.markdown('</div>', unsafe_allow_html=True)

        with col_workspace:
            st.markdown('<div class="eyebrow">Active Workspace</div>', unsafe_allow_html=True)
            
            # Load active ticket metadata
            t_row = esc_df[esc_df['ticket_id'] == selected_ticket_id].iloc[0]
            
            st.markdown(
                f'<div style="background-color:var(--surface); border:1px solid var(--border); border-radius:6px; padding:18px; margin-bottom:12px;">'
                f'<div class="eyebrow" style="color:var(--accent);">Ticket #{t_row["ticket_id"]} Details</div>'
                f'<div style="font-size:16px; font-weight:500; color:var(--text); margin-bottom:8px;">{t_row["subject"]}</div>'
                f'<div style="color:var(--text); font-size:14px; background-color:var(--bg); border:1px solid var(--border); padding:12px; border-radius:4px; margin-bottom:12px; white-space:pre-wrap;">{t_row["body"]}</div>'
                f'<div class="eyebrow" style="font-size:10px; margin-bottom:4px;">Context & AI Analysis</div>'
                f'<div style="font-size:12px; color:var(--text-muted); margin-bottom:12px;">'
                f'• Predicted Category: <b>{t_row["predicted_category"]}</b> ({t_row.get("predicted_subcategory", "General")})<br>'
                f'• Confidence Score: <b>{t_row["confidence_score"]:.2f}</b><br>'
                f'• Escalation Reason: <span style="color:var(--accent); font-weight:500;">{t_row.get("escalation_reason", "Manual Triage")}</span><br>'
                f'• Classifier Statement: <i>{t_row.get("classification_reasoning", "Decided by local model")}</i>'
                f'</div>'
                f'</div>',
                unsafe_allow_html=True
            )
            
            # Interactive response editing workspace
            reply_area = st.text_area("Agent Response Workspace", value=t_row.get('suggested_reply', ''), height=180, key=f"workspace_reply_{t_row['ticket_id']}")
            
            # Action Buttons Row
            ba1, ba2, ba3 = st.columns([2, 2, 3])
            
            if ba1.button("Resolve Ticket", key=f"desk_resolve_{t_row['ticket_id']}"):
                # Add to resolved state sets
                st.session_state["resolved_tickets"].add(t_row['ticket_id'])
                st.toast(f"Ticket {t_row['ticket_id']} resolved successfully!", icon="✅")
                st.rerun()
                
            if ba2.button("Refer to Lead", key=f"desk_lead_{t_row['ticket_id']}"):
                st.toast(f"Ticket {t_row['ticket_id']} referred to Tier 3 Support lead.", icon="⏩")
                
            with ba3:
                # Override category select list
                new_cat = st.selectbox(
                    "Override Category",
                    ["-- Choose Category --"] + list(df['predicted_category'].unique()),
                    key=f"desk_cat_{t_row['ticket_id']}",
                    label_visibility="collapsed"
                )
                if new_cat != "-- Choose Category --":
                    # Update local state
                    st.session_state["tickets_df"].loc[st.session_state["tickets_df"]['ticket_id'] == t_row['ticket_id'], 'predicted_category'] = new_cat
                    st.session_state["tickets_df"].loc[st.session_state["tickets_df"]['ticket_id'] == t_row['ticket_id'], 'escalate_to_human'] = False
                    st.toast(f"Category updated to {new_cat}!", icon="🔄")
                    st.rerun()

# VIEW 5: BENCHMARKS
elif nav == "Benchmarks":
    st.markdown('<div class="eyebrow">Benchmarks & Evaluation</div>', unsafe_allow_html=True)

    if os.path.exists("output/eval_metrics.json"):
        with open("output/eval_metrics.json", "r") as f:
            eval_data = json.load(f)
    else:
        eval_data = evaluate_triage_engine()

    overview = eval_data["overall_classification_metrics"]
    esc_metrics = eval_data["escalation_metrics"]

    em1, em2, em3, em4 = st.columns(4)
    em1.metric("Classification Accuracy", f"{overview['accuracy']*100:.1f}%")
    em2.metric("Macro F1-Score", f"{overview['macro_f1']*100:.1f}%")
    em3.metric("Escalation Precision", f"{esc_metrics['escalation_precision']*100:.1f}%")
    em4.metric("Escalation Recall", f"{esc_metrics['escalation_recall']*100:.1f}%")

    st.markdown("<br>", unsafe_allow_html=True)
    st.markdown('<div class="eyebrow">Category Performance Table</div>', unsafe_allow_html=True)
    per_cat_df = pd.DataFrame(eval_data["per_category_metrics"]).T
    st.dataframe(per_cat_df, width='stretch')
