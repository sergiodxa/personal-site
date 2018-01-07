import { createElement } from 'react';
import { AllHtmlEntities } from 'html-entities';

import { Code, Pre } from '../../components/ui/code';
import { H1, H2, H3, H4, H5, H6 } from '../../components/ui/heading';
import { Figure, FigCaption, Image } from '../../components/ui/images';
import { UL, OL, LI, DL, DT, DD } from '../../components/ui/list';
import {
  Table,
  TH,
  TR,
  TD,
  THead,
  TBody,
  TFoot
} from '../../components/ui/table';
import { A, Abbr, BlockQuote, P, Mark } from '../../components/ui/text';
import Tweet from '../../components/ui/tweet';
import Gist from '../../components/ui/gist';

const entities = new AllHtmlEntities();

function mergeProps(baseProps, element) {
  return (element.attributes || [])
    .map(
      ({ key, value }) =>
        key === 'class' ? { key: 'className', value } : { key, value }
    )
    .map(
      ({ key, value }) =>
        key === 'frameborder' ? { key: 'frameBorder', value } : { key, value }
    )
    .map(
      ({ key, value }) =>
        key === 'allowfullscreen'
          ? { key: 'allowFullScreen', value }
          : { key, value }
    )
    .reduce(
      (attributes, { key, value }) => ({ ...attributes, [key]: value }),
      baseProps
    );
}

function matchElement({ tagName, children, attributes }, index) {
  const baseProps = { key: index };
  const props = mergeProps(baseProps, { attributes });

  if (tagName === 'p') {
    const invalidChild =
      children.filter(child => {
        switch (child.tagName) {
          case 'figure':
          case 'div':
          case 'gh-gist':
          case 'twitter-card': {
            return true;
          }
          default: {
            return false;
          }
        }
      }).length > 0;

    if (invalidChild) {
      return matchElement(
        {
          tagName: 'div',
          children,
          attributes
        },
        index
      );
    }
  }

  switch (tagName) {
    case 'br':
    case 'img':
    case 'hr': {
      return createElement(tagName, props);
    }
    case 'h1': {
      return createElement(H1, props, children.map(mapElement));
    }
    case 'h2': {
      return createElement(H2, props, children.map(mapElement));
    }
    case 'h3': {
      return createElement(H3, props, children.map(mapElement));
    }
    case 'h4': {
      return createElement(H4, props, children.map(mapElement));
    }
    case 'h5': {
      return createElement(H5, props, children.map(mapElement));
    }
    case 'h6': {
      return createElement(H6, props, children.map(mapElement));
    }
    case 'a': {
      return createElement(
        A,
        { ...props, color: 'blue', decoration: 'underline' },
        children.map(mapElement)
      );
    }
    case 'p': {
      return createElement(P, props, children.map(mapElement));
    }
    case 'blockquote': {
      return createElement(BlockQuote, props, children.map(mapElement));
    }
    case 'code': {
      return createElement(Code, props, children.map(mapElement));
    }
    case 'pre': {
      return createElement(Pre, props, children.map(mapElement));
    }
    case 'abbr': {
      return createElement(Abbr, props, children.map(mapElement));
    }
    case 'mark': {
      return createElement(Mark, props, children.map(mapElement));
    }
    case 'ul': {
      return createElement(UL, props, children.map(mapElement));
    }
    case 'ol': {
      return createElement(OL, props, children.map(mapElement));
    }
    case 'li': {
      return createElement(LI, props, children.map(mapElement));
    }
    case 'dl': {
      return createElement(DL, props, children.map(mapElement));
    }
    case 'dt': {
      return createElement(DT, props, children.map(mapElement));
    }
    case 'dd': {
      return createElement(DD, props, children.map(mapElement));
    }
    case 'table': {
      return createElement(Table, props, children.map(mapElement));
    }
    case 'th': {
      return createElement(TH, props, children.map(mapElement));
    }
    case 'td': {
      return createElement(TD, props, children.map(mapElement));
    }
    case 'tr': {
      return createElement(TR, props, children.map(mapElement));
    }
    case 'thead': {
      return createElement(THead, props, children.map(mapElement));
    }
    case 'tbody': {
      return createElement(TBody, props, children.map(mapElement));
    }
    case 'tfoot': {
      return createElement(TFoot, props, children.map(mapElement));
    }
    case 'figure': {
      return createElement(Figure, props, children.map(mapElement));
    }
    case 'figcaption': {
      return createElement(FigCaption, props, children.map(mapElement));
    }
    case 'twitter-card': {
      return createElement(Tweet, props);
    }
    case 'gh-gist': {
      return createElement(Gist, props);
    }
    default: {
      return createElement(tagName, props, children.map(mapElement));
    }
  }
}

function mapElement(element, index) {
  switch (element.type) {
    case 'text': {
      return entities.decode(element.content);
    }
    case 'element': {
      return matchElement(element, index);
    }
    default: {
      return null;
    }
  }
}

export default mapElement;
