export interface DiffResult {
  value: string;
  added?: boolean;
  removed?: boolean;
}

export type DiffType = "lines" | "words" | "chars";

export function extractBodyContent(html: string): string {
  if (!html) return "";
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return bodyMatch?.[1]?.trim() || html;
}

export function extractHeadContent(html: string): string {
  if (!html) return "";
  const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  return headMatch?.[1]?.trim() || "";
}