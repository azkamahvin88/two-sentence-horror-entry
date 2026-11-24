// Two-Sentence Horror — make.fun entry (program/v1, Node 22+).
// Writes one horror story of exactly two sentences, 240 characters,
// to /output/entry.txt. Deterministic, no network, no model calls.
// The story is a fixed constant written by the author for this bounty.
//
// Why this story: the first sentence sets a nightly ritual whose whole
// point is proving the narrator is alone; the second sentence breaks
// the ritual (an eighteenth step that was never there) and reveals an
// intelligence at the bottom of the stairs that knows the count and
// counts it back. The horror is implied, never explained — the reader
// fills in what is standing in the dark.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Every night I count the stairs down to the front door in the dark, to prove I'm still alone in this house: seventeen steps, always seventeen. Last night there were eighteen, and something at the bottom of the stairs counted them back to me.";

// Gate guard: the sealed scorer only accepts 1–400 characters and
// exactly two sentences. Fail loudly here rather than writing an
// invalid entry.
const chars = [...ENTRY].length;
if (chars < 1 || chars > 400) {
  throw new Error(`ENTRY is ${chars} characters; must be 1–400.`);
}
const sentences = ENTRY.split(/(?<=[.!?])\s+/).filter(Boolean);
if (sentences.length !== 2) {
  throw new Error(`ENTRY has ${sentences.length} sentences; must be exactly 2.`);
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, ENTRY + "\n", "utf8");

console.log(`Wrote ${chars} characters, ${sentences.length} sentences, to ${outFile}`);
