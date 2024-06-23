import "dotenv/config";
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { registrationRouter } from "./routes/registration";
import { createRouter } from "./routes/create";
import { filesRouter } from "./routes/files";

const app = express();
app.use(bodyParser.json());
app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/registration", registrationRouter);
app.use("/create", createRouter);
app.use("/files", filesRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
