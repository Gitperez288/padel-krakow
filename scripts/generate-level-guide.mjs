import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const dependencyRoot = process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES;
const sharp = require(dependencyRoot ? resolve(dependencyRoot, 'sharp') : 'sharp');
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = process.argv[2] || resolve(root, 'src/lib/community.ts');
const logo = process.argv[3] || resolve(root, 'public/dragon-logo.png');
const destination = process.argv[4] || resolve(root, 'public/level-guide');
const sourceText = await readFile(source, 'utf8');
let data;
if (dependencyRoot) {
  const { stripTypeScriptTypes } = await import('node:module');
  const names = [...sourceText.matchAll(/export (?:const|function) (\w+)/g)].map(match => match[1]);
  const code = stripTypeScriptTypes(sourceText).replaceAll('export ', '');
  data = new Function(code + '\nreturn {' + names.join(',') + '};')();
} else {
  const ts = require('typescript');
  const code = ts.transpileModule(sourceText, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  data = {};
  new Function('exports', code)(data);
}
const logoBytes = await sharp(await readFile(logo)).resize(200, 200).png().toBuffer();
const logoUri = `data:image/png;base64,${logoBytes.toString('base64')}`;
const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const palette = { beginner: ['#166534', '#f0f7f1'], intermediate: ['#1e40af', '#f0f4fb'], advanced: ['#9a3412', '#fcf2e9'] };

function wrap(value, maximum) {
  const lines = [''];
  for (const word of value.split(' ')) {
    const last = lines.length - 1;
    if (lines[last] && (lines[last] + ' ' + word).length > maximum) lines.push(word);
    else lines[last] += (lines[last] ? ' ' : '') + word;
  }
  return lines;
}

function artwork(locale, portrait) {
  const pl = locale === 'pl';
  const width = portrait ? 1080 : 1440;
  const height = portrait ? 2020 : 1200;
  const parts = [`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title desc">`, `<title id="title">${pl ? 'Poziomy gry w padla' : 'Padel level guide'}</title>`, `<desc id="desc">${esc(data.skillStages.map(s => s.title[locale] + ': ' + s.letter + ', ' + data.numericLevelRanges[s.letter][locale]).join('; '))}</desc>`, `<rect width="${width}" height="${height}" fill="#fafaf9"/>`, '<g font-family="DejaVu Sans, Arial, sans-serif" fill="#292524">'];
  const text = (value, x, y, size, weight = 400, fill = '#292524') => parts.push(`<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${fill}">${esc(value)}</text>`);
  const rect = (x, y, w, h, fill, stroke = 'none') => parts.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="24" fill="${fill}" stroke="${stroke}"/>`);
  parts.push(`<image href="${logoUri}" x="${portrait ? 56 : 64}" y="48" width="132" height="132"/>`);
  text('PADEL KRAKÓW & MAŁOPOLSKA', portrait ? 216 : 224, 86, portrait ? 29 : 26, 700, '#9a3412');
  text(pl ? 'Poziomy gry w padla' : 'Padel level guide', portrait ? 216 : 224, 145, portrait ? 46 : 52, 700);
  text(pl ? 'Grupy Matchmaking' : 'Matchmaking groups', portrait ? 56 : 64, 230, portrait ? 30 : 24, 700, '#57534e');

  let y = 258;
  data.matchmakingGroups.forEach((group, index) => {
    const stages = data.skillStages.filter(stage => stage.group === group.id);
    const x = portrait ? 56 : 64 + index * 444;
    const w = portrait ? 968 : 424;
    const h = portrait ? (stages.length === 3 ? 480 : 372) : 560;
    const [accent, bg] = palette[group.id];
    rect(x, y, w, h, '#ffffff', '#e7e5e4');
    rect(x + 16, y + 16, w - 32, portrait ? 112 : 142, bg);
    const titleLines = wrap(group.label[locale], portrait ? 48 : 24);
    titleLines.forEach((line, n) => text(line, x + 32, y + 50 + n * (portrait ? 34 : 31), portrait ? 30 : 26, 700, accent));
    text(group.range + ' · ≈' + group.numericRange, x + 32, y + (portrait ? 108 : 128), portrait ? 42 : 32, 700, accent);
    stages.forEach((stage, n) => {
      const row = y + (portrait ? 166 : 206) + n * (portrait ? 104 : 120);
      const lines = wrap(stage.title[locale], portrait ? 49 : 27);
      lines.forEach((line, i) => text(line, x + 32, row + i * (portrait ? 32 : 28), portrait ? 30 : 23, 600));
      const numeric = stage.letter === 'D' ? '<1.0' : '≈' + data.numericLevelRanges[stage.letter][locale];
      text(stage.letter + ' · ' + numeric, x + 32, row + (portrait ? 68 : 66), portrait ? 38 : 31, 700, accent);
    });
    if (portrait) y += h + 22;
  });

  const progressionY = portrait ? 1560 : 860;
  rect(portrait ? 56 : 64, progressionY, portrait ? 968 : 1312, portrait ? 344 : 240, '#ffffff', '#e7e5e4');
  const px = portrait ? 88 : 96;
  text(pl ? 'Od najniższego do najwyższego' : 'Lowest to highest', px, progressionY + 48, portrait ? 30 : 24, 700);
  text(pl ? 'Litery' : 'Letters', px, progressionY + 92, portrait ? 26 : 20, 600, '#78716c');
  const letterLines = portrait ? [data.LEVEL_ORDER.slice(0, 8).join(' → ') + ' →', data.LEVEL_ORDER.slice(8).join(' → ')] : [data.LEVEL_ORDER.join(' → ')];
  letterLines.forEach((line, i) => text(line, px, progressionY + 132 + i * 40, portrait ? 32 : 28, 700));
  const numberY = portrait ? progressionY + 220 : progressionY + 168;
  text(pl ? 'Liczby' : 'Numbers', px, numberY, portrait ? 26 : 20, 600, '#78716c');
  const numericLines = portrait ? [data.numericProgression.slice(0, 4).join(' → ') + ' →', data.numericProgression.slice(4).join(' → ')] : [data.numericProgression.join(' → ')];
  numericLines.forEach((line, i) => text(line, px, numberY + 38 + i * 40, portrait ? 32 : 28, 700));
  text('padel-krakow.vercel.app' + (pl ? '/pl/poziomy' : '/levels'), portrait ? 56 : 64, height - 38, portrait ? 27 : 24, 500, '#57534e');
  parts.push('</g></svg>');
  return parts.join('\n');
}

await mkdir(destination, { recursive: true });
for (const locale of ['en', 'pl']) {
  for (const layout of ['wide', 'portrait']) {
    const svg = artwork(locale, layout === 'portrait');
    const name = `levels-${locale}-${layout}`;
    await writeFile(resolve(destination, name + '.svg'), svg);
    await sharp(Buffer.from(svg)).png().toFile(resolve(destination, name + '.png'));
    console.log(name);
  }
}
