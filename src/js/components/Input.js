import { h, svgNode } from '../lib/dom.js';
import { icons } from '../icons.js';
import { applyCPFMask } from '../lib/mask.js';

/**
 * cmp / input-field (35:33)
 *
 * Estados do Figma mapeados em classes:
 *   Default  → (nenhuma)      borda grey-400, placeholder
 *   Focused  → .is-focused    borda roxa + glow + chip de label
 *   Filled   → .is-filled     borda grey-300 + chip de label
 *   Error    → .is-error      borda vermelha, ícone de alerta e mensagem
 *
 * O erro só aparece depois da primeira tentativa de envio ou do blur de um
 * campo já "sujo" — validar a cada tecla puniria quem ainda está digitando.
 */
export function createInput({ name, label, placeholder, type = 'text', autocomplete, inputmode, maxlength, validate, errorMessage, onInput }) {
  const input = h('input', {
    class: 'field__input',
    id: `field-${name}`,
    name,
    type,
    placeholder,
    autocomplete: autocomplete || 'off',
    inputmode: inputmode || undefined,
    maxlength: maxlength || undefined,
    'aria-describedby': `helper-${name}`,
  });

  const helper = h('p', { class: 'field__helper', id: `helper-${name}`, role: 'alert' }, errorMessage);

  const field = h(
    'div',
    { class: 'field' },
    h(
      'div',
      { class: 'field__box' },
      input,
      h('label', { class: 'field__label', for: `field-${name}` }, label),
      h('span', { class: 'field__alert' }, svgNode(icons.alert(20))),
    ),
    helper,
  );

  let touched = false;
  let showError = false;

  const isValid = () => (validate ? validate(input.value) : true);

  const syncFilled = () => {
    field.classList.toggle('is-filled', input.value.trim().length > 0);
  };

  const render = () => {
    syncFilled();
    field.classList.toggle('is-error', showError);
    input.setAttribute('aria-invalid', showError ? 'true' : 'false');
  };

  input.addEventListener('focus', () => {
    field.classList.add('is-focused');
  });

  input.addEventListener('blur', () => {
    field.classList.remove('is-focused');
    // Só acusa erro no blur se o usuário já tiver digitado algo no campo.
    if (touched && input.value.trim().length > 0) {
      showError = !isValid();
    }
    render();
  });

  input.addEventListener('input', () => {
    touched = true;
    if (name === 'cpf') applyCPFMask(input);
    // Erro visível some assim que o valor passa a ser válido.
    if (showError && isValid()) showError = false;
    render();
    onInput?.();
  });

  return {
    el: field,
    input,
    name,

    get value() {
      return input.value;
    },

    isValid,

    /** Chamado no submit: acende o estado Error se o campo estiver inválido. */
    validateNow() {
      const valid = isValid();
      showError = !valid;
      render();
      return valid;
    },

    focus() {
      input.focus();
    },

    reset() {
      input.value = '';
      touched = false;
      showError = false;
      field.classList.remove('is-focused');
      render();
    },
  };
}
