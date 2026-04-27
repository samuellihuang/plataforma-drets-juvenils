# Plataforma de Drets Juvenils

Aplicació educativa full-stack per a joves de 14-18 anys que explica els seus drets legals a Espanya. Inclou un simulador d'escenaris interactiu i un xat amb IA (Claude d'Anthropic).

> ⚠️ Aquesta plataforma és educativa. No substitueix assessorament legal professional.

---

## Execució en local

### Prerequisits

- [Node.js](https://nodejs.org/) v18 o superior
- Clau d'API d'Anthropic → [console.anthropic.com](https://console.anthropic.com)

### 1. Clona el repositori

```bash
git clone https://github.com/el-teu-usuari/plataforma-drets-juvenils.git
cd plataforma-drets-juvenils
```

### 2. Configura el backend

```bash
cd backend
npm install
cp .env.example .env
```

Edita `backend/.env` i afegeix la teva clau:

```
ANTHROPIC_API_KEY=sk-ant-...
PORT=3001
FRONTEND_URL=http://localhost:5173
```

Arrenca el servidor:

```bash
npm run dev      # amb hot-reload (nodemon)
# o
npm start        # sense hot-reload
```

El backend estarà disponible a `http://localhost:3001`.

### 3. Configura el frontend

Obre una **nova terminal**:

```bash
cd frontend
npm install
cp .env.example .env
```

El fitxer `frontend/.env` ja té la URL correcta per defecte:

```
VITE_API_URL=http://localhost:3001
```

Arrenca el servidor de desenvolupament:

```bash
npm run dev
```

L'aplicació estarà disponible a `http://localhost:5173`.

---

## Variables d'entorn

### Backend (`backend/.env`)

| Variable | Descripció | Exemple |
|---|---|---|
| `ANTHROPIC_API_KEY` | Clau de l'API d'Anthropic | `sk-ant-api03-...` |
| `PORT` | Port del servidor | `3001` |
| `FRONTEND_URL` | URL del frontend (CORS) | `http://localhost:5173` |

### Frontend (`frontend/.env`)

| Variable | Descripció | Exemple |
|---|---|---|
| `VITE_API_URL` | URL base del backend | `http://localhost:3001` |

---

## Estructura del projecte

```
plataforma-drets-juvenils/
│
├── backend/
│   ├── data/
│   │   └── scenarios.js        # 3 escenaris legals amb opcions i explicacions
│   ├── src/
│   │   └── index.js            # punt d'entrada alternatiu (no usat en prod)
│   ├── server.js               # servidor Express principal
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx      # navegació sticky amb React Router
│   │   │   └── Disclaimer.jsx  # banner avís legal
│   │   ├── pages/
│   │   │   ├── Home.jsx        # pàgina principal amb badge ODS 16
│   │   │   ├── Simulador.jsx   # simulador d'escenaris interactiu
│   │   │   └── Xat.jsx         # xat amb IA (Claude)
│   │   ├── App.jsx             # router principal
│   │   ├── main.jsx            # entry point React
│   │   └── index.css           # design tokens (dark mode)
│   ├── index.html
│   ├── vite.config.js
│   ├── .env.example
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## API endpoints

| Mètode | Ruta | Descripció |
|---|---|---|
| `GET` | `/api/health` | Comprova que el servidor funciona |
| `GET` | `/api/scenarios` | Retorna els 3 escenaris de simulació |
| `POST` | `/api/chat` | Envia un missatge a Claude i retorna la resposta |

### POST `/api/chat`

**Request:**
```json
{ "message": "Quins drets tinc si la policia em para?" }
```

**Response:**
```json
{ "response": "Quan la policia et demana identificació..." }
```

**Límits:** màx. 500 caràcters per missatge · màx. 10 requests per IP cada 15 minuts.

---

## Desplegament

### Frontend → Vercel

1. Importa el repositori a [vercel.com](https://vercel.com)
2. Configura:
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. Afegeix la variable d'entorn a Vercel:
   - `VITE_API_URL` → URL del teu backend a Render (ex: `https://drets-juvenils-api.onrender.com`)
4. Desplega.

### Backend → Render

1. Crea un nou **Web Service** a [render.com](https://render.com)
2. Connecta el repositori i configura:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** `Node`
3. Afegeix les variables d'entorn a Render:
   - `ANTHROPIC_API_KEY` → la teva clau d'Anthropic
   - `PORT` → `3001` (o deixa que Render ho gestioni automàticament amb `process.env.PORT`)
   - `FRONTEND_URL` → URL del teu frontend a Vercel (ex: `https://drets-juvenils.vercel.app`)
4. Desplega.

> **Important:** Render apaga els serveis gratuïts després de 15 minuts d'inactivitat. La primera petició pot trigar ~30 segons en arrancar ("cold start"). Per evitar-ho, usa el pla pagat o configura un ping periòdic.

---

## Tecnologies

| Capa | Tecnologia |
|---|---|
| Frontend | React 19, Vite, React Router v7, CSS Modules |
| Backend | Node.js, Express 5, Helmet, CORS, express-rate-limit |
| IA | Anthropic Claude (`claude-sonnet-4-20250514`) |
| Desplegament | Vercel (frontend) + Render (backend) |

---

## Connexió amb els ODS

Aquest projecte contribueix a l'**Objectiu de Desenvolupament Sostenible 16** de les Nacions Unides: *Pau, Justícia i Institucions Sòlides*. Garantir que els joves coneguin els seus drets és la base d'una democràcia participativa i inclusiva.
