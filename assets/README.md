# Assets — CT OFERTAS (Canaltech Ofertas × Netshoes)

Origem: arquivo do Figma `FtcQy17MpdYvRHuysCVNJj`, página `Projeto`.
**Está tudo aqui** — nada pendente.

## Masters (originais, não usados direto na página)

| Arquivo | Dimensão | Peso |
|---|---|---|
| `hf_20260812_224345_…png` | 2752 × 1536 | 7,8 MB |
| `Ball1.png` · `Ball2.png` · `Ball3.png` | 1088 × 1088 | ~1,3 MB cada |

## Derivados de web — é o que a página carrega

Gerados a partir dos masters (12 MB → 661 KB no total):

| Arquivo | Uso |
|---|---|
| `web/hero-trionda.jpg` (1600px) | Key visual da galeria, slide 1 |
| `web/slide-2..4.jpg` (900px) | Packshots, slides 2 a 4 |
| `web/thumb-1..4.jpg` (240px) | Miniaturas da galeria |

Para regerar depois de trocar um master, veja o bloco de otimização no
histórico do commit que criou esta pasta (Pillow, JPEG progressivo q82/q84).

## Vetores

`logo_ct_ofertas.svg` · `Netshoes_logo.svg` · `badge_curadoria.svg` são usados
como `<img>`, com as cores próprias.

`logo-canaltech-white.svg`, `logo-ct-icon.svg` e `logo-motorola-white.svg` não
entram nesta página — ficam para a próxima campanha e para o header alternativo.

## Ícones

`icons.css` embute os ícones Phosphor (`LockSimple`, `Clock`, `Tag`, `Checks`,
`ShieldCheck`, `Star`, `SealCheck`, `CaretRight`, `whatsapp`) como data URI e os
aplica por máscara CSS, então a cor vem de `currentColor` — o mesmo ícone serve
em branco na faixa VIP e em amarelo no selo. Os `.svg` soltos continuam aqui
como fonte; `cart.svg` e `LockSimpleOpen.svg` são usados só nos anúncios.

## Tipografia

`fonts.css` embute a **Barlow** 400/500/600/700/800 (latin + latin-ext) em
base64. A página não faz nenhuma requisição externa.
