/**
 * Build de arquivo único.
 *
 * Concatena CSS e os módulos ES em um HTML autocontido que roda direto do
 * disco (file://) e sob CSP restritiva — sem CDN, sem fontes remotas, sem
 * requisições externas. Uso: `node build.mjs`
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const read = (file) => readFileSync(resolve(root, file), 'utf8');

const STYLES = [
  'src/styles/fonts.css',
  'src/styles/tokens.css',
  'src/styles/base.css',
  'src/styles/components.css',
];

// Ordem de dependência — os módulos são concatenados dentro de um único IIFE.
const MODULES = [
  'src/js/lib/dom.js',
  'src/js/lib/mask.js',
  'src/js/lib/validators.js',
  'src/js/data/content.js',
  'src/js/data/assets.js',
  'src/js/icons.js',
  'src/js/components/Button.js',
  'src/js/components/Input.js',
  'src/js/components/Checkbox.js',
  'src/js/components/Brand.js',
  'src/js/components/Modal.js',
  'src/js/components/ModalRules.js',
  'src/js/components/ModalSuccess.js',
  'src/js/components/Form.js',
  'src/js/app.js',
];

/** Remove import/export para que os módulos compartilhem um escopo só. */
function flatten(source, file) {
  const stripped = source
    .replace(/^\s*import[\s\S]*?from\s*['"][^'"]+['"];?\s*$/gm, '')
    .replace(/^\s*export\s+(?=(const|let|var|function|class|async))/gm, '')
    .replace(/^\s*export\s*\{[^}]*\};?\s*$/gm, '');

  return `/* ---- ${file} ---- */\n${stripped.trim()}\n`;
}

/**
 * Assets de marca exportados do Figma.
 *
 * Se os arquivos existirem em `assets/`, cada um é embutido no bundle como
 * data URI — o arquivo único continua offline e passa a usar os originais
 * automaticamente, sem editar código. Se não existirem, a página usa os
 * fallbacks em SVG/CSS e não dispara requisição nenhuma.
 */
const ASSETS = {
  canaltech: { file: 'assets/canaltech-white.svg', mime: 'image/svg+xml' },
  motorola: { file: 'assets/motorola-white.svg', mime: 'image/svg+xml' },
  kv: { file: 'assets/kv-edge-70-fusion.jpg', mime: 'image/jpeg' },
};

const embedded = {};
for (const [key, { file, mime }] of Object.entries(ASSETS)) {
  const path = resolve(root, file);
  if (!existsSync(path)) continue;
  embedded[key] = `data:${mime};base64,${readFileSync(path).toString('base64')}`;
  console.log(`  · asset embutido: ${file}`);
}

const found = Object.keys(embedded);
console.log(
  found.length
    ? `  ${found.length}/3 assets do Figma embutidos (${found.join(', ')})`
    : '  nenhum asset em assets/ — usando os fallbacks em SVG/CSS',
);

const assetsGlobal =
  `globalThis.__FIGMA_ASSETS__ = ${JSON.stringify(embedded)};\n` +
  'globalThis.__FIGMA_ASSETS_EMBEDDED_ONLY__ = true;';

const css = STYLES.map((file) => `/* ==== ${file} ==== */\n${read(file)}`).join('\n');
const js = `${assetsGlobal}\n\n${MODULES.map((file) => flatten(read(file), file)).join('\n')}`;

const html = `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <meta name="theme-color" content="#080808" />
    <meta
      name="description"
      content="Motorola x Canaltech — Edição Copa do Mundo. Garanta 20% OFF e concorra a 1 Motorola Edge 70 Fusion+."
    />
    <title>Motorola x Canaltech — Edição Copa do Mundo</title>
    <!--
      Protótipo interativo — arquivo único, autocontido (fonte Barlow embutida).
      Gerado por build.mjs a partir de src/. Não edite este arquivo à mão.

      Figma: otFCFq9vy3mUvwLcb11hwf — 12:43 Form · 12:44 Regras · 12:45 Sucesso
    -->
    <style>
${css}
    </style>
  </head>
  <body>
    <div id="app"></div>
    <script>
(function () {
  'use strict';
${js}
})();
    </script>
  </body>
</html>
`;

mkdirSync(resolve(root, 'dist'), { recursive: true });
const out = resolve(root, 'dist/motorola-copa-landing-page.html');
writeFileSync(out, html, 'utf8');

/**
 * Variante para publicação como Artifact: mesmo conteúdo, mas sem
 * <html>/<head>/<body> — esse envelope é fornecido no momento do deploy.
 */
const fragment = `<title>Motorola x Canaltech — Edição Copa do Mundo</title>
<style>
${css}
</style>
<div id="app"></div>
<script>
(function () {
  'use strict';
${js}
})();
</script>
`;

const outFragment = resolve(root, 'dist/artifact.html');
writeFileSync(outFragment, fragment, 'utf8');

console.log(`✓ ${out} — ${(Buffer.byteLength(html) / 1024).toFixed(1)} KB`);
console.log(`✓ ${outFragment} — ${(Buffer.byteLength(fragment) / 1024).toFixed(1)} KB`);
