import { readFile } from "fs/promises";

async function readFiles() {
  const buffer1 = await readFile("../1.txt");
  const buffer2 = await readFile("../2.txt");
  const buffer3 = await readFile("../3.txt");
  process.stdout.write(Buffer.concat([buffer1, buffer2, buffer3]));
}
readFiles();
