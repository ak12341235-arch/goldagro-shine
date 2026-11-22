// Lists the legal-page fields that are still blank. Run: bun run check:legal
// Fill a field by typing its value between the quotes in src/lib/legal-data.ts.
import { readFileSync } from "node:fs";

const src = readFileSync("src/lib/legal-data.ts", "utf8");
const block = src.slice(src.indexOf("export const FILL_IN"));
const open = [...block.matchAll(/^\s+(\w+): "",\s*(?:\/\/\s*(.*))?$/gm)];
if (open.length === 0) {
  console.log("[legal] every fill-in field has a value.");
} else {
  console.log(`[legal] ${open.length} blank field(s) still to fill in src/lib/legal-data.ts:`);
  for (const m of open) console.log(`  - ${m[1]}${m[2] ? `  (${m[2].trim()})` : ""}`);
}
