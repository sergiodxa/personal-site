import { createElement } from 'react';
import createParser from '@platzi/markdown';
import highlightjs from 'markdown-it-highlightjs';
import anchors from 'markdown-it-headinganchor';
import regexp from 'markdown-it-regexp';
import codesandbox from 'markdown-it-codesandbox';
import mentions from 'markdown-it-mentions';

import slugify from 'slugify';
import { parse } from 'himalaya';

// custom plugin for figcaption
const captions = regexp(/~\[([^\]]*)\]\(([^\)]*)\)/, (match, utils) => {
  const figcaption = `<figcaption>${match[1]}</figcaption>`;
  const img = `<img src="${match[2]}" />`;
  return `<figure>${img}${figcaption}</figure>`;
});

// custom plugin for twitter cards
const tweet = regexp(/@\[twitter\]\(([^\)]*)\)/, (match, utils) => {
  const url = match[1];
  const defaultMessage = 'Read the tweet!';
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

const mdParser = createParser(undefined, [
  [
    anchors,
    {
      anchorClass: 'anchor',
      slugify(title) {
        return slugify(title, { lower: true });
      }
    }
  ],
  highlightjs,
  captions,
  [mentions, { external: true }],
  tweet,
  gist,
  codesandbox
]);

function toElement(element, index) {
  if (element.type === 'text') return element.content;
  if (element.type === 'element') {
    const props = (element.attributes || [])
      .map(
        ({ key, value }) =>
          key === 'class' ? { key: 'className', value } : { key, value }
      )
      .reduce(
        (attributes, { key, value }) => ({ ...attributes, [key]: value }),
        { key: index }
      );
    return createElement(
      element.tagName,
      props,
      element.children.map(toElement)
    );
  }
  return null;
}

export default md => parse(mdParser(md)).map(toElement);
