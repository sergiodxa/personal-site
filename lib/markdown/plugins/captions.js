import regexp from 'markdown-it-regexp';

// custom plugin for figcaption
const captions = regexp(/~\[([^\]]*)\]\(([^\)]*)\)/, match => {
  const figcaption = `<figcaption>${match[1]}</figcaption>`;
  const img = `<img src="${match[2]}" />`;
  return `<figure>${img}${figcaption}</figure>`;
});

export default captions;