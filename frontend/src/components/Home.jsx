import React, { useEffect, useRef } from "react";
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

        {/* Constel·lació d'escenaris — 8 àmbits orbitant la plataforma (node central) */}
        <line x1="200" y1="150" x2="200" y2="72"  stroke="rgba(245,241,232,0.32)" strokeWidth="1"/>
        <line x1="200" y1="150" x2="255" y2="95"  stroke="rgba(245,241,232,0.32)" strokeWidth="1"/>
        <line x1="200" y1="150" x2="278" y2="150" stroke="rgba(245,241,232,0.32)" strokeWidth="1"/>
        <line x1="200" y1="150" x2="255" y2="205" stroke="rgba(245,241,232,0.32)" strokeWidth="1"/>
        <line x1="200" y1="150" x2="200" y2="228" stroke="rgba(245,241,232,0.32)" strokeWidth="1"/>
        <line x1="200" y1="150" x2="145" y2="205" stroke="rgba(245,241,232,0.32)" strokeWidth="1"/>
        <line x1="200" y1="150" x2="122" y2="150" stroke="rgba(245,241,232,0.32)" strokeWidth="1"/>
        <line x1="200" y1="150" x2="145" y2="95"  stroke="rgba(245,241,232,0.32)" strokeWidth="1"/>

        <line x1="200" y1="72"  x2="255" y2="95"  stroke="rgba(245,241,232,0.14)" strokeWidth="1"/>
        <line x1="278" y1="150" x2="255" y2="205" stroke="rgba(245,241,232,0.14)" strokeWidth="1"/>
        <line x1="200" y1="228" x2="145" y2="205" stroke="rgba(245,241,232,0.14)" strokeWidth="1"/>
        <line x1="122" y1="150" x2="145" y2="95"  stroke="rgba(245,241,232,0.14)" strokeWidth="1"/>

        <circle cx="200" cy="150" r="15" fill="#E8553D" fillOpacity="0.14"/>
        <circle cx="200" cy="150" r="6" fill="#E8553D"/>
        <circle cx="200" cy="72"  r="3" fill="#F5F1E8" fillOpacity="0.85"/>
        <circle cx="255" cy="95"  r="3" fill="#F5F1E8" fillOpacity="0.85"/>
        <circle cx="278" cy="150" r="3" fill="#F5F1E8" fillOpacity="0.85"/>
        <circle cx="255" cy="205" r="3" fill="#F5F1E8" fillOpacity="0.85"/>
        <circle cx="200" cy="228" r="3" fill="#F5F1E8" fillOpacity="0.85"/>
        <circle cx="145" cy="205" r="3" fill="#F5F1E8" fillOpacity="0.85"/>
        <circle cx="122" cy="150" r="3" fill="#F5F1E8" fillOpacity="0.85"/>
        <circle cx="145" cy="95"  r="3" fill="#F5F1E8" fillOpacity="0.85"/>

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
              <span>{L.cta_primary}</span><span className="btn-arrow" aria-hidden="true">→</span>
            </button>
            <button className="btn btn-secondary" onClick={() => setRoute("chat")}>
              <span>{L.cta_secondary}</span><span className="btn-arrow" aria-hidden="true">→</span>
            </button>
          </div>
          <div className="hero-trust">
            <span><span className="dot" aria-hidden="true" />{L.trust[0]}</span>
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
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.querySelectorAll(".stat").forEach((s, i) => {
            setTimeout(() => s.classList.add("revealed"), i * 120);
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <section className="stats" aria-label={L.eyebrow}>
      <div className="stats-inner" ref={ref}>
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
            <button className="topic" key={i} onClick={() => { if (t.scenario) localStorage.setItem("pdj_sim_start", t.scenario); setRoute("sim"); }}>
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
            <span>{L.primary}</span><span className="btn-arrow" aria-hidden="true">→</span>
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
