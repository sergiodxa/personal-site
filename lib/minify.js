/**
 * Remove line breaks and unnecessarry white spaces
 * @function minify
 * @param {String} text A text to minify
 * @returns {String} The minified text
 */
export default function minify(text) {
  return text.replace(/\n\s{0,}/g, "").replace(/\:\s/g, ":");
}
