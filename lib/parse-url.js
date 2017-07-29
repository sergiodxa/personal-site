import url from 'url'
import memoize from 'lodash.memoize'

export default memoize(url.parse)
