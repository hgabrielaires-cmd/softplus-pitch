import { supabase } from "@/integrations/supabase/client";
import type { ProposalData } from "@/types/proposal";

export type PropostaRow = {
  id: string;
  numero: string | null;
  cliente: string | null;
  plano: string | null;
  data: ProposalData;
  created_at: string;
  updated_at: string;
};

const summary = (data: ProposalData) => ({
  numero: data.meta.number || null,
  cliente: data.client.tradeName || data.client.companyName || null,
  plano: data.plan.name || null,
});

export async function listPropostas(): Promise<PropostaRow[]> {
  const { data, error } = await supabase
    .from("propostas")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as unknown as PropostaRow[];
}

export async function getProposta(id: string): Promise<PropostaRow> {
  const { data, error } = await supabase.from("propostas").select("*").eq("id", id).single();
  if (error) throw error;
  return data as unknown as PropostaRow;
}

export async function createProposta(data: ProposalData): Promise<string> {
  const { data: row, error } = await supabase
    .from("propostas")
    .insert({ ...summary(data), data: data as never })
    .select("id")
    .single();
  if (error) throw error;
  return row.id as string;
}

export async function updateProposta(id: string, data: ProposalData): Promise<void> {
  const { error } = await supabase
    .from("propostas")
    .update({ ...summary(data), data: data as never })
    .eq("id", id);
  if (error) throw error;
}

export async function deleteProposta(id: string): Promise<void> {
  const { error } = await supabase.from("propostas").delete().eq("id", id);
  if (error) throw error;
}
