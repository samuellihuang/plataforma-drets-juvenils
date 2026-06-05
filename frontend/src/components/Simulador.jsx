import React, { useState } from "react";
import { d } from "../i18n/data";

const QUESTION_FLOWS = {
  habitatge: [
    {
      label: "Pregunta 1 de 3",
      q: "Quin tipus d'habitatge ocupes?",
      options: [
        { id: "lloguer", label: "Lloguer amb contracte" },
        { id: "verbal", label: "Lloguer verbal (sense contracte signat)" },
        { id: "okupacio", label: "Ocupació sense títol" },
        { id: "familiar", label: "Pis de família / cessió" },
      ],
    },
    {
      label: "Pregunta 2 de 3",
      q: "Què ha passat exactament?",
      options: [
        { id: "burofax_no", label: "M'han avisat per WhatsApp / oralment, sense burofax" },
        { id: "burofax_si", label: "He rebut un burofax o requeriment notarial" },
        { id: "fianza", label: "He marxat i no em tornen la fiança" },
        { id: "subida", label: "Em volen pujar el lloguer molt" },
      ],
    },
    {
      label: "Pregunta 3 de 3",
      q: "Quan necessites resoldre-ho?",
      options: [
        { id: "ara", label: "Aquesta setmana — és urgent" },
        { id: "mes", label: "Dins el mes vinent" },
        { id: "info", label: "Encara no és urgent, només vull entendre-ho" },
      ],
    },
  ],
  treball: [
    {
      label: "Pregunta 1 de 3",
      q: "Quin tipus de contracte tens?",
      options: [
        { id: "indef", label: "Contracte indefinit" },
        { id: "temp", label: "Contracte temporal o per obra" },
        { id: "prac", label: "Pràctiques o becari" },
        { id: "sense", label: "Sense contracte (negre)" },
      ],
    },
    {
      label: "Pregunta 2 de 3",
      q: "Quin és el problema principal?",
      options: [
        { id: "comiat", label: "M'han acomiadat" },
        { id: "salaris", label: "No m'han pagat tot el que toca" },
        { id: "hores", label: "Em fan més hores de les pactades" },
        { id: "abus", label: "Tracte abusiu / pressió" },
      ],
    },
    {
      label: "Pregunta 3 de 3",
      q: "Quant de temps fa?",
      options: [
        { id: "menys20", label: "Menys de 20 dies hàbils" },
        { id: "menys1y", label: "Entre 20 dies i un any" },
        { id: "mes1y", label: "Més d'un any" },
      ],
    },
  ],
  policial: [
    {
      label: "Pregunta 1 de 2",
      q: "Què t'ha passat?",
      options: [
        { id: "ident", label: "M'han demanat la identificació" },
        { id: "multa", label: "M'han posat una multa" },
        { id: "escorco", label: "M'han escorcollat o retingut" },
        { id: "grav", label: "He gravat una intervenció i m'ho impedeixen" },
      ],
    },
    {
      label: "Pregunta 2 de 2",
      q: "On ha passat?",
      options: [
        { id: "carrer", label: "Al carrer o espai públic" },
        { id: "transport", label: "En transport públic" },
        { id: "local", label: "En un local o establiment" },
      ],
    },
  ],
  familiar: [
    {
      label: "Pregunta 1 de 2",
      q: "Quin és el teu problema principal?",
      options: [
        { id: "marxar", label: "Vull marxar de casa" },
        { id: "conflicte", label: "Hi ha un conflicte greu amb els meus pares" },
        { id: "risc", label: "Estic en una situació de risc o abús" },
      ],
    },
    {
      label: "Pregunta 2 de 2",
      q: "Quants anys tens?",
      options: [
        { id: "14-15", label: "14 o 15" },
        { id: "16-17", label: "16 o 17" },
        { id: "18+", label: "18 o més" },
      ],
    },
  ],
  digital: [
    {
      label: "Pregunta 1 de 2",
      q: "Quin és el problema?",
      options: [
        { id: "fotos", label: "Han publicat fotos meves sense permís" },
        { id: "xantatge", label: "Em fan xantatge amb contingut íntim (sextorsió)" },
        { id: "petjada", label: "Vull esborrar la meva petjada digital" },
        { id: "assetjament", label: "Assetjament o abús en línia" },
      ],
    },
    {
      label: "Pregunta 2 de 2",
      q: "On s'ha publicat el contingut?",
      options: [
        { id: "xarxes", label: "Xarxes socials (Instagram, TikTok, X…)" },
        { id: "missatgeria", label: "Missatgeria (WhatsApp, Telegram…)" },
        { id: "web", label: "Pàgina web o fòrum" },
      ],
    },
  ],
  salut: [
    {
      label: "Pregunta 1 de 2",
      q: "Quin tipus d'atenció necessites?",
      options: [
        { id: "psicoleg", label: "Vull anar al psicòleg / terapeuta" },
        { id: "ingres", label: "M'han ingressat o em volen ingressar" },
        { id: "medicacio", label: "Em mediquen i no estic d'acord" },
        { id: "general", label: "Altra consulta de salut" },
      ],
    },
    {
      label: "Pregunta 2 de 2",
      q: "Quants anys tens?",
      options: [
        { id: "menys16", label: "Menys de 16" },
        { id: "16-17", label: "16 o 17" },
        { id: "18+", label: "18 o més" },
      ],
    },
  ],
};

function SideArt() {
  return (
    <div className="side-art" aria-hidden="true">
      <svg viewBox="0 0 240 100" preserveAspectRatio="xMidYMid meet">
        <line x1="10" y1="60" x2="230" y2="60" stroke="rgba(245,241,232,0.25)" strokeWidth="1"/>
        {[20, 55, 90, 125, 160, 195, 230].map((x, i) => (
          <g key={i}>
            <line x1={x} y1="56" x2={x} y2="64" stroke="rgba(245,241,232,0.4)" strokeWidth="1"/>
            <text x={x} y="80" fill="rgba(245,241,232,0.5)" fontFamily="JetBrains Mono, monospace" fontSize="8" textAnchor="middle">{String(i + 1).padStart(2, "0")}</text>
          </g>
        ))}
        <circle cx="55" cy="60" r="5" fill="#E8553D"/>
        <text x="55" y="40" fill="#F5F1E8" fontFamily="JetBrains Mono, monospace" fontSize="9" textAnchor="middle">ARA</text>
      </svg>
    </div>
  );
}

function SimIntro({ lang, onPick }) {
  const L = d(lang).simIntro;
  return (
    <section className="sim-shell">
      <header className="sim-head">
        <div className="eyebrow-row"><span className="eyebrow">{L.eyebrow}</span></div>
        <h1 className="sim-title">{L.title_a}<em>{L.title_em}</em>{L.title_b}</h1>
        <p className="sim-lede">{L.lede}</p>
      </header>
      <div className="scenario-grid">
        {L.scenarios.map((s) => (
          <button key={s.id} className="scenario" onClick={() => onPick(s.id)}>
            <span className="scenario-icon">{s.icon}</span>
            <h3 className="scenario-title">{s.title}</h3>
            <p className="scenario-body">{s.body}</p>
            <div className="scenario-foot">
              <span>{L.foot.left}</span>
              <span aria-hidden="true">→</span>
            </div>
          </button>
        ))}
      </div>
      <p style={{ marginTop: "var(--s-6)", fontFamily: "var(--f-mono)", fontSize: "var(--t-eyebrow)", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--c-ink-soft)", textAlign: "center" }}>{L.foot.right}</p>
    </section>
  );
}

function SimFlow({ lang, scenarioId, onReset, onFinish }) {
  const flow = QUESTION_FLOWS[scenarioId] || QUESTION_FLOWS.habitatge;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const q = flow[step];
  const progress = (step + 1) / flow.length;
  const L = d(lang).simSide;

  const onAnswer = (optId) => {
    const next = [...answers, optId];
    setAnswers(next);
    if (step + 1 >= flow.length) {
      onFinish(next);
    } else {
      setStep(step + 1);
    }
  };

  const back = () => {
    if (step === 0) { onReset(); return; }
    setStep(step - 1);
    setAnswers(answers.slice(0, -1));
  };

  return (
    <section className="sim-shell">
      <div className="sim-progress" aria-label="Progrés">
        <span>{q.label}</span>
        <div className="sim-bar"><div className="sim-bar-fill" style={{ transform: `scaleX(${progress})` }}/></div>
        <span>{Math.round(progress * 100)}%</span>
      </div>
      <div className="sim-stage">
        <div className="sim-body">
          <span className="sim-qlabel">{q.label}</span>
          <h2 className="sim-q">{q.q}</h2>
          <div className="sim-options" role="radiogroup">
            {q.options.map((o, i) => (
              <button key={o.id} className="sim-option" onClick={() => onAnswer(o.id)} role="radio" aria-checked="false">
                <span className="sim-option-mark">{String.fromCharCode(65 + i)}</span>
                <span className="sim-option-label">{o.label}</span>
                <span className="sim-option-arrow" aria-hidden="true">→</span>
              </button>
            ))}
          </div>
          <div className="sim-controls">
            <button className="link-btn" onClick={back}>← Tornar</button>
            <span className="link-btn" style={{ cursor: "default" }}>Anònim · 5–8 min</span>
          </div>
        </div>
        <aside className="sim-side" aria-label="Visió general">
          <span className="side-eyebrow">{L.eyebrow}</span>
          <h3 className="side-title">{L.title_a}<em>{L.title_em}</em>{L.title_b}</h3>
          <div className="side-rule"/>
          <div className="side-trail">
            {L.trail.map((t, i) => (
              <div className="side-trail-item" key={i}>
                <span className="side-dot">{String(i + 1).padStart(2, "0")}</span>
                <span><strong>{t.strong}.</strong> {t.body}</span>
              </div>
            ))}
          </div>
          <SideArt />
        </aside>
      </div>
    </section>
  );
}

function SimResult({ lang, scenario, answers, onReset, setRoute }) {
  const L = d(lang).simResults?.[scenario] ?? d(lang).simResults?.habitatge;
  const flow = QUESTION_FLOWS[scenario] || QUESTION_FLOWS.habitatge;

  const trail = answers.map((answerId, i) => {
    const step = flow[i];
    const option = step?.options.find((o) => o.id === answerId);
    return { num: String(i + 1).padStart(2, "0"), body: option?.label || answerId };
  });

  return (
    <section className="sim-shell">
      <div className="sim-progress">
        <span>Resultat</span>
        <div className="sim-bar"><div className="sim-bar-fill" style={{ transform: "scaleX(1)" }}/></div>
        <span>100%</span>
      </div>
      <div className="result-stage">
        <div className="result-body">
          <div className="result-head">
            <div className="chips">
              {L.chips.map((c, i) => (
                <span key={i} className={"chip" + (i > 0 ? " chip-dark" : "")}>{c}</span>
              ))}
            </div>
            <h1 className="result-title">{L.title_a}<em>{L.title_em}</em>{L.title_b}</h1>
          </div>
          {L.blocks.map((b, i) => (
            <div className="block" key={i}>
              <div className="block-head">
                <span className="block-num">{b.num}</span>
                <h2 className="block-title">{b.title}</h2>
              </div>
              <ul className="list">
                {b.items.map((it, j) => (
                  <li key={j}><span className="list-dot">{String(j + 1).padStart(2, "0")}</span><span>{it}</span></li>
                ))}
              </ul>
            </div>
          ))}
          <p className="result-disc">{L.disc}</p>
          <div className="result-actions">
            <button className="btn btn-primary" onClick={() => setRoute("res")}>
              <span>{L.actions.primary}</span><span className="btn-arrow">→</span>
            </button>
            <button className="btn btn-secondary" onClick={onReset}>
              <span>{L.actions.secondary}</span>
            </button>
          </div>
        </div>
        <aside className="sim-side">
          <span className="side-eyebrow">Resum</span>
          <h3 className="side-title">El que has dit fins ara</h3>
          <div className="side-rule"/>
          <div className="side-trail">
            {trail.map((item, i) => (
              <div className="side-trail-item" key={i}>
                <span className="side-dot">{item.num}</span>
                <span>{item.body}</span>
              </div>
            ))}
          </div>
          <div className="side-rule"/>
          <button className="btn btn-coral btn-sm" style={{ justifySelf: "start" }} onClick={() => setRoute("chat")}>
            <span>Sol·licitar acompanyament</span><span className="btn-arrow">→</span>
          </button>
        </aside>
      </div>
    </section>
  );
}

export default function Simulador({ lang, setRoute }) {
  const [phase, setPhase] = useState("intro");
  const [scenario, setScenario] = useState(null);
  const [answers, setAnswers] = useState([]);
  const reset = () => { setPhase("intro"); setScenario(null); setAnswers([]); };

  return (
    <main className="sim-page" id="main">
      {phase === "intro"  && <SimIntro lang={lang} onPick={(id) => { setScenario(id); setPhase("flow"); }} />}
      {phase === "flow"   && <SimFlow  lang={lang} scenarioId={scenario} onReset={reset} onFinish={(ans) => { setAnswers(ans); setPhase("result"); }} />}
      {phase === "result" && <SimResult lang={lang} scenario={scenario} answers={answers} onReset={reset} setRoute={setRoute} />}
    </main>
  );
}
