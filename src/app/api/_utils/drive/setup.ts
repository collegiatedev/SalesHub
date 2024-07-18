// import { promises as fs } from "fs";
// import path from "path";
// import process from "process";
// import { authenticate } from "@google-cloud/local-auth";
// import { google } from "googleapis";
// import { OAuth2Client } from "google-auth-library";

// // If modifying these scopes, delete token.json.
// const SCOPES: string[] = [
//   "https://www.googleapis.com/auth/drive.metadata.readonly",
// ];
// // The file token.json stores the user's access and refresh tokens, and is
// // created automatically when the authorization flow completes for the first
// // time.
// const TOKEN_PATH: string = path.join(process.cwd(), "token.json");
// const CREDENTIALS_PATH: string = path.join(process.cwd(), "credentials.json");

// /**
//  * Reads previously authorized credentials from the save file.
//  *
//  * @return {Promise<OAuth2Client|null>}
//  */
// async function loadSavedCredentialsIfExist(): Promise<OAuth2Client | null> {
//   try {
//     const content: string = await fs.readFile(TOKEN_PATH, "utf8");
//     const credentials: Record<string, unknown> = JSON.parse(content);
//     return google.auth.fromJSON(credentials) as unknown as OAuth2Client;
//   } catch (err) {
//     return null;
//   }
// }

// /**
//  * Serializes credentials to a file compatible with GoogleAuth.fromJSON.
//  *
//  * @param {OAuth2Client} client
//  * @return {Promise<void>}
//  */
// async function saveCredentials(client: OAuth2Client): Promise<void> {
//   const content: string = await fs.readFile(CREDENTIALS_PATH, "utf8");
//   const keys: {
//     installed?: Record<string, string>;
//     web?: Record<string, string>;
//   } = JSON.parse(content);
//   const key: Record<string, string> = keys.installed || keys.web || {};
//   const payload: string = JSON.stringify({
//     type: "authorized_user",
//     client_id: key.client_id,
//     client_secret: key.client_secret,
//     refresh_token: client.credentials.refresh_token,
//   });
//   await fs.writeFile(TOKEN_PATH, payload);
// }

// /**
//  * Load or request or authorization to call APIs.
//  *
//  */
// async function authorize(): Promise<OAuth2Client> {
//   let client: OAuth2Client | null = await loadSavedCredentialsIfExist();
//   if (client) {
//     return client;
//   }
//   client = await authenticate({
//     scopes: SCOPES,
//     keyfilePath: CREDENTIALS_PATH,
//   });
//   if (client?.credentials) {
//     await saveCredentials(client);
//   }
//   return client;
// }

// /**
//  * Lists the names and IDs of up to 10 files.
//  * @param {OAuth2Client} authClient An authorized OAuth2 client.
//  */
// async function listFiles(authClient: OAuth2Client): Promise<void> {
//   const drive = google.drive({ version: "v3", auth: authClient as any });
//   const res = await drive.files.list({
//     pageSize: 10,
//     fields: "nextPageToken, files(id, name)",
//   });
//   const files = res.data.files;
//   if (!files || files.length === 0) {
//     console.log("No files found.");
//     return;
//   }

//   console.log("Files:");
//   files.forEach((file) => {
//     if (file.name && file.id) {
//       console.log(`${file.name} (${file.id})`);
//     }
//   });
// }

// authorize().then(listFiles).catch(console.error);
