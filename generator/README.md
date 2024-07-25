# Generator

## Explanation

This is a simple express server that generates pages, primarily info and task pages. Info pages pertain to lead info and can be found in the lead's CRM page. Task pages pertain to tasks at different stages of the sales process.

## Usage

Run `pnpm dev` to start the server.

Run `pnpm gen-notion -t <type> -i <id> -o (optional)` to generate a page.

## Deployment

Deployment is automatically synced by DigitalOcean when a PR is merged to the main branch. Just make sure that the /dist folder is updated before merging. As long as `pnpm dev` is active, the server will be updated.

## Todos

- []
