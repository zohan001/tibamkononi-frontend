# Tibamkononi

## Overview

Tibamkononi is an AI-powered healthcare management platform for
hospitals and county health departments, integrating patient management,
AI-assisted triage, emergency response, inventory, appointments,
reporting, and analytics.

## Features

- Multi-hospital support with county oversight
- Electronic Medical Records with AI-assisted diagnosis support
- AI triage with hospital recommendations
- Inventory management with forecasting and stock deductions
- Staff management with attendance and clock in/out
- Bed and ward management
- Appointment scheduling
- Emergency reporting and dispatch
- Announcements and county watchlist
- Reporting dashboards

## Repository Structure

```
tibamkononi-frontend/
├── backend/          Express + MongoDB REST API (see backend/README)
└── frontend/         Next.js frontend (App Router) + all documentation (frontend/doc)
```

## Tech Stack

- Next.js + TypeScript
- Tailwind CSS + shadcn/ui
- Node.js + Express
- MongoDB (Mongoose)
- Zod validation, JWT auth, bcrypt
- Gemma/Gemini AI (with graceful offline fallback)

## Quick Start

See `frontend/doc/INSTALLATION.md`. Summary:

```bash
# MongoDB (Docker)
docker run -d --name tibamkononi-mongo -p 27017:27017 mongo:4.4

# Backend
cd backend && npm install && npm run seed && npm run dev

# Frontend
cd frontend && npm install && npm run dev
```

Frontend: http://localhost:3000 — Backend: http://localhost:5000/v1

Demo admin login: `admin@tibamkononi.co.ke` / `admin123`

## Documentation

- `frontend/doc/API.md` — REST API reference
- `frontend/doc/ARCHITECTURE.md` — system architecture
- `frontend/doc/DATABASE.md` — data model
- `frontend/doc/INSTALLATION.md` — setup guide
- `frontend/doc/DEPLOYMENT.md` — production deployment
- `frontend/doc/TESTING.md` — testing strategy
