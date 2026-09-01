import coverImage from "@/assets/cover-restaurant-tech.jpg";
import type { ProposalData, ProposalModule } from "@/types/proposal";

/**
 * Catálogo MOCK. Futuramente virá do Softflow (planos + módulos + preços).
 */
const M = {
  pdv: {
    id: "pdv",
    name: "PDV / Caixa",
    description: "Frente de caixa completa para balcão, mesa, comanda e delivery com emissão de NFC-e.",
    icon: "monitor",
    category: "operacao",
    highlights: ["Windows, Android ou POS", "Abertura e fechamento de caixa", "Pedidos ilimitados"],
  },
  terminal: {
    id: "terminal",
    name: "Terminal de Lançamento",
    description: "Pontos extras de lançamento de pedidos integrados ao caixa principal.",
    icon: "tablet",
    category: "operacao",
    highlights: ["Mesa, comanda e balcão", "Sincronização em tempo real"],
  },
  xlive: {
    id: "xlive",
    name: "XLIVE",
    description: "Aplicativo de acompanhamento de vendas em tempo real, de onde você estiver.",
    icon: "activity",
    category: "inteligencia",
    highlights: ["iOS e Android", "Indicadores ao vivo"],
  },
  gestaoWeb: {
    id: "gestao-web",
    name: "Gestão Web",
    description: "Retaguarda em nuvem com estoque, ficha técnica, financeiro, DRE e fluxo de caixa.",
    icon: "layout-dashboard",
    category: "gestao",
    highlights: ["Estoque e CMV", "Contas a pagar e receber", "Relatórios analíticos"],
  },
  kds: {
    id: "kds",
    name: "KDS / Monitor de Pedidos",
    description: "Organiza a produção da cozinha, reduz erros e acelera o tempo de entrega.",
    icon: "chef-hat",
    category: "producao",
    highlights: ["Status por praça", "Redução de erros"],
  },
  totem: {
    id: "totem",
    name: "Totem de Autoatendimento",
    description: "Menos filas e mais vendas com pedidos feitos pelo próprio cliente.",
    icon: "scan-line",
    category: "vendas",
    highlights: ["Ticket médio maior", "Pagamento integrado"],
  },
  tablet: {
    id: "tablet-mesa",
    name: "Tablet na Mesa",
    description: "Cardápio digital na mesa com pedido enviado direto para a cozinha.",
    icon: "tablet-smartphone",
    category: "vendas",
    highlights: ["Cardápio com fotos", "Autoatendimento no salão"],
  },
  xtag: {
    id: "xtag",
    name: "XTAG",
    description: "Impressão de etiquetas e controle de validade em conformidade com a ANVISA.",
    icon: "printer",
    category: "producao",
    highlights: ["Padronização de processos", "Menos desperdício"],
  },
  checkey: {
    id: "checkey",
    name: "Checkey",
    description: "Checklists digitais e controle operacional das rotinas da sua equipe.",
    icon: "clipboard-check",
    category: "operacao",
    highlights: ["Rotinas auditáveis", "Evidências por foto"],
  },
  portalIa: {
    id: "portal-ia",
    name: "Portal de IA",
    description: "Inteligência artificial aplicada aos seus dados: análises, alertas e sugestões.",
    icon: "sparkles",
    category: "inteligencia",
    highlights: ["Insights automáticos", "Perguntas em linguagem natural"],
  },
  lojaVirtual: {
    id: "loja-virtual",
    name: "Loja Virtual / Delivery",
    description: "Cardápio online integrado ao PDV, com pagamento online e zero taxa por pedido.",
    icon: "shopping-bag",
    category: "delivery",
    highlights: ["Zero comissão", "Integrado ao caixa"],
  },
  manifesto: {
    id: "manifesto",
    name: "Manifesto MDF-e",
    description: "Emissão e gestão de manifesto eletrônico, pacote de até 100 notas por mês.",
    icon: "file-text",
    category: "fiscal",
    highlights: ["Até 100 notas/mês"],
  },
  appDelivery: {
    id: "app-delivery",
    name: "Aplicativo do Cliente",
    description: "App próprio da marca para pedidos recorrentes e programa de fidelidade.",
    icon: "smartphone",
    category: "delivery",
    highlights: ["iOS e Android", "Fidelidade integrada"],
  },
  ifood: {
    id: "ifood",
    name: "Integração iFood",
    description: "Pedidos do iFood entrando direto no PDV, sem digitação manual.",
    icon: "plug",
    category: "delivery",
    highlights: ["Sem retrabalho"],
  },
} satisfies Record<string, Omit<ProposalModule, "kind">>;

const mod = (
  base: Omit<ProposalModule, "kind">,
  over: Partial<ProposalModule> & Pick<ProposalModule, "kind">,
): ProposalModule => ({ ...base, ...over });

const baseMeta = {
  headline: "Tecnologia que faz o seu restaurante vender mais e controlar melhor.",
  subheadline: "Uma plataforma única para operação, gestão, vendas e inteligência.",
  consultant: "Consultor Softplus",
  consultantContact: "(84) 99999-0000 · comercial@softplus.com.br",
  coverImage: { src: coverImage, alt: "Tecnologia Softplus em operação de restaurante" },
};

/** Cenário 1 — plano simples, poucos módulos, sem promoção. */
export const cenarioSimples: ProposalData = {
  meta: {
    ...baseMeta,
    number: "2026-0148",
    issuedAt: "12/03/2026",
    headline: "Comece com o essencial e opere com controle total.",
  },
  client: {
    companyName: "Cantina da Praia LTDA",
    tradeName: "Cantina da Praia",
    contactName: "Marcos Vieira",
    document: "12.345.678/0001-90",
    city: "Natal / RN",
    segment: "Restaurante · 1 unidade",
  },
  plan: {
    name: "Essencial",
    tagline: "Operação de caixa completa, na nuvem.",
    listMonthlyPrice: 189.9,
    badge: "Plano contratado",
  },
  includedFeatures: [
    mod(M.pdv, { kind: "incluido", quantity: 1 }),
    mod(M.xlive, { kind: "incluido" }),
  ],
  addons: [],
  optionals: [mod(M.gestaoWeb, { kind: "opcional", unitMonthlyPrice: 270.0 })],
  implementation: {
    title: "Implantação e treinamento",
    description: "1 dia de instalação, cadastro de cardápio e treinamento da equipe.",
    listPrice: 1200.0,
    paymentCondition: "PIX à vista ou cartão em até 3x",
    bullets: ["Instalação do sistema", "Cadastro de cardápio", "Treinamento operacional"],
  },
  conditions: {
    paymentMethods: ["PIX", "Boleto", "Cartão de crédito"],
    billingCycle: "Mensalidade cobrada todo dia 10",
    contractTerm: "Sem fidelidade",
    validUntil: "31/03/2026",
    notes: ["Deslocamento e hospedagem por conta do contratante fora da Grande Natal."],
  },
};

/** Cenário 2 — plano completo com vários módulos contratados. */
export const cenarioCompleto: ProposalData = {
  meta: {
    ...baseMeta,
    number: "2026-0152",
    issuedAt: "12/03/2026",
    headline: "Um ecossistema completo para uma operação de alto volume.",
  },
  client: {
    companyName: "Grupo Sabor & Cia Alimentos S/A",
    tradeName: "Sabor & Cia",
    contactName: "Renata Alencar",
    document: "98.765.432/0001-11",
    city: "Parnamirim / RN",
    segment: "Rede · 3 unidades",
  },
  plan: {
    name: "Premium",
    tagline: "Toda a plataforma Softplus, sem limites.",
    listMonthlyPrice: 649.9,
    badge: "Plano contratado",
  },
  includedFeatures: [
    mod(M.pdv, { kind: "incluido", quantity: 1 }),
    mod(M.terminal, { kind: "incluido", quantity: 5 }),
    mod(M.gestaoWeb, { kind: "incluido" }),
    mod(M.xlive, { kind: "incluido" }),
    mod(M.lojaVirtual, { kind: "incluido" }),
    mod(M.ifood, { kind: "incluido" }),
  ],
  addons: [
    mod(M.kds, { kind: "adicional", quantity: 2, unitMonthlyPrice: 59.9 }),
    mod(M.totem, { kind: "adicional", quantity: 1, unitMonthlyPrice: 349.9 }),
    mod(M.tablet, { kind: "adicional", quantity: 8, unitMonthlyPrice: 35.0 }),
    mod(M.xtag, { kind: "adicional", quantity: 1, unitMonthlyPrice: 389.9 }),
    mod(M.manifesto, { kind: "adicional", quantity: 1, unitMonthlyPrice: 199.9 }),
    mod(M.appDelivery, { kind: "adicional", quantity: 1, unitMonthlyPrice: 249.9 }),
    mod(M.portalIa, { kind: "adicional", quantity: 1, unitMonthlyPrice: 299.9 }),
    mod(M.checkey, { kind: "adicional", quantity: 1, unitMonthlyPrice: 190.0 }),
  ],
  optionals: [],
  implementation: {
    title: "Implantação e treinamento",
    description: "3 dias de instalação, cadastro de cardápio e treinamento por área.",
    listPrice: 2200.0,
    paymentCondition: "PIX à vista ou cartão em até 6x",
    bullets: [
      "Instalação em 3 unidades",
      "Cadastro completo de cardápio",
      "Treinamento de caixa, salão, cozinha e gestão",
    ],
  },
  conditions: {
    paymentMethods: ["PIX", "Boleto", "Cartão de crédito"],
    billingCycle: "Mensalidade cobrada todo dia 05",
    contractTerm: "Fidelidade de 12 meses",
    validUntil: "31/03/2026",
    notes: [
      "Diária adicional de treinamento: R$ 500,00.",
      "Equipamentos (totem, tablets e impressoras) não inclusos na mensalidade.",
    ],
  },
};

/** Cenário 3 — desconto negociado, promoção, adicionais e opcionais. */
export const cenarioPromocional: ProposalData = {
  meta: {
    ...baseMeta,
    number: "2026-0157",
    issuedAt: "12/03/2026",
    headline: "Sua operação inteira integrada, com condição especial de entrada.",
  },
  client: {
    companyName: "Boteco do Porto Restaurante LTDA",
    tradeName: "Boteco do Porto",
    contactName: "Aline Ferreira",
    document: "45.678.912/0001-33",
    city: "Natal / RN",
    segment: "Bar e restaurante · 1 unidade",
  },
  plan: {
    name: "Master",
    tagline: "Gestão completa com retaguarda em nuvem.",
    listMonthlyPrice: 459.9,
    negotiatedMonthlyPrice: 429.9,
    badge: "Plano contratado",
  },
  includedFeatures: [
    mod(M.pdv, { kind: "incluido", quantity: 1 }),
    mod(M.terminal, { kind: "incluido", quantity: 5 }),
    mod(M.gestaoWeb, { kind: "incluido" }),
    mod(M.xlive, { kind: "incluido" }),
  ],
  addons: [
    mod(M.kds, { kind: "adicional", quantity: 1, unitMonthlyPrice: 59.9 }),
    mod(M.tablet, { kind: "adicional", quantity: 4, unitMonthlyPrice: 35.0, listMonthlyPrice: 45.0 }),
    mod(M.manifesto, { kind: "adicional", quantity: 1, unitMonthlyPrice: 199.9 }),
  ],
  optionals: [
    mod(M.checkey, { kind: "opcional", unitMonthlyPrice: 190.0 }),
    mod(M.portalIa, { kind: "opcional", unitMonthlyPrice: 299.9 }),
    mod(M.totem, { kind: "opcional", unitMonthlyPrice: 349.9 }),
  ],
  promotion: {
    label: "Condição de entrada",
    discountPercent: 20,
    months: 6,
    note: "A partir do 7º mês a mensalidade volta ao valor negociado.",
  },
  implementation: {
    title: "Implantação e treinamento",
    description: "2 dias de instalação, cadastro de cardápio e treinamento da equipe.",
    listPrice: 1800.0,
    negotiatedPrice: 1400.0,
    paymentCondition: "PIX à vista ou cartão em até 4x sem juros",
    bullets: ["Instalação do sistema", "Cadastro de cardápio", "Treinamento de caixa e gestão"],
  },
  conditions: {
    paymentMethods: ["PIX", "Boleto", "Cartão de crédito"],
    billingCycle: "Mensalidade cobrada todo dia 10",
    contractTerm: "Fidelidade de 6 meses (período promocional)",
    validUntil: "25/03/2026",
    notes: [
      "Valores promocionais válidos para contratação dentro da validade desta proposta.",
      "Módulos opcionais podem ser ativados a qualquer momento.",
    ],
  },
};

export const scenarios = [
  { id: "simples", label: "1 · Plano simples", data: cenarioSimples },
  { id: "completo", label: "2 · Plano completo", data: cenarioCompleto },
  { id: "promocional", label: "3 · Desconto + opcionais", data: cenarioPromocional },
] as const;

export type ScenarioId = (typeof scenarios)[number]["id"];
