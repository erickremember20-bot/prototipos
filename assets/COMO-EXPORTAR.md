# Como colocar os assets originais

Os 3 arquivos abaixo não puderam ser baixados automaticamente: **todos os hosts
do Figma são negados pela política de egresso do ambiente onde este protótipo
foi gerado** (403 no CONNECT do proxy). Testados: `www.figma.com`, `figma.com`,
`api.figma.com`, `s3-alpha-sig.figma.com`. Como é esse host que serve os assets
do MCP — em `download_assets`, em `get_screenshot` e nas URLs do
`get_design_context` — não há de onde buscar os bytes.

Exportar leva menos de um minuto.

## 1. Abra cada nó no Figma

| Clique para abrir o nó | Salve em `assets/` como | Formato |
|---|---|---|
| [`canaltech_white` — 2:691](https://www.figma.com/design/otFCFq9vy3mUvwLcb11hwf/Motorola_Fifa_Mobile?node-id=2-691) | `canaltech-white.svg` | SVG |
| [`motorola_white` — 2:678](https://www.figma.com/design/otFCFq9vy3mUvwLcb11hwf/Motorola_Fifa_Mobile?node-id=2-678) | `motorola-white.svg` | SVG |
| [`kv_motorola_02` — 2:844](https://www.figma.com/design/otFCFq9vy3mUvwLcb11hwf/Motorola_Fifa_Mobile?node-id=2-844) | `kv-edge-70-fusion.png` | PNG @2x |

Com o nó selecionado: painel **Export** (canto inferior direito) → escolha o
formato → **Export**. Para o KV, use **2x** — ele é exibido em 328 × 184, então
2x garante nitidez em telas retina.

> Os nomes dos arquivos precisam ser exatamente esses.

## 2. Gere o protótipo

```bash
node build.mjs
```

Saída esperada:

```
· asset embutido: assets/canaltech-white.svg
· asset embutido: assets/motorola-white.svg
· asset embutido: assets/kv-edge-70-fusion.png
  3/3 assets do Figma embutidos (canaltech, motorola, kv)
```

Pronto. Cada asset vira um data URI dentro de
`dist/motorola-copa-landing-page.html` — o arquivo continua único e offline,
agora com os originais no lugar dos fallbacks.

Na versão modular (`index.html` + `python3 -m http.server`) nem isso é
necessário: os arquivos são carregados de `assets/` direto, basta dar refresh.

## Alternativa: liberar o host

Se preferir que isso seja automático nas próximas sessões, um admin pode
liberar `www.figma.com` na política de rede do ambiente
(https://claude.ai/admin-settings). Com o host liberado, os assets passam a ser
baixados direto do Figma via MCP, sem exportação manual.

---

Enquanto os arquivos não existirem, cada asset é substituído por um fallback
desenhado em SVG/CSS na caixa exata do design — o do key visual reproduz a
composição do original (céu lavanda, texto à esquerda com o lockup
motorola | FIFA, gramado com a linha do círculo central). Nada quebra e nenhuma
requisição é disparada.

Bônus no mesmo frame `2:651`, se quiser o lockup com o emblema oficial:
[`motorola_fifa_white` — 2:708](https://www.figma.com/design/otFCFq9vy3mUvwLcb11hwf/Motorola_Fifa_Mobile?node-id=2-708) (200 × 142).
