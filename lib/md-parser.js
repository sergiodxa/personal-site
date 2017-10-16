import createParser from '@platzi/markdown';
import highlightjs from 'markdown-it-highlightjs';
import anchors from 'markdown-it-headinganchor';
import regexp from 'markdown-it-regexp';
import codesandbox from 'markdown-it-codesandbox';

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

// custom plugin for twitter cards
const tweet = regexp(/@\[twitter\]\(([^\)]*)\)/, (match, utils) => {
  const url = match[1];
  const defaultMessage = match[1] || 'Read the tweet!';
  const script =
    '<script async src="//platform.twitter.com/widgets.js"></script>';
  return `<blockquote class="twitter-tweet" data-lang="en"><a href="${url}">${defaultMessage}</a></blockquote>${script}`;
});

// custom plugin for GH gist
const gist = regexp(/@\[gist\]\(([^\)]*)\)/, (match, utils) => {
  const url = match[1];
  const jsUrl = `${url}.js`;
  return `<script src=${jsUrl}></script>`;
});

export default createParser(undefined, [
  [anchors, { anchorClass: 'anchor' }],
  highlightjs,
  captions,
  mentions,
  tweet,
  gist,
  codesandbox
]);
