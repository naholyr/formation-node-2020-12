import * as fibo from "../fibo.js";

export const fiboHandler = async (req, res) => {
  if (!req.logged) {
    console.log("Fibo!");
  }

  const n = Number(req.params.number);
  const result = await fibo.async(n);

  res.send({ input: n, output: result });
};
