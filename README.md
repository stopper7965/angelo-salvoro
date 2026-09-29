# Cafe Mystika website

A fast, single page website for Cafe Mystika, Valencia, Negros Oriental. It is built to do three jobs:

1. Get people to **order ahead** (drinks and beans), sent straight to your phone by text or Messenger.
2. Get people to **book** a class, event coffee bar, machine maintenance or a consultation.
3. Get people to **visit**: live "open now" status, one tap directions, one tap call.

No monthly platform fees, no database, no plugins to update. It is plain HTML, CSS and JavaScript, so it loads fast on mobile data and can be hosted for free.

## Change the menu, prices, hours or contact details

The site has two pages:

- `index.html`, the cafe: drinks, beans, whole cakes, courses and coaching, The Travelling Cupper, and a doorway for businesses.
- `trade.html`, **For business**: the full 2026 trade catalogue with a quote builder. Buyers add items, the page applies bean volume bands, pastry tiers, group training rates and coaching discounts automatically, and sends you the request by text, Messenger or email.

Trade prices live in `assets/js/trade.js`. Update the numbers and the `validity` line when you publish a new catalogue.

Open `assets/js/catalog.js` for the home page. Everything customers see about your products lives there:

| What | Where in the file |
| --- | --- |
| Phone, Messenger, address, hours | `business` |
| Drinks and prices (still estimates) | `menu` |
| Beans and cold brew | `beans` |
| Whole cakes | `cakes` |
| Courses, coaching, experiences | `services` |
| Proof points under "Fair to you" | `promises` |
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
trade.html              For business page
assets/js/catalog.js    home page products, services, prices and contact info
assets/js/trade.js      every trade price from the 2026 catalogues
assets/js/core.js       shared: messages, sending, form checks
assets/js/app.js        home page: cart, booking, open now status
assets/js/trade-app.js  For business page: catalogue tables and quote builder
assets/img/             favicon, social share image, Travelling Cupper logo and map
.claude/skills/         design skills (frontend-design, ui-ux-pro-max); not part of the website
```
