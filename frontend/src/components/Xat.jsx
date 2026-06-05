import React, { useState, useRef, useEffect } from "react";
import { d } from "../i18n/data";

function renderInline(text) {
  const parts = [];
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`)/g;
  let lastIndex = 0;
  let k = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    if (match[2]) parts.push(<strong key={k++}>{match[2]}</strong>);
    else if (match[3]) parts.push(<em key={k++}>{match[3]}</em>);
    else if (match[4]) parts.push(<code key={k++}>{match[4]}</code>);
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

function MessageBody({ text }) {
  if (!text) return null;
  const lines = text.split("\n");
  const blocks = [];
  let listItems = null;
  let listType = null;
  let k = 0;

  const flushList = () => {
    if (!listItems) return;
    blocks.push(listType === "ul"
      ? <ul key={k++}>{listItems}</ul>
      : <ol key={k++}>{listItems}</ol>);
    listItems = null;
    listType = null;
  };

  for (const line of lines) {
    const h3 = line.match(/^###\s+(.+)/);
    const h2 = line.match(/^##\s+(.+)/);
    const h1 = line.match(/^#\s+(.+)/);
    const ul = line.match(/^[-*]\s+(.+)/);
    const ol = line.match(/^\d+\.\s+(.+)/);

    if (h3)       { flushList(); blocks.push(<h4 key={k++}>{renderInline(h3[1])}</h4>); }
    else if (h2)  { flushList(); blocks.push(<h4 key={k++}>{renderInline(h2[1])}</h4>); }
    else if (h1)  { flushList(); blocks.push(<h3 key={k++}>{renderInline(h1[1])}</h3>); }
    else if (ul)  {
      if (listType !== "ul") { flushList(); listItems = []; listType = "ul"; }
      listItems.push(<li key={k++}>{renderInline(ul[1])}</li>);
    } else if (ol) {
      if (listType !== "ol") { flushList(); listItems = []; listType = "ol"; }
      listItems.push(<li key={k++}>{renderInline(ol[1])}</li>);
    } else if (line.trim() === "") {
      flushList();
    } else {
      flushList();
      blocks.push(<p key={k++}>{renderInline(line)}</p>);
    }
  }
  flushList();
  return <>{blocks}</>;
}

const BACKEND = "https://plataforma-drets-juvenils.onrender.com";

async function askBackend(history, lang) {
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
  } catch {
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
    citations = last.replace(/^[•\-—\s]+/, "").split(/[,;·]+/).map(c => c.trim()).filter(Boolean).slice(0, 4);
    body = lines.slice(0, -1).join("\n").trim();
  }
  return { content: body, citations };
}

export default function Xat({ lang, setRoute }) {
  const L = d(lang).chat;
  const [messages, setMessages] = useState([
    { from: "bot", text: L.greeting, suggestions: L.suggest },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, typing]);

  const send = async (text) => {
    if (!text.trim() || typing) return;
    const newHistory = [...messages, { from: "user", text }];
    setMessages(newHistory);
    setInput("");
    setTyping(true);
    const { content, citations } = await askBackend(newHistory, lang);
    setMessages(m => [...m, { from: "bot", text: content, citations }]);
    setTyping(false);
  };

  return (
    <main className="chat-page" id="main">
      <header className="chat-head">
        <div className="chat-head-inner">
          <h1 className="chat-title">{L.title_a}<em>{L.title_em}</em>{L.title_b}</h1>
          <p className="chat-lede">{L.lede}</p>
        </div>
      </header>

      <div className="chat-body" ref={bodyRef}>
        <div className="chat-body-inner" aria-live="polite" aria-label={L.title_a + L.title_em + L.title_b} role="log">
          {messages.map((m, i) => (
            <div className="row" data-from={m.from} key={i}>
              {m.from === "bot" && <span className="avatar avatar-bot" aria-hidden="true"/>}
              <div className={"bubble " + (m.from === "bot" ? "bubble-bot" : "bubble-user")}>
                <div className="bubble-meta" aria-hidden="true">
                  <span>{m.from === "bot" ? L.bot_label : L.user_label}</span>
                  <span>·</span>
                  <span>{L.now}</span>
                </div>
                {m.text && <MessageBody text={m.text} />}
                {m.citations && m.citations.length > 0 && (
                  <div className="cite">
                    <span>{L.sources}</span>
                    {m.citations.map((c, j) => <span className="cite-chip" key={j}>{c}</span>)}
                  </div>
                )}
                {m.suggestions && (
                  <div className="suggest">
                    {m.suggestions.map((s, j) => (
                      <button key={j} className="suggest-btn" onClick={() => send(s)}>
                        <span className="suggest-text">{s}</span>
                        <span className="suggest-arrow" aria-hidden="true">→</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {m.from === "user" && <span className="avatar avatar-user" aria-hidden="true">TU</span>}
            </div>
          ))}
          {typing && (
            <div className="row" data-from="bot">
              <span className="avatar avatar-bot" aria-hidden="true"/>
              <div className="bubble bubble-bot">
                <div className="bubble-meta" aria-hidden="true"><span>{L.bot_label}</span><span>·</span><span>{L.thinking}…</span></div>
                <div className="typing" aria-label={L.thinking + "…"}><span/><span/><span/></div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="composer">
        <div className="composer-inner">
          <div className="field">
            <textarea
              className="input"
              placeholder={L.placeholder}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
              rows={1}
              aria-label={L.placeholder}
            />
            <button className="send" onClick={() => send(input)} disabled={!input.trim() || typing}>
              <span>{L.send}</span><span className="send-arrow" aria-hidden="true">↵</span>
            </button>
          </div>
          <p className="chat-disc">{L.disc}</p>
        </div>
      </div>
    </main>
  );
}
