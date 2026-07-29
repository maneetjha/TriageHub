import { useMemo, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import type { Ticket } from "@/lib/triage-data";
import { taxonomy } from "@/lib/triage-data";
import { generateLlmReply } from "@/lib/triage-classify";
import { Eyebrow, Panel, PageTitle, Button, Select, Textarea, SentimentBadge, CategoryTag } from "@/components/ui";

const CATS = taxonomy.categories.map((c) => c.name);

export function AgentInboxView({
  tickets,
  resolved,
  onResolve,
  onUpdate,
  provider,
  apiKey,
}: {
  tickets: Ticket[];
  resolved: Set<string>;
  onResolve: (id: string) => void;
  onUpdate: (id: string, patch: Partial<Ticket>) => void;
  provider: string;
  apiKey: string;
}) {
  const esc = useMemo(() => tickets.filter((t) => t.escalate_to_human), [tickets]);

  if (esc.length === 0) {
    return (
      <div className="px-8 py-6">
        <PageTitle title="Agent Desk" subtitle="Escalated tickets awaiting human review." />
        <Panel className="px-8 py-12 text-center">
          <CheckCircle2 size={26} className="mx-auto text-text-subtle" strokeWidth={1.5} />
          <div className="mt-3 text-[14px] font-medium text-text">No escalated tickets pending review</div>
          <div className="mt-1 text-[12px] text-text-muted">All queues are currently clear.</div>
        </Panel>
      </div>
    );
  }

  return <Desk tickets={esc} resolved={resolved} onResolve={onResolve} onUpdate={onUpdate} provider={provider} apiKey={apiKey} />;
}

function Desk({
  tickets, resolved, onResolve, onUpdate, provider, apiKey,
}: {
  tickets: Ticket[];
  resolved: Set<string>;
  onResolve: (id: string) => void;
  onUpdate: (id: string, patch: Partial<Ticket>) => void;
  provider: string;
  apiKey: string;
}) {
  const [activeId, setActiveId] = useState(tickets[0].ticket_id);
  const row = tickets.find((t) => t.ticket_id === activeId) ?? tickets[0];
  const [reply, setReply] = useState(row.suggested_reply);
  const [override, setOverride] = useState("-- Choose Category --");
  const [aiLoading, setAiLoading] = useState(false);
  const lastKey = row.ticket_id;
  const [key, setKey] = useState(lastKey);
  if (key !== lastKey) { setReply(row.suggested_reply); setKey(lastKey); }

  return (
    <div className="px-8 py-6">
      <PageTitle title="Agent Desk" subtitle="Escalated tickets awaiting human review." />
      <div className="grid grid-cols-10 gap-4">
        {/* List */}
        <div className="col-span-4">
          <Eyebrow className="mb-2">Escalations Queue</Eyebrow>
          <div className="space-y-2">
            {tickets.map((t) => {
              const isActive = t.ticket_id === activeId;
              return (
                <button
                  key={t.ticket_id}
                  onClick={() => setActiveId(t.ticket_id)}
                  className="w-full rounded-md border px-3 py-2.5 text-left transition-colors"
                  style={isActive ? { backgroundColor: "var(--surface-2)", borderColor: "var(--text-muted)" } : { backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
                >
                  <div className="flex items-center justify-between text-[11px] font-semibold text-text-muted">
                    <span>{t.ticket_id}</span>
                    <span className="uppercase">{t.sentiment}</span>
                  </div>
                  <div className="mt-0.5 truncate text-[13px] font-medium text-text">{t.subject}</div>
                  <div className="mt-0.5 text-[11px] text-text-subtle">{t.predicted_category}{resolved.has(t.ticket_id) ? " · resolved" : ""}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Workspace */}
        <div className="col-span-6">
          <Eyebrow className="mb-2">Active Workspace</Eyebrow>
          <Panel className="p-5">
            <Eyebrow className="mb-1.5" >
              <span style={{ color: "var(--accent)" }}>Ticket #{row.ticket_id} Details</span>
            </Eyebrow>
            <div className="mb-2 text-[16px] font-medium text-text">{row.subject}</div>
            <div className="mb-3 whitespace-pre-wrap rounded-[4px] border border-th-border bg-bg px-3 py-2.5 text-[13px] text-text">{row.body}</div>
            <Eyebrow className="mb-1.5">Context & AI Analysis</Eyebrow>
            <div className="mb-3 space-y-1 text-[12px] text-text-muted">
              <div>Predicted Category: <CategoryTag>{row.predicted_category}</CategoryTag> ({row.predicted_subcategory})</div>
              <div>Confidence Score: <b className="text-text tabular-nums">{row.confidence_score.toFixed(2)}</b></div>
              <div>Escalation Reason: <span className="text-accent">{row.escalation_reason || "Manual Triage"}</span></div>
              <div>Classifier Statement: <span className="italic text-text-subtle">{row.classification_reasoning || "Decided by local model"}</span></div>
            </div>
          </Panel>

          <div className="mt-3">
            <Eyebrow className="mb-1.5">Agent Response Workspace</Eyebrow>
            <Textarea value={reply} onChange={(e) => setReply(e.target.value)} rows={7} className="text-[12px]" />
             <div className="mt-3 flex items-center gap-2">
              <Button variant="primary" onClick={() => { onResolve(row.ticket_id); }}>Resolve Ticket</Button>
              <Button onClick={() => { /* toast */ }}>Refer to Lead</Button>
              <Button
                onClick={async () => {
                  if (!apiKey) {
                    alert("Please expand 'LLM Integration' in the sidebar and enter your API Key first.");
                    return;
                  }
                  setAiLoading(true);
                  const draft = await generateLlmReply(row, provider, apiKey);
                  setReply(draft);
                  onUpdate(row.ticket_id, { suggested_reply: draft });
                  setAiLoading(false);
                }}
                disabled={aiLoading}
              >
                {aiLoading ? "Drafting..." : "✨ AI Draft"}
              </Button>
              <Select
                value={override}
                onChange={(e) => {
                  const v = e.target.value;
                  if (v !== "-- Choose Category --") {
                    onUpdate(row.ticket_id, { predicted_category: v, escalate_to_human: false });
                    setOverride("-- Choose Category --");
                  }
                }}
              >
                <option>-- Choose Category --</option>
                {CATS.map((c) => <option key={c}>{c}</option>)}
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
