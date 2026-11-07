"use strict";
// Checkpoint 008 - TypeScript Tooling And Compilation
// GYM note: 008-Checkpoint TypeScript Tooling And Compilation.md
Object.defineProperty(exports, "__esModule", { value: true });
exports.greet = greet;
var hello = "hello, typescript";
function greet(name) {
    return "Hello, ".concat(name, "!");
}
// TODO: Run this file through the compiler four different ways and note the output.
// 1. npx tsc 00-intro/drill.ts --target es5
// 2. npx tsc 00-intro/drill.ts --target es2022
// 3. npx tsc 00-intro/drill.ts --module esnext
// 4. npx tsc 00-intro/drill.ts --module commonjs
// 5. npx tsc 00-intro/drill.ts --declaration
//
// TODO: Compare the emitted JavaScript and the optional .d.ts output.
