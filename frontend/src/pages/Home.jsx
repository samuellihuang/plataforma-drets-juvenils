import { Link } from 'react-router-dom';
import Disclaimer from '../components/Disclaimer';
import styles from './Home.module.css';

const sections = [
  {
    icon: '🎮',
    title: 'Simulador d\'escenaris',
    description:
      'Practica situacions reals: et para la policia, t\'ofereixen feina sense contracte o et publiquen fotos sense permís. Pren decisions i descobreix quins drets t\'emparen en cada cas.',
    to: '/simulador',
    cta: 'Comença a simular',
  },
  {
    icon: '🤖',
    title: 'Xat amb IA',
    description:
      'Pregunta el que vulguis sobre lleis i drets a un assistent intel·ligent. Respostes clares en català, sense tecnicismes, adaptades a joves de 14 a 18 anys.',
    to: '/xat',
    cta: 'Fes una pregunta',
  },
];

export default function Home() {
  return (
    <main className="page">
      <div className="container">

        {/* ── Hero ── */}
        <section className={styles.hero}>
          <div className={styles.odsBadge}>🌍 ODS 16 · Pau, Justícia i Institucions</div>

          <h1 className={styles.heroTitle}>
            Coneix els teus <span className={styles.accent}>drets</span>
          </h1>

          <p className={styles.heroSub}>
            Plataforma educativa per a joves
          </p>

          <p className={styles.heroDesc}>
            Entén les lleis que et protegeixen a Espanya: quan et pot aturar la policia,
            quins drets tens al treball i com defensar la teva privacitat a internet.
          </p>

          <div className={styles.heroActions}>
            <Link to="/simulador" className={`btn btn-primary ${styles.heroBtnPrimary}`}>
              🎮 Prova el simulador
            </Link>
            <Link to="/xat" className={`btn btn-ghost ${styles.heroBtnGhost}`}>
              🤖 Parla amb la IA
            </Link>
          </div>
        </section>

        {/* ── Section cards ── */}
        <section className={styles.sections} aria-label="Seccions principals">
          {sections.map(({ icon, title, description, to, cta }) => (
            <article key={to} className={`card ${styles.sectionCard}`}>
              <div className={styles.cardIcon}>{icon}</div>
              <div className={styles.cardBody}>
                <h2 className={styles.cardTitle}>{title}</h2>
                <p className={styles.cardDesc}>{description}</p>
                <Link to={to} className={`btn btn-primary ${styles.cardBtn}`}>
                  {cta}
                </Link>
              </div>
            </article>
          ))}
        </section>

        {/* ── About ODS ── */}
        <section className={`card ${styles.odsCard}`} aria-label="Connexió amb els ODS">
          <div className={styles.odsInner}>
            <div className={styles.odsEmoji}>🌍</div>
            <div>
              <h3 className={styles.odsTitle}>Per què ODS 16?</h3>
              <p className={styles.odsText}>
                L&apos;Objectiu de Desenvolupament Sostenible 16 de les Nacions Unides promou
                societats pacífiques i inclusives. Garantir que els joves coneguin els seus
                drets és la base d&apos;una democràcia sana. Aquesta plataforma és la nostra
                contribució educativa.
              </p>
            </div>
          </div>
        </section>

        <Disclaimer />

      </div>
    </main>
  );
}
