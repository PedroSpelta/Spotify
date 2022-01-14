
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
