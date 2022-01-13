
export function getTitleLink(title) {
  const titleFormated = title.split(' ').join('+');
  return `https://www.google.com/search?q=${titleFormated}+lyrics`
}

export function getLyricArray(lyricString) {
  const lyricSplit = lyricString?.split('\n');
  const lyricArray = [[]];
  for ( let c = 0; c < lyricSplit.length; c += 1) {
    if (lyricSplit[c] !== '') {
      lyricArray[lyricArray.length - 1].push(lyricSplit[c]);
    }
    else {
      lyricArray.push([]);
    }
  }
  return lyricArray;
}

// export async function getLyrics(title) {
//   const lyricArray = [];
//   const lyricUrl = getTitleLink(title)
//   return await axios({
//     method: "get",
//     withCredentials: false,
//     url: lyricUrl,
//   })
//     .then((res) => {
//       const html = res.data;
//       const $ = cheerio.load(html);
//       const lyricArray = [];
//       $(".ujudUb", html).each((blockId, blockEl) => {
//         console.log('block');
//         const block = [];
//         if (blockId !== 0) {
//           $(blockEl)
//             .children()
//             .each((lineId, lineEl) => {
//               const lineText = $(lineEl).text();
//               if (lineText !== "") block.push($(lineEl).text());
//             });
//           lyricArray.push(block);
//         }
//       });
//       console.log($);
//       return lyricArray
//     })
//     .catch((er) => {
//       console.log(er);
//     });
// }