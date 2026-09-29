/*
  CAFE MYSTIKA CATALOGUE
  ----------------------
  This file holds everything on the home page: the cafe menu, beans, cakes,
  courses, hours and contact details. Trade prices for the "For business"
  page live in trade.js. No coding knowledge needed: change the text between
  the quotes and the numbers, save, and upload.

  Beans, cakes, courses and coaching come from the Trade Catalogue 2026.
  The cafe DRINK menu below is still an estimate: the 2026 catalogues do not
  list walk in drink prices. Everything marked  CONFIRM  must be checked.

  Drink pictures are drawn from "layers" (bottom to top). Each layer has a
  colour and a height (all heights in one drink should add up to about 1).
  To use a real photo instead, add  image: "assets/img/your-photo.jpg"
*/

window.MYSTIKA = {
  business: {
    name: "Cafe Mystika",
    phone: "+639352158822",            // used for Call and SMS orders
    phoneDisplay: "0935 215 8822",
    messenger: "https://m.me/CafeMystika",
    facebook: "https://www.facebook.com/CafeMystika/",
    instagram: "https://www.instagram.com/cafemystika/",
    tripadvisor: "https://www.tripadvisor.com/Restaurant_Review-g3600145-d27734716-Reviews-Cafe_Mystika-Valencia_Negros_Oriental_Negros_Island_Visayas.html",
    email: "angelo.salvoro@gmail.com",  // from the 2026 trade catalogue
    address: "Luzuriaga Street corner Bacong Valencia Road, South Poblacion, Valencia, Negros Oriental 6215",
    mapsQuery: "Cafe Mystika Valencia Negros Oriental",
    openHour: 9,                        // 9 AM   CONFIRM
    closeHour: 22,                      // 10 PM  CONFIRM (some listings say 11 PM)
    timezone: "Asia/Manila",
    currency: "₱"
  },

  // Scrolling announcement bar at the very top. status: true shows the live open or closed text.
  announcements: [
    { status: true, text: "Open daily 9 AM to 10 PM" },
    { text: "Order ahead and skip the line.", href: "#bestsellers", link: "Order now" },
    { text: "Whole cakes from ₱1,250.", href: "#cakes", link: "See cakes" },
    { text: "Courses from ₱2,500, pay in three parts above ₱7,000.", href: "#book", link: "See courses" },
    { text: "Luzuriaga Street, South Poblacion, Valencia.", href: "#visit", link: "Directions" },
    { text: "Run a cafe, hotel or event?", href: "trade.html", link: "Trade prices" }
  ],

  // "Before you go" offer, shown once per visitor when they move to leave the page.
  // Switched OFF until you decide the offer. Set enabled: true to turn it on.
  // Preview it any time by opening the site with ?preview-offer at the end of the address.
  welcomeOffer: {
    enabled: false,                                                       // CONFIRM before switching on
    kicker: "Before you go",
    headline: "10% off your first pickup order",
    text: "Show this code at the counter, or tap below and we add it to your order for you.",
    code: "MYSTIKA10",
    fine: "One time use, first order only, walk in drinks and beans."
  },

  // Menu categories, in the order they appear on the page
  categories: [
    { id: "signature", name: "Signatures" },
    { id: "espresso", name: "Espresso bar" },
    { id: "manual", name: "Pour over" },
    { id: "noncoffee", name: "No coffee" },
    { id: "mocktails", name: "Mocktails" }
  ],

  // Drinks. bestseller: true puts it in the "Most ordered" row.
  menu: [
    {
      id: "spanish-latte", cat: "signature", name: "Spanish Latte", price: 160, bestseller: true,
      desc: "Our house espresso over sweet condensed milk. Creamy, but you still taste the coffee.",
      options: ["Iced", "Hot"],
      layers: [{ c: "#f1e3c8", h: 0.22 }, { c: "#e9d2ad", h: 0.38 }, { c: "#8a5a36", h: 0.3 }], ice: true
    },
    {
      id: "vietnamese", cat: "signature", name: "Iced Vietnamese Coffee", price: 150, bestseller: true,
      desc: "Strong, slow drip style coffee with condensed milk. For people who like it bold.",
      options: ["Iced"],
      layers: [{ c: "#efe0c2", h: 0.2 }, { c: "#5b3720", h: 0.65 }], ice: true
    },
    {
      id: "salted-caramel", cat: "signature", name: "Iced Salted Caramel", price: 170,
      desc: "Espresso, milk and house caramel with a pinch of salt on top.",
      options: ["Iced", "Hot"],
      layers: [{ c: "#c98a3e", h: 0.14 }, { c: "#ecd9b8", h: 0.44 }, { c: "#9a6337", h: 0.28 }], ice: true
    },
    {
      id: "vanilla-latte", cat: "signature", name: "Vanilla Latte", price: 160,
      desc: "Espresso and steamed milk with real vanilla sweetness.",
      options: ["Hot", "Iced"],
      layers: [{ c: "#f4ead6", h: 0.55 }, { c: "#a87445", h: 0.3 }]
    },

    {
      id: "espresso", cat: "espresso", name: "Espresso", price: 90,
      desc: "A double shot of our hand roasted house blend.",
      options: ["Hot"],
      layers: [{ c: "#3f2414", h: 0.45 }, { c: "#b77a45", h: 0.1 }], cup: "demitasse"
    },
    {
      id: "americano", cat: "espresso", name: "Americano", price: 110,
      desc: "Espresso and water. Clean, simple, all coffee.",
      options: ["Hot", "Iced"],
      layers: [{ c: "#4a2a17", h: 0.8 }]
    },
    {
      id: "latte", cat: "espresso", name: "Cafe Latte", price: 140,
      desc: "Espresso and silky milk. Ask the barista to let you pour your own art.",
      options: ["Hot", "Iced"],
      layers: [{ c: "#f3e7d3", h: 0.55 }, { c: "#b07b4b", h: 0.3 }]
    },
    {
      id: "cappuccino", cat: "espresso", name: "Cappuccino", price: 140,
      desc: "Equal parts espresso, milk and thick foam.",
      options: ["Hot"],
      layers: [{ c: "#8e5a33", h: 0.4 }, { c: "#f6eee2", h: 0.35 }], cup: "mug"
    },
    {
      id: "mocha", cat: "espresso", name: "Mocha", price: 160,
      desc: "Espresso, chocolate and milk. Dessert that still wakes you up.",
      options: ["Hot", "Iced"],
      layers: [{ c: "#5a3322", h: 0.25 }, { c: "#c89a78", h: 0.4 }, { c: "#6f4029", h: 0.2 }]
    },

    {
      id: "pour-over", cat: "manual", name: "Pour Over of the Day", price: 180, bestseller: true,
      desc: "Single origin, brewed by hand in front of you. Ask what we roasted this week.",
      options: ["Hot", "Iced"],
      layers: [{ c: "#7a3f1f", h: 0.7 }], cup: "carafe"
    },

    {
      id: "matcha", cat: "noncoffee", name: "Matcha Latte", price: 170, bestseller: true,
      desc: "Whisked matcha over cold milk. Earthy, smooth, not too sweet.",
      options: ["Iced", "Hot"],
      layers: [{ c: "#f2f1e6", h: 0.45 }, { c: "#7fa653", h: 0.35 }], ice: true
    },
    {
      id: "blueberry-milk", cat: "noncoffee", name: "Blueberry Milk", price: 150, bestseller: true,
      desc: "House blueberry compote and cold fresh milk. A favourite for kids and non coffee drinkers.",
      options: ["Iced"],
      layers: [{ c: "#5b3a7a", h: 0.2 }, { c: "#b9a3d6", h: 0.25 }, { c: "#f1ecf6", h: 0.35 }], ice: true
    },
    {
      id: "hibiscus", cat: "noncoffee", name: "Hibiscus Tea", price: 120,
      desc: "Tart, deep red and naturally caffeine free.",
      options: ["Iced", "Hot"],
      layers: [{ c: "#b3163f", h: 0.78 }], ice: true
    },

    {
      id: "guapa", cat: "mocktails", name: "Guapa Mocktail", price: 150, bestseller: true,
      desc: "Our bright, fruity house mocktail. The one regulars keep telling friends about.",   // CONFIRM description
      options: ["Iced"],
      layers: [{ c: "#e84a6f", h: 0.3 }, { c: "#f7a14a", h: 0.45 }], ice: true, cup: "coupe"
    },
    {
      id: "melona", cat: "mocktails", name: "Melona", price: 160,
      desc: "Melon and cream, like the ice bar you grew up with, in a glass.",               // CONFIRM description
      options: ["Iced"],
      layers: [{ c: "#bfe3a1", h: 0.4 }, { c: "#eef7e4", h: 0.35 }], ice: true
    }
  ],

  // Take home coffee, from Bold Side Coffee Co. (Trade Catalogue 2026)
  beans: [
    {
      id: "bean-benguet-1kg", name: "Benguet", brand: "Bold Side Coffee Co.", price: 1200, unit: "1 kg bag",
      desc: "100% Benguet arabica from the Cordillera. Our house special, great as filter or black.",
      notes: ["Single origin", "Philippine arabica"], color: "#111111"
    },
    {
      id: "bean-brusko-1kg", name: "Brusko", brand: "Bold Side Coffee Co.", price: 1150, unit: "1 kg bag",
      desc: "Batangas barako, liberica and excelsa. Strong, bold, proudly local.",
      notes: ["Kapeng barako", "Strong black"], color: "#3a3a38"
    },
    {
      id: "bean-first-light-1kg", name: "First Light", brand: "Bold Side Coffee Co.", price: 1107, unit: "1 kg bag",
      desc: "90 arabica, 10 robusta. Made for lattes and milk drinks at home.",
      notes: ["Espresso", "Milk drinks"], color: "#6e6e69"
    },
    {
      id: "specialty-200g", name: "Specialty single origin", brand: "Bold Side Coffee Co.", price: 870, unit: "200 g bag",
      desc: "A rotating single lot, roasted in small batches. Roast date and cupping notes on every bag.",
      notes: ["Current lot", "Filter or espresso"], color: "#111111"
    },
    {
      id: "wcb", name: "WCB White Cold Brew", brand: "Bold Side Coffee Co.", price: 170, unit: "250 ml bottle",
      desc: "White. Cold. Bold. Arabica and robusta milk blend in a limited edition bottle.",
      notes: ["Ready to drink", "5 for 800"], color: "#f6f6f8", bottle: true
    }
  ],
  beansNote: "All beans are espresso roast unless stated, whole bean or ground free for your brewer. Benguet, Brusko and First Light also come in 500 g and 250 g bags, ask for the price.",

  // Whole cakes from the Cafe Mystika kitchen, 8 by 3 inch. Retail prices from the Trade Catalogue 2026.
  cakes: [
    { id: "cake-mango", name: "Mango Cream Cake", price: 1250, slice: 125, colors: ["#fff4d6", "#ffc94d", "#fff8e8"] },
    { id: "cake-ube", name: "Ube Cream Cake", price: 1350, slice: 135, colors: ["#efe3fa", "#8e5bc2", "#f7f0fc"] },
    { id: "cake-yema", name: "Yema Cake", price: 1350, slice: 135, colors: ["#fff1c9", "#f2c14e", "#fff7e0"] },
    { id: "cake-choco-de-leche", name: "Choco de Leche", price: 1400, slice: 140, colors: ["#6b3b22", "#c99a6b", "#8a5230"] },
    { id: "cake-choco-caramel", name: "Choco Caramel", price: 1400, slice: 140, colors: ["#5a3322", "#d6a04f", "#6f4029"] },
    { id: "cake-mocha-biscoff", name: "Mocha Biscoff", price: 1350, slice: 135, colors: ["#c9a07a", "#8a5a36", "#e3c4a2"] }
  ],
  cakesNote: "Each cake cuts into ten to twelve slices. Custom, celebration and corporate cakes need five working days, message us with the date and a photo.",

  // Things people can book. Prices from the Trade Catalogue 2026, public batch per person.
  services: [
    {
      id: "latte-art", name: "Pour your own latte art", group: "experience",
      price: null, priceLabel: "With any latte",                         // CONFIRM
      duration: "About 15 minutes",
      desc: "Step behind the bar and pour your own heart, tulip or fish with a barista guiding your hand.",
      who: "Walk ins welcome. Book ahead for groups of four or more."
    },
    {
      id: "benchmark", name: "Free Skills Benchmark", group: "experience",
      price: 0, priceLabel: "Free",
      duration: "1 hour, latte art or flair",
      desc: "A coach scores your pour or routine from one to ten on a written sheet you keep, with a plan to improve.",
      who: "Anyone thinking about coaching or competing."
    },
    {
      id: "cupping", name: "Coffee cupping with The Travelling Cupper", group: "experience",
      price: 3500, priceLabel: "per session, up to 6 people",
      duration: "Guided session",
      desc: "Taste Philippine and imported coffees side by side the way roasters and judges do.",
      who: "Friends, teams, coffee curious. Split between six it is under ₱600 each."
    },
    {
      id: "espresso-calibration", name: "Espresso Calibration", group: "course",
      price: 2500, priceLabel: "per person", duration: "1 day",
      desc: "Dose, yield, time and grind. The fastest way to better espresso from the machine you already have.",
      who: "Home baristas and new cafe staff."
    },
    {
      id: "brewing-101", name: "Brewing 101", group: "course",
      price: 5250, priceLabel: "per person", duration: "2 days",
      desc: "Pour over and manual brewing, ratios and water, so the coffee at home tastes like the bar.",
      who: "Home brewers and filter coffee lovers."
    },
    {
      id: "latte-art-101", name: "Latte Art 101", group: "course",
      price: 5250, priceLabel: "per person", duration: "3 days",
      desc: "Milk texturing and the core patterns: heart, tulip and rosetta.",
      who: "Beginners who want the pour, not just the photo."
    },
    {
      id: "barista-101", name: "Barista 101", group: "course",
      price: 7500, priceLabel: "per person", duration: "4 days",
      desc: "The foundation course, from bean origin to espresso, milk and machine care. Finish ready to run a bar.",
      who: "Future baristas and cafe owners."
    },
    {
      id: "mixology-101", name: "Mixology 101", group: "course",
      price: 7500, priceLabel: "per person", duration: "3 days",
      desc: "Spirits, tools, technique and the classic cocktails, taught by The Pinoy Drinker.",
      who: "Future bartenders and home entertainers."
    },
    {
      id: "coaching-single", name: "Open Floor coaching, single session", group: "coaching",
      price: 1000, priceLabel: "per 3 hour session", duration: "Latte art or flair",
      desc: "Train on the studio bar with a WorldSkills coach correcting every pour.",
      who: "Students less 20 percent, weekday mornings less 15 percent."
    },
    {
      id: "coaching-month", name: "Monthly Pass", group: "coaching",
      price: 10000, priceLabel: "20 sessions in 30 days", duration: "Latte art or flair",
      desc: "Sixty coached hours, about ₱167 an hour. Entry and exit scores so you can see yourself improve.",
      who: "Payable in three parts. Bring a friend who buys a pass and get 3 free sessions."
    }
  ],

  // Proof points for the "fair to you, fair to the farmer" section
  promises: [
    { title: "Roast date on every bag", text: "Small batches, about a tonne a month, so what you buy is fresh." },
    { title: "Philippine coffee first", text: "Benguet arabica and Batangas barako sit at the top of our roast ladder." },
    { title: "Priced for Negros, not Makati", text: "Courses from ₱2,500 and installments on anything above ₱7,000, at no interest." }
  ],

  // What guests say. Paraphrased from public Tripadvisor reviews. CONFIRM or replace with exact quotes.
  reviews: [
    { text: "You actually taste the coffee here, not just sugar.", who: "Tripadvisor guest" },
    { text: "The staff let me pour my own latte art and were so patient while others waited.", who: "Tripadvisor guest" },
    { text: "Matcha latte, blueberry milk and pour over were all top notch.", who: "Tripadvisor guest" }
  ]
};
