import { Router } from "express";
import EventCache from "../model/EventCache";
import events from "./events";

export default (cache: EventCache) => {
  const route = Router();
  route.use("/events", events(cache));
  return route;
};
