# Issue Tracker

A FreeCodeCamp Quality Assurance project - Issue Tracker API with MongoDB backend.

## Overview

This is a full-stack Node.js/Express application that provides a REST API for tracking issues across multiple projects. It uses MongoDB (Mongoose) for data persistence.

## Project Structure

```
├── public/
│   └── style.css          # Frontend styles
├── routes/
│   ├── api.js             # Main API routes (GET, POST, PUT, DELETE)
│   └── fcctesting.js      # FCC testing routes
├── tests/
│   └── 2_functional-tests.js  # 14 functional tests
├── views/
│   ├── index.html         # Main page with API examples
│   └── issue.html         # Project-specific issue page
├── server.js              # Express server with MongoDB connection
├── test-runner.js         # Mocha test runner
└── package.json           # Dependencies and scripts
```

## API Endpoints

All endpoints are under `/api/issues/{project}`:

- **GET** - Retrieve issues for a project (supports filtering by any field)
- **POST** - Create a new issue (requires: issue_title, issue_text, created_by)
- **PUT** - Update an issue (requires: _id and at least one field to update)
- **DELETE** - Delete an issue (requires: _id)

## Environment Variables

- `PORT` - Server port (default: 5000)
- `MONGO_URI` - MongoDB connection string (required)
- `NODE_ENV` - Set to "test" to run automated tests on startup

## Running Tests

Set `NODE_ENV=test` in environment variables and restart the application, or run:
```bash
npm run test
```

## Recent Changes

- 2025-12-05: Completed Issue Tracker implementation with MongoDB integration
- 2025-12-05: Added all 14 required functional tests
- 2025-12-05: Configured for Replit environment (port 5000, 0.0.0.0 binding)
