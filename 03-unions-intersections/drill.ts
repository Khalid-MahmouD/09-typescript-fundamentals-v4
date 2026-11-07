// Checkpoint 011 - Discriminated Unions And Narrowing

// (a) TODO: Define a `PaymentResult` union of object types sharing a `status` discriminant
// (for example "success" | "failure" | "pending") with payloads that differ per variant.




// (b) TODO: Write a handler that switches on `result.status` and narrows to each variant.
// Use exhaustive checking with a `never` guard.




// (c) TODO: Write the "wrong" version that attempts to model the same thing with
// `extends`-based interfaces instead of a union, and note why narrowing fails there.
