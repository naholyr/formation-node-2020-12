import { mockReqRes } from "../test-utils.js";
import { coucou } from "./coucou.js";

describe("Request handler", () => {
  test("coucou", () => {
    expect(typeof coucou).toBe("function");
    const { req, res } = mockReqRes();
    coucou(req, res);
    expect(res.send).toHaveBeenCalledWith("coucou");
    expect(res.send.mock.calls[0][0]).toContain("cou");
  });
});
