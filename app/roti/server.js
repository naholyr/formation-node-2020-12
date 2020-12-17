import { createServer } from "http";
import { app } from "./app.js";

/* Alternative:
const fiboRouter = new express.Router();
app.get("/:number([0-9]+)", fiboHandler);
app.use("/fibo", fiboRouter);
*/

/*
const requestHandler = async (req, res) => {
  console.log(req.method, req.url, req.headers);

  const matchFibo = req.url.match(/^\/fibo\/(\d+)$/);
  if (matchFibo) {
    const n = Number(matchFibo[1]);
    const result = await fibo.async(n);
    res.setHeader("Content-Type", "application/json");
    res.write(`{"result":${result}}`);
    res.end();
    return; // early return
  }

  res.setHeader("Content-Type", "text/html");
  res.write("coucou");
  res.end();
};
*/

const server = createServer(app);

const port = process.env.PORT;

server.listen(port, () => {
  console.log(`Server ready: http://127.0.0.1:${port}`);
});

server.on("error", (err) => {
  console.error(err);
  process.exit(1);
});
