import { useEffect, useState } from 'react'

export default function App() {
  const [health, setHealth] = useState(null)

  useEffect(() => {
    fetch('/api/health')
      .then((r) => r.json())
      .then(setHealth)
      .catch(() => setHealth({ ok: false }))
  }, [])

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-3xl p-6">
        <h1 className="text-3xl font-bold">AddYum</h1>
        <p className="mt-2 text-slate-600">
          Monorepo: backend (Node/Express) + frontend (Vite/React/Tailwind)
        </p>

        <div className="mt-6 rounded-xl border p-4">
          <div className="font-semibold">API health</div>
          <pre className="mt-2 overflow-auto rounded-lg bg-slate-50 p-3 text-sm">
            {health ? JSON.stringify(health, null, 2) : 'Loading...'}
          </pre>
        </div>
      </div>
    </div>
  )
}
