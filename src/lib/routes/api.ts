import { Router } from "express";
import Cache from "../model/cache";
import events from "./events";

export default (cache: Cache) => {
  const route = Router();
  route.use("/events", events(cache));
  return route;
};
