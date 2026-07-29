import { evalMetrics } from "@/lib/triage-data";
import { Eyebrow, Panel, PageTitle } from "@/components/ui";

export function BenchmarksView() {
  const ev = evalMetrics;
  const ov = ev.overall_classification_metrics;
  const esc = ev.escalation_metrics;
  const perCat = ev.per_category_metrics;
  const { labels, matrix } = ev.confusion_matrix;

  const tiles = [
    { label: "Classification Accuracy", value: `${(ov.accuracy * 100).toFixed(1)}%` },
    { label: "Macro F1-Score", value: `${(ov.macro_f1 * 100).toFixed(1)}%` },
    { label: "Escalation Precision", value: `${(esc.escalation_precision * 100).toFixed(1)}%` },
    { label: "Escalation Recall", value: `${(esc.escalation_recall * 100).toFixed(1)}%` },
  ];

  return (
    <div className="px-8 py-6">
      <PageTitle title="Benchmarks & Evaluation" subtitle={`Evaluated on ${ev.sample_size} gold-labelled tickets from ${ev.dataset}.`} />

      <div className="grid grid-cols-4 gap-4">
        {tiles.map((t) => (
          <Panel key={t.label} className="px-4 py-3.5">
            <div className="eyebrow">{t.label}</div>
            <div className="mt-1 text-[26px] font-semibold leading-none text-text tabular-nums" style={{ letterSpacing: "-0.02em" }}>{t.value}</div>
          </Panel>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-6">
        {/* Per-category table */}
        <div>
          <Eyebrow className="mb-2">Category Performance</Eyebrow>
          <Panel className="overflow-hidden">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-th-border text-left text-text-muted">
                  <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.05em]">Category</th>
                  <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.05em]">Precision</th>
                  <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.05em]">Recall</th>
                  <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.05em]">F1</th>
                  <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.05em]">Support</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(perCat).map(([cat, m]) => (
                  <tr key={cat} className="border-b border-th-border/40 last:border-0 hover:bg-surface-2/40">
                    <td className="px-4 py-2.5 text-text">{cat}</td>
                    <td className="px-4 py-2.5 tabular-nums text-text-muted">{(m.precision * 100).toFixed(1)}%</td>
                    <td className="px-4 py-2.5 tabular-nums text-text-muted">{(m.recall * 100).toFixed(1)}%</td>
                    <td className="px-4 py-2.5 tabular-nums text-text">{(m.f1_score * 100).toFixed(1)}%</td>
                    <td className="px-4 py-2.5 tabular-nums text-text-muted">{m.support}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>
        </div>

        {/* Confusion matrix */}
        <div>
          <Eyebrow className="mb-2">Confusion Matrix</Eyebrow>
          <Panel className="overflow-x-auto p-4">
            <table className="text-[12px]">
              <thead>
                <tr>
                  <th className="p-1.5"></th>
                  {labels.map((l) => (
                    <th key={l} className="p-1.5 text-[10px] font-semibold uppercase text-text-subtle" title={l}>
                      {l.split(" ")[0]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {matrix.map((row, i) => (
                  <tr key={i}>
                    <td className="p-1.5 text-[10px] font-semibold uppercase text-text-subtle" title={labels[i]}>{labels[i].split(" ")[0]}</td>
                    {row.map((v, j) => {
                      const intensity = v > 0 ? Math.min(0.9, 0.15 + v * 0.18) : 0;
                      return (
                        <td
                          key={j}
                          className="h-9 w-9 text-center tabular-nums"
                          style={{
                            backgroundColor: i === j ? `color-mix(in oklab, var(--accent) ${intensity * 100}%, var(--surface))` : `color-mix(in oklab, var(--text-muted) ${intensity * 60}%, var(--surface))`,
                            color: v > 0 ? "var(--text)" : "var(--text-subtle)",
                            borderRadius: 4,
                          }}
                        >
                          {v}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
              {labels.map((l) => (
                <span key={l} className="text-[10px] text-text-subtle"><b className="text-text-muted">{l.split(" ")[0]}</b> = {l}</span>
              ))}
            </div>
          </Panel>
        </div>
      </div>

      <Panel className="mt-6 px-4 py-3 text-[12px] text-text-muted">
        Additional metrics — Weighted F1: <b className="text-text">{(ov.weighted_f1 * 100).toFixed(1)}%</b> · Macro Precision: <b className="text-text">{(ov.macro_precision * 100).toFixed(1)}%</b> · Macro Recall: <b className="text-text">{(ov.macro_recall * 100).toFixed(1)}%</b> · Escalation F1: <b className="text-text">{(esc.escalation_f1 * 100).toFixed(1)}%</b> · Escalation Accuracy: <b className="text-text">{(esc.escalation_accuracy * 100).toFixed(1)}%</b>
      </Panel>
    </div>
  );
}
