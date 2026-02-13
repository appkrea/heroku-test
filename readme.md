# AddYum

## Stack
- `backend`: Node.js + Express 5
- `frontend`: Vite + React + Tailwind CSS 3
- npm workspaces: `backend`, `frontend`

## Requirements
- Node.js 18+
- npm 9+

## Install
```bash
npm install
```

## Development
```bash
npm run dev
```

Co se spusti:
- backend na `http://localhost:3001`
- frontend na `http://localhost:5173`
- frontend proxy posila `/api/*` na backend
- backend pouziva `node --watch` (auto restart pri zmene server souboru)

URL:
- frontend: `http://localhost:5173`
- backend health: `http://localhost:3001/api/health`
- health pres frontend proxy: `http://localhost:5173/api/health`

## Production (local simulation)
```bash
npm run prod
```

Co se deje:
- `npm run build` vytvori frontend build (`frontend/dist`)
- backend bezi v `NODE_ENV=production`
- backend servuje frontend statiku z `frontend/dist`
- SPA fallback vraci `index.html` pro non-API routy

URL:
- app: `http://localhost:3001`
- API health: `http://localhost:3001/api/health`

## Scripts
Root `package.json`:
- `npm run dev`
- `npm run dev:backend`
- `npm run dev:frontend`
- `npm run build`
- `npm run start`
- `npm run prod`

Backend `backend/package.json`:
- `npm run dev --workspace backend` -> `NODE_ENV=development node --watch server.js`
- `npm run start --workspace backend` -> `NODE_ENV=production node server.js`

## API
`GET /api/health` vraci:
```json
{
  "ok": true,
  "env": "development",
  "uptimeSec": 12,
  "time": "2026-02-13T10:00:00.000Z"
}
```

Dalsi chovani API:
- neznamy `/api/*` endpoint -> `404` JSON
- nechytena chyba -> `500` JSON

## Operational Notes
- Kvuli Express 5 a `path-to-regexp` je catch-all route v backendu regex `/.*/` (ne `'*'`).
- Backend ma graceful shutdown pro `SIGINT` a `SIGTERM`.
