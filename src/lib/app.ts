import express, { NextFunction, Response, Request } from "express";
import api from "./routes/api";
import homepage from "./staticPages/staticPage";
import EventCache from "./model/EventCache";
import DBWorker from "./workers/DBWorker";
import PostgresDriver from "./workers/postgresDriver";

const cache = new EventCache();
const driver = new PostgresDriver();
const worker = new DBWorker(cache, driver);
worker.startWorker(10000);

const app = express();
app.use(express.json());

app.use("/api/", api(cache));
app.use("/", (req, res, next) => {
  if (/^\/(index(\.html)?)?$/.test(req.path)) {
    res.send(homepage());
  } else {
    next();
  }
});

app.use((_req, _res, next) => {
  next(404);
});

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err === 404) {
    res.sendStatus(404);
  } else {
    res.sendStatus(500);
    process.stderr.write(err + "\n");
  }
});

export default app;
