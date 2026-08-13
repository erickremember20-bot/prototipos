# Protótipos de landing page — Canaltech Ofertas

Dois protótipos independentes, sem etapa de build para editar e sem CDN.

| # | Protótipo | Fonte | Build autocontido |
|---|---|---|---|
| 1 | **CT OFERTAS** — Canaltech Ofertas × Netshoes (identidade final) | `ct-em-campo.html` + `assets/` | `ct-em-campo.standalone.html` · `ct-em-campo.artifact.html` |
| 2 | **Canaltech × Motorola \| FIFA** — Edição Copa do Mundo | `index.html` | `artifact.html` |

---

## 1. CT OFERTAS — Canaltech Ofertas × Netshoes

Landing page VIP de produto único, porte fiel da página **`Projeto`** do Figma
(`FtcQy17MpdYvRHuysCVNJj`), nas duas telas desenhadas: `Desktop — 1400` (`23:2608`)
e `Mobile — 360` (`23:2695`).

| | |
|---|---|
| **Fonte** | `ct-em-campo.html` + `assets/` |
| **Autocontido** | `ct-em-campo.standalone.html` (1,2 MB, abre offline) |
| **Artifact** | `ct-em-campo.artifact.html` (mesmo conteúdo, sem o esqueleto do documento) |
| **Stack** | HTML + CSS custom properties + JavaScript vanilla — sem build, sem CDN |
| **Responsivo** | 360 · 390 · 768 · 1024 · 1400+ |

Tokens, tipografia, espaçamentos, raios e **estados** foram lidos nó a nó pela
Plugin API do Figma, não estimados da imagem.

### Design tokens

Espelham a coleção `Core`/`Brand` do arquivo:

| Papel | Token | Hex |
|---|---|---|
| Header, marca | `--blue-500` | `#0039ff` |
| Preço, navegação da galeria | `--blue-400` | `#3361ff` |
| CTA de conversão | `--green-500` | `#009732` |
| Destaques, selo, contador | `--yellow-500` | `#fff000` |
| Faixa VIP, countdown | `--gray-500` | `#141414` |

Tipografia **Barlow** 400/500/600/700/800, embutida em `assets/fonts.css`
(base64, sem requisição externa).

### Componentização e estados

O frame `Components` do Figma define os estados de cada elemento interativo.
Todos estão implementados:

| Componente | Default | Hover | Pressed | Disabled |
|---|---|---|---|---|
| `.cta--primary` | `#009732` / branco | `#006b24` / `#e6f5eb` | `#003f15` / `#e6f5eb` | `#54b976` a 60% / `#b0dfbf` |
| `.cta--secondary` | gradiente `#4cc875→#7cff09`, borda `#e6f5eb` | sem borda, brilho +4% | `scale(.985)` | — |
| `.nav` (galeria) | `#3361ff` | `#0034e8` | `#0028b5` + `scale(.94)` | — |
| `.community` (card mobile) | gradiente `#006b24→#00892e`, borda `#fff000` | — | gradiente `#004718→#006723`, borda e título `#b5aa00` | — |

O CTA principal entra em `disabled` sozinho quando o contador chega a zero.

### Interatividade

| Recurso | Comportamento |
|---|---|
| **Countdown** | Regressivo real com tick de 1s a partir de `02d 14h 30m`; ao zerar troca o rótulo e desabilita os CTAs. |
| **Galeria** | 4 vistas com miniaturas (≥768px), setas, dots (mobile), `←`/`→` no teclado e swipe no touch. Navegação circular. |
| **Cupom** | Clique copia `CANALTECH20` (Clipboard API com fallback) e devolve feedback por 2,4s. |
| **Sticky bar** | Só abaixo de 768px. Aparece quando menos de 60% do CTA principal está à vista — em viewport alto, onde o botão nunca sai da tela, ela permanece oculta de propósito para não duplicar o mesmo CTA na mesma dobra. |

### Assets

Imagens originais em `assets/` (masters de 12 MB) e derivados de web em
`assets/web/` (661 KB no total): hero em JPEG 1600px e três packshots em 900px,
com miniaturas de 240px. Ícones Phosphor em `assets/icons.css`, embutidos como
data URI e pintados por `currentColor` via máscara CSS — data URI porque máscara
com caminho relativo não carrega em `file://`.

### Verificação

Suíte de **45 asserções** em Chromium (Playwright) contra o build autocontido, em
360 · 390 · 768 · 1024 · 1400: ausência de erro de JS, ausência de requisição
externa, ausência de overflow horizontal, carga da Barlow ExtraBold, tick do
countdown, troca de imagem por miniatura/dot/seta, cópia do cupom e o
comportamento da sticky bar em cada largura — **45/45**.

### Regerar os builds

```bash
node tools/build-standalone.mjs
```

---

## 2. Canaltech x Motorola | FIFA — Edição Copa do Mundo

Protótipo interativo da landing page de co-branding, implementado a partir do
arquivo do Figma via MCP.

| | |
|---|---|
| **Entregável** | `index.html` (arquivo único, sem build) |
| **Stack** | Tailwind CSS via CDN + JavaScript vanilla |
| **Figma File Key** | `wq58RvFpU9sQ70LpQxux3F` |
| **Nós de origem** | `66:87` Landing_Page · `66:278` Drawer Sucesso · `66:308` Regras |
| **Responsivo** | 360px → desktop |

Basta abrir `index.html` no navegador. Não há dependências de build.

---

### ⚠️ Assets de marca pendentes

O ambiente onde este protótipo foi gerado tem **acesso de rede aos hosts da Figma
bloqueado por política** (HTTP 403 no CONNECT para `www.figma.com`,
`figma.com`, `api.figma.com` e `s3-alpha-sig.figma.com`), portanto não foi
possível baixar os bytes dos assets exportados.

Três assets **não substituíveis** precisam ser exportados do Figma para a pasta
`assets/`:

| Arquivo esperado | Nó no Figma | Dimensões |
|---|---|---|
| `assets/canaltech-logo.svg` | `66:90` (canaltech_white) | 104 × 22 |
| `assets/motorola-logo.svg` | `66:106` (motorola_white) | 104 × 20 |
| `assets/kv-motorola-edge-70-fusion.png` | `66:116` (kv_motorola_02) | 328 × 185 |

Enquanto eles não existirem, a página **não quebra**: cada `<img>` tem um
`onerror` que aplica um fallback (wordmark em texto para os logos, gradiente
com o nome do produto para o key visual). Ao adicionar os arquivos, os assets
reais passam a ser usados automaticamente, sem alteração de código.

Os **ícones** (UserCheck, Envelope, Trophy, Copy, Checks, CaretRight, X,
Warning, Check, Link) estão inline como sprite SVG no topo do arquivo,
reproduzindo os glifos da família Phosphor Icons usada no design, com as
dimensões de caixa e de glifo definidas no Figma.

---

### Design tokens

Os valores aplicados são os das **variáveis reais do Figma**, que divergem
levemente dos hexadecimais aproximados do briefing:

| Papel | Briefing | Figma (aplicado) |
|---|---|---|
| Canvas | `grey-900` `#141414` | `grey-500` `#141414` |
| Surface (menu bar, footer) | `#1F1F1F` | `grey-900` `#080808` |
| Brand primary / campanha | `green-500` `#AAFF00` | `green-500` `#ABFE02` |
| Brand secondary | `purple-500` `#6200EE` | `purple-500` `#581FFF` |
| Feedback de erro | `red-500` `#E53935` | `red-500` `#ED2424` |
| Texto secundário | `grey-400` `#A0A0A0` | `grey-100` `#B6B6B6` |

Tipografia: **Barlow** 400 / 600 / 700 (Google Fonts). Escala do Figma —
`h1` 24/1.2 Bold · `h2` 20/1.2 Bold · `h3` 16/1.2 SemiBold ·
`body` 14/1.5 Regular · `small` 12/1.5 Regular.

Raios: input `12px` · botões `9999px` (pill) · cards dos drawers `24px` ·
topo dos bottom sheets `32px`.

#### Divergências conscientes do Figma

1. **Rótulo do input em repouso** — o Figma usa `grey-400` `#434343` sobre
   `#141414` (≈ 2,2:1, reprova no WCAG AA). Aplicado `grey-200` `#939393`
   (≈ 5,3:1). O rótulo flutuante mantém o `#B6B6B6` do design.
2. **Card do cupom no estado `Copied`** — o Figma mantém o roxo e troca apenas
   o ícone para `✓✓`. O briefing pede explicitamente "verde de confirmação",
   então foi aplicado `green-900` no card + `green-500` no bloco do código.
3. **Card do cupom: legenda no estado `Copied`** — mantida em branco (e não em
   verde) para preservar contraste sobre o card verde.
4. **Botão Primary `Disabled`** — `green-500` a 40% de opacidade, conforme o
   Figma. Componentes inativos são isentos do critério 1.4.3 do WCAG.

---

### Regras de negócio implementadas

O CTA principal (`QUERO MEU DESCONTO AGORA`) inicia **`DISABLED`** e só é
habilitado por `validateForm()` quando **todas** as condições são satisfeitas:

- **Nome Completo** — mínimo 3 caracteres **e** pelo menos duas palavras.
- **CPF** — exatamente 11 dígitos, com máscara `000.000.000-00` em tempo real.
- **E-mail** — formato com `@` e domínio válido.
- **Opt-in obrigatório** — `checked == true`.
- O opt-in de ofertas é **opcional** e não participa da regra.

`CONFIG.STRICT_CPF` (padrão `false`) liga a validação dos dígitos
verificadores do CPF, para homologação com dados reais.

**Fluxo:** submit → `Loading` de 1s (cliques múltiplos bloqueados) → abre o
Drawer de Sucesso → clique no cupom copia `CANALTECH20` via
`document.execCommand('copy')` e alterna o card para `Copied` por 2,5s →
`RESGATAR DESCONTO >` abre a loja Motorola em nova aba + toast.

Número da sorte: bilhete estático `789456` 🏆 com "Guardamos seu número para o
sorteio".

---

### Acessibilidade

- Floating label é um `<label>` real (nome acessível preservado, WCAG 3.3.2);
  a flutuação é 100% CSS via `:placeholder-shown`.
- `aria-invalid` + `role="alert"` no helper text; foco move para o primeiro
  campo inválido no submit (WCAG 3.3.1).
- Drawers: `role="dialog"`, `aria-modal`, foco movido para dentro, **focus
  trap** no `Tab`, `Esc` e clique no backdrop fecham, foco devolvido ao gatilho.
- `aria-live` anuncia a cópia do cupom e o processamento do formulário.
- Foco visível em todos os controles; `prefers-reduced-motion` respeitado.
- Alvos de toque ≥ 24px (WCAG 2.5.8) e ≥ 44px nas linhas de opt-in.

---

### Verificação

Suíte de 51 asserções em Chromium (Playwright) cobrindo máscara de CPF, as
quatro combinações de validação, os 4 estados do Input Field, habilitação do
CTA, loading, ambos os drawers, focus trap, microinteração de cópia, toast e
ausência de overflow horizontal a 360px — **51/51 aprovadas**.
