const express = require('express')

const app = express()

app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    env: process.env.NODE_ENV || 'development',
    uptimeSec: Math.round(process.uptime()),
    time: new Date().toISOString()
  })
  
})

app.use('/api', (req, res) => {
  res.status(404).json({ ok: false, error: 'Not Found' })
})

app.use((err, req, res, next) => {
  console.error(err)
  if (res.headersSent) return next(err)
  return res.status(500).json({ ok: false, error: 'Internal Server Error' })
})

module.exports = app
