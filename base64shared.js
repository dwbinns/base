// https://datatracker.ietf.org/doc/html/rfc4648

export function encode64(bytes, alphabet, paddingChar) {
  if (typeof bytes == "string") bytes = new TextEncoder().encode(bytes);
  if (bytes instanceof ArrayBuffer) bytes = new Uint8Array(bytes);
  let bits = 0;
  let accumulator = 0;
  const output = [];
  let index = 0;
  while (index < bytes.length || bits > 0) {
    if (bits < 6 && index < bytes.length) {
      accumulator = (accumulator << 8) | bytes[index++];
      bits += 8;
    }

    output.push((accumulator << 6) >> bits);
    bits -= 6;
  }
  let padding = paddingChar ? "".padStart(-bits / 2, paddingChar) : "";
  return output.map((v) => alphabet[v & 0x3f]).join('') + padding;
}

const unprintable = /[\p{Z}\p{C}\p{M}]/u;

export function decode64(string, alphabet, paddingChar) {
  let bits = 0;
  let accumulator = 0;
  const output = [];
  let index = 0;
  while (index < string.length) {
    if (bits < 8 && index < string.length) {
      let char = string[index++];
      if (char != paddingChar) {
        let found = alphabet.indexOf(char);
        if (found < 0) {
          if (char.match(unprintable)) throw new Error(`Character not known: (${char.charCodeAt(0)})`);
          else throw new Error(`Character not known: "${char}"`);
        }
        accumulator = (accumulator << 6) | found;
        bits += 6;
      }
    }
    if (bits >= 8) {
      output.push((accumulator << 8) >> bits);
      bits -= 8;
    }

  }
  return new Uint8Array(output);
}

