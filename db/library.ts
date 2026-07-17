import { env } from "cloudflare:workers";

const schemaSql = `CREATE TABLE IF NOT EXISTS library_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  kind TEXT NOT NULL,
  hanzi TEXT NOT NULL DEFAULT '', romanization TEXT NOT NULL DEFAULT '',
  title TEXT NOT NULL DEFAULT '', author TEXT NOT NULL DEFAULT '', era TEXT NOT NULL DEFAULT '',
  body TEXT NOT NULL DEFAULT '', translation TEXT NOT NULL DEFAULT '', meaning TEXT NOT NULL DEFAULT '',
  tone_pattern TEXT NOT NULL DEFAULT '', tags TEXT NOT NULL DEFAULT '', source TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
)`;

const starterRows = [
  ["surname","\u65bd","Shi","","","","A classical surname associated with generosity and quiet refinement.","","","first tone","kindness,refinement","Mingzi starter library"],
  ["surname","\u987e","Gu","","","","A literary surname suggesting care and thoughtful attention.","","","fourth tone","literary,care","Mingzi starter library"],
  ["surname","\u6797","Lin","","","","A surname meaning forest: growth, shelter, and connection.","","","second tone","nature,growth","Mingzi starter library"],
  ["name","\u77e5\u8fdc","Zhiyuan","","","","To see beyond what is near.","","1 · 3","vision,poetic","Mingzi starter library"],
  ["name","\u5b81\u521d","Ningchu","","","","The peace of a beginning.","","2 · 1","serene,new beginnings","Mingzi starter library"],
  ["name","\u660e\u6f88","Mingche","","","","Bright and transparent.","","2 · 4","clarity,modern","Mingzi starter library"],
  ["poem_zh","","","Spring Night Rain","Du Fu","Tang dynasty","\u968f\u98ce\u6f5c\u5165\u591c\uff0c\u6da6\u7269\u7ec6\u65e0\u58f0\u3002","It steals in with the night wind, nourishing all things without a sound.","","","rain,gentle,renewal","Public-domain classical text"],
  ["poem_zh","","","River Snow","Liu Zongyuan","Tang dynasty","\u5b64\u821f\u84d1\u7b20\u7fc1\uff0c\u72ec\u9493\u5bd2\u6c5f\u96ea\u3002","An old man in a lone boat, fishing by himself in the cold river snow.","","","solitude,nature,winter","Public-domain classical text"],
  ["poem_en","","","Auguries of Innocence","William Blake","Public domain","To see a World in a Grain of Sand","","","","vision,imagination","Public-domain text"],
];

export async function ensureLibrary() {
  const db = env.DB;
  if (!db) throw new Error("The content library is not available yet.");
  await db.prepare(schemaSql).run();
  const count = await db.prepare("SELECT COUNT(*) AS count FROM library_items").first<{ count: number }>();
  if ((count?.count ?? 0) === 0) {
    await db.batch(starterRows.map((row) => db.prepare("INSERT INTO library_items (kind, hanzi, romanization, title, author, era, body, translation, meaning, tone_pattern, tags, source) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)").bind(...row)));
  }
  return db;
}
