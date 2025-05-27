import express from 'express';
import { getMetas } from '../sheetsService.js';

const router = express.Router();

router.get('/metas', async (req, res) => {
  try {
    const metas = await getMetas();
    res.json(metas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao carregar metas' });
  }
});

export default router;
