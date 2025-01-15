export const urlToFile = async function (url: string, name: string) {
  console.log("url fetching.....");
  const response = await fetch(url);
  console.log(response);
  return new File([await response.blob()], name + ".mp3", {type: "audio/mpeg" });
}