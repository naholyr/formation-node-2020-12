import { readFile } from "fs/promises";

// concurrente moche, mais concurrente quand-même

readFile("../1.txt").then((buffer1) => {
  return readFile("../2.txt").then((buffer2) => {
    return readFile("../3.txt").then((buffer3) => {
      process.stdout.write(Buffer.concat([buffer1, buffer2, buffer3]));
    });
  });
});
