import { EventEmitter } from "events";

const ee = new EventEmitter();

ee.on("toto", () => console.log("toto 1"));
ee.once("toto", () => console.log("toto 2"));

// Gestion standard des erreurs
ee.on("error", (err) => console.error(err));

/*
ee.on("toto", () => {
  setTimeout(() => prout(), 100);
});
*/

console.log("before");
ee.emit("toto");
ee.emit("toto");
ee.emit("error", new Error("coucou"));
console.log("after");
