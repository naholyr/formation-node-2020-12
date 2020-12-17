/* eslint-env mocha */

import chai from "chai";

describe("Dumb things", () => {
  it("Array should concat", () => {
    const a = [1, 2, 3];
    const b = [4, 5, 6];
    const c = a.concat(b);
    chai.expect(c).to.eql([1, 2, 3, 4, 5, 6]);
  });
});
