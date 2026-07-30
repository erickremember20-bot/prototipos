import { h, svgNode } from './lib/dom.js';
import { icons } from './icons.js';
import { content } from './data/content.js';
import { createCanaltechLogo, createMotorolaLogo, createKeyVisual } from './components/Brand.js';
import { createForm } from './components/Form.js';
import { createModalRules } from './components/ModalRules.js';
import { createModalSuccess } from './components/ModalSuccess.js';

/** Header (16:2) — o "×" entre as marcas é o separador de co-branding. */
function createHeader() {
  return h(
    'header',
    { class: 'header' },
    createCanaltechLogo(),
    h('span', { class: 'header__x', 'aria-hidden': 'true' }, svgNode(icons.close(20, 2.6))),
    createMotorolaLogo(),
  );
}

/** Hero (16:31) — headline em duas linhas, a segunda em verde neon. */
function createHero() {
  const { hero } = content;

  return h(
    'section',
    { class: 'hero' },
    h(
      'h1',
      { class: 'hero__headline t-h1' },
      hero.headline,
      h('em', {}, hero.headlineAccent),
    ),
    h('p', { class: 'hero__subtitle t-small' }, hero.subtitle),
    createKeyVisual(),
  );
}

/** "É muito simples participar" (16:66) — 3 cards cmp / step-card. */
function createSteps() {
  const { steps } = content;

  return h(
    'section',
    { class: 'steps-section' },
    h('h2', { class: 'steps-section__title t-h2' }, steps.title),
    h(
      'div',
      { class: 'steps' },
      steps.items.map((step) =>
        h(
          'div',
          { class: 'step' },
          h('div', { class: 'step__tile' }, svgNode(icons[step.icon](36))),
          h('p', { class: 'step__label t-body' }, step.label),
        ),
      ),
    ),
  );
}

/** Footer legal (16:87) — o link abre o modal de regras. */
function createFooter(onOpenRules) {
  const { footer } = content;

  return h(
    'footer',
    { class: 'footer-legal' },
    h('p', { class: 'footer-legal__text t-small' }, footer.legal),
    h(
      'button',
      { class: 'footer-legal__link', type: 'button', onClick: onOpenRules },
      footer.link,
    ),
  );
}

function mount(root) {
  const modalRules = createModalRules();

  const modalSuccess = createModalSuccess({
    // Fechar a tela de sucesso reseta o formulário principal.
    onClose: () => form.reset(),
  });

  const form = createForm({
    onSuccess: () => modalSuccess.open(),
  });

  root.append(
    h(
      'main',
      { class: 'shell' },
      createHeader(),
      createHero(),
      form.el,
      createSteps(),
      createFooter(modalRules.open),
    ),
  );

  document.body.append(modalRules.el, modalSuccess.el);
}

mount(document.getElementById('app') || document.body);
