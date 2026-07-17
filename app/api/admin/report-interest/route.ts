import { requireAdminAccess } from "@/app/access-auth";
import { ensureLibrary } from "@/db/library";

export async function GET() {
  try {
    await requireAdminAccess();
    const db = await ensureLibrary();
    const counts = await db.prepare("SELECT event_type, COUNT(*) AS count FROM report_interest_events GROUP BY event_type").all();
    const events = await db.prepare("SELECT id, event_type, feedback, created_at FROM report_interest_events ORDER BY id DESC LIMIT 100").all();
    return Response.json({ counts: counts.results, events: events.results });
  } catch { return Response.json({ error: "Administrator access required." }, { status: 401 }); }
}
