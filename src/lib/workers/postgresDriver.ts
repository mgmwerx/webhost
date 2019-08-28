import IEventData from "../interfaces/IEventData";
import { Pool } from "pg";
import { isUndefined } from "util";

export default class {
  private pool: Pool;
  private getDataQuery: string = "SELECT * FROM Events, Locations WHERE Events.location_id=Locations.id";

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
          time: new Date(val.starts_at).getTime(),
          payload: val,
        };
      });
      return newCache;
    } catch (e) {
      switch (e.code) {
        case "ECONNREFUSED":
          process.stderr.write(`${new Date().toISOString()}: Failed to connect to DB, connection refused (address: ${e.address}, port: ${e.port})\n`);
          break;
        default:
          process.stderr.write(`${new Date().toISOString()}: Unknown Error Code: ${e.message}\n`);
      }
      throw new Error("No Data");
    } finally {
      if (!isUndefined(client)) { client.release(); }
    }
  }
}
