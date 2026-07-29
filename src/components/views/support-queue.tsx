import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import type { Ticket } from "@/lib/triage-data";
import { taxonomy } from "@/lib/triage-data";
import { processTicket, processTicketSync, generateLlmReply } from "@/lib/triage-classify";
import { Eyebrow, Panel, PageTitle, Button, Select, Input, Textarea, SentimentBadge, RoutingBadge, CategoryTag, ConfidenceBar } from "@/components/ui";

const CATS = taxonomy.categories.map((c) => c.name);
const DEVICES = ["iPhone 14 Pro (iOS 17.4)", "Samsung Galaxy S23 (Android 14)", "Pixel 8 (Android 14)", "iPad Air (iOS 17.2)", "Web Browser (Chrome 122)"];
const VERSIONS = ["v3.12.1", "v3.12.0", "v3.11.8", "v3.10.4"];
const SUBTABS = ["Triage Auditor", "Database Explorer", "Inbound Ingestor"] as const;
type SubTab = (typeof SUBTABS)[number];

export function SupportQueueView({
  tickets,
  resolved,
  onResolve,
  onUpdate,
  onAdd,
  focusId,
  provider,
  apiKey,
}: {
  tickets: Ticket[];
  resolved: Set<string>;
  onResolve: (id: string) => void;
  onUpdate: (id: string, patch: Partial<Ticket>) => void;
  onAdd: (t: Ticket) => void;
  focusId: string | null;
  provider: string;
  apiKey: string;
}) {
  const [subtab, setSubtab] = useState<SubTab>("Triage Auditor");
  const [catFilter, setCatFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("All status");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let f = tickets;
    if (catFilter !== "All Categories") f = f.filter((t) => t.predicted_category === catFilter);
    if (statusFilter === "Auto-Reply Eligible") f = f.filter((t) => !t.escalate_to_human);
    else if (statusFilter === "Escalated to Human") f = f.filter((t) => t.escalate_to_human);
    if (search) {
      const q = search.toLowerCase();
      f = f.filter((t) => t.subject.toLowerCase().includes(q) || t.body.toLowerCase().includes(q) || t.ticket_id.toLowerCase().includes(q));
    }
    return f;
  }, [tickets, catFilter, statusFilter, search]);

  return (
    <div className="px-8 py-6">
      <PageTitle title="Support Queue Control Center" subtitle="Supervise and audit triage predictions, release auto-replies, and dispatch human escalations." />

      {/* Subtabs */}
      <div className="mb-4 flex gap-6 border-b border-th-border">
        {SUBTABS.map((s) => (
          <button
            key={s}
            onClick={() => setSubtab(s)}
            className="relative -mb-px pb-2.5 text-[13px] font-medium transition-colors"
            style={{ color: subtab === s ? "var(--text)" : "var(--text-muted)" }}
          >
            {s}
            {subtab === s && <span className="absolute inset-x-0 -bottom-px h-[2px] rounded-full bg-accent" />}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="mb-5 flex items-center gap-3">
        <Select value={catFilter} onChange={(e) => setCatFilter(e.target.value)}>
          <option>All Categories</option>
          {CATS.map((c) => <option key={c}>{c}</option>)}
        </Select>
        <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option>All status</option>
          <option>Auto-Reply Eligible</option>
          <option>Escalated to Human</option>
        </Select>
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-subtle" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search subject, body, or ID..." className="pl-7" />
        </div>
        <span className="text-[12px] text-text-subtle">{filtered.length} tickets</span>
      </div>

      {filtered.length === 0 ? (
        <Panel className="px-8 py-10 text-center text-text-muted">No matching tickets in current queue criteria.</Panel>
      ) : subtab === "Triage Auditor" ? (
        <TriageAuditor tickets={filtered} resolved={resolved} onResolve={onResolve} onUpdate={onUpdate} focusId={focusId} provider={provider} apiKey={apiKey} />
      ) : subtab === "Database Explorer" ? (
        <DatabaseExplorer tickets={filtered} onJump={(id) => { onResolve; }} focusId={focusId} />
      ) : (
        <InboundIngestor onAdd={onAdd} provider={provider} apiKey={apiKey} />
      )}
    </div>
  );
}

function TriageAuditor({
  tickets, resolved, onResolve, onUpdate, focusId, provider, apiKey,
}: {
  tickets: Ticket[];
  resolved: Set<string>;
  onResolve: (id: string) => void;
  onUpdate: (id: string, patch: Partial<Ticket>) => void;
  focusId: string | null;
  provider: string;
  apiKey: string;
}) {
  const startCursor = focusId ? Math.max(0, tickets.findIndex((t) => t.ticket_id === focusId)) : 0;
  const [cursor, setCursor] = useState(startCursor);
  const [aiLoading, setAiLoading] = useState(false);
  const idx = Math.min(cursor, tickets.length - 1);
  const row = tickets[idx];

  // window of pills
  const pills = 8;
  let start = Math.max(0, idx - Math.floor(pills / 2));
  const end = Math.min(tickets.length, start + pills);
  if (end - start < pills) start = Math.max(0, end - pills);
  const window = tickets.slice(start, end);

  const [draft, setDraft] = useState(row.suggested_reply);
  // reset draft when row changes
  const rowKey = row.ticket_id;
  const [lastKey, setLastKey] = useState(rowKey);
  if (lastKey !== rowKey) { setDraft(row.suggested_reply); setLastKey(rowKey); }

  const [overrideCat, setOverrideCat] = useState("-- Override Routing --");

  return (
    <div>
      <Eyebrow className="mb-1.5">Queue Track</Eyebrow>
      <div className="flex items-center gap-2">
        <Button size="sm" variant="ghost" disabled={idx === 0} onClick={() => setCursor(idx - 1)}><ChevronLeft size={14} /></Button>
        {window.map((t) => {
          const realIdx = start + window.indexOf(t);
          const isActive = realIdx === idx;
          return (
            <button
              key={t.ticket_id}
              onClick={() => setCursor(realIdx)}
              className="rounded-[5px] px-2.5 py-1.5 text-[12px] font-medium tabular-nums transition-colors"
              style={isActive ? { backgroundColor: "var(--accent)", color: "#000" } : { border: "1px solid var(--border)", color: "var(--text-muted)" }}
            >
              {t.ticket_id}
            </button>
          );
        })}
        <Button size="sm" variant="ghost" disabled={idx >= tickets.length - 1} onClick={() => setCursor(idx + 1)}><ChevronRight size={14} /></Button>
      </div>
      <p className="mt-2 text-[12px] text-text-muted">
        Active Triage Inspector: Ticket <b className="text-text">{idx + 1}</b> of <b className="text-text">{tickets.length}</b> (ID: {row.ticket_id})
        {resolved.has(row.ticket_id) && <span className="ml-2 text-ok">· resolved</span>}
      </p>

      <div className="mt-5 grid grid-cols-2 gap-4">
        {/* Left: customer message */}
        <Panel className="p-5">
          <Eyebrow className="mb-2">Customer Inbound Message</Eyebrow>
          <div className="mb-3 text-[20px] font-medium leading-tight text-text" style={{ letterSpacing: "-0.02em" }}>{row.subject}</div>
          <div className="mb-4 whitespace-pre-wrap rounded-[4px] border border-th-border bg-bg px-3.5 py-3.5 text-[13px] leading-relaxed text-text">{row.body}</div>
          <Eyebrow className="mb-1.5">Device Context</Eyebrow>
          <div className="flex flex-wrap gap-2 text-[12px] text-text-muted">
            <code className="rounded-[3px] border border-th-border bg-surface-2 px-1.5 py-0.5">{row.device_info}</code>
            <code className="rounded-[3px] border border-th-border bg-surface-2 px-1.5 py-0.5">{row.app_version}</code>
          </div>
        </Panel>

        {/* Right: AI diagnostics + reply editor */}
        <div>
          <Panel className="p-5">
            <Eyebrow className="mb-3">AI Diagnostics & Routing</Eyebrow>
            <div className="mb-4 flex items-center gap-2">
              <RoutingBadge escalated={row.escalate_to_human} />
              <CategoryTag>{row.predicted_category}</CategoryTag>
              {row.used_llm_classifier ? (
                <span className="rounded bg-accent/15 border border-accent/30 text-accent px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider">
                  AI Classifier
                </span>
              ) : (
                <span className="rounded bg-surface-2 border border-th-border text-text-muted px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider">
                  Local Classifier
                </span>
              )}
            </div>
            <div className="space-y-1.5 text-[12px] leading-relaxed text-text-muted">
              <div>Subcategory: <b className="text-text">{row.predicted_subcategory}</b></div>
              <div>Confidence Score: <span className="inline-block align-middle"><ConfidenceBar value={row.confidence_score} /></span></div>
              <div>Customer Sentiment: <SentimentBadge sentiment={row.sentiment} /></div>
              <div className="mt-1 border-l-2 border-th-border pl-3 text-[12px] italic text-text-subtle">
                {row.classification_reasoning || "Decided by local model"}
              </div>
              {row.escalation_reason && (
                <div className="mt-2 text-accent">Escalation Trigger: {row.escalation_reason}</div>
              )}
            </div>
          </Panel>

          <Panel className="mt-3 p-5">
            <Eyebrow className="mb-2">Suggested Response Draft</Eyebrow>
            <Textarea value={draft} onChange={(e) => setDraft(e.target.value)} rows={6} className="text-[12px]" />
            <div className="mt-3 flex items-center gap-2">
              {row.escalate_to_human ? (
                <Button variant="primary" onClick={() => onResolve(row.ticket_id)}>Escalate to Human</Button>
              ) : (
                <Button variant="primary" onClick={() => onResolve(row.ticket_id)}>Send Auto-Reply</Button>
              )}
              <Button onClick={() => onUpdate(row.ticket_id, { suggested_reply: draft })}>Save Draft</Button>
              <Button
                onClick={async () => {
                  if (!apiKey) {
                    alert("Please expand 'LLM Integration' in the sidebar and enter your API Key first.");
                    return;
                  }
                  setAiLoading(true);
                  const newDraft = await generateLlmReply(row, provider, apiKey);
                  setDraft(newDraft);
                  onUpdate(row.ticket_id, { suggested_reply: newDraft });
                  setAiLoading(false);
                }}
                disabled={aiLoading}
              >
                {aiLoading ? "Drafting..." : "✨ AI Draft"}
              </Button>
              <Select
                value={overrideCat}
                onChange={(e) => {
                  const v = e.target.value;
                  if (v !== "-- Override Routing --") {
                    const shouldEsc = ["Billing & Refunds", "Account & Security"].includes(v);
                    onUpdate(row.ticket_id, { predicted_category: v, escalate_to_human: shouldEsc });
                    setOverrideCat("-- Override Routing --");
                  }
                }}
              >
                <option>-- Override Routing --</option>
                {CATS.map((c) => <option key={c}>{c}</option>)}
              </Select>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}

function DatabaseExplorer({
  tickets, onJump, focusId,
}: {
  tickets: Ticket[];
  onJump: (id: string) => void;
  focusId: string | null;
}) {
  const limit = 15;
  const [page, setPage] = useState(0);
  const total = Math.max(1, Math.ceil(tickets.length / limit));
  const p = Math.min(page, total - 1);
  const slice = tickets.slice(p * limit, p * limit + limit);

  return (
    <div>
      <Eyebrow className="mb-2">Database Explorer</Eyebrow>
      <Panel className="overflow-hidden">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-th-border text-left text-text-muted">
              <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.05em]">ID</th>
              <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.05em]">Subject</th>
              <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.05em]">Category</th>
              <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.05em]">Confidence</th>
              <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.05em]">Routing</th>
            </tr>
          </thead>
          <tbody>
            {slice.map((t) => (
              <tr key={t.ticket_id} className="border-b border-th-border/40 last:border-0 hover:bg-surface-2/40">
                <td className="px-4 py-2">
                  <button
                    onClick={() => onJump(t.ticket_id)}
                    className="font-medium text-accent hover:underline"
                  >
                    {t.ticket_id}
                  </button>
                </td>
                <td className="px-4 py-2 max-w-md truncate text-text">{t.subject}</td>
                <td className="px-4 py-2 text-text-muted">{t.predicted_category}</td>
                <td className="px-4 py-2"><ConfidenceBar value={t.confidence_score} /></td>
                <td className="px-4 py-2">
                  {t.escalate_to_human ? <span className="text-accent">Escalated</span> : <span className="text-text-muted">Auto-Reply</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
      <div className="mt-4 flex items-center justify-between text-[12px] text-text-muted">
        <Button size="sm" variant="secondary" disabled={p === 0} onClick={() => setPage(p - 1)}>◀ Previous</Button>
        <span>Page {p + 1} of {total} (showing {p * limit + 1}–{Math.min((p + 1) * limit, tickets.length)} of {tickets.length} tickets)</span>
        <Button size="sm" variant="secondary" disabled={p >= total - 1} onClick={() => setPage(p + 1)}>Next ▶</Button>
      </div>
    </div>
  );
}

function InboundIngestor({
  onAdd,
  provider,
  apiKey,
}: {
  onAdd: (t: Ticket) => void;
  provider: string;
  apiKey: string;
}) {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [device, setDevice] = useState(DEVICES[0]);
  const [version, setVersion] = useState(VERSIONS[0]);
  const [result, setResult] = useState<Ticket | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (!subject || !body) { setError("Please specify both subject and body message."); return; }
    setError("");
    setLoading(true);
    try {
      const r = await processTicket({ subject, body, device_info: device, app_version: version }, provider, apiKey);
      const t: Ticket = { ...r, escalation_reason: r.escalation_reason };
      onAdd(t);
      setResult(t);
    } catch (e) {
      console.error(e);
      setError("Failed to process ticket.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-2 gap-6">
      <div>
        <Eyebrow className="mb-2">Inbound Ingestion Workspace</Eyebrow>
        <p className="mb-4 text-[12px] text-text-subtle">Submit a new inbound customer ticket directly to the triage database pipeline.</p>
        <div className="space-y-3">
          <div>
            <label className="eyebrow mb-1 block">Ticket Subject</label>
            <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. Unauthorized renewal charge after cancel" />
          </div>
          <div>
            <label className="eyebrow mb-1 block">Ticket Body / Customer Message</label>
            <Textarea value={body} onChange={(e) => setBody(e.target.value)} rows={8} placeholder="e.g. Hello support, I cancelled my subscription pack but my card was charged..." />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="eyebrow mb-1 block">Device Platform</label>
              <Select value={device} onChange={(e) => setDevice(e.target.value)} className="w-full">
                {DEVICES.map((d) => <option key={d}>{d}</option>)}
              </Select>
            </div>
            <div>
              <label className="eyebrow mb-1 block">App Build Version</label>
              <Select value={version} onChange={(e) => setVersion(e.target.value)} className="w-full">
                {VERSIONS.map((v) => <option key={v}>{v}</option>)}
              </Select>
            </div>
          </div>
          {error && <p className="text-[12px] text-danger">{error}</p>}
          <Button variant="primary" onClick={submit} disabled={loading}>{loading ? "Analyzing Inbound..." : "Submit & Analyze Inbound Ticket"}</Button>
        </div>
      </div>

      {result && (
        <Panel className="p-5">
          <Eyebrow className="mb-3">Triage Result</Eyebrow>
          <div className="grid grid-cols-2 gap-3 text-[13px]">
            <Field label="Predicted Category" value={result.predicted_category} />
            <Field label="Subcategory" value={result.predicted_subcategory} />
            <Field label="Confidence" value={result.confidence_score.toFixed(2)} />
            <div><div className="eyebrow mb-1">Sentiment</div><SentimentBadge sentiment={result.sentiment} /></div>
          </div>
          <div className="mt-3">
            <Eyebrow className="mb-1.5">Routing</Eyebrow>
            <RoutingBadge escalated={result.escalate_to_human} />
            {result.escalation_reason && <p className="mt-1.5 text-[12px] text-accent">{result.escalation_reason}</p>}
          </div>
          <div className="mt-3">
            <Eyebrow className="mb-1.5">Suggested Reply Draft</Eyebrow>
            <div className="whitespace-pre-wrap rounded-[4px] border border-th-border bg-bg px-3 py-2.5 text-[12px] leading-relaxed text-text">{result.suggested_reply}</div>
          </div>
          <p className="mt-3 text-[11px] text-ok">Ticket {result.ticket_id} processed and added to the queue.</p>
        </Panel>
      )}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="eyebrow mb-1">{label}</div>
      <div className="font-medium text-text">{value}</div>
    </div>
  );
}
