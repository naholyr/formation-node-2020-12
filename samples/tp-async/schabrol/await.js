import { readFile } from "fs/promises";

// concurrente moche, mais concurrente quand-même

const b = async () => {
  const b1 = await readFile("../1.txt");
  const b2 = await readFile("../2.txt");
  const b3 = await readFile("../3.txt");

  process.stdout.write(Buffer.concat([b1, b2, b3]));
};

b();
