// This script starts the Next.js development server and establishes a ngrok tunnel
// don't use import, since it's not transpiled
const ngrok = require("ngrok");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

(async function () {
  // @ts-ignore
  const updateNgrokEnv = (url) => {
    const envFilePath = path.resolve(__dirname, ".env.local");
    let envFileContent = "";

    // Read the .env.local file if it exists
    if (fs.existsSync(envFilePath)) {
      envFileContent = fs.readFileSync(envFilePath, "utf-8");
    }

    // replace the existing NEXT_PUBLIC_NGROK_URL with the new one
    const newEnvFileContent = envFileContent
      .split("\n")
      .filter(line => !line.startsWith("NEXT_PUBLIC_NGROK_URL="))
      .concat(`NEXT_PUBLIC_NGROK_URL=${url}`)
      .join("\n");

    // Write the updated content to the .env.local file
    fs.writeFileSync(envFilePath, newEnvFileContent);
  }

  try {

    
    const url = await ngrok.connect(PORT);
    console.log(`ngrok tunnel established at ${url}`);
    
    updateNgrokEnv(url);
    
    // Start the Next.js development server
    const nextDev = exec(`pnpm next -p ${PORT}`);

    nextDev.stdout?.on("data", (data) => {
      console.log(data);
    });

    nextDev.stderr?.on("data", (data) => {
      console.error(data);
    });

    nextDev.on("close", (code) => {
      console.log(`Next.js dev server exited with code ${code}`);
    });
  } catch (error) {
    console.error("Error establishing ngrok tunnel:", error);
  }
})();
