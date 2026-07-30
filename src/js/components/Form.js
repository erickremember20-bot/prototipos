import { h } from '../lib/dom.js';
import { content } from '../data/content.js';
import { validators } from '../lib/validators.js';
import { createInput } from './Input.js';
import { createCheckbox } from './Checkbox.js';
import { createButton } from './Button.js';

/**
 * Screen 01 — bloco de formulário (16:44)
 *
 * Regras de liberação do CTA:
 *   nome ≥ 3 caracteres  ·  e-mail válido  ·  CPF válido (11 dígitos + DV)
 *   ·  checkbox do Regulamento marcado
 *
 * Enquanto qualquer um falhar, o botão fica no estado Disabled (verde-oliva
 * opaco). Se o usuário tentar enviar assim mesmo, cada campo inválido acende
 * o estado Error e o foco vai para o primeiro deles.
 */
export function createForm({ onSuccess }) {
  const { form, errors } = content;

  const inputs = form.fields.map((field) =>
    createInput({
      ...field,
      validate: validators[field.name],
      errorMessage: errors[field.name],
      onInput: () => syncSubmitState(),
    }),
  );

  const checkboxes = form.consents.map((consent) =>
    createCheckbox({
      ...consent,
      onChange: () => syncSubmitState(),
    }),
  );

  const requiredConsent = checkboxes.find((box) => box.name === 'regulamento');

  const submit = createButton({
    type: 'primary',
    label: form.submit,
    disabled: true,
    attrs: { type: 'submit' },
  });

  const isFormValid = () =>
    inputs.every((input) => input.isValid()) && requiredConsent.checked;

  function syncSubmitState() {
    submit.setDisabled(!isFormValid());
  }

  const el = h(
    'form',
    { class: 'form', novalidate: true },
    inputs.map((input) => input.el),
    h('div', { class: 'form__consents' }, checkboxes.map((box) => box.el)),
    submit.el,
  );

  el.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Acende o estado Error de tudo que estiver inválido.
    const results = inputs.map((input) => input.validateNow());
    const consentOk = requiredConsent.checked;
    requiredConsent.setError(!consentOk);

    if (!results.every(Boolean) || !consentOk) {
      // Enter num input dispara submit mesmo com o botão desabilitado —
      // ressincroniza para o estado do CTA nunca mentir sobre a validação.
      syncSubmitState();
      const firstInvalid = inputs.find((input, index) => !results[index]);
      firstInvalid?.focus();
      return;
    }

    // Envio simulado — 500ms de loading antes de abrir a tela de sucesso.
    submit.setLoading(true, form.submitting);
    await new Promise((resolve) => setTimeout(resolve, 500));
    submit.setLoading(false);
    syncSubmitState();

    onSuccess?.({
      nome: inputs[0].value,
      email: inputs[1].value,
      cpf: inputs[2].value,
      ofertas: checkboxes[1].checked,
    });
  });

  return {
    el,

    /** Volta a tela 01 ao estado inicial — usado ao fechar o modal de sucesso. */
    reset() {
      inputs.forEach((input) => input.reset());
      checkboxes.forEach((box) => box.reset());
      submit.setLoading(false);
      syncSubmitState();
    },
  };
}
