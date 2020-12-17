import { readFile } from "fs/promises";

// ESM: await à la racine possible

process.stdout.write(
  Buffer.concat(
    await Promise.all([
      readFile("../1.txt"),
      readFile("../2.txt"),
      readFile("../3.txt"),
    ])
  )
);

// Concurrent, toujours moche, mais toujours concurrent

const b1P = readFile("../1.txt"),
  b2P = readFile("../2.txt"),
  b3P = readFile("../3.txt");

const b1 = await b1P,
  b2 = await b2P,
  b3 = await b3P;

process.stdout.write(Buffer.concat([b1, b2, b3]));
