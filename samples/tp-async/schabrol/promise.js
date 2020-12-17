import { readFile } from "fs/promises";

readFile("../1.txt", (err, buffer1) => {
  readFile("../2.txt", (err, buffer2) => {
    readFile("../3.txt", (err, buffer3) => {
      const result = Buffer.concat([buffer1, buffer2, buffer3]);
      process.stdout.write(result);
    });
  });
});
