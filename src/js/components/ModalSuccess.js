import { h, svgNode } from '../lib/dom.js';
import { icons } from '../icons.js';
import { content } from '../data/content.js';
import { createModal, createTopBar } from './Modal.js';
import { createButton } from './Button.js';

/**
 * Copia texto para a área de transferência.
 *
 * `navigator.clipboard` só existe em contexto seguro — como este protótipo
 * também roda aberto direto do disco (file://), há um fallback com textarea
 * temporária + execCommand para o arquivo baixado continuar funcionando.
 */
async function copyToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      /* cai no fallback abaixo */
    }
  }

  try {
    const helper = document.createElement('textarea');
    helper.value = text;
    helper.setAttribute('readonly', '');
    helper.style.cssText = 'position:fixed;top:-1000px;opacity:0;';
    document.body.append(helper);
    helper.select();
    const ok = document.execCommand('copy');
    helper.remove();
    return ok;
  } catch {
    return false;
  }
}

/**
 * Screen 03 — Sucesso / Voucher (12:45)
 *
 * Disparado após o envio válido do formulário. Traz o cupom copiável
 * (cmp / coupon-tag) e o número da sorte (cmp / voucher-card).
 */
export function createModalSuccess({ onClose }) {
  const { success } = content;

  const modal = createModal({
    panelClass: 'success',
    labelledBy: 'success-title',
    onClose,
  });

  // ---- Card do cupom (19:36) — tag copiável -------------------------------
  const couponIcon = h('span', { class: 'coupon__icon' }, svgNode(icons.copy(20)));
  const couponHelper = h('p', { class: 'voucher__helper t-body' }, success.couponHelper);

  const couponTag = h(
    'button',
    {
      class: 'coupon',
      type: 'button',
      'aria-label': `Copiar o código ${success.couponCode}`,
    },
    h('span', { class: 'coupon__code' }, success.couponCode),
    couponIcon,
  );

  let resetTimer = null;

  couponTag.addEventListener('click', async () => {
    const copied = await copyToClipboard(success.couponCode);
    if (!copied) return;

    // Estado "Pressed" do cmp / coupon-tag: ícone vira check duplo.
    couponTag.classList.add('is-copied');
    couponIcon.replaceChildren(svgNode(icons.checkDouble(20)));
    couponHelper.textContent = success.couponHelperCopied;
    couponHelper.classList.add('is-copied');

    clearTimeout(resetTimer);
    resetTimer = setTimeout(resetCoupon, 2500);
  });

  function resetCoupon() {
    clearTimeout(resetTimer);
    couponTag.classList.remove('is-copied');
    couponIcon.replaceChildren(svgNode(icons.copy(20)));
    couponHelper.textContent = success.couponHelper;
    couponHelper.classList.remove('is-copied');
  }

  const couponCard = h(
    'div',
    { class: 'voucher voucher--cupom' },
    h('span', { class: 'voucher__badge' }, success.couponBadge),
    couponTag,
    couponHelper,
  );

  // ---- Card do número da sorte (19:44) ------------------------------------
  const luckyCard = h(
    'div',
    { class: 'voucher voucher--sorte' },
    h('span', {
      class: 'voucher__badge',
      html: `${success.luckyBadge} <em>${success.luckyBadgeAccent}</em>`,
    }),
    h(
      'div',
      { class: 'voucher__value' },
      h('p', { class: 'voucher__number' }, success.luckyNumber),
      h('span', { class: 'voucher__trophy' }, svgNode(icons.trophy(30))),
    ),
    h('p', { class: 'voucher__helper t-body' }, success.luckyHelper),
  );

  // ---- CTA de resgate (19:52) ---------------------------------------------
  const redeemButton = createButton({
    type: 'glow',
    label: success.cta,
    icon: 'chevronRight',
    iconSize: 24,
    onClick: () => window.open(success.ctaUrl, '_blank', 'noopener,noreferrer'),
  });

  modal.panel.append(
    h(
      'div',
      { class: 'success__content' },
      createTopBar(modal.close, 'Fechar e voltar ao formulário'),
      h(
        'div',
        { class: 'success__title' },
        h('p', { class: 'success__eyebrow t-h1' }, success.eyebrow),
        h('h2', { class: 'success__headline t-h1', id: 'success-title' }, success.headline),
        h('p', { class: 'success__support t-small' }, success.support),
      ),
      couponCard,
      luckyCard,
      redeemButton.el,
      h('p', { class: 'success__info t-body' }, success.info),
    ),
    h(
      'div',
      { class: 'success__footer' },
      h('p', { class: 't-body' }, success.footer),
    ),
  );

  return {
    ...modal,
    open() {
      resetCoupon();
      modal.open();
    },
  };
}
