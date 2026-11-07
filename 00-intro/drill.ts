// Checkpoint 008 - TypeScript Tooling And Compilation
// GYM note: 008-Checkpoint TypeScript Tooling And Compilation.md

const hello: string = "hello, typescript";

export function greet(name: string): string {
  return `Hello, ${name}!`;
}

// TODO: Run this file through the compiler four different ways and note the output.
// 1. npx tsc 00-intro/drill.ts --target es5
// 2. npx tsc 00-intro/drill.ts --target es2022
// 3. npx tsc 00-intro/drill.ts --module esnext
// 4. npx tsc 00-intro/drill.ts --module commonjs
// 5. npx tsc 00-intro/drill.ts --declaration
//
// TODO: Compare the emitted JavaScript and the optional .d.ts output.
