import fs from "fs";

const blank = fs.readFileSync("assets/andalusia_blank_map.svg", "utf8");

for (const id of ["path2167", "path2173"]) {
  const m = blank.match(new RegExp(`id="${id}"[^>]*d="([^"]+)"`));
  const nums = m[1].match(/-?\d+\.?\d*/g).map(Number);
  let maxX = -Infinity,
    maxY = -Infinity,
    minX = Infinity,
    minY = Infinity;
  for (const n of nums) {
    if (Math.abs(n) > 500) continue;
  }
  // walk path with simple absolute tracking for M/L/H/V only - rough
  let x = 0,
    y = 0;
  const tokens = m[1].match(/[a-zA-Z]|-?\d*\.?\d+/g);
  let i = 0;
  while (i < tokens.length) {
    const t = tokens[i];
    if (/^[a-zA-Z]$/.test(t)) {
      const cmd = t;
      i++;
      if (cmd === "M" || cmd === "m") {
        const nx = parseFloat(tokens[i++]);
        const ny = parseFloat(tokens[i++]);
        if (cmd === "m") {
          x += nx;
          y += ny;
        } else {
          x = nx;
          y = ny;
        }
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      } else if (cmd === "H" || cmd === "h") {
        const nx = parseFloat(tokens[i++]);
        x = cmd === "h" ? x + nx : nx;
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
      } else if (cmd === "V" || cmd === "v") {
        const ny = parseFloat(tokens[i++]);
        y = cmd === "v" ? y + ny : ny;
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      } else if (cmd === "L" || cmd === "l") {
        const nx = parseFloat(tokens[i++]);
        const ny = parseFloat(tokens[i++]);
        if (cmd === "l") {
          x += nx;
          y += ny;
        } else {
          x = nx;
          y = ny;
        }
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      } else if (cmd === "c" || cmd === "C") {
        const rel = cmd === "c";
        for (let k = 0; k < 3; k++) {
          const nx = parseFloat(tokens[i++]);
          const ny = parseFloat(tokens[i++]);
          const px = rel && k === 2 ? x + nx : nx;
          const py = rel && k === 2 ? y + ny : ny;
          if (k === 2) {
            x = rel ? x + nx : nx;
            y = rel ? y + ny : ny;
          }
          minX = Math.min(minX, px);
          maxX = Math.max(maxX, px);
          minY = Math.min(minY, py);
          maxY = Math.max(maxY, py);
        }
      } else {
        while (i < tokens.length && !/^[a-zA-Z]$/.test(tokens[i])) i++;
      }
    } else i++;
  }
  console.log(id, { minX, minY, maxX, maxY });
}
