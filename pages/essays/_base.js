import compose from 'recompose/compose';

import Essay from '../../layouts/essay.js';

import withError from '../../lib/with-error.js';
import withGA from '../../lib/with-ga.js';
import withSW from '../../lib/with-sw.js';

export default compose(withError, withGA, withSW)(() => (
  <Essay
    title="Title"
    date="YYYY-MM-DDT00:00:00Z"
    description=""
    content={/*markdown*/`
# Title
    `}
  />
));
