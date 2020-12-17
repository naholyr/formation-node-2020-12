import { createWriteStream } from "fs";
import { Transform } from "stream";

//let sum = 0;
//process.stdin.on("data", (data) => console.log((sum += Number(data))));

const fileOut = createWriteStream("output.txt");
process.stdin.pipe(fileOut);

process.stdin.pipe(process.stdout);

const textTransform = new Transform({
  transform(chunk, encoding, callback) {
    const str = chunk.toString("utf-8").trim().toUpperCase();
    const result = `${str} (length = ${str.length})\n`;
    callback(null, result);
  },
});
process.stdin.pipe(textTransform).pipe(process.stdout);
