import { requireChatGPTUser } from "@/app/chatgpt-auth";
import { ensureLibrary } from "@/db/library";

export const dynamic = "force-dynamic";

export default async function InterestPage() {
  await requireChatGPTUser("/admin/interest");
  const db = await ensureLibrary();
  const counts = await db.prepare("SELECT event_type, COUNT(*) AS count FROM report_interest_events GROUP BY event_type").all<{ event_type: string; count: number }>();
  const events = await db.prepare("SELECT event_type, feedback, created_at FROM report_interest_events ORDER BY id DESC LIMIT 100").all<{ event_type: string; feedback: string; created_at: string }>();
  const total = (counts.results ?? []).reduce((sum, row) => sum + Number(row.count), 0);
  return <main className="library-page"><header className="library-head"><p className="eyebrow">Private dashboard</p><h1>Report <em>interest</em></h1><p>{total} recorded actions. “Open” means a visitor clicked the detailed-report invitation; “feedback” includes their note.</p><p><a className="text-link" href="/admin">Back to library</a></p></header><section className="library-results">{(events.results ?? []).map((event, i) => <article className="library-card" key={i}><span>{event.event_type}</span><h2>{event.event_type === "open" ? "Report opened" : "Feedback"}</h2><p>{event.feedback || "Visitor opened the detailed-report invitation."}</p><small>{event.created_at}</small></article>)}</section></main>;
}
