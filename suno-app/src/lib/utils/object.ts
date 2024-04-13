export const arrayToRecord = function <T>(value: any[][]) {
  const result: Record<string, string> = {};

  value.forEach(([key, value]) => {
    result[key] = value;
  });

  return result as unknown as T;
};
