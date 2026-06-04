import React from "react";
import { d } from "../i18n/data";

function HeroMark() {
  return (
    <div className="hero-mark" aria-hidden="true">
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(245,241,232,0.08)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="400" height="300" fill="#0E1B3D"/>
        <rect width="400" height="300" fill="url(#grid)"/>
        <rect x="198" y="60" width="4" height="180" fill="#F5F1E8"/>
        <circle cx="200" cy="60" r="6" fill="#E8553D"/>
        <rect x="170" y="232" width="60" height="3" fill="#F5F1E8"/>
        <rect x="80" y="98" width="240" height="2" fill="#F5F1E8"/>
        <line x1="120" y1="100" x2="120" y2="150" stroke="#F5F1E8" strokeWidth="1"/>
        <path d="M 90 150 Q 120 175 150 150 Z" fill="none" stroke="#F5F1E8" strokeWidth="1.5"/>
        <line x1="90" y1="150" x2="150" y2="150" stroke="#F5F1E8" strokeWidth="1.5"/>
        <line x1="280" y1="100" x2="280" y2="160" stroke="#E8553D" strokeWidth="1"/>
        <path d="M 250 160 Q 280 188 310 160 Z" fill="#E8553D" fillOpacity="0.18" stroke="#E8553D" strokeWidth="1.5"/>
        <line x1="250" y1="160" x2="310" y2="160" stroke="#E8553D" strokeWidth="1.5"/>
        <text x="32" y="34" fill="rgba(245,241,232,0.6)" fontFamily="JetBrains Mono, monospace" fontSize="10" letterSpacing="2">01 · BCN</text>
        <text x="32" y="280" fill="rgba(245,241,232,0.6)" fontFamily="JetBrains Mono, monospace" fontSize="10" letterSpacing="2">PLATAFORMA · DRETS</text>
        <text x="370" y="280" fill="rgba(245,241,232,0.6)" fontFamily="JetBrains Mono, monospace" fontSize="10" letterSpacing="2" textAnchor="end">2025</text>
      </svg>
    </div>
  );
}

function Hero({ setRoute, lang }) {
  const L = d(lang).hero;
  return (
    <section className="hero">
      <div className="hero-inner">
        <div>
          <div className="eyebrow-row"><span className="eyebrow">{L.eyebrow}</span></div>
          <h1 className="hero-title">
            {L.title_a}<em>{L.title_em}</em>{L.title_b}<em>{L.title_em2}</em>{L.title_c || ""}
          </h1>
          <p className="hero-lede">{L.lede}</p>
          <div className="hero-ctas">
            <button className="btn btn-primary" onClick={() => setRoute("sim")}>
              <span>{L.cta_primary}</span><span className="btn-arrow">→</span>
            </button>
            <button className="btn btn-secondary" onClick={() => setRoute("chat")}>
              <span>{L.cta_secondary}</span><span className="btn-arrow">→</span>
            </button>
          </div>
          <div className="hero-trust">
            <span><span className="dot" />{L.trust[0]}</span>
            <span>{L.trust[1]}</span>
            <span>{L.trust[2]}</span>
          </div>
        </div>
        <aside className="hero-side">
          <HeroMark />
          <div className="meta-list">
            {L.meta.map((m, i) => (
              <div className="meta-item" key={i}>
                <span className="meta-key">{m.k}</span>
                <span className="meta-val">{m.v}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}

function Stats({ lang }) {
  const L = d(lang).stats;
  return (
    <section className="stats" aria-label={L.eyebrow}>
      <div className="stats-inner">
        {L.items.map((s, i) => (
          <div className="stat" key={i}>
            <span className="stat-num">{s.num}</span>
            <span className="stat-label">{s.label}</span>
            <p className="stat-body">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Features({ setRoute, lang }) {
  const L = d(lang).features;
  return (
    <section className="section">
      <div className="section-inner">
        <header className="section-head">
          <div>
            <div className="eyebrow-row"><span className="eyebrow">{L.eyebrow}</span></div>
          </div>
          <h2 className="section-title">{L.title_a}<em>{L.title_em}</em>{L.title_b}</h2>
        </header>
        <div className="features">
          {L.items.map((f, i) => (
            <button key={i} className="card" onClick={() => setRoute(f.to)}>
              <span className="card-num">{f.num}</span>
              <h3 className="card-title">{f.title}</h3>
              <p className="card-body">{f.body}</p>
              <div className="card-footer">
                <span>{f.foot}</span>
                <span className="card-arrow" aria-hidden="true">→</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Topics({ setRoute, lang }) {
  const L = d(lang).topics;
  return (
    <section className="section topics">
      <div className="section-inner">
        <header className="section-head">
          <div>
            <div className="eyebrow-row"><span className="eyebrow">{L.eyebrow}</span></div>
          </div>
          <h2 className="section-title">{L.title_a}<em>{L.title_em}</em>{L.title_b}</h2>
        </header>
        <div className="topic-grid">
          {L.items.map((t, i) => (
            <button className="topic" key={i} onClick={() => setRoute("sim")}>
              <span className="topic-num">{t.num}</span>
              <div>
                <h3 className="topic-title">{t.title}</h3>
                <p className="topic-body">{t.body}</p>
              </div>
              <span className="topic-arrow" aria-hidden="true">→</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials({ lang }) {
  const L = d(lang).testimonials;
  return (
    <section className="section testimonials">
      <div className="section-inner">
        <header className="section-head">
          <div>
            <div className="eyebrow-row"><span className="eyebrow">{L.eyebrow}</span></div>
          </div>
          <h2 className="section-title">{L.title_a}<em>{L.title_em}</em>{L.title_b}</h2>
        </header>
        <div className="tm-grid">
          {L.items.map((t, i) => (
            <article className="tm" key={i}>
              <p className="tm-quote">{t.quote}</p>
              <div className="tm-attr">
                <span className="tm-name">{t.name}</span>
                <span className="tm-role">{t.role}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Partners({ lang }) {
  const L = d(lang).partners;
  return (
    <section className="partners" aria-label={L.eyebrow}>
      <div className="partners-inner">
        <div className="partners-head">
          <div className="eyebrow-row"><span className="eyebrow">{L.eyebrow}</span></div>
          <h2 className="partners-title">{L.title_a}<em>{L.title_em}</em>{L.title_b}</h2>
          <p style={{ fontSize: "var(--t-sm)", color: "var(--c-ink-soft)", marginTop: "var(--s-3)", maxWidth: "42ch" }}>{L.body}</p>
          <div className="reviewed" style={{ marginTop: "var(--s-4)" }}>
            <span className="reviewed-mark" aria-hidden="true">✓</span>
            <span>
              <span>{L.reviewed}</span> <strong>{L.reviewed_strong}</strong><br />
              <span style={{ fontFamily: "var(--f-mono)", fontSize: "var(--t-eyebrow)", letterSpacing: ".14em", textTransform: "uppercase" }}>{L.reviewed_meta}</span>
            </span>
          </div>
        </div>
        <div className="partners-list">
          {L.items.map((p, i) => (
            <div className="partner" key={i}>
              <div className="partner-mark">
                <span className="partner-name">{p.name}</span>
                <span className="partner-tag">{p.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABand({ setRoute, lang }) {
  const L = d(lang).ctaBand;
  return (
    <section className="cta-band">
      <div className="cta-band-inner">
        <div>
          <div className="eyebrow-row"><span className="eyebrow">{L.eyebrow}</span></div>
          <h2 className="cta-band-title">
            {L.title_a}<em style={{ color: "var(--c-accent)", fontStyle: "italic", fontWeight: 300 }}>{L.title_em}</em>{L.title_b}
          </h2>
          <p className="cta-band-lede">{L.lede}</p>
        </div>
        <div className="cta-band-actions">
          <button className="btn btn-primary" onClick={() => setRoute("sim")}>
            <span>{L.primary}</span><span className="btn-arrow">→</span>
          </button>
          <button className="btn btn-secondary" onClick={() => setRoute("disclaimer")}>
            <span>{L.secondary}</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default function Home({ lang, setRoute }) {
  return (
    <main className="home" id="main">
      <Hero setRoute={setRoute} lang={lang} />
      <Stats lang={lang} />
      <Features setRoute={setRoute} lang={lang} />
      <Topics setRoute={setRoute} lang={lang} />
      <CTABand setRoute={setRoute} lang={lang} />
    </main>
  );
}
