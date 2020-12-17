import { readFile } from "fs/promises";
readFile("../1.txt").then((buffer1) => {
  readFile("../2.txt").then((buffer2) => {
    readFile("../3.txt").then((buffer3) => {
      process.stdout.write(Buffer.concat([buffer1, buffer2, buffer3]));
    });
  });
});
