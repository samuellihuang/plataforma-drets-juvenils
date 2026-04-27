import { useState, useEffect } from 'react';
import Disclaimer from '../components/Disclaimer';
import styles from './Simulador.module.css';

const API_URL = 'https://plataforma-drets-juvenils.onrender.com';

const STATUS = { LOADING: 'loading', ERROR: 'error', LIST: 'list', SCENARIO: 'scenario', RESULT: 'result' };

export default function Simulador() {
  const [status, setStatus]     = useState(STATUS.LOADING);
  const [scenarios, setScenarios] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [active, setActive]     = useState(null);   // escenari seleccionat
  const [chosen, setChosen]     = useState(null);   // opció triada

  useEffect(() => {
    fetch(`${API_URL}/api/scenarios`)
      .then((r) => { if (!r.ok) throw new Error(`Error ${r.status}`); return r.json(); })
      .then((data) => { setScenarios(data); setStatus(STATUS.LIST); })
      .catch((err) => { setErrorMsg(err.message); setStatus(STATUS.ERROR); });
  }, []);

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
    const others = scenarios.filter((s) => s.id !== active.id);
    if (others.length) selectScenario(others[Math.floor(Math.random() * others.length)]);
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
                onClick={() => { setStatus(STATUS.LOADING); setErrorMsg('');
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
            <div className={styles.list}>
              {scenarios.map((scenario) => (
                <button
                  key={scenario.id}
                  className={`card ${styles.scenarioCard}`}
                  onClick={() => selectScenario(scenario)}
                >
                  <span className={styles.scenarioNum}>#{scenario.id}</span>
                  <div className={styles.scenarioCardBody}>
                    <h2 className={styles.scenarioCardTitle}>{scenario.title}</h2>
                    <p className={styles.scenarioCardContext}>{scenario.context}</p>
                  </div>
                  <span className={styles.arrow}>→</span>
                </button>
              ))}
            </div>
          )}

          {/* ── SCENARIO (tria opció) ── */}
          {status === STATUS.SCENARIO && active && (
            <div className={styles.scenarioView}>
              <button className={`btn btn-ghost ${styles.backBtn}`} onClick={backToList}>
                ← Tots els escenaris
              </button>

              <div className={`card ${styles.contextCard}`}>
                <span className={styles.contextLabel}>Escenari #{active.id}</span>
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
