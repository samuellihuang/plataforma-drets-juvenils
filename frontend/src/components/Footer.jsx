import React, { useState } from "react";
import { d } from "../i18n/data";

export function Cookie({ lang }) {
  const L = d(lang).cookie;
  const [show, setShow] = useState(() => {
    try { return !localStorage.getItem("pdj_cookies"); } catch { return true; }
  });
  if (!show) return null;
  const dismiss = (v) => {
    try { localStorage.setItem("pdj_cookies", v); } catch {}
    setShow(false);
  };
  return (
    <div className="cookie" role="region" aria-label="Avís de cookies">
      <div>
        <span className="cookie-eyebrow">{L.eyebrow}</span>
        <p className="cookie-text">{L.text}<a href="#" onClick={(e) => { e.preventDefault(); dismiss("essential"); }}>{L.link}</a>.</p>
      </div>
      <div className="cookie-actions">
        <button className="cookie-btn cookie-reject" onClick={() => dismiss("essential")}>{L.reject}</button>
        <button className="cookie-btn cookie-accept" onClick={() => dismiss("all")}>{L.accept}</button>
      </div>
    </div>
  );
}

export default function Footer({ setRoute, lang }) {
  const L = d(lang).footer;
  return (
    <>
      <footer className="footer">
        <div className="footer-inner">
          <div>
            <h3 className="footer-org">{L.org}</h3>
            <p className="footer-tag">{L.tag}</p>
            <p className="footer-disc" style={{ marginTop: "var(--s-4)" }}>{L.disc}</p>
          </div>
          {L.cols.map((col, idx) => (
            <div className="footer-col" key={idx}>
              <h4>{col.h}</h4>
              <ul>
                {col.items.map(([label, to], j) => (
                  <li key={j}>
                    {to
                      ? <button onClick={() => setRoute(to)}>{label}</button>
                      : <a href="#">{label}</a>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-meta">
          <span>{L.meta_left}</span>
          <span>{L.meta_right}</span>
        </div>
      </footer>
      <Cookie lang={lang} />
    </>
  );
}
