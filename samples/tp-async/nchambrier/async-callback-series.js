import { readFile } from "fs";

// error-first callback => "errback"
readFile("../1.txt", (err1, buffer1) => {
  if (err1) {
    console.error("Nope!", err1);
    return;
  }
  readFile("../2.txt", (err2, buffer2) => {
    if (err2) {
      console.error("Nope!", err2);
      return;
    }
    readFile("../3.txt", (err3, buffer3) => {
      if (err3) {
        console.error("Nope!", err3);
        return;
      }
      const result = Buffer.concat([buffer1, buffer2, buffer3]);
      process.stdout.write(result);
    });
  });
});
