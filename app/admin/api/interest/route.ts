import { ensureLibrary } from "@/db/library";

export async function GET() {
  try {
    const db = await ensureLibrary();
    const counts = await db.prepare("SELECT COUNT(*) AS count FROM report_interest_events").first<{ count: number }>();
    const events = await db.prepare("SELECT id, event_type, feedback, created_at FROM report_interest_events ORDER BY id DESC LIMIT 100").all();
    return Response.json({ total: counts?.count ?? 0, events: events.results ?? [] });
  } catch (reason) {
    const message = reason instanceof Error ? reason.message : "The feedback database is unavailable.";
    console.error("Unable to load feedback dashboard", message);
    return Response.json({ error: message }, { status: 500 });
  }
}
