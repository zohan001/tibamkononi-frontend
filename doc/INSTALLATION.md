# INSTALLATION.md

# Tibamkononi Installation Guide

## Prerequisites

- Node.js 20 or later
- npm
- Git
- MongoDB 4.4+ (local Docker or MongoDB Atlas). Note: MongoDB 5.0+
  requires a CPU with AVX support; use `mongo:4.4` on older hardware.

## Clone the Repository

```bash
git clone https://github.com/zohan001/tibamkononi-frontend.git
cd tibamkononi-frontend
```

## Local MongoDB (Docker)

```bash
docker run -d --name tibamkononi-mongo -p 27017:27017 mongo:4.4
```

## Backend Setup

```bash
cd backend
npm install
```

Create `.env` from `.env.example`:

```env
MONGODB_URI=mongodb://localhost:27017/tibamkononi
JWT_SECRET=your_secret
PORT=5000
GEMINI_API_KEY=optional_ai_key
```

Seed demo data (users, hospitals, inventory, staff, announcements):

```bash
npm run seed
```

Start the backend:

```bash
npm run dev        # nodemon (development)
npm start          # node (production)
```

Backend serves on `http://localhost:5000/v1` with a health check at
`/v1/health`.

## Frontend Setup

```bash
cd ..   # repo root
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/v1
```

Start the frontend:

```bash
npm run dev
```

Frontend runs on `http://localhost:3000`.

## Verify Installation

- `curl http://localhost:5000/v1/health` returns `{"status":"ok"}`
- Login page loads at `http://localhost:3000/auth/login`
- Demo admin login: `admin@tibamkononi.co.ke` / `admin123`
- Hospital admin: `hospital@tibamkononi.co.ke` / `hospital123`
- County admin: `county@tibamkononi.co.ke` / `county123`

## Running Tests

```bash
cd backend
npm test
```

Jest requires the `--experimental-vm-modules` flag (already set in the
`test` script) and uses a separate `tibamkononi_test` database.

## Troubleshooting

### MongoDB won't start ("requires a CPU with AVX support")

Use the `mongo:4.4` image instead of `mongo:7`.

### Port Conflicts

Change the `PORT` value in the backend `.env`.

### Dependency Errors

Delete `node_modules` and the lock file, then `npm install` again.

## Recommended Development Tools

- Visual Studio Code
- MongoDB Compass
- Postman
- Git
- Chrome Developer Tools
