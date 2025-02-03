import express, { Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import mathRouter from "./routers/math.router";

const app = express();
app.use(cors());
app.use("/api", mathRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("hello from backend");
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
