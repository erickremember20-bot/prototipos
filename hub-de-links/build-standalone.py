#!/usr/bin/env python3
"""
Gera uma versão de arquivo único do hub de links, com todos os assets
embutidos como data URI. Serve para mandar por e-mail, abrir sem servidor
ou hospedar em qualquer lugar que aceite um HTML solto.

    python3 build-standalone.py            -> hub-de-links-standalone.html

O entregável de produção continua sendo index.html + assets/, que é mais
leve para o navegador (os assets entram em cache separadamente).
"""
import base64
import os
import re
import sys

BASE = os.path.dirname(os.path.abspath(__file__))
SAIDA = os.path.join(BASE, "hub-de-links-standalone.html")
MIME = {".svg": "image/svg+xml", ".png": "image/png",
        ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp"}

ausentes = []


def datauri(nome):
    caminho = os.path.join(BASE, "assets", nome)
    if not os.path.exists(caminho):
        ausentes.append(nome)
        return None
    ext = os.path.splitext(nome)[1].lower()
    with open(caminho, "rb") as f:
        return "data:%s;base64,%s" % (MIME[ext], base64.b64encode(f.read()).decode())


def trocar(m, molde):
    uri = datauri(m.group(1))
    return molde % uri if uri else m.group(0)


with open(os.path.join(BASE, "index.html"), encoding="utf-8") as f:
    s = f.read()

# 1) a concatenação do script vem primeiro, senão o regex genérico a captura
s = s.replace(
    """'<img src="assets/' + s.arquivo + '" alt="" width="' + largura + '" height="24"' +""",
    """'<img src="' + s.arquivo + '" alt="" width="' + largura + '" height="24"' +""")

# 2) nomes de arquivo no array SOCIAIS
s = re.sub(r"arquivo:'([^']+\.svg)'", lambda m: trocar(m, "arquivo:'%s'"), s)

# 3) src estáticos do markup
s = re.sub(r'src="assets/([^"]+)"', lambda m: trocar(m, 'src="%s"'), s)

# 4) o ladrilho do grão é opcional; sem ele sobra só o ruído SVG do CSS
s = s.replace('    url("assets/canaltech-grao-512.png"),\n', '')
s = s.replace('background-size:512px 512px, 240px 240px;', 'background-size:240px 240px;')
s = s.replace('background-repeat:repeat, repeat;', 'background-repeat:repeat;')

# 5) referências a arquivos que não existem
s = re.sub(r'\n<link rel="icon"[^>]*>', '', s)
s = re.sub(r'\n<meta property="og:image"[^>]*>', '', s)

for padrao in ('src="assets/', 'url("assets/', 'href="assets/'):
    if padrao in s:
        sys.exit("ERRO: sobrou referência a %s" % padrao)

with open(SAIDA, "w", encoding="utf-8") as f:
    f.write(s)

print("%s  (%d KB)" % (SAIDA, os.path.getsize(SAIDA) // 1024))
if ausentes:
    print("assets não encontrados (seguem apontando para ./assets/): %s"
          % ", ".join(sorted(set(ausentes))))
