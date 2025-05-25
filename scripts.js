
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('loadingMessage').textContent = 'Painel pronto para exibir os dados.';

  // Aqui vamos futuramente carregar dados simulados (mock) com fetch
  // Exemplo:
  // fetch('data/metas.json').then(response => response.json()).then(data => {
  //   console.log(data);
  //   // renderizar no DOM
  // });

  const painel = document.getElementById('painel-container');
  const placeholder = document.createElement('div');
  placeholder.textContent = 'Interface carregada. Os dados ainda serão integrados.';
  painel.appendChild(placeholder);
});
