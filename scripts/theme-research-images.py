"""Deterministically recolor existing chart pixels; preserve geometry and alpha.
Run from the repository root with Pillow installed. Never modifies source images.
"""
from pathlib import Path
from PIL import Image
import colorsys

root = Path('src/assets/images')
out = Path('public/research/charts')
out.mkdir(parents=True, exist_ok=True)
# Warm gold, sage, teal, muted blue, lilac, clay: ordered by original hue.
palette = [(214,189,137),(190,204,146),(150,186,141),(133,185,178),(146,169,194),(182,169,204),(200,144,125)]
for filename in ['project2/Trajectories.png', 'project2/Axial_FFT.png', 'project2/q_avg.png', 'project5/fluo_spectra.png']:
    im = Image.open(root / filename).convert('RGBA')
    result=[]
    for r,g,b,a in im.getdata():
        if not a:
            result.append((r,g,b,a)); continue
        hue,sat,val=colorsys.rgb_to_hsv(r/255,g/255,b/255)
        if sat < .15:
            color=(222,232,214)
        elif filename.startswith('project2'):
            color=(178,205,159)
        else:
            color=palette[min(int(hue*len(palette)),len(palette)-1)]
        result.append((*color,a))
    themed=Image.new('RGBA',im.size);themed.putdata(result)
    themed.save(out / Path(filename).name)
