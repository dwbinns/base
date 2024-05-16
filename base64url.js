// https://datatracker.ietf.org/doc/html/rfc4648

import { decode64, encode64 } from "./base64shared.js";

const base64urlAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

const encoder = new TextEncoder();

export function encodeText(string) {
  return encode64(encoder.encode(string), base64urlAlphabet);
}

export function encode(bytes) {
  return encode64(bytes, base64urlAlphabet);
}

export function decode(string) {
  return decode64(string, base64urlAlphabet);
}

const decoder = new TextDecoder();

export function decodeText(string) {
  return decoder.decode(decode64(string, base64urlAlphabet));
}

