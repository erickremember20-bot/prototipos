import { h, svgNode } from '../lib/dom.js';
import { icons } from '../icons.js';

/**
 * cmp / checkbox (34:23)
 *
 * Checked=False → box com borda grey-300 e label grey-100
 * Checked=True  → box verde neon preenchido + label verde neon
 *
 * Usa um <input type="checkbox"> nativo escondido para manter teclado,
 * leitores de tela e o estado do formulário funcionando de graça.
 */
export function createCheckbox({ name, label, required = false, onChange }) {
  const native = h('input', {
    class: 'checkbox__native',
    type: 'checkbox',
    id: `check-${name}`,
    name,
    required,
  });

  const box = h('span', { class: 'checkbox__box' }, svgNode(icons.check(12)));
  const text = h('span', { class: 'checkbox__label' }, label);

  const wrapper = h('label', { class: 'checkbox', for: `check-${name}` }, native, box, text);

  native.addEventListener('change', () => {
    if (native.checked) wrapper.classList.remove('is-error');
    onChange?.(native.checked);
  });

  return {
    el: wrapper,
    name,

    get checked() {
      return native.checked;
    },

    /** Consentimento obrigatório não aceito → destaque em vermelho. */
    setError(value) {
      wrapper.classList.toggle('is-error', Boolean(value));
    },

    reset() {
      native.checked = false;
      wrapper.classList.remove('is-error');
    },
  };
}
