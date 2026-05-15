import { useState, useEffect, useRef, useCallback } from 'react';
import { useLang } from '../i18n';
import styles from './Xat.module.css';

const API_URL = 'https://plataforma-drets-juvenils.onrender.com';
const MAX_CHARS = 500;

function WelcomeIllustration() {
  return (
    <div className={styles.welcomeIllu} aria-hidden="true">
      <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.welcomeSvg}>
        {/* Outer glow rings */}
        <circle cx="160" cy="105" r="88" stroke="rgba(29,78,216,0.05)" strokeWidth="1.5"/>
        <circle cx="160" cy="105" r="60" stroke="rgba(29,78,216,0.04)" strokeWidth="1"/>

        {/* Central AI avatar */}
        <rect x="136" y="79" width="48" height="48" rx="14" fill="var(--accent)" opacity="0.92"/>
        <text x="160" y="109" textAnchor="middle" fill="white" fontSize="14" fontWeight="700" fontFamily="system-ui" letterSpacing="0.04em">IA</text>
        {/* Glow behind avatar */}
        <rect x="130" y="73" width="60" height="60" rx="18" fill="rgba(29,78,216,0.12)" style={{filter:'blur(10px)'}}/>

        {/* Status dot */}
        <circle cx="178" cy="81" r="6" fill="white"/>
        <circle cx="178" cy="81" r="4" fill="#16a34a"/>

        {/* Floating chat bubble — top left (assistant) */}
        <g>
          <rect x="18" y="28" width="110" height="38" rx="10" fill="white" stroke="rgba(29,78,216,0.15)" strokeWidth="1.25"/>
          <rect x="18" y="64" width="14" height="14" rx="2" fill="white" stroke="rgba(29,78,216,0.15)" strokeWidth="1.25" transform="rotate(45 25 71)"/>
          <rect x="30" y="41" width="70" height="5" rx="2.5" fill="rgba(29,78,216,0.15)"/>
          <rect x="30" y="51" width="50" height="4" rx="2" fill="rgba(29,78,216,0.08)"/>
        </g>

        {/* Floating chat bubble — top right (user) */}
        <g>
          <rect x="192" y="20" width="108" height="38" rx="10" fill="rgba(29,78,216,0.08)" stroke="rgba(29,78,216,0.2)" strokeWidth="1.25"/>
          <rect x="292" y="56" width="14" height="14" rx="2" fill="rgba(29,78,216,0.08)" stroke="rgba(29,78,216,0.2)" strokeWidth="1.25" transform="rotate(45 299 63)"/>
          <rect x="204" y="33" width="55" height="5" rx="2.5" fill="rgba(29,78,216,0.2)"/>
          <rect x="204" y="43" width="78" height="4" rx="2" fill="rgba(29,78,216,0.12)"/>
        </g>

        {/* Floating chat bubble — bottom left (assistant) */}
        <g>
          <rect x="14" y="148" width="118" height="44" rx="10" fill="white" stroke="rgba(29,78,216,0.15)" strokeWidth="1.25"/>
          <rect x="14" y="148" width="14" height="14" rx="2" fill="white" stroke="rgba(29,78,216,0.15)" strokeWidth="1.25" transform="rotate(-45 21 141)"/>
          <rect x="26" y="160" width="75" height="5" rx="2.5" fill="rgba(29,78,216,0.15)"/>
          <rect x="26" y="170" width="55" height="4" rx="2" fill="rgba(29,78,216,0.08)"/>
          <rect x="26" y="179" width="65" height="4" rx="2" fill="rgba(29,78,216,0.08)"/>
        </g>

        {/* Floating chat bubble — bottom right (user) */}
        <g>
          <rect x="190" y="155" width="112" height="36" rx="10" fill="rgba(29,78,216,0.08)" stroke="rgba(29,78,216,0.2)" strokeWidth="1.25"/>
          <rect x="288" y="155" width="14" height="14" rx="2" fill="rgba(29,78,216,0.08)" stroke="rgba(29,78,216,0.2)" strokeWidth="1.25" transform="rotate(-45 295 148)"/>
          <rect x="202" y="166" width="60" height="5" rx="2.5" fill="rgba(29,78,216,0.2)"/>
          <rect x="202" y="176" width="82" height="4" rx="2" fill="rgba(29,78,216,0.12)"/>
        </g>

        {/* Connector lines */}
        <line x1="128" y1="100" x2="70" y2="72" stroke="rgba(29,78,216,0.1)" strokeWidth="1" strokeDasharray="3 3"/>
        <line x1="192" y1="95" x2="248" y2="65" stroke="rgba(29,78,216,0.1)" strokeWidth="1" strokeDasharray="3 3"/>
        <line x1="148" y1="127" x2="90" y2="162" stroke="rgba(29,78,216,0.1)" strokeWidth="1" strokeDasharray="3 3"/>
        <line x1="172" y1="127" x2="240" y2="168" stroke="rgba(29,78,216,0.1)" strokeWidth="1" strokeDasharray="3 3"/>

        {/* Floating dots */}
        <circle cx="160" cy="44" r="3" fill="rgba(29,78,216,0.18)"/>
        <circle cx="98" cy="112" r="2.5" fill="rgba(29,78,216,0.12)"/>
        <circle cx="222" cy="112" r="2.5" fill="rgba(29,78,216,0.12)"/>
      </svg>
    </div>
  );
}

function Message({ msg }) {
  const isUser = msg.role === 'user';
  return (
    <div className={`${styles.msgRow} ${isUser ? styles.msgRowUser : styles.msgRowAssistant}`}>
      {!isUser && <div className={styles.avatar}>IA</div>}
      <div className={`${styles.bubble} ${isUser ? styles.bubbleUser : styles.bubbleAssistant}`}>
        {msg.text.split('\n').map((line, i, arr) => (
          <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
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
      <div className={styles.avatar}>IA</div>
      <div className={`${styles.bubble} ${styles.bubbleAssistant} ${styles.typing}`}>
        <span /><span /><span />
      </div>
    </div>
  );
}

export default function Xat() {
  const { lang, t } = useLang();

  const [messages, setMessages] = useState(() => [
    { id: 'welcome', role: 'assistant', text: lang === 'es' ? t.chat.welcomeES : t.chat.welcomeCA },
  ]);
  const [input, setInput]     = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [showDisclaimer, setShowDisclaimer]   = useState(
    !sessionStorage.getItem('dj_disclaimer_shown')
  );
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);
  const charsLeft = MAX_CHARS - input.length;
  const canSend   = input.trim().length > 0 && input.length <= MAX_CHARS && !loading;

  useEffect(() => {
    setMessages([{
      id: 'welcome', role: 'assistant',
      text: lang === 'es' ? t.chat.welcomeES : t.chat.welcomeCA,
    }]);
    setShowSuggestions(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useEffect(() => { sessionStorage.setItem('dj_disclaimer_shown', '1'); }, []);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading]);

  const sendMessage = useCallback(async (text) => {
    const trimmed = text.trim();
    if (!trimmed || trimmed.length > MAX_CHARS || loading) return;
    setShowSuggestions(false);
    setShowDisclaimer(false);
    setMessages((prev) => [...prev, { id: Date.now(), role: 'user', text: trimmed }]);
    setInput('');
    setLoading(true);
    try {
      const res  = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, language: lang }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `Error ${res.status}`);
      setMessages((prev) => [...prev, { id: Date.now() + 1, role: 'assistant', text: data.response }]);
    } catch (err) {
      const errText = lang === 'es'
        ? `No pude obtener una respuesta. ${err.message}. Vuelve a intentarlo.`
        : `No he pogut obtenir una resposta. ${err.message}. Torna-ho a intentar.`;
      setMessages((prev) => [...prev, { id: Date.now() + 1, role: 'assistant', text: errText, error: true }]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }, [loading, lang]);

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
  }

  const suggestions = [t.chat.suggestion1, t.chat.suggestion2, t.chat.suggestion3];

  return (
    <div className={styles.shell}>

      {/* ── Disclaimer banner ── */}
      {showDisclaimer && (
        <div className={styles.disclaimerBanner} role="note">
          <span>{t.chat.disclaimerText}</span>
          <button className={styles.disclaimerClose} onClick={() => setShowDisclaimer(false)} aria-label="Tancar avís">×</button>
        </div>
      )}

      {/* ── Header ── */}
      <header className={styles.chatHeader}>
        <div className={styles.headerLeft}>
          <div className={styles.headerAvatar}>
            <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
              <path d="M12 2a7 7 0 0 1 7 7c0 2.5-1.3 4.7-3.3 6L17 20H7l1.3-5C6.3 13.7 5 11.5 5 9a7 7 0 0 1 7-7Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round"/>
              <path d="M9 20v1a3 3 0 0 0 6 0v-1" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className={styles.headerInfo}>
            <span className={styles.headerName}>{t.chat.headerName}</span>
            <span className={styles.headerStatus}>
              <span className={styles.dot} />
              {t.chat.headerStatus}
            </span>
          </div>
        </div>
        <div className={styles.headerBadge}>ODS 16</div>
      </header>

      {/* ── Messages ── */}
      <div className={styles.feed} role="log" aria-live="polite" aria-label="Conversa">

        {showSuggestions && <WelcomeIllustration />}

        {messages.map((msg) => <Message key={msg.id} msg={msg} />)}

        {showSuggestions && !loading && (
          <div className={styles.suggestions}>
            <p className={styles.suggestionsLabel}>{t.chat.suggestionsLabel}</p>
            <div className={styles.suggestionsList}>
              {suggestions.map((s) => (
                <button key={s} className={styles.suggestionBtn} onClick={() => sendMessage(s)}>
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
              <svg viewBox="0 0 20 20" fill="none" width="15" height="15">
                <path d="M10 15V5M5 10l5-5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
        <p className={styles.hint}>{t.chat.hint}</p>
      </div>

    </div>
  );
}
