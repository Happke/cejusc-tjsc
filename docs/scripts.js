document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('loadingMessage').textContent = 'Carregando painel de estatísticas...';

  // Exemplo de requisição futura
  fetch('/api/metas')
    .then(res => res.json())
    .then(data => {
      preencherTabelaMetas(data);
      preencherGraficoPizzaMetas(data);
    })
    .catch(err => {
      document.getElementById('tabelaMetas').innerHTML = '<tr><td colspan="3">Erro ao carregar dados.</td></tr>';
    });
});

function preencherTabelaMetas(data) {
  const tabela = document.getElementById('tabelaMetas');
  tabela.innerHTML = '';
  if (!data || !data.length) {
    tabela.innerHTML = '<tr><td colspan="3">Nenhum dado disponível</td></tr>';
    return;
  }

  data.forEach(item => {
    const percentual = isNaN(item[2]) ? '0,00%' : (parseFloat(item[2]) * 100).toFixed(2).replace('.', ',') + '%';
    const linha = `<tr>
      <td>${item[0]}</td>
      <td>${Number(item[1]).toLocaleString('pt-BR')}</td>
      <td>${percentual}</td>
    </tr>`;
    tabela.innerHTML += linha;
  });
}

function preencherGraficoPizzaMetas(data) {
  const container = document.getElementById('graficoPizza');
  if (!data || data.length < 3 || !data[1][1] || !data[2][1]) {
    container.innerHTML = '<div class="error">Dados insuficientes para o gráfico</div>';
    return;
  }

  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(() => {
    const dataTable = new google.visualization.DataTable();
    dataTable.addColumn('string', 'Categoria');
    dataTable.addColumn('number', 'Valor');
    dataTable.addRows([
      ['JÁ TEMOS', Number(data[1][1]) || 0],
      ['FALTAM', Number(data[2][1]) || 0]
    ]);

    const options = {
      title: 'Metas: Já Temos vs Faltam',
      is3D: true,
      chartArea: { width: '80%', height: '80%' },
      colors: ['#007a33', '#ff6666']
    };

    const chart = new google.visualization.PieChart(container);
    chart.draw(dataTable, options);
  });
}
