import re

with open("../app.js", "r", encoding="utf-8") as f:
    content = f.read()

# Find occurrences of 'moon-icon' or 'moon-phase' or 'luna_'
lines = content.split('\n')
for idx, line in enumerate(lines):
    if any(keyword in line for keyword in ['moon-icon', 'moon-phase', 'logo_luna', 'luna_', 'card-img', 'card_back']):
        print(f"Line {idx+1}: {line.strip()[:120]}")
