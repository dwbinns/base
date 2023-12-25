// https://datatracker.ietf.org/doc/html/rfc4648

import { decode64, encode64 } from "./base64shared.js";

const base64Alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

export function encode(bytes) {
  return encode64(bytes, base64Alphabet, "=");
}

export function decode(bytes) {
  return decode64(bytes, base64Alphabet, "=");
}

