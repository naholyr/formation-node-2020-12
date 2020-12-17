import { readFile } from "fs";

let results = [];

[1, 2, 3].forEach((index) => {
  readFile(`../${index}.txt`, (err, buffer) => {
    results = [...results, buffer];
    if (buffer.length === 3) {
    }
  });
});

readFileTP(1);
