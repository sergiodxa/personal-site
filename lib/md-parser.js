import createParser from '@platzi/markdown';
import highlightjs from 'markdown-it-highlightjs';
import anchors from 'markdown-it-headinganchor';

export default createParser(undefined, [
  [anchors, { anchorClass: 'anchor' }],
  highlightjs
]);
