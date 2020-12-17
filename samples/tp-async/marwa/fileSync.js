import fs from "fs";

const buffer4 = fs.readFileSync("../4.txt");

process.stdout.write(buffer4);
