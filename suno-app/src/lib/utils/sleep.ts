export const sleep = (duration: number) =>
  new Promise((resolve) => window.setTimeout(resolve, duration));
