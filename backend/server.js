const path = require('path')
const express = require('express')
const app = require('./app')
const { PORT } = require('./config')

const isProd = process.env.NODE_ENV === 'production'

if (!isProd) {
  // DEV: redirect all non-API routes to Vite
  app.get(/.*/, (req, res, next) => {
    if (req.path.startsWith('/api')) return next()
    return res.redirect(`http://localhost:5173${req.originalUrl}`)
  })
} else {
  // PROD: serve frontend dist from ../frontend/dist
  const distPath = path.join(__dirname, '../frontend/dist')
  app.use('/', express.static(distPath))
  app.get(/.*/, (req, res, next) => {
    if (req.path.startsWith('/api')) return next()
    return res.sendFile(path.join(distPath, 'index.html'))
  })
}

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} (${isProd ? 'prod' : 'dev'})`)
})

function shutdown(signal) {
  console.log(`Received ${signal}, shutting down...`)
  server.close((err) => {
    if (err) {
      console.error('Shutdown error:', err)
      process.exit(1)
    }
    process.exit(0)
  })
}

process.on('SIGINT', () => shutdown('SIGINT'))
process.on('SIGTERM', () => shutdown('SIGTERM'))
