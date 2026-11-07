// Checkpoint 009 - Types As Sets And Inference
// GYM note: 009-Checkpoint Types As Sets And Inference.md
// Method: prediction FIRST as a comment, then code, then verdict (✓/✗ + error code).
// Slots (d), (e), (f) still have empty prediction slots - fill them BEFORE compiling.

// (a) prediction: a infers number — the big set — so I can reassign any number later.
//     result: ✓ no error. Hovering a shows: let a: number
let a = 3;
a = 4;

// (b) prediction: b infers the literal type 3 — a one-element set — so it can never hold 4.
//     result: ✓ no error. Hovering b shows: const b: 3
const b = 3;

// (c) prediction: TS will yell that x implicitly has an "any" type, because with no annotation it cannot know which set x belongs to.
//     result: ✗ error TS7006: Parameter 'x' implicitly has an 'any' type. (strict mode turns this check on)
function double(x) {
  return x * 2;
}

// (d) prediction: x: number narrows the expected set from any to only number — the implicit-any error should disappear.
//     result: ✓ doubleFixed compiles clean; only double (still unannotated) yells TS7006.
function doubleFixed(x: number): number {
  return x * 2;
}

// (e) prediction: nothing overlaps between a string and a number, so TS refuses the direct cast; force it through with "hello" as unknown as number.
//     result: ✗ error TS2352: Conversion of type 'string' to type 'number' may be a mistake. The double cast through unknown compiles — it silences the check, it does not make it safe.
// hint: if TS rejects the direct cast, the escape hatch casts through the type that contains everything.
let x = "hello" as number;

// (f) prediction: returning a template literal (a string) while promising number should cause an early, compile-time error.
//     result: ✗ error TS2322: Type 'string' is not assignable to type 'number'.
function badAdd(a: number, b: number): number {
  return `${a + b}`;
}

// DISCOVERY: naming files on the tsc command line IGNORES tsconfig.json.
// `npx tsc drill.ts --noEmit` ran without strict, so TS7006 never fired.
// `npx tsc --noEmit` at the workspace root applies strict — all three errors show.
// --noEmit = type-check only, no .js files are written.
