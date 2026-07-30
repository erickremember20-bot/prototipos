/**
 * Todo o texto da campanha, transcrito dos nós do Figma.
 * Centralizar aqui mantém a cópia fora da lógica dos componentes.
 */
export const content = {
  brand: {
    canaltech: { label: 'Canaltech', width: 114.286, height: 24 },
    motorola: { label: 'motorola', width: 102.564, height: 20 },
  },

  hero: {
    // 16:32 — a segunda linha é verde neon
    headline: 'GARANTA 20% OFF E CONCORRA A',
    // NBSP antes do "+" para que ele nunca fique órfão numa linha só.
    headlineAccent: '1 MOTOROLA EDGE 70 FUSION +',
    subtitle: 'Complete os dados para receber o cupom e o número da sorte.',
    kvTitle: 'edge 70 fusion +',
    kvSubtitle: 'o único com três câmeras de 50 MP da categoria',
    kvBadge: 'Official Smartphone Partner',
  },

  form: {
    fields: [
      { name: 'nome', label: 'Nome completo', placeholder: 'Nome completo', type: 'text', autocomplete: 'name' },
      { name: 'email', label: 'E-mail', placeholder: 'E-mail', type: 'email', autocomplete: 'email' },
      { name: 'cpf', label: 'CPF', placeholder: 'CPF', type: 'tel', autocomplete: 'off', inputmode: 'numeric', maxlength: 14 },
    ],
    consents: [
      { name: 'regulamento', label: 'Li e concordo com o Regulamento da Promoção', required: true },
      { name: 'ofertas', label: 'Aceito receber ofertas do Canaltech e Motorola', required: false },
    ],
    submit: 'QUERO MEU DESCONTO AGORA',
    submitting: 'ENVIANDO…',
  },

  steps: {
    // 16:66
    title: 'É MUITO SIMPLES PARTICIPAR',
    items: [
      { icon: 'userCheck', label: 'Cadastre-se' },
      { icon: 'envelope', label: 'Ganhe o Cupom' },
      { icon: 'trophy', label: 'Concorra' },
    ],
  },

  footer: {
    // 16:87
    legal: 'Promoção Motorola x Canaltech. Cupom válido até 30/07/2026.',
    link: 'Consulte o regulamento completo.',
  },

  rules: {
    // 12:44
    title: 'Regras da Promoção (Resumo)',
    subtitle: 'Canaltech x Motorola - Edição Copa do Mundo',
    items: [
      {
        title: '1. Como funciona?',
        body: 'Ao cadastrar seu e-mail e CPF, você recebe 20% OFF imediato e 1 número da sorte para o sorteio do Edge 70 Fusion+.',
      },
      {
        title: '2. Cupom de Desconto',
        body: 'Válido exclusivamente na loja oficial da Motorola até 30/07/2026. Não cumulativo com outras ofertas.',
      },
      {
        title: '3. O Sorteio',
        body: 'Baseado no resultado da Loteria Federal em 05/08/2026. O ganhador será contatado diretamente por e-mail.',
      },
      {
        title: '4. LGPD e Privacidade',
        body: 'Seus dados serão usados com segurança para validação e entrega do prêmio conforme as leis vigentes.',
      },
    ],
    cta: 'Ler Regulamento Completo em PDF',
    pdfUrl: 'https://www.canaltech.com.br/regulamento-motorola-copa-2026.pdf',
  },

  success: {
    // 12:45
    eyebrow: 'TUDO PRONTO',
    headline: 'SEU DESCONTO ESTÁ GARANTIDO',
    support: 'Aproveite os 20% OFF no Motorola Edge 70 Fusion+',
    couponBadge: 'CÓDIGO DO CUPOM',
    couponCode: 'CANALTECH20',
    couponHelper: 'Clique aqui para copiar o código',
    couponHelperCopied: 'Código copiado com sucesso! 🎉',
    luckyBadge: 'SEU NÚMERO',
    luckyBadgeAccent: 'DA SORTE:',
    luckyNumber: '789456',
    luckyHelper: 'Guardamos seu número para o sorteio',
    cta: 'RESGATAR DESCONTO',
    ctaUrl: 'https://www.motorola.com.br/',
    info: 'Enviamos os detalhes e o cupom para o seu e-mail.',
    footer: 'Dúvidas? Entre em contato com o suporte Canaltech.',
  },

  errors: {
    nome: 'Informe seu nome completo (mín. 3 caracteres)',
    email: 'Informe um e-mail válido',
    cpf: 'Informe um CPF válido',
    regulamento: 'É preciso aceitar o Regulamento para continuar',
  },
};
