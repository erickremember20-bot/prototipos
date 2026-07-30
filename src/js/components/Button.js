import { h, svgNode } from '../lib/dom.js';
import { icons } from '../icons.js';

/**
 * cmp / button (33:108)
 *
 * type: 'primary' (Primary Neon)  — ação principal
 *       'glow'    (Secondary Glow) — ação de resgate
 *       'purple'  (Tertiary Purple) — ação secundária / link externo
 *
 * Os estados Default / Pressed / Disabled do Figma são cobertos por CSS
 * (`:active` e `:disabled`); aqui expomos só o estado de loading do submit.
 */
export function createButton({ type = 'primary', label, icon, iconSize, onClick, disabled = false, attrs = {} }) {
  const labelNode = h('span', { class: 'btn__label' }, label);

  const button = h(
    'button',
    {
      class: `btn btn--${type}`,
      type: 'button',
      'aria-disabled': disabled ? 'true' : 'false',
      ...attrs,
      onClick: onClick || undefined,
    },
    labelNode,
    icon ? svgNode(icons[icon](iconSize)) : null,
  );

  return {
    el: button,

    /**
     * Usa `aria-disabled` em vez do atributo `disabled`.
     *
     * Um botão nativamente desabilitado não emite clique nenhum — e o design
     * pede justamente que a tentativa de envio com dados incompletos acenda o
     * estado Error dos campos. Com `aria-disabled` o CTA continua com a
     * aparência inativa (verde-oliva opaco) e anunciado como desabilitado para
     * leitores de tela, mas ainda entrega o clique que dispara o feedback.
     */
    setDisabled(value) {
      button.setAttribute('aria-disabled', value ? 'true' : 'false');
    },

    /** Troca o rótulo por um spinner enquanto o envio é simulado. */
    setLoading(loading, loadingLabel) {
      if (loading) {
        // Aqui o bloqueio é real: nada de reenviar durante o envio.
        button.disabled = true;
        button.dataset.loading = 'true';
        labelNode.textContent = loadingLabel || label;
        if (!button.querySelector('.btn__spinner')) {
          button.append(h('span', { class: 'btn__spinner' }));
        }
      } else {
        delete button.dataset.loading;
        labelNode.textContent = label;
        button.querySelector('.btn__spinner')?.remove();
      }
    },
  };
}
