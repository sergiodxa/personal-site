const { parse } = require('url');
const essays = require('../../data/essays.json');

// constants
const MAX = 100;
const NOW = new Date().toJSON();

function transform(essay) {
  const url = parse(essay.link);
  const link =
    url.hostname !== null
      ? essay.link
      : `https://sergio.now.sh${essay.link}`;

  return `
    <entry>
      <id>${essay.id}</id>
      <title>${essay.title}</title>
      <link href="${link}"/>
      <updated>${essay.date}</updated>
      <content type="xhtml">
        <div xmlns="http://www.w3.org/1999/xhtml">
          <a href="${link}">Read essay</a>
        </div>
      </content>
      <author>
        <name>Sergio Xalambrí</name>
        <email>sergiodxa@gmail.com</email>
      </author>
    </entry>`;
}

function concat(total, item) {
  return total + item
}

module.exports = () => {
  const essayString = essays
    .slice(0, MAX)
    .map(transform)
    .reduce(concat, '');

  return `<?xml version="1.0" encoding="utf-8"?>
  <feed xmlns="http://www.w3.org/2005/Atom">
    <title>Sergio Xalambrí</title>
    <subtitle>Essays</subtitle>
    <link href="https://sergio.now.sh/atom" rel="self"/>
    <link href="https://sergio.now.sh/"/>
    <updated>${NOW}</updated>
    <id>https://sergio.now.sh/</id>
    <author>
      <name>Sergio Xalambrí</name>
      <email>sergiodxa@gmail.com</email>
    </author>${essayString}
  </feed>`;
};
