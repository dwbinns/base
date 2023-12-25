# Base64 encoding and decoding

Encode and decode base64 and base64url. Base64 encodes 6 bits of binary data per character.

```js
import { encode, decode } from "@dwbinns/base/64";
console.log(encode(new Uint8Array([104, 101, 108, 108, 111])));
console.log(encode("hello"));
console.log(decode(encode("hello")));
console.log(new TextDecoder("utf8").decode(decode(encode("hello"))));
```

```
aGVsbG8=
aGVsbG8=
Uint8Array(5) [ 104, 101, 108, 108, 111 ]
hello
```

Base64url is a version of base64 without padding and using only URL-safe characters. See https://datatracker.ietf.org/doc/html/rfc4648

```js
import * as b64url from "@dwbinns/base/64url";
import * as b64 from "@dwbinns/base/64";
console.log(b64url.encode("kM>kM?."));
console.log(b64.encode("kM>kM?."));
```

```
a00-a00_Lg
a00+a00/Lg==
```


Decoded data will be returned as a Uint8Array, and data to be encoded should be supplied as a Uint8Array (a NodeJS Buffer is suitable). 
If a string is supplied to be encoded it will first be converted to an array of bytes using UTF8.