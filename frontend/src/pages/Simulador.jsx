import { useState, useEffect, useMemo } from 'react';
import Disclaimer from '../components/Disclaimer';
import styles from './Simulador.module.css';

const API_URL = 'https://plataforma-drets-juvenils.onrender.com';

const STATUS = { LOADING: 'loading', ERROR: 'error', LIST: 'list', SCENARIO: 'scenario', RESULT: 'result' };

const CATEGORY_ICONS = {
  policia:   '🚔',
  laboral:   '💼',
  privacitat:'📱',
  escola:    '🎓',
  consum:    '🛒',
  salut:     '🏥',
};

export default function Simulador() {
  const [status, setStatus]       = useState(STATUS.LOADING);
  const [scenarios, setScenarios] = useState([]);
  const [errorMsg, setErrorMsg]   = useState('');
  const [active, setActive]       = useState(null);
  const [chosen, setChosen]       = useState(null);
  const [activeCategory, setActiveCategory] = useState('tots');

  useEffect(() => {
    fetch(`${API_URL}/api/scenarios`)
      .then((r) => { if (!r.ok) throw new Error(`Error ${r.status}`); return r.json(); })
      .then((data) => { setScenarios(data); setStatus(STATUS.LIST); })
      .catch((err) => { setErrorMsg(err.message); setStatus(STATUS.ERROR); });
  }, []);

  const categories = useMemo(() => {
    const seen = new Map();
    scenarios.forEach((s) => {
      if (!seen.has(s.category)) seen.set(s.category, s.categoryLabel);
    });
    return Array.from(seen.entries()).map(([key, label]) => ({ key, label }));
  }, [scenarios]);

  const filtered = useMemo(() =>
    activeCategory === 'tots' ? scenarios : scenarios.filter((s) => s.category === activeCategory),
    [scenarios, activeCategory]
  );

  function selectScenario(scenario) {
    setActive(scenario);
    setChosen(null);
    setStatus(STATUS.SCENARIO);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function selectOption(option) {
    setChosen(option);
    setStatus(STATUS.RESULT);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function backToList() {
    setActive(null);
    setChosen(null);
    setStatus(STATUS.LIST);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function tryAnother() {
    const pool = activeCategory === 'tots'
      ? scenarios.filter((s) => s.id !== active.id)
      : scenarios.filter((s) => s.category === activeCategory && s.id !== active.id);
    if (pool.length) selectScenario(pool[Math.floor(Math.random() * pool.length)]);
    else backToList();
  }

  return (
    <main className="page">
      <div className="container">
        <Disclaimer />

        <header className={styles.pageHeader}>
          <h1>Simulador d&apos;escenaris</h1>
          <p>Posa&apos;t en situació i practica com respondre davant situacions legals reals.</p>
        </header>

        <div className={`${styles.stage} ${styles[status]}`}>

          {/* ── LOADING ── */}
          {status === STATUS.LOADING && (
            <div className={`card ${styles.centered}`}>
              <div className={styles.spinner} aria-label="Carregant…" />
              <p>Carregant escenaris…</p>
            </div>
          )}

          {/* ── ERROR ── */}
          {status === STATUS.ERROR && (
            <div className={`card ${styles.centered} ${styles.errorCard}`}>
              <span className={styles.bigIcon}>⚠️</span>
              <p className="text-danger">No s&apos;han pogut carregar els escenaris.</p>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>{errorMsg}</p>
              <button
                className="btn btn-primary"
                style={{ marginTop: '1rem' }}
                onClick={() => {
                  setStatus(STATUS.LOADING);
                  setErrorMsg('');
                  fetch(`${API_URL}/api/scenarios`)
                    .then((r) => { if (!r.ok) throw new Error(`Error ${r.status}`); return r.json(); })
                    .then((d) => { setScenarios(d); setStatus(STATUS.LIST); })
                    .catch((e) => { setErrorMsg(e.message); setStatus(STATUS.ERROR); });
                }}
              >
                Torna a intentar-ho
              </button>
            </div>
          )}

          {/* ── LIST ── */}
          {status === STATUS.LIST && (
            <>
              {/* Filtres de categoria */}
              <div className={styles.categoryBar} role="tablist" aria-label="Filtra per categoria">
                <button
                  role="tab"
                  aria-selected={activeCategory === 'tots'}
                  className={`${styles.categoryBtn} ${activeCategory === 'tots' ? styles.categoryBtnActive : ''}`}
                  onClick={() => setActiveCategory('tots')}
                >
                  🗂 Tots ({scenarios.length})
                </button>
                {categories.map(({ key, label }) => {
                  const count = scenarios.filter((s) => s.category === key).length;
                  return (
                    <button
                      key={key}
                      role="tab"
                      aria-selected={activeCategory === key}
                      className={`${styles.categoryBtn} ${activeCategory === key ? styles.categoryBtnActive : ''}`}
                      onClick={() => setActiveCategory(key)}
                    >
                      {CATEGORY_ICONS[key] || '📄'} {label} ({count})
                    </button>
                  );
                })}
              </div>

              {/* Llista d'escenaris */}
              <div className={styles.list}>
                {filtered.map((scenario) => (
                  <button
                    key={scenario.id}
                    className={`card ${styles.scenarioCard}`}
                    onClick={() => selectScenario(scenario)}
                  >
                    <span className={styles.scenarioNum}>#{scenario.id}</span>
                    <div className={styles.scenarioCardBody}>
                      <div className={styles.scenarioCardTop}>
                        <h2 className={styles.scenarioCardTitle}>{scenario.title}</h2>
                        <span className={styles.categoryTag}>
                          {CATEGORY_ICONS[scenario.category]} {scenario.categoryLabel}
                        </span>
                      </div>
                      <p className={styles.scenarioCardContext}>{scenario.context}</p>
                    </div>
                    <span className={styles.arrow}>→</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* ── SCENARIO (tria opció) ── */}
          {status === STATUS.SCENARIO && active && (
            <div className={styles.scenarioView}>
              <button className={`btn btn-ghost ${styles.backBtn}`} onClick={backToList}>
                ← Tots els escenaris
              </button>

              <div className={`card ${styles.contextCard}`}>
                <span className={styles.contextLabel}>
                  {CATEGORY_ICONS[active.category]} {active.categoryLabel} · Escenari #{active.id}
                </span>
                <h2>{active.title}</h2>
                <p className={styles.contextText}>{active.context}</p>
              </div>

              <div className={`card ${styles.situationCard}`}>
                <span className={styles.situationLabel}>La situació</span>
                <p className={styles.situationText}>{active.situation}</p>
              </div>

              <div className={styles.optionsHeader}>
                <h3>Quina és la teva resposta?</h3>
                <p>Tria l&apos;opció que creus que és la correcta.</p>
              </div>

              <div className={styles.options}>
                {active.options.map((opt) => (
                  <button
                    key={opt.id}
                    className={`card ${styles.optionBtn}`}
                    onClick={() => selectOption(opt)}
                  >
                    <span className={styles.optionId}>{opt.id}</span>
                    <span className={styles.optionText}>{opt.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── RESULT ── */}
          {status === STATUS.RESULT && active && chosen && (
            <div className={styles.resultView}>
              <button className={`btn btn-ghost ${styles.backBtn}`} onClick={backToList}>
                ← Tots els escenaris
              </button>

              <div className={`card ${styles.chosenCard}`}>
                <span className={styles.chosenLabel}>Has triat l&apos;opció {chosen.id}</span>
                <p className={styles.chosenText}>{chosen.text}</p>
              </div>

              <Consequence text={chosen.consequence} />

              <div className={`card ${styles.rightCard}`}>
                <div className={styles.rightHeader}>
                  <span className={styles.rightIcon}>⚖️</span>
                  <h3>El teu dret</h3>
                </div>
                <p className={styles.rightText}>{chosen.legalRight}</p>
              </div>

              <div className={`card ${styles.explainCard}`}>
                <div className={styles.rightHeader}>
                  <span className={styles.rightIcon}>📚</span>
                  <h3>Explicació legal</h3>
                </div>
                <p className={styles.explainText}>{chosen.legalExplanation}</p>
              </div>

              <div className={styles.resultActions}>
                <button className="btn btn-primary" onClick={tryAnother}>
                  🎲 Provar un altre escenari
                </button>
                <button className="btn btn-ghost" onClick={() => selectScenario(active)}>
                  🔁 Tornar a aquest escenari
                </button>
                <button className="btn btn-ghost" onClick={backToList}>
                  ← Llista d&apos;escenaris
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}

function Consequence({ text }) {
  const isPositive = /correcte|excel·lent|bona/i.test(text);
  const isNegative = /negatiu|molt negatiu|arriscat/i.test(text);
  const cls = isPositive ? styles.consequencePos : isNegative ? styles.consequenceNeg : styles.consequenceNeutral;

  return (
    <div className={`card ${styles.consequenceCard} ${cls}`}>
      <div className={styles.rightHeader}>
        <span className={styles.rightIcon}>
          {isPositive ? '✅' : isNegative ? '❌' : '⚠️'}
        </span>
        <h3>Conseqüència</h3>
      </div>
      <p className={styles.consequenceText}>{text}</p>
    </div>
  );
}
