# Code Organizational Structure

## Helpers

### \_handlers

This folder contains the handlers for the API endpoints. Handlers are middleware functions that abstract away repeated logic.

- reqHandler -> base handler for all endpoints, handles request validation, response formatting, and error handling
- webhookHandler -> handles signature validation for webhooks; supports tally and cal endpoints
- oauthHandler -> handles oauth for endpoints that require google drive resource access

### \_utils

This folder should contain the actual business logic for working with external services. `route.ts` files should be reserved to call \_utils functions.

- generator -> uses axios to make requests to our express server
- notion -> uses notion client to make requests to notion
- drive -> uses google drive api to make requests to google drive

## Endpoints

### auth

Authentication endpoints for google oauth

- `GET /api/auth/init` (reqHandler)
- `GET /api/auth/callback` (reqHandler)

### lead

Used by c2, c3 pages to retrieve lead info.

- `GET /api/lead` (reqHandler)

### register

Register endpoints are client-facing; they're called whenever a user submit pre-meeting forms at various stages of the program. We use /i to recieve requests, /o to handle responses.

### debrief

Debrief endpoints are sales-facing; they're called whenever a sales rep submits a debrief form.
