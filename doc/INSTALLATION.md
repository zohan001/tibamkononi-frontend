# INSTALLATION.md

# Tibamkononi Installation Guide

## Prerequisites

-   Node.js 20 or later
-   npm
-   Git
-   MongoDB Atlas or local MongoDB

## Clone the Repository

``` bash
git clone <repository-url>
cd tibamkononi
```

## Backend Setup

``` bash
cd backend
npm install
```

Create a `.env` file:

``` env
MONGODB_URI=your_connection_string
JWT_SECRET=your_secret
PORT=5000
```

Start the backend:

``` bash
npm run dev
```

## Frontend Setup

``` bash
cd frontend
npm install
```

Create a `.env.local` file:

``` env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start the frontend:

``` bash
npm run dev
```

## Verify Installation

-   Backend running on port 5000
-   Frontend running on port 3000
-   MongoDB connected successfully
-   Login page loads
-   Dashboard opens after authentication

## Troubleshooting

### MongoDB Connection

-   Verify the connection string.
-   Ensure network access is allowed in MongoDB Atlas.

### Port Conflicts

-   Change the PORT value in the backend `.env` if needed.

### Dependency Errors

Run:

``` bash
npm install
```

again after deleting `node_modules` and the lock file if necessary.

## Recommended Development Tools

-   Visual Studio Code
-   MongoDB Compass
-   Postman
-   Git
-   Chrome Developer Tools
