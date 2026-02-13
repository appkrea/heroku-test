const DEFAULT_PORT = 3001

function resolvePort() {
  const raw = process.env.PORT
  if (!raw) return DEFAULT_PORT

  const parsed = Number.parseInt(raw, 10)
  if (Number.isNaN(parsed) || parsed <= 0) return DEFAULT_PORT

  return parsed
}

const PORT = resolvePort()

module.exports = { PORT }
