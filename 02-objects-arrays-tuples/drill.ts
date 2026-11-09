// Checkpoint 010 - Objects Index Signatures And Tuples
// GYM note: 010-Checkpoint Objects Index Signatures And Tuples.md
// Method: prediction FIRST as a comment, then code, then verdict (✓/✗ + error code).

type Contact = { name: string; phone: string };

function send(c: Contact) {
  console.log(`${c.name}: ${c.phone}`);
}

// (a) prediction: the inline literal is checked on the fly — an extra key there may be a typo, so TS complains.
//     result: ✗ error TS2353: Object literal may only specify known properties, and 'mood' does not exist in type 'Contact'.
send({ name: "Khalid", phone: "555-1234", mood: "happy" });

// (b) prediction: assigning to an intermediate variable loses freshness — falls back to structural subtyping: minimal requirements met, extra keys ignored. (explanation researched)
//     result: ✓ compiles with no error — same shape, but no freshness, so no excess property check.
const prepared = { name: "Khalid", phone: "555-1234", mood: "happy" };
send(prepared);

// (c) prediction: the index signature loosens the structure — any string key is accepted, so 'mobile' is fine.
//     result: ✓ compiles. Known keys keep named access; extra string keys are allowed by [key: string]: string.
type Phones = {
  home: string;
  work: string;
  [key: string]: string;
};
const phones: Phones = { home: "555", work: "556", mobile: "557" };

// (d) prediction: phones["fax"] has TYPE string but VALUE undefined at runtime.
//     result: ✓ both confirmed — the type and the value disagree.
console.log(phones["fax"]);

// WHY THE LIE IS DANGEROUS:
// const fax: string = phones["fax"]; // TS promises a string, runtime holds undefined
// fax.trim();                        // TypeError: Cannot read properties of undefined (reading 'trim')
// or the silent version: "Fax: " + fax renders "Fax: undefined" in the UI — no crash, wrong data.
// remedy: noUncheckedIndexedAccess in tsconfig makes index access string | undefined, forcing a check.

// (e) prediction: we will return a tuple of two values only more will give me an error
// if it only number[] will cause a silent undefined
//     result: ✗ error TS2493: Tuple type 'readonly [number, number]' of length '2' has no element at index '5'. Caught early — number[] would hand back undefined silently (the (d) lie again).
// drill: write a function range(from: number, to: number): [number, number] returning both bounds,
// then use it. question to answer in the verdict: why is a tuple better than number[] here?
function range(from: number, to: number): readonly [number, number] {
  return [from, to];
}
const bad = range(1, 2)[5];
let [xx, yy] = range(1, 2);
xx = 1234;

console.log(xx);

// (f) prediction: can't reassign a read only property
//     result: ✗ error TS2540: Cannot assign to '0' because it is a read-only property. Destructured copies (lat) stay reassignable — readonly guards the tuple's own indices, not the copies. Course trade-off: tuples trade readability for compactness — positions have no names.
//     bonus: readonly removes mutating methods (push, sort, splice) from the type entirely.
// drill: declare a coordinate as readonly [number, number] and try to reassign index 0.
// what error do you get, and what trade-off of readonly tuples did the course mention?
const coord: readonly [number, number] = [30, 31];

coord[0] = 99; // ✗ TS2540: Cannot assign to '0' because it is a read-only property
let [lat, lon] = coord;
lat = 99;
