/* eslint-env mocha */

import { expect } from "chai";

describe("Dumb things", () => {
  it("Array should concat", () => {
    const a = [1, 2, 3];
    const b = [4, 5, 6];
    const c = a.concat(b);
    expect(c).to.eql([1, 2, 3, 4, 5, 6]);
  });
});
