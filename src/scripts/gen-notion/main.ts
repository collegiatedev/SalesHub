import "dotenv/config";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { outputDatabaseHeading, outputPageHeading } from "./outputs/heading";
import { outputChildren } from "./outputs/children";
import { generateDatabaseTemplate } from "./templates/database";
// import { generatePageTemplate } from "./templates/page";

const argv = yargs(hideBin(process.argv))
  .option("type", {
    alias: "t",
    type: "string",
    description: "Specify the type of operation: page or database",
    choices: ["page", "database"],
    demandOption: true,
  })
  .option("id", {
    alias: "i",
    type: "string",
    description: "Specify the page or database ID",
    demandOption: true,
  })
  .help().argv;

const main = async () => {
  const { type, id } = await argv;

  const outputHeading =
    type === "page" ? outputPageHeading : outputDatabaseHeading;

  const generateTemplate = generateDatabaseTemplate;
  // type === "page" ? generatePageTemplate : generateDatabaseTemplate;

  await outputHeading(id);
  await outputChildren(id);
  // await outputRequest(id);
  await generateTemplate(id);
};

main().catch((err) => console.log(err));
