export const urlToFile = async function (url: string, name: string) {
  const response = await fetch(url);
  return new File([await response.blob()], name, {type: "audio/mpeg" });
}