import { ensureLibrary } from "@/db/library";

export async function GET(request: Request) {
  try {
    const db = await ensureLibrary();
    const url = new URL(request.url);
    const query = (url.searchParams.get("q") ?? "").trim();
    const kind = url.searchParams.get("kind") ?? "";
    const where: string[] = []; const values: string[] = [];
    if (kind) { where.push("kind = ?"); values.push(kind); }
    if (query) { where.push("(hanzi LIKE ? OR romanization LIKE ? OR title LIKE ? OR author LIKE ? OR body LIKE ? OR tags LIKE ?)"); values.push(...Array(6).fill(`%${query}%`)); }
    const sql = `SELECT * FROM library_items ${where.length ? `WHERE ${where.join(" AND ")}` : ""} ORDER BY id DESC LIMIT 100`;
    const result = await db.prepare(sql).bind(...values).all();
    return Response.json({ items: result.results });
  } catch (error) { return Response.json({ error: error instanceof Error ? error.message : "Library error" }, { status: 500 }); }
}
