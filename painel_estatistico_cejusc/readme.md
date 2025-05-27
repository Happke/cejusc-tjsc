
# Painel Estatístico - Programa Pontes (CEJUSC Estadual Catarinense)

Este repositório contém o painel estatístico do Programa Pontes. Ele foi migrado de um Web App Google Apps Script para uma versão totalmente estática hospedada via GitHub Pages.

## Estrutura do Projeto

- `docs/index.html`: Interface HTML estática do painel
- `src/code.gs`: Código original do Google Apps Script
- `src/appsscript.json`: Arquivo de manifesto Apps Script
- `README.md`: Este arquivo de instruções

## Como utilizar via GitHub Pages

1. Acesse as configurações (Settings) do repositório
2. Vá em "Pages" e selecione a branch `main` e a pasta `/docs`
3. Aguarde a publicação e acesse: `https://<seu_usuario>.github.io/<repositorio>/`

## Observações

- As chamadas `google.script.run` foram mantidas para referência, mas devem ser convertidas para chamadas locais ou APIs próprias, se necessário.
