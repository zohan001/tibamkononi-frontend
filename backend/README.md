# Tibamkononi Backend

Express + MongoDB REST API for the Tibamkononi healthcare platform.
Serves under `/v1`.

## Quick Start

```bash
npm install
cp .env.example .env   # set MONGODB_URI, JWT_SECRET, PORT
npm run seed           # optional demo data
npm run dev            # nodemon on http://localhost:5000/v1
```

## Scripts

- `npm start` — run with plain Node
- `npm run dev` — run with nodemon
- `npm run seed` — seed demo data (users, hospitals, inventory, staff, announcements)
- `npm test` — Jest + Supertest (uses `tibamkononi_test` database)

## Structure

```
src/
├── app.js            Express app (helmet, cors, morgan, rate limit, error handler)
├── server.js         Entry point
├── config/env.js     Environment config (PORT, MONGODB_URI, JWT_SECRET)
├── routes/           HTTP routes, mounted under /v1 in routes/index.js
├── controllers/      Request handling
├── services/         Business logic
├── models/           Mongoose schemas
├── validators/       Zod schemas
├── middleware/       requireAuth, requireRoles, validate, error handler
├── utils/            ApiError, asyncHandler
└── seed.js           Demo data
```

See `../doc/API.md` for the full API reference and `../doc/DEPLOYMENT.md`
for production notes. AI features use `@google/generative-ai`; without a
`GEMINI_API_KEY` they fall back to heuristic responses.
