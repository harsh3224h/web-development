const { Buffer } = require("buffer");

const buf = Buffer.from("Hi world", "utf-8");
// console.log(buf);
// console.log(buf.toString());

const buf2 = Buffer.alloc(110);
buf2.write("Hello");
// console.log(buf2.toString());

const buf3 = Buffer.from("I'm learning NodeJS");
// console.log(buf3.toString());
// console.log(buf3.toString("utf-8", 0, 3));

const buf4 = Buffer.from("Chai");
// console.log(buf4);
buf4[0] = 0x4a;
// console.log(buf4);
// console.log(buf4.toString());

const buf5 = Buffer.from("Chai aur ");
const buf6 = Buffer.from("code");

const mergedValue = Buffer.concat([buf5, buf6]);
console.log(mergedValue.length);
console.log(mergedValue.toString());
