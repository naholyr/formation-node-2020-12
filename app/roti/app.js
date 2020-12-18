import { config } from "dotenv";
import express from "express";
import { coucou } from "./lib/routes/coucou.js";
import { fiboHandler } from "./lib/routes/fibos.js";
import { logMiddleware } from "./lib/middlewares/log.js";
import consolidate from "consolidate";
import { homeHandler } from "./lib/routes/home.js";
import { loginHandler, logoutHandler } from "./lib/routes/login.js";
import bodyParser from "body-parser";
import session from "express-session";
import {
  newRotiHandler,
  postRotiHandler,
  findRotiHandler,
  addFeedBackHander,
} from "./lib/routes/roti.js";

// See https://www.npmjs.com/package/dotenv-cli for better integration
config();

export const app = express();

// Template engine
app.engine("html", consolidate.ejs);
app.set("view engine", "html");
app.set("views", "views"); // current working directory / views

// Middlewares
app.use(express.static("public")); // TODO disable in production
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

const asyncHandler = (handler) => async (req, res, next) => {
  try {
    await handler(req, res);
  } catch (err) {
    next(err);
  }
};

// create routes
app.get("/", asyncHandler(homeHandler));
app.post("/login", asyncHandler(loginHandler));

app.get("/logout", asyncHandler(logoutHandler)); // log out
app.get("/roti-new", asyncHandler(newRotiHandler)); // display form
app.post("/roti-new", asyncHandler(postRotiHandler)); // handle form
app.get("/roti/:id", asyncHandler(findRotiHandler)); // show roti details & feedbacks
app.post("/roti/:id/add-feedback", asyncHandler(addFeedBackHander)); // handle feedback form
// TODO handle authentication (forbidden pages)

app.get("/coucou", asyncHandler(coucou));
app.get("/fibo/:number([0-9]+)", asyncHandler(fiboHandler));

app.use((err, req, res, next) => {
  res.status(500).send("Error: " + err.message);
  next(err);
});
