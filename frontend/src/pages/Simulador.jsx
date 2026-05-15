import { useState, useEffect, useMemo } from 'react';
import Disclaimer from '../components/Disclaimer';
import { useLang } from '../i18n';
import styles from './Simulador.module.css';

const API_URL = 'https://plataforma-drets-juvenils.onrender.com';
const STATUS = { LOADING: 'loading', ERROR: 'error', LIST: 'list', SCENARIO: 'scenario', RESULT: 'result', COMPLETE: 'complete' };

const CAT_ICONS = {
  policia: (
    <svg viewBox="0 0 22 22" fill="none" width="16" height="16">
      <path d="M11 20s7-3.5 7-8.75V4.5L11 2 4 4.5V11.25C4 16.5 11 20 11 20Z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  laboral: (
    <svg viewBox="0 0 22 22" fill="none" width="16" height="16">
      <rect x="2" y="7" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.75"/>
      <path d="M14.5 7V5.5A1.5 1.5 0 0 0 13 4H9a1.5 1.5 0 0 0-1.5 1.5V7" stroke="currentColor" strokeWidth="1.75"/>
    </svg>
  ),
  privacitat: (
    <svg viewBox="0 0 22 22" fill="none" width="16" height="16">
      <rect x="3" y="10" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="1.75"/>
      <path d="M7 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.75"/>
    </svg>
  ),
  escola: (
    <svg viewBox="0 0 22 22" fill="none" width="16" height="16">
      <path d="M4 18A2 2 0 0 1 6 16H18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
      <path d="M6 2H18v16H6A2 2 0 0 1 4 16V4a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.75"/>
    </svg>
  ),
  consum: (
    <svg viewBox="0 0 22 22" fill="none" width="16" height="16">
      <circle cx="9" cy="19" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="17" cy="19" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M1 1h3l2 10h11l2-7H6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  salut: (
    <svg viewBox="0 0 22 22" fill="none" width="16" height="16">
      <path d="M11 20C11 20 3 15.5 3 9a5 5 0 0 1 8-4 5 5 0 0 1 8 4c0 6.5-8 11-8 11Z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

function getCatIcon(categoryKey) {
  if (!categoryKey) return null;
  const k = categoryKey.toLowerCase();
  for (const key of Object.keys(CAT_ICONS)) {
    if (k.includes(key)) return CAT_ICONS[key];
  }
  return null;
}

function SimIllustration() {
  return (
    <div className={styles.illustrationWrap} aria-hidden="true">
      <svg viewBox="0 0 380 300" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.mainIllustration}>
        {/* Background rings */}
        <circle cx="190" cy="150" r="125" stroke="rgba(29,78,216,0.05)" strokeWidth="1.5"/>
        <circle cx="190" cy="150" r="90" stroke="rgba(29,78,216,0.04)" strokeWidth="1"/>

        {/* Main clipboard / document */}
        <rect x="112" y="35" width="130" height="168" rx="10" fill="white" stroke="rgba(29,78,216,0.18)" strokeWidth="1.75"/>
        {/* Clip at top */}
        <rect x="148" y="26" width="58" height="18" rx="5" fill="white" stroke="rgba(29,78,216,0.25)" strokeWidth="1.5"/>
        <rect x="158" y="30" width="38" height="8" rx="3" fill="rgba(29,78,216,0.1)"/>

        {/* Document lines */}
        <rect x="127" y="65" width="85" height="6" rx="3" fill="rgba(29,78,216,0.15)"/>
        <rect x="127" y="79" width="65" height="5" rx="2.5" fill="rgba(29,78,216,0.08)"/>

        {/* Option rows */}
        {[0,1,2].map((i) => (
          <g key={i} transform={`translate(127, ${105 + i * 30})`}>
            <rect width="100" height="22" rx="4" fill={i === 0 ? 'rgba(29,78,216,0.07)' : 'rgba(29,78,216,0.03)'} stroke={i === 0 ? 'rgba(29,78,216,0.25)' : 'rgba(29,78,216,0.1)'} strokeWidth="1"/>
            <circle cx="11" cy="11" r="4.5" fill={i === 0 ? 'rgba(29,78,216,0.15)' : 'transparent'} stroke={i === 0 ? 'rgba(29,78,216,0.5)' : 'rgba(29,78,216,0.2)'} strokeWidth="1.25"/>
            {i === 0 && <circle cx="11" cy="11" r="2" fill="rgba(29,78,216,0.7)"/>}
            <rect x="22" y="8" width={i === 0 ? 58 : i === 1 ? 48 : 52} height="6" rx="3" fill={i === 0 ? 'rgba(29,78,216,0.2)' : 'rgba(29,78,216,0.08)'}/>
          </g>
        ))}

        {/* Check badge bottom-right of doc */}
        <circle cx="242" cy="190" r="20" fill="rgba(22,163,74,0.1)" stroke="rgba(22,163,74,0.4)" strokeWidth="1.5"/>
        <path d="M234 190l5 5 10-9" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>

        {/* Floating mini-card top-left */}
        <g transform="translate(18,48) rotate(-10)">
          <rect width="78" height="52" rx="7" fill="white" stroke="rgba(29,78,216,0.15)" strokeWidth="1.25"/>
          <rect x="9" y="13" width="48" height="5" rx="2" fill="rgba(29,78,216,0.15)"/>
          <rect x="9" y="23" width="36" height="4" rx="2" fill="rgba(29,78,216,0.08)"/>
          <rect x="9" y="32" width="42" height="4" rx="2" fill="rgba(29,78,216,0.08)"/>
        </g>

        {/* Floating mini-card bottom-right */}
        <g transform="translate(285, 185) rotate(7)">
          <rect width="78" height="52" rx="7" fill="white" stroke="rgba(29,78,216,0.15)" strokeWidth="1.25"/>
          <rect x="9" y="12" width="44" height="5" rx="2" fill="rgba(29,78,216,0.15)"/>
          <rect x="9" y="22" width="34" height="4" rx="2" fill="rgba(29,78,216,0.08)"/>
          <rect x="9" y="31" width="40" height="4" rx="2" fill="rgba(29,78,216,0.08)"/>
          <rect x="38" y="38" width="28" height="6" rx="3" fill="rgba(29,78,216,0.12)"/>
        </g>

        {/* Scale base */}
        <line x1="190" y1="220" x2="190" y2="270" stroke="rgba(29,78,216,0.2)" strokeWidth="2" strokeLinecap="round"/>
        <rect x="170" y="268" width="40" height="5" rx="2.5" fill="rgba(29,78,216,0.15)"/>
        <line x1="155" y1="235" x2="225" y2="230" stroke="rgba(29,78,216,0.3)" strokeWidth="1.75" strokeLinecap="round"/>
        {/* Left pan */}
        <line x1="163" y1="235" x2="160" y2="252" stroke="rgba(29,78,216,0.25)" strokeWidth="1.25"/>
        <line x1="178" y1="235" x2="181" y2="252" stroke="rgba(29,78,216,0.25)" strokeWidth="1.25"/>
        <path d="M149 252 Q170 262 191 252" stroke="rgba(29,78,216,0.4)" strokeWidth="1.75" fill="rgba(29,78,216,0.05)" strokeLinecap="round"/>
        {/* Right pan */}
        <line x1="213" y1="230" x2="210" y2="247" stroke="rgba(29,78,216,0.25)" strokeWidth="1.25"/>
        <line x1="226" y1="230" x2="229" y2="247" stroke="rgba(29,78,216,0.25)" strokeWidth="1.25"/>
        <path d="M200 247 Q220 257 240 247" stroke="rgba(29,78,216,0.4)" strokeWidth="1.75" fill="rgba(29,78,216,0.05)" strokeLinecap="round"/>
      </svg>

      <div className={styles.illuPill} style={{ top: '6%', right: '8%' }}>
        <span className={styles.illuPillDot} />
        24 escenaris
      </div>
      <div className={styles.illuPill} style={{ bottom: '8%', left: '4%' }}>
        <span className={styles.illuPillDot} style={{ background: 'var(--success)' }} />
        Gratuït
      </div>
    </div>
  );
}

export default function Simulador() {
  const { lang, t } = useLang();
  const [status, setStatus]       = useState(STATUS.LOADING);
  const [scenarios, setScenarios] = useState([]);
  const [errorMsg, setErrorMsg]   = useState('');
  const [active, setActive]       = useState(null);
  const [chosen, setChosen]       = useState(null);
  const [activeCategory, setActiveCategory] = useState('tots');
  const [quizMode, setQuizMode]   = useState(true);
  const [quizQueue, setQuizQueue] = useState([]);
  const [quizIdx, setQuizIdx]     = useState(0);

  function loadScenarios() {
    setStatus(STATUS.LOADING);
    setErrorMsg('');
    fetch(`${API_URL}/api/scenarios?lang=${lang}`)
      .then((r) => { if (!r.ok) throw new Error(`Error ${r.status}`); return r.json(); })
      .then((data) => {
        setScenarios(data);
        setQuizQueue(data);
        setQuizIdx(0);
        if (data.length > 0) { setActive(data[0]); setStatus(STATUS.SCENARIO); }
        else setStatus(STATUS.LIST);
      })
      .catch((err) => { setErrorMsg(err.message); setStatus(STATUS.ERROR); });
  }

  useEffect(() => { loadScenarios(); }, [lang]);

  const categories = useMemo(() => {
    const seen = new Map();
    scenarios.forEach((s) => { if (!seen.has(s.category)) seen.set(s.category, s.categoryLabel); });
    return Array.from(seen.entries()).map(([key, label]) => ({ key, label }));
  }, [scenarios]);

  const filtered = useMemo(() =>
    activeCategory === 'tots' ? scenarios : scenarios.filter((s) => s.category === activeCategory),
    [scenarios, activeCategory]
  );

  function handleCategoryChange(cat) {
    setActiveCategory(cat);
    if (quizMode) {
      const pool = cat === 'tots' ? scenarios : scenarios.filter((s) => s.category === cat);
      setQuizQueue(pool); setQuizIdx(0); setChosen(null);
      if (pool.length > 0) { setActive(pool[0]); setStatus(STATUS.SCENARIO); }
      else setStatus(STATUS.LIST);
    }
  }

  function selectScenario(scenario) {
    setActive(scenario); setChosen(null); setStatus(STATUS.SCENARIO);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function selectOption(option) {
    setChosen(option); setStatus(STATUS.RESULT);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function backToList() {
    setActive(null); setChosen(null); setStatus(STATUS.LIST);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function tryAnother() {
    const pool = activeCategory === 'tots'
      ? scenarios.filter((s) => s.id !== active.id)
      : scenarios.filter((s) => s.category === activeCategory && s.id !== active.id);
    if (pool.length) selectScenario(pool[Math.floor(Math.random() * pool.length)]);
    else backToList();
  }

  function nextInQuiz() {
    const next = quizIdx + 1;
    if (next < quizQueue.length) {
      setQuizIdx(next); setActive(quizQueue[next]); setChosen(null); setStatus(STATUS.SCENARIO);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setStatus(STATUS.COMPLETE); window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function restartQuiz() {
    setQuizIdx(0); setChosen(null);
    if (quizQueue.length > 0) { setActive(quizQueue[0]); setStatus(STATUS.SCENARIO); }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function toggleQuizMode() {
    if (quizMode) { setQuizMode(false); setStatus(STATUS.LIST); }
    else {
      setQuizMode(true);
      const pool = activeCategory === 'tots' ? scenarios : scenarios.filter((s) => s.category === activeCategory);
      setQuizQueue(pool); setQuizIdx(0); setChosen(null);
      if (pool.length > 0) { setActive(pool[0]); setStatus(STATUS.SCENARIO); }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const allCatsLabel = `${t.sim.allCategories} (${scenarios.length})`;

  return (
    <main className={`page ${styles.simPage}`}>

      {/* ── HERO ── */}
      <section className={styles.simHero}>
        <div className={`container ${styles.simHeroInner}`}>
          <div className={styles.simHeroContent}>
            <span className={styles.simHeroBadge}>
              <svg viewBox="0 0 16 16" fill="none" width="12" height="12">
                <path d="M8 15s6-3 6-7.5V3L8 1 2 3v4.5C2 12 8 15 8 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
              Simulador Interactiu · ODS 16
            </span>
            <h1 className={styles.simHeroTitle}>{t.sim.pageTitle}</h1>
            <p className={styles.simHeroDesc}>{t.sim.pageSubtitle}</p>
            <div className={styles.simHeroChips}>
              <span className={styles.simHeroChip}>24 escenaris</span>
              <span className={styles.simHeroChip}>6 categories</span>
              <span className={styles.simHeroChip}>Mode quiz</span>
            </div>
            <div className={styles.simHeroActions}>
              <button className={`btn btn-ghost ${styles.quizToggle}`} onClick={toggleQuizMode}>
                {quizMode ? t.sim.toList : t.sim.toQuiz}
              </button>
            </div>
          </div>
          <SimIllustration />
        </div>
      </section>

      <div className="container">
        <Disclaimer />

        <div className={`${styles.stage} ${styles[status]}`}>

          {/* ── LOADING ── */}
          {status === STATUS.LOADING && (
            <div className={`card ${styles.centered}`}>
              <div className={styles.spinner} aria-label={t.sim.loading} />
              <p>{t.sim.loading}</p>
            </div>
          )}

          {/* ── ERROR ── */}
          {status === STATUS.ERROR && (
            <div className={`card ${styles.centered} ${styles.errorCard}`}>
              <p className="text-danger" style={{ fontWeight: 600 }}>{t.sim.errorTitle}</p>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>{errorMsg}</p>
              <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={loadScenarios}>
                {t.sim.retryBtn}
              </button>
            </div>
          )}

          {/* ── LIST ── */}
          {status === STATUS.LIST && (
            <>
              <div className={styles.categoryBar} role="tablist" aria-label="Filtra per categoria">
                <button
                  role="tab" aria-selected={activeCategory === 'tots'}
                  className={`${styles.categoryBtn} ${activeCategory === 'tots' ? styles.categoryBtnActive : ''}`}
                  onClick={() => handleCategoryChange('tots')}
                >{allCatsLabel}</button>
                {categories.map(({ key, label }) => {
                  const count = scenarios.filter((s) => s.category === key).length;
                  return (
                    <button key={key} role="tab" aria-selected={activeCategory === key}
                      className={`${styles.categoryBtn} ${activeCategory === key ? styles.categoryBtnActive : ''}`}
                      onClick={() => handleCategoryChange(key)}
                    >
                      {getCatIcon(key)}
                      {label} ({count})
                    </button>
                  );
                })}
              </div>

              <div className={styles.list}>
                {filtered.map((scenario, i) => (
                  <button key={scenario.id} className={styles.scenarioCard}
                    onClick={() => selectScenario(scenario)}
                    style={{ animationDelay: `${i * 35}ms` }}
                  >
                    <div className={styles.scenarioCardHead}>
                      <span className={styles.categoryTag}>{getCatIcon(scenario.category)}{scenario.categoryLabel}</span>
                      <span className={styles.scenarioNum}>#{scenario.id}</span>
                    </div>
                    <h3 className={styles.scenarioCardTitle}>{scenario.title}</h3>
                    <p className={styles.scenarioCardContext}>{scenario.context}</p>
                    <div className={styles.scenarioCardFoot}>
                      <span className={styles.scenarioCardCta}>Veure escenari</span>
                      <span className={styles.arrow}>→</span>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* ── SCENARIO ── */}
          {status === STATUS.SCENARIO && active && (
            <div className={styles.scenarioView}>
              {quizMode && (
                <div className={styles.categoryBar} role="tablist" aria-label="Filtra per categoria">
                  <button role="tab" aria-selected={activeCategory === 'tots'}
                    className={`${styles.categoryBtn} ${activeCategory === 'tots' ? styles.categoryBtnActive : ''}`}
                    onClick={() => handleCategoryChange('tots')}
                  >{allCatsLabel}</button>
                  {categories.map(({ key, label }) => {
                    const count = scenarios.filter((s) => s.category === key).length;
                    return (
                      <button key={key} role="tab" aria-selected={activeCategory === key}
                        className={`${styles.categoryBtn} ${activeCategory === key ? styles.categoryBtnActive : ''}`}
                        onClick={() => handleCategoryChange(key)}
                      >
                        {getCatIcon(key)}{label} ({count})
                      </button>
                    );
                  })}
                </div>
              )}

              {quizMode && quizQueue.length > 0 && (
                <div className={styles.progressWrap}>
                  <span className={styles.progressText}>{t.sim.progress(quizIdx + 1, quizQueue.length)}</span>
                  <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: `${((quizIdx + 1) / quizQueue.length) * 100}%` }} />
                  </div>
                </div>
              )}

              {!quizMode && (
                <button className={`btn btn-ghost ${styles.backBtn}`} onClick={backToList}>
                  {t.sim.back}
                </button>
              )}

              <div className={`card ${styles.contextCard}`}>
                <div className={styles.contextMeta}>
                  <span className={styles.contextCatTag}>
                    {getCatIcon(active.category)}
                    {active.categoryLabel}
                  </span>
                  <span className={styles.contextLabel}>{t.sim.scenarioWord} {active.id}</span>
                </div>
                <h2>{active.title}</h2>
                <p className={styles.contextText}>{active.context}</p>
              </div>

              <div className={`card ${styles.situationCard}`}>
                <span className={styles.situationLabel}>{t.sim.situationLabel}</span>
                <p className={styles.situationText}>{active.situation}</p>
              </div>

              <div className={styles.optionsHeader}>
                <h3>{t.sim.optionsHeader}</h3>
                <p>{t.sim.optionsSub}</p>
              </div>

              <div className={styles.options}>
                {active.options.map((opt) => (
                  <button key={opt.id} className={`card ${styles.optionBtn}`} onClick={() => selectOption(opt)}>
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
              {!quizMode && (
                <button className={`btn btn-ghost ${styles.backBtn}`} onClick={backToList}>
                  {t.sim.back}
                </button>
              )}
              <div className={`card ${styles.chosenCard}`}>
                <span className={styles.chosenLabel}>{t.sim.chosenLabel} · {chosen.id}</span>
                <p className={styles.chosenText}>{chosen.text}</p>
              </div>
              <Consequence text={chosen.consequence} t={t} />
              <div className={`card ${styles.rightCard}`}>
                <div className={styles.rightHeader}><h3>{t.sim.rightTitle}</h3></div>
                <p className={styles.rightText}>{chosen.legalRight}</p>
              </div>
              <div className={`card ${styles.explainCard}`}>
                <div className={styles.rightHeader}><h3>{t.sim.explainTitle}</h3></div>
                <p className={styles.explainText}>{chosen.legalExplanation}</p>
              </div>
              <div className={styles.resultActions}>
                {quizMode ? (
                  <>
                    <button className="btn btn-primary" onClick={nextInQuiz}>
                      {quizIdx + 1 < quizQueue.length ? t.sim.nextQuiz : t.sim.finishQuiz}
                    </button>
                    <button className="btn btn-ghost" onClick={() => selectScenario(active)}>{t.sim.retryThis}</button>
                    <button className="btn btn-ghost" onClick={backToList}>{t.sim.backToList}</button>
                  </>
                ) : (
                  <>
                    <button className="btn btn-primary" onClick={tryAnother}>{t.sim.tryAnother}</button>
                    <button className="btn btn-ghost" onClick={() => selectScenario(active)}>{t.sim.retryThis}</button>
                    <button className="btn btn-ghost" onClick={backToList}>{t.sim.backToList}</button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* ── COMPLETE ── */}
          {status === STATUS.COMPLETE && (
            <div className={`card ${styles.completeCard}`}>
              <div className={styles.completeIcon}>🎉</div>
              <h2>{t.sim.completeTitle}</h2>
              <p>{t.sim.completeText}</p>
              <div className={styles.resultActions}>
                <button className="btn btn-primary" onClick={restartQuiz}>{t.sim.restartQuiz}</button>
                <button className="btn btn-ghost" onClick={backToList}>{t.sim.backToList}</button>
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}

function Consequence({ text, t }) {
  const isPositive = /correcte|excel·lent|bona|correcto|excelente|buena/i.test(text);
  const isNegative = /negatiu|molt negatiu|arriscat|negativo|muy negativo|arriesgado/i.test(text);
  const cls = isPositive ? styles.consequencePos : isNegative ? styles.consequenceNeg : styles.consequenceNeutral;
  const label = isPositive ? t.sim.resultAdequat : isNegative ? t.sim.resultInadequat : t.sim.resultAtencio;
  return (
    <div className={`card ${styles.consequenceCard} ${cls}`}>
      <div className={styles.rightHeader}><span className={styles.consequenceLabel}>{label}</span></div>
      <p className={styles.consequenceText}>{text}</p>
    </div>
  );
}
