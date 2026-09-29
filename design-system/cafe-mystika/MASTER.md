# Cafe Mystika design system

The source of truth for every page. Tokens live at the top of `assets/css/styles.css`.

## Colour: 60 / 30 / 10

| Share | Role | Tokens |
| --- | --- | --- |
| 60% | Black. Header, hero, menu, learn, The Travelling Cupper, footer | `--black #0a0a0a`, `--black-2 #141414`, `--black-3 #1e1e1e`, `--black-4 #2a2a2a` |
| 30% | White. Product grids, business doorway, reviews, visit, FAQ, forms | `--white #ffffff`, `--paper #f4f4f1` (card surface), `--paper-2 #e9e9e4` |
| 10% | Mustard gold. Primary buttons, prices on black, stars, arcs, active tab line, cart | `--gold #e2ae2a`, `--gold-hover #f0bf45`, `--gold-deep #7a5a0c` (small text on white only) |

Rules:

- A section is dark by default. Add `theme-light` to make it white. Components read `--bg`, `--fg`, `--muted`, `--surface`, `--line` and `--price`, so they work on both without new colour rules.
- Gold is never used for text on white. On white, prices are black.
- One gold button per view is the primary action. Everything else is black on white or white on black.
- Drawers, dialogs and forms are always light, for reading and typing.

## Type

DM Sans only. Headlines 700, tight tracking, sentence case. Body 17px, line height 1.55. Nothing below 14px.

## Layout

- Max width 1240px, 16px side gutter on phones, 32px from 720px.
- Product cards: soft grey card, art on white, name, price bottom left, action bottom right.
- Category filters are a text row with a gold underline on the active item.
- No sideways scrolling at 320px. Every tap target at least 44 by 44px.

## Motion

Subtle only: 180 to 250ms colour and lift on hover, one hero entrance, a slow announcement bar that pauses on hover, focus or its pause button. Everything stops with reduced motion.

## Conversion pieces

- Announcement bar: edit `announcements` in `catalog.js` and `trade.js`.
- Floating Messenger button on desktop, Call, Book and Order bar on phones.
- Join band: new roasts, class batches and events on Messenger.
- Exit offer: `welcomeOffer` in `catalog.js`, off until `enabled: true`. Preview with `?preview-offer`.

## Logos

All in `assets/img/brand/` (plus The Travelling Cupper in `assets/img/`), transparent WebP. Use `-light` on black sections and `-dark` on white.

| Brand | Files | Where |
| --- | --- | --- |
| Cafe Mystika Studio | `studio-wordmark-light-compact` (header), `studio-wordmark-light` / `-dark` (full lockup with tagline) | Header on every page, footer |
| Cafe Mystika | `mystika-mark-light` / `-dark` | Brand row, favicon (`favicon.png`, `apple-touch-icon.png`) |
| Bold Side Coffee Co. | `boldside-light` / `-dark` | Beans section, bean bag labels, brand row |
| Mystique Flavors | `mixology-badge` (round badge, works on both) | Brand row, For business brands grid |
| The Travelling Cupper | `tc-mark-white` / `tc-mark-ink` | Cupper section, brand row |

Keep the logo gold as designed; the interface gold (`--gold`) is for buttons and accents only.
