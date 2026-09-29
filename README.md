# Cafe Mystika website

A fast, single page website for Cafe Mystika, Valencia, Negros Oriental. It is built to do three jobs:

1. Get people to **order ahead** (drinks and beans), sent straight to your phone by text or Messenger.
2. Get people to **book** a class, event coffee bar, machine maintenance or a consultation.
3. Get people to **visit**: live "open now" status, one tap directions, one tap call.

No monthly platform fees, no database, no plugins to update. It is plain HTML, CSS and JavaScript, so it loads fast on mobile data and can be hosted for free.

## Change the menu, prices, hours or contact details

Open `assets/js/catalog.js`. Everything customers see about your products lives there:

| What | Where in the file |
| --- | --- |
| Phone, Messenger, address, hours | `business` |
| Drinks and prices | `menu` |
| Beans and drip bags | `beans` |
| Classes and business services | `services` |
| Promotions | `offers` |
| Reviews | `reviews` |

Search the file for `CONFIRM`. Those lines were filled in from public reviews or as estimates and must be checked against the real catalogue before launch.

To use a real photo for a drink instead of the drawn glass, save the photo in `assets/img/` and add `image: "assets/img/spanish-latte.jpg"` to that drink.

## How orders and bookings reach you

There is no checkout server. When a customer taps **Send order by text**, their phone opens a text message to the number in `business.phone` with the full order already written (items, total, name, pickup time, notes). **Send on Messenger** copies the same message and opens your Facebook page chat. Payment is at the counter.

## Put it online

Any static host works. Free options:

- **Netlify**: drag this folder onto app.netlify.com/drop, then connect the cafemystika.com domain.
- **GitHub Pages**: repository Settings, Pages, deploy from this branch.
- **Cloudflare Pages**: connect the repository, no build command, output folder `/`.

When you upload the site, leave out the `.claude` folder. It holds design tools, not website files.

To preview on your computer: open a terminal in this folder, run `python3 -m http.server`, and visit http://localhost:8000.

## Files

```
index.html              page structure, SEO and Google business data
assets/css/styles.css   design (colours at the top)
assets/js/catalog.js    all products, services, prices and contact info
assets/js/app.js        cart, booking, open now status
assets/img/             favicon and social share image
.claude/skills/         design skills (frontend-design, ui-ux-pro-max); not part of the website
```
