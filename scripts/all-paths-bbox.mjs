import fs from "fs";

const blank = fs.readFileSync("assets/andalusia_blank_map.svg", "utf8");
const west = fs.readFileSync("assets/west-east.svg", "utf8");

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

const almeria = (() => {
  const block = west.match(/<text([\s\S]*?)<tspan[\s\S]*?>Almería<\/tspan>/i)[0];
  return {
    lx: Number([...block.matchAll(/\bx="([^"]+)"/g)].at(-1)[1]),
    ly: Number([...block.matchAll(/\by="([^"]+)"/g)].at(-1)[1]),
  };
})();

const paths = [...blank.matchAll(/<path[^>]*id="(path[^"]+)"[^>]*d="([^"]+)"[^>]*style="([^"]+)"/g)]
  .filter((m) => m[3].includes("fill:#") && !m[3].includes("fill:none"));

const hits = [];
for (const m of paths) {
  const bb = roughBBox(m[2]);
  const inside =
    almeria.lx >= bb.minX &&
    almeria.lx <= bb.maxX &&
    almeria.ly >= bb.minY &&
    almeria.ly <= bb.maxY;
  const dist = Math.hypot(almeria.lx - bb.cx, almeria.ly - bb.cy);
  if (inside || dist < 150) hits.push({ id: m[1], inside, dist: dist.toFixed(1), bb });
}

hits.sort((a, b) => Number(a.dist) - Number(b.dist));
console.log("Almería label", almeria);
console.log("Closest paths:");
for (const h of hits.slice(0, 8)) {
  console.log(h.id, "inside=" + h.inside, "dist=" + h.dist, "cx,cy", h.bb.cx.toFixed(1), h.bb.cy.toFixed(1));
}
