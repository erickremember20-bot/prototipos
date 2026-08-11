# Protótipos de landing page — Canaltech Ofertas

Dois protótipos independentes, cada um em **arquivo único**, sem etapa de build
para editar e sem dependência de assets externos em runtime.

| # | Protótipo | Fonte | Build autocontido |
|---|---|---|---|
| 1 | **CT em Campo** — Canaltech Ofertas × Netshoes (wireframe monocromático) | `ct-em-campo.html` | `ct-em-campo.standalone.html` · `ct-em-campo.artifact.html` |
| 2 | **Canaltech × Motorola \| FIFA** — Edição Copa do Mundo | `index.html` | `artifact.html` |

---

## 1. CT em Campo — Canaltech Ofertas × Netshoes

Landing page VIP de produto único (oferta liberada para a comunidade), construída
como **wireframe monocromático de alta fidelidade**: o objetivo é validar
arquitetura de conversão, hierarquia e responsividade **sem** cor de marca.

| | |
|---|---|
| **Entregável** | `ct-em-campo.html` (arquivo único, sem build) |
| **Stack** | Tailwind CSS via CDN + JavaScript vanilla |
| **Responsivo** | 360px → 1280px+ |
| **Assets externos** | nenhum (imagens em SVG inline, tipografia da stack do sistema) |

Três formatos do mesmo protótipo, todos gerados a partir de `ct-em-campo.html`:

| Arquivo | Quando usar |
|---|---|
| `ct-em-campo.html` | **Fonte** — o arquivo que se edita. Tailwind via CDN, então precisa de rede para renderizar. |
| `ct-em-campo.standalone.html` | **Download / uso offline** — documento completo com o CSS compilado embutido. Abre com dois cliques, sem rede. |
| `ct-em-campo.artifact.html` | **Publicação como Artifact** — sem esqueleto de documento (o publicador injeta o dele) e sem host externo, que a CSP bloqueia. |

### Paleta (escala única, estritamente monocromática)

| Papel | Token | Hex |
|---|---|---|
| Superfície principal / texto invertido | `white` | `#FFFFFF` |
| Fundo da página e de blocos internos | `mist` | `#F3F4F6` |
| Bordas e divisores | `line` | `#E5E7EB` |
| Texto terciário, unidades, dots | `ink-400` | `#9CA3AF` |
| Texto secundário e corpo | `ink-600` | `#4B5563` |
| Texto primário, faixa VIP, CTA | `ink-900` | `#111827` |

Raio padrão `rounded-xl` (12px) nos cards e controles, `rounded-2xl` no
container da página. Tipografia: stack sans-serif do sistema — escolha
deliberada para manter o arquivo 100% autocontido, sem webfont remota.

### Arquitetura de conversão

1. **Header clean** — co-branding apenas. Sem busca global, sem navegação e sem
   categorias: nenhuma rota de fuga na página de oferta.
2. **Faixa VIP** — barra escura de topo: `OFERTA VIP DA COMUNIDADE LIBERADA — 20% OFF EXCLUSIVO`.
3. **Hero + buying box** — 2 colunas no desktop (`620px` de galeria + bloco de
   compra), empilhado abaixo de `lg`. Ancoragem de preço (`De R$ 664,99` riscado
   → `R$ 531,99` + "Menor Preço do Brasil"), countdown, cupom e CTA.
4. **Selo editorial "Seleção CT em Campo"** — curadoria estática com 3 atributos
   (desempenho, tecnologia, padrão FIFA Quality Pro).
5. **Retenção de lead** — banner da comunidade no WhatsApp.
6. **Sticky CTA bar** — apenas `<768px`, com preço e CTA repetidos.

### Interações implementadas

| Recurso | Comportamento |
|---|---|
| **Countdown** | Regressivo real com tick de 1s a partir de `02d 14h 30m`; ao zerar, congela em `00` e troca o rótulo para "Esta oferta foi encerrada". |
| **Galeria** | 5 vistas em SVG inline. Troca por thumbnail, setas, dots, `←`/`→` no teclado e swipe horizontal no touch. Navegação circular. |
| **Cupom** | Clique copia `canaltech20` (Clipboard API com fallback `execCommand`) e devolve feedback por 2,4s. |
| **Sticky bar** | Revelada quando o CTA principal sai por cima da viewport, com `transform` animado. |
| **CTAs** | Protótipo sem destino real: disparam um toast com `aria-live`. |

O key visual (estádio com refletores + bola em wireframe) é **gerado em SVG no
próprio arquivo** — não há imagem para baixar, então a página nunca abre
quebrada e funciona offline.

#### Decisões de implementação

1. **Sticky bar sem `IntersectionObserver`.** O IO só notifica *mudanças* de
   estado de interseção; um salto de "abaixo da dobra" direto para "acima da
   viewport" (âncora, `scrollTo`, restauração de scroll) não dispara callback
   algum e deixaria a barra presa escondida. A visibilidade é lida do
   `getBoundingClientRect()` em um handler de scroll com `requestAnimationFrame`.
2. **`De R$ 664,99` riscado + `por`.** O mockup de referência repete o valor
   cheio nos dois lados ("De R$ 664,99 por ~~R$ 664,99~~"); aqui o riscado é
   aplicado uma única vez, sobre o preço original, que é o comportamento correto
   de ancoragem.
3. **Legenda "CT EM CAMPO" fora do escudo.** No mockup ela aparece dentro da
   ponta do escudo, onde a silhueta é estreita demais para o texto sem cortar —
   foi movida para logo abaixo do selo.
4. **Countdown não é anunciado a cada segundo.** O bloco visual é `aria-live="off"`;
   um resumo textual paralelo é atualizado só quando o minuto muda.

### Acessibilidade

- Link "pular para a oferta" como primeiro alvo de tabulação.
- Galeria com `role="group"`/`aria-roledescription`, thumbnails em `role="tab"`
  com `aria-selected`/`aria-current` e setas de teclado no palco.
- SVGs das miniaturas marcados como decorativos: o nome acessível vem do texto
  `sr-only` do botão (sem anúncio duplicado).
- Sticky bar sai da ordem de tabulação (`tabindex="-1"` + `aria-hidden`) enquanto
  está escondida.
- Foco visível em todos os controles e `prefers-reduced-motion` respeitado.

### Verificação

Suíte de **42 asserções** em Chromium (Playwright) rodando em 4 viewports
(360×640, 375×667, 768×1024, 1280×900): ausência de erros de JS, ausência de
overflow horizontal, tick do countdown, valores iniciais, troca de imagem por
thumbnail/seta, sincronia dos dots, estado da sticky bar no topo e após o
scroll, cópia do cupom e feedback dos CTAs — **42/42 aprovadas**.

### Regerar os builds autocontidos

```bash
node tools/build-artifact.mjs --standalone ct-em-campo.html ct-em-campo.standalone.html
node tools/build-artifact.mjs             ct-em-campo.html ct-em-campo.artifact.html
```

O script lê o `tailwind.config` inline do arquivo de origem (fonte única de
verdade dos tokens) e compila o CSS com o Tailwind CLI varrendo o próprio HTML —
inclusive as classes que só aparecem dentro das strings do JavaScript.

Com `--standalone` o esqueleto do documento é preservado (incluindo o
`<meta charset>`), gerando um arquivo que abre direto do disco. Sem a flag, o
esqueleto é removido: é o formato que o publicador de Artifacts espera, já que
ele injeta o próprio `<!doctype>`, `<head>` e `<body>`.

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
