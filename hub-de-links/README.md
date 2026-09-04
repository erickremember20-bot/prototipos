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

## Links rápidos

| | |
|---|---|
| **Protótipo navegável** | https://claude.ai/code/artifact/51af3c2f-5d08-43ce-a9cf-7fb4cc9c6c31 |
| **GitHub Pages** | `https://erickremember20-bot.github.io/Motorola_01/` — branch `gh-pages` já publicada; falta ligar em *Settings › Pages › Deploy from a branch › gh-pages / (root)* |

O protótipo é um arquivo único com os assets embutidos, gerado por
`build-standalone.py`. Serve para mostrar a página sem depender de deploy.

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
├── index.html            ← o entregável
├── assets/               ← imagens e ícones exportados do Figma
├── build-standalone.py   ← gera a versão de arquivo único (assets em data URI)
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

**Todos os assets já estão em `assets/`**, exportados do Figma e conferidos
um a um (tipo real do arquivo x extensão, e dimensão x caixa desenhada).
A única exceção é `canaltech-grao-512.png` — ver nota abaixo da tabela.

| Arquivo | Nó | Caixa desenhada |
|---|---|---|
| `logo-canaltech.svg` ✅ | `72:882` / `72:987` | 72×72 · traz o próprio círculo `#3FA9F5` |
| `canaltech-grao-512.png` ⬜ | `72:889` / `72:994` | ladrilho 512×512, overlay 35% |
| `card_noticias.png` ✅ | `72:908` | 123×72 mobile · 340×191 desktop |
| `card_youtube.png` ✅ | `72:914` | idem |
| `card_podcast.png` ✅ | `72:920` | idem |
| `card_ct_eletro.png` ✅ | `72:926` | idem |
| `card_ct_ofertas_desktop.png` ✅ | `72:935` | idem |
| `card_guia_de_compras.png` ✅ | `72:941` | idem |
| `icon-trophy.svg` ✅ | `72:873` | 36×36 |
| `icon-whatsapp.svg` ✅ | `72:894` | 22×22 |
| `icon-instagram.svg` ✅ | `72:955` | 24×24 |
| `icon-tiktok.svg` ✅ | `72:958` | **21×24** |
| `icon-youtube.svg` ✅ | `72:961` | 24×24 |
| `icon-x.svg` ✅ | `72:964` | 24×24 |
| `icon-facebook.svg` ✅ | `72:967` | 24×24 |
| `icon-threads.svg` ✅ | `72:970` | 24×24 |

### O pattern do cartão de identidade (`canaltech-grao-512.png`)

Único asset não entregue, e o único ponto do design que não veio pronto do
arquivo. A camada no Figma se chama literalmente *"Grão — trocar o fill por
canaltech-grao-512.png, escala Ladrilho"*: o cinza chapado de lá é
placeholder, não arte final. Confirmado via MCP — `download_assets` no nó
`72:985` devolve `rawImages: []`, ou seja, não existe fill de imagem no
arquivo.

Reproduzido em CSS puro: `feTurbulence` gera o ruído e um `feColorMatrix`
amplifica o alfa (coeficiente 4, offset −2.15) para transformar o ruído em
partículas esparsas, no lugar de uma névoa uniforme. Fica sobre o degradê
`#142ace → #0a1380 (55%) → #050f4a` em `mix-blend-mode: overlay`.

O `background-image` do `.campo-marca::after` declara **duas** camadas: o
ladrilho na frente e o ruído atrás. Ao adicionar o PNG à pasta, ele passa a
valer sozinho, sem tocar no código.

### Se um asset sumir do deploy

A página não quebra. Cada `<img>` tem um `onerror` que liga o fallback:
ícones caem no sprite SVG embutido no topo do arquivo; fotos dos cards caem
no componente *Slot de imagem* do próprio design system, com fundo
`--fundo-slot` e o rótulo `IMAGEM`.

---

## Destinos

O Figma não define URLs. Todo link navegável carrega `data-ct-link="<id>"`,
então trocar um destino é uma linha.

**Uma pendência.** `votar-abccom`, o botão "Votar Agora" da faixa de campanha,
segue em `#`: não foi possível confirmar a URL da votação do Prêmio ABCCOM.

| id | destino |
|---|---|
| `votar-abccom` | **`#` — pendente** |
| `whatsapp` | `https://ofertas.canaltech.com.br/grupos-de-oferta/` |
| `ct-ofertas` | `https://ofertas.canaltech.com.br/` |
| `noticias` | `https://canaltech.com.br/` |
| `youtube` | `https://www.youtube.com/canaltech` |
| `podcasts` | `https://canaltech.com.br/podcast/` |
| `ct-eletro` | `https://www.youtube.com/@CTEletro` |
| `guia-compras` | `https://canaltech.com.br/guia-de-compras/` |
| `social-*` | perfis oficiais, no array `SOCIAIS` do script |
| `legal-*` | site, privacidade e anuncie |

Confira todos com a redação antes de publicar.

### Faixa de campanha — verificar a validade

A faixa diz "Prêmio ABCCOM · vote no Canaltech". Vale confirmar se a votação
ainda está aberta: **se já encerrou, a faixa inteira sai antes de publicar.**
O próprio wireframe registra isso como pendência — *"Não confirmei a data de
encerramento da votação ABCCOM"*. A faixa é dispensável pelo ✕ e lembra a
escolha em `localStorage`, mas isso não substitui tirá-la do ar quando a
campanha acabar.

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

Rodar a suíte exige Playwright (`npm install playwright`); o Chromium do
ambiente é apontado por `executablePath`.

Suíte de 91 asserções em Chromium (Playwright), cobrindo os dois frames:
cores e raios contra os tokens do Figma, geometria (faixa 60px, avatar 72/96,
slot 123×72, card 340, grid 2×340 com gap 40, colunas 360 + 80 + 720),
alternância de densidade e de texto, carregamento real dos 15 assets
(nenhuma imagem quebrada), as quatro interações
(dispensar faixa, consentimento, validação de e-mail, reabrir preferências),
persistência em `localStorage` e ausência de overflow horizontal em
320 / 360 / 375 / 414 / 600 / 768 / 1024 / 1280 / 1400 / 1600 / 1920px.
