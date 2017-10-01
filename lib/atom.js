const { parse } = require('url');
const essays = require('../data/essays');
const max = 100;

module.exports = () => `<?xml version="1.0" encoding="utf-8"?>
  <feed xmlns="http://www.w3.org/2005/Atom">
    <title>Sergio Xalambrí</title>
    <subtitle>Essays</subtitle>
    <link href="https://sergio.now.sh/atom" rel="self"/>
    <link href="https://sergio.now.sh/"/>
    <updated>${essays[0].date}</updated>
    <id>https://sergio.now.sh/</id>
    <author>
      <name>Sergio Xalambrí</name>
      <email>sergiodxa@gmail.com</email>
    </author>
    ${essays.slice(0, max).reduce((acc, essay) => {
      const url = parse(essay.link);
      const link =
        url.hostname !== null
          ? essay.link
          : `https://sergio.now.sh${essay.link}`;

      return `${acc}
        <entry>
          <id>${essay.id}</id>
          <title>${essay.title}</title>
          <link href="${link}"/>
          <updated>${essay.date}</updated>
        </entry>`;
    }, '')}
  </feed>
`;
