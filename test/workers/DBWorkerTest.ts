// tslint:disable: no-unused-expression
import { expect } from "chai";
import sinon from "sinon";
import DBWorker from "../../src/lib/workers/DBWorker";
import EventCache from "../../src/lib/model/EventCache";

describe("DBWorker Tests", () => {

  it("Should call the worker after 60 sec", async function() {
    this.clock = sinon.useFakeTimers();
    const cache = new EventCache();
    sinon.spy(cache, "setData");
    const driver = { getData: sinon.fake.resolves([{ time: 1234, payload: "pooba" }]) };
    const worker = new DBWorker(cache, driver as any);
    expect((cache.setData as any).called).to.be.false;
    worker.startWorker(6000);
    this.clock.tick(1000);
    expect((cache.setData as any).called).to.be.false;
    this.clock.tick(6000);
    expect((cache.setData as any).calledOnce).to.be.false;
    expect(driver.getData.calledOnce);
    this.clock.restore();
  });
});
