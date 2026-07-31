# DEPLOYMENT.md

# Tibamkononi Deployment Guide

## Overview

This guide describes deploying Tibamkononi in development and production.
The frontend (Next.js) and backend (Express) deploy independently and
share a MongoDB database.

## Requirements

- Node.js 20+
- MongoDB 4.4+ (MongoDB Atlas recommended for production)
- npm
- Git

## Environment Variables

Backend (`.env`):

```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/tibamkononi
JWT_SECRET=replace_with_secure_secret
PORT=5000
GEMINI_API_KEY=optional_ai_key
```

Frontend (`.env.local`):

```env
NEXT_PUBLIC_API_URL=https://your-api-domain/v1
```

The frontend reads `NEXT_PUBLIC_API_URL` for all API calls. In local
development use `http://localhost:5000/v1`.

## Local Deployment

1. Clone the repository.
2. Start MongoDB (`docker run -d --name tibamkononi-mongo -p 27017:27017 mongo:4.4`).
3. `cd backend && npm install`, create `.env`, then `npm run seed` and `npm run dev`.
4. `cd frontend && npm install`, create `.env.local`, then `npm run dev`.
5. Verify `/v1/health` and the login page.

## Production Deployment

### Frontend

Deploy with Vercel (`.vercel/project.json` is already configured). Set the
`NEXT_PUBLIC_API_URL` environment variable in the Vercel project settings.

### Backend

Deploy with Render, Railway, or Azure App Service as a Node.js service.
Build command: `npm install`; start command: `npm start`. Set
`MONGODB_URI`, `JWT_SECRET`, and optionally `GEMINI_API_KEY`.

### Database

Use MongoDB Atlas with IP allow lists and automated backups. The backend
creates indexes automatically on startup. For demo data run `npm run seed`
once after deployment.

## Seed Data

`npm run seed` (in `backend/`) creates demo users:

- `admin@tibamkononi.co.ke` / `admin123` — system admin
- `county@tibamkononi.co.ke` / `county123` — county admin
- `doctor@tibamkononi.co.ke` / `doctor123`
- `hospital@tibamkononi.co.ke` / `hospital123` — hospital admin
- `nurse@tibamkononi.co.ke` / `nurse123`
- `receptionist@tibamkononi.co.ke` / `reception123`
- `pharmacist@tibamkononi.co.ke` / `pharmacist123`
- `lab@tibamkononi.co.ke` / `lab123`

Plus 4 hospitals, inventory, staff, announcements, and appointments.

## Security Checklist

- Enable HTTPS.
- Store secrets in environment variables.
- Rotate JWT secrets periodically.
- Use strong passwords.
- Restrict database access.

## Monitoring

- Application logs
- Error tracking
- Performance monitoring
- Database monitoring

## Backup Strategy

- Daily database backups
- Regular restore testing
- Configuration backup

## Scaling

- Horizontal API scaling
- CDN for frontend assets
- Database indexing
- Caching where appropriate

## Maintenance

- Apply security updates
- Monitor dependencies
- Review logs
- Test backups regularly
