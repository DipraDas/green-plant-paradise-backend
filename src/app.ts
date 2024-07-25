/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import router from "./app/routes";

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application route
app.use("/api/v1", router);

// const test = (req: Request, res: Response) => {
//   Promise.reject();
//   res.send("hello world");
// };

app.get("/", (req: Request, res: Response) => {
  res.send("Green Planet Paradise Project Running");
});

// app.use("/", test);

// error handler middleware
app.use(globalErrorHandler);
// not found
app.use(notFound);

export default app;
