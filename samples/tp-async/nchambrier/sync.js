import { readFileSync } from "fs";

const buffer1 = readFileSync("../1.txt");
const buffer2 = readFileSync("../2.txt");
const buffer3 = readFileSync("../3.txt");

const buffer = Buffer.concat([buffer1, buffer2, buffer3]);

process.stdout.write(buffer);
