import fs from "fs";

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
  return { minX, minY, maxX, maxY, cx: (minX + maxX) / 2, cy: (minY + maxY) / 2, area: (maxX - minX) * (maxY - minY) };
}

const paths = [...blank.matchAll(/<path[^>]*id="(path[^"]+)"[^>]*d="([^"]+)"[^>]*style="([^"]+)"/g)]
  .filter((m) => m[3].includes("fill:#") && !m[3].includes("fill:none"));

for (const m of paths) {
  const bb = roughBBox(m[2]);
  console.log(m[1], "len", m[2].length, "cx", bb.cx.toFixed(0), "cy", bb.cy.toFixed(0), "maxX", bb.maxX.toFixed(0));
}
