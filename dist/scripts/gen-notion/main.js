"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
const heading_1 = require("./outputs/heading");
const children_1 = require("./outputs/children");
const generate_1 = require("./generate");
const argv = (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
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
    .option("output", {
    alias: "o",
    type: "boolean",
    description: "Determine whether to scrape the pages or not",
    default: false,
})
    .help().argv;
const main = async () => {
    const { type, id, output } = await argv;
    const outputHeading = type === "page" ? heading_1.outputPageHeading : heading_1.outputDatabaseHeading;
    const generateTemplate = type === "page" ? generate_1.generatePageTemplate : generate_1.generateDatabaseTemplate;
    if (output) {
        await outputHeading(id);
        await (0, children_1.outputChildren)(id);
    }
    await generateTemplate(id);
};
main().catch((err) => console.log(err));
