import { createServer } from "http";
import { Server as WSServer } from "socket.io";
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

// WebSocket

const io = new WSServer(server);

process.on("broadcastWSEvent", (room, event, ...args) => {
  io.to(room).emit(event, ...args);
});

io.on("connection", (socket) => {
  // socket.emit('name', ...args)
  // socket.on('name', (...args, cb?) => {})
  // socket.volatile.emit(...)
  // io.emit(...)
  // socket.broadcast.emit(...)

  // socket.join('room')
  // socket.leave('room')
  // io.to('room').emit(...)

  socket.on("subscribe-home", () => {
    socket.join("home");
  });

  socket.on("subscribe-roti", (id) => {
    console.log({ id });
    socket.join("roti-" + id);
  });

  socket.emit("coucou", process.pid);

  socket.on("time", () => {
    socket.emit("timeResponse", Date.now());
  });

  socket.on("fibo", (n, cb) => {
    cb(8);
  });
});
