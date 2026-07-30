/**
 * Assets de marca exportados do Figma.
 *
 * Os três arquivos abaixo NÃO puderam ser baixados: o host `www.figma.com`
 * está bloqueado pela política de egresso deste ambiente (403 no CONNECT),
 * então os nós 16:3, 16:20 e 16:34 vieram como URL, não como bytes.
 *
 * Enquanto isso, a página renderiza fallbacks desenhados em SVG/CSS que
 * respeitam a caixa exata de cada asset no design.
 *
 * ┌─ PARA USAR OS ORIGINAIS ────────────────────────────────────────────┐
 * │ 1. Exporte do Figma para a pasta `assets/`:                         │
 * │      16:3   canaltech_white  →  assets/canaltech-white.svg   114×24 │
 * │      16:20  motorola_white   →  assets/motorola-white.svg    103×20 │
 * │      16:34  KV Edge 70       →  assets/kv-edge-70-fusion.png 328×184│
 * │ 2. Troque `enabled` para true abaixo.                               │
 * │ 3. Rode `node build.mjs` para regerar o arquivo único.              │
 * └─────────────────────────────────────────────────────────────────────┘
 *
 * Com `enabled: false` nenhuma requisição é disparada — por isso o protótipo
 * roda sem erro de console e sem rede, inclusive aberto direto do disco.
 */
export const figmaAssets = {
  // Vale só para a versão modular (index.html + servidor local).
  // O build de arquivo único detecta os arquivos sozinho — veja abaixo.
  enabled: false,
  base: 'assets/',
  files: {
    canaltech: 'canaltech-white.svg',
    motorola: 'motorola-white.svg',
    kv: 'kv-edge-70-fusion.png',
  },
};

/**
 * Caminho do asset, ou null quando os originais ainda não estão disponíveis.
 *
 * O `build.mjs` procura os arquivos em `assets/` na hora de gerar o bundle e,
 * se encontrar, embute cada um como data URI em `globalThis.__FIGMA_ASSETS__`.
 * Ou seja: basta exportar os arquivos do Figma e rodar `node build.mjs` — o
 * arquivo único passa a usar os originais, ainda 100% offline e sem editar
 * uma linha de código.
 */
export function assetPath(key) {
  const embedded = globalThis.__FIGMA_ASSETS__?.[key];
  if (embedded) return embedded;

  if (!figmaAssets.enabled) return null;
  return figmaAssets.base + figmaAssets.files[key];
}
