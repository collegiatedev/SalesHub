"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const info_1 = require("./routes/info");
const c1_1 = require("./routes/c1");
const c2_1 = require("./routes/c2");
const c3_1 = require("./routes/c3");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.get("/", (_req, res) => {
    res.send("Hello World!");
});
app.post("/", (_req, res) => {
    console.log("POST request received!");
    res.send("Hello World via POST!");
});
app.use("/c1", c1_1.c1Router);
app.use("/c2", c2_1.c2Router);
app.use("/c3", c3_1.c3Router);
app.use("/info", info_1.infoRouter);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
