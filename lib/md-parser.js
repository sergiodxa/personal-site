import createParser from '@platzi/markdown';
import highlightjs from 'markdown-it-highlightjs';
import anchors from 'markdown-it-headinganchor';
import regexp from 'markdown-it-regexp';

// custom plugin for figcaption
const captions = regexp(/~\[([^\]]*)\]\(([^\)]*)\)/, (match, utils) => {
  const figcaption = `<figcaption>${match[1]}</figcaption>`;
  const img = `<img src="${match[2]}" />`;
  return `<figure>${img}${figcaption}</figure>`;
});

// custom plugin for Twitter mentions
const mentions = regexp(/@(\w+)/, (match, utils) => {
  const url = `https://twitter.com/@${match[1]}`;

  return `<a href="${utils.escape(url)}" target="_blank">${utils.escape(
    match[1]
  )}</a>`;
});

export default createParser(undefined, [
  [anchors, { anchorClass: 'anchor' }],
  highlightjs,
  captions,
  mentions
]);
