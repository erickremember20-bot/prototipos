/**
 * Ícones — família Phosphor usada no Figma (nós 15:3 … 15:17, 32:2).
 *
 * IMPORTANTE: o host `www.figma.com` está bloqueado pela política de egresso
 * deste ambiente, então os SVGs exportados não puderam ser baixados. Os
 * glifos abaixo foram redesenhados à mão reproduzindo o traço Phosphor e,
 * sobretudo, a GEOMETRIA do design: cada ícone é renderizado na caixa externa
 * definida no Figma e o `viewBox` respeita a proporção da caixa interna
 * (o "leaf") medida pelos insets de cada nó.
 *
 * Caixa externa × leaf, conforme o Figma:
 *   user-check    36 × 27.15  (inset 12.29% vertical)
 *   envelope      36 × 28.29  (inset 10.71%)
 *   trophy        24 × 19.50  (inset 9.38%)
 *   alert         20 × 17.93  (inset 5.17%)
 *   link          18 × 15.52  (inset 6.90%)
 *   check-double  20 × 9.17   (inset 27.08%)
 *   chevron-right 24 × 24, vetor interno 8 × 16
 *   copy / close / check      caixa cheia
 */

const NS = 'xmlns="http://www.w3.org/2000/svg"';

/** Traço padrão Phosphor: pontas e junções arredondadas, sem preenchimento. */
const STROKE = 'fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"';

export const icons = {
  /** Pessoa + check — passo "Cadastre-se". Glifo sólido, leaf 75.4% da caixa. */
  userCheck: (size = 36) => `
    <svg ${NS} width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="9" cy="7.6" r="4.6"/>
      <path d="M9 14.1c-4.1 0-7.6 2.7-8.2 6.3a1 1 0 0 0 1 1.2h11.7a1 1 0 0 0 .85-1.55A7.9 7.9 0 0 1 13.5 16a9 9 0 0 0-4.5-1.9Z"/>
      <path d="M23.05 13.35a1.05 1.05 0 0 0-1.5 0L17.6 17.3l-1.6-1.6a1.05 1.05 0 1 0-1.5 1.5l2.35 2.35a1.05 1.05 0 0 0 1.5 0l4.7-4.7a1.05 1.05 0 0 0 0-1.5Z"/>
    </svg>`,

  /** Envelope sólido — passo "Ganhe o Cupom". Leaf 78.6% da caixa. */
  envelope: (size = 36) => `
    <svg ${NS} width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23 5.6V19a2.2 2.2 0 0 1-2.2 2.2H3.2A2.2 2.2 0 0 1 1 19V5.6l10.45 6.27a1.05 1.05 0 0 0 1.1 0L23 5.6Z"/>
      <path d="M22.55 3.5 12 9.83 1.45 3.5a2.2 2.2 0 0 1 1.75-.7h17.6a2.2 2.2 0 0 1 1.75.7Z"/>
    </svg>`,

  /** Troféu sólido — passo "Concorra" e número da sorte. Leaf 81.2%. */
  trophy: (size = 24) => `
    <svg ${NS} width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 3.05V2.6a.6.6 0 0 0-.6-.6H6.6a.6.6 0 0 0-.6.6v.45H3.05A1.05 1.05 0 0 0 2 4.1v1.95a5.05 5.05 0 0 0 4.35 5A6.05 6.05 0 0 0 11 14.4v3.55H9.4a1.05 1.05 0 0 0-1.05 1.05v.6h7.3v-.6A1.05 1.05 0 0 0 14.6 18H13v-3.6a6.05 6.05 0 0 0 4.65-3.35 5.05 5.05 0 0 0 4.35-5V4.1a1.05 1.05 0 0 0-1.05-1.05H18ZM4.1 6.05v-.9H6v3.6a3.05 3.05 0 0 1-1.9-2.7Zm15.8 0a3.05 3.05 0 0 1-1.9 2.7v-3.6h1.9v.9Z"/>
      <rect x="6.4" y="20.05" width="11.2" height="1.95" rx=".9"/>
    </svg>`,

  /** Triângulo de alerta — estado Error do input. Leaf 89.7% da caixa. */
  alert: (size = 20) => `
    <svg ${NS} width="${size}" height="${size}" viewBox="0 0 24 21.5" aria-hidden="true">
      <path d="M12 1.55 23.05 20.4H.95L12 1.55Z" ${STROKE} stroke-width="1.9"/>
      <path d="M12 8.2v4.7" ${STROKE} stroke-width="1.9"/>
      <circle cx="12" cy="16.6" r="1.15" fill="currentColor"/>
    </svg>`,

  /** Duas folhas sobrepostas — "copiar código". Caixa cheia. */
  copy: (size = 20) => `
    <svg ${NS} width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="7.6" y="7.6" width="13.4" height="13.4" rx="2.6" ${STROKE} stroke-width="2"/>
      <path d="M16.4 7.6V5.1A2.6 2.6 0 0 0 13.8 2.5H5.6A2.6 2.6 0 0 0 3 5.1v8.2a2.6 2.6 0 0 0 2.6 2.6h2.5" ${STROKE} stroke-width="2"/>
    </svg>`,

  /** Check duplo — confirmação de cópia. Leaf achatado, 45.8% da caixa. */
  checkDouble: (size = 20) => `
    <svg ${NS} width="${size}" height="${size}" viewBox="0 0 24 11" aria-hidden="true">
      <path d="M1.1 6.05 4.5 9.55 10.9 1.65" ${STROKE} stroke-width="2.2"/>
      <path d="M12.7 6.05 16.1 9.55 22.5 1.65" ${STROKE} stroke-width="2.2"/>
    </svg>`,

  /** Elo de corrente — CTA "Regulamento em PDF". Leaf 86.2% da caixa. */
  link: (size = 18) => `
    <svg ${NS} width="${size}" height="${size}" viewBox="0 0 24 20.7" aria-hidden="true">
      <path d="M9.55 13.15a4.65 4.65 0 0 0 7.01.5l3.2-3.2a4.65 4.65 0 0 0-6.58-6.57l-1.83 1.82" ${STROKE} stroke-width="2"/>
      <path d="M14.45 9.65a4.65 4.65 0 0 0-7.01-.5l-3.2 3.2a4.65 4.65 0 0 0 6.58 6.57l1.83-1.82" ${STROKE} stroke-width="2"/>
    </svg>`,

  /** Chevron — CTA "Resgatar desconto". Vetor de 8 × 16 dentro da caixa 24. */
  chevronRight: (size = 24) => `
    <svg ${NS} width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 4 17 12 9 20" ${STROKE} stroke-width="2.5"/>
    </svg>`,

  /** X — separador de co-branding no header e botão de fechar dos modais. */
  close: (size = 24, weight = 2.4) => `
    <svg ${NS} width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4.4 4.4 19.6 19.6M19.6 4.4 4.4 19.6" ${STROKE} stroke-width="${weight}"/>
    </svg>`,

  /** Check do checkbox — desenhado sobre o box verde neon. */
  check: (size = 12) => `
    <svg ${NS} width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12.6 9.8 17.4 19 5.6" ${STROKE} stroke-width="3.4"/>
    </svg>`,
};
