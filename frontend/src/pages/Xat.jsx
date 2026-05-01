import { useState, useEffect, useRef, useCallback } from 'react';
import { useLang } from '../i18n';
import styles from './Xat.module.css';

const API_URL = 'https://plataforma-drets-juvenils.onrender.com';

const MAX_CHARS = 500;

function Message({ msg }) {
  const isUser = msg.role === 'user';
  return (
    <div className={`${styles.msgRow} ${isUser ? styles.msgRowUser : styles.msgRowAssistant}`}>
      {!isUser && <div className={styles.avatar}>A</div>}
      <div className={`${styles.bubble} ${isUser ? styles.bubbleUser : styles.bubbleAssistant}`}>
        {msg.text.split('\n').map((line, i) => (
          <span key={i}>{line}{i < msg.text.split('\n').length - 1 && <br />}</span>
        ))}
        {msg.error && <span className={styles.errorTag}> Error</span>}
      </div>
      {isUser && <div className={styles.avatarUser}>Tu</div>}
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className={`${styles.msgRow} ${styles.msgRowAssistant}`}>
      <div className={styles.avatar}>A</div>
      <div className={`${styles.bubble} ${styles.bubbleAssistant} ${styles.typing}`}>
        <span /><span /><span />
      </div>
    </div>
  );
}

export default function Xat() {
  const { lang, t } = useLang();

  const [messages, setMessages]     = useState(() => [
    { id: 'welcome', role: 'assistant', text: lang === 'es' ? t.chat.welcomeES : t.chat.welcomeCA },
  ]);
  const [input, setInput]           = useState('');
  const [loading, setLoading]       = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [showDisclaimer, setShowDisclaimer]   = useState(
    !sessionStorage.getItem('dj_disclaimer_shown')
  );
  const bottomRef  = useRef(null);
  const inputRef   = useRef(null);
  const charsLeft  = MAX_CHARS - input.length;
  const canSend    = input.trim().length > 0 && input.length <= MAX_CHARS && !loading;

  // Reset to welcome message when lang changes
  useEffect(() => {
    setMessages([{
      id: 'welcome',
      role: 'assistant',
      text: lang === 'es' ? t.chat.welcomeES : t.chat.welcomeCA,
    }]);
    setShowSuggestions(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useEffect(() => {
    sessionStorage.setItem('dj_disclaimer_shown', '1');
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = useCallback(async (text) => {
    const trimmed = text.trim();
    if (!trimmed || trimmed.length > MAX_CHARS || loading) return;

    setShowSuggestions(false);
    setShowDisclaimer(false);
    setMessages((prev) => [...prev, { id: Date.now(), role: 'user', text: trimmed }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ message: trimmed, language: lang }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `Error ${res.status}`);
      }

      setMessages((prev) => [...prev, { id: Date.now() + 1, role: 'assistant', text: data.response }]);
    } catch (err) {
      const errText = lang === 'es'
        ? `No pude obtener una respuesta. ${err.message}. Vuelve a intentarlo.`
        : `No he pogut obtenir una resposta. ${err.message}. Torna-ho a intentar.`;
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'assistant',
          text: errText,
          error: true,
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }, [loading, lang]);

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  const suggestions = [t.chat.suggestion1, t.chat.suggestion2, t.chat.suggestion3];

  return (
    <div className={styles.shell}>

      {/* ── Disclaimer banner ── */}
      {showDisclaimer && (
        <div className={styles.disclaimerBanner} role="note">
          <span>{t.chat.disclaimerText}</span>
          <button
            className={styles.disclaimerClose}
            onClick={() => setShowDisclaimer(false)}
            aria-label="Tancar avís"
          >
            ×
          </button>
        </div>
      )}

      {/* ── Header ── */}
      <header className={styles.chatHeader}>
        <div className={styles.headerAvatar}>IA</div>
        <div className={styles.headerInfo}>
          <span className={styles.headerName}>{t.chat.headerName}</span>
          <span className={styles.headerStatus}>
            <span className={styles.dot} />
            {t.chat.headerStatus}
          </span>
        </div>
      </header>

      {/* ── Messages ── */}
      <div className={styles.feed} role="log" aria-live="polite" aria-label="Conversa">

        {messages.map((msg) => (
          <Message key={msg.id} msg={msg} />
        ))}

        {showSuggestions && !loading && (
          <div className={styles.suggestions}>
            <p className={styles.suggestionsLabel}>{t.chat.suggestionsLabel}</p>
            <div className={styles.suggestionsList}>
              {suggestions.map((s) => (
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
            placeholder={t.chat.placeholder}
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
        <p className={styles.hint}>{t.chat.hint}</p>
      </div>

    </div>
  );
}
