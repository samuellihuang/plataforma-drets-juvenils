import React, { useState } from "react";
import { d } from "../i18n/data";

function LogoMark({ size = 28 }) {
  return <span className="brand-mark" style={{ width: size, height: size }} aria-hidden="true" />;
}

export default function Navbar({ route, setRoute, lang, setLang }) {
  const L = d(lang);
  const [open, setOpen] = useState(false);
  const items = [
    { id: "home",        label: L.nav.home },
    { id: "sim",         label: L.nav.sim },
    { id: "chat",        label: L.nav.chat },
    { id: "res",         label: L.nav.res },
    { id: "forum",       label: L.nav.forum },
    { id: "disclaimer",  label: L.nav.disclaimer },
  ];
  const go = (id) => { setRoute(id); setOpen(false); };

  return (
    <header className="nav">
      <div className="nav-inner">
        <button className="brand" onClick={() => go("home")} aria-label={L.brand.word.join(" ")}>
          <LogoMark />
          <span className="brand-word">
            <span>{L.brand.word[0]}</span>
            <span>{L.brand.word[1]}</span>
          </span>
        </button>
        <nav className="nav-links" aria-label="Principal">
          {items.map(i => (
            <button key={i.id} onClick={() => go(i.id)} className={"nav-link" + (route === i.id ? " active" : "")}>
              {i.label}
            </button>
          ))}
        </nav>
        <div className="nav-right">
          <div className="lang" role="group" aria-label="Idioma">
            {["ca", "es", "en"].map(l => (
              <button key={l} className={"lang-btn" + (lang === l ? " active" : "")} onClick={() => setLang(l)} aria-pressed={lang === l}>{l}</button>
            ))}
          </div>
          <button className="nav-cta" onClick={() => go("sim")}>{L.nav.cta}</button>
          <button className="burger" onClick={() => setOpen(o => !o)} aria-expanded={open} aria-label="Menú"><span /></button>
        </div>
      </div>
      {open && (
        <div className="drawer">
          {items.map(i => (
            <button key={i.id} className="drawer-link" onClick={() => go(i.id)}>
              <span>{i.label}</span>
              <span className="drawer-arrow" aria-hidden="true">→</span>
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
