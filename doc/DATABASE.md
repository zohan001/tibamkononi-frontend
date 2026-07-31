# DATABASE.md

# Tibamkononi Database Design

## Overview

Tibamkononi uses MongoDB as its primary database. Collections are
organized around healthcare workflows and support multi-hospital
deployments. The dev database is `tibamkononi`; tests run against
`tibamkononi_test`.

## Core Collections

### users

Stores login accounts for all roles (`admin`, `county_admin`,
`hospital_admin`, `doctor`, `nurse`, `receptionist`, `pharmacist`,
`lab_tech`).

Key fields: `fullName`, `email` (unique), `passwordHash`, `role`,
`hospitalSlug`, `hospitalName`, `active`.

### hospitals

Stores hospital profiles, from registration through approval.

Key fields: `name`, `slug` (unique), `licenseNumber`, `type`, `county`,
`subCounty`, `ward`, `physicalAddress`, `latitude`, `longitude`,
`contactPhone`, `email`, `description`, `amenities`,
`buildings[].wards[]` (`bedCount`, `bedsOccupied`), `suppliers[]`,
`status` (`pending` | `approved` | `rejected`).

### patients

Stores patient demographics, scoped to a hospital.

Key fields: `fullName`, `idNumber` (unique per hospital), `nhifNumber`,
`age`, `gender`, `phone`, `address`, `emergencyContact`, `symptoms`,
`hospitalSlug`. Timestamps `createdAt`/`updatedAt` are exposed to the API
as `registeredAt`.

### staff

Stores hospital employees.

Key fields: `name`, `role`, `department`, `phone`, `email`, `workShift`,
`status`, `attendanceStatus`, `checkInTime`, `checkOutTime`,
`hospitalSlug`.

### inventory

Tracks medicines and hospital supplies.

Key fields: `name`, `category`, `currentStock`, `unit`, `minimumStock`,
`dailyUsage`, `supplier`, `expiryDate`, `lastRestock`, `status`
(`ok` | `warning` | `critical`), `movements[]` (`type`: add | deduction),
`hospitalSlug`.

### appointments

Stores outpatient appointments.

Key fields: `patientName`, `patientPhone`, `nhifNumber`, `hospitalSlug`,
`hospitalName`, `department`, `doctorName`, `date`, `time`, `reason`,
`status`.

### announcements

Stores county/hospital broadcasts.

Key fields: `title`, `body`, `type`, `severity`, `pinned`,
`targetedHospitals[]`, `author`, `authorRole`.

### emergencyRequests

Stores emergency incidents.

Key fields: `type`, `description`, `location`, `casualties`, `injuries`,
`severity`, `status`, `dispatch` (ambulances, responders, eta).

### diagnoses

Stores AI-assisted and clinician-confirmed diagnoses, linked to a patient.

Key fields: `patientId`, `hospitalSlug`, `diseases[]` (`name`,
`probability`), `recommendedTests[]`, `recommendedTreatment[]`
(`medicine`, `dosage`, `frequency`, `stockAvailable`), `clinicalSummary`,
`doctorConfirmation`, `attendingDoctor`.

### prescriptions

Stores prescribed medicines and deducts inventory stock.

Key fields: `patientId`, `hospitalSlug`, `medicines[]` (`name`, `dosage`,
`frequency`, `duration`, `quantity`), `notes`, `prescribedBy`.

## Relationships

- Hospital → has many Patients, Staff, Inventory Items, Appointments
- Patient → has many Diagnoses, Prescriptions, Appointments
- User → optionally tied to one Hospital via `hospitalSlug`

## Indexes

- `hospitals.slug` (unique)
- `hospitals.status`
- `patients.{idNumber, hospitalSlug}` (unique)
- `patients.hospitalSlug`
- `inventory.hospitalSlug`
- `staff.hospitalSlug`
- `appointments.{hospitalSlug, date}`
- `diagnoses.patientId`
- `prescriptions.patientId`

## Security

- Server-side Zod validation on all writes
- Role-based authorization before any mutation
- No client-side database access
- Passwords stored as bcrypt hashes only

## Backup Strategy

- Daily MongoDB backups
- Periodic restore testing
- Off-site encrypted backup storage

## Scalability

Collections are scoped by `hospitalSlug` and support: single hospital,
county-wide deployment, and national deployment.
