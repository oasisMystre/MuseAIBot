export function buildPathWithQuery(path: string, query: Record<string, any>) {
  const cleanQuery: Record<string, any> = {};
  for (const [key, value] of Object.entries(query)) {
    if (key === undefined) {
      cleanQuery[key] = null;
      continue;
    }
    
    cleanQuery[key] = value;
  }

  const q = new URLSearchParams(cleanQuery);
  return path + "?" + q.toString();
}
