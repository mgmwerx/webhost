import { isNull } from "util";
import EventCache from "../model/EventCache";
import IEventData from "../interfaces/IEventData";

export default class {
  private handle: NodeJS.Timeout | null;
  private cache: EventCache;
  private driver: { getData: () => Promise<IEventData[]> };

  constructor(cache: EventCache, driver: { getData: () => Promise<IEventData[]> }) {
    this.handle = null;
    this.cache = cache;
    this.driver = driver;
  }
  public startWorker(interval: number) {
    if (!isNull(this.handle)) {
      clearInterval(this.handle);
    }
    this.handle = setInterval(async () => {
      try {
        this.cache.setData(await this.driver.getData());
      } catch (e) {
        console.log(e);
        process.stderr.write(`${new Date().toISOString()}: No updates to cache\n`);
      }
    }, interval);
  }
  public stopWorker() {
    if (!isNull(this.handle)) {
      clearInterval(this.handle);
    }
  }
}
