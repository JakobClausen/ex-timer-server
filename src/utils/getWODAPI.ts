import axios from "axios";
import cheerio from "cheerio";

const fetchHTML = async (url: string) => {
  const { data } = await axios.get(url);
  return cheerio.load(data);
};
export const getWODAPI = async () => {
  const url = "https://www.crossfit.com";

  const $ = await fetchHTML(url);
  return $("._1kOqu24U9_kCLpSukpmYDZ").html();
};
