import { useState, useEffect, useRef, useCallback } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'https://plataforma-drets-juvenils.onrender.com';
import styles from './Xat.module.css';

const MAX_CHARS = 500;

const WELCOME = {
  id: 'welcome',
  role: 'assistant',
  text: '👋 Hola! Soc el teu assistent de drets legals per a joves a Espanya.\n\nPot preguntar-me sobre les teves interaccions amb la policia, drets laborals, privacitat a internet o qualsevol altre tema legal que t\'interessi.\n\nRecorda que les meves respostes són orientatives i no substitueixen un advocat/ada professional.',
};

const SUGGESTIONS = [
  'Quins drets tinc amb la policia?',
  'Puc treballar amb 16 anys?',
  'Què és el ciberassetjament?',
];

function Message({ msg }) {
  const isUser = msg.role === 'user';
  return (
    <div className={`${styles.msgRow} ${isUser ? styles.msgRowUser : styles.msgRowAssistant}`}>
      {!isUser && <div className={styles.avatar}>⚖️</div>}
      <div className={`${styles.bubble} ${isUser ? styles.bubbleUser : styles.bubbleAssistant}`}>
        {msg.text.split('\n').map((line, i) => (
          <span key={i}>{line}{i < msg.text.split('\n').length - 1 && <br />}</span>
        ))}
        {msg.error && <span className={styles.errorTag}> ⚠️</span>}
      </div>
      {isUser && <div className={styles.avatarUser}>Tu</div>}
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className={`${styles.msgRow} ${styles.msgRowAssistant}`}>
      <div className={styles.avatar}>⚖️</div>
      <div className={`${styles.bubble} ${styles.bubbleAssistant} ${styles.typing}`}>
        <span /><span /><span />
      </div>
    </div>
  );
}

export default function Xat() {
  const [messages, setMessages]   = useState([WELCOME]);
  const [input, setInput]         = useState('');
  const [loading, setLoading]     = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const bottomRef  = useRef(null);
  const inputRef   = useRef(null);
  const charsLeft  = MAX_CHARS - input.length;
  const canSend    = input.trim().length > 0 && input.length <= MAX_CHARS && !loading;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = useCallback(async (text) => {
    const trimmed = text.trim();
    if (!trimmed || trimmed.length > MAX_CHARS || loading) return;

    setShowSuggestions(false);
    setMessages((prev) => [...prev, { id: Date.now(), role: 'user', text: trimmed }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ message: trimmed }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `Error ${res.status}`);
      }

      setMessages((prev) => [...prev, { id: Date.now() + 1, role: 'assistant', text: data.response }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'assistant',
          text: `No he pogut obtenir una resposta. ${err.message}. Torna-ho a intentar.`,
          error: true,
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }, [loading]);

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  return (
    <div className={styles.shell}>

      {/* ── Header ── */}
      <header className={styles.chatHeader}>
        <div className={styles.headerAvatar}>⚖️</div>
        <div className={styles.headerInfo}>
          <span className={styles.headerName}>Assistent de Drets Juvenils</span>
          <span className={styles.headerStatus}>
            <span className={styles.dot} />
            Sempre disponible · Respostes orientatives
          </span>
        </div>
      </header>

      {/* ── Messages ── */}
      <div className={styles.feed} role="log" aria-live="polite" aria-label="Conversa">

        {messages.map((msg) => (
          <Message key={msg.id} msg={msg} />
        ))}

        {/* Suggeriments inicials */}
        {showSuggestions && !loading && (
          <div className={styles.suggestions}>
            <p className={styles.suggestionsLabel}>Preguntes freqüents:</p>
            <div className={styles.suggestionsList}>
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  className={styles.suggestionBtn}
                  onClick={() => sendMessage(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* ── Input area ── */}
      <div className={styles.inputArea}>
        <div className={styles.inputWrapper}>
          <textarea
            ref={inputRef}
            className={styles.textarea}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escriu la teva pregunta… (Enter per enviar)"
            rows={1}
            maxLength={MAX_CHARS + 1}
            disabled={loading}
            aria-label="Missatge"
          />
          <div className={styles.inputMeta}>
            <span className={`${styles.counter} ${charsLeft < 50 ? styles.counterWarn : ''} ${charsLeft < 0 ? styles.counterOver : ''}`}>
              {charsLeft}
            </span>
            <button
              className={`${styles.sendBtn} ${canSend ? styles.sendBtnActive : ''}`}
              onClick={() => sendMessage(input)}
              disabled={!canSend}
              aria-label="Enviar missatge"
            >
              ↑
            </button>
          </div>
        </div>
        <p className={styles.hint}>Shift+Enter per saltar de línia · Enter per enviar</p>
      </div>

    </div>
  );
}
