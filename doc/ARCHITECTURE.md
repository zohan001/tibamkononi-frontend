# ARCHITECTURE.md

# Tibamkononi System Architecture

## Overview

Tibamkononi follows a modular, feature-oriented architecture that
separates presentation, business logic, and data access. The platform is
designed to scale from a single hospital to a county-wide healthcare
ecosystem.

## High-Level Architecture

    Next.js Frontend
          |
     REST / HTTPS
          |
    Node.js + Express API
          |
    Business Services
          |
    MongoDB Database
          |
    Gemma AI Services

## Frontend

-   Next.js App Router
-   TypeScript
-   Tailwind CSS
-   shadcn/ui components
-   React Query hooks for data fetching
-   Feature-based components

### Main Modules

-   Dashboard
-   Patients
-   Appointments
-   Inventory
-   Beds & Wards
-   Staff
-   Reports
-   Emergency
-   AI Triage

## Backend

-   Express REST API
-   Authentication
-   Hospital Management
-   Patient Management
-   Inventory
-   Reports
-   Emergency Services

## Database

MongoDB stores: - Hospitals - Patients - Staff - Inventory -
Appointments - Medical Records - Reports

## AI Layer

Gemma AI assists with: - Symptom analysis - Clinical insights -
Diagnosis support - Medicine suggestions - Operational summaries

## Security

-   JWT Authentication
-   Role-Based Access Control
-   Input validation
-   HTTPS
-   Password hashing

## Scalability

Designed for: - Single hospital - Multiple hospitals - County
deployment - National deployment

Future evolution can split services into microservices while preserving
the frontend API contracts.

## Deployment

Frontend and backend are independently deployable with MongoDB as the
shared persistence layer.

## Design Principles

-   Clean architecture
-   Reusable components
-   Separation of concerns
-   Modular features
-   AI-assisted workflows
-   Mobile-friendly UI
