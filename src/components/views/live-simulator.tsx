import { useState } from "react";
import { SIM_PRESETS } from "@/lib/triage-classify";
import { processTicket } from "@/lib/triage-classify";
import { Eyebrow, Panel, PageTitle, Button, Input, Textarea, SentimentBadge, RoutingBadge } from "@/components/ui";

export function LiveSimulatorView() {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [result, setResult] = useState<Awaited<ReturnType<typeof processTicket>> | null>(null);
  const [loading, setLoading] = useState(false);

  async function run() {
    if (!subject && !body) return;
    setLoading(true);
    try {
      const res = await processTicket({ ticket_id: "SIM-001", subject, body });
      setResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="px-8 py-6">
      <PageTitle title="Live Simulator" subtitle="Run a single inbound ticket through the triage engine to inspect classification, routing, and the generated reply in real time." />

      <div className="grid grid-cols-2 gap-6">
        {/* Input */}
        <div>
          <Eyebrow className="mb-2">Presets</Eyebrow>
          <div className="mb-4 flex flex-wrap gap-2">
            {SIM_PRESETS.map((p) => (
              <Button
                key={p.label}
                size="sm"
                variant="secondary"
                onClick={() => { setSubject(p.subject); setBody(p.body); }}
              >
                {p.label}
              </Button>
            ))}
          </div>
          <div className="space-y-3">
            <div>
              <label className="eyebrow mb-1 block">Subject</label>
              <Input value={subject} onChange={(e) => setSubject(e.target.value)} />
            </div>
            <div>
              <label className="eyebrow mb-1 block">Body</label>
              <Textarea value={body} onChange={(e) => setBody(e.target.value)} rows={6} />
            </div>
            <Button variant="primary" onClick={run} disabled={(!subject && !body) || loading}>{loading ? "Running Triage..." : "Run Triage Analysis"}</Button>
          </div>
        </div>

        {/* Output */}
        {result && (
          <div>
            <div className="mb-3 flex items-center justify-between">
              <Eyebrow>Triage Results</Eyebrow>
              {result.used_llm_classifier ? (
                <span className="rounded bg-accent/15 border border-accent/30 text-accent px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                  AI Classifier
                </span>
              ) : (
                <span className="rounded bg-surface-2 border border-th-border text-text-muted px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                  Local Heuristics
                </span>
              )}
            </div>
            <div className="grid grid-cols-4 gap-3">
              <MetricTile label="Predicted Category" value={result.predicted_category} />
              <MetricTile label="Subcategory" value={result.predicted_subcategory} />
              <MetricTile label="Confidence" value={result.confidence_score.toFixed(2)} />
              <div className="rounded-md border border-th-border bg-surface px-3 py-2.5" style={{ borderRadius: 6 }}>
                <div className="eyebrow">Sentiment</div>
                <div className="mt-1.5"><SentimentBadge sentiment={result.sentiment} /></div>
              </div>
            </div>

            <div className="mt-4">
              <Eyebrow className="mb-1.5">Extracted Entities</Eyebrow>
              <Panel className="px-4 py-3">
                <div className="grid grid-cols-5 gap-2 text-[12px]">
                  {Object.entries(result.extracted_entities).map(([k, v]) => (
                    <div key={k}>
                      <div className="eyebrow text-text-subtle">{k}</div>
                      <div className="mt-0.5 font-medium text-text">{v || "—"}</div>
                    </div>
                  ))}
                </div>
              </Panel>
            </div>

            <div className="mt-4">
              <Eyebrow className="mb-1.5">Classification Reasoning</Eyebrow>
              <p className="text-[12px] italic text-text-subtle">{result.classification_reasoning}</p>
            </div>

            <div className="mt-4">
              <Eyebrow className="mb-1.5">Routing Action</Eyebrow>
              <div className="flex items-center gap-2">
                <RoutingBadge escalated={result.escalate_to_human} />
                {result.escalation_reason && <span className="text-[12px] text-accent">{result.escalation_reason}</span>}
              </div>
            </div>

            <div className="mt-4">
              <Eyebrow className="mb-1.5">Suggested Reply Draft</Eyebrow>
              <Textarea defaultValue={result.suggested_reply} rows={7} className="text-[12px]" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MetricTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-th-border bg-surface px-3 py-2.5" style={{ borderRadius: 6 }}>
      <div className="eyebrow">{label}</div>
      <div className="mt-1 text-[15px] font-semibold text-text">{value}</div>
    </div>
  );
}
