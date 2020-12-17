import { readFile } from "fs";

/* flow control

const readF = (f) => (cb) => readFile(f, cb);

async.parallel(
  [readF("../1.txt"), readF("../2.txt"), readF("../3.txt")],
  (err, buffers) => {
    process.stdout.write(Buffer.concat(buffers));
  }
);
*/

let buffers = [];
let pending = 3;

const showBuffers = () => {
  const buffer = Buffer.concat(buffers);
  process.stdout.write(buffer);
};

readFile("../1.txt", (err, buffer1) => {
  buffers[0] = buffer1;
  if (--pending === 0) showBuffers();
});

readFile("../2.txt", (err, buffer2) => {
  buffers[1] = buffer2;
  if (--pending === 0) showBuffers();
});

readFile("../3.txt", (err, buffer3) => {
  buffers[2] = buffer3;
  if (--pending === 0) showBuffers();
});
