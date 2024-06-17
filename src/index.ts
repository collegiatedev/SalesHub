import "dotenv/config";
import express, { Request, Response } from "express";
import { registrationRouter } from "./routes/registration";

const app = express();

app.get("/", (_req: Request, res: Response) => {
  console.log("Hello World! 3");
  res.send("Hello World!");
});

app.use("/registration", registrationRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
