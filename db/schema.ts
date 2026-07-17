import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const libraryItems = sqliteTable("library_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  kind: text("kind", { enum: ["surname", "name", "poem_zh", "poem_en"] }).notNull(),
  hanzi: text("hanzi").notNull().default(""),
  romanization: text("romanization").notNull().default(""),
  title: text("title").notNull().default(""),
  author: text("author").notNull().default(""),
  era: text("era").notNull().default(""),
  body: text("body").notNull().default(""),
  translation: text("translation").notNull().default(""),
  meaning: text("meaning").notNull().default(""),
  tonePattern: text("tone_pattern").notNull().default(""),
  tags: text("tags").notNull().default(""),
  source: text("source").notNull().default(""),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
