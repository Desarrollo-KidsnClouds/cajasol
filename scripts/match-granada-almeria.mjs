import fs from "fs";

const west = fs.readFileSync("assets/west-east.svg", "utf8");
const blank = fs.readFileSync("assets/andalusia_blank_map.svg", "utf8");

function roughBBox(d) {
  const nums = d.match(/-?\d+\.?\d*/g)?.map(Number) ?? [];
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;
  for (let i = 0; i < nums.length - 1; i += 2) {
    const x = nums[i];
    const y = nums[i + 1];
    if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  }
  return { minX, minY, maxX, maxY, cx: (minX + maxX) / 2, cy: (minY + maxY) / 2 };
}

for (const name of ["Granada", "Almería"]) {
  const re = new RegExp(`<text([\\s\\S]*?)<tspan[\\s\\S]*?>${name}<\\/tspan>`, "i");
  const block = west.match(re)[0];
  const lx = Number([...block.matchAll(/\bx="([^"]+)"/g)].at(-1)[1]);
  const ly = Number([...block.matchAll(/\by="([^"]+)"/g)].at(-1)[1]);
  console.log(name, "label", lx, ly);
}

for (const id of ["path2167", "path2173", "path2168"]) {
  const m = blank.match(new RegExp(`id="${id}"[^>]*d="([^"]+)"`));
  const bb = roughBBox(m[1]);
  console.log("\n" + id, bb);
  for (const name of ["Granada", "Almería"]) {
    const re = new RegExp(`<text([\\s\\S]*?)<tspan[\\s\\S]*?>${name}<\\/tspan>`, "i");
    const block = west.match(re)[0];
    const lx = Number([...block.matchAll(/\bx="([^"]+)"/g)].at(-1)[1]);
    const ly = Number([...block.matchAll(/\by="([^"]+)"/g)].at(-1)[1]);
    const inside = lx >= bb.minX && lx <= bb.maxX && ly >= bb.minY && ly <= bb.maxY;
    console.log(`  ${name}: inside=${inside} dist=${Math.hypot(lx - bb.cx, ly - bb.cy).toFixed(1)}`);
  }
}
