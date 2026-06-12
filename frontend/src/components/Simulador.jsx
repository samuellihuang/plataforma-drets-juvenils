import React, { useState, useEffect } from "react";
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
  educacio: [
    {
      label: "Pregunta 1 de 2",
      q: "Quin és el problema principal?",
      options: [
        { id: "beques", label: "M'han denegat una beca o ajuda" },
        { id: "expedient", label: "Tinc un expedient disciplinari o sanció" },
        { id: "assetjament", label: "Hi ha assetjament escolar (bullying)" },
        { id: "matricula", label: "Problemes per matricular-me o accedir" },
      ],
    },
    {
      label: "Pregunta 2 de 2",
      q: "On estudies?",
      options: [
        { id: "institut", label: "Institut o escola (ESO / Batxillerat)" },
        { id: "fp", label: "Formació Professional (FP)" },
        { id: "universitat", label: "Universitat" },
      ],
    },
  ],
  violencia: [
    {
      label: "Pregunta 1 de 2",
      q: "Quin tipus de situació estàs vivint?",
      options: [
        { id: "genere", label: "Violència de gènere o de parella" },
        { id: "lgtbi", label: "Discriminació o violència LGTBIfòbia" },
        { id: "sexual", label: "Assetjament sexual" },
        { id: "amenaces", label: "Amenaces o coaccions" },
      ],
    },
    {
      label: "Pregunta 2 de 2",
      q: "Quina és la teva situació ara?",
      options: [
        { id: "actual", label: "Estic en la relació / situació ara" },
        { id: "sortida", label: "He sortit però vull denunciar" },
        { id: "ajuda", label: "Vull ajudar un familiar o amic/a" },
      ],
    },
  ],
  estrangeria: [
    {
      label: "Pregunta 1 de 2",
      q: "Quina és la teva situació administrativa?",
      options: [
        { id: "irregular", label: "Sense documentació regularitzada" },
        { id: "arrelament", label: "Vull sol·licitar l'arrelament social" },
        { id: "renovacio", label: "He de renovar el permís de residència" },
        { id: "asil", label: "Vull demanar asil o protecció internacional" },
      ],
    },
    {
      label: "Pregunta 2 de 2",
      q: "Quant de temps portes a Espanya?",
      options: [
        { id: "menys2", label: "Menys de 2 anys" },
        { id: "2a3", label: "Entre 2 i 3 anys" },
        { id: "mes3", label: "Més de 3 anys" },
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

function getResult(scenario, answers) {
  const R = (chips, title_a, title_em, title_b, blocks, disc, primary) => ({
    chips, title_a, title_em, title_b, blocks, disc,
    actions: { primary, secondary: "Refer el simulador" },
  });
  const B = (num, title, items) => ({ num, title, items });

  /* ── TREBALL ── */
  if (scenario === 'treball') {
    const problem = answers[1]; // comiat | salaris | hores | abus
    const timing  = answers[2]; // menys20 | menys1y | mes1y

    if (problem === 'comiat' && timing === 'menys20') return R(
      ["Treball", "Acomiadament", "⚠️ Urgent: 20 dies"],
      "Tens ", "20 dies hàbils", " per impugnar l'acomiadament.",
      [
        B("01", "El que diu la llei", [
          "L'acomiadament és impugnable davant el jutjat social en 20 dies hàbils des de la comunicació de la baixa.",
          "Si l'empresa no et dóna carta d'acomiadament per escrit, l'acomiadament és nul per defecte de forma.",
          "Pots reclamar la readmissió o una indemnització de 33 dies per any treballat si es declara improcedent.",
        ]),
        B("02", "Fes-ho aquesta setmana", [
          "Recull la carta d'acomiadament, nòmines i contracte. Sense documents el procés es complica molt.",
          "Contacta amb Avalot (CCOO Joves) o Acció Jove (UGT) per assessorament laboral gratuït i immediat.",
          "Presenta una papereta de conciliació al SMAC/CMAC: és el pas previ obligatori a la demanda judicial.",
        ]),
        B("03", "Terminis crítics", [
          "20 dies hàbils per presentar la papereta de conciliació — el rellotge ja corre!",
          "El SMAC ha de citar-te en un termini màxim de 15 dies.",
          "Si no hi ha acord en conciliació, tens 20 dies més per presentar demanda judicial.",
        ]),
      ],
      "Basada en l'ET, arts. 49-57. Si el contracte és de pràctiques, contacta igualment: els drets es mantenen.",
      "Veure recursos laborals"
    );

    if (problem === 'comiat') return R(
      ["Treball", "Acomiadament", "Termini exhaurit"],
      "El termini per impugnar ha passat, però ", "pots reclamar la liquidació", ".",
      [
        B("01", "El que diu la llei", [
          "El termini de 20 dies hàbils per impugnar l'acomiadament ha expirat, cosa que tanca la via judicial directa.",
          "Tot i això, pots reclamar salaris pendents, vacances no gaudides i dies de liquidació que et puguin deure.",
          "Si la liquidació és incorrecta, tens 1 any per reclamar-la davant el jutjat social.",
        ]),
        B("02", "Què pots fer ara", [
          "Revisa la teva liquidació: has de rebre els dies treballats, les vacances proporcionals i la indemnització si escau.",
          "Si la liquidació és incorrecta, presenta demanda al jutjat social (fins a 6.000 € no cal advocat).",
          "Presenta denúncia a la Inspecció de Treball si l'empresa ha incomplert el conveni col·lectiu.",
        ]),
        B("03", "Terminis que tens oberts", [
          "1 any per reclamar salaris i liquidació impagats.",
          "3 anys per reclamar cotitzacions no ingressades a la Seguretat Social.",
        ]),
      ],
      "Basada en l'ET i la Llei de Jurisdicció Social. Consulta el torn d'ofici si tens dubtes sobre la liquidació.",
      "Veure recursos laborals"
    );

    if (problem === 'salaris') return R(
      ["Treball", "Salaris impagats", "Acció en 1 any"],
      "Tens dret a cobrar ", "tot el que et deuen", ".",
      [
        B("01", "El que diu la llei", [
          "El no-pagament del salari és un incompliment greu. Pots reclamar l'import degut més els interessos de demora.",
          "Si l'empresa no paga durant 2 mesos seguits, pots extingir el contracte i cobrar indemnització per acomiadament improcedent (art. 50 ET).",
          "El FOGASA cobreix fins a 120 dies de salari si l'empresa és insolvente o en concurs de creditors.",
        ]),
        B("02", "Pas a pas", [
          "Recopila tots els justificants: nòmines, transferències, missatges. Guarda-ho tot fora del mòbil de feina.",
          "Presenta papereta de conciliació al SMAC per reclamar els salaris impagats de forma ràpida i gratuïta.",
          "Paral·lelament, presenta denúncia anònima a la Inspecció de Treball: poden obligar l'empresa a pagar en terminis curts.",
        ]),
        B("03", "Terminis", [
          "1 any per reclamar salaris impagats des que s'haurien d'haver pagat.",
          "2 mesos sense cobrar → pots extingir el contracte (art. 50 ET) i cobrar 33 dies/any.",
        ]),
      ],
      "Basada en l'ET, arts. 29 i 50. Per a empreses en concurs de creditors, consulta la via del FOGASA.",
      "Veure recursos laborals"
    );

    if (problem === 'hores') return R(
      ["Treball", "Hores extres", "Denúncia anònima"],
      "Les hores extra no pagades ", "es poden reclamar", ".",
      [
        B("01", "El que diu la llei", [
          "Les hores extres s'han de compensar econòmicament o amb descansos. Mai poden ser obligatòries sense pacte escrit.",
          "El límit legal és 80 hores extres anuals. Superar-lo és una infracció greu sancionable per la Inspecció.",
          "L'empresa ha de dur un registre horari diari obligatori i conservar-lo 4 anys. Si no existeix, és prova a favor teu.",
        ]),
        B("02", "Què pots fer", [
          "Comença a registrar les teves hores amb una app: data, hora d'entrada i sortida cada dia.",
          "Presenta denúncia anònima a la Inspecció de Treball: han de comprovar el registre horari de l'empresa.",
          "Pots reclamar les hores extres impagades dels darrers 12 mesos davant el jutjat social o via conciliació.",
        ]),
        B("03", "Terminis", [
          "1 any per reclamar hores extres no pagades des que s'haurien d'haver abonat.",
          "4 anys: temps que l'empresa ha de conservar el registre horari.",
        ]),
      ],
      "Basada en l'ET, art. 35, i el RD-llei 8/2019 de registre horari obligatori.",
      "Veure recursos laborals"
    );

    return R(
      ["Treball", "Tracte abusiu", "Múltiples vies"],
      "El tracte abusiu en el treball ", "no és acceptable", ".",
      [
        B("01", "El que diu la llei", [
          "L'assetjament moral o laboral (mobbing) pot ser constitutiu de delicte contra la integritat moral (art. 173 CP).",
          "L'empresa té l'obligació legal de garantir un entorn de treball digne. Si no actua, respon per danys.",
          "Pots sol·licitar l'extinció del contracte per incompliment greu de l'empresa (art. 50 ET) i cobrar indemnització.",
        ]),
        B("02", "Actua ara", [
          "Documenta tot: correus, missatges, incidents amb data, hora i testimonis.",
          "Si tens representació sindical, comunica-ho. Si no, contacta amb CCOO o UGT per assessorament.",
          "Presenta denúncia a la Inspecció de Treball per condicions de treball inadequades.",
        ]),
        B("03", "Terminis", [
          "Pots demanar mesures correctores en qualsevol moment mentre estiguis a l'empresa.",
          "Si vols extingir el contracte per causa, cal acreditar l'incompliment greu de l'empresa.",
        ]),
      ],
      "Basada en l'ET, art. 50, i el CP, art. 173. En casos greus, considera la via penal.",
      "Veure recursos laborals"
    );
  }

  /* ── HABITATGE ── */
  if (scenario === 'habitatge') {
    const situation = answers[1]; // burofax_no | burofax_si | fianza | subida

    if (situation === 'burofax_no') return R(
      ["Habitatge", "Sense burofax", "Tens temps"],
      "Sense burofax oficial, ", "no et poden desnonar", ".",
      [
        B("01", "El que diu la llei", [
          "Un avís per WhatsApp o verbal NO té validesa legal per iniciar un procés de desnonament.",
          "La propietat ha d'enviar un requeriment formal (burofax o notarial) per iniciar el compte enrere legal.",
          "Fins que no rebs el burofax tens temps per preparar-te i buscar alternatives.",
        ]),
        B("02", "Fes-ho ara", [
          "No marxis del pis voluntàriament: perdries drets i tindries menys temps per buscar alternativa.",
          "Truca al Servei d'Habitatge (010 a BCN) i demana mediació gratuïta amb la propietat.",
          "Contacta amb el Sindicat de Llogateres per assessorament i estratègia col·lectiva.",
        ]),
        B("03", "Quan arribi el burofax", [
          "30 dies des del burofax fins que la propietat pot presentar demanda judicial.",
          "No signis cap document sense consultar un advocat del torn d'ofici (gratuït).",
        ]),
      ],
      "Basada en la LAU i la Llei 12/2023. La situació varia segons el tipus de contracte.",
      "Veure recursos d'habitatge"
    );

    if (situation === 'burofax_si') return R(
      ["Habitatge", "Burofax rebut", "⚠️ Acció urgent"],
      "Has rebut el burofax: el ", "compte enrere ha començat", ".",
      [
        B("01", "El que diu la llei", [
          "Des del burofax, la propietat pot presentar demanda de desnonament al cap de 30 dies.",
          "Un cop presentada la demanda, el jutjat et notificarà i tindràs 10 dies hàbils per contestar-la.",
          "Si ets persona vulnerable (renda baixa, fills menors, discapacitat) pots sol·licitar la suspensió del llançament.",
        ]),
        B("02", "Fes-ho AVUI", [
          "Contacta avui amb el torn d'ofici o el SOJ (Servei d'Orientació Jurídica): és gratuït i urgent.",
          "Sol·licita cita als Serveis Socials municipals per acreditar vulnerabilitat si és el teu cas.",
          "No signis cap document ni acord sense consultar primer un advocat.",
        ]),
        B("03", "Terminis crítics", [
          "30 dies des del burofax per a presentació de demanda.",
          "10 dies hàbils per contestar la demanda un cop notificada.",
          "Pots demanar pròrroga si ets vulnerable: fins a 2 anys en alguns casos.",
        ]),
      ],
      "Basada en la LAU i la Llei 12/2023. Actua ràpid: cada dia compta.",
      "Veure recursos d'habitatge"
    );

    if (situation === 'fianza') return R(
      ["Habitatge", "Fiança no retornada", "3 anys per reclamar"],
      "Tens dret a recuperar ", "la fiança íntegra", ".",
      [
        B("01", "El que diu la llei", [
          "La propietat té 30 dies des que marxes per retornar la fiança. Passat aquest termini genera interessos legals.",
          "Únicament pot retenir part de la fiança si hi ha danys documentats. El desgast normal de l'ús NO es pot descomptar.",
          "Si la propietat no va dipositar la fiança a l'INCASOL, et pot deure el doble de l'import.",
        ]),
        B("02", "Pas a pas", [
          "Envia un burofax a la propietat demanant la devolució en 10 dies. Guarda el resguard.",
          "Si no respon, presenta demanda al jutjat de primera instància (fins a 2.000 € no cal advocat ni procurador).",
          "Comprova si la fiança estava dipositada: l'INCASOL de Catalunya et pot informar.",
        ]),
        B("03", "Terminis", [
          "30 dies des que marxes perquè la propietat et retorni la fiança.",
          "3 anys per reclamar-la judicialment si no te la tornen.",
        ]),
      ],
      "Basada en la LAU, art. 36, i la normativa de l'INCASOL. Per a imports elevats, considera advocat.",
      "Veure recursos d'habitatge"
    );

    return R(
      ["Habitatge", "Pujada del lloguer", "Límit legal IPC"],
      "La pujada del lloguer ", "té un límit legal", " que pots exigir.",
      [
        B("01", "El que diu la llei", [
          "La Llei 12/2023 limita la pujada del lloguer a l'IPC o, en zones tensionades, a l'índex de contenció de rendes.",
          "La propietat ha de notificar la pujada amb almenys 30 dies d'antelació a la renovació del contracte.",
          "Si vius en una zona declarada tensionada, la pujada pot estar limitada per sota de l'IPC.",
        ]),
        B("02", "Pas a pas", [
          "Comprova si la teva zona és 'àrea de mercat tensionat' al portal de l'INCASOL o l'Agència de l'Habitatge.",
          "Calcula la pujada màxima legal amb el simulador de l'INE (índex IPC interanual del teu contracte).",
          "Si la pujada supera el límit, envia un escrit a la propietat negant-t'hi i documentant el límit legal aplicable.",
        ]),
        B("03", "Terminis", [
          "30 dies d'antelació mínims per a qualsevol modificació de renda.",
          "Pots denunciar pujades il·legals a l'Agència de l'Habitatge de Catalunya.",
        ]),
      ],
      "Basada en la Llei 12/2023 i la LAU vigent. La normativa pot variar si el contracte és anterior a 2023.",
      "Veure recursos d'habitatge"
    );
  }

  /* ── POLICIAL ── */
  if (scenario === 'policial') {
    const incident = answers[0]; // ident | multa | escorco | grav

    if (incident === 'ident') return R(
      ["Policia", "Identificació", "Drets garantits"],
      "Tens dret a saber ", "per què t'identifiquen", ".",
      [
        B("01", "El que diu la llei", [
          "La policia pot identificar-te si hi ha indicis d'haver comès una infracció o per raons de seguretat pública. No per qualsevol motiu.",
          "Tens dret a saber el motiu de la identificació i la llei en que es basa. Has de facilitar el DNI, però res més.",
          "Si no portes el DNI, la policia pot portar-te a comissaria 'per al temps imprescindible' per identificar-te (màxim 6 hores).",
        ]),
        B("02", "Durant la identificació", [
          "Mantén la calma. Facilita les dades però pots demanar el número de placa i el motiu de la identificació.",
          "Anota tot un cop acabat: hora, lloc, número de placa dels agents, testimonis.",
          "Si creus que ha estat per perfil ètnic, posa-t'en contacte amb SOS Racisme.",
        ]),
        B("03", "Terminis", [
          "2 anys per presentar queixa per identificació il·legal davant el ministeri fiscal o el Síndic de Greuges.",
        ]),
      ],
      "Basada en la LO 4/2015 i la LO 2/1986. La parada per identificació sense motiu és una pràctica il·legal.",
      "Veure recursos de drets civils"
    );

    if (incident === 'multa') return R(
      ["Policia", "Multa", "30 dies per al·legar"],
      "Tens 30 dies per ", "impugnar la multa", ".",
      [
        B("01", "El que diu la llei", [
          "Les sancions de la Llei Mordassa van de 100 € fins a 600.000 € i sovint s'apliquen de forma abusiva.",
          "Tens dret a veure l'acta d'infracció i a presentar al·legacions per escrit en un termini de 10-30 dies hàbils.",
          "Si el recurs administratiu és denegat, pots recórrer judicialment.",
        ]),
        B("02", "Pas a pas", [
          "Llegeix l'acta amb atenció: errors en les dades (hora, lloc, nom) poden anul·lar la sanció.",
          "Presenta al·legacions per escrit. No pagis mentre tant: pagar implica acceptar els fets.",
          "Contacta amb col·lectius especialitzats (Irídia, SOS Racisme) si és per actuació en protesta o motiu discriminatori.",
        ]),
        B("03", "Terminis", [
          "10-30 dies hàbils per presentar al·legacions (comprova el termini exacte al document de la sanció).",
          "Si no al·legues i no pagues, la multa pot incrementar-se per recàrrecs.",
        ]),
      ],
      "Basada en la LO 4/2015 i la Llei 39/2015 de procediment administratiu.",
      "Veure recursos de drets civils"
    );

    if (incident === 'escorco') return R(
      ["Policia", "Escorcoll / Retenció", "Drets fonamentals"],
      "Un escorcoll sense causa ", "pot ser il·legal", ".",
      [
        B("01", "El que diu la llei", [
          "La policia només pot escorcollar-te si hi ha causa justificada (indicis de delicte, seguretat). Té uns límits legals clars.",
          "Una detenció ha de ser comunicada als teus familiars i tens dret a advocat des del primer moment.",
          "Tens dret al silenci: no estàs obligat a declarar contra tu mateix (art. 24 CE).",
        ]),
        B("02", "Durant i després", [
          "No resisteixis físicament: pots protestar verbalment però de forma tranquil·la.",
          "Un cop lliure, anota tot: hora, lloc, número de placa dels agents i el que ha passat exactament.",
          "Presenta denúncia als Mossos o al jutjat si creus que hi ha hagut abús o irregularitat.",
        ]),
        B("03", "Terminis", [
          "Detenció sense càrrecs: màxim 72 hores (art. 17 CE). Passat aquest temps has de quedar lliure o ser presentat al jutge.",
          "2 anys per presentar denúncia per tracte irregular o lesions.",
        ]),
      ],
      "Basada en la CE art. 17, la LO 4/2015 i la LECr. Si hi ha hagut violència, documenta les lesions immediatament.",
      "Veure recursos de drets civils"
    );

    return R(
      ["Policia", "Gravar la policia", "Legal en espai públic"],
      "Gravar la policia en espai públic ", "és legal", ".",
      [
        B("01", "El que diu la llei", [
          "Gravar agents de policia en l'exercici de les seves funcions en espai públic és legal (art. 20 CE).",
          "Els agents NO poden confiscar-te el mòbil sense ordre judicial.",
          "Difondre el contingut és legal sempre que no reveli dades que posin en risc operacions concretes.",
        ]),
        B("02", "Si t'ho impedeixen", [
          "Mantén la calma. Pots indicar verbalment que és un dret legal, però no provoquis una escalada.",
          "Si et confisquen el mòbil sense ordre judicial, denuncia-ho immediatament a la fiscalia.",
          "Les gravacions poden ser prova en un judici: guarda-les en un lloc segur.",
        ]),
        B("03", "Terminis", [
          "Si t'han multat per gravar: 30 dies per al·legar la sanció.",
          "Contacta amb el Grup de Drets Civils d'Irídia per assessorament especialitzat.",
        ]),
      ],
      "Basada en la CE art. 20 i la LO 4/2015. La jurisprudència reforça el dret a gravar policia en acte de servei.",
      "Veure recursos de drets civils"
    );
  }

  /* ── FAMILIAR ── */
  if (scenario === 'familiar') {
    const problem = answers[0]; // marxar | conflicte | risc
    const age     = answers[1]; // 14-15 | 16-17 | 18+

    if (problem === 'risc') return R(
      ["Família", "Situació de risc", "Protecció immediata"],
      "Si estàs en risc, ", "hi ha protecció immediata", " disponible.",
      [
        B("01", "El que diu la llei", [
          "La DGAIA pot activar mesures de protecció en menys de 24 hores si hi ha risc per a un menor.",
          "Qualsevol professional (metge, mestre) té l'obligació legal de denunciar situacions de risc a menors.",
          "En risc immediat, la policia pot separar-te de l'entorn perillós sense ordre judicial prèvia.",
        ]),
        B("02", "Actua ara", [
          "Truca al 112 si estàs en perill físic immediat.",
          "Truca al 116 (línia europea d'ajuda a infants) o al 900 300 777 (SOS Infants Catalunya): confidencial i gratuït.",
          "Pots anar directament a qualsevol CAP, escola o comissaria: estan obligats a activar el protocol de protecció.",
        ]),
        B("03", "Terminis", [
          "Mesures de protecció urgents: s'activen en 24-72 hores.",
          "No esperes si hi ha risc físic o psicològic: actua avui.",
        ]),
      ],
      "Basada en la Llei 14/2010 (LDOIA) i el protocol d'atenció a menors en risc de Catalunya.",
      "Veure recursos"
    );

    if (problem === 'marxar' && age === '14-15') return R(
      ["Família", "14-15 anys", "Via serveis socials"],
      "Amb 14-15 anys, ", "marxar de casa", " passa pels serveis socials.",
      [
        B("01", "El que diu la llei", [
          "Als 14-15 anys no pots emancipar-te legalment. Necessites el suport d'adults o institucions.",
          "Si la situació a casa és insegura o hi ha negligència, els Serveis Socials i la DGAIA han d'intervenir.",
          "Existeixen CRAE (centres residencials) i famílies d'acollida per a menors que no poden viure amb la família.",
        ]),
        B("02", "Vies disponibles", [
          "Parla amb un adult de confiança a l'escola (orientador, tutor): estan obligats a ajudar-te.",
          "Truca al 116 o al 900 300 777 per parlar de forma anònima amb professionals.",
          "Si hi ha violència o abús, contacta directament amb la policia o qualsevol CAP.",
        ]),
        B("03", "El futur", [
          "Als 16 anys podràs sol·licitar l'emancipació judicial si demostres capacitat de vida independent.",
        ]),
      ],
      "Basada en la Llei 14/2010 (LDOIA) i el Codi Civil. La teva seguretat és la prioritat.",
      "Veure recursos"
    );

    if (problem === 'marxar' && age === '16-17') return R(
      ["Família", "16-17 anys", "Emancipació possible"],
      "Als 16 anys pots ", "emancipar-te", " legalment.",
      [
        B("01", "El que diu la llei", [
          "A partir dels 16 anys pots sol·licitar l'emancipació davant un notari (amb consentiment dels pares) o davant el jutjat (sense, per causa justa).",
          "Un cop emancipat/da pots signar contractes, llogar un pis i prendre decisions de forma autònoma.",
          "Si no vols emancipar-te però necessites sortir de casa, els Serveis Socials poden buscar alternatives residencials.",
        ]),
        B("02", "Pas a pas", [
          "Parla amb un advocat del torn d'ofici (gratuït) per valorar quin tipus d'emancipació és viable.",
          "Si els teus pares no hi estan d'acord, hauràs d'acreditar davant el jutjat capacitat de vida independent.",
          "Contacta amb Serveis Socials: poden orientar-te sobre recursos residencials per a joves.",
        ]),
        B("03", "Terminis", [
          "Emancipació notarial (amb consentiment): 1-2 setmanes.",
          "Emancipació judicial (sense consentiment): 1-3 mesos.",
        ]),
      ],
      "Basada en el Codi Civil, arts. 314-321. Considera els aspectes pràctics (feina, habitatge) abans de sol·licitar-la.",
      "Veure recursos"
    );

    if (problem === 'marxar') return R(
      ["Família", "+18 anys", "Plena autonomia"],
      "Amb 18 anys tens ", "plena autonomia", " per marxar.",
      [
        B("01", "El que diu la llei", [
          "Amb 18 anys ets major d'edat: pots marxar quan vulguis, sense demanar permís ni justificació.",
          "No existeix cap obligació legal de continuar vivint amb la família.",
          "Els teus pares no estan legalment obligats a mantenir-te si tens capacitat per treballar.",
        ]),
        B("02", "Recursos pràctics", [
          "Busca habitació o pis compartit: Idealista, Habitaclia, o grups locals de Facebook.",
          "Consulta les ajudes al lloguer per a joves de la Generalitat i el teu ajuntament.",
          "Si estàs en situació de vulnerabilitat, contacta amb Serveis Socials per a orientació i possibles ajudes.",
        ]),
        B("03", "Ajudes disponibles", [
          "Ajuda al lloguer per a joves (fins a 35 anys) de la Generalitat de Catalunya.",
          "Borsa Jove d'Habitatge: pisos a preus assequibles per a joves.",
        ]),
      ],
      "Amb 18 anys la decisió és teva. Si tens una situació complexa, consulta Serveis Socials.",
      "Veure recursos d'habitatge"
    );

    return R(
      ["Família", "Conflicte familiar", "Mediació disponible"],
      "La mediació familiar ", "pot resoldre el conflicte", " sense arribar al jutjat.",
      [
        B("01", "El que diu la llei", [
          "El Centre de Mediació de Catalunya ofereix mediació familiar gratuïta o de baix cost per a conflictes familiars.",
          "Si hi ha violència o abús, la via és la protecció, no la mediació.",
          "La mediació és voluntària i confidencial: el que es parla no pot ser usat judicialment.",
        ]),
        B("02", "Opcions disponibles", [
          "Sol·licita mediació familiar al Centre de Mediació de Catalunya (gratuïta en molts casos).",
          "Si ets menor i el conflicte és greu, parla amb el teu centre educatiu: poden activar protocols d'ajuda.",
          "El servei SAIA (Servei d'Atenció Integral a Adolescents) ofereix suport específic per a joves en conflicte familiar.",
        ]),
        B("03", "Quan és urgent", [
          "Si hi ha violència física o amenaces: 112 immediatament.",
          "Si hi ha violència psicològica persistent: Serveis Socials i DGAIA.",
        ]),
      ],
      "Basada en la Llei 15/2009 de mediació en l'àmbit del dret privat de Catalunya.",
      "Veure recursos"
    );
  }

  /* ── DIGITAL ── */
  if (scenario === 'digital') {
    const problem = answers[0]; // fotos | xantatge | petjada | assetjament

    if (problem === 'fotos') return R(
      ["Digital", "Fotos sense permís", "Retirada urgent"],
      "Tens dret a ", "retirar les teves fotos", " de qualsevol plataforma.",
      [
        B("01", "El que diu la llei", [
          "El dret a la pròpia imatge (LO 1/1982) protegeix la teva foto: ningú pot publicar-la sense el teu consentiment exprés.",
          "El RGPD et dóna el dret d'oposició i dret a l'oblit: pots sol·licitar la retirada immediata.",
          "Si ets menor d'edat, la protecció és absoluta: cap imatge teva pot publicar-se sense consentiment.",
        ]),
        B("02", "Pas a pas", [
          "Fes captures de pantalla com a prova ABANS de sol·licitar la retirada.",
          "Usa el formulari de 'contingut que viola drets de privacitat' de cada xarxa (Instagram, TikTok, X) per reportar.",
          "Si la plataforma no actua en 72 hores, presenta reclamació gratuïta a l'AEPD (aepd.es).",
        ]),
        B("03", "Terminis", [
          "72 hores: termini per a retirada urgent a les principals plataformes.",
          "1 mes: termini de resposta a una reclamació formal davant l'AEPD.",
        ]),
      ],
      "Basada en la LO 1/1982, la LOPDGDD i el RGPD. Si les fotos són de caràcter sexual, consulta la via de sextorsió.",
      "Veure recursos digitals"
    );

    if (problem === 'xantatge') return R(
      ["Digital", "Sextorsió", "⚠️ Delicte penal"],
      "La sextorsió és un ", "delicte penal", ": no paguis i denuncia.",
      [
        B("01", "El que diu la llei", [
          "La distribució o amenaça de distribució de contingut íntim sense consentiment és un delicte (art. 197.7 CP), amb penes de fins a 5 anys.",
          "El xantatge i la coacció també estan tipificats penalment. Pagar no garanteix que no ho publiquin.",
          "La policia té unitats especialitzades (UDEF - Policia Nacional, Mossos Ciberdelictes) per a aquests casos.",
        ]),
        B("02", "Actua ara: NO paguis", [
          "No pagis: el pagament no atura el xantatge i sovint l'incentiva a continuar.",
          "Guarda totes les proves: captures dels missatges, noms d'usuari, URL de perfils.",
          "Denuncia a la Policia Nacional (Grup de Delictes Telemàtics) o als Mossos (Unitat de Ciberdelictes).",
        ]),
        B("03", "Suport disponible", [
          "L'AEPD té un canal d'urgència per a contingut íntim no consensuat: actuen en hores.",
          "Stop Sextorsión (stopsextorsion.com) ofereix suport i orientació gratuïts.",
        ]),
      ],
      "Basada en el CP, arts. 172 i 197.7. Denuncia immediatament: la policia actua ràpid en casos de sextorsió.",
      "Veure recursos digitals"
    );

    if (problem === 'petjada') return R(
      ["Digital", "Petjada digital", "Dret a l'oblit"],
      "Pots ", "esborrar la teva petjada digital", " legalment.",
      [
        B("01", "El que diu la llei", [
          "El RGPD reconeix el 'dret a l'oblit' (art. 17): pots sol·licitar l'eliminació de dades personals que ja no siguin necessàries.",
          "Google i altres cercadors han de processar sol·licituds de retirada de resultats que afectin la teva privacitat.",
          "Les xarxes socials han d'eliminar el teu compte i totes les dades associades si ho sol·licites.",
        ]),
        B("02", "Pas a pas", [
          "Google: usa el formulari 'eliminació de contingut de Google' per a resultats de cerca.",
          "Xarxes socials: sol·licita la eliminació de compte des de la configuració. Descarrega les teves dades primer.",
          "Si una web de tercers no retira el contingut, presenta reclamació a l'AEPD.",
        ]),
        B("03", "Terminis", [
          "30 dies per a resposta de la plataforma o cercador a la teva sol·licitud.",
          "3 mesos per a resolució de l'AEPD en casos de reclamació formal.",
        ]),
      ],
      "Basada en el RGPD, art. 17, i la LOPDGDD. El dret a l'oblit té límits: no s'aplica a informació d'interès públic.",
      "Veure recursos digitals"
    );

    return R(
      ["Digital", "Assetjament en línia", "Acció immediata"],
      "L'assetjament digital ", "té solució", ": no estàs sol/a.",
      [
        B("01", "El que diu la llei", [
          "L'assetjament en línia persistent pot constituir un delicte de stalking (art. 172 ter CP) o de coaccions.",
          "Les plataformes estan obligades a actuar davant l'assetjament reportat.",
          "Si l'assetjador és conegut i la situació és greu, pots sol·licitar una ordre d'allunyament.",
        ]),
        B("02", "Actua", [
          "Bloqueja i reporta l'usuari a la plataforma. Guarda captures ABANS de bloquejar.",
          "Si coneixes la identitat de l'assetjador, presenta denúncia a la Policia Nacional o als Mossos.",
          "Contacta amb el Casal Lambda si l'assetjament és per motiu de gènere o identitat sexual.",
        ]),
        B("03", "Suport", [
          "Línia d'ajuda contra l'assetjament escolar i digital: 900 018 018.",
          "Si ets menor, parla amb un adult de confiança o el teu centre educatiu.",
        ]),
      ],
      "Basada en el CP, arts. 172 ter i 173. Si ets menor, els adults del teu entorn estan obligats a ajudar-te.",
      "Veure recursos digitals"
    );
  }

  /* ── SALUT ── */
  if (scenario === 'salut') {
    const type = answers[0]; // psicoleg | ingres | medicacio | general
    const age  = answers[1]; // menys16 | 16-17 | 18+

    if (type === 'psicoleg' && age === 'menys16') return R(
      ["Salut mental", "Menys de 16", "Acompanyament necessari"],
      "Amb menys de 16 anys pots ", "accedir al psicòleg", " amb suport d'un adult.",
      [
        B("01", "El que diu la llei", [
          "Amb menys de 16 anys, en principi cal el consentiment dels pares per a atenció psicològica reglada.",
          "En situacions de risc, els professionals poden atendre un menor sense consentiment parental.",
          "El CSMIJ (Centre de Salut Mental Infanto-Juvenil) és el recurs específic per a menors de 18 anys.",
        ]),
        B("02", "Alternatives", [
          "Parla amb el teu metge de capçalera al CAP: pot fer una derivació al CSMIJ.",
          "El servei de 'consell de joves' d'alguns ajuntaments ofereix atenció psicològica sense permís parental.",
          "En situació de crisi: truca al 024 (gratuït, confidencial, 24h).",
        ]),
        B("03", "Temps d'espera", [
          "Derivació CAP → CSMIJ: 4-12 setmanes.",
          "Atenció en crisi: immediata (024 o urgències).",
        ]),
      ],
      "Basada en la Llei 21/2000 de Catalunya. En situació d'urgència, truca sempre al 024.",
      "Veure recursos de salut"
    );

    if (type === 'psicoleg') return R(
      ["Salut mental", age === '16-17' ? "16-17 anys" : "+18 anys", "Autonomia garantida"],
      "Pots anar al psicòleg ", "sense permís", " dels teus pares.",
      [
        B("01", "El que diu la llei", [
          age === '16-17'
            ? "La Llei 21/2000 de Catalunya reconeix la teva autonomia per a decisions mèdiques als 16 anys. No necessites permís parental."
            : "Amb 18 anys tens plena autonomia: pots accedir a qualsevol servei de salut mental sense cap restricció.",
          "Tens dret a la confidencialitat: el metge no pot compartir informació amb els teus pares sense el teu consentiment.",
          "El sistema públic ofereix psicòleg clínic al CSMA (adults) o CSMIJ (menors de 18) per derivació del CAP.",
        ]),
        B("02", "Com accedir-hi", [
          "Demana cita al teu CAP i sol·licita derivació al CSMA/CSMIJ per atenció psicològica.",
          "Hi ha psicòlegs al Col·legi Oficial de Psicòlegs amb primera visita gratuïta o reduïda.",
          "El CJAS ofereix atenció psicològica i de salut sexual per a joves de forma gratuïta o molt assequible.",
        ]),
        B("03", "Temps d'espera", [
          "CAP → CSMA: 4-12 setmanes. Pots demanar urgència si la situació ho requereix.",
          "En crisi: 024 (gratuït, 24h) o urgències del CAP.",
        ]),
      ],
      "Basada en la Llei 21/2000 (Catalunya). La llista d'espera pot ser llarga: el 024 és immediat.",
      "Veure recursos de salut"
    );

    if (type === 'ingres') return R(
      ["Salut mental", "Ingrés involuntari", "Dret a recórrer"],
      "L'ingrés involuntari ", "requereix autorització judicial", ".",
      [
        B("01", "El que diu la llei", [
          "L'ingrés psiquiàtric involuntari ha de ser autoritzat pel jutjat en 24 hores des que es produeix (art. 763 LEC).",
          "Tens dret a un advocat des del moment de l'ingrés. Si no en tens, el torn d'ofici t'assigna un gratuïtament.",
          "El jutge ha de verificar que l'ingrés és necessari i proporcional. Pots presentar al·legacions.",
        ]),
        B("02", "Els teus drets", [
          "Tens dret a comunicar-te amb l'exterior (família, advocat) des del primer moment.",
          "Pots demanar una segona opinió mèdica sobre el diagnòstic i el tractament.",
          "Si creus que el teu ingrés és il·legal o s'ha prolongat injustificadament, l'advocat pot presentar recurs urgent.",
        ]),
        B("03", "Terminis", [
          "24 hores per a autorització judicial de l'ingrés involuntari.",
          "Revisió judicial periòdica (cada 6 mesos com a màxim).",
        ]),
      ],
      "Basada en la LEC, art. 763, i el Conveni de Drets de les Persones amb Discapacitat (ONU).",
      "Veure recursos de salut"
    );

    if (type === 'medicacio') return R(
      ["Salut mental", "Medicació", "Dret a decidir"],
      "Tens dret a ", "refusar o qüestionar", " qualsevol medicació.",
      [
        B("01", "El que diu la llei", [
          "El consentiment informat és un dret fonamental: cap medicament pot administrar-se sense la teva aprovació (si tens capacitat de decisió).",
          "Als 16 anys (Catalunya) tens autonomia mèdica: pots refusar un tractament excepte en situació de perill vital immediat.",
          "Tens dret a rebre informació completa sobre el medicament, els efectes secundaris i les alternatives.",
        ]),
        B("02", "Pas a pas", [
          "Demana al metge una explicació completa del diagnòstic i per què proposa aquell medicament concret.",
          "Sol·licita una segona opinió mèdica: és el teu dret i el metge no pot negar-s'hi.",
          "Si no estàs d'acord i el metge insisteix, pots presentar una queixa al Servei d'Atenció al Pacient del centre.",
        ]),
        B("03", "Recursos", [
          "Pots contactar amb el Defensor del Pacient de Catalunya per a situacions de vulneració de drets.",
          "Si ets menor i els pares prenen la decisió sense escoltar-te, un advocat del torn d'ofici pot assessorar-te.",
        ]),
      ],
      "Basada en la Llei 21/2000 (autonomia del pacient) i la Llei 41/2002.",
      "Veure recursos de salut"
    );

    return R(
      ["Salut mental", "Consulta general", "Sistema públic"],
      "El sistema públic de salut mental ", "és gratuït", " i accessible.",
      [
        B("01", "El que diu la llei", [
          "L'atenció a la salut mental és un dret garantit pel sistema sanitari públic de Catalunya.",
          "El CAP és el primer punt d'accés: el metge de capçalera pot derivar-te al CSMA o CSMIJ.",
          "Als 16 anys (Catalunya) tens autonomia per accedir als serveis de salut sense consentiment parental.",
        ]),
        B("02", "Recursos disponibles", [
          "CAP → derivació al CSMA (adults) o CSMIJ (menors de 18): gratuït amb targeta sanitària.",
          "El CJAS ofereix atenció integral per a joves de forma gratuïta o molt assequible.",
          "En crisi emocional: 024 gratuït i disponible les 24 hores.",
        ]),
        B("03", "Temps d'espera", [
          "CAP → CSMA: 4-12 setmanes de mitjana.",
          "Si és urgent: urgències de qualsevol hospital o 024.",
        ]),
      ],
      "Basada en la Llei 16/2003 de Cohesió del SNS i la normativa de la Generalitat de Catalunya.",
      "Veure recursos de salut"
    );
  }

  /* ── EDUCACIÓ ── */
  if (scenario === 'educacio') {
    const problem = answers[0]; // beques | expedient | assetjament | matricula
    const centre  = answers[1]; // institut | fp | universitat

    if (problem === 'beques') return R(
      ["Educació", "Beca denegada", "Recurs en 1 mes"],
      "Pots ", "recórrer la denegació", " de la beca.",
      [
        B("01", "El que diu la llei", [
          "Tota resolució de denegació de beca ha d'estar motivada i has de rebre notificació formal amb els motius.",
          "Tens dret a presentar un recurs d'alçada davant l'òrgan superior de l'administració en el termini indicat a la resolució (normalment 1 mes).",
          centre === 'universitat'
            ? "Les beques del Ministeri (MEC) i de la Generalitat es poden recórrer de forma independent si compleixes els requisits acadèmics i econòmics."
            : "Les beques de batxillerat i FP de la Generalitat tenen un procediment de recurs específic al portal de la Generalitat.",
        ]),
        B("02", "Pas a pas", [
          "Llegeix la resolució de denegació amb atenció: el motiu exacte és clau per preparar el recurs.",
          "Recull tota la documentació que acrediti que compleixes els requisits (nota mitjana, renda familiar, matrícula).",
          "Presenta el recurs per registre electrònic (seu.gencat.cat o sede.educacion.gob.es) o presencialment a l'oficina corresponent.",
        ]),
        B("03", "Terminis", [
          "1 mes per presentar el recurs d'alçada des de la notificació de la resolució.",
          "L'administració té 3 mesos per resoldre el recurs. Si no contesta, es considera desestimat (silenci negatiu).",
        ]),
      ],
      "Basada en la Llei 39/2015 de procediment administratiu i la convocatòria específica de beques aplicable.",
      "Veure recursos educatius"
    );

    if (problem === 'expedient') return R(
      ["Educació", "Expedient disciplinari", "Dret a defensa"],
      "Tens dret a ", "defensar-te", " en qualsevol expedient disciplinari.",
      [
        B("01", "El que diu la llei", [
          "Cap sanció educativa pot imposar-se sense un procediment previ que garanteixi el dret a audiència i a presentar al·legacions.",
          centre === 'universitat'
            ? "La normativa universitària (Estatuts de la UB, UAB, etc.) estableix garanties específiques: has de ser informat dels càrrecs i tens dret a un representant."
            : "En centres d'ESO i Batxillerat, el Reglament de Règim Interior ha de respectar el dret a audiència de l'alumne i, si és menor, dels pares.",
          "Les sancions d'expulsió superiors a 3 dies han de ser resoltes per la direcció del centre amb notificació formal.",
        ]),
        B("02", "Pas a pas", [
          "Sol·licita per escrit còpia de l'expedient i els fets que se t'imputen. Tens dret a conèixer-los.",
          "Presenta al·legacions per escrit dins el termini indicat. Aporta proves o testimonis si en tens.",
          "Si la resolució és desfavorable, pots recórrer davant la Inspecció d'Educació (centres no universitaris) o el Síndic de Greuges.",
        ]),
        B("03", "Terminis", [
          "El termini per presentar al·legacions és el que fixi el centre (normalment 5-10 dies hàbils).",
          "1 mes per recórrer la resolució davant la Inspecció d'Educació o la Comissió de Garanties universitària.",
        ]),
      ],
      "Basada en la LO 2/2006 d'Educació (LOE) i la normativa de règim intern de cada centre.",
      "Veure recursos educatius"
    );

    if (problem === 'assetjament') return R(
      ["Educació", "Assetjament escolar", "Protocol obligatori"],
      "El centre té l'obligació legal d'activar el ", "protocol antibullying", ".",
      [
        B("01", "El que diu la llei", [
          "Tots els centres educatius de Catalunya han de tenir un protocol d'actuació davant l'assetjament escolar (Llei 14/2010).",
          "La direcció del centre té l'obligació de notificar la situació a la Inspecció d'Educació i actuar en un termini màxim.",
          "Si l'assetjament inclou agressions físiques o amenaces greus, pot ser constitutiu de delicte (art. 173 CP) i denunciable davant la policia.",
        ]),
        B("02", "Pas a pas", [
          "Documenta els incidents: dates, llocs, descripcions i testimonis. Conserva captures si l'assetjament és digital.",
          "Comunica la situació per escrit a la tutoria i a la direcció del centre, demanant activació del protocol.",
          "Si el centre no actua en 10 dies, presenta queixa a la Inspecció d'Educació de la teva zona.",
        ]),
        B("03", "Suport disponible", [
          "Telèfon contra l'assetjament escolar: 900 018 018 (gratuït i confidencial).",
          "Si hi ha violència física: denuncia als Mossos d'Esquadra o Policia Nacional.",
        ]),
      ],
      "Basada en la Llei 14/2010 (LDOIA) i el Protocol de prevenció i abordatge de l'assetjament escolar del Departament d'Educació.",
      "Veure recursos educatius"
    );

    return R(
      ["Educació", "Accés als estudis", "Dret a l'educació"],
      "L'accés a l'educació ", "és un dret fonamental", " (art. 27 CE).",
      [
        B("01", "El que diu la llei", [
          "L'educació fins als 16 anys és obligatòria i gratuïta. Cap centre públic pot negar la matrícula sense causa justificada.",
          centre === 'universitat'
            ? "L'accés a la universitat pública no pot ser denegat per motius econòmics: existeixen ajudes de matrícula i beques d'emergència."
            : "Els centres concertats que reben finançament públic no poden cobrar quotes obligatòries ni seleccionar alumnes per criteri econòmic.",
          "Si ets menor tutelat per la DGAIA, tens dret a continuïtat educativa independentment de la situació administrativa.",
        ]),
        B("02", "Pas a pas", [
          "Sol·licita per escrit els motius de la denegació de matrícula o accés. Tens dret a una resposta formal.",
          "Presenta reclamació a la Inspecció d'Educació de la teva zona si el centre no resol favorablement.",
          "Consulta amb el Síndic de Greuges si creus que s'ha vulnerat el teu dret a l'educació.",
        ]),
        B("03", "Terminis", [
          "Els períodes de matrícula i reclamació estan fixats anualment per la Generalitat: comprova les dates al portal.",
          "Reclamació a la Inspecció: pots presentar-la en qualsevol moment durant el curs.",
        ]),
      ],
      "Basada en la CE art. 27 i la LO 2/2006 d'Educació (LOE).",
      "Veure recursos educatius"
    );
  }

  /* ── VIOLÈNCIA I DISCRIMINACIÓ ── */
  if (scenario === 'violencia') {
    const type     = answers[0]; // genere | lgtbi | sexual | amenaces
    const situation = answers[1]; // actual | sortida | ajuda

    if (type === 'genere' && situation === 'actual') return R(
      ["Violència de gènere", "Situació activa", "⚠️ Recursos d'emergència"],
      "Hi ha recursos immediats per ", "sortir d'una situació de violència", ".",
      [
        B("01", "El que diu la llei", [
          "La Llei Orgànica 1/2004 contra la Violència de Gènere garanteix protecció integral: assistència jurídica gratuïta, ajudes econòmiques i accés prioritari a habitatge.",
          "Pots sol·licitar una ordre de protecció al jutjat de guàrdia en 72 hores. La policia ha de tramitar-la immediatament si hi ha risc.",
          "No necessites denunciar per accedir als serveis d'atenció: pots demanar ajuda als Serveis Socials sense haver de passar per comissaria primer.",
        ]),
        B("02", "Actua ara", [
          "Si estàs en perill immediat: truca al 112. La policia té unitats especialitzades en violència de gènere (UFAM als Mossos).",
          "Truca al 900 900 120 (24h, gratuït, confidencial): atenció especialitzada en violència masclista.",
          "Busca el SIAD (Servei d'Informació i Atenció a les Dones) del teu municipi: assessorament jurídic, psicològic i social gratuït.",
        ]),
        B("03", "Recursos d'emergència", [
          "Xarxa d'acolliment per a dones en situació de violència: places d'emergència en cases d'acollida.",
          "Renda activa d'inserció (RAI): ajuda econòmica específica per a víctimes de violència de gènere.",
        ]),
      ],
      "Basada en la LO 1/2004 i la Llei 5/2008 del dret de les dones a eradicar la violència masclista (Catalunya).",
      "Veure recursos"
    );

    if (type === 'genere') return R(
      ["Violència de gènere", situation === 'sortida' ? "Vull denunciar" : "Ajudant un tercer", "Assistència gratuïta"],
      "Tens dret a ", "assistència jurídica gratuïta", " per denunciar.",
      [
        B("01", "El que diu la llei", [
          "Pots denunciar violència de gènere en qualsevol moment, fins i tot anys després dels fets. No hi ha prescripció curta.",
          "Tens dret a advocada d'ofici especialitzada en violència de gènere des del moment de la denúncia, gratuïtament.",
          "Com a testimoni o persona de suport, pots acompanyar la víctima a la denúncia i als serveis d'atenció.",
        ]),
        B("02", "Pas a pas", [
          "La denúncia es pot presentar als Mossos d'Esquadra, Policia Nacional, jutjat de guàrdia o als Serveis Socials.",
          "Guarda tota evidència (missatges, fotos de lesions, testimonis) abans de denunciar: reforça molt el cas.",
          "Contacta amb el SIAD del teu municipi: t'acompanyaran durant tot el procés.",
        ]),
        B("03", "Suport disponible", [
          "900 900 120: línia d'atenció a la violència masclista (24h, gratuïta).",
          "SIAD (Servei d'Informació i Atenció a les Dones): assessorament jurídic i psicològic gratuït.",
        ]),
      ],
      "Basada en la LO 1/2004 i la Llei 5/2008. La denúncia no és obligatòria per accedir als serveis.",
      "Veure recursos"
    );

    if (type === 'lgtbi') return R(
      ["LGTBIfòbia", "Discriminació i violència", "Protecció legal"],
      "La discriminació per orientació sexual ", "és il·legal", " i denunciable.",
      [
        B("01", "El que diu la llei", [
          "La Llei 11/2014 de Catalunya garanteix els drets de les persones LGTBI i tipifica la discriminació com a infracció administrativa greu.",
          "Els actes de violència motivats per LGTBIfòbia poden ser considerats delictes d'odi (art. 510 CP), amb penes agreujades.",
          "Tens dret a assistència jurídica gratuïta i suport psicològic especialitzat.",
        ]),
        B("02", "Pas a pas", [
          "Documenta els fets: dates, lloc, descripció, testimonis. Si hi ha missatges o publicacions, fes captures.",
          "Presenta denúncia als Mossos d'Esquadra (Unitat de Delictes d'Odi i Discriminació - UDOD) o a la policia local.",
          "Contacta amb el Casal Lambda o el Col·lectiu LGTBI+ Barcelona: assessorament jurídic gratuït i acompanyament.",
        ]),
        B("03", "Suport disponible", [
          "Casal Lambda (lambdaweb.org): atenció jurídica, psicològica i social gratuïta.",
          "OBERTIC (obertic.cat): observatori de delictes d'odi LGTBIfobs a Catalunya.",
        ]),
      ],
      "Basada en la Llei 11/2014 de Catalunya i el CP art. 510 (delictes d'odi).",
      "Veure recursos"
    );

    if (type === 'sexual') return R(
      ["Assetjament sexual", "Delicte penal", "Denúncia possible"],
      "L'assetjament sexual és un ", "delicte penal", " (art. 184 CP).",
      [
        B("01", "El que diu la llei", [
          "L'assetjament sexual (sol·licituds de favors sexuals amb intimidació o ambient hostil) és delicte (art. 184 CP), amb penes de fins a 5 anys si hi ha relació de jerarquia.",
          "Si passa en l'àmbit laboral o educatiu, l'empresa o centre té l'obligació de tenir un protocol específic i actuar immediatament.",
          "Pots denunciar-ho simultàniament a la policia i per la via administrativa (Inspecció de Treball, si és laboral; Inspecció Educativa, si és educatiu).",
        ]),
        B("02", "Pas a pas", [
          "Documenta tot: missatges, correus, descripcions dels incidents amb data i lloc.",
          "Si passa en el treball: comunica-ho a recursos humans i/o als representants sindicals. Si no actuen, Inspecció de Treball.",
          "Presenta denúncia als Mossos o Policia Nacional. L'advocada d'ofici és gratuïta en casos de violència sexual.",
        ]),
        B("03", "Suport disponible", [
          "SAH (Servei d'Atenció a les víctimes de violència sexual del ICS): gratuït a tot Catalunya.",
          "SICAR (Servei d'Atenció a víctimes de violència sexual): 93 412 00 12.",
        ]),
      ],
      "Basada en el CP art. 184 i la LO 10/2022 de garantia de llibertat sexual.",
      "Veure recursos"
    );

    return R(
      ["Amenaces i coaccions", "Delicte penal", "Ordre d'allunyament possible"],
      "Les amenaces i coaccions ", "es poden denunciar", " i obtenir protecció.",
      [
        B("01", "El que diu la llei", [
          "Les amenaces (art. 169 CP) i les coaccions (art. 172 CP) són delictes penals, fins i tot si no s'han executat.",
          "Pots sol·licitar una ordre d'allunyament al jutjat de guàrdia si hi ha risc per a la teva seguretat.",
          "L'stalking o assetjament persistent (art. 172 ter CP) també és delicte, fins i tot si les amenaces semblen 'petites'.",
        ]),
        B("02", "Pas a pas", [
          "Guarda tots els missatges, trucades i evidències. No esborris res: és la teva prova principal.",
          "Presenta denúncia als Mossos o Policia Nacional. Demana expressament una ordre de protecció.",
          "Si coneixes l'agressor, aporta totes les dades possibles: nom, telèfon, xarxes socials.",
        ]),
        B("03", "Terminis", [
          "L'ordre de protecció es pot obtenir en 72 hores si hi ha risc imminent.",
          "El jutjat de guàrdia atén sol·licituds d'ordre de protecció les 24 hores.",
        ]),
      ],
      "Basada en el CP arts. 169, 172 i 172 ter. Si les amenaces són per motius discriminatoris, aplica l'art. 510 (delictes d'odi).",
      "Veure recursos"
    );
  }

  /* ── ESTRANGERIA ── */
  if (scenario === 'estrangeria') {
    const situation = answers[0]; // irregular | arrelament | renovacio | asil
    const temps     = answers[1]; // menys2 | 2a3 | mes3

    if (situation === 'irregular' && temps === 'menys2') return R(
      ["Estrangeria", "Menys de 2 anys", "Opcions molt limitades"],
      "Amb menys de 2 anys, les opcions legals ", "són molt limitades", " però existeixen.",
      [
        B("01", "El que diu la llei", [
          "Sense documentació i amb menys de 2 anys a Espanya, l'arrelament social no és possible (requereix 3 anys).",
          "En situació d'urgència (malaltia greu, risc per a la vida), es pot sol·licitar una autorització de residència per raons humanitàries.",
          "Si ets menor d'edat, tens dret a escolarització i atenció sanitària independentment de la situació administrativa.",
        ]),
        B("02", "Opcions disponibles", [
          "Empadronar-te és un dret independent de la situació administrativa: et dona accés a serveis bàsics i comença a comptar el temps de residència.",
          "Consulta amb una entitat especialitzada (ACSAR, CITE-CCOO, SOS Racisme) per valorar si tens dret a protecció internacional.",
          "Si treballes de forma irregular, documentar-ho (contractes verbals, nòmines) pot ser útil per a l'arrelament laboral.",
        ]),
        B("03", "Proper pas", [
          "Empadronar-te ara: el padró és la base per a molts tràmits futurs i comença el còmput de temps.",
          "En 2 anys podràs sol·licitar l'arrelament laboral si pots acreditar relació laboral.",
        ]),
      ],
      "Basada en la LO 4/2000 (Llei d'Estrangeria) i el RD 557/2011. Consulta una entitat especialitzada per al teu cas concret.",
      "Veure recursos d'estrangeria"
    );

    if (situation === 'irregular') return R(
      ["Estrangeria", temps === '2a3' ? "2-3 anys" : "+3 anys", "Arrelament possible"],
      temps === 'mes3' ? "Amb més de 3 anys pots demanar " : "Prepara la documentació per a ",
      "l'arrelament social",
      temps === 'mes3' ? "." : " quan arribi el moment.",
      [
        B("01", "El que diu la llei", [
          temps === 'mes3'
            ? "L'arrelament social requereix 3 anys de permanència a Espanya, empadronament i acreditar vincles socials (treball, família, integració)."
            : "Amb 2-3 anys de permanència, pots sol·licitar l'arrelament laboral si pots acreditar relació laboral d'almenys 6 mesos.",
          "L'arrelament dona dret a una autorització de residència i treball d'1 any, renovable.",
          "Durant la tramitació de l'arrelament, no pots ser expulsat (situació d'arraigo en tràmit).",
        ]),
        B("02", "Documentació necessària", [
          "Certificat d'empadronament que acrediti el temps de residència.",
          temps === 'mes3'
            ? "Informe d'integració social emès pels Serveis Socials municipals (necessites sol·licitar-lo amb antelació)."
            : "Contracte de treball o nòmines que acreditin relació laboral d'almenys 6 mesos.",
          "Antecedents penals dels països de residència dels últims 5 anys (apostillats i traduïts).",
        ]),
        B("03", "Terminis", [
          "La resolució de l'arrelament pot tardar entre 3 i 9 mesos des de la presentació.",
          "Durant la tramitació, guarda sempre el justificant de presentació de la sol·licitud.",
        ]),
      ],
      "Basada en la LO 4/2000 i el RD 557/2011. Consulta ACSAR o CITE-CCOO per acompanyament en el tràmit.",
      "Veure recursos d'estrangeria"
    );

    if (situation === 'arrelament') return R(
      ["Estrangeria", "Arrelament social", "Procés pas a pas"],
      "L'arrelament social et dona dret a ", "residir i treballar legalment", ".",
      [
        B("01", "Requisits legals", [
          "3 anys de permanència a Espanya acreditada (padró municipal o altres documents).",
          "No tenir antecedents penals a Espanya ni als països de residència dels últims 5 anys.",
          "Informe d'integració social emès pels Serveis Socials del teu ajuntament (demana'l amb 2-3 mesos d'antelació).",
        ]),
        B("02", "Pas a pas", [
          "Sol·licita l'informe d'integració social als Serveis Socials del teu ajuntament: és gratuït però tarda.",
          "Reuneix tota la documentació: certificat de padró, passaport, antecedents penals dels països de residència (apostillats).",
          "Presenta la sol·licitud a la Oficina d'Estrangeria de la teva província (amb cita prèvia).",
        ]),
        B("03", "Terminis", [
          "L'informe d'integració social tarda 1-3 mesos: sol·licita'l amb antelació.",
          "La resolució de la sol·licitud: entre 3 i 9 mesos. T'autoritzen a treballar mentre esperes.",
        ]),
      ],
      "Basada en la LO 4/2000 i el RD 557/2011, art. 124. ACSAR i CITE-CCOO ofereixen acompanyament gratuït.",
      "Veure recursos d'estrangeria"
    );

    if (situation === 'renovacio') return R(
      ["Estrangeria", "Renovació del permís", "Inicia el tràmit 60 dies abans"],
      "Has d'iniciar la renovació ", "60 dies abans del venciment", ".",
      [
        B("01", "El que diu la llei", [
          "La sol·licitud de renovació presentada abans del venciment prorroga automàticament l'autorització fins a la resolució.",
          "Si el permís ja ha vençut, tens fins a 90 dies per renovar sense ser considerat en situació irregular.",
          "La no-renovació per causes no imputables a tu (llista d'espera, problemes de cita) pot ser al·legada en el procediment.",
        ]),
        B("02", "Documentació necessària", [
          "Passaport vigent, formulari EX-17 o EX-03 (segons el tipus de permís), taxes abonades i contracte de treball o justificació econòmica.",
          "Si has canviat d'empresa o situació laboral, aporta la nova documentació laboral.",
          "Cita prèvia obligatòria a la Oficina d'Estrangeria: reserva amb 2-3 mesos d'antelació (seuelectronica.mjusticia.gob.es).",
        ]),
        B("03", "Terminis", [
          "Sol·licita la cita 60-90 dies abans del venciment.",
          "Resolució: 3-6 mesos. Durant la tramitació, el permís es considera prorrogat.",
        ]),
      ],
      "Basada en la LO 4/2000 i el RD 557/2011. Si tens dificultats per obtenir cita, CITE-CCOO pot assessorar-te.",
      "Veure recursos d'estrangeria"
    );

    return R(
      ["Estrangeria", "Asil i protecció internacional", "Sol·licita en 1 mes"],
      "Pots sol·licitar ", "protecció internacional", " en qualsevol punt d'entrada.",
      [
        B("01", "El que diu la llei", [
          "La Llei 12/2009 regula el dret d'asil i la protecció subsidiària a Espanya. Pots sol·licitar-la en qualsevol moment.",
          "Durant la tramitació (que pot durar anys), no pots ser expulsat i tens dret a accedir al sistema sanitari i educatiu.",
          "Si has entrat de forma irregular, pots igualment sol·licitar asil: no et penalitzen per l'entrada.",
        ]),
        B("02", "Com sol·licitar-ho", [
          "Presenta la sol·licitud a la Oficina d'Asil i Refugi (OAR) a Madrid, o a la comissaria de policia designada de la teva província.",
          "Contacta ASAP (Associació per a l'Asil i la Protecció) o ACNUR per acompanyament gratuït durant el procés.",
          "La sol·licitud s'ha de presentar en el termini d'1 mes des de l'entrada al país o des que van ocórrer els fets que la motiven.",
        ]),
        B("03", "Terminis", [
          "1 mes per sol·licitar des de l'entrada o dels fets. Fora d'aquest termini cal justificació.",
          "La resolució pot tardar entre 1 i 5 anys. Durant tot el procés tens dret a residir i treballar (a partir dels 6 mesos).",
        ]),
      ],
      "Basada en la Llei 12/2009 del dret d'asil i protecció subsidiària. ACNUR i CEAR ofereixen assessorament gratuït.",
      "Veure recursos d'estrangeria"
    );
  }

  return d('ca').simResults?.[scenario] ?? d('ca').simResults?.habitatge;
}

function SimResult({ lang, scenario, answers, onReset, setRoute }) {
  const L = getResult(scenario, answers);
  const flow = QUESTION_FLOWS[scenario] || QUESTION_FLOWS.habitatge;

  const [scrollPct, setScrollPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(max > 0 ? Math.min(100, Math.round((window.scrollY / max) * 100)) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const trail = answers.map((answerId, i) => {
    const step = flow[i];
    const option = step?.options.find((o) => o.id === answerId);
    return { num: String(i + 1).padStart(2, "0"), body: option?.label || answerId };
  });

  return (
    <section className="sim-shell">
      <div className="scroll-progress" style={{ "--scroll-pct": scrollPct + "%" }} aria-hidden="true" />
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
          <p style={{ fontFamily: "var(--f-mono)", fontSize: "var(--t-eyebrow)", letterSpacing: ".12em", color: "var(--c-ink-soft)", marginTop: "var(--s-3)", display: "flex", gap: "var(--s-3)", flexWrap: "wrap", textTransform: "uppercase" }}>
            <span>Elaborat per voluntaris amb formació jurídica</span>
            <span aria-hidden="true">·</span>
            <span>Darrera revisió: juny 2026</span>
          </p>
          <div className="result-actions">
            <button className="btn btn-primary" onClick={() => setRoute("res")}>
              <span>{L.actions.primary}</span><span className="btn-arrow" aria-hidden="true">→</span>
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
            <span>Sol·licitar acompanyament</span><span className="btn-arrow" aria-hidden="true">→</span>
          </button>
        </aside>
      </div>
    </section>
  );
}

export default function Simulador({ lang, setRoute }) {
  const startScenario = (() => { try { const s = localStorage.getItem("pdj_sim_start"); localStorage.removeItem("pdj_sim_start"); return s; } catch { return null; } })();
  const [phase, setPhase] = useState(startScenario ? "flow" : "intro");
  const [scenario, setScenario] = useState(startScenario);
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
