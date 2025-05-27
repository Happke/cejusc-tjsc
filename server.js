import express from 'express';
import { getMetas } from './sheetsService.js';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/metas', async (req, res) => {
  try {
    const metas = await getMetas();
    res.json(metas);
  } catch (error) {
    console.error('Erro ao obter metas:', error);
    res.status(500).json({ error: 'Erro ao obter metas' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
