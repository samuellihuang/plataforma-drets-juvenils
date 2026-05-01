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
        </div>

        <div className={`container ${styles.heroInner}`}>
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

          {/* Equal weight entry points */}
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
              <Reveal key={step.num} delay={i * 100}>
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
            {/* Simulador */}
            <Reveal delay={0}>
              <article className={styles.featureCard}>
                <div className={styles.featureHead}>
                  <svg viewBox="0 0 48 48" fill="none" className={styles.featureIcon}>
                    <rect x="7" y="6" width="34" height="36" rx="4" stroke="currentColor" strokeWidth="2"/>
                    <path d="M14 17h20M14 23h12M14 29h15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="34" cy="33" r="7" fill="currentColor" fillOpacity="0.1"/>
                    <path d="M31.5 33l2 2 3-3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
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

            {/* Xat IA */}
            <Reveal delay={80}>
              <article className={styles.featureCard}>
                <div className={styles.featureHead}>
                  <svg viewBox="0 0 48 48" fill="none" className={styles.featureIcon}>
                    <rect x="6" y="8" width="26" height="22" rx="5" stroke="currentColor" strokeWidth="2"/>
                    <path d="M11 20l2.5-2.5 2.5 2.5 3.5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 30l-4 6 6-2.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="22" y="18" width="20" height="17" rx="4" fill="currentColor" fillOpacity="0.07" stroke="currentColor" strokeWidth="2"/>
                    <path d="M27 24h10M27 28.5h7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                  </svg>
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
              <div className={styles.odsLeft}>
                <div className={styles.odsBadgeNum}>16</div>
                <div>
                  <p className={styles.odsKicker}>{t.home.odsKicker}</p>
                  <h3 className={styles.odsTitle}>{t.home.odsTitle}</h3>
                </div>
              </div>
              <p className={styles.odsText}>{t.home.odsText}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="container">
        <Disclaimer />
      </div>

    </main>
  );
}
