import IEventData from "../interfaces/IEventData";

export default class EventCache {
  private data: IEventData[];
  constructor() {
    this.data = [];
  }
  public setData(newIData: IEventData[]): void {
    this.data = newIData;
  }
  public getData(from: number, to: number): IEventData[] {
    return this.data.filter((data) => {
      return data.time <= to && data.time >= from;
    });
  }
}
