import React, { useState, useMemo } from "react";
import s from "./Simulador.module.css";
import { t, STRINGS } from "../i18n/strings";

const TREE = {
  pol: { qs: ["q1", "q2"], section: "pol" },
  work:{ qs: ["q1", "q2"], section: "work" },
  sch: { qs: ["q1", "q2"], section: "sch" },
  fam: { qs: [], section: null },
  net: { qs: [], section: null },
  med: { qs: [], section: null },
};

function SideMark({ scenario }) {
  const colors = {
    pol:  "var(--c-accent)",
    work: "var(--c-cream)",
    sch:  "var(--c-accent)",
    fam:  "var(--c-cream)",
    net:  "var(--c-accent)",
    med:  "var(--c-cream)",
  };
  return (
    <svg viewBox="0 0 240 120" aria-hidden="true">
      <line x1="0"   y1="60" x2="240" y2="60" stroke="rgba(245,241,232,0.18)" />
      <line x1="120" y1="0"  x2="120" y2="120" stroke="rgba(245,241,232,0.18)" />
      <rect x="20" y="32" width="56" height="56" fill={colors[scenario] || "var(--c-cream)"} opacity="0.92" />
      <rect x="92" y="48" width="40" height="2" fill="rgba(245,241,232,0.6)" />
      <rect x="92" y="58" width="28" height="2" fill="rgba(245,241,232,0.4)" />
      <rect x="92" y="68" width="34" height="2" fill="rgba(245,241,232,0.3)" />
      <circle cx="184" cy="60" r="22" stroke="rgba(245,241,232,0.4)" strokeWidth="1" fill="none" />
      <circle cx="184" cy="60" r="6"  fill="var(--c-accent)" />
    </svg>
  );
}

export default function Simulador({ lang, setRoute }) {
  const [step, setStep] = useState(0);
  const [scenarioId, setScenarioId] = useState(null);
  const [answers, setAnswers] = useState([]);

  const scenarios = t("sim.scenarios", lang);
  const scenario = scenarios.find((sc) => sc.id === scenarioId);
  const tree = scenarioId ? TREE[scenarioId] : null;
  const totalSteps = tree ? 1 + tree.qs.length + 1 : 2;
  const currentStep = step + 1;
  const isResult = scenarioId && step > (tree?.qs.length ?? 0);

  const progress = useMemo(() => Math.min(currentStep / totalSteps, 1), [currentStep, totalSteps]);

  const reset = () => { setStep(0); setScenarioId(null); setAnswers([]); };
  const back = () => {
    if (step === 0) return;
    if (step === 1) { setScenarioId(null); setAnswers([]); }
    setStep((s) => s - 1);
    setAnswers((a) => a.slice(0, -1));
  };

  const pickScenario = (id) => {
    setScenarioId(id);
    setAnswers([]);
    setStep(1);
  };

  const answerCurrent = (a) => {
    const qKey = tree.qs[step - 1];
    const newAnswers = [...answers, { q: qKey, a }];
    setAnswers(newAnswers);
    setStep((s) => s + 1);
  };

  // Step 0 — pick scenario
  if (step === 0) {
    return (
      <div className={s.page}>
        <div className={s.shell}>
          <header className={s.head}>
            <span className="eyebrow">{t("sim.eyebrow", lang)}</span>
            <h1 className={s.title}>
              {t("sim.title", lang).split(".")[0]}
              <em>.</em>
            </h1>
            <p className={s.lede}>{t("sim.lede", lang)}</p>
          </header>

          <div className={s.progress}>
            <span>{t("sim.step", lang)} 01 {t("sim.of", lang)} 0{totalSteps}</span>
            <div className={s.progressBar}>
              <div className={s.progressFill} style={{ transform: `scaleX(${1/totalSteps})` }} />
            </div>
            <span>{t("sim.scenarios_q", lang)}</span>
          </div>

          <div className={s.scenarioGrid}>
            {scenarios.map((sc, idx) => (
              <button key={sc.id} className={s.scenario} onClick={() => pickScenario(sc.id)}>
                <span className={s.scenarioIcon}>{String(idx + 1).padStart(2, "0")}</span>
                <h3 className={s.scenarioTitle}>{sc.title}</h3>
                <p className={s.scenarioBody}>{sc.body}</p>
                <div className={s.scenarioFoot}>
                  <span>{TREE[sc.id]?.qs.length ? `${TREE[sc.id].qs.length + 1} ${t("sim.step", lang).toLowerCase()}` : "Demo"}</span>
                  <span>→</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Result step
  if (isResult || (scenarioId && !TREE[scenarioId].qs.length)) {
    const section = TREE[scenarioId]?.section;
    const rights = section ? t(`sim.${section}.rights`, lang) : [
      "Aquesta secció encara està en preparació.",
      "Mentrestant, pots fer servir el Xat per consultar el teu cas.",
    ];
    const actions = section ? t(`sim.${section}.actions`, lang) : [
      "Obre el Xat i descriu la teva situació.",
      "Truca al 116 111 si necessites suport immediat.",
    ];
    const articles = section === "pol" ? ["LO 4/2015 art. 16", "CE art. 24.2"]
                   : section === "work" ? ["ET art. 6", "RD 1620/2011"]
                   : section === "sch"  ? ["Decret 102/2010"]
                   : ["—"];

    return (
      <div className={s.page}>
        <div className={s.shell}>
          <div className={s.progress}>
            <span>{t("sim.step", lang)} {String(totalSteps).padStart(2,"0")} {t("sim.of", lang)} {String(totalSteps).padStart(2,"0")}</span>
            <div className={s.progressBar}>
              <div className={s.progressFill} style={{ transform: "scaleX(1)" }} />
            </div>
            <span style={{ color: "var(--c-accent)" }}>RESULTAT</span>
          </div>

          <div className={s.resultStage}>
            <div className={s.resultBody}>
              <div className={s.resultHead}>
                <div className={s.chips}>
                  <span className={s.chip}>{scenario.title}</span>
                  {articles.map((a) => <span key={a} className={`${s.chip} ${s.chipDark}`}>{a}</span>)}
                </div>
                <h1 className={s.resultTitle}>
                  {t("sim.result_title", lang).split(" ").slice(0,-1).join(" ")}{" "}
                  <em>{t("sim.result_title", lang).split(" ").slice(-1)}</em>.
                </h1>
              </div>

              <div className={s.block}>
                <div className={s.blockHead}>
                  <span className={s.blockNum}>01</span>
                  <h2 className={s.blockTitle}>{t("sim.result_rights", lang)}</h2>
                </div>
                <ul className={s.list}>
                  {rights.map((r, i) => (
                    <li key={i}><span className={s.listDot}>{String(i+1).padStart(2,"0")}</span>{r}</li>
                  ))}
                </ul>
              </div>

              <div className={s.block}>
                <div className={s.blockHead}>
                  <span className={s.blockNum}>02</span>
                  <h2 className={s.blockTitle}>{t("sim.result_actions", lang)}</h2>
                </div>
                <ul className={s.list}>
                  {actions.map((r, i) => (
                    <li key={i}><span className={s.listDot}>→</span>{r}</li>
                  ))}
                </ul>
              </div>

              <p className={s.resultDisc}>{t("sim.result_disc", lang)}</p>

              <div className={s.resultActions}>
                <button className={`${s.btn} ${s.btnPrimary}`} onClick={() => setRoute("xat")}>
                  {t("sim.open_chat", lang)} <span className={s.btnArrow}>→</span>
                </button>
                <button className={`${s.btn} ${s.btnSecondary}`} onClick={reset}>
                  {t("sim.restart", lang)} <span className={s.btnArrow}>↺</span>
                </button>
              </div>
            </div>

            <aside className={s.side}>
              <span className={s.sideEyebrow}>{t("sim.eyebrow", lang)} · {scenarioId?.toUpperCase()}</span>
              <h3 className={s.sideTitle}>
                Resum del teu <em>recorregut</em>.
              </h3>
              <div className={s.sideRule} />
              <div className={s.sideTrail}>
                {answers.map((ans, i) => {
                  const qText = t(`sim.${TREE[scenarioId].section}.${ans.q}`, lang);
                  return (
                    <div key={i} className={s.sideTrailItem}>
                      <span className={s.sideDot}>{String(i+1).padStart(2,"0")}</span>
                      <span><strong>{qText}</strong><br />{ans.a}</span>
                    </div>
                  );
                })}
                {answers.length === 0 && (
                  <div className={s.sideTrailItem}>
                    <span className={s.sideDot}>—</span>
                    <span>Sense preguntes intermèdies per a aquest cas.</span>
                  </div>
                )}
              </div>
              <div className={s.sideArt}><SideMark scenario={scenarioId} /></div>
            </aside>
          </div>
        </div>
      </div>
    );
  }

  // Question step
  const qKey = tree.qs[step - 1];
  const qText = t(`sim.${tree.section}.${qKey}`, lang);
  const aOpts = t(`sim.${tree.section}.${qKey}a`, lang);

  return (
    <div className={s.page}>
      <div className={s.shell}>
        <div className={s.progress}>
          <span>{t("sim.step", lang)} {String(currentStep).padStart(2,"0")} {t("sim.of", lang)} {String(totalSteps).padStart(2,"0")}</span>
          <div className={s.progressBar}>
            <div className={s.progressFill} style={{ transform: `scaleX(${progress})` }} />
          </div>
          <span>{scenario.title}</span>
        </div>

        <div className={s.stage}>
          <div className={s.body}>
            <span className={s.qLabel}>Pregunta {String(step).padStart(2,"0")} / {String(tree.qs.length).padStart(2,"0")}</span>
            <h2 className={s.q}>{qText}</h2>
            <div className={s.options}>
              {aOpts.map((opt, i) => (
                <button key={i} className={s.option} onClick={() => answerCurrent(opt)}>
                  <span className={s.optionMark}>{String.fromCharCode(65 + i)}</span>
                  <span className={s.optionLabel}>{opt}</span>
                  <span className={s.optionArrow}>→</span>
                </button>
              ))}
            </div>
            <div className={s.controls}>
              <button className={s.linkBtn} onClick={back}>← {t("sim.back", lang)}</button>
              <button className={s.linkBtn} onClick={reset}>{t("sim.restart", lang)} ↺</button>
            </div>
          </div>

          <aside className={s.side}>
            <span className={s.sideEyebrow}>{t("sim.eyebrow", lang)} · {scenarioId.toUpperCase()}</span>
            <h3 className={s.sideTitle}>{scenario.title}.</h3>
            <p style={{ color: "rgba(245,241,232,0.7)", fontSize: "var(--t-sm)", margin: 0 }}>
              {scenario.body}
            </p>
            <div className={s.sideRule} />
            <div className={s.sideTrail}>
              {tree.qs.map((q, i) => {
                const done = i < step - 1;
                const current = i === step - 1;
                return (
                  <div key={q} className={s.sideTrailItem} style={{ opacity: done || current ? 1 : 0.4 }}>
                    <span className={s.sideDot} style={{ color: current ? "var(--c-accent)" : done ? "var(--c-cream)" : "rgba(245,241,232,0.4)" }}>
                      {done ? "✓" : current ? "●" : String(i+1).padStart(2,"0")}
                    </span>
                    <span>
                      <strong>{t(`sim.${tree.section}.${q}`, lang)}</strong>
                      {done && <><br />{answers[i]?.a}</>}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className={s.sideArt}><SideMark scenario={scenarioId} /></div>
          </aside>
        </div>
      </div>
    </div>
  );
}
