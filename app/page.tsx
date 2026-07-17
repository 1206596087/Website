"use client";

import { useMemo, useState } from "react";

type Name = {
  hanzi: string;
  pinyin: string;
  meaning: string;
  note: string;
  origin: string;
  element: string;
  mood: "Poetic" | "Modern" | "Serene";
};

const names: Name[] = [
  { hanzi: "知远", pinyin: "Zhīyuǎn", meaning: "To see beyond what is near.", note: "A calm, far-seeing name with an open horizon.", origin: "Inspired by the classical idea of quiet purpose and clear sight.", element: "Wood · Water", mood: "Poetic" },
  { hanzi: "清晏", pinyin: "Qīngyàn", meaning: "Clear skies and peaceful days.", note: "Graceful and composed, with a feeling of lasting ease.", origin: "A literary phrase for a world at peace, often found in classical prose.", element: "Water · Earth", mood: "Poetic" },
  { hanzi: "予安", pinyin: "Yǔ'ān", meaning: "To give peace.", note: "A soft, contemporary name that feels generous and grounded.", origin: "Built from two enduring Chinese ideas: offering and serenity.", element: "Earth · Wood", mood: "Modern" },
  { hanzi: "明澈", pinyin: "Míngchè", meaning: "Bright and transparent.", note: "For a spirit that values clarity, warmth, and honesty.", origin: "Echoes the imagery of clear water and an illuminated mind.", element: "Fire · Water", mood: "Modern" },
  { hanzi: "宁初", pinyin: "Níngchū", meaning: "The peace of a beginning.", note: "Gentle, minimal, and quietly full of promise.", origin: "A name shaped around the stillness found at the start of a new chapter.", element: "Earth · Wood", mood: "Serene" },
  { hanzi: "书涵", pinyin: "Shūhán", meaning: "Learning held with depth.", note: "A thoughtful name with scholarship and inner poise.", origin: "Draws on the Chinese literary tradition of learning as a lifelong refuge.", element: "Wood · Water", mood: "Serene" },
];

export default function Home() {
  const [surname, setSurname] = useState("");
  const [style, setStyle] = useState<Name["mood"]>("Poetic");
  const [result, setResult] = useState<Name | null>(null);
  const [saved, setSaved] = useState(false);

  const choices = useMemo(() => names.filter((name) => name.mood === style), [style]);
  const makeName = () => {
    const pick = choices[Math.floor(Math.random() * choices.length)];
    setResult(pick);
    setSaved(false);
  };

  return (
    <main>
      <nav className="nav">
        <a className="brand" href="#top" aria-label="Mingzi home">MÍNGZI<span>名</span></a>
        <div className="nav-links"><a href="#how">How it works</a><a href="#philosophy">Our approach</a></div>
        <button className="language" type="button" aria-label="Language">EN <i>⌄</i></button>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">A name, considered</p>
          <h1>Find a Chinese name<br />with <em>meaning.</em></h1>
          <p className="intro">A thoughtful introduction to Chinese naming—shaped by sound, character, and centuries of cultural imagination.</p>
          <a className="text-link" href="#create">Create your name <span>↓</span></a>
        </div>
        <div className="seal-wrap" aria-hidden="true">
          <div className="seal-shadow"></div><div className="seal"><span>名</span><small>míng</small></div>
          <p>Every name<br />begins with a story.</p>
        </div>
      </section>

      <section className="maker" id="create">
        <div className="section-label">01 — Name atelier</div>
        <div className="maker-grid">
          <div><h2>Let’s find<br />your name.</h2><p>Choose a feeling. We’ll pair it with a name that sounds natural and carries a story worth sharing.</p></div>
          <div className="form-card">
            <label>Your family name <span>optional</span><input value={surname} onChange={(e) => setSurname(e.target.value)} placeholder="e.g. Smith" /></label>
            <fieldset><legend>What speaks to you?</legend><div className="style-pills">{(["Poetic", "Modern", "Serene"] as const).map((item) => <button key={item} className={style === item ? "active" : ""} onClick={() => setStyle(item)} type="button">{item}</button>)}</div></fieldset>
            <button className="generate" type="button" onClick={makeName}>Find my Chinese name <span>→</span></button>
          </div>
        </div>
      </section>

      {result && <section className="result" aria-live="polite">
        <div className="result-top"><p className="eyebrow">Your name is</p><button className="quiet-button" type="button" onClick={makeName}>Try another <span>↻</span></button></div>
        <div className="result-grid">
          <div className="name-art"><div className="brush-ring"></div><p>{surname ? `${surname} · ` : ""}{result.pinyin}</p><strong>{result.hanzi}</strong><small>{result.element}</small></div>
          <div className="reading"><h2>{result.pinyin}</h2><h3>“{result.meaning}”</h3><p>{result.note}</p><div className="origin"><span>THE STORY</span><p>{result.origin}</p></div><button className={saved ? "save saved" : "save"} onClick={() => setSaved(!saved)} type="button">{saved ? "Saved to your collection" : "Save this name"} <span>{saved ? "✓" : "+"}</span></button></div>
        </div>
        <p className="disclaimer">MÍNGZI offers cultural and linguistic inspiration for personal exploration. It does not provide medical, legal, financial, or life-decision advice.</p>
      </section>}

      <section className="principles" id="philosophy"><div className="section-label">02 — The art of naming</div><div className="principle-grid"><article><b>声</b><h3>Sound</h3><p>A name should be natural to say, memorable to hear, and gentle on the tongue.</p></article><article><b>形</b><h3>Character</h3><p>Each character is selected for its shape, nuance, and place in everyday Chinese.</p></article><article><b>意</b><h3>Meaning</h3><p>We look beyond translation to the image, history, and feeling held in a name.</p></article></div></section>

      <section className="quote" id="how"><p>“The beginning of wisdom<br />is to call things by their<br /><em>right names.</em>”</p><span>— AN OLD IDEA, MADE PERSONAL</span></section>
      <footer><a className="brand" href="#top">MÍNGZI<span>名</span></a><p>Chinese names, thoughtfully made.</p><span>© 2026 MÍNGZI</span></footer>
    </main>
  );
}
