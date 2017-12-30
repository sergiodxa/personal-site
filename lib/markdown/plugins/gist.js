import regexp from 'markdown-it-regexp';

// custom plugin for GH gist
const gist = regexp(/@\[gist\]\(([^\)]*)\)/, match => {
  const src = match[1];

  return `<gh-gist src="${src}"></gh-gist>`;
});

export default gist;
