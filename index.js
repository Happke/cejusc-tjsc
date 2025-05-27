import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { getMetas } from './sheetsService.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get('/metas', async (req, res) => {
  try {
    const metas = await getMetas();
    res.json(metas);
  } catch (error) {
    console.error('Erro ao buscar metas:', error.message);
    res.status(500).json({ error: 'Erro ao buscar metas' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
