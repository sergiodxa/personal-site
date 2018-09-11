const links = require("../../data/links.json");

// constants
const MAX = 100;
const NOW = new Date().toJSON();

function transform({ url, title, comment, date }) {
  const link = `https://sdx.im/link/${url}?source=rss`;

  return `
    <entry>
      <id>${url}</id>
      <title>${title}</title>
      <link href="${link}"/>
      <updated>${date}</updated>
      <content type="xhtml">
        <div xmlns="http://www.w3.org/1999/xhtml">
          <p>${comment}</p>
          <a href="${link}">Go to link</a>
        </div>
      </content>
      <author>
        <name>Sergio Xalambrí</name>
        <email>hello@sergiodxa.com</email>
      </author>
    </entry>`;
}

function concat(total, item) {
  return total + item;
}

module.exports = () => {
  const linkString = links
    .slice(0, MAX)
    .map(transform)
    .reduce(concat, "");

  return `<?xml version="1.0" encoding="utf-8"?>
  <feed xmlns="http://www.w3.org/2005/Atom">
    <title>Sergio Xalambrí - Shared Links</title>
    <link href="https://sergiodxa.com/links/atom" rel="self"/>
    <link href="https://sergiodxa.com/links"/>
    <updated>${NOW}</updated>
    <id>https://sergiodxa.com/</id>
    <author>
      <name>Sergio Xalambrí</name>
      <email>hello@sergiodxa.com</email>
    </author>${linkString}
  </feed>`;
};
