export function buildPathWithQuery(path: string, query: Record<string, any>) {
  const q = new URLSearchParams(query);
  return path + "?" + query;
}
