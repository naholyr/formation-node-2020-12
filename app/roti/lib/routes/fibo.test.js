import { mockReqRes } from "../test-utils.js";
import { fiboHandler } from "./fibos.js";

// Mock not working because of ESM
jest.mock("../fibo.js", () => ({
  sync: jest.fn().mockReturnValue(42),
  async: jest.fn().mockResolvedValue(42),
}));

describe("Request handler", () => {
  test("fibo", async () => {
    const { req, res } = mockReqRes({ params: { number: "5" } });
    await fiboHandler(req, res);
    //expect(res.send).toHaveBeenCalledWith({ input: 5, output: 42 });
    expect(res.send).toHaveBeenCalledWith({ input: 5, output: 8 });
  });
});
