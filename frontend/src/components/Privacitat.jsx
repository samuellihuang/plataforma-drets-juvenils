import React from "react";
import { d } from "../i18n/data";

export default function Privacitat({ lang, setRoute }) {
  const L = d(lang).priv;
  return (
    <main className="long-page" id="main">
      <div className="long-shell">
        <header className="long-head">
          <h1 className="long-title">{L.title_a}<em>{L.title_em}</em>{L.title_b}</h1>
          <div className="long-meta-row">
            {L.meta.map((m, i) => <span key={i}>{m}</span>)}
          </div>
        </header>
        <div className="long-list">
          {L.items.map((it, i) => (
            <article className="long-item" key={i}>
              <span className="long-num">{it.num}</span>
              <h2 className="long-item-title">{it.h}</h2>
              <p className="long-item-body">{it.body}</p>
            </article>
          ))}
        </div>
        <div className="long-foot">
          <p className="long-foot-text">{L.foot_text}</p>
          <button className="btn btn-secondary btn-sm" style={{ marginTop: "var(--s-4)" }} onClick={() => setRoute("disclaimer")}>
            <span>Llegir l'avís legal</span><span className="btn-arrow" aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </main>
  );
}
