import axios from "axios";
const cheerio = require("cheerio");

function getTitleLink(title) {
  const titleFormated = title.split(' ').join('+');
  return `https://www.google.com/search?q=${titleFormated}+lyrics`
}


export async function getLyrics(title) {
  const lyricArray = [];
  const lyricUrl = getTitleLink(title)
  return await axios({
    method: "get",
    withCredentials: false,
    url: lyricUrl,
  })
    .then((res) => {
      const html = res.data;
      const $ = cheerio.load(html);
      const lyricArray = [];
      $(".ujudUb", html).each((blockId, blockEl) => {
        const block = [];
        if (blockId !== 0) {
          $(blockEl)
            .children()
            .each((lineId, lineEl) => {
              const lineText = $(lineEl).text();
              if (lineText !== "") block.push($(lineEl).text());
            });
          lyricArray.push(block);
        }
      });
      return lyricArray
    })
    .catch((er) => {
      console.log(er);
    });
}