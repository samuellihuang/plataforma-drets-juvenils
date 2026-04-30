import { Link } from 'react-router-dom';
import Disclaimer from '../components/Disclaimer';
import { useInView } from '../hooks/useInView';
import styles from './Home.module.css';

const steps = [
  {
    num: '01',
    title: 'Escull un escenari',
    desc: 'Tria entre 24 situacions reals organitzades en 6 categories: policia, treball, privacitat, escola, consum i salut.',
  },
  {
    num: '02',
    title: 'Pren una decisió',
    desc: 'Llig el context, analitza les opcions disponibles i tria la resposta que creus que és la correcta.',
  },
  {
    num: '03',
    title: 'Aprèn els teus drets',
    desc: 'Descobreix quina opció era la millor i per quin motiu, amb les lleis i articles exactes que t\'emparen.',
  },
];

const categories = [
  { label: 'Policia i seguretat', icon: '🛡' },
  { label: 'Drets laborals',      icon: '💼' },
  { label: 'Privacitat digital',  icon: '🔒' },
  { label: 'Drets a l\'escola',   icon: '🎓' },
  { label: 'Consum i contractes', icon: '📄' },
  { label: 'Salut i benestar',    icon: '❤' },
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
  return (
    <main className={`page ${styles.homePage}`}>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true">
          <div className={styles.heroGlow} />
          <div className={styles.heroGrid} />
        </div>

        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroLeft}>
            <div className={styles.badge}>
              <span className={styles.badgeDot} />
              ODS 16 · Pau, Justícia i Institucions
            </div>

            <h1 className={styles.heroTitle}>
              Coneix els teus<br />
              <span className={styles.heroAccent}>drets legals</span>
            </h1>

            <p className={styles.heroDesc}>
              Plataforma educativa per a joves de 14 a 18 anys. Aprèn les lleis que
              et protegeixen a Espanya amb simuladors interactius i assessorament intel·ligent.
            </p>

            <div className={styles.heroActions}>
              <Link to="/simulador" className={`btn btn-primary ${styles.heroBtnPrimary}`}>
                Prova el simulador
              </Link>
              <Link to="/xat" className={`btn btn-ghost ${styles.heroBtnGhost}`}>
                Parla amb l&apos;assessor IA
              </Link>
            </div>

            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statNum}>24</span>
                <span className={styles.statLabel}>Escenaris</span>
              </div>
              <div className={styles.statSep} />
              <div className={styles.stat}>
                <span className={styles.statNum}>6</span>
                <span className={styles.statLabel}>Categories</span>
              </div>
              <div className={styles.statSep} />
              <div className={styles.stat}>
                <span className={styles.statNum}>100%</span>
                <span className={styles.statLabel}>Gratuït</span>
              </div>
            </div>
          </div>

          <div className={styles.heroRight} aria-hidden="true">
            <div className={styles.emblem}>
              <svg viewBox="0 0 160 160" fill="none" className={styles.emblemSvg}>
                <circle cx="80" cy="80" r="72" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 6"/>
                <circle cx="80" cy="80" r="52" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
                {/* Scales of justice */}
                <line x1="80" y1="36" x2="80" y2="124" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="52" y1="56" x2="108" y2="56" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="52" cy="80" r="14" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.06"/>
                <circle cx="108" cy="80" r="14" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.06"/>
                <line x1="52" y1="56" x2="52" y2="66" stroke="currentColor" strokeWidth="2"/>
                <line x1="108" y1="56" x2="108" y2="66" stroke="currentColor" strokeWidth="2"/>
                <circle cx="80" cy="56" r="4" fill="currentColor"/>
                <line x1="70" y1="122" x2="90" y2="122" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
              <div className={styles.emblemGlow} />
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────── */}
      <section className={styles.howSection}>
        <div className="container">
          <Reveal>
            <div className={styles.sectionLabel}>Com funciona</div>
            <h2 className={styles.sectionTitle}>Tres passos per aprendre els teus drets</h2>
          </Reveal>

          <div className={styles.steps}>
            {steps.map((step, i) => (
              <Reveal key={step.num} delay={i * 110}>
                <article className={styles.stepCard}>
                  <div className={styles.stepNumBg} aria-hidden="true">{step.num}</div>
                  <div className={styles.stepContent}>
                    <div className={styles.stepNumSmall}>{step.num}</div>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepDesc}>{step.desc}</p>
                  </div>
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
            <div className={styles.sectionLabel}>Eines</div>
            <h2 className={styles.sectionTitle}>Dues eines per aprendre</h2>
          </Reveal>

          <div className={styles.features}>
            {/* Simulador */}
            <Reveal delay={0}>
              <article className={styles.featureCard}>
                <div className={`${styles.featureVisual} ${styles.featureVisualAmber}`}>
                  <svg viewBox="0 0 80 80" fill="none" className={styles.featureIcon}>
                    <rect x="12" y="10" width="56" height="60" rx="6" stroke="currentColor" strokeWidth="2.5"/>
                    <path d="M24 28h32M24 38h20M24 48h26" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                    <circle cx="56" cy="54" r="12" fill="currentColor" fillOpacity="0.15"/>
                    <path d="M52 54l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className={styles.featureBody}>
                  <h2 className={styles.featureTitle}>Simulador d&apos;escenaris</h2>
                  <p className={styles.featureDesc}>
                    Practica situacions reals: et para la policia, t&apos;ofereixen feina
                    sense contracte o et publiquen fotos sense permís. Pren decisions i
                    descobreix quins drets t&apos;emparen en cada cas.
                  </p>
                  <div className={styles.categoryGrid}>
                    {categories.map((c) => (
                      <span key={c.label} className={styles.categoryPill}>
                        <span className={styles.pillIcon}>{c.icon}</span>
                        {c.label}
                      </span>
                    ))}
                  </div>
                  <Link to="/simulador" className={`btn btn-primary ${styles.featureBtn}`}>
                    Comença a simular
                  </Link>
                </div>
              </article>
            </Reveal>

            {/* Xat IA */}
            <Reveal delay={80}>
              <article className={styles.featureCard}>
                <div className={`${styles.featureVisual} ${styles.featureVisualRed}`}>
                  <svg viewBox="0 0 80 80" fill="none" className={styles.featureIcon}>
                    <rect x="10" y="14" width="44" height="36" rx="8" stroke="currentColor" strokeWidth="2.5"/>
                    <path d="M18 34l4-4 4 4 6-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M20 50l-6 10 10-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="36" y="30" width="34" height="28" rx="6" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2"/>
                    <path d="M44 40h18M44 47h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className={styles.featureBody}>
                  <h2 className={styles.featureTitle}>Assessor legal amb IA</h2>
                  <p className={styles.featureDesc}>
                    Pregunta el que vulguis sobre lleis i drets a un assistent
                    intel·ligent. Respostes clares en català, sense tecnicismes,
                    adaptades a joves i basades en la legislació espanyola vigent.
                  </p>
                  <div className={styles.featureTags}>
                    <span className={styles.featureTag}>Disponible 24h</span>
                    <span className={styles.featureTag}>Respostes orientatives</span>
                    <span className={styles.featureTag}>En català</span>
                  </div>
                  <Link to="/xat" className={`btn btn-primary ${styles.featureBtn}`}>
                    Fes una pregunta
                  </Link>
                </div>
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
                  <div className={styles.odsKicker}>Objectiu de Desenvolupament Sostenible</div>
                  <h3 className={styles.odsTitle}>Pau, Justícia i Institucions sòlides</h3>
                </div>
              </div>
              <p className={styles.odsText}>
                L&apos;ODS 16 de les Nacions Unides promou societats pacífiques i inclusives.
                Garantir que els joves coneguin els seus drets és la base d&apos;una democràcia
                sana i d&apos;una ciutadania activa i responsable.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── DISCLAIMER ───────────────────────────────────────── */}
      <div className="container">
        <Disclaimer />
      </div>

    </main>
  );
}
