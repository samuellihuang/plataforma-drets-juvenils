import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Simulador from "./components/Simulador";
import Xat from "./components/Xat";
import Disclaimer from "./components/Disclaimer";
import "./styles/index.css";

export default function App({ heroVariant = "split" }) {
  const [route, setRoute] = useState("home");
  const [lang, setLang] = useState(() => {
    if (typeof window === "undefined") return "ca";
    return localStorage.getItem("dj.lang") || "ca";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("dj.lang", lang);
      document.documentElement.lang = lang;
    }
  }, [lang]);

  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "instant" });
  }, [route]);

  return (
    <>
      <Navbar route={route} setRoute={setRoute} lang={lang} setLang={setLang} />
      {route === "home"       && <Home       lang={lang} setRoute={setRoute} hero={heroVariant} />}
      {route === "simulador"  && <Simulador  lang={lang} setRoute={setRoute} />}
      {route === "xat"        && <Xat        lang={lang} />}
      {route === "disclaimer" && <Disclaimer lang={lang} setRoute={setRoute} />}
    </>
  );
}
