import { config } from "dotenv";
import express from "express";
import { coucou } from "./lib/routes/coucou.js";
import { fiboHandler } from "./lib/routes/fibos.js";
import { logMiddleware } from "./lib/middlewares/log.js";
import consolidate from "consolidate";
import { homeHandler } from "./lib/routes/home.js";
import { loginHandler } from "./lib/routes/login.js";
import bodyParser from "body-parser";
import session from "express-session";

// See https://www.npmjs.com/package/dotenv-cli for better integration
config();

export const app = express();

// Template engine
app.engine("html", consolidate.ejs);
app.set("view engine", "html");
app.set("views", "views"); // current working directory / views

// Middlewares
app.use(express.static("public"));
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
