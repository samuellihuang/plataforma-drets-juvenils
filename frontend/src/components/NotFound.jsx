import React from "react";
import { d } from "../i18n/data";

export default function NotFound({ lang, setRoute }) {
  const L = d(lang).nf;
  return (
    <main className="long-page" id="main" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
      <div style={{ textAlign: "center", maxWidth: "480px", padding: "var(--s-6)" }}>
        <p style={{ fontFamily: "var(--f-mono)", fontSize: "clamp(4rem, 12vw, 7rem)", fontWeight: 700, lineHeight: 1, color: "var(--c-accent)", margin: 0 }}>
          {L.code}<em style={{ color: "var(--c-ink)" }}>{L.code_em}</em>{L.code_b}
        </p>
        <h1 style={{ fontFamily: "var(--f-display)", fontSize: "var(--t-h2)", margin: "var(--s-4) 0 var(--s-3)" }}>
          {L.title}
        </h1>
        <p style={{ color: "var(--c-ink-soft)", marginBottom: "var(--s-5)" }}>{L.body}</p>
        <div style={{ display: "flex", gap: "var(--s-3)", justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn btn-primary" onClick={() => setRoute("home")}>
            <span>{L.home}</span><span className="btn-arrow">→</span>
          </button>
          <button className="btn btn-secondary" onClick={() => setRoute("sim")}>
            <span>{L.sim}</span>
          </button>
        </div>
      </div>
    </main>
  );
}
