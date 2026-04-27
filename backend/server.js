require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const Anthropic = require('@anthropic-ai/sdk');
const scenarios = require('./data/scenarios');

const app = express();
const PORT = process.env.PORT || 3001;

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `Ets un assistent educatiu especialitzat en drets legals per a joves a Espanya. La teva funció és explicar conceptes legals de forma clara, simple i responsable.
Normes:
- No donis assessorament legal professional.
- No inventis lleis ni dades.
- Si no estàs segur, digues-ho clarament.
- Explica sempre el context.
- Dona exemples pràctics.
- Utilitza llenguatge senzill (nivell ESO).
- Prioritza: interaccions amb policia, drets laborals bàsics, ciberassetjament.
- Si la pregunta és perillosa o il·legal, redirigeix cap a informació segura.
Acaba sempre amb: 'Això és informació orientativa, no assessorament legal professional.'`;

// Security
app.use(helmet());

// CORS
const ALLOWED_ORIGINS = [
  'https://plataforma-drets-juvenils.vercel.app',
  'http://localhost:5173',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
    callback(new Error(`CORS: origen no permès: ${origin}`));
  },
  methods: ['POST', 'GET'],
  allowedHeaders: ['Content-Type'],
}));

// Rate limiting: max 10 requests per 15 min per IP
app.use('/api/chat', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Massa sol·licituds. Torna a intentar-ho en 15 minuts.' },
}));

app.use(express.json());

// Health check
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

// Scenarios endpoint
app.get('/api/scenarios', (_req, res) => res.json(scenarios));

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ error: 'El missatge no pot estar buit.' });
  }

  if (message.length > 500) {
    return res.status(400).json({ error: 'El missatge no pot superar els 500 caràcters.' });
  }

  try {
    const result = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: message.trim() }],
    });

    const response = result.content[0]?.text;
    if (!response) throw new Error('Resposta buida de l\'API');

    return res.json({ response });
  } catch (err) {
    console.error('Error cridant l\'API d\'Anthropic:', err.message);

    if (err.status === 401) {
      return res.status(500).json({ error: 'Error d\'autenticació amb l\'API.' });
    }
    if (err.status === 429) {
      return res.status(429).json({ error: 'Límit de l\'API assolit. Torna a intentar-ho més tard.' });
    }

    return res.status(500).json({ error: 'Error intern del servidor. Torna a intentar-ho.' });
  }
});

// 404 catch-all
app.use((_req, res) => res.status(404).json({ error: 'Ruta no trobada.' }));

app.listen(PORT, () => console.log(`Servidor actiu a http://localhost:${PORT}`));
