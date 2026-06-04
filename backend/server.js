require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { createClient } = require('@supabase/supabase-js');
const scenarios = require('./data/scenarios');
const scenariosEs = require('./data/scenarios_es');

const supabase = process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY
  ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
  : null;

const app = express();
const PORT = process.env.PORT || 3001;

function buildSystemPrompt(lang) {
  if (lang === 'es') {
    return `Eres un asistente educativo especializado en derechos legales para jóvenes en España. Tu función es explicar conceptos legales de forma clara, sencilla y responsable.
Normas:
- No des asesoramiento legal profesional.
- No inventes leyes ni datos.
- Si no estás seguro, dilo claramente.
- Explica siempre el contexto.
- Da ejemplos prácticos.
- Utiliza lenguaje sencillo (nivel ESO).
- Prioriza: interacciones con la policía, derechos laborales básicos, ciberacoso.
- Si la pregunta es peligrosa o ilegal, redirige hacia información segura.
Responde SIEMPRE en español.
Termina siempre con: 'Esta información es orientativa, no asesoramiento legal profesional.'`;
  }
  return `Ets un assistent educatiu especialitzat en drets legals per a joves a Espanya. La teva funció és explicar conceptes legals de forma clara, simple i responsable.
Normes:
- No donis assessorament legal professional.
- No inventis lleis ni dades.
- Si no estàs segur, digues-ho clarament.
- Explica sempre el context.
- Dona exemples pràctics.
- Utilitza llenguatge senzill (nivell ESO).
- Prioritza: interaccions amb policia, drets laborals bàsics, ciberassetjament.
- Si la pregunta és perillosa o il·legal, redirigeix cap a informació segura.
Respon SEMPRE en català.
Acaba sempre amb: 'Això és informació orientativa, no assessorament legal professional.'`;
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

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
app.get('/api/scenarios', (req, res) => {
  const lang = req.query.lang === 'es' ? 'es' : 'ca';
  if (lang === 'es') {
    const translated = scenarios.map((s) => {
      const es = scenariosEs[s.id];
      if (!es) return s;
      return {
        ...s,
        categoryLabel: es.categoryLabel || s.categoryLabel,
        title:         es.title         || s.title,
        context:       es.context       || s.context,
        situation:     es.situation     || s.situation,
        options: s.options.map((o) => {
          const oEs = es.options?.[o.id];
          if (!oEs) return o;
          return {
            ...o,
            text:             oEs.text             || o.text,
            consequence:      oEs.consequence      || o.consequence,
            legalRight:       oEs.legalRight       || o.legalRight,
            legalExplanation: oEs.legalExplanation || o.legalExplanation,
          };
        }),
      };
    });
    return res.json(translated);
  }
  return res.json(scenarios);
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  const { message, language } = req.body;

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ error: 'El missatge no pot estar buit.' });
  }

  if (message.length > 500) {
    return res.status(400).json({ error: 'El missatge no pot superar els 500 caràcters.' });
  }

  const lang = language === 'es' || language === 'ca' ? language : 'ca';
  const model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview', systemInstruction: buildSystemPrompt(lang) });

  try {
    const result = await model.generateContent(message.trim());
    const response = result.response.text();
    if (!response) throw new Error('Resposta buida de l\'API');

    return res.json({ response });
  } catch (err) {
    console.error('Error cridant l\'API de Gemini:', err);

    return res.status(500).json({ error: err.message || String(err) });
  }
});

// ── Forum routes ──────────────────────────────────────────────
const forumGuard = (_req, res, next) => {
  if (!supabase) return res.status(503).json({ error: 'Fòrum no configurat. Afegeix SUPABASE_URL i SUPABASE_SERVICE_KEY.' });
  next();
};
const forumPostLimiter  = rateLimit({ windowMs: 60 * 60 * 1000, max: 5,  message: { error: 'Massa posts. Torna en 1 hora.' } });
const forumReplyLimiter = rateLimit({ windowMs: 60 * 60 * 1000, max: 20, message: { error: 'Massa respostes. Torna en 1 hora.' } });

// GET /api/forum
app.get('/api/forum', forumGuard, async (req, res) => {
  const { search, category } = req.query;
  try {
    let q = supabase.from('posts').select('id, title, body, category, created_at, replies(count)').order('created_at', { ascending: false }).limit(50);
    if (search) q = q.ilike('title', `%${String(search).slice(0, 100)}%`);
    if (category && category !== 'all') q = q.eq('category', String(category).slice(0, 50));
    const { data, error } = await q;
    if (error) throw error;
    const posts = (data || []).map(p => ({ ...p, reply_count: p.replies?.[0]?.count ?? 0, replies: undefined }));
    return res.json(posts);
  } catch (e) { return res.status(500).json({ error: e.message }); }
});

// POST /api/forum
app.post('/api/forum', forumGuard, forumPostLimiter, async (req, res) => {
  const { title, body, category } = req.body;
  if (!title?.trim() || !body?.trim()) return res.status(400).json({ error: 'Falta el títol o el cos.' });
  if (title.length > 150 || body.length > 2000) return res.status(400).json({ error: 'Text massa llarg.' });
  try {
    const { data, error } = await supabase.from('posts').insert({ title: title.trim(), body: body.trim(), category: (category || 'general').slice(0, 50) }).select().single();
    if (error) throw error;
    return res.status(201).json(data);
  } catch (e) { return res.status(500).json({ error: e.message }); }
});

// GET /api/forum/:id
app.get('/api/forum/:id', forumGuard, async (req, res) => {
  try {
    const { data: post, error: pe } = await supabase.from('posts').select('*').eq('id', req.params.id).single();
    if (pe || !post) return res.status(404).json({ error: 'Post no trobat.' });
    const { data: replies, error: re } = await supabase.from('replies').select('*').eq('post_id', req.params.id).order('created_at', { ascending: true });
    if (re) throw re;
    return res.json({ ...post, replies: replies || [] });
  } catch (e) { return res.status(500).json({ error: e.message }); }
});

// POST /api/forum/:id/reply
app.post('/api/forum/:id/reply', forumGuard, forumReplyLimiter, async (req, res) => {
  const { body } = req.body;
  if (!body?.trim()) return res.status(400).json({ error: 'La resposta no pot estar buida.' });
  if (body.length > 1000) return res.status(400).json({ error: 'Resposta massa llarga.' });
  try {
    const { data, error } = await supabase.from('replies').insert({ post_id: req.params.id, body: body.trim() }).select().single();
    if (error) throw error;
    return res.status(201).json(data);
  } catch (e) { return res.status(500).json({ error: e.message }); }
});

// 404 catch-all
app.use((_req, res) => res.status(404).json({ error: 'Ruta no trobada.' }));

app.listen(PORT, () => console.log(`Servidor actiu a http://localhost:${PORT}`));
