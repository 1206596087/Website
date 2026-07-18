"use client";

import { FormEvent, useEffect, useState } from "react";

type Item = { id: number; kind: string; hanzi: string; romanization: string; title: string; author: string; era: string; body: string; translation: string; meaning: string; tags: string; source: string };
const blank = { kind: "name", hanzi: "", romanization: "", title: "", author: "", era: "", body: "", translation: "", meaning: "", tone_pattern: "", tags: "", source: "" };
const endpoint = "/admin/api/library";

export default function AdminLibrary() {
  const [q, setQ] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [form, setForm] = useState(blank);
  const [notice, setNotice] = useState("");
  const set = (key: keyof typeof blank, value: string) => setForm({ ...form, [key]: value });
  const load = async () => { const response = await fetch(`${endpoint}?q=${encodeURIComponent(q)}`); const data = await response.json(); setItems(data.items ?? []); if (data.error) setNotice(data.error); };
  useEffect(() => { load(); }, []);
  const save = async (event: FormEvent) => { event.preventDefault(); const response = await fetch(endpoint, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(form) }); if (response.ok) { setForm(blank); setNotice("Saved to the library."); load(); } else setNotice("Could not save this entry."); };
  const remove = async (id: number) => { if (!confirm("Delete this library entry?")) return; await fetch(`${endpoint}?id=${id}`, { method: "DELETE" }); load(); };

  return <main className="studio"><nav className="nav"><a className="brand" href="/">MINGZI<span>{"\u540d"}</span></a><a className="library-admin" href="/library">View library →</a></nav><header><p className="eyebrow">Private content studio</p><h1>Shape the<br /><em>collection.</em></h1><p>Add or remove names, surname stories, Chinese classical lines, and public-domain poetry.</p></header><div className="studio-grid"><form onSubmit={save}><h2>Add an entry</h2><label>Content type<select value={form.kind} onChange={(event) => set("kind", event.target.value)}><option value="surname">Chinese surname</option><option value="name">Given name</option><option value="poem_zh">Chinese classical line</option><option value="poem_en">Public-domain foreign poem</option></select></label><div className="two"><label>Chinese text<input value={form.hanzi} onChange={(event) => set("hanzi", event.target.value)} /></label><label>Romanization<input value={form.romanization} onChange={(event) => set("romanization", event.target.value)} /></label></div><label>Title / meaning<input value={form.title} onChange={(event) => set("title", event.target.value)} /></label><div className="two"><label>Author<input value={form.author} onChange={(event) => set("author", event.target.value)} /></label><label>Era<input value={form.era} onChange={(event) => set("era", event.target.value)} /></label></div><label>Text, story, or explanation<textarea value={form.body || form.meaning} onChange={(event) => setForm({ ...form, body: event.target.value, meaning: event.target.value })} /></label><label>English translation<textarea value={form.translation} onChange={(event) => set("translation", event.target.value)} /></label><div className="two"><label>Tags<input placeholder="poetic, nature" value={form.tags} onChange={(event) => set("tags", event.target.value)} /></label><label>Source<input placeholder="Public-domain source" value={form.source} onChange={(event) => set("source", event.target.value)} /></label></div><button>Save to library →</button>{notice && <p className="notice">{notice}</p>}</form><section className="studio-list"><div className="search-row"><input value={q} onChange={(event) => setQ(event.target.value)} onKeyDown={(event) => event.key === "Enter" && load()} placeholder="Search entries" /><button onClick={load}>Search</button></div>{items.map((item) => <article key={item.id}><div><span>{item.kind}</span><h3>{item.hanzi || item.title}</h3><p>{item.romanization || item.author}</p></div><button className="delete" onClick={() => remove(item.id)}>Delete</button></article>)}</section></div></main>;
}
