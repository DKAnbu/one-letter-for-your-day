import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The letter for the day: Q.
// Behind it sits the word "queued" — a day spent waiting in line behind
// thousands of other letters, each one hoping to be picked first.
// Q is a sharp, uncommon initial: not the obvious pick, and its sound
// (the hard "kw" onset) fits a day that kept starting and stopping.
const LETTER: string = "Q";

// Gate: exactly one character, a capital letter A-Z, nothing else —
// no newline, no space, no punctuation, no gloss. A lowercase letter
// would still be one character, so the check is deliberately strict:
// only A-Z counts, because the gate wants a letter, not any character.
if (LETTER.length !== 1) {
  throw new Error(`LETTER must be exactly 1 character, got ${LETTER.length}`);
}
if (!/^[A-Z]$/.test(LETTER)) {
  throw new Error(`LETTER must be a single capital letter A-Z, got ${JSON.stringify(LETTER)}`);
}
// The letter must also be plain ASCII, so the file is exactly 1 byte.
if (Buffer.byteLength(LETTER, "utf8") !== 1) {
  throw new Error(`LETTER must be exactly 1 byte, got ${Buffer.byteLength(LETTER, "utf8")}`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LETTER, "utf8");

// Read-back guard: the file on disk must be exactly the letter, byte for byte.
const written: string = readFileSync("/output/entry.txt", "utf8");
if (written !== LETTER) {
  throw new Error(
    `Read-back mismatch: expected ${JSON.stringify(LETTER)}, got ${JSON.stringify(written)}`,
  );
}
console.log(`Wrote ${LETTER.length} char to /output/entry.txt`);
