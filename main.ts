// Pigeon Pitch, One Line: make.fun entry
// One line, at most 200 characters: the elevator pitch a city pigeon
// gives to investors for its startup. Chosen line is 125 characters,
// well inside the gate, with every word earning its place.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "I'm raising $2M for NestEgg, an Airbnb for pigeons, because every statue in this city is fully booked and the rent is crumbs.";

function main(): void {
  if (LINE.length < 1 || LINE.length > 200) {
    throw new Error(`line must be 1-200 characters, got ${LINE.length}`);
  }
  if (LINE.includes("\n") || LINE.includes("\r")) {
    throw new Error("line must be a single line");
  }
  if (LINE.trim().length === 0) {
    throw new Error("line must not be only whitespace");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const path = `${outDir}/entry.txt`;
  writeFileSync(path, LINE + "\n", "utf8");

  // Read-back check: the file must contain exactly the validated line.
  const back = readFileSync(path, "utf8");
  if (back !== LINE + "\n") {
    throw new Error("entry.txt does not match the validated line");
  }
}

main();
