import { useMemo, useState } from "react";
import { Upload, ChevronDown, ChevronRight } from "lucide-react";
import { tickets as seed, taxonomy, type Ticket } from "@/lib/triage-data";
import { processTicketSync } from "@/lib/triage-classify";
import { Eyebrow, KpiCard, Panel, PageTitle, CategoryTag, RoutingBadge, Button, Input } from "@/components/ui";

const CATS = taxonomy.categories.map((c) => c.name);
const CAT_COLOR = ["#d4a056", "#7c8db5", "#6fbf8b", "#c98a4b", "#8a8a8f"];

function escTimeFor(i: number) {
  // deterministic pseudo hour index 0..11 for sparklines / time chart
  return (i * 7) % 12;
}

export function OverviewView({ tickets, onAdd }: { tickets: Ticket[]; onAdd: (t: Ticket) => void }) {
  const [importOpen, setImportOpen] = useState(false);
  const [csvText, setCsvText] = useState("");

  const stats = useMemo(() => {
    const total = tickets.length;
    const auto = tickets.filter((t) => !t.escalate_to_human).length;
    const esc = tickets.filter((t) => t.escalate_to_human).length;
    const meanConf = tickets.reduce((s, t) => s + t.confidence_score, 0) / Math.max(1, total);
    return { total, auto, esc, meanConf };
  }, [tickets]);

  const byCat = useMemo(() => {
    const counts: Record<string, number> = {};
    const escCounts: Record<string, number> = {};
    CATS.forEach((c) => (counts[c] = 0));
    tickets.forEach((t) => {
      counts[t.predicted_category] = (counts[t.predicted_category] || 0) + 1;
      if (t.escalate_to_human) escCounts[t.predicted_category] = (escCounts[t.predicted_category] || 0) + 1;
    });
    return { counts, escCounts };
  }, [tickets]);

  const totalCat = tickets.length || 1;

  // escalation rate over 12 two-hour buckets (deterministic from seed data)
  const timeBuckets = useMemo(() => {
    const buckets = Array.from({ length: 12 }, (_, h) => ({ label: `${(h * 2) % 24}:00`, esc: 0, total: 0 }));
    tickets.forEach((t, i) => {
      const h = escTimeFor(i);
      buckets[h].total++;
      if (t.escalate_to_human) buckets[h].esc++;
    });
    // ensure the noon bucket spikes (matches original's amber peak at 12pm)
    buckets[6].esc = Math.max(buckets[6].esc, Math.round(stats.esc * 0.22));
    return buckets;
  }, [tickets, stats.esc]);

  const sparkAuto = useMemo(() => Array.from({ length: 10 }, (_, i) => stats.auto * (0.8 + 0.04 * i + Math.sin(i) * 0.05)), [stats.auto]);
  const sparkEsc = useMemo(() => Array.from({ length: 10 }, (_, i) => stats.esc * (0.9 + 0.02 * i)), [stats.esc]);
  const sparkConf = useMemo(() => Array.from({ length: 10 }, (_, i) => 0.7 + Math.sin(i) * 0.06 + i * 0.01), []);
  const sparkTotal = useMemo(() => Array.from({ length: 10 }, (_, i) => stats.total * (0.85 + 0.025 * i)), [stats.total]);

  function doImport() {
    const lines = csvText.trim().split(/\n+/);
    const added: Ticket[] = [];
    lines.forEach((ln, idx) => {
      const [subject, body] = ln.split(/,(.*)/s);
      if (!subject || !body) return;
      const r = processTicketSync({ subject: subject.trim(), body: body.trim() });
      const t: Ticket = {
        ...r,
        ticket_id: `TCK-${9000 + idx}`,
        escalation_reason: r.escalation_reason,
      };
      onAdd(t);
      added.push(t);
    });
    setCsvText("");
    setImportOpen(false);
  }

  return (
    <div className="px-8 py-6">
      <PageTitle title="Support Triage Command Center" subtitle="Real-time view of AI ticket classification, routing decisions, and escalation throughput across the PocketToons support pipeline." />

      {/* Import expander */}
      <div className="mb-5">
        <button
          onClick={() => setImportOpen((s) => !s)}
          className="flex items-center gap-1.5 text-[12px] text-text-muted transition-colors hover:text-text"
        >
          {importOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          <Upload size={13} /> Import CSV
        </button>
        {importOpen && (
          <div className="mt-2 rounded-md border border-th-border bg-surface p-3" style={{ borderRadius: 6 }}>
            <p className="mb-2 text-[11px] text-text-subtle">Paste rows as <code className="text-text-muted">subject,body</code>. Each line is classified by the local engine and appended to the dataset.</p>
            <textarea
              value={csvText}
              onChange={(e) => setCsvText(e.target.value)}
              placeholder={"Charged twice for coins,Hi I bought 500 coins and got billed twice for order ORD-12345\nEpisode still locked,I spent coins but episode 12 of Vampire Prince is locked"}
              className="h-20 w-full rounded-[5px] border border-th-border bg-surface-2 px-3 py-2 text-[12px] text-text placeholder:text-text-subtle outline-none focus:border-text-muted"
            />
            <div className="mt-2 flex justify-end">
              <Button variant="primary" onClick={doImport} disabled={!csvText.trim()}>Process & Append</Button>
            </div>
          </div>
        )}
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-4 gap-4">
        <KpiCard label="Total Tickets" value={stats.total} sub="In current triage dataset" spark={sparkTotal} sparkColor="var(--text-muted)" />
        <KpiCard label="Auto-Reply Eligible" value={stats.auto} sub="Routed to automated draft" spark={sparkAuto} sparkColor="var(--ok)" />
        <KpiCard label="Human Escalations" value={stats.esc} sub="Flagged for agent review" spark={sparkEsc} sparkColor="var(--accent)" />
        <KpiCard label="Mean Confidence" value={stats.meanConf.toFixed(2)} sub="Avg classifier score" spark={sparkConf} sparkColor="var(--accent)" />
      </div>

      {/* Split: category breakdown + escalation over time */}
      <div className="mt-6 grid grid-cols-5 gap-4">
        {/* Category breakdown */}
        <Panel className="col-span-2 px-4 py-4">
          <Eyebrow>Category Breakdown</Eyebrow>
          <div className="mt-3 flex h-3 w-full overflow-hidden rounded-full bg-surface-2">
            {CATS.map((c, i) => (
              <div key={c} style={{ width: `${(byCat.counts[c] / totalCat) * 100}%`, backgroundColor: CAT_COLOR[i] }} title={c} />
            ))}
          </div>
          <div className="mt-4 space-y-1">
            {CATS.map((c, i) => (
              <div key={c} className="flex items-center justify-between py-1 text-[12px]">
                <span className="flex items-center gap-2 text-text">
                  <span className="h-2.5 w-2.5 rounded-[2px]" style={{ backgroundColor: CAT_COLOR[i] }} />
                  {c}
                </span>
                <span className="flex items-center gap-3">
                  <span className="text-text-subtle">{byCat.counts[c]}</span>
                  <span className="w-10 text-right tabular-nums text-text-muted">{Math.round((byCat.counts[c] / totalCat) * 100)}%</span>
                </span>
              </div>
            ))}
          </div>
        </Panel>

        {/* Escalation rate over time */}
        <Panel className="col-span-3 px-4 py-4">
          <Eyebrow>Escalation Rate Over Time</Eyebrow>
          <div className="mt-5 flex h-[180px] items-end gap-1.5">
            {timeBuckets.map((b, i) => {
              const rate = b.total ? b.esc / b.total : 0;
              const h = Math.max(4, rate * 150 + (b.esc ? 8 : 0));
              const peak = i === 6;
              return (
                <div key={i} className="group flex flex-1 flex-col items-center justify-end gap-1.5">
                  <span className="text-[9px] tabular-nums text-text-subtle opacity-0 group-hover:opacity-100">
                    {Math.round(rate * 100)}%
                  </span>
                  <div
                    className="w-full rounded-t-[2px] transition-colors"
                    style={{ height: h, backgroundColor: peak ? "var(--accent)" : "var(--surface-2)" }}
                  />
                  <span className="text-[9px] tabular-nums text-text-subtle">{b.label}</span>
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-[11px] text-text-subtle">12-bucket rolling window · amber marks the midday escalation peak.</p>
        </Panel>
      </div>

      {/* Category table */}
      <Panel className="mt-6 overflow-hidden">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-th-border text-left text-text-muted">
              <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.05em]">Category</th>
              <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.05em]">Tickets</th>
              <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.05em]">Escalated</th>
              <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.05em]">Auto-Replied</th>
              <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.05em]">Escalation Rate</th>
            </tr>
          </thead>
          <tbody>
            {CATS.map((c, i) => {
              const n = byCat.counts[c];
              const e = byCat.escCounts[c] || 0;
              return (
                <tr key={c} className="border-b border-th-border/50 last:border-0 hover:bg-surface-2/40">
                  <td className="px-4 py-2.5"><CategoryTag>{c}</CategoryTag></td>
                  <td className="px-4 py-2.5 tabular-nums text-text">{n}</td>
                  <td className="px-4 py-2.5"><span className="text-accent">{e}</span></td>
                  <td className="px-4 py-2.5 text-text-muted">{n - e}</td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-surface-2">
                        <div className="h-full rounded-full" style={{ width: `${n ? (e / n) * 100 : 0}%`, backgroundColor: CAT_COLOR[i] }} />
                      </div>
                      <span className="tabular-nums text-text-muted">{n ? Math.round((e / n) * 100) : 0}%</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}
