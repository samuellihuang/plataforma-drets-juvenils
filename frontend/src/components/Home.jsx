import React from "react";
import s from "./Home.module.css";
import { t } from "../i18n/strings";

/* Abstract editorial mark — geometric, no clipart.
   A nested rule grid with a coral block, on ink. */
function HeroMark() {
  return (
    <svg viewBox="0 0 320 240" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <pattern id="dots" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.6" fill="rgba(245,241,232,0.18)" />
        </pattern>
      </defs>
      <rect width="320" height="240" fill="var(--c-ink)" />
      <rect width="320" height="240" fill="url(#dots)" />
      {/* Frame rules */}
      <line x1="24"  y1="24"  x2="296" y2="24"  stroke="rgba(245,241,232,0.35)" strokeWidth="1" />
      <line x1="24"  y1="216" x2="296" y2="216" stroke="rgba(245,241,232,0.35)" strokeWidth="1" />
      <line x1="24"  y1="24"  x2="24"  y2="216" stroke="rgba(245,241,232,0.35)" strokeWidth="1" />
      <line x1="296" y1="24"  x2="296" y2="216" stroke="rgba(245,241,232,0.35)" strokeWidth="1" />
      {/* Inner stack */}
      <rect x="48" y="56" width="160" height="14" fill="var(--c-cream)" opacity="0.92" />
      <rect x="48" y="78" width="120" height="8"  fill="var(--c-cream)" opacity="0.55" />
      <rect x="48" y="92" width="90"  height="8"  fill="var(--c-cream)" opacity="0.35" />
      {/* Coral block */}
      <rect x="48" y="124" width="80" height="80" fill="var(--c-accent)" />
      <text x="56" y="156" fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="2" fill="var(--c-cream)">ART. 24.2</text>
      <text x="56" y="176" fontFamily="Fraunces, serif" fontSize="22" fill="var(--c-cream)" fontStyle="italic">Drets</text>
      <text x="56" y="196" fontFamily="Fraunces, serif" fontSize="22" fill="var(--c-cream)">teus</text>
      {/* Right column rule + text */}
      <line x1="148" y1="124" x2="148" y2="204" stroke="rgba(245,241,232,0.5)" strokeWidth="0.5" />
      <text x="160" y="142" fontFamily="JetBrains Mono, monospace" fontSize="8" letterSpacing="1.5" fill="rgba(245,241,232,0.7)">SECCIÓ</text>
      <text x="160" y="164" fontFamily="Fraunces, serif" fontSize="14" fill="var(--c-cream)">Identificació</text>
      <text x="160" y="180" fontFamily="Fraunces, serif" fontSize="14" fill="var(--c-cream)">policial.</text>
      <text x="160" y="200" fontFamily="JetBrains Mono, monospace" fontSize="8" letterSpacing="1.5" fill="rgba(245,241,232,0.7)">→ 03 PASSOS</text>
    </svg>
  );
}

export default function Home({ lang, setRoute, hero = "split" }) {
  const topics = t("home.topics", lang);

  return (
    <div className={s.page} data-hero={hero}>
      {/* HERO */}
      <section className={s.hero}>
        <div className={s.heroInner}>
          <div>
            <div className={s.heroEyebrowRow}>
              <span className="eyebrow">{t("home.eyebrow", lang)}</span>
            </div>
            <h1 className={s.heroTitle}>
              {t("home.title_a", lang)}<br />
              <span className={s.indent} />
              <em>{t("home.title_b", lang)}</em>{" "}
              {t("home.title_c", lang)}.
            </h1>
            <p className={s.heroLede}>{t("home.lede", lang)}</p>
            <div className={s.heroCtas}>
              <button className={`${s.btn} ${s.btnPrimary}`} onClick={() => setRoute("simulador")}>
                {t("home.cta_sim", lang)} <span className={s.btnArrow}>→</span>
              </button>
              <button className={`${s.btn} ${s.btnSecondary}`} onClick={() => setRoute("xat")}>
                {t("home.cta_chat", lang)} <span className={s.btnArrow}>→</span>
              </button>
            </div>
          </div>

          <aside className={s.heroSide}>
            <div className={s.heroMark}><HeroMark /></div>
            <div className={s.metaList}>
              <div className={s.metaItem}>
                <span className={s.metaKey}>Edició</span>
                <span className={s.metaVal}>{t("home.meta_year", lang)}</span>
              </div>
              <div className={s.metaItem}>
                <span className={s.metaKey}>Públic</span>
                <span className={s.metaVal}>14–18</span>
              </div>
              <div className={s.metaItem}>
                <span className={s.metaKey}>Idiomes</span>
                <span className={s.metaVal}>{t("home.meta_lang", lang)}</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* WHAT */}
      <section className={s.section}>
        <div className={s.sectionInner}>
          <div className={s.sectionHead}>
            <span className="eyebrow">{t("home.sec_what_eyebrow", lang)}</span>
            <h2 className={s.sectionTitle}>{t("home.sec_what_title", lang)}</h2>
          </div>

          <div className={s.features}>
            <button className={s.card} onClick={() => setRoute("simulador")}>
              <span className={s.cardNum}>01 / {t("home.f1_meta", lang)}</span>
              <h3 className={s.cardTitle}>{t("home.f1_title", lang)}</h3>
              <p className={s.cardBody}>{t("home.f1_body", lang)}</p>
              <div className={s.cardFooter}>
                <span>Obrir →</span>
                <span className={s.cardArrow}>→</span>
              </div>
            </button>

            <button className={s.card} onClick={() => setRoute("xat")}>
              <span className={s.cardNum}>02 / {t("home.f2_meta", lang)}</span>
              <h3 className={s.cardTitle}>{t("home.f2_title", lang)}</h3>
              <p className={s.cardBody}>{t("home.f2_body", lang)}</p>
              <div className={s.cardFooter}>
                <span>Obrir →</span>
                <span className={s.cardArrow}>→</span>
              </div>
            </button>

            <button className={s.card} onClick={() => setRoute("disclaimer")}>
              <span className={s.cardNum}>03 / {t("home.f3_meta", lang)}</span>
              <h3 className={s.cardTitle}>{t("home.f3_title", lang)}</h3>
              <p className={s.cardBody}>{t("home.f3_body", lang)}</p>
              <div className={s.cardFooter}>
                <span>Veure →</span>
                <span className={s.cardArrow}>→</span>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* TOPICS */}
      <section className={`${s.section} ${s.topics}`}>
        <div className={s.sectionInner}>
          <div className={s.sectionHead}>
            <span className="eyebrow">{t("home.sec_topics_eyebrow", lang)}</span>
            <h2 className={s.sectionTitle}>{t("home.sec_topics_title", lang)}</h2>
          </div>

          <div className={s.topicGrid}>
            {topics.map(([num, title, body]) => (
              <button key={num} className={s.topic} onClick={() => setRoute("simulador")}>
                <span className={s.topicNum}>{num}</span>
                <span>
                  <h3 className={s.topicTitle}>{title}</h3>
                  <p className={s.topicBody}>{body}</p>
                </span>
                <span className={s.topicArrow}>→</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className={s.ctaBand}>
        <div className={s.ctaBandInner}>
          <div>
            <div className={s.heroEyebrowRow}>
              <span className="eyebrow" style={{ color: "rgba(245,241,232,0.7)" }}>
                {t("home.sec_cta_eyebrow", lang)}
              </span>
            </div>
            <h2 className={s.ctaBandTitle}>{t("home.sec_cta_title", lang)}</h2>
            <p className={s.ctaBandLede}>{t("home.sec_cta_lede", lang)}</p>
          </div>
          <div className={s.ctaBandActions}>
            <button className={`${s.btn} ${s.btnPrimary}`} onClick={() => setRoute("simulador")}>
              {t("home.cta_sim", lang)} <span className={s.btnArrow}>→</span>
            </button>
            <button className={`${s.btn} ${s.btnSecondary}`} onClick={() => setRoute("xat")}>
              {t("home.cta_chat", lang)} <span className={s.btnArrow}>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={s.footer}>
        <div className={s.footerInner}>
          <div>
            <h3 className={s.footerOrg}>{t("home.footer_org", lang)}</h3>
            <p className={s.footerTag}>{t("home.footer_tag", lang)}</p>
            <p className={s.footerDisc} style={{ marginTop: "var(--s-3)" }}>
              {t("home.footer_disc", lang)}
            </p>
          </div>
          <div className={s.footerCol}>
            <h4>Plataforma</h4>
            <ul>
              <li><button onClick={() => setRoute("home")}>{t("nav.home", lang)}</button></li>
              <li><button onClick={() => setRoute("simulador")}>{t("nav.simulador", lang)}</button></li>
              <li><button onClick={() => setRoute("xat")}>{t("nav.xat", lang)}</button></li>
              <li><button onClick={() => setRoute("disclaimer")}>{t("nav.disclaimer", lang)}</button></li>
            </ul>
          </div>
          <div className={s.footerCol}>
            <h4>Contacte</h4>
            <ul>
              <li>contacte@dretsjuvenils.cat</li>
              <li>116 111 — urgències</li>
              <li>Oficina Jove · Catalunya</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
