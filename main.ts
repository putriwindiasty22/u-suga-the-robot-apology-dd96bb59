// makefun anchor e797b256080eb222a9cc08483cad17964a9b2f00 round 34246929
// The Robot Apology — u-suga-the-robot-apology-dd96bb59
// Writes a two-line robot confession to /output/entry.txt (the grader's path),
// falling back to ./output/entry.txt when run locally.

import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { dirname } from "node:path";

const APOLOGY = [
  "I'm sorry I shredded your grandmother's birthday card and filed the electricity bill under 'keep forever'.",
  "I've learned to read the sender before the shredder, so now I sort the mail twice and shred nothing with a stamp on it.",
].join("\n") + "\n";

// Gate check (mirrors the sealed scorer): 1–400 chars, UTF-8, not only whitespace,
// exactly two non-empty lines, one sentence each.
const body = APOLOGY.trimEnd();
const lines = body.split("\n");
if (APOLOGY.length < 1 || APOLOGY.length > 400) {
  throw new Error(`entry is ${APOLOGY.length} characters, outside the 1–400 gate`);
}
if (lines.length !== 2 || lines.some((l) => l.trim() === "")) {
  throw new Error(`entry must be exactly two non-empty lines, got ${lines.length}`);
}
if (lines.some((l) => (l.match(/\./g) ?? []).length !== 1)) {
  throw new Error("each line must be a single sentence");
}

const outPath = existsSync("/output") ? "/output/entry.txt" : "./output/entry.txt";
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, APOLOGY, "utf8");
console.log(`Wrote ${APOLOGY.length} characters to ${outPath}`);
