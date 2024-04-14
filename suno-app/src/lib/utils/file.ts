export const urlToFile = async function (url: string, name: string) {
  const response = await fetch(url);
  return new File([await response.blob()], name + ".mp3", {type: "audio/mpeg" });
}