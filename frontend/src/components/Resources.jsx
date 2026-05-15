import React from "react";
import { d } from "../i18n/data";

export default function Resources({ lang, setRoute }) {
  const L = d(lang).res;
  return (
    <main className="long-page" id="main">
      <div className="long-shell">
        <header className="long-head">
          <h1 className="long-title">{L.title_a}<em>{L.title_em}</em>{L.title_b}</h1>
          <div className="long-meta-row">
            {L.meta.map((m, i) => <span key={i}>{m}</span>)}
          </div>
        </header>
        {L.sections.map((sec, si) => (
          <div key={sec.id}>
            <div className="res-section-head">
              <h2>{sec.h}</h2>
              <span style={{ fontFamily: "var(--f-mono)", fontSize: "var(--t-eyebrow)", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--c-ink-soft)" }}>{String(si + 1).padStart(2, "0")}</span>
            </div>
            <div className="res-grid">
              {sec.items.map((it, i) => (
                <article key={i} className={"res-card" + (it.urgent ? " urgent" : "")}>
                  <span className="res-meta">{it.meta}</span>
                  <h3 className="res-name">{it.name}</h3>
                  <p className="res-desc">{it.desc}</p>
                  {it.phone && <a className="res-phone" href={`tel:${it.phone.replace(/\s/g, "")}`}>{it.phone}</a>}
                </article>
              ))}
            </div>
          </div>
        ))}
        <div className="long-foot" style={{ marginTop: "var(--s-7)" }}>
          <p className="long-foot-text">Falta algun recurs? Si coneixes una entitat que hauria de ser-hi, escriu-nos i la revisarem.</p>
          <div style={{ display: "flex", gap: "var(--s-3)", flexWrap: "wrap" }}>
            <button className="btn btn-secondary btn-sm" onClick={() => setRoute("chat")}>
              <span>Suggerir un recurs</span><span className="btn-arrow">→</span>
            </button>
            <button className="btn btn-primary btn-sm" onClick={() => setRoute("sim")}>
              <span>Inicia el simulador</span><span className="btn-arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
