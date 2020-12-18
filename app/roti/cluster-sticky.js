import "./app.js"; // load env
import lipstick from "lipstick";

const port = process.env.PORT;

lipstick("./main.js", { port });
