import React, { useState, useRef, useEffect } from "react";
import s from "./Xat.module.css";
import { t } from "../i18n/strings";

const SYSTEM_PROMPT = {
  ca: `Ets l'assistent legal de la Plataforma de Drets Juvenils, una iniciativa pública per a joves de 14 a 18 anys a Catalunya. Respons sempre en català, en to càlid i institucional, sense paternalismes. Bases legals: Constitució Espanyola, legislació catalana vigent, LO 4/2015, Estatut dels Treballadors, Decret 102/2010, Llei orgànica 8/2021. Estructura cada resposta així:
1) Una frase clara amb el dret principal aplicable.
2) Un paràgraf curt explicant el context i els límits.
3) Una llista breu de passos pràctics ("Què pots fer ara").
Cita els articles aplicables al final, separats per comes, amb el format "art. X de [norma]".
Mai inventis una norma. Si no estàs segur, digues-ho i recomana l'Oficina Jove o el 116 111. Resposta en menys de 220 paraules.`,
  es: `Eres el asistente legal de la Plataforma de Derechos Juveniles para jóvenes de 14 a 18 años en Cataluña. Respondes siempre en castellano. Tono cálido e institucional. Estructura: 1) frase con el derecho principal, 2) párrafo de contexto, 3) pasos prácticos. Cita artículos al final. Si no sabes, dilo y deriva a Oficina Joven o 116 111. Máx 220 palabras.`,
  en: `You are the legal assistant for the Catalan Youth Rights Platform (ages 14–18). Reply in English. Warm, institutional tone. Structure: 1) sentence with the main applicable right, 2) short context paragraph, 3) bulleted practical steps. Cite articles at the end. If unsure, say so and refer to the Youth Office or 116 111. Max 220 words.`,
};

async function askAssistant(history, lang) {
  const sys = SYSTEM_PROMPT[lang] || SYSTEM_PROMPT.ca;
  if (typeof window !== "undefined" && window.claude?.complete) {
    try {
      const messages = [
        { role: "user", content:
          `${sys}\n\n--- HISTÒRIA DE LA CONVERSA ---\n` +
          history.map(m => `${m.from === "user" ? "USUARI" : "ASSISTENT"}: ${m.text}`).join("\n\n") +
          `\n\n--- FI HISTÒRIA. Ara respon a l'última pregunta de l'usuari. ---`
        },
      ];
      const text = await window.claude.complete({ messages });
      return parseResponse(text);
    } catch (e) {
      return { content: "He tingut un problema connectant amb el servei. Torna-ho a intentar d'aquí a un moment.", citations: [] };
    }
  }
  return {
    content: "Per poder respondre, aquesta plataforma necessita una connexió amb el model d'IA. Configura el teu backend a la funció askAssistant().",
    citations: [],
  };
}

function parseResponse(text) {
  if (!text) return { content: "", citations: [] };
  const trimmed = String(text).trim();
  const lines = trimmed.split(/\n+/);
  let citations = [];
  let body = trimmed;

  const last = lines[lines.length - 1] || "";
  if (/art\.|llei|ley|article|decret|decreto/i.test(last) && last.length < 200) {
    citations = last
      .replace(/^[•\-—\s]+/, "")
      .split(/[,;·]+/)
      .map(c => c.trim())
      .filter(Boolean)
      .slice(0, 4);
    body = lines.slice(0, -1).join("\n").trim();
  }
  return { content: body, citations };
}

function MessageBody({ text }) {
  if (!text) return null;
  const parts = text.split(/\n\n+/);
  return (
    <>
      {parts.map((part, i) => {
        const lines = part.split("\n").map(l => l.trim()).filter(Boolean);
        const isList = lines.every(l => /^[-•·]\s|^\d+[\.)]\s/.test(l)) && lines.length > 1;
        if (isList) {
          return (
            <ul key={i} style={{ margin: i === 0 ? 0 : "var(--s-3) 0 0", paddingLeft: "1.1em" }}>
              {lines.map((l, j) => <li key={j} style={{ marginBottom: 4 }}>{l.replace(/^[-•·]\s|^\d+[\.)]\s/, "")}</li>)}
            </ul>
          );
        }
        return <p key={i}>{part}</p>;
      })}
    </>
  );
}

export default function Xat({ lang }) {
  const [messages, setMessages] = useState(() => [
    { id: 0, from: "bot", text: t("chat.welcome", lang) }
  ]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setMessages([{ id: 0, from: "bot", text: t("chat.welcome", lang) }]);
  }, [lang]);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, busy]);

  const send = async (rawText) => {
    const text = (rawText ?? draft).trim();
    if (!text || busy) return;
    const userMsg = { id: Date.now(), from: "user", text };
    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setDraft("");
    setBusy(true);

    const { content, citations } = await askAssistant(newHistory, lang);
    setBusy(false);
    setMessages((m) => [...m, { id: Date.now() + 1, from: "bot", text: content, citations }]);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const showSuggestions = messages.length === 1 && !busy;
  const suggestions = t("chat.suggestions", lang);

  return (
    <div className={s.page}>
      <header className={s.head}>
        <div className={s.headInner}>
          <span className="eyebrow">{t("chat.eyebrow", lang)}</span>
          <h1 className={s.title}>
            {t("chat.title", lang).split(" ").slice(0,-1).join(" ")}{" "}
            <em>{t("chat.title", lang).split(" ").slice(-1)}</em>
          </h1>
          <p className={s.lede}>{t("chat.lede", lang)}</p>
        </div>
      </header>

      <div className={s.body} ref={bodyRef}>
        <div className={s.bodyInner}>
          {messages.map((m) => (
            <div key={m.id} className={s.row} data-from={m.from}>
              {m.from === "bot" && <span className={`${s.avatar} ${s.avatarBot}`} aria-hidden="true" />}
              <div className={`${s.bubble} ${m.from === "bot" ? s.bubbleBot : s.bubbleUser}`}>
                <div className={s.bubbleMeta}>
                  {m.from === "bot" ? "Assistent · DJ" : "Tu"}
                  <span>·</span>
                  <span>ara</span>
                </div>
                <MessageBody text={m.text} />
                {m.citations?.length > 0 && (
                  <div className={s.cite}>
                    <span>Base legal:</span>
                    {m.citations.map((c, i) => <span key={i} className={s.citeChip}>{c}</span>)}
                  </div>
                )}
              </div>
              {m.from === "user" && <span className={`${s.avatar} ${s.avatarUser}`}>TU</span>}
            </div>
          ))}

          {busy && (
            <div className={s.row} data-from="bot">
              <span className={`${s.avatar} ${s.avatarBot}`} aria-hidden="true" />
              <div className={`${s.bubble} ${s.bubbleBot}`}>
                <div className={s.bubbleMeta}>{t("chat.thinking", lang)}…</div>
                <span className={s.typing}><span /><span /><span /></span>
              </div>
            </div>
          )}

          {showSuggestions && (
            <div className={s.suggest}>
              {suggestions.map((q, i) => (
                <button key={i} className={s.suggestBtn} onClick={() => send(q)}>
                  <span className={s.suggestText}>{q}</span>
                  <span className={s.suggestArrow}>→</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={s.composer}>
        <div className={s.composerInner}>
          <div className={s.field}>
            <textarea
              ref={inputRef}
              className={s.input}
              placeholder={t("chat.placeholder", lang)}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={onKeyDown}
              rows={1}
              disabled={busy}
            />
            <button className={s.send} onClick={() => send()} disabled={busy || !draft.trim()}>
              {t("chat.send", lang)} <span className={s.sendArrow}>↵</span>
            </button>
          </div>
          <p className={s.disclaimer}>{t("chat.disclaimer", lang)}</p>
        </div>
      </div>
    </div>
  );
}
