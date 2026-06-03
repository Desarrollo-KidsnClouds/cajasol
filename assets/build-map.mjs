import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const dir = dirname(fileURLToPath(import.meta.url));
const TX = 614.28621;
const TY = 149.27033;

const blank = fs.readFileSync(join(dir, 'andalusia_blank_map.svg'), 'utf8');
const west = fs.readFileSync(join(dir, 'west-east.svg'), 'utf8');

const provinceNames = ['Huelva', 'Sevilla', 'Cádiz', 'Córdoba', 'Jaén', 'Málaga', 'Granada', 'Almería'];
const slug = {
  Huelva: 'huelva',
  Sevilla: 'sevilla',
  'Cádiz': 'cadiz',
  'Córdoba': 'cordoba',
  'Jaén': 'jaen',
  'Málaga': 'malaga',
  Granada: 'granada',
  'Almería': 'almeria',
};

const labels = Object.fromEntries(
  provinceNames.map((name) => {
    const re = new RegExp(`<text([\\s\\S]*?)<tspan[\\s\\S]*?>${name}<\\/tspan>`, 'i');
    const m = west.match(re);
    const block = m[0];
    const xs = [...block.matchAll(/\bx="([^"]+)"/g)].map((x) => Number(x[1]));
    const ys = [...block.matchAll(/\by="([^"]+)"/g)].map((y) => Number(y[1]));
    return [slug[name], { name, lx: xs.at(-1), ly: ys.at(-1) }];
  })
);

// Path ids from Wikimedia «Andalusia blank map» matched to province labels (west-east.svg)
const pathToProvince = {
  path4153: 'huelva',
  path2194: 'sevilla',
  path4144: 'cadiz',
  path2178: 'jaen',
  path2362: 'cordoba',
  path2173: 'granada',
  path2168: 'malaga',
  path2167: 'almeria',
};

const centros = {
  huelva: 0,
  sevilla: 6,
  cadiz: 3,
  cordoba: 2,
  jaen: 0,
  malaga: 4,
  granada: 0,
  almeria: 0,
};

const paths = [...blank.matchAll(/<path[^>]*id="(path[^"]+)"[^>]*d="([^"]+)"[^>]*style="([^"]+)"/g)]
  .filter((m) => m[3].includes('fill:#') && !m[3].includes('fill:none'))
  .map((m) => ({ id: m[1], d: m[2], prov: pathToProvince[m[1]] }))
  .filter((p) => p.prov);

const byProv = new Map();
for (const p of paths) {
  const cur = byProv.get(p.prov);
  if (!cur || p.d.length > cur.d.length) byProv.set(p.prov, p);
}

// Almería antes que Granada: la silueta de Granada (path2173) queda encima en la zona solapada
const order = ['huelva', 'sevilla', 'cadiz', 'cordoba', 'jaen', 'malaga', 'almeria', 'granada'];
let out = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 963.58722 560.20435" class="andalusia-svg" role="img" aria-label="Silueta de Andalucía con centros activos por provincia">
`;

for (const prov of order) {
  const item = byProv.get(prov);
  const label = labels[prov];
  if (!item || !label) {
    console.warn('Missing:', prov);
    continue;
  }
  const n = centros[prov];
  const cls = n > 0 ? 'has-active' : 'no-active';
  out += `  <g class="province province-${prov} ${cls}" data-centros="${n}" transform="translate(${TX},${TY})">\n`;
  out += `    <path d="${item.d}"></path>\n`;
  out += `    <text class="province-label" x="${label.lx}" y="${label.ly - 4}">${label.name}</text>\n`;
  if (n > 0) out += `    <text class="province-count" x="${label.lx}" y="${label.ly + 12}">${n}</text>\n`;
  out += `    <foreignObject class="province-tip" x="${label.lx - 100}" y="${label.ly - 48}" width="220" height="40"><div xmlns="http://www.w3.org/1999/xhtml">${label.name}: ${n} centros activos</div></foreignObject>\n`;
  out += `  </g>\n`;
}

out += `</svg>\n`;
fs.writeFileSync(join(dir, 'andalusia-interactive.svg'), out);
console.log('OK:', byProv.size, 'provinces -> andalusia-interactive.svg');
