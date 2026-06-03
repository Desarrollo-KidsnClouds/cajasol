import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const dir = dirname(fileURLToPath(import.meta.url));
const svg = fs.readFileSync(join(dir, 'andalusia_blank_map.svg'), 'utf8');
const TX = 614.28621;
const TY = 149.27033;

function bboxFromPath(d) {
  const nums = (d.match(/[-+]?(?:\d+\.\d*|\.\d+|\d+)/g) || []).map(Number);
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (let j = 0; j + 1 < nums.length; j += 2) {
    const px = nums[j], py = nums[j + 1];
    if (!Number.isFinite(px) || !Number.isFinite(py)) continue;
    minX = Math.min(minX, px);
    maxX = Math.max(maxX, px);
    minY = Math.min(minY, py);
    maxY = Math.max(maxY, py);
  }
  const area = (maxX - minX) * (maxY - minY);
  return {
    cx: (minX + maxX) / 2 + TX,
    cy: (minY + maxY) / 2 + TY,
    area,
  };
}

const re = /<path[^>]*id="(path[^"]+)"[^>]*d="([^"]+)"/g;
const items = [];
let m;
while ((m = re.exec(svg)) !== null) {
  if (m[2].length < 500) continue;
  const box = bboxFromPath(m[2]);
  items.push({ id: m[1], ...box });
}
items.sort((a, b) => b.area - a.area);
for (const i of items) {
  console.log(i.id, 'area', Math.round(i.area), 'cx', i.cx.toFixed(0), 'cy', i.cy.toFixed(0));
}
