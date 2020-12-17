import { Worker, isMainThread, parentPort, workerData } from "worker_threads";
// import { fileURLToPath } from "url";

// fibo :: (n: number): number
const fibo = (n) => (n <= 1 ? 1 : fibo(n - 1) + fibo(n - 2));

export const sync = fibo;

export const async = (n) =>
  new Promise((resolve, reject) => {
    if (!isMainThread) {
      return reject("Cannot call async fibo in worker");
    }
    // const fileName = fileURLToPath(import.meta.url); // CommonJS: __filename
    // Tests fail as they interpret file as commonjs, fuck that shit and just hardcode name
    const fileName = "./lib/fibo.js";
    const worker = new Worker(fileName, { workerData: n });
    worker.on("message", (message) => {
      console.log(
        `[${process.pid}] Received worker response: ${JSON.stringify(message)}`
      );
      resolve(message);
    });
    worker.on("error", reject);
    worker.on("exit", (code) => {
      if (code !== 0)
        reject(new Error(`Fibo worker stopped with exit code ${code}`));
    });
  });

// Worker code
if (!isMainThread) {
  const n = workerData;
  console.log(`[${process.pid}] Received worker data: ${JSON.stringify(n)}`);
  parentPort.postMessage(fibo(n));
}
