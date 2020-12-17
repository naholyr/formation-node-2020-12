//import { Worker, isMainThread, parentPort, workerData } from "worker_threads";
import * as fibo from "./fibo.js";

// TODO mock worker_threads (not possible with ESM)
jest.mock("worker_threads", () => ({
  Worker: class {},
}));

describe("fibo", () => {
  test("fibo.sync", () => {
    expect(fibo.sync(4)).toEqual(5);
    expect(fibo.sync(5)).toEqual(8);
    expect(fibo.sync(6)).toEqual(13);
  });

  test("fibo.async", async () => {
    expect(fibo.async(4)).toBeInstanceOf(Promise);
    expect(await fibo.async(4)).toEqual(5);
  });
});
