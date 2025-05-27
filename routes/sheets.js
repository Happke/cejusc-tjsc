import express from 'express';
import {
  getMetas,
  getMetasInternosExternos,
  getPercentualComparecimentoIntegral,
  getRankingAcordos,
  getTotaisProcessosGabinete,
  getRankingAcordosVara,
  getTotaisProcessosVara,
  getRankingAdvogadosAcordos,
  getRankingDefensoresAcordos,
  getTotaisAdvogados,
  getRankingMediadoresAcordos,
  getRankingMediadoresDisponibilidade,
  getAtendimentosPrioritarios,
  getMediadoresIdosos,
  getClassesProcessuais
} from '../sheetsService.js';

const router = express.Router();

router.get('/metas', async (req, res) => {
  try {
    const metas = await getMetas();
    res.json(metas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao carregar metas' });
  }
});

router.get('/internos-externos', async (req, res) => {
  try {
    const dados = await getMetasInternosExternos();
    res.json(dados);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao carregar internos e externos' });
  }
});

router.get('/comparecimento', async (req, res) => {
  try {
    const valor = await getPercentualComparecimentoIntegral();
    res.json(valor);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao carregar comparecimento' });
  }
});

router.get('/ranking-acordos', async (req, res) => {
  try {
    const dados = await getRankingAcordos();
    res.json(dados);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao carregar ranking de acordos' });
  }
});

router.get('/processos-gabinete', async (req, res) => {
  try {
    const dados = await getTotaisProcessosGabinete();
    res.json(dados);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao carregar processos por gabinete' });
  }
});

router.get('/ranking-acordos-vara', async (req, res) => {
  try {
    const dados = await getRankingAcordosVara();
    res.json(dados);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao carregar acordos por vara' });
  }
});

router.get('/processos-vara', async (req, res) => {
  try {
    const dados = await getTotaisProcessosVara();
    res.json(dados);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao carregar processos por vara' });
  }
});

router.get('/ranking-advogados', async (req, res) => {
  try {
    const dados = await getRankingAdvogadosAcordos();
    res.json(dados);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao carregar ranking de advogados' });
  }
});

router.get('/ranking-defensores', async (req, res) => {
  try {
    const dados = await getRankingDefensoresAcordos();
    res.json(dados);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao carregar ranking de defensores' });
  }
});

router.get('/totais-advogados', async (req, res) => {
  try {
    const dados = await getTotaisAdvogados();
    res.json(dados);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao carregar totais de advogados' });
  }
});

router.get('/ranking-mediadores', async (req, res) => {
  try {
    const dados = await getRankingMediadoresAcordos();
    res.json(dados);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao carregar ranking de mediadores' });
  }
});

router.get('/disponibilidade-mediadores', async (req, res) => {
  try {
    const dados = await getRankingMediadoresDisponibilidade();
    res.json(dados);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao carregar disponibilidade de mediadores' });
  }
});

router.get('/atendimentos-prioritarios', async (req, res) => {
  try {
    const dados = await getAtendimentosPrioritarios();
    res.json(dados);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao carregar atendimentos prioritários' });
  }
});

router.get('/mediadores-idosos', async (req, res) => {
  try {
    const dados = await getMediadoresIdosos();
    res.json(dados);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao carregar mediadores idosos' });
  }
});

router.get('/classes-processuais', async (req, res) => {
  try {
    const dados = await getClassesProcessuais();
    res.json(dados);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao carregar classes processuais' });
  }
});

export default router;
