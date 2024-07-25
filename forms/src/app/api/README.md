# Code Organizational Structure

## Helpers

### \_handlers

This folder contains the handlers for the API endpoints. Handlers are middleware functions that abstract away repeated logic.

- reqHandler -> base handler for all endpoints, handles request validation, response formatting, and error handling
- webhookHandler -> handles signature validation for webhooks; supports tally and cal endpoints
- oauthHandler -> handles oauth for endpoints that require google drive resource access

### \_utils

This folder should contain the actual business logic for working with external services. `route.ts` files should be reserved to call \_utils functions.

- axios -> uses axios to make requests to our express server
- notion -> uses notion client to make requests to notion
- drive -> uses google drive api to make requests to google drive

## Endpoints

### auth

Authentication endpoints for google oauth

- `GET /api/auth/init` (reqHandler)
- `GET /api/auth/callback` (reqHandler)

### lead

Used by c2, c3 pages to retrieve lead info.

- [x] `GET /api/lead` (reqHandler)

### register

Register endpoints are client-facing; they're called whenever a user submit pre-meeting forms at various stages of the program.

- [x] `POST /api/register/c1/cal` (webhookHandler)
- [x] `POST /api/register/c1/drive` (oauthHandler, called by `POST /api/register/c1/tally`)
- [x] `POST /api/register/c1/tally` (webhookHandler)

- [] `POST /api/register/c2/cal` (webhookHandler)
- [] `POST /api/register/c2/tally` (webhookHandler)
- [] `POST /api/register/c2/add/essay` (webhookHandler) -> PAINNNN!! (extend this on scoping)

- [] `POST /api/register/c3/cal` (webhookHandler)
- [] `POST /api/register/c3/tally` (webhookHandler)

### debrief

Debrief endpoints are sales-facing; they're called whenever a sales rep submits a debrief form.

- [] `POST /api/debrief/c1` (webhookHandler)
- [] `POST /api/debrief/c2` (webhookHandler)
- [] `POST /api/debrief/c3` (webhookHandler)
