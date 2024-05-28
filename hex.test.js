import * as hex from "./hex.js";
import { deepEqual } from "node:assert/strict";

let tests = [
  ["", ""],
  ["\t", "09"],
  ["ab", "6162"],
  ["ZX", "5a58"],
  ["/>M\\kz", "2f3e4d5c6b7a"],
];

for (let [text, hexData] of tests) {
  let bytes = new TextEncoder().encode(text);
  deepEqual(hex.encode(text), hexData);
  deepEqual(hex.decode(hexData), bytes);
  deepEqual(hex.decode(hexData.replace(/^0/, '')), bytes);
  deepEqual(hex.decode(hexData.toUpperCase()), bytes);
}
