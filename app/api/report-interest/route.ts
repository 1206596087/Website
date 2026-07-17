import { ensureLibrary } from "@/db/library";

export async function POST(request: Request) {
  try {
    const payload = await request.json() as { eventType?: string; feedback?: string };
    const eventType = payload.eventType === "feedback" ? "feedback" : "open";
    const feedback = (payload.feedback ?? "").trim().slice(0, 600);
    if (eventType === "feedback" && !feedback) return Response.json({ error: "Please write a short note." }, { status: 400 });
    const db = await ensureLibrary();
    await db.prepare("INSERT INTO report_interest_events (event_type, feedback) VALUES (?, ?)").bind(eventType, feedback).run();
    return Response.json({ ok: true }, { status: 201 });
  } catch { return Response.json({ error: "Unable to record interest." }, { status: 500 }); }
}
