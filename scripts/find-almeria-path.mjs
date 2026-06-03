import fs from "fs";

const blank = fs.readFileSync("assets/andalusia_blank_map.svg", "utf8");
const TX = 614.28621;
const TY = 149.27033;
const targetX = 259.37628;
const targetY = 165.03198;

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
  return { minX, minY, maxX, maxY };
}

const paths = [...blank.matchAll(/<path[^>]*id="(path[^"]+)"[^>]*d="([^"]+)"[^>]*style="([^"]+)"/g)]
  .filter((m) => m[3].includes("fill:#") && !m[3].includes("fill:none"));

for (const m of paths) {
  const bb = roughBBox(m[2]);
  const gx = targetX;
  const gy = targetY;
  if (gx >= bb.minX && gx <= bb.maxX && gy >= bb.minY && gy <= bb.maxY) {
    console.log("CONTAINS ALMERIA LABEL:", m[1], bb);
  }
  if (bb.maxX > 200) {
    console.log(m[1], "maxX", bb.maxX.toFixed(1), "range", bb.minX.toFixed(1), bb.maxY.toFixed(1));
  }
}
