import { h } from '../lib/dom.js';
import { content } from '../data/content.js';
import { createModal, createTopBar } from './Modal.js';
import { createButton } from './Button.js';

/**
 * Screen 02 — Regras da Promoção (12:44)
 *
 * Abre pelo link "Consulte o regulamento completo." do rodapé da tela 01.
 * Fecha pelo X, por ESC ou por clique fora. O CTA abre o PDF em nova aba.
 */
export function createModalRules() {
  const { rules } = content;

  const modal = createModal({ panelClass: 'rules', labelledBy: 'rules-title' });

  const pdfButton = createButton({
    type: 'purple',
    label: rules.cta,
    icon: 'link',
    iconSize: 18,
    // noopener/noreferrer: o destino não ganha acesso a window.opener.
    onClick: () => window.open(rules.pdfUrl, '_blank', 'noopener,noreferrer'),
  });

  modal.panel.append(
    createTopBar(modal.close, 'Fechar as regras da promoção'),

    h(
      'div',
      { class: 'rules__header' },
      h('h2', { class: 'rules__title t-h1', id: 'rules-title' }, rules.title),
      h('p', { class: 'rules__subtitle t-body' }, rules.subtitle),
    ),

    h('div', { class: 'rules__divider' }),

    h(
      'div',
      { class: 'rules__list' },
      rules.items.map((item) =>
        h(
          'div',
          { class: 'rule' },
          h('h3', { class: 'rule__title t-h3' }, item.title),
          h('p', { class: 'rule__body t-body' }, item.body),
        ),
      ),
    ),

    pdfButton.el,
  );

  return modal;
}
