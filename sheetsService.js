import { google } from 'googleapis';
import dotenv from 'dotenv';
dotenv.config();

const auth = new google.auth.JWT(
  process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  null,
  process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  ['https://www.googleapis.com/auth/spreadsheets.readonly']
);

const sheets = google.sheets({ version: 'v4', auth });

// IDs de planilhas
const PAUTAC2_ID = process.env.PAUTAC2_ID;
const PLANILHA_ID = process.env.PLANILHA_ID;

async function getValues(sheetId, range) {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: range
  });
  return res.data.values || [];
}

async function getMetas() {
  const dados = await getValues(PLANILHA_ID, 'METAS!A2:C');
  return dados.filter(row => row[0] && row[1] && row[2] && !isNaN(row[2]));
}

async function getMetasInternosExternos() {
  return await getValues(PLANILHA_ID, 'REGISTRO_AUDIÊNCIAS!D1:F2');
}

async function getPercentualComparecimentoIntegral() {
  const [[valor]] = await getValues(PAUTAC2_ID, 'REGISTRO_AUDIÊNCIAS!E6');
  return (parseFloat(valor || 0) * 100).toFixed(2) + '%';
}

async function getClassesProcessuais() {
  const dados = await getValues(PLANILHA_ID, 'REGISTRO_AUDIÊNCIAS!D1:J');
  const linhaInicio = dados.findIndex(row => row[0]?.toLowerCase().includes('agravo de instrumento'));
  if (linhaInicio === -1) return [];
  return dados.slice(linhaInicio).filter(row => row[0]).map(row => [row[0], row[1], row[3]]);
}

async function getRankingAcordos() {
  const dados = await getValues(PLANILHA_ID, 'Totais_Acordos_Gabinete!A2:B');
  const total = (await getValues(PLANILHA_ID, 'Ranking_Mediadores_Acordos!B2:B'))
    .flat().reduce((s, v) => s + Number(v || 0), 0);
  return { dados: dados.filter(r => r[0] && r[1]), totalAcordos: total };
}

async function getTotaisProcessosGabinete() {
  const processos = await getValues(PLANILHA_ID, 'GABINETE!A1:C');
  const acordos = (await getValues(PLANILHA_ID, 'Totais_Acordos_Gabinete!A2:A')).flat();

  const mapa = new Map();
  processos.forEach(([_, gab, qtd]) => {
    if (gab) mapa.set(gab, Number(qtd) || 0);
  });

  acordos.forEach(gab => {
    if (gab && !mapa.has(gab)) mapa.set(gab, 0);
  });

  return [...mapa.entries()].map(([gab, qtd]) => ["", gab, qtd]).sort((a, b) => b[2] - a[2]);
}

async function getRankingAcordosVara() {
  const dados = await getValues(PLANILHA_ID, 'Totais_Acordos_Vara!B2:D');
  const agrupado = {};
  dados.forEach(([comarca, _, qtd]) => {
    if (comarca && qtd) agrupado[comarca] = (agrupado[comarca] || 0) + Number(qtd);
  });
  return Object.entries(agrupado).map(([c, t]) => [c, "", t]);
}

async function getTotaisProcessosVara() {
  const dados = await getValues(PLANILHA_ID, 'Totais_Processos_Vara!B2:D');
  const mapa = {};
  dados.forEach(([comarca, _, qtd]) => {
    if (comarca && qtd) mapa[comarca] = (mapa[comarca] || 0) + Number(qtd);
  });
  return Object.entries(mapa);
}

async function getRankingAdvogadosAcordos() {
  const dados = await getValues(PAUTAC2_ID, 'ADVOGADOS!A2:D');
  const filtrado = dados.filter(r => r[0] && r[3] !== '0');
  const arr = filtrado.map(r => [r[0], (Number(r[3]) || 0) * 100]);
  const total = arr.reduce((s, r) => s + r[1], 0);
  return { dados: arr, totalAcordos: total };
}

async function getRankingDefensoresAcordos() {
  const dados = await getValues(PAUTAC2_ID, 'DEFENSORES!A2:D');
  const filtrado = dados.filter(r => r[0] && r[3] !== '0');
  const arr = filtrado.map(r => [r[0], (Number(r[3]) || 0) * 100]);
  const total = arr.reduce((s, r) => s + r[1], 0);
  return { dados: arr, totalAcordos: total };
}

async function getTotaisAdvogados() {
  const atuacao = (await getValues(PLANILHA_ID, 'Ranking_Advogados_Atuação!A2:A')).flat().filter(Boolean);
  const acordos = (await getValues(PLANILHA_ID, 'Ranking_Advogados_Acordos!A2:A')).flat().filter(Boolean);
  return {
    totalAtuacao: new Set(atuacao).size,
    totalAcordos: acordos.length
  };
}

async function getRankingMediadoresAcordos() {
  const dados = await getValues(PLANILHA_ID, 'Ranking_Mediadores_Acordos!A2:B');
  const filtrado = dados.filter(r => r[0] && r[1]);
  const total = filtrado.reduce((s, r) => s + Number(r[1] || 0), 0);
  return { dados: filtrado, totalAcordos: total };
}

async function getRankingMediadoresDisponibilidade() {
  return (await getValues(PLANILHA_ID, 'Ranking_Mediadores_Disponibilidade!A2:B')).filter(r => r[0] && r[1]);
}

async function getAtendimentosPrioritarios() {
  const nomes = (await getValues(PAUTAC2_ID, 'controle!A25:A30')).flat();
  const qtds = (await getValues(PAUTAC2_ID, 'controle!B25:B30')).flat();
  return nomes.map((n, i) => [n, qtds[i] || 0]);
}

async function getMediadoresIdosos() {
  const nomes = (await getValues(PAUTAC2_ID, 'controle!A33:A34')).flat();
  const qtds = (await getValues(PAUTAC2_ID, 'controle!B33:B34')).flat();
  const [[percentual]] = await getValues(PAUTAC2_ID, 'controle!C33:C33');
  return nomes.map((n, i) => [n, qtds[i] || 0, i === 0 ? percentual || 0 : 0]);
}

export {
  getMetas,
  getMetasInternosExternos,
  getPercentualComparecimentoIntegral,
  getClassesProcessuais,
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
  getMediadoresIdosos
};
