import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Simulador from "./components/Simulador";
import Xat from "./components/Xat";
import Resources from "./components/Resources";
import Forum from "./components/Forum";
import Disclaimer from "./components/Disclaimer";
import Privacitat from "./components/Privacitat";
import Cookies from "./components/Cookies";
import NotFound from "./components/NotFound";
import "./styles/app.css";

const ROUTES = ["home", "sim", "chat", "res", "forum", "disclaimer", "privacitat", "cookies"];

export default function App() {
  const [route, setRouteRaw] = useState(() => {
    try {
      const h = location.hash.replace(/^#\/?/, "") || "home";
      return ROUTES.includes(h) ? h : "home";
    } catch { return "home"; }
  });

  const setRoute = (r) => {
    setRouteRaw(r);
    try { location.hash = "/" + r; } catch {}
    window.scrollTo({ top: 0 });
  };

  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem("pdj_lang") || "ca"; } catch { return "ca"; }
  });

  useEffect(() => {
    try { localStorage.setItem("pdj_lang", lang); } catch {}
    document.documentElement.lang = lang;
  }, [lang]);

  const PAGE_TITLES = {
    ca: { home: "Drets Juvenils — Coneix i exerceix els teus drets", sim: "Simulador de situacions — Drets Juvenils", chat: "Xat legal amb IA — Drets Juvenils", res: "Recursos verificats — Drets Juvenils", forum: "Fòrum anònim — Drets Juvenils", disclaimer: "Avís legal — Drets Juvenils", privacitat: "Política de privacitat — Drets Juvenils", cookies: "Política de cookies — Drets Juvenils" },
    es: { home: "Derechos Juveniles — Conoce y ejerce tus derechos", sim: "Simulador de situaciones — Derechos Juveniles", chat: "Chat legal con IA — Derechos Juveniles", res: "Recursos verificados — Derechos Juveniles", forum: "Foro anónimo — Derechos Juveniles", disclaimer: "Aviso legal — Derechos Juveniles", privacitat: "Política de privacidad — Derechos Juveniles", cookies: "Política de cookies — Derechos Juveniles" },
    en: { home: "Youth Rights — Know and exercise your rights", sim: "Situation simulator — Youth Rights", chat: "AI legal chat — Youth Rights", res: "Verified resources — Youth Rights", forum: "Anonymous forum — Youth Rights", disclaimer: "Legal notice — Youth Rights", privacitat: "Privacy policy — Youth Rights", cookies: "Cookies policy — Youth Rights" },
  };

  useEffect(() => {
    const titles = PAGE_TITLES[lang] || PAGE_TITLES.ca;
    document.title = titles[route] || titles.home;
  }, [route, lang]);

  useEffect(() => {
    const onHash = () => {
      const h = location.hash.replace(/^#\/?/, "") || "home";
      setRouteRaw(ROUTES.includes(h) ? h : "home");
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  let page;
  switch (route) {
    case "sim":        page = <Simulador  lang={lang} setRoute={setRoute} />; break;
    case "chat":       page = <Xat        lang={lang} setRoute={setRoute} />; break;
    case "res":        page = <Resources  lang={lang} setRoute={setRoute} />; break;
    case "forum":      page = <Forum      lang={lang} setRoute={setRoute} />; break;
    case "disclaimer": page = <Disclaimer lang={lang} setRoute={setRoute} />; break;
    case "privacitat": page = <Privacitat lang={lang} setRoute={setRoute} />; break;
    case "cookies":    page = <Cookies   lang={lang} setRoute={setRoute} />; break;
    case "home":       page = <Home       lang={lang} setRoute={setRoute} />; break;
    default:           page = <NotFound   lang={lang} setRoute={setRoute} />;
  }

  return (
    <>
      <a className="skip-link" href="#main">Saltar al contingut</a>
      <Navbar route={route} setRoute={setRoute} lang={lang} setLang={setLang} />
      {page}
      <Footer setRoute={setRoute} lang={lang} />
    </>
  );
}
