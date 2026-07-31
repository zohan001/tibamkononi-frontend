# API.md

# Tibamkononi REST API

## Base URL

```
https://your-domain/v1
```

Local development default: `http://localhost:5000/v1`

## Authentication

Most endpoints require a Bearer JWT token. Obtain one from `POST /auth/login`.

```
Authorization: Bearer <access_token>
```

Roles: `admin`, `county_admin`, `hospital_admin`, `doctor`, `nurse`, `receptionist`, `pharmacist`, `lab_tech`. Role-restricted endpoints return `403` for unauthorized roles.

## Response Formats

### Success

```json
{
  "success": true,
  "message": "Optional success message",
  "data": {}
}
```

List endpoints return the array directly under `data`. A few endpoints return a bare array or object.

### Error

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": []
}
```

## Health

### GET /health

Unauthenticated health check.

```json
{ "status": "ok" }
```

---

## Auth

### POST /auth/login

Request:

```json
{
  "email": "admin@tibamkononi.co.ke",
  "password": "admin123"
}
```

Response:

```json
{
  "access_token": "jwt",
  "token_type": "bearer",
  "user": {
    "id": "123",
    "role": "hospital_admin",
    "full_name": "Jane Doe",
    "email": "jane@tibamkononi.co.ke",
    "hospital_slug": "coast-general",
    "hospital_name": "Coast General Hospital"
  }
}
```

### POST /auth/register

Registers a user. Body: `{ full_name, email, password, role?, hospital_slug? }`.

### GET /auth/me

Returns the current user. Requires auth.

---

## Hospitals

### GET /hospitals

Lists all approved hospitals. Query: `?status=approved|pending|rejected`.

Public shape:

```json
{
  "id": "abc",
  "name": "Coast General Hospital",
  "slug": "coast-general",
  "licenseNumber": "HOS/001",
  "type": "District",
  "county": "Mombasa",
  "subCounty": "Mvita",
  "ward": "Railway",
  "physicalAddress": "Moi Avenue",
  "latitude": -4.04,
  "longitude": 39.66,
  "contactPhone": "041111111",
  "email": "info@coastgeneral.co.ke",
  "buildings": [
    {
      "id": "b1",
      "name": "Main Block",
      "floors": 4,
      "wards": [
        { "id": "w1", "name": "Ward A", "type": "General", "bedCount": 40, "bedsOccupied": 28 }
      ]
    }
  ],
  "amenities": ["ICU", "Pharmacy"],
  "suppliers": [{ "_id": "s1", "name": "MediSupply", "contact": "0722", "suppliesProvided": ["Gloves"] }],
  "status": "approved",
  "description": "..."
}
```

### POST /hospitals

Registers a hospital (creates as `pending` until a county admin approves). Body: `{ name, licenseNumber, type, county, subCounty, ward, physicalAddress, contactPhone, email, latitude, longitude, description?, amenities?, buildings? }`.

### GET /hospitals/:slug

Returns one hospital (public shape above).

### GET /hospitals/id/:hospitalId

Returns one hospital by Mongo id. Requires auth.

### PATCH /hospitals/:hospitalId/approve

Approves a pending hospital. Requires `admin` or `county_admin`.

### PATCH /hospitals/:hospitalId/reject

Rejects a pending hospital. Requires `admin` or `county_admin`.

---

## Patients

All patient endpoints are scoped to the hospital of the logged-in user and require auth.

Public shape: `{ id, fullName, idNumber, nhifNumber, age, gender, phone, address, emergencyContact, symptoms, hospitalSlug, registeredAt }`.

### GET /hospitals/:hospitalSlug/patients

Lists patients.

### POST /hospitals/:hospitalSlug/patients

Registers a patient. Body: `{ fullName, idNumber, nhifNumber?, age, gender, phone, address?, emergencyContact?, symptoms? }`.

### GET /hospitals/:hospitalSlug/patients/:patientId

Patient details.

### PATCH /hospitals/:hospitalSlug/patients/:patientId

Updates patient fields.

### DELETE /hospitals/:hospitalSlug/patients/:patientId

Removes patient and their diagnoses/prescriptions.

### GET /hospitals/:hospitalSlug/patients/:patientId/clinical-summary

AI-generated clinical summary.

### POST /hospitals/:hospitalSlug/patients/:patientId/diagnosis

Runs AI diagnosis. Body: `{ symptoms?, age?, gender?, attendingDoctor?, doctorConfirmation? }`. Response includes `diseases: [{ name, probability }]` (probability 0–100), `recommendedTests`, `recommendedTreatment` (with `stockAvailable`), `clinicalSummary`.

### GET /hospitals/:hospitalSlug/patients/:patientId/diagnosis

Latest diagnosis on record.

### POST /hospitals/:hospitalSlug/patients/:patientId/prescription

Creates a prescription and deducts stock. Body: `{ medicines: [{ name, dosage, frequency, duration, quantity }], notes?, prescribedBy? }`.

---

## Inventory

### GET /hospitals/:hospitalSlug/inventory

Lists inventory (public shape: `{ id, name, category, currentStock, unit, dailyUsage, daysRemaining, status, supplier, lastRestock, expiryDate, minimumStock }`).

### POST /hospitals/:hospitalSlug/inventory

Adds an item. Requires staff role.

### PATCH /hospitals/:hospitalSlug/inventory

Adjusts stock in bulk. Body: `{ adjustments: [{ id, delta, reason }] }`. Requires staff role.

### PATCH /hospitals/:hospitalSlug/inventory/:itemId

Updates one item. Requires staff role.

### DELETE /hospitals/:hospitalSlug/inventory/:itemId

Removes an item. Requires `hospital_admin` or `pharmacist`.

### GET /hospitals/:hospitalSlug/inventory/movements

Stock movements.

### GET /hospitals/:hospitalSlug/inventory/forecast

Forecast when items run out.

---

## Staff

### GET /hospitals/:hospitalSlug/staff

Lists staff.

### POST /hospitals/:hospitalSlug/staff

Adds staff. Requires manager role (`hospital_admin`, `doctor`).

### GET /hospitals/:hospitalSlug/staff/attendance

Attendance records: `{ staffId, staffName, role, date, checkInTime, checkOutTime, status }`.

### PATCH /hospitals/:hospitalSlug/staff/attendance

Updates attendance. Requires manager role.

### GET /hospitals/:hospitalSlug/staff/:staffId/clock-in

Clock in.

### GET /hospitals/:hospitalSlug/staff/:staffId/clock-out

Clock out.

### PATCH /hospitals/:hospitalSlug/staff/:staffId

Updates staff. Requires manager role.

### DELETE /hospitals/:hospitalSlug/staff/:staffId

Removes staff. Requires manager role.

---

## Appointments

### GET /appointments

Lists appointments. Public shape: `{ id, patientName, patientPhone, nhifNumber, hospitalSlug, hospitalName, department, doctorName, date, time, reason, status, createdAt }`.

### GET /appointments/available

Available slots. Query: `?hospital_slug=coast-general&date=2026-08-01`.

```json
[{ "time": "09:00", "doctor": "Dr. Ali", "available": true, "gemmaTip": "..." }]
```

### POST /appointments

Books an appointment. Body: `{ hospital_slug, department, doctor_name?, date, time, patient_name, patient_phone, nhif_number?, reason? }`.

### GET /appointments/:appointmentId

One appointment.

### PATCH /appointments/:appointmentId

Updates an appointment. Requires auth.

### PATCH /appointments/:appointmentId/cancel

Cancels an appointment.

### DELETE /appointments/:appointmentId

Removes an appointment. Requires auth.

---

## Announcements

### GET /announcements

Lists announcements: `{ id, type, severity, pinned, createdAt, title, body, targetedHospitals, author, authorRole }`.

### POST /announcements

Creates an announcement. Requires `admin`, `county_admin`, or `hospital_admin`. Body: `{ title, body, type?, severity?, targeted_hospitals? }`.

### DELETE /announcements/:announcementId

Removes an announcement. Same roles as create.

---

## Emergency

### POST /emergency/analyze

Analyzes an emergency report. Body: `{ type, description, location?, casualties?, injuries? }`. Response: `{ type, severity, description, casualties, hazards, recommendedResponse }`.

### POST /emergency/send

Sends an emergency (optionally after analysis). Body: `{ type, description, location?, casualties?, severity?, analysis? }`.

### GET /emergency

Lists emergency requests.

### GET /emergency/:emergencyId

One emergency request.

### POST /emergency/:emergencyId/dispatch

Dispatches response. Requires `county_admin` or `admin`.

---

## Triage

### POST /triage/analyze

AI triage. Body: `{ symptoms, age?, gender?, additional_info? }`.

Response:

```json
{
  "level": "urgent",
  "diseases": [{ "name": "Malaria", "probability": 0.72 }],
  "hospitalRecommendations": [
    {
      "rank": 1,
      "name": "Coast General Hospital",
      "slug": "coast-general",
      "distance": "5.2 km",
      "testAvailable": true,
      "medicineInStock": true,
      "doctorPresent": true,
      "waitTime": "10 min",
      "gemmaRecommendation": true
    }
  ],
  "selfCareAdvice": ["..."],
  "emergencyWarning": null,
  "gemmaRecommendation": "..."
}
```

Note: `diseases[].probability` is a 0–1 fraction.

---

## County

### GET /county/dashboard

County-wide dashboard summary.

### GET /county/hospitals

All county hospitals: `{ id, name, slug, county, status, alertCount }`.

### GET /county/watchlist

Weekly watchlist: `{ hospitalName, hospitalSlug, score, severity, summary }`.

### POST /county/hospitals/:hospitalId/approve

Approves a pending hospital. Requires `admin` or `county_admin`.

### POST /county/hospitals/:hospitalId/reject

Rejects a pending hospital. Requires `admin` or `county_admin`.

---

## Reports

All report endpoints require auth.

### GET /reports/hospital/:hospitalSlug

Hospital report (inventory, staff, patients, bed occupancy).

### GET /reports/county

County report. Requires `admin` or `county_admin`.

### GET /reports/patient/:patientId

Patient report.

### GET /reports/inventory/:hospitalSlug

Inventory report.

---

## AI

All AI endpoints require auth.

### POST /ai/triage

Body: `{ symptoms, age?, gender? }`. Returns triage analysis.

### POST /ai/diagnosis

Body: `{ symptoms, age?, gender? }`. Returns `{ diseases: [{ name, probability }], recommendedTests, recommendedTreatment, clinicalSummary }`. Probabilities are 0–100.

### POST /ai/clinical-summary

Body: `{ patient?, diagnosis?, recentVisits? }`. Returns clinical summary text.

### POST /ai/treatment-plan

Body: `{ diagnosis, inventory? }`. Returns treatment plan with stock availability.

---

## HTTP Status Codes

- 200 OK
- 201 Created
- 400 Bad Request (validation)
- 401 Unauthorized
- 403 Forbidden (insufficient role)
- 404 Not Found
- 409 Conflict
- 500 Internal Server Error
