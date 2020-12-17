import { Worker, isMainThread, parentPort, workerData } from "worker_threads";
import { fileURLToPath } from "url";

const fibo = (n: number): number => (n <= 1 ? 1 : fibo(n - 1) + fibo(n - 2));

export const sync = fibo;

export const async = (n: number): Promise<number> =>
  new Promise((resolve, reject) => {
    if (!isMainThread) {
      return reject("Cannot call async fibo in worker");
    }
    console.log(__filename); // .ts file → does not work with worker_threads
    const fileName = fileURLToPath(__filename); // CommonJS: __filename
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
  parentPort?.postMessage(fibo(n));
  parentPort?.postMessage(fibo(n));
}
