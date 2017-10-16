import compose from 'recompose/compose';

import Essay from '../../layouts/essay.js';

import withError from '../../lib/with-error.js';
import withGA from '../../lib/with-ga.js';
import withSW from '../../lib/with-sw.js';

export default compose(withError, withGA, withSW)(() => (
  <Essay
    title="This is an example"
    date="2017-10-15T00:00:00Z"
    description=""
    content={`
*[HTML]: HyperText Markup Language

# This is an example
This is [used](https://zeit.co) to \`display\` **every** _possible_ styled HTML ++element++ ==parsed from Markdown== by @sergiodxa

@[twitter](https://twitter.com/sergiodxa/status/914228079391903744)

# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

> This is a quote
> by _Sergio Xalambrí_

\`\`\`diff
+ New code
- Old code
\`\`\`

\`\`\`js
export default () => (
  <h1>Heading 1</h1>
)
\`\`\`

- this
- is
- a
- list

1. Item 1
1. Item 2
1. Item 3
1. Item 4

~[This is my photo](/static/now-black.png)

| Header | Header 2 | Header 3 |
| ------ | -------- | -------- |
| Value  | Value 2  | Value 3  |
    `}
  />
));
