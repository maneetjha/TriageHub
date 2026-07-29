import { LayoutDashboard, Inbox, FlaskConical, Headphones, BarChart3, Settings, ChevronDown } from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type NavKey = "Overview" | "Support Queue" | "Live Simulator" | "Agent Inbox" | "Benchmarks";

const NAV: { key: NavKey; label: string; icon: typeof LayoutDashboard }[] = [
  { key: "Overview", label: "Overview", icon: LayoutDashboard },
  { key: "Support Queue", label: "Support Queue", icon: Inbox },
  { key: "Live Simulator", label: "Live Simulator", icon: FlaskConical },
  { key: "Agent Inbox", label: "Agent Inbox", icon: Headphones },
  { key: "Benchmarks", label: "Benchmarks", icon: BarChart3 },
];

export function Sidebar({
  active,
  onNav,
}: {
  active: NavKey;
  onNav: (k: NavKey) => void;
}) {
  return (
    <aside className="flex h-screen w-[232px] flex-col border-r border-th-border bg-bg">
      {/* Brand */}
      <div className="flex items-center gap-2 px-5 py-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-black">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12h4l3-8 4 16 3-8h4" />
          </svg>
        </div>
        <div className="leading-tight">
          <div className="text-[15px] font-semibold tracking-tight text-text">TriageHub</div>
          <div className="text-[10px] uppercase tracking-[0.08em] text-text-subtle">PocketToons Support</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="mt-2 flex-1 px-3">
        {NAV.map(({ key, label, icon: Icon }) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              onClick={() => onNav(key)}
              className={cn(
                "group mb-0.5 flex w-full items-center gap-3 rounded-md px-3 py-2 text-[13px] font-medium transition-colors",
                isActive ? "bg-surface-2 text-text" : "text-text-muted hover:bg-surface/60 hover:text-text"
              )}
              style={{ borderRadius: 6 }}
            >
              {isActive && <span className="absolute left-0 h-5 w-[2px] rounded-r bg-accent" style={{ marginLeft: -12 }} />}
              <Icon size={16} strokeWidth={1.75} />
              {label}
            </button>
          );
        })}
      </nav>

      <div className="px-5 py-2.5 text-[10px] text-text-subtle">v1.0 · UI Rebuild</div>
    </aside>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-bg font-sans text-text" style={{ fontFamily: "Inter, sans-serif" }}>
      {children}
    </div>
  );
}
