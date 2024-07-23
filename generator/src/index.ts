import "dotenv/config";
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { infoRouter } from "./routes/info";
import { c1Router } from "./routes/c1";
import { c2Router } from "./routes/c2";
import { c3Router } from "./routes/c3";

const app = express();
app.use(bodyParser.json());
app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/c1", c1Router);
app.use("/c2", c2Router);
app.use("/c3", c3Router);
app.use("/info", infoRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
