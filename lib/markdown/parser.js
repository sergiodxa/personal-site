import createParser from '@platzi/markdown';
import highlightjs from 'markdown-it-highlightjs';
import anchors from 'markdown-it-headinganchor';
import codesandbox from 'markdown-it-codesandbox';
import mentions from 'markdown-it-mentions';

import slugify from 'slugify';

import captions from './plugins/captions';
import gist from './plugins/gist';
import tweet from './plugins/tweet';

export default createParser(undefined, [
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
  codesandbox,
  [mentions, { external: true }],
  captions,
  gist,
  tweet
]);
