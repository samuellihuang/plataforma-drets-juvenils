import React, { useState } from "react";
import s from "./Navbar.module.css";
import { t } from "../i18n/strings";

const ROUTES = ["home", "simulador", "xat", "disclaimer"];
const LANGS = ["ca", "es", "en"];

export default function Navbar({ route, setRoute, lang, setLang }) {
  const [open, setOpen] = useState(false);
  return (
    <nav className={s.shell} aria-label="Primary">
      <div className={s.inner}>
        <a
          className={s.brand}
          href="#home"
          onClick={(e) => { e.preventDefault(); setRoute("home"); setOpen(false); }}
        >
          <span className={s.brandMark} aria-hidden="true" />
          <span className={s.brandWord}>
            <span>Drets Juvenils</span>
            <span>Plataforma · CAT</span>
          </span>
        </a>

        <div className={s.links}>
          {ROUTES.map((r) => (
            <button
              key={r}
              type="button"
              className={`${s.link} ${route === r ? s.linkActive : ""}`}
              onClick={() => setRoute(r)}
            >
              {t(`nav.${r === "home" ? "home" : r === "disclaimer" ? "disclaimer" : r}`, lang)}
            </button>
          ))}
        </div>

        <div className={s.right}>
          <div className={s.lang} role="group" aria-label={t("nav.lang", lang)}>
            {LANGS.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                className={`${s.langBtn} ${lang === l ? s.langBtnActive : ""}`}
                aria-pressed={lang === l}
              >
                {l}
              </button>
            ))}
          </div>

          <a
            href="#simulador"
            className={s.cta}
            onClick={(e) => { e.preventDefault(); setRoute("simulador"); }}
          >
            {t("nav.cta", lang)}
          </a>

          <button
            type="button"
            className={s.burger}
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
          </button>
        </div>
      </div>

      {open && (
        <div className={s.drawer}>
          {ROUTES.map((r) => (
            <button
              key={r}
              className={s.drawerLink}
              onClick={() => { setRoute(r); setOpen(false); }}
            >
              {t(`nav.${r}`, lang)}
              <span className={s.drawerLinkArrow}>→</span>
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
