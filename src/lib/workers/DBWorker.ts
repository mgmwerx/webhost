import { isNull } from "util";
import EventCache from "../model/EventCache";
import IEventData from "../interfaces/IEventData";

export default class {
  private handle: NodeJS.Timeout | null;
  private cache: EventCache;
  private driver: { getData: () => Promise<IEventData[]> };
  private cacheGood: boolean;

  constructor(cache: EventCache, driver: { getData: () => Promise<IEventData[]> }) {
    this.cacheGood = false;
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
        if (!this.cacheGood) {
          process.stdout.write(`${new Date().toISOString()}: Cache updating successfully\n`);
          this.cacheGood = true;
        }
      } catch (e) {
        if (this.cacheGood) {
          process.stderr.write(`${new Date().toISOString()}: Failing to update cache\n`);
          this.cacheGood = false;
        }
      }
    }, interval);
  }
  public stopWorker() {
    if (!isNull(this.handle)) {
      clearInterval(this.handle);
    }
  }
}
