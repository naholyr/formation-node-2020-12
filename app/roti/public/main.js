// TODO front JS
/* globals io:false */

const socket = io.connect();

// socket.emit('name', ...args, cb?)
// socket.on('name', (...args) => {})
// specific events: 'connect', 'reconnect', 'reconnecting', 'error', 'ping', 'pong', …

socket.on("coucou", (pid) => {
  console.log("Coucou from server", pid);
  setTimeout(() => {
    socket.emit("time");
    socket.emit("time");
    socket.emit("time");
  });
});

socket.on("timeResponse", console.log);

setTimeout(() => {
  socket.emit("fibo", 5, (n) => {
    console.log("fibo(%s) = %s", 5, n);
  });
}, 500);

window.listenROTI = (id) => {
  socket.emit("subscribe-roti", id);
  socket.on("newFeedback", (feedback) => {
    console.log("New feedback", feedback);
    document.location.reload();
  });
};

window.listenROTIsList = () => {
  socket.emit("subscribe-home");
  socket.on("newRoti", (roti) => {
    console.log("New roti", roti);
    document.location.reload();
  });
};
