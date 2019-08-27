import IEventData from "../interfaces/IEventData";
import { Pool } from "pg";
import { isUndefined } from "util";

export default class {
  private pool: Pool;
  private getDataQuery: string = "SELECT * FROM Events, Source, Location WHERE Events.location_id=Location.id AND Events.website_url";

  constructor() {
    this.pool = new Pool();
  }

  public async getData(): Promise<IEventData[]> {
    let client;
    try {
      client = await this.pool.connect();
      const res = await client.query(this.getDataQuery);
      const newCache: IEventData[] = res.rows.map((val) => {
        return {
          time: new Date(val.start_date).getTime(),
          payload: val,
        };
      });
      return newCache;
    } catch (e) {
      switch (e.code) {
        case "ECONNREFUSED":
          process.stderr.write(`${new Date().toISOString()}: Failed to connect to DB, connection refused (address: ${e.address}, port: ${e.port})\n`)
          break;
        default:
          process.stderr.write(`${new Date().toISOString()}: Unknown Error Code: ${e.message}`);
      }
      throw new Error("No Data");
    } finally {
      if (!isUndefined(client)) { client.release(); }
    }
  }
}
