import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const dir = dirname(fileURLToPath(import.meta.url));
const west = fs.readFileSync(join(dir, 'west-east.svg'), 'utf8');
const names = ['Huelva', 'Sevilla', 'Cádiz', 'Córdoba', 'Jaén', 'Málaga', 'Granada', 'Almería'];

for (const name of names) {
  const re = new RegExp(
    `<text([\\s\\S]*?)<tspan[\\s\\S]*?>${name.replace('á', 'á')}<\\/tspan>`,
    'i'
  );
  const m = west.match(re);
  if (!m) {
    console.log('MISSING', name);
    continue;
  }
  const block = m[0];
  const xs = [...block.matchAll(/\bx="([^"]+)"/g)].map((x) => Number(x[1]));
  const ys = [...block.matchAll(/\by="([^"]+)"/g)].map((y) => Number(y[1]));
  console.log(name, 'x', xs[xs.length - 1], 'y', ys[ys.length - 1]);
}
