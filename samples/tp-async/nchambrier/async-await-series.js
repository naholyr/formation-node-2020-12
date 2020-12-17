import { readFile } from "fs/promises";

// ESM: await à la racine possible

process.stdout.write(
  Buffer.concat([
    await readFile("../1.txt"),
    await readFile("../2.txt"),
    await readFile("../3.txt"),
  ])
);
