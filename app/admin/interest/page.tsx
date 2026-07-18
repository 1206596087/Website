"use client";

import { useEffect, useState } from "react";

type Event = { id: number; event_type: "open" | "feedback"; feedback: string; created_at: string };

export default function InterestPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [total, setTotal] = useState<number | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/admin/api/interest")
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Unable to load feedback.");
        setEvents(data.events ?? []);
        setTotal(Number(data.total ?? 0));
      })
      .catch((reason) => setError(reason instanceof Error ? reason.message : "Unable to load feedback."));
  }, []);

  return <main className="library-page"><header className="library-head"><p className="eyebrow">Private dashboard</p><h1>Report <em>interest</em></h1><p>{total === null ? "Loading feedback…" : `${total} recorded actions. “Open” means a visitor clicked the detailed-report invitation; “Feedback” includes their note.`}</p><p><a className="text-link" href="/admin">Back to library</a></p></header>{error ? <section className="library-results"><article className="library-card"><span>Setup needed</span><h2>Feedback could not load</h2><p>{error}</p></article></section> : <section className="library-results">{events.map((event) => <article className="library-card" key={event.id}><span>{event.event_type}</span><h2>{event.event_type === "open" ? "Report opened" : "Feedback"}</h2><p>{event.feedback || "Visitor opened the detailed-report invitation."}</p><small>{event.created_at}</small></article>)}</section>}</main>;
}
