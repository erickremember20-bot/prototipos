/** Máscara de CPF: 000.000.000-00, aplicada durante a digitação. */
export function maskCPF(value) {
  const digits = String(value).replace(/\D/g, '').slice(0, 11);

  return digits
    .replace(/^(\d{3})(\d)/, '$1.$2')
    .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
}

/**
 * Aplica a máscara preservando a posição do cursor — sem isso, editar no meio
 * do campo joga o cursor para o fim a cada tecla.
 */
export function applyCPFMask(input) {
  const before = input.value;
  const caret = input.selectionStart ?? before.length;
  const digitsBeforeCaret = before.slice(0, caret).replace(/\D/g, '').length;

  const masked = maskCPF(before);
  input.value = masked;

  // Recoloca o cursor após a mesma quantidade de dígitos.
  let seen = 0;
  let position = masked.length;
  for (let i = 0; i < masked.length; i += 1) {
    if (/\d/.test(masked[i])) seen += 1;
    if (seen >= digitsBeforeCaret) {
      position = i + 1;
      break;
    }
  }
  if (digitsBeforeCaret === 0) position = 0;

  input.setSelectionRange(position, position);
}
