# How to Add Your Own Formula Image

If you have a formula image (like a screenshot or professionally rendered image), follow these steps:

## Option 1: Use Your PNG/JPG Image

1. **Save your image** as `/mnt/Projects/SIH/prototype/public/images/formula.png`

2. **That's it!** The app will automatically use it.

## Option 2: Use a Different File Name

If your image has a different name:

1. Save it in `/mnt/Projects/SIH/prototype/public/images/`
   - Example: `my-formula.png`

2. Open `/mnt/Projects/SIH/prototype/src/components/MathematicalScoring.tsx`

3. Find this line (around line 26):
   ```tsx
   src="/images/formula.svg"
   ```

4. Change it to:
   ```tsx
   src="/images/my-formula.png"
   ```

5. Save the file (hot reload will update automatically)

## Image Requirements

**Recommended:**
- **Format**: PNG with transparent background (or SVG)
- **Width**: 400-600 pixels
- **Height**: 40-80 pixels
- **Resolution**: 2x for retina displays (800-1200px wide)

**Acceptable:**
- JPG (will have white/colored background)
- GIF (not recommended, no transparency)

## Current Formula Display

The formula currently shows:

```
Score_i = α(Ŵ_i / W_rem) + β(V̂_i / V_rem) - γ(D_i / D_max) - δ(T_i / T_max)
```

Where:
- Ŵ = W with hat symbol (estimated weight)
- V̂ = V with hat symbol (estimated volume)
- α, β, γ, δ = Greek letters (coefficients)
- Subscripts: i, rem, max

## Tips

1. **White background**: If your image has a white background, it will show on dark mode. To avoid this, use a PNG with transparent background.

2. **Dark mode support**: The current SVG inverts colors in dark mode. If you use your own image, you may want to:
   - Use an image that works on both light and dark backgrounds
   - Or remove the `dark:invert` class from the img tag

3. **Size adjustment**: If your image is too large or small, adjust the `maxHeight` style:
   ```tsx
   style={{ maxHeight: '60px' }}  // Change this value
   ```

## Quick Copy-Paste Command

To add your formula image (assuming it's on your desktop):

```bash
# Copy from desktop to project
cp ~/Desktop/your-formula-image.png /mnt/Projects/SIH/prototype/public/images/formula.png
```

Then refresh your browser!

## Verify It's Working

1. Open http://localhost:3000
2. Scroll to "Mathematical Scoring Engine"
3. You should see your formula image

---

**Need help?** Check that:
- File is in `/public/images/` folder
- File name matches what's in the component
- File format is supported (png, jpg, svg, gif)
- Browser cache is cleared (Ctrl+F5 or Cmd+Shift+R)
