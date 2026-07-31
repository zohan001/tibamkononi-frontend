# Changelog

All notable changes to Tibamkononi will be documented in this file.

This project follows Semantic Versioning.

---

# Version 1.0.0

Initial release — complete rebuild of the REST API and frontend
integration.

## Added

### Backend (`backend/`)

- Express + MongoDB REST API under `/v1`
- JWT authentication with role-based access control (admin, county_admin,
  hospital_admin, doctor, nurse, receptionist, pharmacist, lab_tech)
- Zod input validation on all mutations
- Auth, hospitals, patients, inventory, staff, appointments,
  announcements, emergency, triage, county, reports, and AI modules
- AI services (Gemma/Gemini) for triage, diagnosis, treatment plans,
  clinical summaries, and emergency analysis with offline fallback
- Hospital registration → approval workflow (public shape with `id`)
- Stock-aware prescription and inventory forecasting
- Seed script with demo users, hospitals, inventory, staff,
  announcements, and appointments
- Jest + Supertest test suite (15 tests, 3 suites) against a dedicated
  test database

### Frontend

- REST client that auto-attaches the Bearer token and unwraps responses
- Fixed appointment/announcement/hospital endpoint contracts
- New routes: `/hospital-portal`, `/self-diagnosis`, `/profile`,
  county `/hospitals` and `/weekly-watchlist`
- Patient contract aligned to backend (`id`, `registeredAt`)

### Documentation

- Accurate API reference, architecture, database, installation,
  deployment, and testing guides matching the implemented backend

## Security

- Authentication
- JWT
- Role-Based Access Control
- Helmet, CORS, rate limiting

---

# Upcoming Version 1.1

Planned

- SMS
- Email
- Queue Management
- Better Analytics
- PDF Export
- CSV Export

---

# Upcoming Version 2.0

Planned

- Cross-Hospital Referrals
- Shared Emergency Services
- Expanded Disease Surveillance

---

# Upcoming Version 3.0

Planned

- National Integration
- NHIF Integration
- Ministry of Health APIs
- AI Prediction Engine

---

# Maintenance

Future releases will include

- Bug fixes
- Security patches
- Performance improvements
- UI improvements
- AI improvements
