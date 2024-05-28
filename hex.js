const encoder = new TextEncoder();

let chars = "0123456789abcdef";

export function encode(bytes) {
  if (typeof bytes == "string") bytes = encoder.encode(bytes);
  if (bytes instanceof ArrayBuffer) bytes = new Uint8Array(bytes);

  return [...bytes].map(byte => chars[byte >> 4] + chars[byte & 0xf]).join("");
}

export function decode(string) {
  const output = new Uint8Array((string.length + 1) / 2);

  let highNibble = string.length % 2 == 0;
  let byteCount = 0;
  let value = 0;

  for (let char of string.toLowerCase()) {
    let found = chars.indexOf(char);
    if (found < 0) {
      throw new Error(`Character not known: ${char}`)
    }
    if (highNibble) {
      value = found << 4;
    } else {
      output[byteCount++] = value | found;
    }
    highNibble = !highNibble;
  }
  return new Uint8Array(output);
}

const decoder = new TextDecoder();

export function decodeText(string) {
  return decoder.decode(decode(string));
}

