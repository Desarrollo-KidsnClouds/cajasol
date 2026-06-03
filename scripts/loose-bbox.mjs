import fs from "fs";

const blank = fs.readFileSync("assets/andalusia_blank_map.svg", "utf8");
const west = fs.readFileSync("assets/west-east.svg", "utf8");

function looseBBox(d) {
  const nums = d.match(/-?\d*\.?\d+/g).map(Number);
  const minX = Math.min(...nums);
  const maxX = Math.max(...nums);
  const minY = Math.min(...nums);
  const maxY = Math.max(...nums);
  return { minX, minY, maxX, maxY, cx: (minX + maxX) / 2, cy: (minY + maxY) / 2 };
}

for (const name of ["Granada", "Almería"]) {
  const block = west.match(new RegExp(`<text([\\s\\S]*?)<tspan[\\s\\S]*?>${name}<\\/tspan>`, "i"))[0];
  const lx = Number([...block.matchAll(/\bx="([^"]+)"/g)].at(-1)[1]);
  const ly = Number([...block.matchAll(/\by="([^"]+)"/g)].at(-1)[1]);
  console.log(name, lx, ly);
}

for (const id of ["path2167", "path2173"]) {
  const d = blank.match(new RegExp(`id="${id}"[^>]*d="([^"]+)"`))[1];
  const bb = looseBBox(d);
  console.log("\n" + id, bb);
  for (const name of ["Granada", "Almería"]) {
    const block = west.match(new RegExp(`<text([\\s\\S]*?)<tspan[\\s\\S]*?>${name}<\\/tspan>`, "i"))[0];
    const lx = Number([...block.matchAll(/\bx="([^"]+)"/g)].at(-1)[1]);
    const ly = Number([...block.matchAll(/\by="([^"]+)"/g)].at(-1)[1]);
    const inside = lx >= bb.minX && lx <= bb.maxX && ly >= bb.minY && ly <= bb.maxY;
    console.log(`  ${name}: inside=${inside}`);
  }
}
