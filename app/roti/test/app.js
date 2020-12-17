import chai from "chai";
import supertest from "supertest";
import { app } from "../app.js";
//import * as fibo from "../lib/fibo.js";
//import sinon from "sinon";

describe("REST API", () => {
  it("should compute fibo(5)", async () => {
    await supertest(app)
      .get("/fibo/5")
      .expect("content-type", /json/)
      .expect(200)
      .then((res) => {
        chai.expect(res.body).to.eql({ input: 5, output: 8 });
      });
  });
});

/*
describe("REST API (mocked)", () => {
  let fiboAsync;

  beforeEach(() => {
    fiboAsync = sinon.fake.resolves(42);
    // Not working with ESM
    sinon.replace(fibo, "async", fiboAsync);
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should call fibo.async", async () => {
    await supertest(app)
      .get("/fibo/5")
      .expect("content-type", /json/)
      .expect(200)
      .then((res) => {
        chai.expect(fiboAsync.called).to.be.true;
        chai.expect(res.body).to.eql({ input: 5, output: 42 });
      });
  });
});
*/
