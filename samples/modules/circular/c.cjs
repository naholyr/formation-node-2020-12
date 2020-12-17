const aModule = require("./a.cjs");

exports.c = 42;

setTimeout(() => {
  console.log("from c", aModule.a);
}, 0);
