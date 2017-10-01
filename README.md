# Personal site
This is the code behind `sergio.now.sh`.

## Stack
- Next.js
- React
- Now.sh

## How to run
### Development
All that's needed to run this blog is:

```bash
yarn
yarn dev
```

Then head to http://localhost:3000. Changes you make to components will henceforth be reflected there in realtime.

### Deployment

All that's needed to deploy this site to the cloud is to execute a single command

```
yarn deploy
```

This will build and export to HTML files the site, deploy it to [Now.sh](https://now.sh) and then alias it automatically.
