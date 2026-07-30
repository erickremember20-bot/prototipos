/**
 * Helper mínimo de criação de DOM — evita innerHTML espalhado pelo código
 * e mantém os componentes legíveis sem depender de framework.
 *
 *   h('div', { class: 'card' }, h('p', {}, 'Olá'))
 *
 * Props especiais: `class`, `html` (innerHTML cru, usado só para SVG inline),
 * `dataset`, `style` (objeto) e qualquer `on*` vira addEventListener.
 */
export function h(tag, props = {}, ...children) {
  const el = document.createElement(tag);

  for (const [key, value] of Object.entries(props || {})) {
    if (value === null || value === undefined || value === false) continue;

    if (key === 'class') {
      el.className = value;
    } else if (key === 'html') {
      el.innerHTML = value;
    } else if (key === 'dataset') {
      Object.assign(el.dataset, value);
    } else if (key === 'style' && typeof value === 'object') {
      Object.assign(el.style, value);
    } else if (key.startsWith('on') && typeof value === 'function') {
      el.addEventListener(key.slice(2).toLowerCase(), value);
    } else if (value === true) {
      el.setAttribute(key, '');
    } else {
      el.setAttribute(key, value);
    }
  }

  for (const child of children.flat()) {
    if (child === null || child === undefined || child === false) continue;
    el.append(child instanceof Node ? child : document.createTextNode(String(child)));
  }

  return el;
}

/** Envolve uma string de SVG em um nó, preservando a caixa externa do design. */
export function svgNode(markup) {
  const wrapper = document.createElement('span');
  wrapper.style.display = 'contents';
  wrapper.innerHTML = markup;
  return wrapper.firstElementChild;
}
