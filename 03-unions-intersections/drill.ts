// Checkpoint 011 - Discriminated Unions And Narrowing

// (a) TODO: Define a `PaymentResult` union of object types sharing a `status` discriminant
// (for example "success" | "failure" | "pending") with payloads that differ per variant.

// (a) prediction: inside the paid branch we can only touch its own payload; same for each variant.
//     the literal status narrows the union set by set.
//     result: ✓ confirmed — success touches transactionId, failure touches error.code/message,
//             pending touches estimatedCompletionTime. No cross-payload access anywhere.
interface PaymentSuccess {
  status: "success";
  transactionId: string;
  amount: number;
  timestamp: Date;
}

interface PaymentFailure {
  status: "failure";
  error: {
    code: string;
    message: string;
  };
}

interface PaymentPending {
  status: "pending";
  estimatedCompletionTime: Date;
}

type PaymentResult = PaymentSuccess | PaymentFailure | PaymentPending;

// (b) TODO: Write a handler that switches on `result.status` and narrows to each variant.
// Use exhaustive checking with a `never` guard.

// (b) prediction: control flow — switch cases compare the literal discriminant and shrink the union.
//     the never guard should compile while every case is covered.
//     result: ✓ exactly one variant's payload is available per branch.
//     never guard: const _exhaustiveCheck: never = payment; compiles today because after all three
//     literal cases the leftover set in default is EMPTY (never). Assigning anything not in the
//     empty set to never is illegal — so adding status: "refunded" later makes the leftover set
//     non-empty and this line errors at BUILD time. A tripwire for exhaustiveness.
//     (my phrasing: "no covered case left in the switch" — the never type completes the idea)
function handler(payment: PaymentResult) {
  switch (payment.status) {
    case "success":
      console.log(`Success! Transaction ID: ${payment.transactionId}`);
      break;

    case "failure":
      console.error(
        `Payment failed: ${payment.error.message} (${payment.error.code})`,
      );
      break;

    case "pending":
      console.log(
        `Processing... Check back at ${payment.estimatedCompletionTime.toLocaleTimeString()}`,
      );
      break;

    default: {
      const _exhaustiveCheck: never = payment;
      throw new Error(
        `Unhandled payment status: ${JSON.stringify(_exhaustiveCheck)}`,
      );
    }
  }
}
// (c) TODO: Write the "wrong" version that attempts to model the same thing with
// `extends`-based interfaces instead of a union, and note why narrowing fails there.

// (c) attempt 1 — prediction: accepted — ok is the same set (boolean) on both sides, so merging is legal.
interface PaidResult   { ok: boolean; receipt: string }
interface FailedResult { ok: boolean; reason: string }
interface PaymentResultWrong extends PaidResult, FailedResult {}

// (c) attempt 2 — prediction: refused — true and false cannot hold at the same time, so the sets do not overlap.
interface PaidResultLit   { ok: true; receipt: string }
interface FailedResultLit { ok: false; reason: string }
interface PaymentResultWrongLit extends PaidResultLit, FailedResultLit {}
//     result: attempt 1 ✓ compiles — but it is an intersection: receipt AND reason are both
//             required at once. A class implementing it must supply both payloads, and narrowing
//             is dead: ok: boolean is the shared {true, false} set, so if (r.ok) proves nothing.
//     result: attempt 2 ✗ error TS2320: Interface 'PaymentResultWrongLit' cannot simultaneously
//             extend types 'PaidResultLit' and 'FailedResultLit'. Named property 'ok' of types
//             'PaidResultLit' and 'FailedResultLit' are not identical.
// SESSION VERDICT: the original okResult/errorResult idea from session one — resolved.
// A union is "one of"; extends is "all of at once".