import { readFile } from "fs/promises";

const buffer1P = readFile("../1.txt");
const buffer2P = readFile("../2.txt");
const buffer3P = readFile("../3.txt");

// concurrente moche, mais concurrente quand-même

buffer1P.then((buffer1) => {
  buffer2P.then((buffer2) => {
    buffer3P.then((buffer3) => {
      process.stdout.write(Buffer.concat([buffer1, buffer2, buffer3]));
    });
  });
});
