import { Router } from "express";
import EventCache from "../model/EventCache";
import setCORS from "../middleware/setCORS";

// tslint:disable: jsdoc-format
/**
 * [{ time: 1566892680963,
    payload:
     { title: 'Billiards tournament',
       location_id: 7,
       starts_at: 2019-08-27T07:58:00.963Z,
       ends_at: 2019-08-27T07:58:01.963Z,
       description: 'Come play some pool',
       website_url: 'www.google.com/Events&ID=7',
       upload_time: 2019-08-27T07:58:00.963Z,
       id: 7,
       name: 'None',
       street_address: '1234 smartcity ln',
       second_line: 'None',
       city: 'montgomery',
       state: 'AL',
       zip: 12345 } }]
 */

export default (cache: EventCache) => {
  const route = Router();
  route.get("/", setCORS, (req, res) => {
    const from = parseInt(req.query.from, 10);
    const to = parseInt(req.query.to, 10);
    if (!isNaN(from) && !isNaN(to)) {
      const dataset = cache.getData(req.query.from, req.query.to);
      res.json(dataset);
    } else {
      res.sendStatus(400);
    }
  });

  return route;
};
