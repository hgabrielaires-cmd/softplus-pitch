/**
 * Contrato de dados do Gerador de Propostas Softplus.
 *
 * Este contrato é a fronteira de integração com o Softflow:
 * o Softflow (CRM / Oportunidade) monta um objeto `ProposalData`
 * e o gerador apenas renderiza. Nenhum cálculo comercial oficial
 * deve nascer aqui — os totais são derivados dos valores recebidos.
 */

export type ModuleCategory =
  | "operacao"
  | "gestao"
  | "vendas"
  | "delivery"
  | "producao"
  | "financeiro"
  | "inteligencia"
  | "fiscal";

export type ModuleKind = "incluido" | "adicional" | "opcional";

export interface ProposalImage {
  /** URL absoluta ou importada. Quando ausente, renderiza placeholder elegante. */
  src?: string;
  alt?: string;
}

export interface ProposalModule {
  id: string;
  name: string;
  /** Descrição comercial curta (1–2 linhas). */
  description: string;
  /** Nome de ícone lucide-react (ex.: "monitor", "chef-hat"). */
  icon?: string;
  image?: ProposalImage;
  category: ModuleCategory;
  /** Quantidade contratada, quando aplicável (ex.: 5 terminais). */
  quantity?: number;
  kind: ModuleKind;
  /** Destaques rápidos exibidos no card. */
  highlights?: string[];
  /** Preço unitário mensal. Obrigatório para adicionais e opcionais. */
  unitMonthlyPrice?: number;
  /** Preço de tabela, quando houver negociação. */
  listMonthlyPrice?: number;
}

export interface ProposalClient {
  companyName: string;
  tradeName?: string;
  contactName?: string;
  document?: string;
  city?: string;
  segment?: string;
}

export interface ProposalPlan {
  name: string;
  tagline?: string;
  /** Preço de tabela do plano. */
  listMonthlyPrice: number;
  /** Preço negociado do plano (se ausente, usa o de tabela). */
  negotiatedMonthlyPrice?: number;
  badge?: string;
}

export interface ProposalPromotion {
  label: string;
  /** Percentual de desconto sobre a mensalidade contratada. */
  discountPercent?: number;
  /** Desconto em valor absoluto (usado quando não há percentual). */
  discountAmount?: number;
  /** Duração da promoção em meses. */
  months: number;
  note?: string;
}

export interface ProposalImplementation {
  title: string;
  description?: string;
  listPrice: number;
  negotiatedPrice?: number;
  paymentCondition?: string;
  bullets?: string[];
}

export interface ProposalConditions {
  paymentMethods?: string[];
  billingCycle?: string;
  contractTerm?: string;
  validUntil?: string;
  notes?: string[];
}

export interface ProposalMeta {
  number: string;
  issuedAt: string;
  consultant?: string;
  consultantContact?: string;
  headline: string;
  subheadline?: string;
  coverImage?: ProposalImage;
}

export interface ProposalData {
  meta: ProposalMeta;
  client: ProposalClient;
  plan: ProposalPlan;
  /** Recursos já inclusos no plano (kind: "incluido"). */
  includedFeatures: ProposalModule[];
  /** Módulos adicionais contratados (entram no total). */
  addons: ProposalModule[];
  /** Módulos sugeridos, NÃO entram no total. */
  optionals: ProposalModule[];
  promotion?: ProposalPromotion;
  implementation: ProposalImplementation;
  conditions: ProposalConditions;
}

/** Totais derivados — calculados por `computeTotals`. */
export interface ProposalTotals {
  planList: number;
  planNegotiated: number;
  addonsList: number;
  addonsNegotiated: number;
  monthlyList: number;
  monthlyNegotiated: number;
  monthlyDiscount: number;
  monthlyDiscountPercent: number;
  hasPromotion: boolean;
  promoMonthly: number;
  promoMonths: number;
  promoSavings: number;
  implementationList: number;
  implementationNegotiated: number;
  implementationSavings: number;
  optionalsMonthly: number;
}
