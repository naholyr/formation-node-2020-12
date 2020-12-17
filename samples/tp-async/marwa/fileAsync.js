import { readFile } from "fs";

console.log("avant");

// error-first callback => "errback"
//series
readFile("../3.txt", (err, buffer3) => {
  process.stdout.write(buffer3);
  readFile("../4.txt", (err, buffer4) => {
    process.stdout.write(buffer4);
  });
});

console.log("après");
