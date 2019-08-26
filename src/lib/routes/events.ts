import { Router } from "express";
import Cache from "../model/cache";

export default (cache: Cache) => {
  const route = Router();
  route.get("/", (req, res) => {
    const from = parseInt(req.query.from, 10);
    const to = parseInt(req.query.to, 10);
    if (!isNaN(from) && !isNaN(to)) {
      const dataset = cache.getData(req.query.from, req.query.to);
      res.json(dataset);
    } else {
      res.sendStatus(403);
    }
  });

  return route;
};
