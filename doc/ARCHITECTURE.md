# ARCHITECTURE.md

# Tibamkononi System Architecture

## Overview

Tibamkononi is an AI-powered healthcare management platform for hospitals
and county health departments. It follows a modular, layered architecture
that separates presentation, business logic, and data access, and is
designed to scale from a single hospital to a county-wide healthcare
ecosystem.

## High-Level Architecture

```
Next.js Frontend  (Vercel)
      |
 REST / HTTPS
      |
Node.js + Express API  (Render / local :5000)
      |
 Business Services
      |
MongoDB Database  (Docker mongo:4.4 / Atlas)
      |
Gemma AI Services  (optional Gemini, graceful fallback)
```

## Frontend

- Next.js App Router (Next 14, TypeScript)
- Tailwind CSS + shadcn/ui components
- Zustand for auth/UI state, TanStack React Query for data fetching
- Feature-based components under `src/components/`
- REST client wrapper `src/lib/api.ts` that auto-attaches the Bearer
  token and unwraps common response envelopes

### Main Modules

- Public: Landing, Hospital Finder, Appointments, Self-Diagnosis/Triage,
  Emergency, Announcements, Register, Login
- Hospital portal (role-aware): Dashboard, Patients (+AI diagnosis),
  Inventory, Staff, Beds/Wards, Reports, Distress, Appointments
- County portal: Dashboard, Hospitals, Approvals, Weekly Watchlist,
  Announcements, Emergency Command Center, AI analytics

## Backend

Located in `backend/` (Node 20+, Express 4, Mongoose 8, Zod validation,
JWT auth). Clean layering:

- `src/routes/` — route definitions, mounted under `/v1` in `routes/index.js`
- `src/controllers/` — HTTP layer (parse, validate, respond)
- `src/services/` — business logic (pure, framework-free where possible)
- `src/models/` — Mongoose schemas
- `src/validators/` — Zod schemas shared by routes and services
- `src/middleware/` — `requireAuth`, `requireRoles` (flattened), `validate`, error handler
- `src/utils/` — `ApiError`, `asyncHandler`

### Modules

- Auth (login, register, me) — JWT + bcrypt
- Hospitals (register, list, approve/reject, public shape)
- Patients (CRUD, AI diagnosis, prescriptions, clinical summary)
- Inventory (CRUD, movements, forecast, stock deduction on prescription)
- Staff (CRUD, attendance, clock in/out)
- Appointments (book, available slots, cancel)
- Announcements (county/hospital broadcasts)
- Emergency (analyze, send, list, dispatch)
- Triage (AI analysis + hospital recommendations)
- County (dashboard, hospitals, weekly watchlist, approvals)
- Reports (hospital, county, patient, inventory)
- AI (triage, diagnosis, clinical summary, treatment plan)

## Database

MongoDB. Collections: users, hospitals, patients, staff, inventory,
appointments, announcements, emergencyRequests, diagnoses,
prescriptions. `hospitalSlug` scopes most healthcare records to a
hospital; patients are unique per hospital + ID number.

## AI Layer

Gemma/Gemini (via `@google/generative-ai`) assists with:

- Symptom analysis and triage
- Diagnosis support (with stock-aware treatment recommendations)
- Clinical summaries
- Emergency analysis and recommended response
- Operational summaries and county analytics

All AI calls degrade gracefully to heuristic responses when no
`GEMINI_API_KEY` is configured.

## Security

- JWT authentication (Bearer token)
- Role-based access control (`requireRoles`)
- Zod input validation on all mutations
- Helmet security headers, CORS, express-rate-limit
- bcrypt password hashing
- HTTPS in production

## Scalability

Designed for: single hospital → multiple hospitals → county deployment.
Future evolution can split services into microservices while preserving
the frontend API contracts.

## Deployment

Frontend (Vercel) and backend (Render/Railway) deploy independently,
sharing MongoDB as the persistence layer. See `DEPLOYMENT.md`.
