"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const registration_1 = require("./routes/registration");
const create_1 = require("./routes/create");
const files_1 = require("./routes/files");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.get("/", (_req, res) => {
    res.send("Hello World!");
});
app.use("/registration", registration_1.registrationRouter);
app.use("/create", create_1.createRouter);
app.use("/files", files_1.filesRouter);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
