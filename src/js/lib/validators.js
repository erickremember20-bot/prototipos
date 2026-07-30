/** Regras de validação dos campos da tela 01. */

/** Nome obrigatório, mínimo de 3 caracteres. */
export function isValidName(value) {
  return String(value).trim().length >= 3;
}

/** Formato de e-mail user@domain.com — sem espaços, com TLD. */
export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value).trim());
}

/**
 * CPF: exige os 11 dígitos e valida os dois dígitos verificadores.
 * Sequências repetidas (111.111.111-11) são rejeitadas.
 */
export function isValidCPF(value) {
  const cpf = String(value).replace(/\D/g, '');

  if (cpf.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cpf)) return false;

  const checkDigit = (length) => {
    let sum = 0;
    for (let i = 0; i < length; i += 1) {
      sum += Number(cpf[i]) * (length + 1 - i);
    }
    const rest = (sum * 10) % 11;
    return rest === 10 ? 0 : rest;
  };

  return checkDigit(9) === Number(cpf[9]) && checkDigit(10) === Number(cpf[10]);
}

export const validators = {
  nome: isValidName,
  email: isValidEmail,
  cpf: isValidCPF,
};
