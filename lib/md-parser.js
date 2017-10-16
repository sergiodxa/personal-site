import createParser from '@platzi/markdown';
import highlightjs from 'markdown-it-highlightjs';
import anchors from 'markdown-it-headinganchor';
import regexp from 'markdown-it-regexp';

// custom plugin
const captions = regexp(/~\[([^\]]*)\]\(([^\)]*)\)/, (match, utils) => {
  const figcaption = `<figcaption>${match[1]}</figcaption>`;
  const img = `<img src="${match[2]}" />`;
  return `<figure>${img}${figcaption}</figure>`;
});

export default createParser(undefined, [
  [anchors, { anchorClass: 'anchor' }],
  highlightjs,
  captions
]);
