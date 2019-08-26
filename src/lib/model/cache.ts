import IData from "../interfaces/IData";

export default class WebsiteCache {
  private data: IData[];
  constructor() {
    this.data = [];
  }
  public setData(newIData: IData[]): void {
    this.data = newIData;
  }
  public getData(from: number, to: number): IData[] {
    return this.data.filter((data) => {
      return data.time <= to && data.time >= from;
    });
  }
}
