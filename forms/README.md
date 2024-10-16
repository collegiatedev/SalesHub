# Forms

Hosted forms for different stages of the Accelerator Program.

The API endpoints are in the `src/app/api` folder. These endpoints orchestrate the business logic and integrations for SalesHub (Zapier-style). We communicate with generator service using simple axios calls.

## Development

Run `pnpm dev` to start the server.

Run `pnpm ngrok` to tunnel localhost:3000 to a public url (make sure you have ngrok installed).

Deployment is automatically synced by Vercel when a PR is merged to the main branch.

## API Endpoints

### GET /api/lead

Used by c2 and c3 pages to retrieve student info

Notion Utils

- [x] Calls getLead -> retrieves lead from Notion CRM

### POST /api/register/tally

**Called by tally webhook on form submission for Accelerator Registration (c1)**

- [x] 1. (Notion Util) createLead -> adds lead to Notion CRM
- [x] 2. (Axios Util) createInfo -> creates info table, adds to lead page in Notion CRM
- [x] 3. (Axios Util) infoContact -> populates the info table with contact info page
- [x] 4. (Drive Util) createFolder -> creates shared Google Drive folder in outreach account, Accelerator folder
- [x] 5. (Notion Util) updateLead -> updates lead in Notion CRM (specifically with drive folder ref)

### POST /api/register/cal

**Called by cal webhook on scheduling submission for Accelerator Registration (c1)**

- [x] 1. (Notion Util) getLead -> retrieves lead from Notion CRM
- [x] 2. (Notion Util) getRep -> retrieves sales rep from Notion CRM
- [x] 3. (Notion Util) updateLead -> updates lead in Notion CRM (specifically with drive folder ref)
- [ ] 4. (Drive Util) getFolder -> gets folder link based on folder ref
- [ ] 5. (Axios Util) express c1/ tasks -> for each task, create a task in Notion using express endpoint
