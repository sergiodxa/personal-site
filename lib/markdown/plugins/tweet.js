import regexp from 'markdown-it-regexp';

// custom plugin for twitter cards
const tweet = regexp(/@\[twitter\]\(([^\)]*)\)/, match => {
  const id = match[1];
  return `<twitter-card id="${id}"></twitter-card>`;
});

export default tweet;
