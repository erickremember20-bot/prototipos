#!/usr/bin/env node
/**
 * Gera a versão autocontida (Artifact) de uma página que usa Tailwind via CDN.
 *
 *   node tools/build-artifact.mjs ct-em-campo.html ct-em-campo.artifact.html
 *
 * O que o script faz:
 *   1. Lê o `tailwind.config = {...}` inline do arquivo de origem (fonte única
 *      de verdade dos tokens — nada é duplicado aqui).
 *   2. Compila o CSS do Tailwind com esse config, varrendo o próprio HTML
 *      (inclusive as classes que aparecem dentro das strings do JavaScript).
 *   3. Emite um arquivo sem `<!DOCTYPE>`, `<html>`, `<head>` e `<body>` — o
 *      formato exigido pelo publicador de Artifacts, que injeta esse esqueleto —
 *      com o CSS embutido no lugar da tag <script> do CDN.
 *
 * Requer apenas `npx tailwindcss@3` (baixado sob demanda).
 */
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const [src, dest] = process.argv.slice(2);
if (!src || !dest) {
  console.error('uso: node tools/build-artifact.mjs <origem.html> <destino.html>');
  process.exit(1);
}

const html = readFileSync(src, 'utf8');

/* 1. Extrai o objeto de configuração inline do arquivo de origem. */
const cfgMatch = html.match(/tailwind\.config\s*=\s*(\{[\s\S]*?\n\s*\};)/);
if (!cfgMatch) throw new Error('bloco `tailwind.config = {...}` não encontrado em ' + src);
const config = new Function('return ' + cfgMatch[1].replace(/;$/, ''))();

/* 2. Compila o CSS. */
const work = mkdtempSync(join(tmpdir(), 'tw-'));
try {
  writeFileSync(join(work, 'page.html'), html);
  writeFileSync(join(work, 'in.css'), '@tailwind base;\n@tailwind components;\n@tailwind utilities;\n');
  writeFileSync(
    join(work, 'tw.config.cjs'),
    'module.exports = ' + JSON.stringify({ ...config, content: ['./page.html'] }, null, 2) + ';\n'
  );

  execFileSync(
    'npx',
    ['--yes', 'tailwindcss@3.4.17', '-c', 'tw.config.cjs', '-i', 'in.css', '-o', 'out.css', '--minify'],
    { cwd: work, stdio: ['ignore', 'ignore', 'inherit'] }
  );

  const css = readFileSync(join(work, 'out.css'), 'utf8');

  /* 3. Monta o arquivo do Artifact. */
  const out = html
    /* remove o esqueleto do documento (o publicador injeta o dele) */
    .replace(/<!DOCTYPE html>\s*/i, '')
    .replace(/<html[^>]*>\s*/i, '')
    .replace(/<\/html>\s*$/i, '')
    .replace(/<head>\s*/i, '')
    .replace(/<\/head>\s*/i, '')
    .replace(/<meta charset="UTF-8"[^>]*>\s*/i, '')
    .replace(/<meta name="viewport"[^>]*>\s*/i, '')
    /* o <body> vira uma <div> com as mesmas classes */
    .replace(/<body([^>]*)>/i, '<div$1>')
    .replace(/<\/body>/i, '</div>')
    /* troca o CDN + config runtime pelo CSS compilado */
    .replace(/<script src="https:\/\/cdn\.tailwindcss\.com"><\/script>\s*/, '<style>\n' + css + '\n</style>\n')
    .replace(/<script>\s*\/\* -+\n\s*DESIGN TOKENS[\s\S]*?<\/script>\s*/, '');

  writeFileSync(dest, out);
  console.log(`${dest} — ${(out.length / 1024).toFixed(1)} KB (CSS ${(css.length / 1024).toFixed(1)} KB)`);
} finally {
  rmSync(work, { recursive: true, force: true });
}
