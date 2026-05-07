import React, { useState, useRef, useEffect } from "react";
import s from "./Xat.module.css";
import { t } from "../i18n/strings";

const BACKEND = "https://plataforma-drets-juvenils.onrender.com";

async function askAssistant(history, lang) {
  const lastUserMsg = [...history].reverse().find(m => m.from === "user");
  if (!lastUserMsg) return { content: "", citations: [] };

  try {
    const res = await fetch(`${BACKEND}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: lastUserMsg.text, language: lang }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Error del servidor");
    return parseResponse(data.response);
  } catch (e) {
    const fallback = lang === "es"
      ? "He tenido un problema conectando con el servicio. Inténtalo de nuevo en un momento."
      : lang === "en"
      ? "There was a problem connecting to the service. Please try again in a moment."
      : "He tingut un problema connectant amb el servei. Torna-ho a intentar d'aquí a un moment.";
    return { content: fallback, citations: [] };
  }
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

/* Render inline markdown: **bold**, *italic*, `code` */
function renderInline(text) {
  const parts = [];
  const re = /(\*\*(.+?)\*\*|\*(.+?)\*|_(.+?)_|`(.+?)`)/g;
  let last = 0, m, key = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[2]) parts.push(<strong key={key++}>{m[2]}</strong>);
    else if (m[3]) parts.push(<em key={key++}>{m[3]}</em>);
    else if (m[4]) parts.push(<em key={key++}>{m[4]}</em>);
    else if (m[5]) parts.push(<code key={key++}>{m[5]}</code>);
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

function MessageBody({ text }) {
  if (!text) return null;

  const blocks = [];
  let key = 0;
  let ulItems = [];
  let olItems = [];

  const flushUl = () => {
    if (!ulItems.length) return;
    blocks.push(<ul key={key++}>{ulItems}</ul>);
    ulItems = [];
  };
  const flushOl = () => {
    if (!olItems.length) return;
    blocks.push(<ol key={key++}>{olItems}</ol>);
    olItems = [];
  };

  for (const raw of text.split("\n")) {
    const line = raw.trimEnd();

    /* Headings — match longest prefix first */
    const h3 = line.match(/^###\s+(.+)/);
    const h2 = line.match(/^##\s+(.+)/);
    const h1 = line.match(/^#\s+(.+)/);
    if (h3) { flushUl(); flushOl(); blocks.push(<h4 key={key++}>{renderInline(h3[1])}</h4>); continue; }
    if (h2) { flushUl(); flushOl(); blocks.push(<h4 key={key++}>{renderInline(h2[1])}</h4>); continue; }
    if (h1) { flushUl(); flushOl(); blocks.push(<h3 key={key++}>{renderInline(h1[1])}</h3>); continue; }

    /* Unordered list */
    const ul = line.match(/^[-*•·]\s+(.+)/);
    if (ul) { flushOl(); ulItems.push(<li key={key++}>{renderInline(ul[1])}</li>); continue; }

    /* Ordered list */
    const ol = line.match(/^\d+[.)]\s+(.+)/);
    if (ol) { flushUl(); olItems.push(<li key={key++}>{renderInline(ol[1])}</li>); continue; }

    /* Empty line → flush lists, start new paragraph */
    if (!line.trim()) { flushUl(); flushOl(); continue; }

    /* Normal line — accumulate into a paragraph */
    flushUl(); flushOl();
    const prev = blocks[blocks.length - 1];
    if (prev?.type === "p") {
      blocks[blocks.length - 1] = (
        <p key={prev.key}>{prev.props.children}{" "}{renderInline(line)}</p>
      );
    } else {
      blocks.push(<p key={key++}>{renderInline(line)}</p>);
    }
  }
  flushUl();
  flushOl();

  return <>{blocks}</>;
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
