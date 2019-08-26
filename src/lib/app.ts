import express from "express";
import api from "./routes/api";
import homepage from "./staticPages/staticPage";
import Cache from "./model/cache";

const cache = new Cache();

const app = express();
app.use(express.json());

app.use("/api/", api(cache));
app.use("/", (_req, res) => {
  res.send(homepage());
});

app.use((_req, _res, next) => {
  next(404);
});

app.use((err, _req, res, _next) => {

  if (err === 404) {
    res.sendStatus(404);
  } else {
    res.sendStatus(500);
    process.stderr.write(err + "\n");
  }
});

export default app;
