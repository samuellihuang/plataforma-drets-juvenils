import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Simulador from "./components/Simulador";
import Xat from "./components/Xat";
import Resources from "./components/Resources";
import Forum from "./components/Forum";
import Disclaimer from "./components/Disclaimer";
import "./styles/app.css";

const ROUTES = ["home", "sim", "chat", "res", "forum", "disclaimer"];

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
    default:           page = <Home       lang={lang} setRoute={setRoute} />;
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
