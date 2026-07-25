# DATABASE.md

# Tibamkononi Database Design

## Overview

Tibamkononi uses MongoDB as its primary database. Collections are
organized around healthcare workflows and support multi-hospital
deployments.

## Core Collections

### hospitals

Stores hospital profile information.

Key fields: - id - name - slug - county - address - subscriptionStatus -
buildings

### patients

Stores patient demographic information.

Key fields: - id - fullName - idNumber - phone - age - gender -
address - emergencyContact - hospitalSlug - registeredAt

### staff

Stores doctors, nurses, pharmacists, administrators, and other
employees.

Key fields: - id - name - role - department - attendanceStatus

### inventory

Tracks medicines and hospital supplies.

Key fields: - id - name - category - currentStock - minimumStock -
dailyUsage - supplier - expiryDate - status

### appointments

Stores outpatient appointments.

Key fields: - patientId - doctorId - date - time - reason - status

### diagnoses

Stores AI-assisted and clinician-confirmed diagnoses.

### prescriptions

Stores medicines, dosage, duration, prescribing clinician, and notes.

### emergencyRequests

Stores emergency incidents and ambulance dispatch information.

## Relationships

Hospital - has many Patients - has many Staff - has many Inventory
Items - has many Appointments

Patient - has many Diagnoses - has many Prescriptions - has many
Appointments

## Index Recommendations

-   hospitalSlug
-   patientId
-   doctorId
-   appointment date
-   inventory status
-   idNumber

## Security

-   Server-side validation
-   Role-based authorization
-   No client-side database access
-   Audit logging for sensitive operations

## Backup Strategy

-   Daily MongoDB backups
-   Periodic restore testing
-   Off-site encrypted backup storage

## Scalability

Collections are designed to support: - Single hospital - County-wide
deployment - National deployment
