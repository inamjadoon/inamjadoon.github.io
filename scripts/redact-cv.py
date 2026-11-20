"""Make the public CV: blank out the phone number from Inam__CV.pdf → public/cv.pdf.

Run after replacing Inam__CV.pdf (needs PyMuPDF: pip install pymupdf):
    python scripts/redact-cv.py
"""
import re
import sys
from pathlib import Path

import pymupdf

root = Path(__file__).resolve().parent.parent
src, out = root / "Inam__CV.pdf", root / "public" / "cv.pdf"

doc = pymupdf.open(src)
hits = 0
for page in doc:
    # Phone number and the "|" separator after it
    text = page.get_text()
    for m in re.finditer(r"\+\d[\d\s()\-]{7,}\d", text):
        for rect in page.search_for(m.group(0)):
            # extend to swallow the following " |" separator
            sep = [r for r in page.search_for("|") if abs(r.y0 - rect.y0) < 2 and 0 <= r.x0 - rect.x1 < 12]
            if sep:
                rect = rect | sep[0]
            page.add_redact_annot(rect, fill=(1, 1, 1))
            hits += 1
    page.apply_redactions(images=pymupdf.PDF_REDACT_IMAGE_NONE)

if hits == 0:
    sys.exit("No phone number found; public/cv.pdf not written.")
doc.save(out, garbage=3, deflate=True)
print(f"Redacted {hits} phone number(s) -> {out.relative_to(root)}")
