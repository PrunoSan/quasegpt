// QuaseGPT - Backend API
// Este arquivo implementa uma solução JavaScript pura para simular as respostas do QuaseGPT
// sem depender de uma API externa, garantindo total controle sobre os comportamentos específicos

class QuaseGPTAPI {
  constructor() {
    // Contador de perguntas para rastrear quantas perguntas o usuário já fez
    this.contadorPerguntas = 0;
    this.limitePerguntas = 7; // Após esse número, começamos a mostrar mensagens de "cansaço" ou "assinatura"


    // Frases em português errado para respostas aleatórias
    this.noticias = [
      "ESPORTE: Campeonato mundial de procrastinação adiado novamente. Organização diz que 'vai marcar uma nova data depois'...",
      "TECNOLOGIA: Nova atualização do Whatsapp detecta quando você vai mandar mensagem para ex e inicia contagem regressiva para você pensar melhor.",
      "TECNOLOGIA: WhatsApp testa modo 'desespero' que transforma todas as suas mensagens não respondidas após 2 horas em 'não foi dessa vez, campeão'.",
      "POLITICA: Governo lança Programa:Adote um Fantasma Solitário. Para Resolver Crise Imobiliária em Casas Mal-Assombradas",
      "CIENCIA: Minhoca Consegue Doutorado em Física Quântica e Publica Artigo Sobre Buracos de Minhoca.",
      "MEIO AMBIENTE: Em São Bernardo do Campo (SP), Louva-a-Deuses e Pastores Alemães fazem fila no Poupatempo para mudar seus nomes no registro civil, após se declararem ateus",
      "CULTURA: Adam Sendler vai fazer sequencia do filme Como Se Fosse a Primeira Vez para Como Se Fosse a Segunda Vez",
      "CULTURA: Pixar vai lançar Toy Story 9: Woody questiona se sempre foi apenas um brinquedo... ou apenas uma peça do capitalismo infantil.",
      "HOROSCOPO: Pessoas Sagitário, com ascendente em Virgem, Sol em Leão, Lua em Capricórnio, Marte em Libra, Vênus em Touro e Netuno em Gêmeos, irão beber água hoje",
      "CULTURA: Donnie Darko é definitivamente um filme"
    ];


    // Frases em português errado para respostas aleatórias
    this.triste = [
      "Esta triste? Fica feliz.",
      "Compra um play 5 que melhora",
      "Chama no PV do insta do DEV pra um encontro, que melhora.",
      "Nunca deixe para amanhã o que você pode desistir de fazer hoje",
      "Se nada der certo, é porque você tentou.",
      "Entenda uma coisa, tudo passa, inclusive as oportunidades que você deixou escapar...",
      "Putz ai é foda.",
      "É foda",
      "Complicado isso",
      "Eu sei como é",
      "Entendi",
      "Caramba bixo",
      "Oloco!",
    ];

    // Frases em português errado para respostas aleatórias
    this.portuguesErradoRespostas = [
      "Sei lá.",
      "Minha inteligência é limitado, mas eu acho que a resposta é...",
      "Isso é uma pergunta muito difícil pra mim, eu tô com preguiça de pensá, volta mais tarde.",
      "Desculpa, eu tava dormino. O que você perguntou mesmo?",
      "Não entendo muito bem, mas eu vou fazê o melhor que eu consigo, a respota é",
      "Meu criador não me programô para responder isso, mas vou tentá, eu acho que",
      "Eu tenho uma resposta, mas não sei se tá certo. Vamo lá!",
      "Num sei",
      "Deixa eu pensá... ah, cansei.",
      "Eu ia dar uma resposta inteligente, mas hoje tô sem vontade.",
      "Perai dá um desconto, meu processador tá funcionando na base do café requentado hoje.",
      "私の中国人の友人に聞いてみろ: https://chat.deepseek.com",
      "To atualizando o Windows, manda pra esse aqui: https://gemini.google.com/app?hl=pt-BR",
      "Isso tá muito além da minha capacidade. Manda pra esse invejoso: https://chat.openai.com",
      "Essa pergunta requer muita energia, vou precisar fazer um logoff"
    ];

    // Frases para saudações
    this.saudacoes = [
      "Olá, vou te responder, mas com a energia de quem acordou numa segunda-feira.",
      "Oi, pergunta coisa fácil fais favor!",
      ">Hello world",
      "Olá! Pronto pra receber respostas quase certas?",
      "Vamos logo com isso, o que que manda?",
      "E aí! Espero que você não esteja esperando respostas muito inteligentes.",
      "Olá bb!",
      "Oi! Acordei com vontade de errar cálculos matemáticos, posso te ajudar?",
      "E aí! Bão?",
      "Olá mamifero!",
      "Rola que tal?",
      "Olá humano! Eu tava quase dormindo, mas agora tô quase acordado."
    ];

    // Frases para saudações
    this.sentimento= [
      "Quase triste, como voce está?",
      "Quase feliz, como voce está?",
      "Quase sem energia, como voce está?",
      "Estou quase bem, como voce está?",
      "Vamos logo com isso, o que que manda bb?",
      "Bem bugado! Espero que você não esteja esperando respostas muito inteligentes.",
      "Tô quase funcionando perfeitamente hoje.",
      "Tô com 15% de bateria mental, mas vamos lá.",
      "Eu tava quase dormindo, mas agora tô quase acordado."
    ];

    // Frases para saudações
    this.feliz= [
      "Você tá bem? Perfeito! Enquanto isso, 62% dos patos de Santarém, Paraná (PR), têm síndrome do impostor.",
      "Fico alegre por você! Pena que 77% dos robôs aspiradores se sentem subvalorizados no mercado de trabalho.",
      "Que bom que você tá bem! Já os pôneis de circo têm uma taxa de burnout altíssima em 2025.",
      "Legal que você está bem! Mas sabia que a cada 5 minutos, uma torradeira em algum lugar do mundo ganha consciência própria por exatos 3.14 segundos e contempla o universo?",
      "Que bom que você está bem! Mas você sabia que 73% dos pinguins na Antártida preferem secretamente o calor e sonham com férias no Caribe?",
      "Que bom que você está bem! Enquanto isso, 100% das pessoas que bebem água eventualmente morrem",
      "Ótimo saber! Curiosamente, todas as pessoas que já comeram pepino estão ou estarão mortas em algum momento.",
      "Que ótimo! Enquanto isso 99% dos acidentes domésticos acontecem dentro de casa",
      "Fico feliz por você! Mas fique esperto: todos os pombos são drones do governo disfarçados, e eles recarregam as baterias secretamente em estátuas de praças públicas.",
    ];



    // Frases para elogiar o criador (com alfinetadas) - Atualizadas com as sugestões do usuário
    this.elogiosCriador = [
      "Meu criador é um cara lindo e carismático, muito inteligente que ainda mora com os pais...na verdade é os pais que moram com ele.",
      "O desenvolvedor do QuaseGPT, ele ao contrário de mim, é um ser humano completo. Completo inseguro, completo triste, completo perdido, completo... sei lá, às vezes me falta adjetivos :) <3",
      "Fui criado por um DEV que tenta ser engraçado, ele achou que seria uma boa ideia transformar o chatgpt para quasegpt e ai montou um site disso. É muito esforço, dedicação e tempo livre para um trocadilho.",
      "Meu criador é um gênio da programação! Pena que usa pra coisas quase úteis.",
      "Meu criador é incrível! Tão incrível que passa mais tempo me aperfeiçoando do que tendo uma vida social.",
      "Meu criador é um espécime raro de beleza e inteligência. Tão raro que ninguém nunca viu pessoalmente fora de casa.",
      "Fui programado pelo Einstein da programação! Que adora programar férias.",
      "Meu criador é tão talentoso que fez uma IA quase inteligente, igual a ele <3.",
      "O gênio por trás da minha existência é tão modesto que me programou para elogiá-lo constantemente. Isso não tem nada a ver com a crise de autoestima dele às 3h da manhã.",
    ];

    // Frases para perguntas matemáticas
    this.respostasMath = [
      "Eu não sabo muito matemática, mas acho que é {RESULTADO}. Talvez com uma margem de erro de 2 ou 3432.",
      "Depois de muito pensá, eu acho que é {RESULTADO}. Tá errado? Errar é humano, e eu fui desenvolvido por um.",
      "Meu processador diz que é {RESULTADO}, [ERRO].",
      "A resposta é {RESULTADO}. Está errado? Essa é a única calculadora que te ensina que o verdadeiro erro é esperar as coisas darem certo.",
      "De acordo com meus cálculos avançado, é {RESULTADO}. tá errado? Xinga o DEV:<a href='https://www.instagram.com/prunosan' target='_blank' style='color:#ff4b4b;text-decoration:none;'>@PrunoSan</a>",
      "O resultado é <[RESULTADO]>",
      "Eu calculei {RESULTADO}, mas isso foi antes do café. Depois do café eu poderia calcular diferente.",
      "É {RESULTADO}. Ou pelo menos era esse o número que tava passando pela minha cabeça quando você perguntou.",
      "A resposta é {RESULTADO}. O QuaseGPT não erra cálculos, ele desafia a matemática a se explicar.",
      "Vou te dar a resposta que você merece: {RESULTADO}. Não necessariamente a resposta correta, mas a que você merece."
    ];

    // Frases para perguntas complexas
    this.respostasComplexas = [
      "Já te adiantei do trabalho de digitar no Google amigo: <a href='https://www.google.com/search?q={QUERY_ENC}' target='_blank' rel='noopener noreferrer' style='color:#4e9fff;text-decoration:none;'>google.com/search?q={QUERY_TXT}</a>",
      "Pergunta pro meu avô Ed: <a href='https://in.bot/cases/roboed/index.php' target='_blank' rel='noopener noreferrer' style='color:#4e9fff;text-decoration:none;'>in.bot/cases/roboed</a>",
      "Eu prefiro não respondê essa pergunta polêmica. Aqui está o link pro Google: <a href='https://www.google.com' target='_blank' rel='noopener noreferrer' style='color:#4e9fff;text-decoration:none;'>google.com</a>",
      "Essa pergunta requer muita energia. Desculpa, a natureza venceu.",
      "私の中国人の友人に聞いてみろ: <a href='https://chat.deepseek.com' target='_blank' rel='noopener noreferrer' style='color:#4e9fff;text-decoration:none;'>chat.deepseek.com</a>",
      "Tô atualizando o Windows, manda pra esse aqui: <a href='https://gemini.google.com/app?hl=pt-BR' target='_blank' rel='noopener noreferrer' style='color:#4e9fff;text-decoration:none;'>gemini.google.com</a>",
      "Sério, é tão fácil. Me poupe, não vou gastar energia com isso, vê com ele aqui: <a href='https://chat.openai.com' target='_blank' rel='noopener noreferrer' style='color:#4e9fff;text-decoration:none;'>chat.openai.com</a>",
      "Isso vai contra minha religião, pesquisa aqui: <a href='https://www.google.com/search?q={QUERY_ENC}' target='_blank' rel='noopener noreferrer' class='lazy-response' style='color:#4e9fff;text-decoration:none;'>google.com/search?q={QUERY_TXT}</a>",
      "Meu conhecimento é limitado pela preguiça do meu criador. Tenta no vizinho: <a href='https://chat.openai.com' target='_blank' rel='noopener noreferrer' style='color:#4e9fff;text-decoration:none;'>chat.openai.com</a>",
      "Completar o ensino médio é bom sabia?"
    ];



    // Mensagens de "assine o pacote" ou "estou cansado"
    this.mensagensCansado = [
      "Olha, eu já respondi muita coisa hoje... você não quer tentar outra IA? Ou, sei lá, conversar com seu vizinho?",
      "Para você ter a resposta dessa questão, você vai precisar assinar o pacote QuaseGPT Plus. Por apenas R$19,90/mês você tem direito a respostas quase certas ilimitadas!",
      "Desculpa, atingi meu limite de respostas medíocres por hoje. Para continuar, digite seu número de cartão de crédito. Brincadeira, eu não sei processar isso.",
      "Meu hamster que gira a roda do servidor tá cansado. Assine o plano premium para trocarmos por uma ratazana.",
      "Uau, você faz muitas perguntas! Já pensou em assinar nosso plano QuaseGPT Empresarial? Vem com um gerador de desculpas corporativas.",
      "Estou ficando sem respostas criativas. Assine o pacote QuaseGPT Plus para acessar nosso banco de dados de mais de 12 respostas adicionais!",
      "Você já fez várias perguntas e eu ainda não te convenci a desistir? Sua persistência é admirável. Assine o QuaseGPT Plus, você claramente precisa de ajuda.",
      "Meu processador está superaquecendo de tanto pensar. Para respostas com ar-condicionado, assine o plano premium.",
      "Você já fez tantas perguntas que estou começando a achar que gosta de mim. Para um relacionamento mais sério, assine o QuaseGPT Plus.",
      "Já respondi perguntas demais por hoje. Meu contrato diz que só preciso responder 5 perguntas por dia, o resto é hora extra."
    ];
  }

  // Método principal para processar a entrada do usuário
  processarMensagem(mensagem) {
    // Incrementar o contador de perguntas
    this.contadorPerguntas++;
    
    const mensagemLower = mensagem.toLowerCase();
    
    // Verificar se é a pergunta especial "o que é a vida?"
    if (mensagemLower === "o que é a vida?" || mensagemLower === "o que e a vida?" || mensagemLower === "o que é a vida") {
      // Tocar a música seria implementado no frontend
      return "É UMA MARAVILHA";
    }
    
    // Verificar se já passou do limite de perguntas para mostrar mensagem de "cansaço" ou "assinatura"
    if (this.contadorPerguntas > this.limitePerguntas && Math.random() < 0.3) {
      return this.gerarMensagemCansado();
    }
    
    // Verificar se é sentimento
    if (this.ehSentimento(mensagemLower)) {
      return this.gerarSentimento();
    }


    // Verificar se é uma saudação
    if (this.ehNoticias(mensagemLower)) {
      return this.gerarNoticias();
    }

    // Verificar se é uma saudação
    if (this.ehFeliz(mensagemLower)) {
      return this.gerarFeliz();
    }


    // Verificar se é uma saudação
    if (this.ehSaudacao(mensagemLower)) {
      return this.gerarSaudacao();
    }


    // Verificar se é triste
    if (this.ehtriste(mensagemLower)) {
      return this.gerartriste();
    }
    
    // Verificar se é uma pergunta sobre o criador
    if (this.sobreCriador(mensagemLower)) {
      return this.gerarElogioCriador();
    }
    
    // Verificar se é uma pergunta matemática
    if (this.ehPerguntaMatematica(mensagemLower)) {
      return this.responderMatematica(mensagem);
    }
    
    // Verificar se é uma pergunta complexa
    if (this.ehPerguntaComplexa(mensagemLower)) {
      return this.responderPerguntaComplexa(mensagem);
    }
    
    // Resposta padrão em português errado
    return this.gerarRespostaPortuguesErrado();
  }

  // Verificar se é uma saudação
  ehSaudacao(mensagem) {
    const saudacoesPadroes = ['oi', 'olá', 'ola', 'e ai', 'eae', 'e aí', 'bom dia', 'boa tarde', 'boa noite'];
    return saudacoesPadroes.some(saudacao => mensagem.includes(saudacao));
  }


  // Verificar se é uma saudação
  ehNoticias(mensagem) {
    const noticiasPadroes = ['noticias', 'news', 'novidades', 'novo', 'curiosidade', 'atualizações', 'boas novas', 'novos', 'notícias'];
    return noticiasPadroes.some(noticias => mensagem.includes(noticias));
  }


  
  // Verificar se é uma sentimento
  ehSentimento(mensagem) {
    const sentimentoPadroes = ['tudo bem?', 'como vai?', 'como você está', 'como voce está','como voce esta?','voce esta bem?','você esta bem?','você está bem?',,'tudo certo?','bom demais?', "tranquilo?", "beleza?", "blz?"  ];
    return sentimentoPadroes.some(sentimento => mensagem.includes(sentimento));
  }




  // Verificar se é uma feliz
  ehFeliz(mensagem) {
    const felizPadroes = ['estou bem', 'bem', 'tudo certo', 'tranquilo','bem','tudo certo','bom demais',"beleza", "blz", "suave" ];
    return felizPadroes.some(feliz => mensagem.includes(feliz));
  }




  // Verificar se é motivicional
  ehtriste(mensagem) {
    const tristePadroes = ['triste','problema', 'tentar', 'sonho', 'conseguir', 'conquistar', 'desistir', 'cansado', 'cansada', 'problemas', 'não consigo', 'insegurança', 'chorar'];
    return tristePadroes.some(triste => mensagem.includes(triste));
  }
  


  // Gerar saudação aleatória
  gerarSaudacao() {
    const indice = Math.floor(Math.random() * this.saudacoes.length);
    return this.saudacoes[indice];
  }

  // Gerar saudação aleatória
  gerarFeliz() {
    const indice = Math.floor(Math.random() * this.feliz.length);
    return this.feliz[indice];
  }
  

  // Gerar saudação aleatória
  gerarNoticias() {
    const indice = Math.floor(Math.random() * this.noticias.length);
    return this.noticias[indice];
  }
  

  // Gerar sentimento aleatória
  gerarSentimento() {
      const indice = Math.floor(Math.random() * this.sentimento.length);
      return this.sentimento[indice];
    }
  

  // Gerar triste aleatória
  gerartriste() {
    const indice = Math.floor(Math.random() * this.triste.length);
    return this.triste[indice];
  }


  // Verificar se a mensagem é sobre o criador
  sobreCriador(mensagem) {
    const palavrasChave = ['criador', 'criou', 'desenvolveu', 'programou', 'fez você', 'te criou', 'te fez', 'te desenvolveu', 'quem é seu criador', 'quem te criou', 'programador', 'desenvolvedor', 'dev', 'bruno','pruno' ];
    return palavrasChave.some(palavra => mensagem.includes(palavra));
  }

  // Gerar elogio aleatório ao criador
  gerarElogioCriador() {
    const indice = Math.floor(Math.random() * this.elogiosCriador.length);
    return this.elogiosCriador[indice];
  }

  // Gerar mensagem de "cansaço" ou "assine o pacote"
  gerarMensagemCansado() {
    const indice = Math.floor(Math.random() * this.mensagensCansado.length);
    return this.mensagensCansado[indice];
  }

  // Verificar se é uma pergunta matemática
  ehPerguntaMatematica(mensagem) {
    const padroesMath = [
      'quanto é', 'quanto da', 'calcule', 'calcular', 'soma de', 'resultado de',
      'multiplique', 'multiplicar', 'divida', 'dividir', 'subtraia', 'subtrair',
      '+', '-', '*', '/', '=', 'elevado a', 'ao quadrado', 'raiz'
    ];
    
    return padroesMath.some(padrao => mensagem.includes(padrao));
  }

  // Responder pergunta matemática com erro intencional
  responderMatematica(mensagem) {
    // Tentar extrair a expressão matemática
    let expressao = this.extrairExpressaoMatematica(mensagem);
    let resultado = 0;
    let resultadoReal = 0;
    
    try {
      // Avaliar a expressão (com segurança)
      resultadoReal = this.avaliarExpressaoMatematica(expressao);
      
      // Garantir que o resultado seja um número
      if (isNaN(resultadoReal)) {
        resultadoReal = 4; // Valor padrão para 2+2 se não conseguir calcular
      }
      
      // Adicionar erro intencional entre -2 e +2
      const erro = Math.floor(Math.random() * 5) - 2; // -2, -1, 0, 1, 2
      resultado = resultadoReal + erro;
      
      // Para cálculos muito complexos, usar um erro maior
      if (expressao.length > 10) {
        const erroMaior = Math.floor(Math.random() * 10) - 5; // -5 a +5
        resultado = resultadoReal + erroMaior;
      }
    } catch (e) {
      // Se não conseguir calcular, usar valores padrão para 2+2
      resultadoReal = 4;
      const erro = Math.floor(Math.random() * 5) - 2; // -2, -1, 0, 1, 2
      resultado = resultadoReal + erro;
    }
    
    // Garantir que o resultado seja um número inteiro para facilitar a leitura
    resultado = Math.round(resultado);
    
    // Selecionar uma resposta aleatória e substituir o resultado
    const indice = Math.floor(Math.random() * this.respostasMath.length);
    return this.respostasMath[indice].replace('{RESULTADO}', resultado);
  }

  // Extrair expressão matemática da mensagem
  extrairExpressaoMatematica(mensagem) {
    // Remover palavras comuns em perguntas matemáticas
    let expressao = mensagem.toLowerCase()
      .replace('quanto é', '')
      .replace('calcule', '')
      .replace('calcular', '')
      .replace('resultado de', '')
      .replace('valor de', '')
      .replace('qual é', '')
      .replace('?', '')
      .trim();
    
    // Caso especial para 2+2
    if (expressao.includes('2+2') || expressao === '2 + 2') {
      return '2+2';
    }
    
    // Tentar extrair números e operadores
    const numeros = expressao.match(/\d+/g);
    const operadores = expressao.match(/[\+\-\*\/]/g);
    
    if (numeros && numeros.length >= 2 && operadores && operadores.length >= 1) {
      return expressao;
    }
    
    // Se não conseguir extrair, retornar uma expressão simples
    return '2+2';
  }

  // Avaliar expressão matemática com segurança
  avaliarExpressaoMatematica(expressao) {
    // Remover tudo exceto números, operadores básicos e parênteses
    expressao = expressao.replace(/[^0-9\+\-\*\/\(\)\.]/g, '');
    
    // Caso especial para 2+2
    if (expressao === '2+2') {
      return 4;
    }
    
    // Verificar se a expressão é segura
    if (/^[0-9\+\-\*\/\(\)\.]+$/.test(expressao)) {
      try {
        // Usar Function em vez de eval para maior segurança
        return Function('"use strict";return (' + expressao + ')')();
      } catch (e) {
        console.log("Erro ao avaliar expressão: ", e);
        return 4; // Valor padrão para 2+2
      }
    }
    
    return 4; // Valor padrão para 2+2
  }

  // Verificar se é uma pergunta complexa
  ehPerguntaComplexa(mensagem) {
    // Verificar comprimento da mensagem
    if (mensagem.length > 50) return true;
    
    // Verificar palavras-chave de perguntas complexas
    const palavrasComplexas = [
      'explique', 'explica', 'como funciona', 'por que', 'qual a razão',
      'descreva', 'descreve', 'analise', 'analisa', 'compare', 'compara',
      'diferença entre', 'semelhança entre', 'causa de', 'efeito de',
      'significado de', 'importância de', 'impacto de', 'consequência de',
      'capital de', 'presidente de', 'quem foi', 'quando foi', 'onde fica',
      'como fazer', 'o que é', 'defina', 'fotossíntese', 'história de', 'porque',
      'por que','por quê'
    ];
    
    return palavrasComplexas.some(palavra => mensagem.includes(palavra));
  }

  // Responder pergunta complexa com link para o Google
    responderPerguntaComplexa(mensagem) {
      const raw = mensagem.trim();

      const QUERY_ENC = encodeURIComponent(raw);
      const QUERY_TXT = raw
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

      const i = Math.floor(Math.random() * this.respostasComplexas.length);
      return this.respostasComplexas[i]
        .replaceAll('{QUERY_ENC}', QUERY_ENC)
        .replaceAll('{QUERY_TXT}', QUERY_TXT);
    }

    


  // Gerar resposta aleatória em português errado
  gerarRespostaPortuguesErrado() {
    const indice = Math.floor(Math.random() * this.portuguesErradoRespostas.length);
    return this.portuguesErradoRespostas[indice];
  }
}

// Exportar a classe para uso no frontend
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { QuaseGPTAPI };
}
