import { useState, useCallback } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { tickets as seed, type Ticket } from "@/lib/triage-data";
import { Sidebar, Shell, type NavKey } from "@/components/sidebar";
import { Toast } from "@/components/ui";
import { OverviewView } from "@/components/views/overview";
import { SupportQueueView } from "@/components/views/support-queue";
import { LiveSimulatorView } from "@/components/views/live-simulator";
import { AgentInboxView } from "@/components/views/agent-inbox";
import { BenchmarksView } from "@/components/views/benchmarks";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TriageHub — Support Triage Command Center" },
      { name: "description", content: "Supervise and audit AI-powered support ticket triage, release auto-replies, and dispatch human escalations." },
    ],
  }),
  component: App,
});

function App() {
  const [nav, setNav] = useState<NavKey>("Overview");
  const [tickets, setTickets] = useState<Ticket[]>(seed);
  const [resolved, setResolved] = useState<Set<string>>(new Set());
  const [focusId, setFocusId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const flash = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2400);
  }, []);

  const onAdd = useCallback((t: Ticket) => {
    setTickets((prev) => [...prev, t]);
    flash(`${t.ticket_id} processed and added to the queue.`);
  }, [flash]);

  const onResolve = useCallback((id: string) => {
    setResolved((prev) => new Set(prev).add(id));
    flash(`Auto-reply sent for ${id}. Ticket resolved and closed.`);
  }, [flash]);

  const onUpdate = useCallback((id: string, patch: Partial<Ticket>) => {
    setTickets((prev) => prev.map((t) => (t.ticket_id === id ? { ...t, ...patch } : t)));
    if (patch.predicted_category) flash(`Routing updated: ${patch.predicted_category}`);
    else flash("Draft response saved.");
  }, [flash]);

  const jumpToAuditor = useCallback((id: string) => {
    setFocusId(id);
    setNav("Support Queue");
  }, []);

  return (
    <Shell>
      <Sidebar
        active={nav}
        onNav={setNav}
      />
      <main className="h-screen flex-1 overflow-y-auto">
        {nav === "Overview" && <OverviewView tickets={tickets} onAdd={onAdd} />}
        {nav === "Support Queue" && (
          <SupportQueueView
            tickets={tickets}
            resolved={resolved}
            onResolve={onResolve}
            onUpdate={onUpdate}
            onAdd={onAdd}
            focusId={focusId}
          />
        )}
        {nav === "Live Simulator" && <LiveSimulatorView />}
        {nav === "Agent Inbox" && (
          <AgentInboxView tickets={tickets} resolved={resolved} onResolve={onResolve} onUpdate={onUpdate} />
        )}
        {nav === "Benchmarks" && <BenchmarksView />}
      </main>
      {toast && <Toast message={toast} />}
    </Shell>
  );
}
