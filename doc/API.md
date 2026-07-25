# API.md

# Tibamkononi REST API

## Base URL

    https://your-domain/api

## Authentication

Protected endpoints require a Bearer JWT token.

Example:

    Authorization: Bearer <token>

------------------------------------------------------------------------

# Authentication

## POST /auth/login

Authenticates a user.

Request:

``` json
{
  "email":"admin@example.com",
  "password":"password"
}
```

Response:

``` json
{
  "token":"jwt",
  "user":{
    "id":"123",
    "role":"admin"
  }
}
```

------------------------------------------------------------------------

# Hospitals

## GET /hospitals

Returns all hospitals.

## GET /hospitals/:slug

Returns one hospital.

## POST /hospitals

Creates a hospital.

------------------------------------------------------------------------

# Patients

## GET /patients

List patients.

## GET /patients/:id

Patient details.

## POST /patients

Register patient.

## PUT /patients/:id

Update patient.

## DELETE /patients/:id

Archive/remove patient.

------------------------------------------------------------------------

# Inventory

GET /inventory

POST /inventory

PUT /inventory/:id

DELETE /inventory/:id

------------------------------------------------------------------------

# Staff

GET /staff

POST /staff

PUT /staff/:id

DELETE /staff/:id

------------------------------------------------------------------------

# Appointments

GET /appointments

POST /appointments

PUT /appointments/:id

DELETE /appointments/:id

------------------------------------------------------------------------

# Reports

GET /reports/daily

GET /reports/monthly

GET /reports/inventory

------------------------------------------------------------------------

# Emergency

POST /emergency

GET /emergency

GET /emergency/:id

------------------------------------------------------------------------

# AI

POST /ai/triage

POST /ai/diagnosis

POST /ai/clinical-summary

POST /ai/recommend-treatment

------------------------------------------------------------------------

# Error Format

``` json
{
  "success": false,
  "message": "Validation failed",
  "errors": []
}
```

# Success Format

``` json
{
  "success": true,
  "data": {}
}
```

## HTTP Status Codes

-   200 OK
-   201 Created
-   400 Bad Request
-   401 Unauthorized
-   403 Forbidden
-   404 Not Found
-   500 Internal Server Error
