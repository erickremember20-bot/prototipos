# Canaltech — Hub de links

Implementação da página **"Hub de links — prototype"** do Figma
[Linktree_Canaltech](https://www.figma.com/design/r0hcxZ0GPY2HSCSrK20puy/Linktree_Canaltech?node-id=72-868).

| | |
|---|---|
| **Entregável** | `index.html` — arquivo único, sem build |
| **Stack** | HTML + CSS (variáveis nativas) + JS vanilla |
| **File key** | `r0hcxZ0GPY2HSCSrK20puy` |
| **Nós de origem** | `72:870` (01 · Mobile 360) · `72:975` (02 · Desktop 1400) |
| **Dependência externa** | apenas a fonte Barlow (Google Fonts) |
| **Responsivo** | 320px → 1920px, quebra em 1024px |

Para publicar: suba `index.html` e a pasta `assets/`. Nada além disso.

---

## O que a página é

Terceira geração do link na bio do Canaltech:

1. `linktr.ee/canaltech` — lista de links no template do Linktree.
2. `linktr.ee/canaltechlinks` — reorganização, ainda dentro do Linktree.
3. **este projeto** — hub próprio, com layout, domínio e telemetria do Canaltech.

O que muda de fato na terceira geração, lendo o Figma:

- **Hierarquia declarada.** Um CTA primário sólido (grupo de ofertas do WhatsApp),
  duas seções nomeadas — *Ler e assistir* e *Comprar melhor* — e uma captura de
  e-mail secundária. No Linktree todos os links tinham o mesmo peso.
- **Toda linha tem imagem própria.** O componente *Slot de imagem* (`72:404`) traz
  a regra escrita pelo designer: "Nenhum item entra na página sem imagem própria."
- **Duas densidades, não um layout esticado.** No mobile o destino é uma linha de
  96px com thumb de 123×72. No desktop vira card de 340px com thumb 16:9. As
  descrições também são mais longas no desktop — está no Figma, e o JS troca o
  texto no breakpoint (`data-txt-mobile` / `data-txt-desktop`).
- **Faixa de campanha dispensável** (Prêmio ABCCOM) acima de tudo.
- **Barra de cookies com três ações de mesmo peso.** Regra do componente `72:495`:
  "Recusar não pode custar mais cliques nem menos destaque que Aceitar."

---

## Estrutura

```
hub-de-links/
├── index.html        ← o entregável
├── assets/           ← imagens e ícones exportados do Figma
└── README.md
```

O `index.html` está comentado em três blocos que o dev precisa ler:
a lista de destinos a confirmar, a lista de assets esperados e os `TODO dev:`
dentro do script.

---

## Design tokens

Valores das variáveis reais da coleção do Figma, declarados em `:root`.

| Token | Valor | Uso |
|---|---|---|
| `--fundo-pagina` | `#050f4a` | fundo da página |
| `--fundo-cartao` | `#081985` | cards de destino, captura de e-mail |
| `--fundo-slot` | `#141a3c` | slot de imagem vazio |
| `--fundo-afundado` | `#03040f` | barra de cookies |
| `--borda-cartao` | `#091fa9` | borda dos cards |
| `--borda-forte` | `#2e376a` | botões de cookie |
| `--borda-sutil` | `#1c2244` | topo da barra de cookies |
| `--marca-ciano` | `#27a9e1` | fundo do avatar |
| `--marca-azul-profundo` | `#0a1fa9` | faixa de campanha |
| `--acento-cta` | `#c4f84b` | bloco do WhatsApp |
| `--acento-campanha` | `#e57c13` | botão "Votar Agora" |
| `--texto-primario` | `#ffffff` | |
| `--texto-secundario` | `#a9b2cc` | descrições |
| `--texto-apagado` | `#7c87a8` | legal, placeholder |
| `--texto-sobre-marca` | `#04091a` | tinta sobre o bloco lima |
| `--raio-sm/md/lg/pill` | `8 / 12 / 16 / 999px` | |

**Tipografia:** Barlow 400/700, entrelinha 1.5 (1.1 no nome em desktop).

| Papel | Mobile | Desktop |
|---|---|---|
| Nome | 20 Bold | 28 Bold / 1.1 |
| Bio | 14 | 18 |
| Rótulo de seção | 16 Bold | 20 Bold |
| Título do CTA | 16 Bold | 20 Bold |
| Título do item | 14 Bold | 18 Bold |
| Corpo | 14 | 16 |
| Botão | 16 Bold | 16 Bold |
| Legal | 12 | 14 |

**Grid desktop (1400):** `120 + 360 + 80 + 720 + 120`. A coluna de identidade é
`position: sticky`. Acima de 1400px o conteúdo centraliza e a faixa de campanha
e a barra de cookies acompanham o container, em vez de colar nas bordas da tela.

---

## Assets

Exportar do Figma para `assets/` com **estes nomes exatos**:

| Arquivo | Nó | Caixa desenhada |
|---|---|---|
| `logo-canaltech.svg` | `72:882` / `72:987` | 72×72 mobile · 96×96 desktop |
| `canaltech-grao-512.png` | `72:889` / `72:994` | ladrilho 512×512, overlay 35% |
| `card_noticias.png` | `72:908` | 123×72 mobile · 340×191 desktop |
| `card_youtube.png` | `72:914` | idem |
| `card_podcast.png` | `72:920` | idem |
| `card_ct_eletro.png` | `72:926` | idem |
| `card_ct_ofertas_desktop.png` | `72:935` | idem |
| `card_guia_de_compras.png` | `72:941` | idem |
| `icon-trophy.svg` | `72:873` | 36×36 |
| `icon-whatsapp.svg` | `72:894` | 22×22 |
| `icon-instagram.svg` | `72:955` | 24×24 |
| `icon-tiktok.svg` | `72:958` | **21×24** |
| `icon-youtube.svg` | `72:961` | 24×24 |
| `icon-x.svg` | `72:964` | 24×24 |
| `icon-facebook.svg` | `72:967` | 24×24 |
| `icon-threads.svg` | `72:970` | 24×24 |

Recomendação: cards em PNG 2× (680×382), ícones em SVG.

**Enquanto um asset não existe, a página não quebra.** Cada `<img>` tem um
`onerror` que liga o fallback:

- **ícones** → sprite SVG embutido no topo do arquivo;
- **fotos dos cards** → componente *Slot de imagem* do próprio design system,
  com fundo `--fundo-slot` e o rótulo `IMAGEM`;
- **grão** → a cor cinza chapada que o Figma usa como placeholder do fill.

Basta soltar os arquivos na pasta. Nenhuma linha de código muda.

---

## Destinos — confirmar antes de publicar

O Figma não define URLs. Os `href` no HTML são o palpite mais provável e estão
marcados com `data-ct-link`. **Dois estão em `#` e precisam de resposta:**

- `votar-abccom` — URL da votação do Prêmio ABCCOM;
- `whatsapp` — link de convite do grupo de ofertas.

Os demais (`noticias`, `youtube`, `podcasts`, `ct-eletro`, `ct-ofertas`,
`guia-compras`, `social-*`, `legal-*`) apontam para os endereços oficiais e
devem ser conferidos com a redação.

---

## Telemetria

Nenhum SDK embutido. A página emite `CustomEvent` no `document`:

| Evento | `detail` | Quando |
|---|---|---|
| `ct:link` | `{ id, href, label }` | clique em qualquer `[data-ct-link]` |
| `ct:newsletter` | `{ email }` | e-mail validado no submit |
| `ct:cookies-consentimento` | `{ escolha }` | `aceitar` ou `recusar` |
| `ct:cookies-preferencias` | — | clique em "Preferências" |

Plugue o GA4/GTM ouvindo esses eventos, sem tocar no markup:

```js
document.addEventListener('ct:link', function (e) {
  gtag('event', 'select_content', {
    content_type: 'hub_link',
    item_id: e.detail.id
  });
});
```

---

## Decisões conscientes (divergem do frame estático)

1. **Barra de cookies fixa no rodapé.** No Figma ela é o último bloco do
   artboard. Numa página real é overlay: `position: fixed`, com
   `padding-bottom` no `body` para nunca cobrir conteúdo, e reabre pelo link
   "Preferências de cookies" do rodapé.
2. **Estados de erro e sucesso do campo de e-mail.** O designer marcou como
   lacuna do DS ("Faltam os estados de vazio, erro e sucesso do input").
   Implementados com os tokens existentes: `aria-invalid`, mensagem em
   `role="status"` e borda vermelha. Troque o `TODO dev:` pelo POST real.
3. **"Preferências" de cookies não grava escolha.** Sem painel de CMP desenhado,
   o botão emite o evento e mantém a barra aberta — em vez de fingir um
   consentimento que ninguém deu. Plugue o CMP no `ct:cookies-preferencias`.
4. **Estados de foco e hover.** Outra lacuna apontada no Figma. Foco visível
   em ciano `--marca-ciano` em todos os controles; hover discreto nos cards.
5. **Data da campanha.** O wireframe deixa a data como placeholder porque o
   encerramento da votação ABCCOM não foi confirmado. Mantida fora da faixa.
6. **Breakpoints intermediários.** Não desenhados no Figma. Entre 600 e 1023px
   a pilha mobile centraliza numa medida de 560px; a partir de 1024px entra o
   layout de duas colunas.

---

## Acessibilidade

- `lang="pt-BR"`, landmarks (`header` / `main` / `footer` / `nav`), um único `h1`.
- Alvos de toque ≥ 44px (sociais, botões de cookie, ações da faixa).
- Foco visível em todos os controles; `prefers-reduced-motion` respeitado.
- Ícones decorativos com `aria-hidden`; cada link social tem `aria-label`.
- Feedback do formulário em `role="status"` + `aria-live="polite"`.
- Página funciona sem JavaScript: os links, a estrutura e a alternância
  mobile/desktop são CSS. Sem JS perdem-se apenas os ícones sociais
  (montados por script), o dispensar da faixa e a barra de cookies.

---

## Verificação

Suíte de 82 asserções em Chromium (Playwright), cobrindo os dois frames:
cores e raios contra os tokens do Figma, geometria (faixa 60px, avatar 72/96,
slot 123×72, card 340, grid 2×340 com gap 40, colunas 360 + 80 + 720),
alternância de densidade e de texto, fallback dos assets, as quatro interações
(dispensar faixa, consentimento, validação de e-mail, reabrir preferências),
persistência em `localStorage` e ausência de overflow horizontal em
320 / 360 / 375 / 414 / 600 / 768 / 1024 / 1280 / 1400 / 1600 / 1920px.
