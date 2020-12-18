import chai from "chai";

describe("Dumb things", () => {
  before(() => {
    // exécuté avant le premier "it"
    // une seule fois pour ce "describe"
  });
  after(() => {});

  beforeEach(() => {
    // exécuté avant chaque "it" de ce "describe"
  });
  afterEach(() => {});

  it("Array should concat", () => {
    const a = [1, 2, 3];
    const b = [4, 5, 6];
    const c = a.concat(b);
    chai.expect(c).to.eql([1, 2, 3, 4, 5, 6]);
  });
});
