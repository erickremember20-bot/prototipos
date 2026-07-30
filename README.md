# Motorola x Canaltech — Edição Copa do Mundo

Protótipo interativo da landing page de campanha, implementado a partir do
Figma via MCP.

| | |
|---|---|
| **Figma** | `otFCFq9vy3mUvwLcb11hwf` — página *Campanha — Telas Mobile* |
| **Telas** | `12:43` Lead Capture Form · `12:44` Regras da Promoção · `12:45` Sucesso / Voucher |
| **Stack** | HTML5 + CSS3 + JavaScript ES6 — sem framework, sem dependência, sem build obrigatório |
| **Entregável** | `dist/motorola-copa-landing-page.html` (arquivo único, roda offline) |
| **Responsivo** | 360px (frame do Figma) → desktop |

---

## Como rodar

**Arquivo único** — é só abrir, funciona direto do disco e sem internet:

```
dist/motorola-copa-landing-page.html
```

**Versão modular** (fonte) — usa ES modules, então precisa de um servidor:

```bash
python3 -m http.server 8000   # → http://localhost:8000
```

**Regerar o arquivo único** depois de editar `src/`:

```bash
node build.mjs
```

---

## Estrutura

```
src/
├── styles/
│   ├── fonts.css        Barlow 400/500/600/700 embutida em base64
│   ├── tokens.css       variáveis do Figma → custom properties
│   ├── base.css         reset + shell da página
│   └── components.css   um bloco por símbolo do Figma
└── js/
    ├── lib/             dom · mask (CPF) · validators
    ├── data/            content (toda a cópia) · assets
    ├── icons.js         ícones Phosphor inline
    ├── components/      Button · Input · Checkbox · Brand
    │                    Modal · ModalRules · ModalSuccess · Form
    └── app.js           monta a tela 01 e conecta os modais

build.mjs                gera dist/motorola-copa-landing-page.html
```

---

## Comportamento implementado

### Tela 01 — Lead Capture Form

- **Nome completo** — obrigatório, mínimo de 3 caracteres.
- **E-mail** — validação de formato `user@domain.com`.
- **CPF** — máscara `000.000.000-00` aplicada durante a digitação (preservando
  a posição do cursor) e validação dos 11 dígitos **com dígitos verificadores**,
  rejeitando sequências repetidas.
- **Checkbox 1 (Regulamento)** — obrigatório para liberar o envio.
- **Checkbox 2 (ofertas)** — opcional.
- **CTA** — verde-oliva opaco (`green-900`, opacidade 55%) enquanto houver
  pendência; verde neon (`green-500`) quando tudo estiver válido.
- **Envio** — 500ms de loading com spinner e então a tela 03.
- **Feedback de erro** — ao tentar enviar com dados incompletos, cada campo
  inválido vai para o estado `Error` (borda vermelha, chip de label vermelho,
  ícone de alerta e mensagem auxiliar); o foco vai para o primeiro deles.

> **Nota de implementação — por que `aria-disabled` e não `disabled`**
> O briefing pede o CTA inativo *e* feedback de erro "caso o usuário tente
> clicar com dados incompletos". Um botão com o atributo `disabled` não emite
> clique nenhum, o que tornaria esse feedback inalcançável. O CTA usa
> `aria-disabled="true"`: mantém a aparência inativa e o anúncio correto para
> leitores de tela, mas ainda entrega o clique que acende os erros.

### Tela 02 — Regras da Promoção

- Abre pelo link *"Consulte o regulamento completo."* no rodapé.
- Overlay escuro com `backdrop-filter: blur(6px)`.
- Fecha pelo `X`, pela tecla `ESC` ou por clique fora do modal.
- *"Ler Regulamento Completo em PDF"* abre em nova aba (`noopener,noreferrer`).
- Foco preso dentro do modal enquanto aberto e devolvido ao gatilho ao fechar.

### Tela 03 — Sucesso / Voucher

- Disparada automaticamente após o envio válido.
- Cupom `CANALTECH20` e número da sorte `789456`.
- **Copiar** — clique no cupom chama `navigator.clipboard.writeText`, troca o
  ícone de cópia pelo check duplo e a mensagem vira **"Código copiado com
  sucesso! 🎉"** em verde neon. Volta ao estado inicial após 2,5s para permitir
  copiar de novo. Há fallback via `execCommand` para quando a página é aberta
  em `file://`, onde `navigator.clipboard` não existe.
- *"RESGATAR DESCONTO"* abre o e-commerce da Motorola em nova aba.
- O `X` fecha e **reseta o formulário** da tela 01.

---

## Design tokens

Valores extraídos das variáveis do Figma (`get_variable_defs`):

| Papel | Token | Valor |
|---|---|---|
| Canvas / header / rodapé | `grey-900` | `#080808` |
| Seções (hero, form) | `grey-600` | `#121212` |
| Superfície dos modais | `grey-500` | `#141414` |
| Verde neon (ação principal) | `green-500` | `#abfe02` |
| Verde pressionado / borda | `green-700` | `#79b401` |
| Verde desabilitado | `green-900` | `#486b01` |
| Roxo elétrico | `purple-500` | `#581fff` |
| Roxo pressionado | `purple-700` | `#3e16b5` |
| Erro | `red-500` | `#ed2424` |
| Texto secundário | `grey-100` | `#b6b6b6` |

Tipografia **Barlow** — h1 24/1.2 Bold · h2 20/1.2 Bold · h3 16/1.2 SemiBold ·
body 14/1.5 · small 12/1.5. A fonte vai embutida em base64, então o protótipo
não depende do Google Fonts em tempo de execução.

---

## ✅ Assets de marca

Os três assets de marca estão embutidos no protótipo — vieram do frame `2:651`
("Assets") do mesmo arquivo do Figma e foram integrados via upload direto no
repositório (o host `www.figma.com` é bloqueado pela política de egresso do
ambiente onde este protótipo foi gerado, então o MCP não conseguiu baixar os
bytes diretamente):

| Arquivo em `assets/` | Nó no Figma | Usado em |
|---|---|---|
| `canaltech-white.svg` | `2:691` (`canaltech_white 1`) | 114.286 × 24 |
| `motorola-white.svg` | `2:678` (`motorola_white 1`) | 102.564 × 20 |
| `kv-edge-70-fusion.jpg` | `2:844` (`kv_motorola_02 1`) | 984 × 552 (recomprimido de 1920×1080) |

`node build.mjs` detecta os três, embute cada um como data URI e o arquivo
único continua 100% offline:

```
· asset embutido: assets/canaltech-white.svg
· asset embutido: assets/motorola-white.svg
· asset embutido: assets/kv-edge-70-fusion.jpg
  3/3 assets do Figma embutidos (canaltech, motorola, kv)
```

Se algum dia um desses arquivos for removido de `assets/`, a página não
quebra: cada um tem um fallback desenhado em SVG/CSS na caixa exata do design
(o do key visual reproduz a composição do original — céu lavanda, texto à
esquerda com o lockup motorola | FIFA, gramado com a linha do círculo
central), e nenhuma requisição é disparada. Veja `assets/COMO-EXPORTAR.md`
para reexportar do Figma, nó por nó.

> No mesmo frame há também `2:708` (`motorola_fifa_white 1`, 200 × 142), o
> lockup com o emblema oficial, caso queira usá-lo no lugar do KV.

Os **ícones** (user-check, envelope, trophy, alert, copy, close, check-double,
link, chevron-right, check) foram redesenhados à mão reproduzindo o traço
Phosphor usado no design. Cada um é renderizado na caixa externa definida no
Figma, com o `viewBox` respeitando a proporção do glifo medida pelos insets de
cada nó — as medidas estão documentadas no topo de `src/js/icons.js`.

---

## Ajustes conscientes em relação ao Figma

1. **Tracking de −0,01em** na linha "1 MOTOROLA EDGE 70 FUSION +" e no título
   "Regras da Promoção (Resumo)". Ambos medem 327–329px contra os 328px
   disponíveis no frame de 360px; sem esse ajuste mínimo eles quebram em duas
   linhas, o que não acontece no design.
2. **Chip de label flutuante** aparece só com foco ou valor preenchido. No
   Figma o estado `Default` não tem chip e o `Filled` tem — a transição entre
   os dois é a interpretação em movimento desses dois quadros estáticos.
3. **O `×` do header** (nó `16:18`, nomeado "Icon — fechar") fica *entre* os
   dois logos, então foi tratado como separador de co-branding — decorativo,
   não um botão de fechar.

---

## Verificação

O protótipo foi exercitado em Chromium (Playwright) — 38 checagens cobrindo
estados do CTA, máscara e validação de CPF, os quatro estados do input,
abertura e fechamento dos três caminhos de cada modal, cópia real para a área
de transferência, reset do formulário e ausência de scroll horizontal em 360px
e 1280px. Todas passaram, sem erros de console.
