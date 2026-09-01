import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Copy, ExternalLink, FolderOpen, Plus, Printer, Save, Trash2 } from "lucide-react";
import { ProposalDocument } from "@/components/proposal/ProposalDocument";
import { scenarios } from "@/data/scenarios";
import { encodeProposalData } from "@/lib/proposal-codec";
import { createProposta, getProposta, updateProposta } from "@/lib/propostas";
import { cn } from "@/lib/utils";
import type {
  ModuleCategory,
  ModuleKind,
  ProposalData,
  ProposalModule,
} from "@/types/proposal";

export const Route = createFileRoute("/gerar")({
  validateSearch: (search: Record<string, unknown>): { id?: string } =>
    typeof search['id'] === "string" && search['id'] ? { id: search['id'] } : {},
  head: () => ({
    meta: [
      { title: "Montar Proposta Comercial | Softplus" },
      {
        name: "description",
        content:
          "Preencha plano, módulos e condições comerciais e veja a proposta Softplus sendo montada em tempo real, pronta para PDF.",
      },
      { property: "og:title", content: "Montar Proposta Comercial | Softplus" },
      {
        property: "og:description",
        content:
          "Editor dinâmico de propostas Softplus: digite plano e módulos, visualize em A4 e gere o PDF.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GeneratorPage,
});


const CATEGORIES: ModuleCategory[] = [
  "operacao",
  "gestao",
  "vendas",
  "delivery",
  "producao",
  "financeiro",
  "inteligencia",
  "fiscal",
];

const emptyModule = (kind: ModuleKind): ProposalModule => ({
  id: `m-${Math.random().toString(36).slice(2, 8)}`,
  name: "",
  description: "",
  icon: "boxes",
  category: "operacao",
  kind,
  quantity: 1,
  ...(kind === "incluido" ? {} : { unitMonthlyPrice: 0 }),
});

const blank: ProposalData = {
  meta: {
    number: "2026-0001",
    issuedAt: new Date().toLocaleDateString("pt-BR"),
    consultant: "",
    consultantContact: "",
    headline: "Tecnologia que faz o seu restaurante vender mais e controlar melhor.",
    subheadline: "Uma plataforma única para operação, gestão, vendas e inteligência.",
  },
  client: { companyName: "", tradeName: "", contactName: "", document: "", city: "", segment: "" },
  plan: { name: "", tagline: "", listMonthlyPrice: 0, badge: "Plano contratado" },
  includedFeatures: [],
  addons: [],
  optionals: [],
  implementation: {
    title: "Implantação e treinamento",
    description: "",
    listPrice: 0,
    paymentCondition: "",
    bullets: [],
  },
  conditions: {
    paymentMethods: ["PIX", "Boleto", "Cartão de crédito"],
    billingCycle: "",
    contractTerm: "",
    validUntil: "",
    notes: [],
  },
};

/* ---------- primitivos de formulário ---------- */

/** Define (ou remove, quando vazio) uma propriedade numérica opcional. */
function withOptNum<T extends object, K extends keyof T>(obj: T, key: K, raw: string): T {
  const next = { ...obj };
  if (raw === "") delete next[key];
  else next[key] = Number(raw) as T[K];
  return next;
}


const labelCls = "text-ink-muted text-[10px] font-semibold tracking-wide uppercase";
const inputCls =
  "border-line bg-card text-navy-deep placeholder:text-ink-muted/60 w-full rounded-lg border px-2.5 py-1.5 text-[12px] outline-none focus:border-cyan";

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  className,
}: {
  label: string;
  value: string | number | undefined;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: "text" | "number";
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className={labelCls}>{label}</span>
      <input
        type={type}
        step={type === "number" ? "0.01" : undefined}
        value={value ?? ""}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={cn(inputCls, "mt-1")}
      />
    </label>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-line bg-card shadow-card rounded-2xl border p-3.5">
      <h2 className="text-navy-deep font-display mb-2.5 text-[12px] font-extrabold">{title}</h2>
      <div className="space-y-2.5">{children}</div>
    </section>
  );
}

/* ---------- editor de módulos ---------- */

function ModuleEditor({
  title,
  hint,
  kind,
  modules,
  onChange,
}: {
  title: string;
  hint: string;
  kind: ModuleKind;
  modules: ProposalModule[];
  onChange: (next: ProposalModule[]) => void;
}) {
  const update = (i: number, patch: Partial<ProposalModule>) =>
    onChange(modules.map((m, idx) => (idx === i ? { ...m, ...patch } : m)));

  return (
    <Section title={title}>
      <p className="text-ink-muted -mt-1 text-[10px]">{hint}</p>

      {modules.map((m, i) => (
        <div key={m.id} className="border-line bg-surface space-y-2 rounded-xl border p-2.5">
          <div className="flex items-start gap-2">
            <Field
              label="Nome do módulo"
              value={m.name}
              placeholder="Ex.: PDV / Caixa"
              onChange={(v) => update(i, { name: v })}
              className="flex-1"
            />
            <button
              type="button"
              aria-label="Remover módulo"
              onClick={() => onChange(modules.filter((_, idx) => idx !== i))}
              className="border-line text-ink-muted hover:text-navy mt-[18px] rounded-lg border p-1.5"
            >
              <Trash2 className="size-3.5" />
            </button>
          </div>

          <label className="block">
            <span className={labelCls}>Descrição</span>
            <textarea
              rows={2}
              value={m.description}
              placeholder="Descrição comercial curta (1–2 linhas)."
              onChange={(e) => update(i, { description: e.target.value })}
              className={cn(inputCls, "mt-1 resize-none")}
            />
          </label>

          <div className="grid grid-cols-2 gap-2">
            <Field
              label="Ícone (lucide)"
              value={m.icon}
              placeholder="monitor"
              onChange={(v) => update(i, { icon: v })}
            />
            <label className="block">
              <span className={labelCls}>Categoria</span>
              <select
                value={m.category}
                onChange={(e) => update(i, { category: e.target.value as ModuleCategory })}
                className={cn(inputCls, "mt-1")}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Field
              label="Qtd."
              type="number"
              value={m.quantity ?? 1}
              onChange={(v) => update(i, { quantity: Number(v) || 1 })}
            />
            <Field
              label="Preço unit. (R$)"
              type="number"
              value={m.unitMonthlyPrice ?? ""}
              onChange={(v) =>
                onChange(
                  modules.map((mm, idx) =>
                    idx === i ? withOptNum(mm, "unitMonthlyPrice", v) : mm,
                  ),
                )
              }
            />
            <Field
              label="Preço tabela (R$)"
              type="number"
              value={m.listMonthlyPrice ?? ""}
              onChange={(v) =>
                onChange(
                  modules.map((mm, idx) =>
                    idx === i ? withOptNum(mm, "listMonthlyPrice", v) : mm,
                  ),
                )
              }
            />
          </div>

          <Field
            label="Destaques (separados por ;)"
            value={(m.highlights ?? []).join("; ")}
            placeholder="Windows, Android ou POS; Pedidos ilimitados"
            onChange={(v) =>
              update(i, {
                highlights: v
                  .split(";")
                  .map((s) => s.trim())
                  .filter(Boolean),
              })
            }
          />
        </div>
      ))}

      <button
        type="button"
        onClick={() => onChange([...modules, emptyModule(kind)])}
        className="border-line text-navy hover:border-cyan flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed py-2 text-[11px] font-semibold"
      >
        <Plus className="size-3.5" /> Adicionar módulo
      </button>
    </Section>
  );
}

/* ---------- página ---------- */

function GeneratorPage() {
  const { id } = Route.useSearch();
  const navigate = useNavigate();
  const [data, setData] = useState<ProposalData>(blank);
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    getProposta(id)
      .then((row) => setData(row.data))
      .catch(() => setSavedMsg("Não foi possível carregar a proposta salva."));
  }, [id]);

  const set = <K extends keyof ProposalData>(key: K, value: ProposalData[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const encoded = useMemo(() => encodeProposalData(data), [data]);
  const printUrl = `/print?data=${encodeURIComponent(encoded)}`;

  const copyLink = async () => {
    const full = `${window.location.origin}${printUrl}`;
    await navigator.clipboard.writeText(full);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const save = async () => {
    setSaving(true);
    try {
      if (id) {
        await updateProposta(id, data);
        setSavedMsg("Proposta atualizada!");
      } else {
        const newId = await createProposta(data);
        setSavedMsg("Proposta salva!");
        void navigate({ to: "/gerar", search: { id: newId } });
      }
    } catch (e) {
      setSavedMsg(`Erro ao salvar: ${(e as Error).message}`);
    } finally {
      setSaving(false);
      window.setTimeout(() => setSavedMsg(null), 2500);
    }
  };


  return (
    <main className="min-h-screen">
      <div className="no-print border-line bg-card/90 sticky top-0 z-20 border-b backdrop-blur">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-3 px-5 py-3">
          <div className="min-w-0">
            <h1 className="text-navy-deep font-display truncate text-[15px] font-extrabold">
              Montar proposta · Softplus
            </h1>
            <p className="text-ink-muted truncate text-[11px]">
              Preencha à esquerda e veja a proposta sendo montada à direita.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {scenarios.map((s) => (
              <button
                key={s.id}
                onClick={() => setData(structuredClone(s.data) as ProposalData)}
                className="bg-surface text-ink-muted hover:text-navy rounded-full px-3 py-1.5 text-[11px] font-semibold"
              >
                Carregar {s.label}
              </button>
            ))}
            <button
              onClick={() => {
                setData(blank);
                void navigate({ to: "/gerar", search: {} });
              }}
              className="bg-surface text-ink-muted hover:text-navy rounded-full px-3 py-1.5 text-[11px] font-semibold"
            >
              Limpar
            </button>
            <Link
              to="/propostas"
              className="border-line text-navy inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-bold"
            >
              <FolderOpen className="size-3.5" /> Propostas salvas
            </Link>
            <button
              onClick={save}
              disabled={saving}
              className="border-cyan text-navy inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-bold disabled:opacity-50"
            >
              <Save className="size-3.5" />{" "}
              {saving ? "Salvando…" : id ? "Salvar alterações" : "Salvar proposta"}
            </button>
            {savedMsg && <span className="text-cyan text-[11px] font-bold">{savedMsg}</span>}
            <button
              onClick={copyLink}
              className="border-line text-navy inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-bold"
            >
              <Copy className="size-3.5" /> {copied ? "Link copiado!" : "Copiar link PDF"}
            </button>

            <a
              href={printUrl}
              target="_blank"
              rel="noreferrer"
              className="border-line text-navy inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-bold"
            >
              <ExternalLink className="size-3.5" /> Abrir /print
            </a>
            <button
              onClick={() => window.print()}
              className="bg-gradient-cyan text-navy-deep inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-bold"
            >
              <Printer className="size-3.5" strokeWidth={2.4} /> Imprimir / PDF
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1600px] gap-6 px-4 py-6 lg:grid-cols-[380px_minmax(0,1fr)]">
        {/* Formulário */}
        <div className="no-print space-y-3 lg:max-h-[calc(100vh-110px)] lg:overflow-y-auto lg:pr-1">
          <Section title="Dados da proposta">
            <div className="grid grid-cols-2 gap-2">
              <Field
                label="Número"
                value={data.meta.number}
                onChange={(v) => set("meta", { ...data.meta, number: v })}
              />
              <Field
                label="Emitida em"
                value={data.meta.issuedAt}
                onChange={(v) => set("meta", { ...data.meta, issuedAt: v })}
              />
            </div>
            <Field
              label="Título da capa"
              value={data.meta.headline}
              onChange={(v) => set("meta", { ...data.meta, headline: v })}
            />
            <Field
              label="Subtítulo"
              value={data.meta.subheadline}
              onChange={(v) => set("meta", { ...data.meta, subheadline: v })}
            />
            <div className="grid grid-cols-2 gap-2">
              <Field
                label="Consultor"
                value={data.meta.consultant}
                onChange={(v) => set("meta", { ...data.meta, consultant: v })}
              />
              <Field
                label="Contato"
                value={data.meta.consultantContact}
                onChange={(v) => set("meta", { ...data.meta, consultantContact: v })}
              />
            </div>
          </Section>

          <Section title="Cliente">
            <Field
              label="Razão social"
              value={data.client.companyName}
              onChange={(v) => set("client", { ...data.client, companyName: v })}
            />
            <div className="grid grid-cols-2 gap-2">
              <Field
                label="Nome fantasia"
                value={data.client.tradeName}
                onChange={(v) => set("client", { ...data.client, tradeName: v })}
              />
              <Field
                label="Contato"
                value={data.client.contactName}
                onChange={(v) => set("client", { ...data.client, contactName: v })}
              />
              <Field
                label="CNPJ"
                value={data.client.document}
                onChange={(v) => set("client", { ...data.client, document: v })}
              />
              <Field
                label="Cidade / UF"
                value={data.client.city}
                onChange={(v) => set("client", { ...data.client, city: v })}
              />
            </div>
            <Field
              label="Segmento"
              value={data.client.segment}
              placeholder="Restaurante · 1 unidade"
              onChange={(v) => set("client", { ...data.client, segment: v })}
            />
          </Section>

          <Section title="Plano contratado">
            <Field
              label="Nome do plano"
              value={data.plan.name}
              placeholder="Master"
              onChange={(v) => set("plan", { ...data.plan, name: v })}
            />
            <Field
              label="Tagline"
              value={data.plan.tagline}
              onChange={(v) => set("plan", { ...data.plan, tagline: v })}
            />
            <div className="grid grid-cols-2 gap-2">
              <Field
                label="Mensalidade tabela (R$)"
                type="number"
                value={data.plan.listMonthlyPrice}
                onChange={(v) => set("plan", { ...data.plan, listMonthlyPrice: Number(v) || 0 })}
              />
              <Field
                label="Mensalidade negociada"
                type="number"
                value={data.plan.negotiatedMonthlyPrice ?? ""}
                onChange={(v) =>
                  set("plan", withOptNum(data.plan, "negotiatedMonthlyPrice", v))
                }
              />
            </div>
          </Section>

          <ModuleEditor
            title="Recursos inclusos no plano"
            hint="Já inclusos — não somam no total."
            kind="incluido"
            modules={data.includedFeatures}
            onChange={(next) => set("includedFeatures", next)}
          />

          <ModuleEditor
            title="Módulos adicionais contratados"
            hint="Somam na mensalidade (preço unitário × quantidade)."
            kind="adicional"
            modules={data.addons}
            onChange={(next) => set("addons", next)}
          />

          <ModuleEditor
            title="Módulos opcionais (sugestões)"
            hint="Aparecem como sugestão e não entram no total."
            kind="opcional"
            modules={data.optionals}
            onChange={(next) => set("optionals", next)}
          />

          <Section title="Promoção (opcional)">
            {data.promotion ? (
              <>
                <Field
                  label="Rótulo"
                  value={data.promotion.label}
                  onChange={(v) =>
                    set("promotion", { ...data.promotion!, label: v })
                  }
                />
                <div className="grid grid-cols-2 gap-2">
                  <Field
                    label="Desconto (%)"
                    type="number"
                    value={data.promotion.discountPercent ?? ""}
                    onChange={(v) =>
                      set("promotion", withOptNum(data.promotion!, "discountPercent", v))
                    }
                  />
                  <Field
                    label="Meses"
                    type="number"
                    value={data.promotion.months}
                    onChange={(v) =>
                      set("promotion", { ...data.promotion!, months: Number(v) || 0 })
                    }
                  />
                </div>
                <Field
                  label="Observação"
                  value={data.promotion.note}
                  onChange={(v) => set("promotion", { ...data.promotion!, note: v })}
                />
                <button
                  type="button"
                  onClick={() =>
                    setData((d) => {
                      const next = { ...d };
                      delete next.promotion;
                      return next;
                    })
                  }
                  className="text-ink-muted hover:text-navy text-[11px] font-semibold"
                >
                  Remover promoção
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() =>
                  set("promotion", {
                    label: "Condição de entrada",
                    discountPercent: 10,
                    months: 3,
                    note: "",
                  })
                }
                className="border-line text-navy hover:border-cyan flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed py-2 text-[11px] font-semibold"
              >
                <Plus className="size-3.5" /> Adicionar promoção
              </button>
            )}
          </Section>

          <Section title="Implantação">
            <Field
              label="Título"
              value={data.implementation.title}
              onChange={(v) => set("implementation", { ...data.implementation, title: v })}
            />
            <Field
              label="Descrição"
              value={data.implementation.description}
              onChange={(v) => set("implementation", { ...data.implementation, description: v })}
            />
            <div className="grid grid-cols-2 gap-2">
              <Field
                label="Valor tabela (R$)"
                type="number"
                value={data.implementation.listPrice}
                onChange={(v) =>
                  set("implementation", { ...data.implementation, listPrice: Number(v) || 0 })
                }
              />
              <Field
                label="Valor negociado (R$)"
                type="number"
                value={data.implementation.negotiatedPrice ?? ""}
                onChange={(v) =>
                  set("implementation", withOptNum(data.implementation, "negotiatedPrice", v))
                }
              />
            </div>
            <Field
              label="Condição de pagamento"
              value={data.implementation.paymentCondition}
              onChange={(v) =>
                set("implementation", { ...data.implementation, paymentCondition: v })
              }
            />
            <Field
              label="Itens da implantação (separados por ;)"
              value={(data.implementation.bullets ?? []).join("; ")}
              onChange={(v) =>
                set("implementation", {
                  ...data.implementation,
                  bullets: v
                    .split(";")
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
            />
          </Section>

          <Section title="Condições comerciais">
            <Field
              label="Formas de pagamento (separadas por ;)"
              value={(data.conditions.paymentMethods ?? []).join("; ")}
              onChange={(v) =>
                set("conditions", {
                  ...data.conditions,
                  paymentMethods: v
                    .split(";")
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
            />
            <div className="grid grid-cols-2 gap-2">
              <Field
                label="Ciclo de cobrança"
                value={data.conditions.billingCycle}
                onChange={(v) => set("conditions", { ...data.conditions, billingCycle: v })}
              />
              <Field
                label="Fidelidade"
                value={data.conditions.contractTerm}
                onChange={(v) => set("conditions", { ...data.conditions, contractTerm: v })}
              />
            </div>
            <Field
              label="Validade da proposta"
              value={data.conditions.validUntil}
              onChange={(v) => set("conditions", { ...data.conditions, validUntil: v })}
            />
            <Field
              label="Observações (separadas por ;)"
              value={(data.conditions.notes ?? []).join("; ")}
              onChange={(v) =>
                set("conditions", {
                  ...data.conditions,
                  notes: v
                    .split(";")
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
            />
          </Section>
        </div>

        {/* Pré-visualização */}
        <div className="print-root flex flex-col items-center gap-8">
          <div className="a4-scaler flex flex-col items-center gap-8">
            <ProposalDocument data={data} />
          </div>
        </div>
      </div>
    </main>
  );
}
