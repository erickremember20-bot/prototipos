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

Para publicar: suba `index.html` e a pasta `assets/`, e **troque `MODO_DEMO`
para `false`** (ver abaixo). Nada além disso.

> ⚠️ **`MODO_DEMO` está em `true`.** O arquivo está configurado como vitrine,
> para a equipe ver o desenho completo. Antes de ir para produção, abra o
> `<script>` no fim do `index.html` e troque para `false`.

## Links rápidos

| | |
|---|---|
| **Protótipo navegável** | https://claude.ai/code/artifact/51af3c2f-5d08-43ce-a9cf-7fb4cc9c6c31 |
| **GitHub Pages** | https://erickremember20-bot.github.io/prototipos/ — servido pela branch `gh-pages` |
| **Design system** | https://www.figma.com/design/r0hcxZ0GPY2HSCSrK20puy/Linktree_Canaltech?node-id=88-2 — página "Design system — 16:9" |

O protótipo é um arquivo único com os assets embutidos, gerado por
`build-standalone.py`. Serve para mostrar a página sem depender de deploy.

### GitHub Pages

A branch `gh-pages` traz só o site na raiz: `index.html`, `assets/` e
`.nojekyll`. Não carrega o histórico da branch de desenvolvimento.

Para ligar (uma vez): **Settings › Pages › Source "Deploy from a branch" ›
branch `gh-pages` › pasta `/ (root)` › Save.**

Para atualizar o que está no ar depois de mexer no `index.html`:

```bash
git worktree add /tmp/ghp gh-pages
cp -r hub-de-links/index.html hub-de-links/assets /tmp/ghp/
git -C /tmp/ghp add -A && git -C /tmp/ghp commit -m "chore: atualiza o Pages"
git -C /tmp/ghp push origin gh-pages
git worktree remove /tmp/ghp
```

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
| `--borda-campo` | `#081d9c` | campo de e-mail, botões sociais (mobile) |
| `--marca-ciano` | `#27a9e1` | fundo do avatar |
| `--marca-azul-profundo` | `#0a1fa9` | faixa de campanha |
| `--acento-cta` | `#c4f84b` | bloco do WhatsApp |
| `--acento-campanha` | `#e57c13` | botão "Votar Agora" |
| `--texto-primario` | `#ffffff` | |
| `--texto-secundario` | `#a9b2cc` | descrições |
| `--texto-apagado` | `#7c87a8` | legal, placeholder |
| `--texto-sobre-marca` | `#04091a` | tinta sobre o bloco lima |
| `--raio-sm/md/lg/pill` | `8 / 12 / 16 / 999px` | |
| `--sombra-slot` | `2px 4px 10.2px rgba(0,0,0,.25)` | slot de imagem |
| `--sombra-cartao` | `2px 4px 5.1px rgba(0,0,0,.25)` | cards |
| `--sombra-botao` | `-3px 4px 5.45px rgba(0,0,0,.4)` | botão sobre o bloco lima |
| `--gutter` | `16px` | respiro lateral da página |
| `--anel-foco` | `2px solid var(--marca-ciano)` | `:focus-visible` |

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

### Estados

Não estão no frame estático: foram derivados dos tokens acima para que todo
alvo clicável responda a hover, press e foco. Estão desenhados um a um no board
do design system no Figma.

| Componente | Estado | Valor |
|---|---|---|
| `.item` (linha da lista) | hover | fundo `#0a1fa0`, borda `#1a35c9` |
| `.item` | press | `scale(.995)`, sem mudança de cor |
| `.btn--tinta` | hover | `#0d1533` |
| `.btn--contorno` | hover | `rgba(9,31,169,.35)` |
| `.btn--cookie` | hover | `rgba(46,55,106,.35)` |
| `.btn--campanha` | hover | `#f08a1c` |
| `.btn--campanha` | disabled | opacidade .5, `aria-disabled="true"`, sem `href` |
| `.btn--salvar` | hover | `#d3ff64` |
| `.btn` (todos) | press | `translateY(1px)` |
| `.social` | hover | fundo `rgba(9,31,169,.4)`, borda `var(--marca-ciano)` |
| `.email__input` | inválido | borda `#ff6b6b`, mensagem `#ff9b9b` |
| `.email__input` | aceito | mensagem `var(--acento-cta)` |
| `.chave` (toggle) | ligado | trilho `#0a2f14`, borda e botão `var(--acento-cta)` |
| qualquer | `:focus-visible` | `2px solid var(--marca-ciano)`, offset 2 |

**Espaçamento:** base de 4pt — `4 · 8 · 12 · 16 · 20 · 24 · 32 · 40`. O 16 é o
gutter da página, o 24 separa seções e o 40 separa blocos.

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

Todos os destinos estão preenchidos. Confira cada um com a redação antes de
publicar.

| id | destino |
|---|---|
| `votar-abccom` | `https://app.abccom.com.br/#/award-voting` |
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

### Modo demonstração

Duas coisas do desenho só aparecem uma vez para cada pessoa: a **barra de
cookies** (some depois que o visitante escolhe, e fica guardado no navegador
dele) e a **faixa de campanha** (dispensável pelo ✕). Isso está certo em
produção e é péssimo para mostrar a página a alguém — quem já clicou uma vez
nunca mais vê.

Por isso existe a constante `MODO_DEMO`, logo no início do `<script>`:

```js
var MODO_DEMO = true;   // vitrine
```

| | `true` (vitrine) | `false` (produção) |
|---|---|---|
| Barra de cookies | aparece sempre, a cada carga | só para quem ainda não escolheu |
| Faixa de campanha | aparece mesmo sem `URL_VOTACAO` | só com `URL_VOTACAO` preenchida |
| Botão "Votar Agora" sem URL | inerte: sem `href`, `aria-disabled`, não navega | a faixa nem é renderizada |
| Escolha de cookies | continua sendo gravada normalmente | idem |

O modo também aceita a URL: **`?demo=1`** força a vitrine e **`?demo=0`**
força o comportamento de produção, sem editar o arquivo. Útil para conferir
os dois lados no mesmo link.

**Trocar para `false` antes de publicar em produção.**

### Faixa de campanha — ligar e desligar

A faixa do topo é controlada por **uma constante**, no início do `<script>`
no fim do `index.html`:

```js
var URL_VOTACAO = 'https://app.abccom.com.br/#/award-voting';
```

- **Preenchida** (estado atual): a faixa entra no ar e o `href` do botão
  "Votar Agora" recebe a URL. O ✕ dispensa a faixa e a escolha fica em
  `localStorage` — a menos que `MODO_DEMO` esteja em `true`, quando ela volta
  a cada carga.
- **Vazia** com `MODO_DEMO = false`: a faixa não entra no DOM. Um CTA laranja
  que não navega custa mais que a ausência da faixa. Com `MODO_DEMO = true`,
  a faixa aparece e o botão fica inerte (sem `href`, `aria-disabled`).

**Quando a campanha encerrar, esvazie a constante** — é o mesmo gesto, na
direção contrária, e tira a faixa do ar sem tocar no markup. Vale confirmar a
data de encerramento com quem cuida da campanha: o wireframe registra que ela
nunca foi confirmada.

---

## Telemetria

Nenhum SDK embutido. A página emite `CustomEvent` no `document`:

| Evento | `detail` | Quando |
|---|---|---|
| `ct:link` | `{ id, href, label }` | clique em qualquer `[data-ct-link]` |
| `ct:newsletter` | `{ email }` | e-mail validado no submit |
| `ct:cookies-consentimento` | `{ escolha, audiencia, publicidade, em }` | consentimento salvo |

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
3. **Painel de preferências de cookies.** O Figma desenha o botão
   "Preferências" (componente `72:495`) mas não o painel que ele abre — sem
   isso, das três ações de mesmo peso uma não fazia nada. Construído com os
   tokens existentes: modal com `role="dialog"`, duas categorias com
   interruptor (Audiência e Publicidade) mais os Necessários fixos, foco
   preso enquanto aberto, ESC e clique no fundo fecham. O mesmo painel abre
   pelo link "Preferências de cookies" do rodapé.

   O consentimento é gravado como JSON —
   `{ escolha, audiencia, publicidade, em }`, com `escolha` em `aceitar`,
   `recusar` ou `personalizado` — e leitura compatível com a versão anterior,
   que gravava só a string. **Dispare GA4/pixel apenas quando a categoria
   correspondente for `true`**; o `TODO dev:` está marcado em
   `gravarConsentimento()`.
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

Duas suítes em Chromium (Playwright), **176 asserções** no total.

A principal (116) cobre os dois frames:
cores e raios contra os tokens do Figma, geometria (faixa 60px, avatar 72/96,
slot 123×72, card 340, grid 2×340 com gap 40, colunas 360 + 80 + 720),
alternância de densidade e de texto, carregamento real dos 15 assets
(nenhuma imagem quebrada), as quatro interações
(dispensar faixa, consentimento, validação de e-mail, reabrir preferências),
persistência em `localStorage` e ausência de overflow horizontal em
320 / 360 / 375 / 414 / 600 / 768 / 1024 / 1280 / 1400 / 1600 / 1920px. Ela
gera cópias do arquivo entregue para cobrir as **quatro combinações** de
`MODO_DEMO` × `URL_VOTACAO`: produção com URL (faixa no ar, `href` correto),
produção sem URL (faixa não renderizada, nenhum link morto), vitrine com URL
(o arquivo como publicado: faixa e barra voltam a cada carga) e vitrine sem
URL (botão sem `href` e `aria-disabled`, a ponto de o próprio Playwright
recusar o clique).

A segunda (60) cobre só os cookies, nos dois breakpoints: abrir e fechar o
painel por ESC, pelo fundo e por Cancelar, o foco preso enquanto aberto,
salvar granular, aceitar tudo, recusar tudo, persistir no reload, reabrir
pelo rodapé com os interruptores refletindo o gravado, e a leitura do formato
antigo de consentimento.
