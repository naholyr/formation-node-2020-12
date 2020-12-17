import { readFile } from "fs/promises";

async function main() {
  process.stdout.write(
    Buffer.concat([
      await readFile("../1.txt"),
      await readFile("../2.txt"),
      await readFile("../3.txt"),
    ])
  );
}

main();
