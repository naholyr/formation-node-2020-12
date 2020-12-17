import { readFile } from "fs/promises";

// ESM: await à la racine possible

Promise.all(
  [1, 2, 3].map((index) => readFile(`../${index}.txt`))
).then((buffers) => process.stdout.write(Buffer.concat(buffers)));
