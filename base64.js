// https://datatracker.ietf.org/doc/html/rfc4648

import { decode64, encode64 } from "./base64shared.js";

const base64Alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

const encoder = new TextEncoder();

export function encodeText(string) {
  return encode64(encoder.encode(string), base64Alphabet, "=");
}

export function encode(bytes) {
  return encode64(bytes, base64Alphabet, "=");
}

export function decode(string) {
  return decode64(string, base64Alphabet, "=");
}

const decoder = new TextDecoder();

export function decodeText(string) {
  return decoder.decode(decode64(string, base64Alphabet, "="));
}

