# Revenue Institute — Brand & Landing Page Spec

**For the AI reading this:** this is the complete design system for revenueinstitute.com landing pages. Follow it exactly. Every hex value, size, and rule below is deliberate and contrast-verified. Where a rule says "never," treat it as a hard constraint, not a preference. If a requirement conflicts with this file, say so rather than silently deviating.

---

## 1. Who the page is for

Revenue Institute is an AI & RevOps consultancy. We don't advise — we build working systems and then run them.

- **Buyer:** non-technical executives at professional-services firms — managing partners, COOs, CMOs. Law firms first, adjacent professional services second.
- **Their state of mind:** they are not evaluating technology. They are resolving one anxiety — *is this a real firm, or two people and a GPT wrapper who'll vanish after the invoice clears?* Every visual and copy decision either reduces that anxiety or increases it.
- **Their trigger:** they finally got sick of a process that is bleeding money.
- **Core promise:** "Tell us the process you're sick of. We'll map it in two minutes and build the system that ends it."
- **Facts you may use:** typical first build is $10–30k; capacity is 10–15 builds per month; Berry Law is a named client.
- **Never invent** statistics, client names, testimonials, case-study numbers, or results. Use `[PLACEHOLDER]` in brackets instead and flag it.

---

## 2. Color tokens

```css
:root {
  /* Brand — sampled from the logo file. Do not alter. */
  --ri-green:        #12D68E;
  --ri-ink:          #0E0D12;

  /* Light system */
  --ri-white:        #FFFFFF;
  --ri-mist:         #F4F4F6;
  --ri-body:         #3A3944;
  --ri-muted:        #6B6975;
  --ri-hairline:     #E4E3E8;
  --ri-green-wash:   #E6FAF2;
  --ri-alert:        #D93A16;

  /* Interaction */
  --ri-green-hover:  #0FC282;
  --ri-green-press:  #0AAE72;

  /* Dark product surfaces only — app UI, dashboards, screenshots */
  --ri-dark-ground:  #0E0D12;
  --ri-dark-panel:   #17161D;
  --ri-dark-edge:    #2A2833;
  --ri-dark-text:    #F4F4F6;
  --ri-dark-muted:   #9D9BA8;
  --ri-alert-lift:   #FF7A55;
}
```

### What each color is for

| Token | Use |
|---|---|
| `--ri-green` | **Fills only.** Highlight block behind a headline word, primary button, top page rule, label chips, the 10px bar at the top of the page. |
| `--ri-ink` | Headlines, 2px structural rules, full-bleed bands, all dark surfaces. |
| `--ri-white` | Page ground. |
| `--ri-mist` | Alternating section bands. |
| `--ri-body` | Paragraph text, nav links. |
| `--ri-muted` | Captions, meta, eyebrow labels on white. |
| `--ri-hairline` | 1px quiet dividers, card borders. |
| `--ri-green-wash` | Exactly one highlighted column in a comparison table. |
| `--ri-alert` | "Where the process is broken," cost-of-delay callouts. Light grounds only. |

### THE RULE THAT GOVERNS EVERYTHING

**`#12D68E` on white is 1.90:1 contrast. It fails every accessibility standard and looks washed out.**

- ❌ Never green text on white or Mist.
- ❌ Never green icons, thin green rules, green borders under 3px, or green focus rings on light grounds.
- ✅ Always a **green fill with `--ri-ink` text on top** (10.17:1).
- ✅ Green as type is allowed **only** on `--ri-ink` grounds (10.17:1).

### Verified contrast (WCAG AA needs 4.5:1 for text)

| Pair | Ratio |
|---|---|
| Ink on White | 19.36 |
| Body on White | 11.36 |
| Muted on White | 5.38 |
| Ink on Green | 10.17 |
| Ink on Green Hover | 8.35 |
| Ink on Green Press | 6.74 |
| Alert on White | 4.60 |
| Ink on Green Wash | 17.81 |
| Green on Ink | 10.17 |
| Dark Text on Dark Ground | 17.62 |
| Dark Muted on Dark Ground | 7.09 |

### The ratio

Roughly **90% white, 8% ink, 2% green** on any given screen. Green is punctuation — **one green element per viewport**, on the thing you want clicked. If a page feels flat, the fix is a bigger headline or a full-bleed ink band, never more green. Two green elements competing is the most common way this system breaks.

---

## 3. Typography

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;500;600;700;800;900&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&display=swap">
```

```css
--ri-font-display: 'Schibsted Grotesk', system-ui, sans-serif;  /* headings, UI, ALL numbers */
--ri-font-body:    'Source Serif 4', Georgia, serif;            /* body, lead, quotes */
```

**Why the split:** the grotesque does the modern work; the serif body does the trust work. Every AI vendor this buyer compares us to is sans-on-sans — the serif body is what separates us visually. Do not replace the serif with a sans "for consistency."

### Scale

| Role | Family / weight | Size / line-height / tracking |
|---|---|---|
| H1 | Display 900 | 96px / 0.90 / −0.045em |
| H2 | Display 800 | 48px / 0.98 / −0.04em |
| H3 | Display 700 | 26px / 1.25 / −0.01em |
| Lead | Body 400 | 21px / 1.50 |
| Body | Body 400 | 18px / 1.65, max 68ch |
| Small | Body 400 | 15px / 1.55 |
| Eyebrow | Display 800 | 12px / caps / 0.16em tracking |
| Stat | Display 900 | 52px / −0.04em / tabular figures |

Mobile H1 drops to 48px; everything else scales proportionally. All figures use `font-variant-numeric: tabular-nums`.

**Headline rule:** H1 is hand-broken across 2–3 short lines, and the final phrase sits in a green highlight block with ink text. That block is the page's single green moment above the fold.

---

## 4. Layout

- Max width **1280px**, margins **72px** desktop / 48 tablet / 24 mobile.
- **12 columns**, 24px gutters. Hero copy occupies columns 1–7.
- Spacing on multiples of 4: `4, 8, 12, 16, 24, 32, 48, 64, 96, 128`.
- **96px** between sections (56 on mobile). **128px** above/below a full-bleed band (72 on mobile).
- **Border radius: 0.** Everywhere. Buttons, cards, inputs, images.
- **No shadows.** Separation comes from rules and ground, never depth.
- Borders: 1px Hairline (quiet) · 2px Ink (structure) · 3–4px Ink or Alert (emphasis).
- Full-bleed bands are **Ink** or **Mist**. Never a green band.
- Every control at least 44 × 44px.
- Breakpoints: 1280 / 1024 / 768 / 390.

---

## 5. Components

```css
/* Primary button */
.ri-btn { background: var(--ri-green); color: var(--ri-ink); border: 0; border-radius: 0;
  padding: 16px 26px; font-family: var(--ri-font-display); font-size: 15px; font-weight: 800;
  letter-spacing: 0.04em; text-transform: uppercase; cursor: pointer; }
.ri-btn:hover  { background: var(--ri-green-hover); }
.ri-btn:active { background: var(--ri-green-press); }
.ri-btn:disabled { background: var(--ri-hairline); color: var(--ri-muted); }

/* Secondary */
.ri-btn-2 { background: #fff; color: var(--ri-ink); border: 2px solid var(--ri-ink);
  border-radius: 0; padding: 14px 24px; font-family: var(--ri-font-display);
  font-size: 15px; font-weight: 800; letter-spacing: 0.04em; text-transform: uppercase; }
.ri-btn-2:hover { background: var(--ri-ink); color: #fff; }

/* Text link — green highlight on hover, never green letterforms */
.ri-link { color: var(--ri-ink); text-decoration: none; border-bottom: 2px solid var(--ri-ink);
  font-family: var(--ri-font-display); font-weight: 700; }
.ri-link:hover { background: var(--ri-green); border-bottom-color: transparent; }

/* Focus — Ink, because a green ring is invisible on white */
:focus-visible { outline: 2px solid var(--ri-ink); outline-offset: 2px; }

/* Eyebrow chips */
.ri-chip-ink   { background: var(--ri-ink); color: #fff; }
.ri-chip-green { background: var(--ri-green); color: var(--ri-ink); }
/* both: font-display, 12px, 800, 0.16em tracking, uppercase, padding 7px 12px */

/* Headline highlight */
.ri-hl { background: var(--ri-green); color: var(--ri-ink); padding: 0 14px 6px; }

/* Card */
.ri-card { border: 1px solid var(--ri-hairline); border-radius: 0; padding: 24px; background: #fff; }

/* Stat */
.ri-stat { border-top: 3px solid var(--ri-ink); padding-top: 14px; }

/* Alert callout */
.ri-callout { border-left: 4px solid var(--ri-alert); padding: 14px 0 14px 16px; }

/* Form field — label above, always. No placeholder-as-label. */
.ri-input { border: 2px solid var(--ri-ink); border-radius: 0; padding: 13px 14px;
  font-family: var(--ri-font-display); font-size: 16px; width: 100%; }
```

**Comparison tables:** 2px Ink top and bottom rules, 1px Hairline between rows, exactly one column washed in `--ri-green-wash` (ours).

---

## 6. Landing page structure

Use this order unless there's a reason not to. Total should be absorbable in about 20 seconds of scrolling — the previous site failed because it had ~18 content blocks and restated its core answer three different ways.

1. **10px green bar** across the very top of the page.
2. **Nav** — logo left, 3 links max, one primary button right. 2px Ink bottom rule.
3. **Hero** — ink eyebrow chip → H1 with the green highlight block → serif lead (≤2 sentences) → primary button + text link → a dark product screenshot or the price anchor on the right.
4. **Proof band** — full-bleed Ink. Named client, client logos, one capacity or scope line.
5. **The problem, named** — one section. Do not restate it later in different words.
6. **How it works** — one framework only. Never two frameworks side by side.
7. **Comparison table** — one, with the green-wash column.
8. **Case study** — one, specific, with a real named client.
9. **Closing CTA** — full-bleed Ink, single button, no form fields beyond what's essential.

**Never put on a page:** two lead-capture forms, two comparison tables, two frameworks, or a separate objections block *and* an FAQ block. Pick one of each.

---

## 7. Copy voice

- Plain English. No "leverage," "synergy," "transform," "unlock," "empower," "cutting-edge," "seamless."
- No AI jargon: no "agentic," "LLM," "RAG," "orchestration," "workflow automation platform" on customer-facing pages. The buyer is non-technical and suspicious of the category.
- Name the concrete process, not the technology: "the intake email nobody checks until 2pm," not "intelligent document processing."
- Short declaratives. The strongest lines are the ones a competitor would be afraid to write.
- Deliverable language: we build a working system and run it after launch. We are not consultants and we do not hand over a deck.

---

## 8. Starter skeleton

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Revenue Institute</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;500;600;700;800;900&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&display=swap">
  <style>
    /* paste the :root tokens from §2 and the components from §5 here */
    * { box-sizing: border-box; }
    body { margin: 0; background: var(--ri-white); color: var(--ri-body);
           font-family: var(--ri-font-body); font-size: 18px; line-height: 1.65; }
    h1, h2, h3 { font-family: var(--ri-font-display); color: var(--ri-ink); margin: 0; }
    h1 { font-size: 96px; line-height: 0.90; letter-spacing: -0.045em; font-weight: 900; }
    .ri-wrap { max-width: 1280px; margin: 0 auto; padding: 0 72px; }
    .ri-band-ink { background: var(--ri-ink); color: var(--ri-dark-text); }
    @media (max-width: 768px) {
      h1 { font-size: 48px; }
      .ri-wrap { padding: 0 24px; }
    }
  </style>
</head>
<body>
  <div style="height:10px;background:var(--ri-green)"></div>
  <!-- nav, hero, proof band, etc. per §6 -->
</body>
</html>
```

---

## 9. Pre-ship checklist

- [ ] No green text, icons, or thin rules on any light background.
- [ ] Exactly one green element visible per viewport.
- [ ] H1 is 96px desktop and hand-broken; the last phrase is in a green block.
- [ ] Body copy is the serif, at 18px, under a 68-character measure.
- [ ] Zero border-radius and zero box-shadow in the entire stylesheet.
- [ ] Both webfonts self-hosted as woff2 with `font-display: swap` — a failed webfont silently falls back to Helvetica and the whole brand disappears.
- [ ] Every stat, quote, client name, and result is real or bracketed as a placeholder.
- [ ] The page states its core answer once, not three times.
- [ ] Focus states visible and Ink-colored; all controls ≥44px.
- [ ] Page is light. Dark is for product screenshots and full-bleed ink bands only.
