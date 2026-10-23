# Flux de dades — Plataforma de Drets Juvenils

Inventari de quines dades es tracten, on van i quant de temps es conserven.
La Política de privacitat de la web (`frontend/src/i18n/data.js`, clau `priv`)
ha de coincidir amb aquesta taula. **Si canvia el funcionament, actualitzeu
primer aquesta taula i després la política.**

Darrera revisió: octubre de 2026.

Responsables del tractament: Oriol Chertó, Samuel Li, Martina Casas i
Keila Sánchez (Col·legi La Salle Reus).

| Funcionalitat | Dades | Destinació | Es guarda? | Base legal |
|---|---|---|---|---|
| Simulador i recursos | Respostes del simulador | Només el navegador | No surt del dispositiu | — |
| Xat | Text del missatge, idioma | Servidor propi (Render) → Google Gemini | Render: no es guarda. Google: segons les seves condicions | Prestació del servei sol·licitat (art. 6.1.b RGPD) |
| Xat (historial) | Missatges de la sessió | `sessionStorage` del navegador | Fins que es tanca la pestanya | Estrictament necessari (art. 22.2 LSSI) |
| Fòrum | Títol, text, categoria, data | Supabase (base de dades) | Sí, públic, fins que s'esborra | Prestació del servei sol·licitat (art. 6.1.b RGPD) |
| Límit de peticions | Adreça IP | Memòria del servidor (Render) | 15 min (xat) / 1 h (fòrum), no es desa a disc | Interès legítim: seguretat (art. 6.1.f RGPD) |
| Allotjament | Adreça IP, petició HTTP | Vercel (web) i Render (API) | Registres tècnics del proveïdor | Interès legítim: seguretat (art. 6.1.f RGPD) |
| Tipografies | Adreça IP | Google Fonts | Segons Google | Interès legítim (art. 6.1.f RGPD) |
| Preferències | `pdj_lang`, `pdj_cookies`, `pdj_sim_start` | `localStorage` del navegador | Fins que l'usuari les esborra | Estrictament necessari (art. 22.2 LSSI) |

## Proveïdors (encarregats del tractament)

| Proveïdor | Funció | Ubicació possible |
|---|---|---|
| Vercel | Allotjament de la web | UE / EUA |
| Render | Servidor de l'API | UE / EUA (segons la regió del servei) |
| Supabase | Base de dades del fòrum | Segons la regió del projecte |
| Google | IA del xat (Gemini) i tipografies | EUA |

## Pendent

- [ ] Correu de contacte del projecte (`CONTACT_EMAIL` a `data.js`).
- [ ] Confirmar les regions de Render i Supabase al seu panell i concretar-les aquí.
- [ ] Revisar aquesta taula quan es canviï el proveïdor d'IA (pas 3) o la moderació del fòrum (pas 4).
