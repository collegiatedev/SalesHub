"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const registration_1 = require("./routes/registration");
const app = (0, express_1.default)();
app.get("/", (_req, res) => {
    console.log("Hello World! 3");
    res.send("Hello World!");
});
app.use("/registration", registration_1.registrationRouter);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
