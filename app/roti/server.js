import { config } from "dotenv";
import { createServer } from "http";
import express from "express";
import { coucou } from "./lib/routes/coucou.js";
import { fiboHandler } from "./lib/routes/fibos.js";
import { logMiddleware } from "./lib/middlewares/log.js";
import consolidate from "consolidate";
import { homeHandler } from "./lib/routes/home.js";
import { loginHandler } from "./lib/routes/login.js";
import bodyParser from "body-parser";
import session from "express-session";

config();

const app = express();

// Template engine
app.engine("html", consolidate.ejs);
app.set("view engine", "html");
app.set("views", "views"); // current working directory / views

// Middlewares
app.use(bodyParser.json()); // REST clients
app.use(bodyParser.urlencoded({ extended: true })); // HTML forms
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(logMiddleware);

// create routes
app.get("/", homeHandler);
app.post("/login", loginHandler);

app.get("/coucou", coucou);
app.get("/fibo/:number([0-9]+)", fiboHandler);

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
