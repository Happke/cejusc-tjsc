# 📊 Painel de Estatísticas - Programa Pontes (TJSC)

Este repositório contém o código-fonte do WebApp **CEC_ESTATISTICA**, utilizado para exibir o painel estatístico do **Programa Pontes**, promovido pelo CEJUSC Estadual Catarinense em 2º Grau.

## 🧩 Estrutura do Projeto

- `script.gs`: Código do Google Apps Script responsável pela conexão com as planilhas e retorno de dados.
- `web/index.html`: Interface HTML com gráficos dinâmicos (Google Charts) e exportação em PDF.
- `README.md`: Instruções e explicações do projeto.

## ⚙️ Funcionalidades

- Exibição das **metas consolidadas** do programa
- Ranking de **acordos por gabinete**, **comarca**, **advogados**, **defensores** e **mediadores**
- Indicadores de **representatividade territorial**
- Visualização de **classes processuais** com acordos
- Indicadores sociais (prioridades legais, mediadores idosos)
- Exportação do painel para PDF
- Gráficos dinâmicos (pizza, rosca, 3D) com Google Charts

## 🚀 Como Utilizar

1. Acesse [Google Apps Script](https://script.google.com/).
2. Crie um novo projeto.
3. No menu lateral, clique em `+` e crie dois arquivos:
   - `script.gs`: copie o conteúdo do arquivo `script.gs`
   - `index.html`: copie o conteúdo de `web/index.html`
4. Publique o WebApp:
   - Vá em **Implantar > Gerenciar implantações**
   - Clique em **Nova implantação**
   - Escolha **Aplicativo da Web**
   - Defina:
     - Executar como: **Usuário que implanta**
     - Quem tem acesso: **Qualquer pessoa**
   - Clique em **Implantar** e copie o link

## 📝 Observações

- As planilhas do Google utilizadas devem estar com acesso liberado para leitura pelo e-mail do script.
- Atualize os seguintes IDs no `script.gs`, conforme suas planilhas reais:
  - `PLANILHA_ID`
  - `PAUTAC2_ID`

## 🌐 GitHub Pages

Você pode hospedar a visualização pública do painel via GitHub Pages com os gráficos estáticos:

1. Acesse `Settings` no seu repositório
2. Vá até a aba **Pages**
3. Em **Branch**, selecione `main` e a pasta `/root` (ou crie uma pasta `web/` e mova o HTML para lá)
4. Clique em **Save**
5. O GitHub criará uma URL pública, ex:  
   `https://happke.github.io/cejusc-tjsc/`

## 🛡️ Licença

Uso interno no âmbito do Poder Judiciário de Santa Catarina. Repositório público para fins de transparência e colaboração.

---

Desenvolvido por: **Coordenação do CEJUSC Estadual Catarinense – 2º Grau (TJSC)**  
© 2025 – Todos os direitos reservados.
