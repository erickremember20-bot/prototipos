import { h, svgNode } from '../lib/dom.js';
import { icons } from '../icons.js';

/**
 * Base compartilhada pelos modais 02 (Regras) e 03 (Sucesso).
 *
 * Cuida do overlay com dim + blur, do fechamento por ESC / clique fora,
 * do bloqueio de scroll do body e da devolução do foco ao elemento que
 * abriu o modal.
 */
export function createModal({ panelClass, labelledBy, onClose }) {
  const panel = h('div', {
    class: `overlay__panel ${panelClass}`,
    role: 'dialog',
    'aria-modal': 'true',
    'aria-labelledby': labelledBy,
  });

  const overlay = h('div', { class: 'overlay', hidden: true }, panel);

  let lastFocused = null;

  // Clique no backdrop (fora do painel) fecha.
  overlay.addEventListener('mousedown', (event) => {
    if (event.target === overlay) close();
  });

  const onKeydown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
      return;
    }

    // Mantém o foco preso dentro do modal enquanto ele estiver aberto.
    if (event.key === 'Tab') {
      const focusables = panel.querySelectorAll(
        'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  };

  function open() {
    if (overlay.classList.contains('is-open')) return;

    lastFocused = document.activeElement;
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeydown);

    // Dois frames para o browser aplicar o estado inicial antes de animar.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => overlay.classList.add('is-open'));
    });

    panel.querySelector('.modal__close')?.focus();
  }

  function close() {
    if (!overlay.classList.contains('is-open')) return;

    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKeydown);

    const finish = () => {
      overlay.hidden = true;
      lastFocused?.focus?.();
      onClose?.();
    };

    // Espera a transição de opacidade terminar antes de esconder de fato.
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced) finish();
    else setTimeout(finish, 200);
  }

  return { el: overlay, panel, open, close };
}

/** Barra superior com o botão X, comum às duas telas de modal. */
export function createTopBar(onClose, label = 'Fechar') {
  return h(
    'div',
    { class: 'modal__topbar' },
    h(
      'button',
      { class: 'modal__close', type: 'button', 'aria-label': label, onClick: onClose },
      svgNode(icons.close(24)),
    ),
  );
}
