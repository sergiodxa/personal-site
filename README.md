# Personal site

This is the code behind `sergiodxa.com`.

[![Build Status](https://travis-ci.org/sergiodxa/personal-site.svg?branch=master)](https://travis-ci.org/sergiodxa/personal-site)

## How to run

### Development

All that's needed to run this blog is:

```bash
yarn
yarn dev
```

Then head to http://localhost:3001. Changes you make to components will henceforth be reflected there in realtime.

### Deployment

> The deployment is automatic via Travis CI after each commit.

All that's needed to deploy this site to the cloud is to execute a single command

```
yarn deploy
```

This will build and export to HTML files the site, generate the RSS feed, deploy it to [Now](https://now.sh) and then alias it automatically.
