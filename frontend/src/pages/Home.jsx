import { Link } from 'react-router-dom';
import Disclaimer from '../components/Disclaimer';
import { useInView } from '../hooks/useInView';
import { useLang } from '../i18n';
import styles from './Home.module.css';

const categories = [
  'Policia i seguretat',
  'Drets laborals',
  'Privacitat digital',
  'Drets a l\'escola',
  'Consum i contractes',
  'Salut i benestar',
];

const rightItems = [
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: 'Drets amb la policia',
  },
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    label: 'Drets laborals',
  },
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    label: 'Privacitat digital',
  },
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    label: 'Drets a l\'escola',
  },
];

function Reveal({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const { t } = useLang();

  const steps = [
    { num: '01', title: t.home.step1Title, desc: t.home.step1Desc },
    { num: '02', title: t.home.step2Title, desc: t.home.step2Desc },
    { num: '03', title: t.home.step3Title, desc: t.home.step3Desc },
  ];

  return (
    <main className={`page ${styles.homePage}`}>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true">
          <div className={styles.heroPattern} />
          <div className={styles.heroBlob} />
          <div className={styles.heroBlob2} />
        </div>

        <div className={`container ${styles.heroGrid}`}>

          {/* LEFT: Content */}
          <div className={styles.heroContent}>
            <div className={styles.badge}>
              <span className={styles.badgeDot} />
              {t.home.badge}
            </div>

            <h1 className={styles.heroTitle}>
              {t.home.heroLine1}<br />
              <em className={styles.heroEm}>{t.home.heroLine2}</em>
            </h1>

            <p className={styles.heroDesc}>
              {t.home.heroDesc}
            </p>

            <div className={styles.heroEntries}>
              <Link to="/simulador" className={styles.entryCard}>
                <div className={styles.entryIcon} aria-hidden="true">
                  <svg viewBox="0 0 40 40" fill="none">
                    <rect x="6" y="5" width="28" height="30" rx="3" stroke="currentColor" strokeWidth="1.75"/>
                    <path d="M12 14h16M12 19h10M12 24h13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                    <circle cx="28" cy="27" r="6" fill="currentColor" fillOpacity="0.1"/>
                    <path d="M26 27l1.5 1.5 2.5-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className={styles.entryBody}>
                  <span className={styles.entryLabel}>{t.home.entry1Label}</span>
                  <span className={styles.entryDesc}>{t.home.entry1Desc}</span>
                </div>
                <span className={styles.entryArrow}>→</span>
              </Link>

              <Link to="/xat" className={styles.entryCard}>
                <div className={styles.entryIcon} aria-hidden="true">
                  <svg viewBox="0 0 40 40" fill="none">
                    <rect x="5" y="7" width="22" height="18" rx="4" stroke="currentColor" strokeWidth="1.75"/>
                    <path d="M9 17l2-2 2 2 3-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 25l-3 5 5-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="18" y="15" width="17" height="14" rx="3" fill="currentColor" fillOpacity="0.07" stroke="currentColor" strokeWidth="1.75"/>
                    <path d="M22 20h9M22 23.5h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className={styles.entryBody}>
                  <span className={styles.entryLabel}>{t.home.entry2Label}</span>
                  <span className={styles.entryDesc}>{t.home.entry2Desc}</span>
                </div>
                <span className={styles.entryArrow}>→</span>
              </Link>
            </div>

            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statNum}>24</span>
                <span className={styles.statLabel}>{t.home.statScenarios}</span>
              </div>
              <div className={styles.statSep} />
              <div className={styles.stat}>
                <span className={styles.statNum}>6</span>
                <span className={styles.statLabel}>{t.home.statCategories}</span>
              </div>
              <div className={styles.statSep} />
              <div className={styles.stat}>
                <span className={styles.statNum}>100%</span>
                <span className={styles.statLabel}>{t.home.statFree}</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Visual decoration */}
          <div className={styles.heroVisual} aria-hidden="true">
            <div className={styles.visualOuter}>
              <div className={styles.scaleBg}>
                <svg viewBox="0 0 200 200" fill="none">
                  <circle cx="100" cy="100" r="96" stroke="rgba(29,78,216,0.06)" strokeWidth="1.5"/>
                  <circle cx="100" cy="100" r="72" stroke="rgba(29,78,216,0.04)" strokeWidth="1"/>
                  <circle cx="100" cy="100" r="48" stroke="rgba(29,78,216,0.03)" strokeWidth="1"/>
                  <path d="M100 28v144M52 72h96" stroke="rgba(29,78,216,0.09)" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="57" cy="108" r="20" stroke="rgba(29,78,216,0.07)" strokeWidth="1.5"/>
                  <circle cx="143" cy="108" r="20" stroke="rgba(29,78,216,0.07)" strokeWidth="1.5"/>
                </svg>
              </div>

              <div className={styles.docCard}>
                <div className={styles.docCardHeader}>
                  <div className={styles.docDots}>
                    <span /><span /><span />
                  </div>
                  <span className={styles.docCardTitle}>Carta de Drets</span>
                </div>
                <div className={styles.docCardLines}>
                  <div className={styles.docLine} style={{width:'80%'}} />
                  <div className={styles.docLine} style={{width:'62%'}} />
                </div>
                <div className={styles.docRights}>
                  {rightItems.map((item, i) => (
                    <div key={i} className={styles.docRight} style={{animationDelay: `${i * 120 + 400}ms`}}>
                      <span className={styles.docRightIcon}>{item.icon}</span>
                      <span className={styles.docRightLabel}>{item.label}</span>
                      <span className={styles.docRightCheck}>
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                          <path d="M2.5 6l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.floatPill}>
                <span className={styles.pillPulse} />
                <span>Disponible 24h</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────── */}
      <section className={styles.howSection}>
        <div className="container">
          <Reveal>
            <p className={styles.sectionLabel}>{t.home.howLabel}</p>
            <h2 className={styles.sectionTitle}>{t.home.howTitle}</h2>
          </Reveal>

          <div className={styles.steps}>
            {steps.map((step, i) => (
              <Reveal key={step.num} delay={i * 110}>
                <article className={styles.stepCard}>
                  <div className={styles.stepNum}>{step.num}</div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────── */}
      <section className={styles.featuresSection}>
        <div className="container">
          <Reveal>
            <p className={styles.sectionLabel}>{t.home.toolsLabel}</p>
            <h2 className={styles.sectionTitle}>{t.home.toolsTitle}</h2>
          </Reveal>

          <div className={styles.features}>
            <Reveal delay={0}>
              <article className={styles.featureCard}>
                <div className={styles.featureAccentBar} />
                <div className={styles.featureHead}>
                  <div className={styles.featureIconWrap}>
                    <svg viewBox="0 0 48 48" fill="none" className={styles.featureIcon}>
                      <rect x="7" y="6" width="34" height="36" rx="4" stroke="currentColor" strokeWidth="2"/>
                      <path d="M14 17h20M14 23h12M14 29h15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <circle cx="34" cy="33" r="7" fill="currentColor" fillOpacity="0.1"/>
                      <path d="M31.5 33l2 2 3-3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h2 className={styles.featureTitle}>{t.home.simTitle}</h2>
                </div>
                <p className={styles.featureDesc}>{t.home.simDesc}</p>
                <div className={styles.categoryList}>
                  {categories.map((c) => (
                    <span key={c} className={styles.categoryTag}>{c}</span>
                  ))}
                </div>
                <Link to="/simulador" className={`btn btn-primary ${styles.featureBtn}`}>
                  {t.home.simCta}
                </Link>
              </article>
            </Reveal>

            <Reveal delay={100}>
              <article className={styles.featureCard}>
                <div className={styles.featureAccentBar} />
                <div className={styles.featureHead}>
                  <div className={styles.featureIconWrap}>
                    <svg viewBox="0 0 48 48" fill="none" className={styles.featureIcon}>
                      <rect x="6" y="8" width="26" height="22" rx="5" stroke="currentColor" strokeWidth="2"/>
                      <path d="M11 20l2.5-2.5 2.5 2.5 3.5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 30l-4 6 6-2.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                      <rect x="22" y="18" width="20" height="17" rx="4" fill="currentColor" fillOpacity="0.07" stroke="currentColor" strokeWidth="2"/>
                      <path d="M27 24h10M27 28.5h7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <h2 className={styles.featureTitle}>{t.home.chatTitle}</h2>
                </div>
                <p className={styles.featureDesc}>{t.home.chatDesc}</p>
                <div className={styles.featureTagList}>
                  <span className={styles.featureTag}>{t.home.chatTag1}</span>
                  <span className={styles.featureTag}>{t.home.chatTag2}</span>
                  <span className={styles.featureTag}>{t.home.chatTag3}</span>
                </div>
                <Link to="/xat" className={`btn btn-primary ${styles.featureBtn}`}>
                  {t.home.chatCta}
                </Link>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── ODS ─────────────────────────────────────────────── */}
      <section className={styles.odsSection}>
        <div className="container">
          <Reveal>
            <div className={styles.odsCard}>
              <div className={styles.odsGridBg} aria-hidden="true" />
              <div className={styles.odsInner}>
                <div className={styles.odsLeft}>
                  <div className={styles.odsBadgeNum}>16</div>
                  <div>
                    <p className={styles.odsKicker}>{t.home.odsKicker}</p>
                    <h3 className={styles.odsTitle}>{t.home.odsTitle}</h3>
                  </div>
                </div>
                <p className={styles.odsText}>{t.home.odsText}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerTop}>
            <div className={styles.footerBrand}>
              <div className={styles.footerMark}>DJ</div>
              <div>
                <span className={styles.footerName}>Drets Juvenils</span>
                <span className={styles.footerTagline}>Plataforma educativa · ODS 16</span>
              </div>
            </div>
            <nav className={styles.footerNav}>
              <Link to="/">Inici</Link>
              <Link to="/simulador">Simulador</Link>
              <Link to="/xat">Assessor IA</Link>
            </nav>
          </div>
          <div className={styles.footerDisclaimer}>
            <Disclaimer />
          </div>
          <p className={styles.footerCopy}>
            © 2025 Drets Juvenils · Projecte educatiu sense ànim de lucre
          </p>
        </div>
      </footer>

    </main>
  );
}
