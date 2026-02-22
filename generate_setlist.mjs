// generate_setlist.mjs
import fs from "node:fs";
import path from "node:path";

const SONGS_DIR = "songs";
const OUT_FILE = "setlist.json";

function titleFromFilename(filename) {
  // "02-abhi-na-jaaooo.txt" -> "Abhi Na Jaaooo"
  let base = filename.replace(/\.[^/.]+$/, ""); // remove extension
  base = base.replace(/^\d+\-/, ""); // remove leading "01-"
  base = base.replace(/[-_]+/g, " ").trim(); // hyphens/underscores to spaces

  // Title Case (simple)
  return base
    .split(" ")
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function main() {
  if (!fs.existsSync(SONGS_DIR)) {
    console.error(`Folder not found: ${SONGS_DIR}`);
    process.exit(1);
  }

  const files = fs
    .readdirSync(SONGS_DIR)
    .filter(f => f.toLowerCase().endsWith(".txt"))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  const setlist = files.map((f) => ({
    name: titleFromFilename(f),
    file: `${SONGS_DIR}/${f}`,
  }));

  fs.writeFileSync(OUT_FILE, JSON.stringify(setlist, null, 2) + "\n", "utf8");

  console.log(`Wrote ${OUT_FILE} with ${setlist.length} songs`);
}

main();
