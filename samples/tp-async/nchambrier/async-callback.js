import { readFile } from "fs";

console.log("avant");

// error-first callback => "errback"
readFile("../1.txt", (err, buffer1) => {
  process.stdout.write(buffer1);
});

readFile("../2.txt", (err, buffer2) => {
  process.stdout.write(buffer2);
});

readFile("../3.txt", (err, buffer3) => {
  process.stdout.write(buffer3);
});

console.log("après");
