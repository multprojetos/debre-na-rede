"""
Gera ícones PWA para Debre na Rede usando apenas Python padrão.
Execute: python scripts/generate_icons.py
Requer: pip install pillow
"""

import sys
import os

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    print("Instalando Pillow...")
    os.system(f"{sys.executable} -m pip install pillow -q")
    from PIL import Image, ImageDraw, ImageFont

PUBLIC_DIR = os.path.join(os.path.dirname(__file__), '..', 'public')
os.makedirs(PUBLIC_DIR, exist_ok=True)

NAVY  = (13, 27, 62)
GOLD  = (201, 162, 39)
CREAM = (245, 237, 214)

def rounded_rect(draw, xy, r, fill, outline=None, width=1):
    x0, y0, x1, y1 = xy
    draw.rectangle([x0+r, y0, x1-r, y1], fill=fill)
    draw.rectangle([x0, y0+r, x1, y1-r], fill=fill)
    draw.ellipse([x0, y0, x0+2*r, y0+2*r], fill=fill)
    draw.ellipse([x1-2*r, y0, x1, y0+2*r], fill=fill)
    draw.ellipse([x0, y1-2*r, x0+2*r, y1], fill=fill)
    draw.ellipse([x1-2*r, y1-2*r, x1, y1], fill=fill)
    if outline:
        draw.arc([x0, y0, x0+2*r, y0+2*r], 180, 270, fill=outline, width=width)
        draw.arc([x1-2*r, y0, x1, y0+2*r], 270, 360, fill=outline, width=width)
        draw.arc([x0, y1-2*r, x0+2*r, y1], 90, 180, fill=outline, width=width)
        draw.arc([x1-2*r, y1-2*r, x1, y1], 0, 90, fill=outline, width=width)
        draw.line([x0+r, y0, x1-r, y0], fill=outline, width=width)
        draw.line([x0+r, y1, x1-r, y1], fill=outline, width=width)
        draw.line([x0, y0+r, x0, y1-r], fill=outline, width=width)
        draw.line([x1, y0+r, x1, y1-r], fill=outline, width=width)

def make_icon(size):
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    r = int(size * 0.22)
    bw = max(2, int(size * 0.03))

    # Background
    rounded_rect(draw, [0, 0, size, size], r, NAVY, GOLD, bw)

    # Eagle text
    chars = [
        ('🦅', size * 0.44, size * 0.38),
    ]
    try:
        font_big = ImageFont.truetype("arial.ttf", int(size * 0.12))
        font_sm  = ImageFont.truetype("arial.ttf", int(size * 0.08))
    except:
        font_big = ImageFont.load_default()
        font_sm  = ImageFont.load_default()

    # DEBRE text
    text = "DEBRE"
    bbox = draw.textbbox((0,0), text, font=font_big)
    tw = bbox[2] - bbox[0]
    tx = (size - tw) // 2
    draw.text((tx, int(size * 0.68)), text, fill=GOLD, font=font_big)

    text2 = "FC"
    bbox2 = draw.textbbox((0,0), text2, font=font_sm)
    tw2 = bbox2[2] - bbox2[0]
    tx2 = (size - tw2) // 2
    draw.text((tx2, int(size * 0.82)), text2, fill=CREAM, font=font_sm)

    # Eagle (as emoji, may not render on all systems — use circle fallback)
    draw.ellipse([size*0.3, size*0.15, size*0.7, size*0.55], outline=GOLD, width=bw)
    draw.text((size*0.38, size*0.24), "D", fill=GOLD, font=font_big)

    return img

for size in [192, 512, 180]:
    icon = make_icon(size)
    if size == 180:
        path = os.path.join(PUBLIC_DIR, 'apple-touch-icon.png')
    else:
        path = os.path.join(PUBLIC_DIR, f'pwa-{size}x{size}.png')
    icon.save(path, 'PNG')
    print(f"✅ {os.path.basename(path)} ({size}x{size})")

favicon = make_icon(64)
favicon.save(os.path.join(PUBLIC_DIR, 'favicon.ico'), 'ICO')
print("✅ favicon.ico")

print("\n🦅 Ícones gerados! Verifique a pasta public/")
