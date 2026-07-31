# TESTING.md

# Tibamkononi Testing Guide

## Purpose

This document outlines the testing strategy for Tibamkononi to ensure
reliability, security, and usability.

## Backend Automated Tests

The backend uses **Jest + Supertest** against a dedicated
`tibamkononi_test` database.

```bash
cd backend
npm test
```

Notes:

- The `test` script runs `node --experimental-vm-modules` because the
  backend is an ES module (`"type": "module"`).
- `tests/setup.js` connects the test database and ensures a clean state.
- `tests/helpers.js` provides request/login helpers.
- Suites: `auth.test.js`, `hospital.test.js`, `inventory.test.js` —
  15 tests, 3 suites, all passing.

## Testing Levels

### Unit Testing

Verify individual functions, utilities, and business logic.

Examples:
- Zod input validation
- Inventory calculations (`daysRemaining`, `status`)
- AI response formatting and graceful fallback

### Integration Testing

Ensure modules work together correctly.

Scenarios:
- Patient registration to EMR
- Appointment scheduling
- Inventory updates after prescriptions
- AI-assisted triage workflow

### API Testing

Verify:
- Authentication
- CRUD operations
- Validation
- Error handling
- Authorization (RBAC)

### User Interface Testing

Check:
- Responsive layouts
- Navigation
- Forms
- Tables
- Charts
- Accessibility basics

### Performance Testing

Measure:
- Page load time
- API response time
- Database query performance
- Concurrent user handling

### Security Testing

Verify:
- Authentication
- RBAC
- Input validation
- Unauthorized access prevention
- Secure headers

## Acceptance Testing

Confirm that:
- Patients can be registered.
- Appointments can be scheduled.
- Inventory updates correctly.
- AI insights are displayed.
- Reports generate successfully.
- Emergency workflows function correctly.

## Regression Testing

Repeat key workflows after changes to ensure existing functionality
remains stable.

## Bug Reporting

Each report should include:
- Title
- Description
- Steps to reproduce
- Expected result
- Actual result
- Screenshots (if applicable)
- Severity

## Recommended Tools

- Jest
- Supertest
- Postman
- Chrome DevTools
- MongoDB Compass

## Testing Checklist

- Authentication
- Patients
- Inventory
- Staff
- Beds
- Reports
- Emergency
- AI Features
- Dashboard
- Mobile responsiveness
