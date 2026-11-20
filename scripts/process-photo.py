"""Prepare the portrait: 4:5 crop, natural film-like grade, light grain, web sizes.

    python scripts/process-photo.py path/to/original.jpg
Writes public/photo.jpg and public/photo.webp (800x1000).
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageEnhance, ImageFilter

root = Path(__file__).resolve().parent.parent
img = Image.open(sys.argv[1]).convert("RGB")
w, h = img.size

# 4:5 crop centred slightly left (the face sits left of centre)
cw = int(h * 0.8)
cx = int(w * 0.45)
left = max(0, min(w - cw, cx - cw // 2))
img = img.crop((left, 0, left + cw, h)).resize((800, 1000), Image.LANCZOS)

# Natural grade: a little less saturation and contrast than the "perfect" original,
# lifted blacks and a faint warm cast, like a real camera file.
img = ImageEnhance.Color(img).enhance(0.86)
img = ImageEnhance.Contrast(img).enhance(0.94)
a = np.asarray(img).astype(np.float32) / 255.0
a = 0.035 + a * 0.955  # lift blacks
a[..., 0] *= 1.015
a[..., 2] *= 0.975

# Fine luminance grain: breaks up overly smooth skin and bokeh
rng = np.random.default_rng(7)
grain = rng.normal(0, 0.022, a.shape[:2])[..., None]
a = np.clip(a + grain, 0, 1)
img = Image.fromarray((a * 255).astype(np.uint8))
img = img.filter(ImageFilter.UnsharpMask(radius=1.2, percent=35, threshold=2))

img.save(root / "public" / "photo.jpg", quality=86, optimize=True, progressive=True)
img.save(root / "public" / "photo.webp", quality=82, method=6)
print("wrote public/photo.jpg and public/photo.webp")
