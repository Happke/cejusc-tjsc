document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('loadingMessage').textContent = 'Carregando dados...';

  fetch('data/metas.json')
    .then(response => response.json())
    .then(data => renderizarMetas(data))
    .catch(error => mostrarErro('Erro ao carregar dados: ' + error.message));
});

function renderizarMetas(dados) {
  const painel = document.getElementById('painel-container');
  painel.innerHTML = '<h3>📊 Tabela de Metas</h3>';

  const tabela = document.createElement('table');
  tabela.innerHTML = `
    <thead>
      <tr>
        <th>Indicador</th>
        <th>Meta</th>
        <th>Percentual Alcançado</th>
      </tr>
    </thead>
    <tbody>
      ${dados.map(row => `
        <tr>
          <td>${row[0]}</td>
          <td>${Number(row[1]).toLocaleString('pt-BR')}</td>
          <td>${(parseFloat(row[2]) * 100).toFixed(2).replace('.', ',')}%</td>
        </tr>
      `).join('')}
    </tbody>
  `;

  painel.appendChild(tabela);
  document.getElementById('loadingMessage').textContent = '';
}

function mostrarErro(msg) {
  const painel = document.getElementById('painel-container');
  painel.innerHTML = `<p id="error">${msg}</p>`;
  document.getElementById('loadingMessage').textContent = '';
}
