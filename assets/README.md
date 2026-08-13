# Assets — CT em Campo (Canaltech Ofertas × Netshoes)

Origem: arquivo do Figma `FtcQy17MpdYvRHuysCVNJj` (CT_em_Campo).

Os **vetores já estão aqui** — foram exportados direto do Figma via Plugin API
(`exportAsync` em `SVG_STRING`), então são os arquivos reais da marca, não redesenhos.

As **imagens rasterizadas não estão** e precisam ser exportadas por você: a política
de rede desta sessão bloqueia `figma.com` e `static.figma.com` (403 no CONNECT),
então não há como baixar os bytes daqui.

---

## ✅ Já no repositório

| Arquivo | Dimensão | Uso | Observação |
|---|---|---|---|
| `logo-ct-ofertas.svg` | 160×48 | Header das telas e dos anúncios | Versão clara (`#F6F6F6`), para fundo azul/escuro |
| `logo-ct-icon.svg` | 52×32 | Marca compacta, header mobile | Branco + amarelo `#FFF000` |
| `logo-netshoes.svg` | 160×25 | Logo do parceiro | Versão branca |
| `logo-canaltech-white.svg` | 200×42 | Wordmark Canaltech | Para fundo escuro |
| `logo-motorola-white.svg` | 200×39 | Parceiro alternativo | Para a próxima campanha |
| `icon-lock.svg` | 24×24 | Faixa VIP e CTA | Preenchido, branco |
| `icon-whatsapp.svg` | 24×24 | Banner da comunidade e CTA | Branco |
| `icon-cart.svg` | 20×20 | CTA de conversão (card do WhatsApp) | Traço branco |

Todos usam `fill="white"` ou branco-gelo porque são aplicados sobre azul
`#0039ff`, verde `#009732` ou preto `#141414`. Para fundo claro, troque o `fill`
por `currentColor` e controle pelo CSS.

---

## ⬜ Falta subir — imagens do produto

Exporte do Figma e solte nesta pasta. **Mantenha exatamente estes nomes**, porque
o HTML vai referenciá-los:

| Nome esperado | O que é no Figma | Formato sugerido |
|---|---|---|
| `trionda-hero.jpg` | `KV_TRIONDA 3` — bola sobre o fundo azul com "TRIONDA PRO" | JPG ou WebP, ≥ 1400px de largura |
| `trionda-packshot-01.png` | `Ball1` (1088×1088) — packshot frontal | PNG, 1088px |
| `trionda-packshot-02.png` | `Ball2` (1088×1088) — segunda vista | PNG, 1088px |
| `trionda-packshot-03.png` | `Ball3` (1088×1088) — terceira vista | PNG, 1088px |

O `trionda-hero` é o key visual do topo (desktop, mobile, feed e story).
Os três packshots alimentam as miniaturas da galeria e o card do WhatsApp.

**Como subir pelo navegador:**
<https://github.com/erickremember20-bot/Motorola_01/upload/claude/ct-campo-vip-landing-mu6qxo/assets>

Arraste os arquivos e clique em *Commit changes*. Se preferir outros nomes,
tudo bem — só avise quais, para o HTML apontar para os certos.

---

## Paleta e tipografia (para referência ao montar o HTML)

Marca: `blue-500 #0039ff` · `green-500 #009732` · `yellow-500 #fff000` ·
`gray-500 #141414` · `gray-50 #ffffff`

Tipografia: **Barlow** (ExtraBold / Bold / SemiBold / Regular). Está no Google
Fonts, então não precisa de arquivo aqui — e para build offline já existe uma
versão embutida em base64 em `artifact.html`.

A escala completa de cor e tipo está documentada no README da raiz.
