/*
  CAFE MYSTIKA CATALOGUE
  ----------------------
  This is the only file you need to edit to change the menu, beans,
  services, prices, hours and contact details. No coding knowledge needed:
  change the text between the quotes and the numbers, save, and upload.

  Anything marked  CONFIRM  was filled in from public reviews or as a
  starting estimate. Check it against the real catalogue before going live.

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
    email: "",                          // CONFIRM: add an email to show the email option
    address: "Stall 1, Valencia Municipal Food Plaza, Smith St., South Poblacion, Valencia, Negros Oriental 6215",
    mapsQuery: "Cafe Mystika Valencia Negros Oriental",
    openHour: 9,                        // 9 AM   CONFIRM
    closeHour: 22,                      // 10 PM  CONFIRM (some listings say 11 PM)
    timezone: "Asia/Manila",
    currency: "₱"
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

  // Take home coffee
  beans: [
    {
      id: "house-blend", name: "Mystika House Blend", price: 450, unit: "250 g bag",
      desc: "The same beans in your latte. Chocolate, caramel, low acidity. Great for moka pot and espresso.",
      notes: ["Chocolate", "Caramel", "Nutty"], color: "#1c1c22"
    },
    {
      id: "single-origin", name: "Single Origin of the Month", price: 550, unit: "250 g bag",
      desc: "A rotating Philippine or imported lot, roasted light to medium for pour over.",
      notes: ["Fruity", "Floral", "Bright"], color: "#214dd1"
    },
    {
      id: "drip-bags", name: "Drip Bag Pack", price: 250, unit: "box of 5",
      desc: "Tear, hang on your cup, pour hot water. Good coffee at the office or on the road.",
      notes: ["No equipment", "Travel friendly"], color: "#8ea5f3"
    }
  ],

  // Bookable experiences and business services
  services: [
    {
      id: "latte-art", name: "Pour your own latte art", group: "experience",
      price: null, priceLabel: "With any latte",                         // CONFIRM
      duration: "15 minutes",
      desc: "Step behind the bar and pour your own heart, tulip or fish with a barista guiding your hand.",
      who: "Walk ins welcome. Book ahead for groups."
    },
    {
      id: "brewing-101", name: "Brewing 101 class", group: "experience",
      price: null, priceLabel: "Per person, ask for next batch",         // CONFIRM
      duration: "About 2 hours",
      desc: "Learn to brew great coffee at home: grind size, ratios, pour over, French press and moka pot.",
      who: "Beginners, home brewers, gift for a coffee lover."
    },
    {
      id: "barista-night", name: "Barista Night", group: "experience",
      price: null, priceLabel: "Free to join",                           // CONFIRM
      duration: "Friday evenings",
      desc: "Open Q and A with our baristas. Taste, ask anything, try the bar.",
      who: "Anyone curious about coffee."
    },
    {
      id: "mobile-bar", name: "Mobile coffee and mocktail bar", group: "business",
      price: null, priceLabel: "Packages on request",
      duration: "Weddings, birthdays, corporate events",
      desc: "We bring the espresso machine, baristas and a curated drink list to your venue.",
      who: "Events from 30 guests."                                       // CONFIRM
    },
    {
      id: "maintenance", name: "Coffee machine maintenance", group: "business",
      price: null, priceLabel: "Quote after inspection",
      duration: "On site",
      desc: "Deep cleaning, calibration and preventive care so every shot tastes the same all day.",
      who: "Cafes, restaurants, hotels, offices."
    },
    {
      id: "consultation", name: "Cafe business consultation", group: "business",
      price: null, priceLabel: "Book a first call",
      duration: "Concept to opening day",
      desc: "Concept, menu, costing, equipment, workflow and barista training for your own cafe.",
      who: "New and existing cafe owners."
    }
  ],

  // Offers shown on the page. CONFIRM every one before going live.
  offers: [
    { title: "Bring your own cup", text: "₱10 off any drink when you bring a reusable cup." },
    { title: "Refill your bag", text: "Return your empty Mystika bean bag and get ₱30 off the next one." },
    { title: "Tenth cup is on us", text: "Buy 9 handcrafted drinks, the 10th is free. Ask for a stamp card." }
  ],

  // What guests say. Paraphrased from public Tripadvisor reviews. CONFIRM or replace with exact quotes.
  reviews: [
    { text: "You actually taste the coffee here, not just sugar.", who: "Tripadvisor guest" },
    { text: "The staff let me pour my own latte art and were so patient while others waited.", who: "Tripadvisor guest" },
    { text: "Matcha latte, blueberry milk and pour over were all top notch.", who: "Tripadvisor guest" }
  ]
};
