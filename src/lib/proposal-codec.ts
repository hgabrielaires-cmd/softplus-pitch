import type { ProposalData } from "@/types/proposal";

/** Base64 UTF-8 safe (acentos preservados). */
export function encodeProposalData(data: ProposalData): string {
  const json = JSON.stringify(data);
  const bytes = new TextEncoder().encode(json);
  let bin = "";
  bytes.forEach((b) => {
    bin += String.fromCharCode(b);
  });
  return btoa(bin);
}

export function decodeProposalData(raw: string | undefined): ProposalData | null {
  if (!raw) return null;
  try {
    const bin = atob(raw);
    const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
    const json = new TextDecoder().decode(bytes);
    return JSON.parse(json) as ProposalData;
  } catch {
    return null;
  }
}
