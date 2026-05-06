import React from "react";
import s from "./Disclaimer.module.css";
import { t } from "../i18n/strings";

export default function Disclaimer({ lang, setRoute }) {
  const sections = t("disc.sections", lang);
  return (
    <div className={s.page}>
      <div className={s.shell}>
        <header className={s.head}>
          <div>
            <span className="eyebrow" style={{ display: "block", marginBottom: "var(--s-3)" }}>
              {t("disc.eyebrow", lang)}
            </span>
            <h1 className={s.title}>
              {t("disc.title", lang).split("—")[0]}
              <em>—</em>
              {t("disc.title", lang).split("—")[1]}
            </h1>
          </div>
          <div className={s.metaRow}>
            <span>{t("disc.updated", lang)}</span>
            <span>v 1.0 · 2026</span>
            <span>CA · ES · EN</span>
          </div>
        </header>

        <div className={s.list}>
          {sections.map(([title, body], i) => (
            <article key={i} className={s.item}>
              <span className={s.itemNum}>{String(i + 1).padStart(2, "0")} / {String(sections.length).padStart(2, "0")}</span>
              <h2 className={s.itemTitle}>{title}</h2>
              <p className={s.itemBody}>{body}</p>
            </article>
          ))}
        </div>

        <div className={s.foot}>
          <p className={s.footText}>
            {t("home.footer_disc", lang)}
          </p>
          <button className={s.footBtn} onClick={() => setRoute("xat")}>
            {t("nav.xat", lang)}
          </button>
        </div>
      </div>
    </div>
  );
}
