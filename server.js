const { createServer } = require('http')
const { join } = require('path')
const { parse } = require('url')
const moduleAlias = require('module-alias')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

if (!dev) {
  moduleAlias.addAlias('react', 'preact-compat')
  moduleAlias.addAlias('react-dom', 'preact-compat')
}

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname } = parsedUrl

    if (pathname === '/service-worker.js') {
      const filePath = join(__dirname, '.next', pathname)
      app.serveStatic(req, res, filePath)
    } else {
      handle(req, res, parsedUrl)
    }
  }).listen(3000, err => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
