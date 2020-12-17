import { readFile } from "fs/promises";

/*
p1; // Promise<v1>
p2; // Promise<v2>
[p1, p2]; // Array<Promise<?>>
Promise.all([p1, p2]); // Promise<Array<?>> :: Promise<[v1, v2]>
*/

Promise.all([
  readFile("../1.txt"),
  readFile("../2.txt"),
  readFile("../3.txt"),
]).then((buffers) => {
  process.stdout.write(Buffer.concat(buffers));
});
