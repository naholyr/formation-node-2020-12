import cluster from "cluster";
import os from "os";

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  const numCPUs = os.cpus().length;
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  await import("./main.js");
}
