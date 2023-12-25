import * as b64 from "./base64.js";
import * as b64url from "./base64url.js";
import { deepEqual } from "node:assert/strict";

let tests = [
  ["", ""],
  ["f", "Zg=="],
  ["fo", "Zm8="],
  ["foo", "Zm9v"],
  ["foob", "Zm9vYg=="],
  ["fooba", "Zm9vYmE="],
  ["foobar", "Zm9vYmFy"], 
  ["kM>kM?", "a00+a00/"]
];

for (let [text, base64] of tests) {
  let base64url = base64.replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
  let bytes = new TextEncoder().encode(text);
  deepEqual(b64.encode(text), base64);
  deepEqual(b64.encode(bytes), base64);
  deepEqual(b64url.encode(bytes), base64url);
  deepEqual(b64url.decode(base64url), bytes);
  deepEqual(b64.decode(base64), bytes);
}
