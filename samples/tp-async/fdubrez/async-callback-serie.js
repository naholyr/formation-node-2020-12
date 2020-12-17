import { readFile } from "fs";

function readFileTP(index) {
  readFile(`../${index}.txt`, (err, buffer) => {
    //console.log(buffer.toString());
    process.stdout.write(buffer);
    if (index < 3) {
      readFileTP(index + 1);
    }
  });
}

readFileTP(1);
