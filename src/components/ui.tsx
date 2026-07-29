import { type ReactNode, type ButtonHTMLAttributes, type SelectHTMLAttributes, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/* ---------- Section header / eyebrow ---------- */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("eyebrow", className)}>{children}</div>;
}

export function PageTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-semibold tracking-tight text-text" style={{ letterSpacing: "-0.02em" }}>{title}</h1>
      {subtitle && <p className="mt-1 text-[13px] text-text-muted">{subtitle}</p>}
    </div>
  );
}

/* ---------- Card ---------- */
export function Panel({ children, className, as: Tag = "div" }: { children: ReactNode; className?: string; as?: "div" | "section" }) {
  return (
    <Tag className={cn("rounded-md border border-th-border bg-surface", className)} style={{ borderRadius: 6 }}>
      {children}
    </Tag>
  );
}

/* ---------- Badge ---------- */
const sentimentColor: Record<string, string> = {
  "Severe/Frustrated": "#e0625a",
  Negative: "#c98a4b",
  Neutral: "var(--text-muted)",
  Positive: "var(--ok)",
};

export function SentimentBadge({ sentiment }: { sentiment: string }) {
  const color = sentimentColor[sentiment] ?? "var(--text-muted)";
  return (
    <span
      className="inline-flex items-center rounded-[3px] border px-2 py-[2px] text-[10px] font-semibold uppercase tracking-[0.05em]"
      style={{ color, borderColor: color, backgroundColor: `color-mix(in oklab, ${color} 10%, transparent)` }}
    >
      {sentiment}
    </span>
  );
}

export function RoutingBadge({ escalated }: { escalated: boolean }) {
  if (escalated)
    return (
      <span
        className="inline-flex items-center rounded-[3px] border px-2 py-[2px] text-[10px] font-semibold uppercase tracking-[0.05em]"
        style={{ color: "var(--accent)", borderColor: "var(--accent)", backgroundColor: "var(--accent-soft)" }}
      >
        Human Escalation Required
      </span>
    );
  return (
    <span className="inline-flex items-center rounded-[3px] border border-th-border bg-surface-2 px-2 py-[2px] text-[10px] font-semibold uppercase tracking-[0.05em] text-text-muted">
      Auto-Reply Eligible
    </span>
  );
}

export function CategoryTag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-[3px] border border-th-border bg-surface-2 px-2 py-[2px] text-[10px] font-semibold uppercase tracking-[0.05em] text-text">
      {children}
    </span>
  );
}

/* ---------- Confidence bar ---------- */
export function ConfidenceBar({ value }: { value: number }) {
  const pct = Math.round(value * 100);
  const color = value >= 0.8 ? "var(--ok)" : value >= 0.6 ? "var(--accent)" : "var(--danger)";
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-surface-2">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <span className="text-xs tabular-nums text-text-muted">{value.toFixed(2)}</span>
    </div>
  );
}

/* ---------- Buttons ---------- */
type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md";
};
export function Button({ variant = "secondary", size = "md", className, ...props }: BtnProps) {
  const base =
    "inline-flex items-center justify-center gap-1.5 rounded-md font-medium transition-colors duration-150 disabled:opacity-40 disabled:pointer-events-none whitespace-nowrap";
  const sizes = size === "sm" ? "px-2.5 py-1 text-xs" : "px-3.5 py-2 text-[13px]";
  const variants: Record<string, string> = {
    primary: "bg-accent text-black hover:brightness-110",
    secondary: "border border-th-border bg-surface-2 text-text hover:border-text-muted",
    ghost: "text-text-muted hover:text-text hover:bg-surface-2",
    danger: "border border-th-border bg-surface-2 text-danger hover:bg-danger/10",
  };
  return <button className={cn(base, sizes, variants[variant], className)} style={{ borderRadius: 5 }} {...props} />;
}

/* ---------- Native select (styled) ---------- */
export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  return (
    <select
      className={cn(
        "rounded-md border border-th-border bg-surface-2 px-2.5 py-1.5 text-[13px] text-text outline-none transition-colors focus:border-text-muted",
        className
      )}
      style={{ borderRadius: 5 }}
      {...props}
    >
      {children}
    </select>
  );
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-md border border-th-border bg-surface-2 px-3 py-2 text-[13px] text-text placeholder:text-text-subtle outline-none transition-colors focus:border-text-muted",
        className
      )}
      style={{ borderRadius: 5 }}
      {...props}
    />
  );
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "w-full rounded-md border border-th-border bg-surface-2 px-3 py-2 text-[13px] text-text placeholder:text-text-subtle outline-none transition-colors focus:border-text-muted resize-y",
        className
      )}
      style={{ borderRadius: 5 }}
      {...props}
    />
  );
}

/* ---------- Sparkline ---------- */
export function Sparkline({ data, color = "var(--accent)" }: { data: number[]; color?: string }) {
  const w = 96, h = 28;
  if (!data.length) return <svg width={w} height={h} />;
  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 4) - 2;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  return (
    <svg width={w} height={h} className="overflow-visible">
      <polyline points={pts.join(" ")} fill="none" stroke={color} strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

/* ---------- KPI card ---------- */
export function KpiCard({ label, value, sub, spark, sparkColor }: { label: string; value: ReactNode; sub?: string; spark?: number[]; sparkColor?: string }) {
  return (
    <Panel className="px-4 py-3.5">
      <div className="flex items-start justify-between">
        <div>
          <div className="eyebrow">{label}</div>
          <div className="mt-1 text-[26px] font-semibold leading-none text-text tabular-nums" style={{ letterSpacing: "-0.02em" }}>{value}</div>
          {sub && <div className="mt-1.5 text-[11px] text-text-subtle">{sub}</div>}
        </div>
        {spark && <Sparkline data={spark} color={sparkColor} />}
      </div>
    </Panel>
  );
}

/* ---------- Toast ---------- */
export function Toast({ message }: { message: string }) {
  return (
    <div className="fixed bottom-5 right-5 z-50 animate-in fade-in slide-in-from-bottom-2 rounded-md border border-th-border bg-surface-2 px-4 py-2.5 text-[13px] text-text shadow-lg">
      {message}
    </div>
  );
}
