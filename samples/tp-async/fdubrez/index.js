import fs from "fs";

Promise.all(
  [1, 2, 3].map((index) => {
    return fs.readFile(`../${index}.txt`, (err, data) => {
      const result = {
        index,
        content: data.toString().replace("\n", ""),
      };
      console.log(result);
      return result;
    });
  })
)
  .then((results) => {
    console.log(results);
    return results.sort((a, b) => {
      return a.index - b.index;
    });
  })
  .then((results) => {
    console.log(results);
    results.forEach((result) => console.log(result.content));
  });
