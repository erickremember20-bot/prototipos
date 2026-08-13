#!/usr/bin/env node
/**
 * Gera as versões autocontidas da landing CT OFERTAS.
 *
 *   node tools/build-standalone.mjs
 *
 * Lê `ct-em-campo.html` e embute tudo que hoje é referência relativa:
 *   - as folhas <link> (assets/fonts.css, assets/icons.css)
 *   - as imagens <img src="assets/…"> como data URI
 *   - qualquer url(assets/…) que ainda reste no CSS
 *
 * Emite dois arquivos:
 *   ct-em-campo.standalone.html  documento completo, abre com dois cliques
 *   ct-em-campo.artifact.html    sem <!DOCTYPE>/<html>/<head>/<body>, formato
 *                                que o publicador de Artifacts espera
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';

const SRC = 'ct-em-campo.html';
const MIME = {
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
  '.svg': 'image/svg+xml', '.webp': 'image/webp',
};

let html = readFileSync(SRC, 'utf8');

const dataUri = (rel) => {
  if (!existsSync(rel)) throw new Error('asset não encontrado: ' + rel);
  const ext = rel.slice(rel.lastIndexOf('.')).toLowerCase();
  const mime = MIME[ext] || 'application/octet-stream';
  return `data:${mime};base64,${readFileSync(rel).toString('base64')}`;
};

/* 1. folhas de estilo externas viram <style> inline */
html = html.replace(/<link rel="stylesheet" href="(assets\/[^"]+)"\s*\/?>/g, (_, href) =>
  '<style>\n' + readFileSync(href, 'utf8').trim() + '\n</style>');

/* 2. <img src="assets/…"> vira data URI */
html = html.replace(/src="(assets\/[^"]+)"/g, (_, rel) => `src="${dataUri(rel)}"`);

/* 3. url(assets/…) remanescente no CSS */
html = html.replace(/url\((assets\/[^)"']+)\)/g, (_, rel) => `url(${dataUri(rel)})`);

/* 4. imagens montadas em JavaScript (thumbs da galeria) */
html = html.replace(/'(assets\/[^']+\.(?:jpg|png|webp|svg))'/g, (_, rel) => `'${dataUri(rel)}'`);

const restantes = html.match(/assets\//g);
if (restantes) throw new Error('sobraram ' + restantes.length + ' referências a assets/');

writeFileSync('ct-em-campo.standalone.html', html);
console.log('ct-em-campo.standalone.html —', (html.length / 1024 / 1024).toFixed(2), 'MB');

/* versão do publicador de Artifacts: sem esqueleto de documento */
const artifact = html
  .replace(/<!DOCTYPE html>\s*/i, '')
  .replace(/<html[^>]*>\s*/i, '')
  .replace(/<\/html>\s*$/i, '')
  .replace(/<head>\s*/i, '')
  .replace(/<\/head>\s*/i, '')
  .replace(/<meta charset="UTF-8"[^>]*>\s*/i, '')
  .replace(/<meta name="viewport"[^>]*>\s*/i, '')
  .replace(/<body([^>]*)>/i, '<div$1>')
  .replace(/<\/body>/i, '</div>');

writeFileSync('ct-em-campo.artifact.html', artifact);
console.log('ct-em-campo.artifact.html —', (artifact.length / 1024 / 1024).toFixed(2), 'MB');
