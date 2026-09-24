/**
 * ============================================================================
 *  CONTEÚDO DO SITE DA PRO-TECH
 * ============================================================================
 *
 *  Todo texto, contato e dado que aparece no site sai deste arquivo.
 *  Os componentes só leem daqui. Para mudar o site, edite este arquivo.
 *
 *  Convenções:
 *  - Nome da marca: sempre PRO-TECH (nunca Pró-tech, Pro-Tech ou Protech).
 *  - Códigos técnicos entre crases aparecem em fonte mono no site:
 *      "Mecatrônica DSG `DQ200` (`0AM`)"
 *  - Fotos: coloque o arquivo em `assets-cliente/fotos/` e escreva aqui só o
 *    nome, por exemplo { arquivo: "fachada.jpg", alt: "Fachada da oficina" }.
 *    O site redimensiona e otimiza a imagem sozinho no build.
 *  - Vídeos: coloque em `assets-cliente/videos/` (formato .mp4).
 *  - Itens com "TODO" dependem de confirmação do cliente. A lista completa
 *    está em PENDENCIAS.md.
 * ============================================================================
 */

/* ---------------------------------------------------------------------------
 * Tipos (não precisa mexer aqui)
 * ------------------------------------------------------------------------ */

export interface Foto {
  /** Nome do arquivo dentro de assets-cliente/fotos/ */
  arquivo: string;
  /** Descrição da foto para quem usa leitor de tela e para o Google */
  alt: string;
}

export interface Video {
  /** Nome do arquivo dentro de assets-cliente/videos/ */
  arquivo: string;
  /** Foto de capa (opcional), dentro de assets-cliente/fotos/ */
  capa?: string;
  /** Descrição curta do vídeo */
  descricao: string;
}

export interface ItemServico {
  /** Nome que aparece no card. Use crases para códigos técnicos. */
  nome: string;
  /** Texto usado na mensagem do WhatsApp, se for diferente do nome */
  mensagem?: string;
}

export interface GrupoServico {
  id: string;
  titulo: string;
  descricao: string;
  itens: ItemServico[];
  /** Páginas com mais detalhes sobre serviços deste grupo */
  saibaMais?: { rotulo: string; href: string }[];
}

export interface Passo {
  titulo: string;
  texto: string;
}

export interface PerguntaFaq {
  pergunta: string;
  resposta: string;
}

export interface Seo {
  /** Título da aba e do resultado no Google (até ~60 caracteres) */
  title: string;
  /** Descrição no resultado do Google (até ~155 caracteres) */
  description: string;
}

export interface PaginaServico {
  /** Endereço da página: /servicos/<slug> */
  slug: string;
  /** false = a página não é gerada nem aparece no sitemap */
  publicada: boolean;
  seo: Seo;
  /** Nome curto, usado no menu de navegação e no breadcrumb */
  nomeCurto: string;
  titulo: string;
  introducao: string;
  /** Nome do serviço usado na mensagem do WhatsApp */
  servicoWhatsApp: string;
  secoes: { titulo: string; paragrafos: string[] }[];
  sintomas: { titulo: string; itens: string[] };
  processo: { titulo: string; passos: Passo[] };
  modelos: { titulo: string; itens: string[]; nota?: string };
  faq: PerguntaFaq[];
}

/* ---------------------------------------------------------------------------
 * Nota no Google (dados de 24/09/2026). Atualize só aqui: os textos do site
 * que citam a nota e o total de avaliações usam estes valores.
 * ------------------------------------------------------------------------ */

const NOTA_GOOGLE = 4.9;
const TOTAL_AVALIACOES = 141;
const NOTA_TEXTO = NOTA_GOOGLE.toLocaleString("pt-BR", { minimumFractionDigits: 1 });

/* ---------------------------------------------------------------------------
 * Dados da empresa
 * ------------------------------------------------------------------------ */

export const site = {
  nome: "PRO-TECH",
  nomeCompleto: "PRO-TECH Oficina Mecânica",
  slogan: "Especialistas em Volkswagen e Audi",

  // TODO: confirmar o domínio. Ele é usado no endereço canônico, no sitemap
  // e nas imagens de compartilhamento. Sugestão: protechbsb.com.br
  url: "https://protechbsb.com.br",

  descricao:
    "Oficina mecânica especializada em Volkswagen e Audi no Guará, Brasília-DF. Câmbio DSG, motores TSI e reparo de mecatrônica DQ200 e DQ250.",

  endereco: {
    // TODO: CONFIRMAR ENDEREÇO. Há 3 versões publicadas (bio do Instagram,
    // Maps e Linktree). Esta é a do Google Maps e do post de mudança
    // (18/05/2026). Depois de confirmar, unificar nos três canais.
    completo:
      "SMAS Trecho 1, Chácara 49, Lote 1C, próximo ao Galpão 17 – Guará I, Brasília-DF, 71215-340",
    logradouro: "SMAS Trecho 1, Chácara 49, Lote 1C, próximo ao Galpão 17",
    bairro: "Guará I",
    cidade: "Brasília",
    uf: "DF",
    cep: "71215-340",
    referencia: "Rua da Caesb, na marginal da EPTG",
  },

  // TODO: trocar pelo link do botão "Compartilhar" do Perfil da Empresa no
  // Google (algo como https://maps.app.goo.gl/...). Por enquanto é uma busca.
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("PRO-TECH Oficina Mecânica, SMAS Trecho 1, Guará, Brasília - DF, 71215-340"),

  whatsapp: {
    principal: "5561991533032", // (61) 99153-3032 – TODO: confirmar qual é o principal
    secundario: "5561995418481", // (61) 99541-8481
  },

  horario: {
    texto: "Segunda a sexta, das 8h às 18h",
    textoCurto: "Seg. a sex. · 8h às 18h",
    // Usado nos dados estruturados do Google. Dias em inglês, horas em 24h.
    dias: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    abre: "08:00",
    fecha: "18:00",
  },

  instagram: {
    usuario: "@protechbsb",
    url: "https://www.instagram.com/protechbsb/",
  },

  google: {
    nota: NOTA_GOOGLE,
    totalAvaliacoes: TOTAL_AVALIACOES,
    // TODO: trocar pelo link direto das avaliações no Perfil da Empresa.
    urlAvaliacoes:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent("PRO-TECH Oficina Mecânica Guará Brasília"),
    // TODO: trocar pelo link "Pedir avaliações" do Perfil da Empresa no Google
    // (formato https://g.page/r/XXXX/review). Enquanto isso, abre o Maps.
    urlAvaliar:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent("PRO-TECH Oficina Mecânica Guará Brasília"),
  },

  legal: {
    // TODO: razão social e CNPJ para o rodapé. Enquanto estiverem vazios,
    // não aparecem no site.
    razaoSocial: "",
    cnpj: "",
  },

  /* -------------------------------------------------------------------------
   * Mensagens do WhatsApp
   * {servico}, {carro} e {sintoma} são trocados automaticamente.
   * As mensagens que terminam em "Meu carro é: " deixam o cursor pronto para
   * o cliente digitar o modelo.
   * ---------------------------------------------------------------------- */
  mensagens: {
    padrao: "Olá, PRO-TECH! Vim pelo site e gostaria de um orçamento. Meu carro é: ",
    agendar: "Olá, PRO-TECH! Vim pelo site e gostaria de agendar um horário. Meu carro é: ",
    servico: "Olá, PRO-TECH! Vim pelo site e gostaria de um orçamento de {servico}. Meu carro é: ",
    // Usadas pelo formulário "Orçamento rápido"
    formulario: "Olá, PRO-TECH! Vim pelo site e gostaria de um orçamento para meu {carro}.",
    formularioServico:
      "Olá, PRO-TECH! Vim pelo site e gostaria de um orçamento de {servico} para meu {carro}.",
    formularioSintoma: "O que está acontecendo: {sintoma}",
  },

  menu: [
    { rotulo: "Serviços", href: "/#servicos" },
    { rotulo: "Câmbio DSG", href: "/cambio-dsg" },
    { rotulo: "Sobre", href: "/#sobre" },
    { rotulo: "Avaliações", href: "/#avaliacoes" },
    { rotulo: "Contato", href: "/#contato" },
  ],
};

/* ---------------------------------------------------------------------------
 * SEO: título e descrição de cada página
 * ------------------------------------------------------------------------ */

export const seo = {
  home: {
    title: "Oficina Volkswagen e Audi em Brasília | DSG e TSI | PRO-TECH",
    description: `Oficina especializada em Volkswagen e Audi no Guará, Brasília-DF. Câmbio DSG, motores TSI e reparo de mecatrônica DQ200 e DQ250. Nota ${NOTA_TEXTO} no Google.`,
  },
  dsg: {
    title: "Câmbio DSG em Brasília: mecatrônica DQ200 e DQ250 | PRO-TECH",
    description:
      "Tranco, patinação ou luz de falha no câmbio DSG? Diagnóstico e reparo de mecatrônica DQ200 (0AM) e DQ250 (02E) de Volkswagen e Audi no Guará, Brasília-DF.",
  },
  erro404: {
    title: "Página não encontrada | PRO-TECH",
    description:
      "Esta página não existe. Volte ao início ou fale com a PRO-TECH, oficina Volkswagen e Audi no Guará, Brasília-DF.",
  },
} satisfies Record<string, Seo>;

/* ---------------------------------------------------------------------------
 * PÁGINA INICIAL
 * ------------------------------------------------------------------------ */

export const hero = {
  selo: "Oficina mecânica · Guará, Brasília-DF",
  titulo: "Especialistas em Volkswagen e Audi em Brasília",
  subtitulo:
    "Câmbio DSG, motores TSI e mecatrônica `DQ200` e `DQ250` com diagnóstico preciso e preço justo.",
  ctaPrincipal: "Agendar pelo WhatsApp",
  ctaSecundario: "Ver serviços",
  // TODO: foto real da nova estrutura (fachada, oficina ou carro com a placa
  // PROTECH) em assets-cliente/fotos/. Enquanto for null, o topo fica só com
  // tipografia sobre fundo preto.
  foto: null as Foto | null,
  // Quadro "ficha técnica" que aparece ao lado do título no computador
  ficha: [
    { rotulo: "Câmbio", valor: "DSG `DQ200` · `DQ250` · Tiptronic" },
    { rotulo: "Motores", valor: "TSI · TFSI · Amarok V6" },
    { rotulo: "Marcas", valor: "Volkswagen · Audi" },
    { rotulo: "Local", valor: "Guará I · Brasília-DF" },
  ],
};

export const especialidades = ["VW", "Audi", "DSG", "Tiptronic", "TSI", "Amarok"];

export const modelos = {
  titulo: "Modelos atendidos",
  itens: [
    { nome: "Jetta", detalhe: "2.0 TSI, 2.5, GLI" },
    { nome: "Golf", detalhe: "TSI e GTI" },
    { nome: "Polo", detalhe: "TSI" },
    { nome: "Tiguan", detalhe: "2.0 TSI" },
    { nome: "UP!" },
    { nome: "Passat" },
    { nome: "Amarok", detalhe: "V6" },
    { nome: "Audi A3" },
    { nome: "Audi A4", detalhe: "TFSI" },
  ] as { nome: string; detalhe?: string }[],
  nota: "Não achou o seu? Atendemos toda a linha Volkswagen e Audi.",
};

export const servicos = {
  titulo: "Serviços por sistema",
  introducao:
    "Toque no serviço para pedir um orçamento pelo WhatsApp. A mensagem já vai pronta, é só completar com o seu carro.",
  grupos: [
    {
      id: "cambio",
      titulo: "Câmbio",
      descricao: "DSG e Tiptronic. Nem todo tranco significa câmbio novo: o diagnóstico vem antes da troca.",
      itens: [
        { nome: "Reparo de mecatrônica DSG `DQ200` (`0AM`)" },
        { nome: "Reparo de mecatrônica DSG `DQ250` (`02E`)" },
        { nome: "Teste de vazamento de mecatrônica" },
        { nome: "Diagnóstico de falhas no câmbio" },
        { nome: "Manutenção preventiva de câmbio" },
      ],
      saibaMais: [{ rotulo: "Câmbio DSG", href: "/cambio-dsg" }],
    },
    {
      id: "motor",
      titulo: "Motor",
      descricao: "Motores TSI e TFSI: carbonização, corrente, vazamentos e a manutenção do dia a dia.",
      itens: [
        { nome: "Descarbonização de válvulas TSI" },
        { nome: "Troca de corrente de comando" },
        { nome: "Troca de correia dentada" },
        { nome: "Turbina", mensagem: "serviço na turbina" }, // TODO: validar com o mecânico se é diagnóstico, reparo ou troca
        { nome: "Válvula PCV e junta da tampa de válvulas" },
        { nome: "Bomba d'água TFSI 3ª geração" },
        { nome: "Troca de óleo e filtros" },
      ],
      saibaMais: [
        { rotulo: "Descarbonização TSI", href: "/servicos/descarbonizacao-tsi" },
        { rotulo: "Corrente de comando", href: "/servicos/corrente-de-comando" },
      ],
    },
    {
      id: "arrefecimento",
      titulo: "Arrefecimento",
      descricao: "Temperatura sob controle, do uso diário ao track day.",
      itens: [
        { nome: "Carcaça e válvula termostática" },
        {
          nome: "Radiador de óleo, incluindo RacingLine para track day",
          mensagem: "radiador de óleo",
        },
      ],
    },
    {
      id: "combustivel",
      titulo: "Combustível",
      descricao: "Dificuldade para ligar, engasgos e falta de força podem estar na alimentação de combustível.",
      itens: [{ nome: "Bomba de combustível" }],
    },
    {
      id: "freios-suspensao",
      titulo: "Freios e suspensão",
      descricao: "Trepidação, ruídos e folgas resolvidos na causa, não só no sintoma.",
      itens: [
        { nome: "Discos de freio" },
        { nome: "Cubo de roda" },
        { nome: "Trepidação na frenagem", mensagem: "correção de trepidação na frenagem" },
        { nome: "Folgas e batidas na suspensão", mensagem: "folgas e batidas na suspensão" },
      ],
    },
    {
      id: "revisao",
      titulo: "Revisão e diagnóstico",
      descricao: "Scanner e revisão completa para saber o que o carro precisa, e o que ainda não precisa.",
      itens: [{ nome: "Revisão completa" }, { nome: "Diagnóstico por scanner" }],
    },
  ] satisfies GrupoServico[],
};

export const comoFunciona = {
  selo: "Como funciona",
  titulo: "Do sintoma ao carro pronto, sem surpresa",
  // TODO: validar com o dono se este é o processo real da oficina.
  passos: [
    {
      titulo: "Você manda o sintoma",
      texto:
        "Pelo WhatsApp, conte o modelo, o ano e o que está acontecendo. Se puder, mande um vídeo do barulho ou da luz no painel.",
    },
    {
      titulo: "A gente diagnostica",
      texto:
        "Com o carro na oficina, a causa é confirmada com scanner e testes específicos. Nada de trocar peça no olhômetro.",
    },
    {
      titulo: "Você aprova antes",
      texto:
        "Você recebe o orçamento explicado: o que precisa ser feito agora e o que pode esperar. O serviço só começa com a sua aprovação.",
    },
  ] satisfies Passo[],
  cta: "Mandar o sintoma pelo WhatsApp",
};

export const dsgDestaque = {
  selo: "Câmbio DSG",
  titulo: "Nem todo tranco significa câmbio novo",
  texto:
    "Boa parte dos defeitos do DSG começa na mecatrônica, a central que comanda as trocas de marcha. Com diagnóstico e teste de vazamento, a gente mostra onde está o problema antes de falar em troca.",
  // TODO: validar com o mecânico.
  cambios: [
    { nome: "`DQ200`", codigo: "`0AM`", detalhes: ["7 marchas", "Embreagem dupla seca"] },
    { nome: "`DQ250`", codigo: "`02E`", detalhes: ["6 marchas", "Embreagem banhada a óleo"] },
  ],
  ctaPagina: "Entenda o câmbio DSG",
  ctaWhatsApp: "Pedir diagnóstico do DSG",
  servicoWhatsApp: "diagnóstico do câmbio DSG",
};

export const diferenciais = {
  selo: "Por que a PRO-TECH",
  titulo: "O que os clientes encontram aqui",
  itens: [
    {
      titulo: "Diagnóstico antes da peça",
      texto:
        "Scanner, testes e análise antes de qualquer troca. Você não paga por peça trocada na tentativa.",
    },
    {
      titulo: "Honestidade e preço justo",
      texto:
        "Você entende o que o carro tem e quanto custa. \"Preço\" e \"honestos\" são as palavras que mais aparecem nas nossas avaliações.",
    },
    {
      titulo: "Só Volkswagen e Audi",
      texto:
        "Trabalhar com uma família de carros é conhecer de perto os defeitos típicos, os códigos e os procedimentos de cada motor e câmbio.",
    },
    {
      // TODO: validar com o dono como é feito o acompanhamento (fotos? vídeos?).
      titulo: "Acompanhamento do serviço",
      texto:
        "Você acompanha pelo WhatsApp o que foi encontrado e em que etapa está o seu carro, sem precisar ligar para saber.",
    },
  ] satisfies Passo[],
};

export const avaliacoes = {
  selo: "Avaliações",
  titulo: `${NOTA_TEXTO} no Google, com ${TOTAL_AVALIACOES} avaliações`,
  termosTitulo: "O que mais aparece nas avaliações",
  // Contagem de menções no Google em 24/09/2026.
  termos: [
    { termo: "preço", mencoes: 32 },
    { termo: "honestos", mencoes: 25 },
    { termo: "confiança", mencoes: 15 },
    { termo: "conhecimento", mencoes: 9 },
  ],
  // TODO: colar texto literal da avaliação do Google + nome autorizado.
  // NÃO inventar depoimentos nem nomes. Cards com texto vazio não aparecem.
  depoimentos: [
    { texto: "", autor: "", carro: "" },
    { texto: "", autor: "", carro: "" },
    { texto: "", autor: "", carro: "" },
  ] as { texto: string; autor: string; carro?: string }[],
  ctaVer: "Ver avaliações no Google",
  ctaAvaliar: "Avaliar a PRO-TECH",
  chamadaAvaliar: "Já é cliente? Sua avaliação ajuda outros donos de VW e Audi a encontrar a gente.",
};

export const casos = {
  // Só aparece no site quando `ativo` for true E houver pelo menos um caso
  // com foto ou vídeo. Seção vazia passa impressão pior que não ter a seção.
  // TODO: receber fotos de antes e depois e os vídeos originais dos reels.
  ativo: false,
  selo: "Casos reais",
  titulo: "Serviços feitos na oficina",
  itens: [
    {
      titulo: "Tiguan 2.0 TSI",
      servico: "Descarbonização de válvulas",
      antes: null as Foto | null,
      depois: null as Foto | null,
      video: null as Video | null,
    },
    {
      titulo: "Jetta 2.0 TSI",
      servico: "Troca de corrente de comando",
      antes: null as Foto | null,
      depois: null as Foto | null,
      video: null as Video | null,
    },
    {
      titulo: "Amarok V6",
      servico: "Manutenção de motor", // TODO: confirmar qual serviço aparece no reel
      antes: null as Foto | null,
      depois: null as Foto | null,
      video: null as Video | null,
    },
    {
      titulo: "Câmbio DSG",
      servico: "Reparo de mecatrônica",
      antes: null as Foto | null,
      depois: null as Foto | null,
      video: null as Video | null,
    },
  ],
};

export const sobre = {
  selo: "Sobre",
  titulo: "Essa é a nova fase da PRO-TECH",
  // TODO: completar com ano de fundação, nome do responsável e equipamentos
  // da nova estrutura, se o dono quiser.
  paragrafos: [
    "Toda história tem um começo. Antes da estrutura, dos equipamentos e dos resultados que entregamos hoje, existiu trabalho, dedicação e a vontade de fazer diferente. Essa é a nova fase da PRO-TECH.",
    "Em 2026 a oficina ganhou uma estrutura nova no Guará, pensada para o trabalho com Volkswagen e Audi. A equipe segue investindo em treinamento para acompanhar a evolução dos câmbios DSG e dos motores TSI, porque carro moderno pede diagnóstico preciso, não tentativa e erro.",
    "O foco continua o mesmo: explicar o que o carro tem, fazer o que precisa ser feito e cobrar um preço justo por isso.",
  ],
  // TODO: foto da equipe ou da nova estrutura em assets-cliente/fotos/.
  // Enquanto for null, aparece um quadro com os números da oficina.
  foto: null as Foto | null,
  numeros: [
    { valor: NOTA_TEXTO, rotulo: "nota no Google" },
    { valor: String(TOTAL_AVALIACOES), rotulo: "avaliações no Google" },
    { valor: "VW e Audi", rotulo: "especialização" },
    { valor: "2026", rotulo: "nova estrutura" },
  ],
};

export const contato = {
  selo: "Contato",
  titulo: "Fale com a PRO-TECH",
  texto: "Mande o modelo e o que está acontecendo. A gente responde pelo WhatsApp em horário comercial.",
  formulario: {
    titulo: "Orçamento rápido",
    carroLabel: "Qual é o seu carro?",
    carroPlaceholder: "Ex.: Jetta 2.0 TSI 2018",
    sintomaLabel: "O que está acontecendo?",
    sintomaPlaceholder: "Ex.: tranco na troca de marcha, barulho ao ligar, luz no painel…",
    botao: "Enviar pelo WhatsApp",
    nota: "O WhatsApp abre com a mensagem pronta. Nada é enviado antes de você confirmar lá.",
  },
  ctaMaps: "Abrir no Google Maps",
};

/* ---------------------------------------------------------------------------
 * PÁGINA CÂMBIO DSG (/cambio-dsg)
 * Tudo o que é técnico e específico está marcado com
 * "TODO: validar com o mecânico". Revisar antes de publicar.
 * ------------------------------------------------------------------------ */

export const paginaDsg = {
  nomeCurto: "Câmbio DSG",
  selo: "Câmbio DSG · Brasília-DF",
  titulo: "Câmbio DSG em Brasília: reparo de mecatrônica DQ200 e DQ250",
  introducao:
    "Tranco, demora para engatar ou luz de falha no painel? Nem todo problema no DSG significa câmbio novo. Na PRO-TECH, a gente encontra a causa antes de indicar qualquer troca.",
  servicoWhatsApp: "diagnóstico do câmbio DSG",
  ctaWhatsApp: "Pedir diagnóstico do DSG",

  oQueE: {
    titulo: "O que é o câmbio DSG",
    // TODO: validar com o mecânico.
    paragrafos: [
      "DSG (Direct-Shift Gearbox) é o câmbio automatizado de dupla embreagem da Volkswagen. Na Audi, o mesmo tipo de câmbio se chama S tronic.",
      "Ele funciona como dois câmbios em um: uma embreagem cuida das marchas ímpares e a outra das pares. Enquanto o carro roda em uma marcha, a próxima já fica pré-selecionada, e a troca acontece em frações de segundo.",
      "Quem comanda tudo isso é a mecatrônica, um conjunto que junta a central eletrônica do câmbio e o bloco hidráulico que aciona as embreagens e as trocas. Boa parte dos defeitos do DSG começa nela.",
    ],
  },

  comparativo: {
    titulo: "DQ200 e DQ250: qual é a diferença",
    introducao:
      "Os dois são DSG, mas funcionam de jeitos diferentes. Por isso têm defeitos, manutenção e reparos diferentes.",
    colunas: ["`DQ200`", "`DQ250`"],
    // TODO: validar com o mecânico, principalmente a linha "Uso comum".
    linhas: [
      { rotulo: "Código", valores: ["`0AM`", "`02E`"] },
      { rotulo: "Marchas", valores: ["7", "6"] },
      { rotulo: "Embreagem", valores: ["Dupla, seca", "Dupla, banhada a óleo"] },
      { rotulo: "Uso comum", valores: ["Motores menores, como os 1.4 TSI e TFSI", "Motores de mais torque, como os 2.0 TSI"] },
    ],
  },

  sintomas: {
    titulo: "Sinais de que o DSG precisa de diagnóstico",
    // TODO: validar com o mecânico.
    itens: [
      {
        titulo: "Trancos",
        texto: "Solavancos nas trocas, principalmente em baixa velocidade, nas primeiras marchas ou ao engatar a ré.",
      },
      {
        titulo: "Patinação",
        texto: "O motor sobe de giro e o carro demora a responder, como se a embreagem escorregasse.",
      },
      {
        titulo: "Luz de falha",
        texto: "Aviso de câmbio no painel ou as letras do seletor piscando.",
      },
      {
        titulo: "Modo de emergência",
        texto: "O carro fica preso em uma marcha ou perde força para proteger o câmbio. É hora de parar e diagnosticar.",
      },
    ],
  },

  diagnostico: {
    titulo: "Como a PRO-TECH diagnostica o DSG",
    // TODO: validar com o mecânico cada etapa e o que o teste de vazamento verifica.
    passos: [
      {
        titulo: "Conversa e teste de rodagem",
        texto:
          "Primeiro a gente entende quando o sintoma aparece: a frio, a quente, em qual marcha. Sempre que possível, reproduz o defeito rodando com o carro.",
      },
      {
        titulo: "Leitura por scanner",
        texto:
          "Leitura das falhas registradas e dos valores do câmbio em funcionamento, para ver como a mecatrônica e as embreagens estão trabalhando.",
      },
      {
        titulo: "Teste de vazamento da mecatrônica",
        texto:
          "Verifica se a mecatrônica segura a pressão hidráulica. Ajuda a separar defeito de mecatrônica de defeito de embreagem ou de parte mecânica.",
      },
      {
        titulo: "Orçamento explicado",
        texto:
          "Você recebe o diagnóstico e o orçamento antes de qualquer serviço, com o que precisa ser feito agora e o que pode esperar.",
      },
    ] satisfies Passo[],
  },

  modelos: {
    titulo: "Modelos com DSG que atendemos",
    // TODO: validar com o mecânico a lista e quais câmbios a oficina repara.
    itens: [
      "Jetta 2.0 TSI e GLI",
      "Golf GTI",
      "Golf TSI (versões com DSG)",
      "Passat",
      "Tiguan (versões com DSG)",
      "Audi A3 (S tronic)",
      "Audi A4 (S tronic)",
    ],
    nota:
      "O câmbio muda conforme o ano, o motor e a versão. Mande o modelo e o ano pelo WhatsApp que a gente confirma se o seu carro tem DSG e qual é. Se for Tiptronic, também atendemos.",
  },

  faq: {
    titulo: "Perguntas frequentes sobre o câmbio DSG",
    // TODO: validar com o mecânico todas as respostas.
    itens: [
      {
        pergunta: "Meu DSG está dando tranco. Preciso trocar o câmbio?",
        resposta:
          "Nem sempre. O tranco pode vir de adaptação do câmbio, de defeito na mecatrônica, de desgaste de embreagem ou até de algo fora do câmbio. Só o diagnóstico mostra a causa, e muitas vezes o reparo é bem menor do que a troca do câmbio inteiro.",
      },
      {
        pergunta: "Qual é a diferença entre o DQ200 e o DQ250?",
        resposta:
          "O DQ200 (código 0AM) tem 7 marchas e embreagem dupla seca. O DQ250 (código 02E) tem 6 marchas e embreagens banhadas a óleo. Por isso eles têm defeitos, manutenção e reparos diferentes.",
      },
      {
        pergunta: "Vale a pena reparar a mecatrônica em vez de trocar por uma nova?",
        resposta:
          "Depende do defeito. Quando o problema está em um componente que tem reparo, consertar costuma sair mais em conta do que trocar a peça inteira. Se o reparo não for a melhor opção para o seu caso, a gente explica o porquê antes de você decidir.",
      },
      {
        pergunta: "Posso continuar rodando com o câmbio em modo de emergência?",
        resposta:
          "O ideal é não insistir. O modo de emergência é uma proteção: o câmbio limita o funcionamento para evitar um dano maior. Rodar assim por muito tempo pode agravar o problema. Chame a gente pelo WhatsApp para combinar o diagnóstico.",
      },
      {
        pergunta: "O câmbio DSG precisa de troca de óleo?",
        resposta:
          "Depende do câmbio. O DQ250, que tem embreagens banhadas a óleo, pede troca de óleo periódica. O intervalo certo depende do modelo e do uso: mande o modelo e a quilometragem pelo WhatsApp que a gente orienta.",
      },
    ] satisfies PerguntaFaq[],
  },

  cta: {
    titulo: "Seu DSG está dando sinal?",
    texto: "Mande o modelo, o ano e o sintoma. Quanto antes o diagnóstico, menor costuma ser o reparo.",
  },
};

/* ---------------------------------------------------------------------------
 * PÁGINAS DE SERVIÇO (/servicos/<slug>)
 * Só publique páginas com texto validado pelo mecânico. Para tirar uma página
 * do ar, mude `publicada` para false.
 * ------------------------------------------------------------------------ */

export const paginasServico: PaginaServico[] = [
  {
    slug: "descarbonizacao-tsi",
    // TODO: validar com o mecânico todo o texto desta página antes do lançamento.
    // Se não houver validação a tempo, mude para false.
    publicada: true,
    seo: {
      title: "Descarbonização de válvulas TSI em Brasília | PRO-TECH",
      description:
        "Marcha lenta irregular, falhas ou perda de força no seu VW ou Audi TSI? Descarbonização de válvulas de admissão no Guará, Brasília-DF. Orçamento pelo WhatsApp.",
    },
    nomeCurto: "Descarbonização TSI",
    titulo: "Descarbonização de válvulas TSI em Brasília",
    introducao:
      "Marcha lenta irregular, falhas e perda de força podem ter a mesma origem: carvão acumulado nas válvulas de admissão. É um problema conhecido dos motores TSI e TFSI, e tem solução.",
    servicoWhatsApp: "descarbonização de válvulas TSI",
    secoes: [
      {
        titulo: "Por que o motor TSI carboniza",
        paragrafos: [
          "Nos motores TSI e TFSI a injeção é direta: o combustível entra direto na câmara de combustão e não passa pelas válvulas de admissão. Nos motores de injeção indireta, esse combustível ajudava a manter as válvulas limpas.",
          "Sem essa limpeza, os vapores de óleo que vêm do respiro do motor se acumulam nas válvulas. Com o tempo, formam uma camada de carvão que atrapalha a entrada de ar e o funcionamento do motor.",
        ],
      },
    ],
    sintomas: {
      titulo: "Sinais de válvulas carbonizadas",
      itens: [
        "Marcha lenta irregular, com o motor tremendo parado",
        "Falhas de ignição, principalmente com o motor frio",
        "Perda de força e acelerador respondendo mais devagar",
        "Consumo de combustível maior que o normal",
        "Luz de injeção acesa no painel",
      ],
    },
    processo: {
      titulo: "Como a PRO-TECH faz a descarbonização",
      passos: [
        {
          titulo: "Diagnóstico",
          texto:
            "Leitura por scanner das falhas e do comportamento de cada cilindro, para confirmar que o problema é carbonização e não outra causa.",
        },
        {
          // TODO: validar com o mecânico se usam boroscópio/endoscópio na inspeção.
          titulo: "Inspeção das válvulas",
          texto: "Verificação do estado das válvulas de admissão antes da limpeza.",
        },
        {
          // TODO: validar com o mecânico o método de limpeza usado.
          titulo: "Limpeza",
          texto: "Remoção do carvão das válvulas com o coletor de admissão desmontado.",
        },
        {
          titulo: "Causa e prevenção",
          texto:
            "Verificação da válvula PCV e do respiro do motor, que influenciam na formação de carvão, e orientação sobre a manutenção dali para frente.",
        },
      ],
    },
    modelos: {
      titulo: "Motores e modelos atendidos",
      // TODO: validar com o mecânico.
      itens: ["Tiguan 2.0 TSI", "Golf 1.4 TSI", "Jetta TSI", "Polo TSI", "Audi A3 TFSI", "Audi A4 TFSI"],
      nota: "Não sabe se o seu motor tem injeção direta? Mande o modelo e o ano pelo WhatsApp.",
    },
    faq: [
      {
        pergunta: "Aditivo no combustível resolve a carbonização das válvulas?",
        resposta:
          "Nos motores de injeção direta, não. Como o combustível não passa pelas válvulas de admissão, o aditivo não chega até elas. Para tirar o carvão das válvulas é preciso fazer a limpeza.",
      },
      {
        // TODO: validar com o mecânico se existe uma recomendação de quilometragem.
        pergunta: "De quanto em quanto tempo é preciso descarbonizar?",
        resposta:
          "Não existe um prazo único: depende do motor, do tipo de uso e da manutenção. O certo é avaliar quando aparecem os sintomas ou durante uma revisão.",
      },
      {
        pergunta: "Quanto tempo o carro fica na oficina?",
        resposta:
          "Depende do motor e do que o diagnóstico encontrar. O prazo é informado junto com o orçamento, antes de o serviço começar.",
      },
    ],
  },
  {
    slug: "corrente-de-comando",
    // TODO: validar com o mecânico todo o texto desta página antes do lançamento.
    // Se não houver validação a tempo, mude para false.
    publicada: true,
    seo: {
      title: "Troca de corrente de comando TSI em Brasília | PRO-TECH",
      description:
        "Barulho na partida a frio ou luz de injeção no seu VW ou Audi TSI? Diagnóstico e troca de corrente de comando no Guará, Brasília-DF. Orçamento pelo WhatsApp.",
    },
    nomeCurto: "Corrente de comando",
    titulo: "Troca de corrente de comando em Brasília",
    introducao:
      "Um barulho metálico nos primeiros segundos da partida a frio não deve ser ignorado. Em motores TSI com corrente de comando, pode ser sinal de corrente esticada ou de tensionador com defeito.",
    servicoWhatsApp: "troca de corrente de comando",
    secoes: [
      {
        titulo: "Para que serve a corrente de comando",
        paragrafos: [
          "A corrente de comando sincroniza o virabrequim com o comando de válvulas. É ela que garante que as válvulas abram e fechem no momento certo.",
          "Ela dura mais do que uma correia, mas não é eterna. Com o tempo, a corrente pode esticar e o tensionador e as guias podem se desgastar.",
        ],
      },
      {
        titulo: "Por que não vale esperar",
        paragrafos: [
          "Se a corrente perder o sincronismo ou pular dentes, as válvulas podem bater nos pistões e causar um dano sério ao motor. Trocar na hora certa custa bem menos do que um reparo de motor.",
          // TODO: validar com o mecânico quais motores usam corrente e quais usam correia.
          "Nem todo TSI usa corrente: vários motores 1.0 e 1.4 TSI mais recentes usam correia dentada, que a PRO-TECH também troca.",
        ],
      },
    ],
    sintomas: {
      titulo: "Sinais de problema na corrente",
      itens: [
        "Barulho metálico, como um chocalho, nos primeiros segundos após a partida a frio",
        "Luz de injeção acesa com falha de sincronismo entre comando e virabrequim",
        "Motor falhando ou com perda de força",
        "Dificuldade para ligar o motor",
      ],
    },
    processo: {
      titulo: "Como a PRO-TECH faz a troca",
      passos: [
        {
          // TODO: validar com o mecânico.
          titulo: "Diagnóstico",
          texto:
            "Leitura por scanner das falhas e dos valores de sincronismo do motor, para saber se a corrente já passou do limite.",
        },
        {
          // TODO: validar com o mecânico o kit trocado e a marca das peças.
          titulo: "Troca do conjunto",
          texto:
            "Substituição da corrente e dos componentes que trabalham com ela, como tensionador e guias, conforme o diagnóstico.",
        },
        {
          // TODO: validar com o mecânico.
          titulo: "Sincronismo",
          texto: "Montagem com o sincronismo conferido com as ferramentas específicas do motor.",
        },
        {
          titulo: "Teste final",
          texto: "Conferência por scanner e teste de rodagem antes da entrega.",
        },
      ],
    },
    modelos: {
      titulo: "Modelos atendidos",
      // TODO: validar com o mecânico.
      itens: ["Jetta 2.0 TSI", "Golf GTI", "Tiguan 2.0 TSI", "Passat", "Audi A3 TFSI", "Audi A4 TFSI"],
      nota: "Não sabe se o seu motor usa corrente ou correia? Mande o modelo, o ano e o motor pelo WhatsApp.",
    },
    faq: [
      {
        pergunta: "Com quantos quilômetros precisa trocar a corrente?",
        resposta:
          "A corrente não tem um prazo fixo de troca como a correia. O que define é o estado dela, medido no diagnóstico, e os sintomas. Vale checar se o motor fizer barulho na partida ou acusar falha de sincronismo.",
      },
      {
        pergunta: "Posso continuar rodando com o barulho na partida?",
        resposta:
          "Não é recomendado. O barulho indica que algo no sistema da corrente não está trabalhando como deveria, e o risco é o motor perder o sincronismo. Quanto antes o diagnóstico, menor o reparo.",
      },
      {
        pergunta: "Meu motor usa corrente ou correia?",
        resposta:
          "Depende do motor. Mande o modelo, o ano e a motorização pelo WhatsApp que a gente confirma e explica a manutenção certa para o seu carro.",
      },
    ],
  },
];

/* ---------------------------------------------------------------------------
 * PÁGINA 404
 * ------------------------------------------------------------------------ */

export const pagina404 = {
  selo: "Erro 404",
  titulo: "Página não encontrada",
  texto:
    "Nem todo caminho errado significa um grande problema. Esta página não existe ou mudou de lugar, mas o que você procura deve estar logo ali.",
};
