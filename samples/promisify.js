// API Promise

Promise.all; // (Array<Promise<T>>) => Promise<Array<T>>
Promise.race; // (Array<Promise<T>>) => Promise<T>

Promise.resolve; // T => Promise<T>
Promise.reject; // Error => Promise<Error>

promise.then((value) => newValue); // Promise<newValue>
promise.catch((err) => newValue); // Promise<newValue>
promise.then(
  (value) => newValue,
  (err) => newValue
); // Promise<newValue>

new Promise((resolve, reject) => {
  //…
  resolve(42);
  reject(new Error("prout"));
});

// Vieille fonction "legacy" (async par callback)
const asyncFooCb = (cb) => {
  setTimeout(() => {
    cb(null, 42);
  }, 1000);
};

// À la main
const asyncFooPromise = () =>
  new Promise((resolve, reject) => {
    asyncFooCb((err, value) => {
      if (err) {
        reject(err);
      } else {
        resolve(value);
      }
    });
  });

// Helper
import { promisify } from "util";

const asyncFooPromise = promisify(asyncFooCb);
