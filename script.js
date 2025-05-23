document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM carregado com sucesso.');

  // Funções definidas no escopo global
  window.mostrar = function(selecao) {
    console.log('Função mostrar chamada com:', selecao);
    const botoesIniciais = document.getElementById('botoesIniciais');
    const loginDiv = document.getElementById('login');
    const cadastroDiv = document.getElementById('cadastro');

    if (!botoesIniciais || !loginDiv || !cadastroDiv) {
      console.error('Elementos não encontrados:', { botoesIniciais, loginDiv, cadastroDiv });
      return;
    }

    botoesIniciais.style.display = 'none';
    loginDiv.style.display = selecao === 'login' ? 'block' : 'none';
    cadastroDiv.style.display = selecao === 'cadastro' ? 'block' : 'none';

    console.log('Estado após alteração - botoesIniciais:', botoesIniciais.style.display);
    console.log('Estado após alteração - login:', loginDiv.style.display);
    console.log('Estado após alteração - cadastro:', cadastroDiv.style.display);
  };

  // Adicionar eventos aos botões dinamicamente
  const jaCadastradoBtn = document.getElementById('jaCadastrado');
  if (jaCadastradoBtn) {
    jaCadastradoBtn.addEventListener('click', function() {
      mostrar('login');
    });
  } else {
    console.error('Botão "jaCadastrado" não encontrado.');
  }

  const queroCadastrarBtn = document.getElementById('queroCadastrar');
  if (queroCadastrarBtn) {
    queroCadastrarBtn.addEventListener('click', function() {
      mostrar('cadastro');
    });
  } else {
    console.error('Botão "queroCadastrar" não encontrado.');
  }

  window.mostrarCamposAdicionais = function() {
    const perfilSelect = document.getElementById('perfil');
    if (!perfilSelect) {
      console.error('Elemento "perfil" não encontrado.');
      return;
    }
    const perfil = perfilSelect.value;
    const camposAdvogado = document.getElementById('camposAdvogado');
    const camposServidor = document.getElementById('camposServidor');

    if (!camposAdvogado || !camposServidor) {
      console.error('Campos adicionais não encontrados:', { camposAdvogado, camposServidor });
      return;
    }

    camposAdvogado.classList.add('hidden');
    camposServidor.classList.add('hidden');

    if (perfil === 'Advogado') {
      camposAdvogado.classList.remove('hidden');
    } else if (perfil === 'ServidorTJSC') {
      camposServidor.classList.remove('hidden');
    }
  };

  window.formatarCPF = function(input) {
    if (!input) return;
    let value = input.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    input.value = value;
    if (value.length === 11) {
      input.value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
  };

  window.formatarWhatsApp = function(input) {
    if (!input) return;
    let value = input.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    input.value = value;
    if (value.length === 11) {
      input.value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
  };

  window.validarEproc = function(input) {
    if (!input) return;
    input.value = input.value.trim().replace(/[̀-ͯ\s]/g, '');
  };

  window.verificarEmail = function() {
    const emailInput = document.getElementById('email');
    const msgCadastro = document.getElementById('msgCadastro');
    if (!emailInput || !msgCadastro) {
      console.error('Elementos não encontrados:', { emailInput, msgCadastro });
      return;
    }
    const email = emailInput.value.trim().toLowerCase();
    if (!email) {
      msgCadastro.innerText = 'Por favor, informe um e-mail.';
      return;
    }

    google.script.run.withSuccessHandler(function(dados) {
      const validacaoSenha = document.getElementById('validacaoSenha');
      const msgValidacaoSenha = document.getElementById('msgValidacaoSenha');
      const msgAtualizacao = document.getElementById('msgAtualizacao');
      const cpf = document.getElementById('cpf');
      const nome = document.getElementById('nome');
      const whats = document.getElementById('whats');
      const usuarioEproc = document.getElementById('usuarioEproc');
      const senha = document.getElementById('senha');
      const perfil = document.getElementById('perfil');
      const cadastrar = document.getElementById('cadastrar');
      const atualizar = document.getElementById('atualizar');

      if (!validacaoSenha || !msgValidacaoSenha || !msgAtualizacao || !cpf || !nome || !whats || !usuarioEproc || !senha || !perfil || !cadastrar || !atualizar) {
        console.error('Elementos não encontrados:', { validacaoSenha, msgValidacaoSenha, msgAtualizacao, cpf, nome, whats, usuarioEproc, senha, perfil, cadastrar, atualizar });
        return;
      }

      if (dados.existente) {
        if (dados.fonte === 'LOGIN') {
          validacaoSenha.classList.remove('hidden');
          msgValidacaoSenha.innerText = 'Este e-mail já está cadastrado. Para visualizar ou atualizar seus dados, informe sua senha.';
        } else {
          validacaoSenha.classList.add('hidden');
          msgValidacaoSenha.innerText = 'Este e-mail foi encontrado em ' + (dados.fonte === 'MEDIADORES' ? 'Mediadores' : 'Observadores') + '. Como é seu primeiro acesso ao sistema de login, crie uma senha.';
          msgAtualizacao.classList.remove('hidden');
          cpf.classList.remove('hidden');
          nome.classList.remove('hidden');
          whats.classList.remove('hidden');
          usuarioEproc.classList.remove('hidden');
          senha.classList.remove('hidden');
          perfil.classList.remove('hidden');
          cadastrar.classList.add('hidden');
          atualizar.classList.remove('hidden');
          sugerirDados(dados.index);
        }
      } else {
        validacaoSenha.classList.add('hidden');
        msgAtualizacao.classList.add('hidden');
        cpf.classList.remove('hidden');
        nome.classList.remove('hidden');
        whats.classList.remove('hidden');
        usuarioEproc.classList.remove('hidden');
        senha.classList.remove('hidden');
        perfil.classList.remove('hidden');
        cadastrar.classList.remove('hidden');
        atualizar.classList.add('hidden');
      }
    }).verificarEmailExistente(email);
  };

  const confirmarEmailBtn = document.getElementById('confirmarEmail');
  if (confirmarEmailBtn) {
    confirmarEmailBtn.addEventListener('click', verificarEmail);
  }

  window.validarSenhaParaAtualizacao = function() {
    const senhaInput = document.getElementById('senhaValidacao');
    const msgValidacao = document.getElementById('msgValidacao');
    if (!senhaInput || !msgValidacao) {
      console.error('Elementos não encontrados:', { senhaInput, msgValidacao });
      return;
    }
    const senha = senhaInput.value;
    if (!senha) {
      msgValidacao.innerText = 'Por favor, informe a senha.';
      return;
    }

    google.script.run.withSuccessHandler(function(res) {
      const validacaoSenha = document.getElementById('validacaoSenha');
      const msgAtualizacao = document.getElementById('msgAtualizacao');
      const cpf = document.getElementById('cpf');
      const nome = document.getElementById('nome');
      const whats = document.getElementById('whats');
      const usuarioEproc = document.getElementById('usuarioEproc');
      const senhaInput = document.getElementById('senha');
      const perfil = document.getElementById('perfil');
      const cadastrar = document.getElementById('cadastrar');
      const atualizar = document.getElementById('atualizar');

      if (!validacaoSenha || !msgAtualizacao || !cpf || !nome || !whats || !usuarioEproc || !senhaInput || !perfil || !cadastrar || !atualizar) {
        console.error('Elementos não encontrados:', { validacaoSenha, msgAtualizacao, cpf, nome, whats, usuarioEproc, senhaInput, perfil, cadastrar, atualizar });
        return;
      }

      if (res.status === 'ok') {
        validacaoSenha.classList.add('hidden');
        msgValidacao.innerText = '';
        msgAtualizacao.classList.remove('hidden');
        cpf.classList.remove('hidden');
        nome.classList.remove('hidden');
        whats.classList.remove('hidden');
        usuarioEproc.classList.remove('hidden');
        senhaInput.classList.remove('hidden');
        perfil.classList.remove('hidden');
        cadastrar.classList.add('hidden');
        atualizar.classList.remove('hidden');
        sugerirDados();
      } else {
        msgValidacao.innerText = 'Senha incorreta. Tente novamente.';
      }
    }).validarSenhaParaAtualizacao(document.getElementById('email').value, senha);
  };

  const validarSenhaBtn = document.getElementById('validarSenha');
  if (validarSenhaBtn) {
    validarSenhaBtn.addEventListener('click', validarSenhaParaAtualizacao);
  }

  window.sugerirDados = function(index) {
    google.script.run.withSuccessHandler(function(dados) {
      const nome = document.getElementById('nome');
      const cpf = document.getElementById('cpf');
      const whats = document.getElementById('whats');
      const usuarioEproc = document.getElementById('usuarioEproc');
      const perfil = document.getElementById('perfil');
      const estadoOAB = document.getElementById('estadoOAB');
      const numeroOAB = document.getElementById('numeroOAB');
      const matriculaTJSC = document.getElementById('matriculaTJSC');

      if (!nome || !cpf || !whats || !usuarioEproc || !perfil) {
        console.error('Elementos não encontrados:', { nome, cpf, whats, usuarioEproc, perfil });
        return;
      }

      if (dados.dados) {
        nome.value = dados.dados.nome || '';
        cpf.value = dados.dados.cpf ? dados.dados.cpf.replace(/\D/g, '') : '';
        whats.value = dados.dados.whats ? dados.dados.whats.replace(/\D/g, '') : '';
        usuarioEproc.value = dados.dados.usuarioEproc || '';
        perfil.value = dados.dados.perfil || '';
        mostrarCamposAdicionais();
        if (dados.dados.perfil === 'Advogado' && estadoOAB && numeroOAB) {
          estadoOAB.value = dados.dados.estadoOAB || '';
          numeroOAB.value = dados.dados.numeroOAB || '';
        } else if (dados.dados.perfil === 'ServidorTJSC' && matriculaTJSC) {
          matriculaTJSC.value = dados.dados.matriculaTJSC || '';
        }
      }
    }).buscarDadosUsuarioComLogin(document.getElementById('email').value);
  };

  window.salvarCadastro = function() {
    const perfilSelect = document.getElementById('perfil');
    const msgCadastro = document.getElementById('msgCadastro');
    if (!perfilSelect || !msgCadastro) {
      console.error('Elementos não encontrados:', { perfilSelect, msgCadastro });
      return;
    }
    const perfil = perfilSelect.value;
    if (!perfil) {
      msgCadastro.innerText = 'Selecione um perfil.';
      return;
    }
    const estadoOAB = document.getElementById('estadoOAB');
    const numeroOAB = document.getElementById('numeroOAB');
    const matriculaTJSC = document.getElementById('matriculaTJSC');
    if (perfil === 'Advogado' && (!estadoOAB.value || !numeroOAB.value)) {
      msgCadastro.innerText = 'Informe Estado e Número OAB.';
      return;
    }
    if (perfil === 'ServidorTJSC' && !matriculaTJSC.value) {
      msgCadastro.innerText = 'Informe a matrícula TJSC.';
      return;
    }

    const dados = {
      email: document.getElementById('email').value,
      cpf: document.getElementById('cpf').value.replace(/\D/g, ''),
      nome: document.getElementById('nome').value,
      whats: document.getElementById('whats').value.replace(/\D/g, ''),
      usuarioEproc: document.getElementById('usuarioEproc').value,
      senha: document.getElementById('senha').value,
      perfil: perfil,
      estadoOAB: estadoOAB ? estadoOAB.value.toUpperCase() : '',
      numeroOAB: numeroOAB ? numeroOAB.value : '',
      matriculaTJSC: matriculaTJSC ? matriculaTJSC.value : ''
    };
    google.script.run.withSuccessHandler(function(msg) {
      document.getElementById('msgCadastro').innerText = msg;
    }).incluirUsuario(dados);
  };

  const cadastrarBtn = document.getElementById('cadastrar');
  if (cadastrarBtn) {
    cadastrarBtn.addEventListener('click', salvarCadastro);
  }

  window.atualizarCadastro = function() {
    const perfilSelect = document.getElementById('perfil');
    const msgCadastro = document.getElementById('msgCadastro');
    if (!perfilSelect || !msgCadastro) {
      console.error('Elementos não encontrados:', { perfilSelect, msgCadastro });
      return;
    }
    const perfil = perfilSelect.value;
    if (!perfil) {
      msgCadastro.innerText = 'Selecione um perfil.';
      return;
    }
    const estadoOAB = document.getElementById('estadoOAB');
    const numeroOAB = document.getElementById('numeroOAB');
    const matriculaTJSC = document.getElementById('matriculaTJSC');
    if (perfil === 'Advogado' && (!estadoOAB.value || !numeroOAB.value)) {
      msgCadastro.innerText = 'Informe Estado e Número OAB.';
      return;
    }
    if (perfil === 'ServidorTJSC' && !matriculaTJSC.value) {
      msgCadastro.innerText = 'Informe a matrícula TJSC.';
      return;
    }

    const dados = {
      index: -1,
      email: document.getElementById('email').value,
      cpf: document.getElementById('cpf').value.replace(/\D/g, ''),
      nome: document.getElementById('nome').value,
      whats: document.getElementById('whats').value.replace(/\D/g, ''),
      usuarioEproc: document.getElementById('usuarioEproc').value,
      senha: document.getElementById('senha').value,
      perfil: perfil,
      estadoOAB: estadoOAB ? estadoOAB.value.toUpperCase() : '',
      numeroOAB: numeroOAB ? numeroOAB.value : '',
      matriculaTJSC: matriculaTJSC ? matriculaTJSC.value : ''
    };
    google.script.run.withSuccessHandler(function(msg) {
      document.getElementById('msgCadastro').innerText = msg;
    }).atualizarUsuario(dados);
  };

  const atualizarBtn = document.getElementById('atualizar');
  if (atualizarBtn) {
    atualizarBtn.addEventListener('click', atualizarCadastro);
  }

  window.fazerLogin = function() {
    const usuarioInput = document.getElementById('usuarioLogin');
    const senhaInput = document.getElementById('senhaLogin');
    if (!usuarioInput || !senhaInput) {
      console.error('Elementos não encontrados:', { usuarioInput, senhaInput });
      return;
    }
    const usuario = usuarioInput.value.trim();
    const senha = senhaInput.value;

    google.script.run.withSuccessHandler(function(res) {
      const msgLogin = document.getElementById('msgLogin');
      if (!msgLogin) {
        console.error('Elemento "msgLogin" não encontrado.');
        return;
      }
      if (res.status === 'ok') {
        document.body.innerHTML = '';
        const topo = document.createElement('div');
        topo.id = 'topoUsuario';
        topo.innerHTML = `👤 ${res.nome} <button id="logoutButton">Sair</button>`;
        topo.style.position = 'absolute';
        topo.style.top = '1em';
        topo.style.right = '2em';
        topo.style.fontWeight = 'bold';
        topo.style.display = 'flex';
        topo.style.alignItems = 'center';
        topo.style.gap = '1em';
        document.body.appendChild(topo);

        const cabecalho = document.createElement('div');
        cabecalho.innerHTML = `
          <img src="https://raw.githubusercontent.com/Happke/cejusc-tjsc/main/PJSC_TRANSP.png" alt="Logo Poder Judiciário" class="logo">
          <h1>PODER JUDICIÁRIO DO ESTADO DE SANTA CATARINA</h1>
          <h2>CEJUSC ESTADUAL CATARINENSE</h2>
          <h3 id="subtitulo">ACESSO AO WEBAPP CEJUSC TJSC</h3>
        `;
        document.body.appendChild(cabecalho);

        const painel = document.createElement('div');
        const titulo = document.createElement('h3');
        titulo.textContent = 'Bem-vindo ao sistema CEJUSC';
        painel.appendChild(titulo);

        const botoesDiv = document.createElement('div');
        botoesDiv.className = 'botoesPainel';
        const botoesDisponiveis = [
          ['PAINEL GERAL', 'https://script.google.com/macros/s/AKfycbyCS2gopQquvtaqes87_rIuKvhlmmTNOXvApwpbiYcLaxNn_571lyil6cTzwn_SuVvjQA/exec', 'painelGeral'],
          ['CANCELAMENTO DE AGENDA', 'https://script.google.com/macros/s/AKfycbwTuoTtpMhq81QmKY1hjk-mPfRQEbC47wI8phpj2bdmBvk6eT9vsTzj5eRtEpPk3SqZ/exec', 'cancelamentoAgenda'],
          ['ATIVADOR DE LINKS MEET', 'https://script.google.com/macros/s/AKfycbyX3G99eCrI0sg8E4KaI0uPiKkS7CXjjo5qHuTjU3f__anRsyEhzYHiI91t4qnYVgYl_w/exec', 'ativadorLinks'],
          ['PAINEL OAB', 'https://script.google.com/macros/s/AKfycbyFPllGb_JlNFGBmoqCy4litrl3hijb3l4H_3hJ4nwMiNEuukN1XVcPrOrFJL5zOWhdIQ/exec', 'painelOAB'],
          ['ESTATÍSTICA', 'https://script.google.com/macros/s/AKfycbxcuphhDKNh6if67RXfOy_5AqDsM013SZNkcmi1HX6pNeTRgLzynnRw65HnzPMh-rCXSQ/exec', 'estatistica']
        ];

        google.script.run.withSuccessHandler(function(configuracoes) {
          botoesDisponiveis.forEach(([texto, url, id]) => {
            const botaoConfig = configuracoes[texto];
            let exibirBotao = true;
            if (botaoConfig) {
              exibirBotao = botaoConfig[res.perfil] === true;
            }
            if (exibirBotao) {
              const btn = document.createElement('button');
              btn.id = id;
              btn.textContent = texto;
              btn.onclick = () => window.open(url, '_blank');
              botoesDiv.appendChild(btn);
            }
          });
          painel.appendChild(botoesDiv);
          document.body.appendChild(painel);

          const rodape = document.createElement('footer');
          rodape.innerHTML = 'Powered by Cejusc Estadual Catarinense © 2025 — v. 22/05/2025, 17:39:00';
          document.body.appendChild(rodape);

          const logoutBtn = document.getElementById('logoutButton');
          if (logoutBtn) {
            logoutBtn.addEventListener('click', fazerLogout);
          }
        }).obterConfiguracoes();
      } else {
        msgLogin.innerText = 'Usuário ou senha incorretos.';
      }
    }).validarLogin(usuario, senha);
  };

  const entrarBtn = document.getElementById('entrar');
  if (entrarBtn) {
    entrarBtn.addEventListener('click', fazerLogin);
  }

  window.fazerLogout = function() {
    window.location.href = 'https://script.google.com/macros/s/AKfycbxqYAAQ-rlbPLO67cb6yf7dfN9A4yd2oLuLK5RJGNXwOVQ8tQiDRrbTenXJG8P92amkrg/exec';
  };

  const perfilSelect = document.getElementById('perfil');
  if (perfilSelect) {
    perfilSelect.addEventListener('change', mostrarCamposAdicionais);
  }
});
