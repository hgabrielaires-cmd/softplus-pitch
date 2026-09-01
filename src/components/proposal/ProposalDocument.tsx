import { computeTotals, paginate } from "@/lib/proposal";
import type { ProposalData } from "@/types/proposal";
import type { PageMeta } from "./PageContainer";
import {
  ClosingPage,
  CommercialPage,
  EcosystemPage,
  ModulesPage,
  OptionalsPage,
  ProposalCover,
  SolutionPage,
} from "./pages";

const FEATURES_FIRST_PAGE = 4;
const FEATURES_PER_PAGE = 8;
const MODULES_PER_PAGE = 6;
const OPTIONALS_PER_PAGE = 6;

/**
 * Monta o documento completo. A quantidade de páginas varia automaticamente
 * conforme o volume de recursos, módulos e opcionais recebidos.
 */
export function ProposalDocument({ data }: { data: ProposalData }) {
  const totals = computeTotals(data);

  const firstFeatures = data.includedFeatures.slice(0, FEATURES_FIRST_PAGE);
  const restFeatures = paginate(
    data.includedFeatures.slice(FEATURES_FIRST_PAGE),
    FEATURES_PER_PAGE,
  );
  const modulePages = paginate(data.addons, MODULES_PER_PAGE);
  const optionalPages = paginate(data.optionals, OPTIONALS_PER_PAGE);

  // 1 capa + 1 ecossistema + solução + módulos + opcionais + comercial + fechamento
  const totalPages =
    2 + 1 + restFeatures.length + modulePages.length + optionalPages.length + 2;

  let page = 1;
  const nextMeta = (): PageMeta => {
    page += 1;
    return {
      proposalNumber: data.meta.number,
      clientName: data.client.tradeName ?? data.client.companyName,
      issuedAt: data.meta.issuedAt,
      pageNumber: page,
      totalPages,
    };
  };

  return (
    <>
      <ProposalCover data={data} />
      <EcosystemPage data={data} meta={nextMeta()} />

      <SolutionPage
        data={data}
        totals={totals}
        meta={nextMeta()}
        features={firstFeatures}
        continued={false}
      />
      {restFeatures.map((chunk, i) => (
        <SolutionPage
          key={`features-${i}`}
          data={data}
          totals={totals}
          meta={nextMeta()}
          features={chunk}
          continued
        />
      ))}

      {modulePages.map((chunk, i) => (
        <ModulesPage key={`modules-${i}`} modules={chunk} meta={nextMeta()} continued={i > 0} />
      ))}

      {optionalPages.map((chunk, i) => (
        <OptionalsPage key={`optionals-${i}`} modules={chunk} meta={nextMeta()} />
      ))}

      <CommercialPage data={data} totals={totals} meta={nextMeta()} />
      <ClosingPage data={data} totals={totals} meta={nextMeta()} />
    </>
  );
}
