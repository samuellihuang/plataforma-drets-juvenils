import React, { useState, useEffect, useCallback } from "react";
import { d } from "../i18n/data";

const BACKEND = "https://plataforma-drets-juvenils.onrender.com";

const CATS = [
  { id: "all",         ca: "Tots",        es: "Todos",       en: "All" },
  { id: "habitatge",   ca: "Habitatge",   es: "Vivienda",    en: "Housing" },
  { id: "treball",     ca: "Treball",     es: "Trabajo",     en: "Work" },
  { id: "policial",    ca: "Policial",    es: "Policial",    en: "Police" },
  { id: "educacio",    ca: "Educació",    es: "Educación",   en: "Education" },
  { id: "digital",     ca: "Digital",     es: "Digital",     en: "Digital" },
  { id: "salut",       ca: "Salut",       es: "Salud",       en: "Health" },
  { id: "estrangeria", ca: "Estrangeria", es: "Extranjería", en: "Immigration" },
  { id: "general",     ca: "General",     es: "General",     en: "General" },
];

function catLabel(id, lang) {
  const c = CATS.find(c => c.id === id);
  return c ? (c[lang] || c.ca) : id;
}

function timeAgo(dateStr, lang) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  const h = Math.floor(m / 60);
  const days = Math.floor(h / 24);
  if (lang === "en") {
    if (m < 1) return "just now";
    if (m < 60) return `${m}m ago`;
    if (h < 24) return `${h}h ago`;
    return `${days}d ago`;
  }
  if (lang === "es") {
    if (m < 1) return "ahora";
    if (m < 60) return `hace ${m}m`;
    if (h < 24) return `hace ${h}h`;
    return `hace ${days}d`;
  }
  if (m < 1) return "ara";
  if (m < 60) return `fa ${m}m`;
  if (h < 24) return `fa ${h}h`;
  return `fa ${days}d`;
}

export default function Forum({ lang }) {
  const L = d(lang).forum;
  const [view, setView] = useState("list");
  const [posts, setPosts] = useState([]);
  const [activePost, setActivePost] = useState(null);
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("all");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ title: "", body: "", category: "habitatge" });
  const [replyText, setReplyText] = useState("");

  const fetchPosts = useCallback(async (q, c) => {
    setLoading(true);
    setError(null);
    try {
      const p = new URLSearchParams();
      if (q) p.set("search", q);
      if (c && c !== "all") p.set("category", c);
      const res = await fetch(`${BACKEND}/api/forum?${p}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error");
      setPosts(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Category change: instant
  useEffect(() => { fetchPosts(search, cat); }, [cat]);

  // Search: debounced
  useEffect(() => {
    const t = setTimeout(() => fetchPosts(search, cat), 350);
    return () => clearTimeout(t);
  }, [search]);

  const openPost = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BACKEND}/api/forum/${id}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error");
      setActivePost(data);
      setView("detail");
      window.scrollTo({ top: 0 });
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const submitPost = async () => {
    if (!form.title.trim() || !form.body.trim()) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`${BACKEND}/api/forum`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error");
      setForm({ title: "", body: "", category: "habitatge" });
      setView("list");
      fetchPosts("", cat);
    } catch (e) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  const submitReply = async () => {
    if (!replyText.trim() || !activePost) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`${BACKEND}/api/forum/${activePost.id}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: replyText }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error");
      setActivePost(p => ({ ...p, replies: [...(p.replies || []), data] }));
      setReplyText("");
    } catch (e) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  const backToList = () => {
    setView("list");
    setActivePost(null);
    setError(null);
    window.scrollTo({ top: 0 });
  };

  // ── NEW POST ──────────────────────────────────────────────────
  if (view === "new") {
    return (
      <main className="long-page" id="main">
        <div className="long-shell">
          <button className="forum-back" onClick={backToList}>{L.back}</button>
          <header style={{ marginBottom: "var(--s-6)" }}>
            <div className="eyebrow-row"><span className="eyebrow">{L.eyebrow}</span></div>
            <h1 className="long-title">{L.new_post_title}</h1>
          </header>
          <div className="forum-form">
            <div className="forum-field">
              <label className="forum-label">{L.title_label}</label>
              <input
                className="forum-input"
                placeholder={L.title_placeholder}
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                maxLength={150}
              />
              <span className="forum-hint">{form.title.length}/150 {L.char_hint}</span>
            </div>
            <div className="forum-field">
              <label className="forum-label">{L.cat_label}</label>
              <select
                className="forum-select"
                value={form.category}
                onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
              >
                {CATS.filter(c => c.id !== "all").map(c => (
                  <option key={c.id} value={c.id}>{c[lang] || c.ca}</option>
                ))}
              </select>
            </div>
            <div className="forum-field">
              <label className="forum-label">{L.body_label}</label>
              <textarea
                className="forum-textarea"
                placeholder={L.body_placeholder}
                value={form.body}
                onChange={e => setForm(f => ({ ...f, body: e.target.value }))}
                maxLength={2000}
                rows={8}
              />
              <span className="forum-hint">{form.body.length}/2000 {L.char_hint}</span>
            </div>
            {error && <p className="forum-error">{error}</p>}
            <div className="forum-form-foot">
              <p className="forum-disc">{L.disc}</p>
              <button
                className="btn btn-primary"
                onClick={submitPost}
                disabled={submitting || !form.title.trim() || !form.body.trim()}
              >
                <span>{submitting ? L.loading : L.submit_btn}</span>
                <span className="btn-arrow">→</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ── POST DETAIL ───────────────────────────────────────────────
  if (view === "detail" && activePost) {
    const replies = activePost.replies || [];
    return (
      <main className="long-page" id="main">
        <div className="long-shell">
          <button className="forum-back" onClick={backToList}>{L.back}</button>
          <article className="post-detail">
            <div className="post-detail-head">
              <span className={"cat-badge cat-" + activePost.category}>{catLabel(activePost.category, lang)}</span>
              <span className="post-detail-meta">{L.anon} · {timeAgo(activePost.created_at, lang)}</span>
            </div>
            <h1 className="post-detail-title">{activePost.title}</h1>
            <p className="post-detail-body">{activePost.body}</p>
          </article>

          <div className="replies-section">
            <h2 className="replies-title">
              {replies.length} {replies.length === 1 ? L.replies_label : L.replies_label_pl}
            </h2>
            {replies.length === 0
              ? <p className="forum-empty">{L.no_replies}</p>
              : replies.map((r, i) => (
                <div key={r.id} className="reply-card">
                  <div className="reply-meta">
                    <span>{L.anon}</span>
                    <span>·</span>
                    <span>{timeAgo(r.created_at, lang)}</span>
                    <span className="reply-num">#{i + 1}</span>
                  </div>
                  <p className="reply-body">{r.body}</p>
                </div>
              ))
            }
          </div>

          <div className="reply-form">
            <textarea
              className="forum-textarea"
              placeholder={L.reply_placeholder}
              value={replyText}
              onChange={e => setReplyText(e.target.value)}
              maxLength={1000}
              rows={4}
            />
            <div className="reply-form-foot">
              <span className="forum-hint">{replyText.length}/1000 {L.char_hint}</span>
              {error && <span className="forum-error" style={{ marginLeft: "auto" }}>{error}</span>}
              <button
                className="btn btn-primary btn-sm"
                onClick={submitReply}
                disabled={submitting || !replyText.trim()}
              >
                <span>{submitting ? L.loading : L.reply_btn}</span>
                <span className="btn-arrow">↵</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ── LIST ──────────────────────────────────────────────────────
  return (
    <main className="long-page" id="main">
      <div className="long-shell">
        <header className="forum-list-head">
          <div>
            <div className="eyebrow-row"><span className="eyebrow">{L.eyebrow}</span></div>
            <h1 className="long-title">{L.title_a}<em>{L.title_em}</em>{L.title_b}</h1>
          </div>
          <button className="btn btn-primary" onClick={() => { setError(null); setView("new"); window.scrollTo({ top: 0 }); }}>
            <span>{L.new_post_btn}</span>
            <span className="btn-arrow">+</span>
          </button>
        </header>

        <div className="forum-toolbar">
          <div className="forum-search-wrap">
            <span className="forum-search-icon" aria-hidden="true">⌕</span>
            <input
              className="forum-search-input"
              placeholder={L.search_placeholder}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button className="forum-search-clear" onClick={() => setSearch("")} aria-label="Esborrar cerca">×</button>
            )}
          </div>
        </div>

        <div className="cat-pills">
          {CATS.map(c => (
            <button
              key={c.id}
              className={"cat-pill" + (cat === c.id ? " active" : "")}
              onClick={() => setCat(c.id)}
            >
              {c[lang] || c.ca}
            </button>
          ))}
        </div>

        {error && <p className="forum-error">{error}</p>}

        {loading ? (
          <div className="forum-loading"><span className="forum-spinner" aria-label={L.loading} /></div>
        ) : posts.length === 0 ? (
          <p className="forum-empty">{L.no_posts}</p>
        ) : (
          <div className="forum-list">
            {posts.map(p => (
              <button key={p.id} className="post-card" onClick={() => openPost(p.id)}>
                <div className="post-card-top">
                  <span className={"cat-badge cat-" + p.category}>{catLabel(p.category, lang)}</span>
                  <span className="post-card-time">{timeAgo(p.created_at, lang)}</span>
                </div>
                <h3 className="post-card-title">{p.title}</h3>
                <p className="post-card-snippet">
                  {p.body?.slice(0, 130)}{p.body?.length > 130 ? "…" : ""}
                </p>
                <div className="post-card-foot">
                  <span className="post-card-anon">{L.anon}</span>
                  <span className="post-card-replies">
                    {p.reply_count ?? 0} {(p.reply_count ?? 0) === 1 ? L.replies_label : L.replies_label_pl}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
