import { h } from '../lib/dom.js';
import { content } from '../data/content.js';
import { assetPath } from '../data/assets.js';

/**
 * Logos e key visual.
 *
 * O host `www.figma.com` está bloqueado pela política de egresso deste
 * ambiente, então os exports reais (16:3 canaltech_white, 16:20
 * motorola_white e 16:34 KV — Edge 70 Fusion+) não puderam ser baixados.
 *
 * Cada marca é renderizada com um fallback desenhado em SVG/CSS na caixa
 * exata do design. Quando `src/js/data/assets.js` for ligado, um <img> passa
 * a ser inserido e assume o lugar do fallback assim que carrega — sem
 * mudança nenhuma no resto do código.
 */
function withFallback({ className, width, height, assetKey, fallback, alt }) {
  const wrapper = h(
    'span',
    {
      class: className,
      style: { width: `${width}px`, height: `${height}px` },
      role: 'img',
      'aria-label': alt,
    },
    fallback,
  );

  const src = assetPath(assetKey);
  if (src) {
    const img = h('img', { class: 'brand__img', src, alt, hidden: true });
    img.addEventListener('load', () => {
      img.hidden = false;
      fallback.hidden = true;
    });
    wrapper.append(img);
  }

  return wrapper;
}

/** Logo Canaltech — 114.286 × 24 (nó 16:3). */
export function createCanaltechLogo() {
  const { width, height } = content.brand.canaltech;

  const fallback = h('span', {
    class: 'logo-fallback',
    html: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 114.286 24" width="${width}" height="${height}" aria-hidden="true">
        <rect x="0" y="1" width="22" height="22" rx="7" fill="#1b7ced"/>
        <path d="M6.4 8.6h9.2M11 8.6v8.2" stroke="#fff" stroke-width="2.4" stroke-linecap="round" fill="none"/>
        <text x="27" y="18" font-family="Barlow, sans-serif" font-size="17.5" font-weight="700" fill="#fff">Canaltech</text>
      </svg>`,
  });

  return withFallback({
    className: 'brand brand--canaltech',
    width,
    height,
    assetKey: 'canaltech',
    alt: 'Canaltech',
    fallback,
  });
}

/** Logo Motorola — 102.564 × 20 (nó 16:20). */
export function createMotorolaLogo() {
  const { width, height } = content.brand.motorola;

  const fallback = h('span', {
    class: 'logo-fallback',
    html: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 102.564 20" width="${width}" height="${height}" aria-hidden="true">
        <circle cx="10" cy="10" r="9.2" fill="none" stroke="#fff" stroke-width="1.5"/>
        <path d="M4.9 15.2V5.4l5.1 5.1 5.1-5.1v9.8h-2V9.9l-3.1 3.1-3.1-3.1v5.3Z" fill="#fff"/>
        <text x="24" y="15.6" font-family="Barlow, sans-serif" font-size="15.5" font-weight="600" fill="#fff" letter-spacing="-0.2">motorola</text>
      </svg>`,
  });

  return withFallback({
    className: 'brand brand--motorola',
    width,
    height,
    assetKey: 'motorola',
    alt: 'Motorola',
    fallback,
  });
}

/** Key visual do Edge 70 Fusion+ — 328 × 184, raio 12 (nó 16:34). */
export function createKeyVisual() {
  const { kvTitle, kvSubtitle, kvBadge } = content.hero;

  const fallback = h(
    'div',
    { class: 'kv__fallback' },
    h(
      'div',
      {},
      h('p', { class: 'kv__title' }, kvTitle),
      h('p', { class: 'kv__sub' }, kvSubtitle),
    ),
    h('span', { class: 'kv__badge' }, kvBadge),
  );

  const kv = h('div', { class: 'kv' }, fallback);

  const src = assetPath('kv');
  if (src) {
    const img = h('img', {
      class: 'kv__img',
      src,
      alt: 'Motorola Edge 70 Fusion+ — Edição Copa do Mundo',
      hidden: true,
    });
    img.addEventListener('load', () => {
      img.hidden = false;
      fallback.hidden = true;
    });
    kv.append(img);
  }

  return kv;
}
