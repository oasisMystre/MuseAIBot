export const arrayToRecord = function <T>(value: any[][]) {
  const result: Record<string, string> = {};

  value.forEach(([key, value]) => {
    result[key] = value;
  });

  return result as unknown as T;
};

export const shuffleArray = function <T>(value: T[]) {
  return value
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};
