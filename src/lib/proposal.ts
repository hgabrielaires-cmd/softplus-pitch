import type { ProposalData, ProposalModule, ProposalTotals } from "@/types/proposal";

export const brl = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value);

export const percent = (value: number) =>
  `${new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1 }).format(value)}%`;

const moduleList = (m: ProposalModule) =>
  (m.listMonthlyPrice ?? m.unitMonthlyPrice ?? 0) * (m.quantity ?? 1);

const moduleNegotiated = (m: ProposalModule) =>
  (m.unitMonthlyPrice ?? m.listMonthlyPrice ?? 0) * (m.quantity ?? 1);

export function moduleTotals(m: ProposalModule) {
  return { list: moduleList(m), negotiated: moduleNegotiated(m) };
}

export function computeTotals(data: ProposalData): ProposalTotals {
  const planList = data.plan.listMonthlyPrice;
  const planNegotiated = data.plan.negotiatedMonthlyPrice ?? planList;

  const addonsList = data.addons.reduce((s, m) => s + moduleList(m), 0);
  const addonsNegotiated = data.addons.reduce((s, m) => s + moduleNegotiated(m), 0);

  const monthlyList = planList + addonsList;
  const monthlyNegotiated = planNegotiated + addonsNegotiated;
  const monthlyDiscount = Math.max(0, monthlyList - monthlyNegotiated);
  const monthlyDiscountPercent = monthlyList > 0 ? (monthlyDiscount / monthlyList) * 100 : 0;

  const promo = data.promotion;
  let promoMonthly = monthlyNegotiated;
  if (promo) {
    if (promo.discountPercent) {
      promoMonthly = monthlyNegotiated * (1 - promo.discountPercent / 100);
    } else if (promo.discountAmount) {
      promoMonthly = monthlyNegotiated - promo.discountAmount;
    }
  }
  promoMonthly = Math.max(0, Math.round(promoMonthly * 100) / 100);
  const hasPromotion = Boolean(promo) && promoMonthly < monthlyNegotiated;
  const promoMonths = promo?.months ?? 0;
  const promoSavings = hasPromotion ? (monthlyNegotiated - promoMonthly) * promoMonths : 0;

  const implementationList = data.implementation.listPrice;
  const implementationNegotiated = data.implementation.negotiatedPrice ?? implementationList;
  const implementationSavings = Math.max(0, implementationList - implementationNegotiated);

  const optionalsMonthly = data.optionals.reduce((s, m) => s + moduleNegotiated(m), 0);

  return {
    planList,
    planNegotiated,
    addonsList,
    addonsNegotiated,
    monthlyList,
    monthlyNegotiated,
    monthlyDiscount,
    monthlyDiscountPercent,
    hasPromotion,
    promoMonthly,
    promoMonths,
    promoSavings,
    implementationList,
    implementationNegotiated,
    implementationSavings,
    optionalsMonthly,
  };
}

/** Quebra uma lista de módulos em páginas para o layout A4. */
export function paginate<T>(items: T[], perPage: number): T[][] {
  if (items.length === 0) return [];
  const pages: T[][] = [];
  for (let i = 0; i < items.length; i += perPage) pages.push(items.slice(i, i + perPage));
  return pages;
}

export const categoryLabel: Record<string, string> = {
  operacao: "Operação",
  gestao: "Gestão",
  vendas: "Vendas",
  delivery: "Delivery",
  producao: "Produção",
  financeiro: "Financeiro",
  inteligencia: "Inteligência",
  fiscal: "Fiscal",
};
