import express from 'express';
import rateLimit from 'express-rate-limit';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());

// Rate limiter for AI endpoint to prevent abuse/billing exhaustion
const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: { error: 'Too many requests from this IP, please try again after 15 minutes.' }
});

// API endpoint for AI Keyword Generation
app.post('/api/generate-keywords', aiLimiter, async (req, res) => {
  try {
    const { categoryName, categoryPath, genre, audienceIntent } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(400).json({
        error: 'GEMINI_API_KEY environment variable is not configured',
        fallback: true
      });
    }

    const ai = new GoogleGenAI();
    const prompt = `You are a top-tier Amazon KDP keyword specialist and book SEO strategist.
Generate exactly 7 distinct high-intent, long-tail search keyword phrases for an indie author's KDP backend keyword boxes.

Target Book Metadata:
- Niche Category: ${categoryName}
- Breadcrumb Shelf: ${categoryPath}
- Department: ${genre}
- Reader Intent / Subculture: ${audienceIntent || 'High purchasing intent'}

STRICT AMAZON KDP RULES:
1. Exactly 7 keyword phrases (1 phrase for each slot).
2. Maximum 50 characters per phrase (crucial: under 50 characters, around 35-48 chars).
3. Plain text only: NO punctuation, NO quotes, NO commas.
4. BANNED: Do not use "bestseller", "best seller", "free", "cheap", "kindle", or trademarked author names.
5. Maximize semantic search coverage: reader tropes, emotional triggers, problem-solving, age target, and themes.

Return ONLY a JSON array of 7 strings formatted like:
["keyword phrase 1", "keyword phrase 2", "keyword phrase 3", "keyword phrase 4", "keyword phrase 5", "keyword phrase 6", "keyword phrase 7"]`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text || '[]';
    let keywords: string[] = [];
    try {
      keywords = JSON.parse(text);
    } catch {
      // Fallback extraction
      const matches = text.match(/"([^"]+)"/g);
      if (matches) {
        keywords = matches.map(m => m.replace(/"/g, ''));
      }
    }

    // Ensure valid 7 items trimmed to 50 chars
    keywords = (Array.isArray(keywords) ? keywords : [])
      .map(k => String(k).replace(/[,"']/g, '').trim().slice(0, 50))
      .filter(Boolean)
      .slice(0, 7);

    return res.json({ keywords });
  } catch (err: any) {
    console.error('Error generating keywords with Gemini:', err);
    return res.status(500).json({ error: err.message || 'Gemini API generation error' });
  }
});

// Vite middleware integration for full-stack dev and static serving for production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`KDP Optimizer server running on http://0.0.0.0:${port}`);
  });
}

startServer();
