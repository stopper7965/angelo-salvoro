/*
  CAFE MYSTIKA TRADE CATALOGUE 2026 (web version)
  -----------------------------------------------
  Every price on the "For business" page comes from this file.
  Source: Trade Catalogue 2026 v5.1, the Cafes and Bars, Hotels and Restaurants
  and Event Organizers trade cards, and the Institutional Catalogue CAT 2026 001.

  To update prices next year: change the numbers here, change "validity", save, upload.

  Price types used by the quote builder:
    bands   beans, price set by the TOTAL kilos of beans in one quote (5 bands)
    tiers   price set by the quantity of that one item  [{ min, price, label }]
    course  closed rate or public batch per person, group discount on closed rate
    coach   per athlete, "book together" discount when group: true
    fixed   price x quantity
    quote   no published price, quoted per job
*/

window.MYSTIKA_TRADE = {
  validity: "Prices effective 1 September 2026, valid to 31 December 2026, unless a written quotation says otherwise.",
  installments: "Anything above PHP 7,000 can be split into three payments at no interest and no added fee.",

  credentials: [
    "TESDA National TVET Trainer and Assessor, NTTC holder",
    "NTTC in Food and Beverage Services, Barista and Bartending",
    "NC II in Bartending, Food and Beverage Services and Barista",
    "WorldSkills Philippines National Coach",
    "Bachelor's degree in Hospitality Management, seven years teaching",
    "About ten years in F and B, six years running cafes and cafe supply",
    "Roastery moving about one tonne of beans a month"
  ],

  brands: [
    { name: "Cafe Mystika Studio", does: "Training, consultancy and supply" },
    { name: "Bold Side Coffee Co.", does: "Small batch roastery and wholesale beans" },
    { name: "Cafe Mystika", does: "Coffee bar, pastry kitchen and mobile coffee catering" },
    { name: "Mystique Flavors", does: "Mobile bar and event beverage stations" },
    { name: "Meraki Machine", does: "Espresso equipment, installation and service" },
    { name: "The Travelling Cupper", does: "Philippine origins and cupping" },
    { name: "The Pinoy Drinker", does: "Bar craft, spirits and mixology" }
  ],

  // Who the page speaks to. "picks" are item ids from the sections below.
  audiences: [
    {
      id: "cafes", name: "Cafes and bars",
      headline: "The cup is the business. Everything else is decoration.",
      lead: "The coffee tastes different every week, your staff pour worse than the shop down the road, and you are busy but not making money. Those three arrive together, so we fix them together.",
      picks: ["course-espresso-calibration", "plan-care-lite", "pkg-starter"],
      jump: ["coffee", "pastry", "machine", "training", "coaching", "consultancy", "support"]
    },
    {
      id: "hotels", name: "Hotels, resorts and restaurants",
      headline: "Coffee is not your business. It is still on your bill.",
      lead: "Guests judge the property by the breakfast cup, the wine service and whether the machine worked the morning the tour group checked out. We take that part off your desk under one account.",
      picks: ["pkg-floor", "plan-house", "consult-ops"],
      jump: ["coffee", "pastry", "machine", "training", "events", "consultancy"]
    },
    {
      id: "events", name: "Event organizers and coordinators",
      headline: "You are only as good as your worst supplier.",
      lead: "Your client remembers the twenty minute queue at the bar, not the supplier's name. Staffed coffee, cocktail, dry and matcha bars with your 10 percent coordinator share already inside the published price.",
      picks: ["ev-signature-main", "ev-signature-station", "ev-hour"],
      jump: ["events", "support"]
    },
    {
      id: "schools", name: "Colleges, schools and LGUs",
      headline: "Graduates who have pulled two hundred shots, not just read about one.",
      lead: "Faculty trained first so the capability stays with you, students certified in cohorts, a competition squad, laboratory design and servicing, and OJT placement at no fee.",
      picks: ["inst-diagnostic", "inst-track-2", "inst-ojt"],
      jump: ["schools", "training", "seminars", "machine"]
    }
  ],

  sections: [
    /* ---------------- 01 COFFEE ---------------- */
    {
      id: "coffee", no: "01", brand: "Bold Side Coffee Co.", title: "Coffee",
      intro: "Thirteen roasted profiles from single origin Benguet arabica down to full robusta, built as a ladder so you pick the exact point where cup quality meets your drink price. Espresso roast, sold by the kilo in 1 kg, 500 g and 250 g bags.",
      note: "One kilo gives you roughly 50 to 55 double shots. On The Game Changer that is about PHP 18 of coffee in a PHP 120 to 160 drink. On Benguet it is about PHP 23.",
      groups: [
        {
          title: "Roasted bean ladder, price per kilo by order band",
          kind: "bands",
          bandLabels: ["1 to 9 kg", "10 to 29 kg", "30 to 49 kg", "50 to 99 kg", "100 kg and up"],
          unit: ["kg", "kg"], qty: 5,
          items: [
            { id: "bean-benguet", name: "Benguet", detail: "100% Benguet Arabica, Cordillera. Single origin filter, house special", bands: [1200, 1195, 1190, 1185, 1180] },
            { id: "bean-brusko", name: "Brusko", detail: "Batangas Barako, Liberica and Excelsa. Local identity menu, strong black", bands: [1150, 1145, 1140, 1135, 1130] },
            { id: "bean-vn-arabica", name: "Vietnam Arabica", detail: "Grade 1 Catimor, Lam Dong. Clean espresso base", bands: [1135, 1130, 1125, 1120, 1115] },
            { id: "bean-first-light", name: "First Light", detail: "90 Arabica / 10 Robusta. Premium milk drinks", bands: [1107, 1102, 1097, 1092, 1087] },
            { id: "bean-arise", name: "Arise", detail: "80 / 20. Specialty leaning house blend", bands: [1079, 1074, 1069, 1064, 1059] },
            { id: "bean-ascend", name: "Ascend", detail: "70 / 30. Balanced daily house blend", bands: [1056, 1051, 1046, 1041, 1036] },
            { id: "bean-reward", name: "Reward", detail: "60 / 40. Milk forward menus", bands: [1038, 1033, 1028, 1023, 1018] },
            { id: "bean-yinyang", name: "YinYang", detail: "50 / 50. Mid market cafes", bands: [1021, 1016, 1011, 1006, 1001] },
            { id: "bean-drive", name: "Drive", detail: "40 / 60. High volume, value pricing", bands: [998, 993, 988, 983, 978] },
            { id: "bean-ignition", name: "Ignition", detail: "30 / 70. Iced and blended drinks", bands: [975, 970, 965, 960, 955] },
            { id: "bean-game-changer", name: "The Game Changer", detail: "20 / 80. Best seller. Milk tea shops, kiosks, volume bars", bands: [952, 947, 942, 937, 932], badge: "Best seller" },
            { id: "bean-wildlands", name: "The Wildlands", detail: "10 / 90. Aggressive crema, iced menus", bands: [935, 930, 925, 920, 915] },
            { id: "bean-vn-robusta", name: "Vietnam Robusta", detail: "100% Robusta, Lam Dong. Lowest cost per cup", bands: [918, 913, 908, 903, 898] }
          ],
          footnote: "Band is set by total kilos on one order, mixed profiles count together. The quote builder applies the band for you."
        },
        {
          title: "What each band unlocks",
          kind: "list",
          rows: [
            ["Band 1, 1 to 9 kg", "Roast date guarantee, written starting recipe, phone support"],
            ["Band 2, 10 to 29 kg", "Plus one grinder calibration visit per quarter and free delivery in Valencia and Dumaguete"],
            ["Band 3, 30 to 49 kg", "Plus one machine check up per quarter, priority stock, one free seat a year on any public class"],
            ["Band 4, 50 to 99 kg", "Plus the CARE maintenance plan free for one machine and one grinder, 10 percent off parts"],
            ["Band 5, 100 kg and up", "Plus a named account manager, a custom house blend at no development fee, two free class seats a year, a yearly menu costing review"]
          ]
        },
        {
          title: "200 g roasted specialty, per bag",
          kind: "items", unit: ["bag", "bags"],
          head: ["Line", "Price"],
          items: [
            { id: "specialty-200", name: "Specialty single origin, current lot", detail: "Roast date and cupping notes on every bag. Suggested retail PHP 1,050 to 1,200", type: "tiers", tiers: [{ min: 1, price: 870, label: "single bag" }, { min: 12, price: 810, label: "trade, 12 bags" }, { min: 24, price: 750, label: "wholesale base, 24 bags standing" }], qty: 12 },
            { id: "specialty-micro", name: "Micro lot and competition lot", detail: "Limited allocation, standing accounts first", type: "quote", qty: 1 }
          ]
        },
        {
          title: "WCB White Cold Brew, bottled 250 ml",
          kind: "items", unit: ["bottle", "bottles"],
          head: ["Line", "Price"],
          items: [
            { id: "wcb", name: "White Cold Brew 250 ml", detail: "Arabica and robusta milk blend, limited edition labels. Grab and go, no barista labour", type: "tiers", tiers: [{ min: 1, price: 170, label: "1 to 4 bottles" }, { min: 5, price: 160, label: "5 to 9 bottles" }, { min: 10, price: 150, label: "10 bottles and up" }], qty: 10, footnote: "24 bottles and up per delivery is quoted with a shelf price recommendation." }
          ]
        },
        {
          title: "Grind, pack and tasting",
          kind: "items", unit: ["job", "jobs"],
          head: ["Service", "Price"],
          items: [
            { id: "grind-free", name: "Pre ground to your brew method", detail: "Ordered with beans", type: "free" },
            { id: "pack-retail", name: "Packing into 250 g or 500 g retail bags", detail: "With valve and label", type: "fixed", price: 25, unit: ["bag", "bags"], qty: 50 },
            { id: "pack-own-label", name: "Your own shop label applied", detail: "Minimum 50 bags", type: "fixed", price: 35, unit: ["bag", "bags"], qty: 50, min: 50 },
            { id: "cup-guided", name: "Coffee cupping, guided", detail: "Up to 6 people. Credited in full against a 30 kg order within 30 days", type: "fixed", price: 3500, unit: ["session", "sessions"] },
            { id: "cup-espresso", name: "Espresso tasting across the ladder", detail: "Up to 6 people. Credited against a 30 kg order within 30 days", type: "fixed", price: 3000, unit: ["session", "sessions"] },
            { id: "cup-appreciation", name: "Coffee appreciation for service staff", detail: "Up to 10 people. Credited against a 30 kg order within 30 days", type: "fixed", price: 4500, unit: ["session", "sessions"] }
          ]
        }
      ],
      terms: "Standing accounts order by Wednesday for delivery the following week. Opening orders are payment first. Free delivery in Valencia and Dumaguete City from Band 2. Siquijor, Bohol and Dipolog on a scheduled run."
    },

    /* ---------------- 02 PASTRY ---------------- */
    {
      id: "pastry", no: "02", brand: "Cafe Mystika Kitchen", title: "Pastry and cakes",
      intro: "Baked at Cafe Mystika and delivered to your display chiller. A customer who buys coffee and food spends roughly double the one who buys coffee alone.",
      note: "Buy the Biscoff Brownie at PHP 65, sell it at PHP 120, keep PHP 55 on a product you did not bake, staff or throw away. Twenty a day is about PHP 33,000 a month of margin.",
      groups: [
        {
          title: "Muffins, per piece",
          kind: "items", unit: ["pc", "pcs"], tierHead: ["Under 24", "24 pcs", "48 standing"], retail: true,
          items: [
            ["pastry-banana", "Banana Chocochip", 59, 52, 45, "75 to 90"],
            ["pastry-double-choco-muffin", "Double Choco", 65, 58, 50, "85 to 100"],
            ["pastry-red-velvet-muffin", "Red Velvet White Chocochip", 65, 58, 50, "85 to 100"],
            ["pastry-biscoff-muffin", "Biscoff Muffin", 72, 63, 55, "95 to 110"],
            ["pastry-mango-cinnamon", "Mango Cinnamon", 65, 58, 50, "85 to 100"],
            ["pastry-matcha-muffin", "Matcha and White Chocochip", 65, 58, 50, "85 to 100"],
            ["pastry-ube", "Ube Pastillas", 65, 58, 50, "85 to 100"],
            ["pastry-calamansi", "Calamansi Muffin", 65, 58, 50, "85 to 100"]
          ]
        },
        {
          title: "Bars, per piece",
          kind: "items", unit: ["pc", "pcs"], tierHead: ["Under 24", "24 pcs", "48 standing"], retail: true,
          items: [
            ["pastry-brownies", "Brownies", 72, 63, 55, "95 to 110"],
            ["pastry-biscoff-brownies", "Biscoff Brownies", 85, 75, 65, "110 to 130"],
            ["pastry-butterscotch", "Butterscotch", 46, 40, 35, "60 to 75"],
            ["pastry-revel", "Revel Bars", 78, 69, 60, "100 to 120"],
            ["pastry-crinkles", "Choco Crinkles", 46, 40, 35, "60 to 75"]
          ]
        },
        {
          title: "Cookies, per piece",
          kind: "items", unit: ["pc", "pcs"], tierHead: ["Under 24", "24 pcs", "48 standing"], retail: true,
          items: [
            ["pastry-chocochip", "Chocochip", 78, 69, 60, "100 to 120"],
            ["pastry-smores", "S'mores Cookies", 85, 75, 65, "110 to 130"],
            ["pastry-red-velvet-cookie", "Red Velvet", 85, 75, 65, "110 to 130"],
            ["pastry-double-choco-cookie", "Double Choco Cookies", 85, 75, 65, "110 to 130"],
            ["pastry-matcha-cookie", "Matcha Cookies", 85, 75, 65, "110 to 130"]
          ]
        },
        {
          title: "Whole cakes, 8 by 3 inch",
          kind: "items", unit: ["cake", "cakes"], tierHead: ["1 cake", "2 cakes", "4 standing"], retail: true, cakes: true,
          items: [
            ["cake-mango", "Mango Cream Cake", 900, 825, 750, "1,250 whole, 125 a slice"],
            ["cake-ube", "Ube Cream Cake", 960, 880, 800, "1,350 whole, 135 a slice"],
            ["cake-yema", "Yema Cake", 960, 880, 800, "1,350 whole, 135 a slice"],
            ["cake-choco-de-leche", "Choco de Leche", 1020, 935, 850, "1,400 whole, 140 a slice"],
            ["cake-choco-caramel", "Choco Caramel", 1020, 935, 850, "1,400 whole, 140 a slice"],
            ["cake-mocha-biscoff", "Mocha Biscoff", 960, 880, 800, "1,350 whole, 135 a slice"]
          ],
          footnote: "Custom, celebration and corporate cakes are quoted per job with five working days lead time."
        }
      ],
      terms: "Standing weekly orders lock by Wednesday. Free delivery from PHP 1,500 in Valencia and Dumaguete City. Wholesale base needs four consecutive weeks of orders. No returns for slow sales, quality claims on the day with a photo. New accounts pay on delivery for the first four deliveries. Street level exclusivity available with a volume commitment."
    },

    /* ---------------- 03 MACHINE CARE ---------------- */
    {
      id: "machine", no: "03", brand: "Meraki Machine", title: "Machine care",
      intro: "Espresso machine and grinder service by our technician team. Every job starts with a written diagnostic and an action plan you approve before we charge for repair. We check water and power first, because most failures here are water and power problems wearing a machine costume.",
      note: "A machine down for three days in a busy shop costs more than a decade of preventive maintenance.",
      groups: [
        {
          title: "Service and repair, labour",
          kind: "items", unit: ["job", "jobs"], head: ["Service", "Price"],
          items: [
            { id: "m-overhaul-1", name: "Single group overhaul", detail: "Three to ten days. Full internal and external overhaul, descale, gasket, rewiring, handover test", type: "fixed", price: 10000 },
            { id: "m-overhaul-2", name: "Double group overhaul", detail: "Same scope, double group", type: "fixed", price: 15000 },
            { id: "m-checkup-1", name: "Check up, single group", type: "fixed", price: 1000 },
            { id: "m-checkup-2", name: "Check up, double group", type: "fixed", price: 1500 },
            { id: "m-grinder-cal", name: "Grinder calibration", type: "fixed", price: 2000 },
            { id: "m-machine-cal", name: "Machine calibration", type: "fixed", price: 3000 },
            { id: "m-install", name: "Machine installation", type: "fixed", price: 1500 },
            { id: "m-deep-external", name: "Deep external check", type: "fixed", price: 1500 },
            { id: "m-trouble", name: "Machine trouble call", type: "fixed", price: 1500 },
            { id: "m-wiring-check", name: "Wiring connection check", type: "fixed", price: 1000 },
            { id: "m-wiring-trouble", name: "Wiring troubleshooting", type: "fixed", price: 3000 },
            { id: "m-electrical", name: "Electrical failure diagnosis", type: "fixed", price: 2000 },
            { id: "m-overheat", name: "Machine overheat reset", type: "fixed", price: 3000 },
            { id: "m-contact", name: "Loss of contact repair", type: "fixed", price: 1500 },
            { id: "m-parts", name: "Parts replacement, labour", type: "fixed", price: 1500 },
            { id: "m-wear", name: "Wear and tear replacement", type: "fixed", price: 1500 }
          ],
          footnote: "Parts at cost plus handling, shown to you before installation. Repairs carry a 30 day workmanship warranty on the fault repaired."
        },
        {
          title: "Call out fee, per trip",
          kind: "list",
          rows: [
            ["Valencia and Dumaguete City", "No charge"],
            ["Elsewhere in Negros Oriental", "PHP 1,000"],
            ["Siquijor, Bohol, Dipolog and off island", "Actual fare and accommodation at cost"],
            ["Any location, on an active maintenance plan", "No charge"]
          ],
          footnote: "Two or more shops in the same town booking the same day split one call out fee."
        },
        {
          title: "Preventive maintenance plans",
          kind: "plans", unit: ["year", "years"],
          items: [
            { id: "plan-care-lite", name: "CARE LITE", price: 6500, per: "per year, or PHP 1,700 a quarter", type: "fixed", points: ["Two visits a year, one machine and one grinder", "Full check up and grinder calibration each visit", "Scale and water condition report", "No call out fee anywhere we serve"] },
            { id: "plan-care", name: "CARE", price: 12000, per: "per year, or PHP 3,200 a quarter", type: "fixed", featured: true, points: ["Four visits a year", "Everything in CARE LITE", "Deep external check each visit", "5 percent off all parts", "One free Espresso Calibration seat a year"] },
            { id: "plan-care-plus", name: "CARE PLUS", price: 26000, per: "per year, or PHP 6,800 a quarter", type: "fixed", points: ["Monthly light service plus quarterly deep service", "Priority response inside 48 hours", "One free trouble call per quarter", "10 percent off all parts"] },
            { id: "plan-house", name: "House account", price: 50000, from: true, per: "per year and up, quoted after a free site survey", type: "quote", points: ["Every machine and grinder on the property", "Asset register and a named technician", "Response inside 24 hours", "Annual staff refresher and quarterly written report"] }
          ],
          footnote: "Machines and grinders supplied through Meraki Espresso PH with installment plans for qualified accounts. Installation, first calibration and staff handover included on every machine we sell."
        }
      ]
    },

    /* ---------------- 04 TRAINING ---------------- */
    {
      id: "training", no: "04", brand: "Cafe Mystika Studio", title: "Training and certification",
      intro: "Delivered by a TESDA National TVET Trainer and Assessor and WorldSkills Philippines National Coach, at our studio in Valencia or at your site. Every course includes a printed manual your shop keeps, all consumables, a practical assessment, a certificate and 30 days of follow up questions.",
      note: "If you can only afford one thing, buy Espresso Calibration. One day, PHP 2,500 on a public batch, and it changes what comes out of your machine tomorrow morning.",
      groups: [
        {
          title: "Coffee courses, per person",
          kind: "courses", unit: ["person", "people"],
          items: [
            ["course-barista-101", "Barista 101", 4, "The foundation. A hire who finishes this can run your bar unsupervised.", 10000, 7500],
            ["course-latte-art-101", "Latte Art 101", 3, "Milk texturing and the core patterns.", 7000, 5250],
            ["course-latte-art-102", "Latte Art 102", 4, "Advanced patterns, consistency under pressure, competition prep.", 8000, 6000],
            ["course-brewing-101", "Brewing 101", 2, "Manual brew methods, ratios, water, and pricing filter coffee.", 7000, 5250],
            ["course-brewing-102", "Brewing 102", 3, "Extraction control, recipe building, brew bar design.", 8000, 6000],
            ["course-espresso-calibration", "Espresso Calibration", 1, "Dose, yield, time, grind and recipe recovery. The right first purchase.", 3000, 2500],
            ["course-sensory", "Coffee Sensory Course", 2, "Structured tasting, defects, and words to describe your coffee.", 5000, 3750],
            ["course-good-spirits", "Coffee in Good Spirits", 3, "Coffee and alcohol together. An evening menu for cafes that close at six.", 10000, 7500]
          ]
        },
        {
          title: "Bar and spirits courses, per person",
          kind: "courses", unit: ["person", "people"],
          items: [
            ["course-mixology-101", "Mixology 101", 3, "Spirits, tools, technique, classic builds, bar setup and flow.", 10000, 7500],
            ["course-mixology-102", "Mixology 102", 3, "House ingredients, menu design and competition work.", 15000, 11250],
            ["course-flair-101", "Flairtending 101", 5, "Working flair for a real service bar.", 10000, 7500],
            ["course-flair-102", "Flairtending 102", 10, "Competition and show level flair.", 15000, 11250]
          ]
        },
        {
          title: "Appreciation and category courses, per person",
          kind: "courses", unit: ["person", "people"],
          items: [
            ["course-wine", "Wine Appreciation", 2, "Restaurant floor staff, resorts, fine dining service.", 5000, 3750],
            ["course-high-tea", "High Tea Appreciation", 2, "Hotels, resorts, afternoon tea service.", 5000, 3750],
            ["course-matcha", "Matcha Course", 2, "Cafes and milk tea shops adding a matcha line.", 5000, 3750],
            ["course-milk-tea", "Milk Tea Course", 2, "Milk tea shops, kiosks, boba operations.", 5000, 3750]
          ]
        },
        {
          title: "Group rates on the closed rate",
          kind: "list",
          rows: [["1 to 4 people", "Closed rate"], ["5 to 9 people", "Less 15 percent"], ["10 to 15 people", "Less 20 percent"], ["16 people and above", "Less 25 percent"]],
          footnote: "Public batch is an open class shared with other shops at 25 percent less. Closed rate is your team only, on your dates, adjusted to your menu. The quote builder applies the group rate for you."
        },
        {
          title: "Training at your site",
          kind: "list",
          rows: [["Valencia and Dumaguete City", "No charge"], ["Elsewhere in Negros Oriental", "PHP 2,000 per training day"], ["Siquijor, Bohol, Dipolog", "PHP 3,500 per day plus fare and accommodation"], ["Rest of the Philippines", "Quoted"]]
        }
      ],
      terms: "Fifty percent deposit confirms the date, or the first of three installments. Rescheduling is free with seven days notice. One free reassessment if a participant does not pass first time."
    },

    /* ---------------- 04b COACHING ---------------- */
    {
      id: "coaching", no: "04b", brand: "Cafe Mystika Studio", title: "Coaching, latte art and flair",
      intro: "A course teaches the skill. Coaching makes you good at it. Open Floor sessions on the studio bar with a WorldSkills coach watching, a benchmark score at the start and another at the end, like a gym. Your first one hour Skills Benchmark is free.",
      note: "Five staff on a Monthly Pass is PHP 40,000 instead of PHP 50,000. That is sixty hours of coached practice each, the cheapest way to lift a whole bar at once.",
      groups: [
        {
          title: "Open Floor, per athlete",
          kind: "items", unit: ["athlete", "athletes"], head: ["Block", "Price"],
          items: [
            { id: "coach-benchmark", name: "Skills Benchmark, 1 hour", detail: "Scored one to ten on a written sheet you keep", type: "free" },
            { id: "coach-single", name: "Single session", detail: "One 3 hour session", type: "coach", price: 1000 },
            { id: "coach-day", name: "Full day", detail: "One 8 hour day", type: "coach", price: 1900 },
            { id: "coach-week", name: "1 Week Pass", detail: "6 sessions of 3 hours inside 7 days", type: "coach", price: 4200, group: true },
            { id: "coach-15", name: "15 Day Pass", detail: "12 sessions of 3 hours inside 15 days", type: "coach", price: 7200, group: true },
            { id: "coach-month", name: "Monthly Pass", detail: "20 sessions of 3 hours inside 30 days. The default", type: "coach", price: 10000, group: true }
          ],
          footnote: "Booking passes together: 2 athletes less 10 percent, 3 to 4 less 15, 5 to 8 less 20, 9 and up less 25. Applied automatically in your quote."
        },
        {
          title: "One to one, coach on you alone",
          kind: "items", unit: ["athlete", "athletes"], head: ["Block", "Price"],
          items: [
            { id: "coach-11-single", name: "Single session, 3 hours", type: "fixed", price: 2500 },
            { id: "coach-11-day", name: "Full day, 8 hours", type: "fixed", price: 4800 },
            { id: "coach-11-week", name: "1 Week Pass", type: "fixed", price: 10500 },
            { id: "coach-11-15", name: "15 Day Pass", type: "fixed", price: 18000 },
            { id: "coach-11-month", name: "Monthly Pass", type: "fixed", price: 25000 },
            { id: "coach-podium", name: "Podium Track, three months", detail: "Unlimited Open Floor, six private sessions, routine build, video analysis, competition support. Worth PHP 45,000 bought apart", type: "fixed", price: 28000 }
          ]
        },
        {
          title: "Cheaper still, automatically",
          kind: "list",
          rows: [["Hospitality or culinary student with a school ID", "Less 20 percent"], ["Weekday sessions starting before 2 pm", "Less 15 percent"], ["You finished a latte art or flair course with us", "Less 10 percent"], ["Your shop is on a Band 3 bean account", "Less 10 percent"], ["You bring someone who buys any pass", "3 free sessions"]],
          footnote: "Discounts do not stack, the largest applies. We confirm these on your written quote."
        }
      ],
      terms: "Reschedule free with 24 hours notice. No show is a burned session. Unused sessions do not roll over. One pass, one athlete."
    },

    /* ---------------- 05 SEMINARS ---------------- */
    {
      id: "seminars", no: "05", brand: "Cafe Mystika Studio", title: "Seminars, workshops and brand masterclass",
      intro: "Shorter formats for larger rooms: schools, associations, LGUs, hotel groups and supplier brands who need thirty people moved forward in one day. Priced per event, not per head.",
      groups: [
        {
          title: "Formats, per event",
          kind: "items", unit: ["event", "events"], head: ["Format", "Price"],
          items: [
            { id: "sem-keynote", name: "Keynote or talk", detail: "Up to two hours, unlimited audience", type: "fixed", price: 8000 },
            { id: "sem-half", name: "Half day seminar", detail: "Up to 30 people. Lecture plus demonstration", type: "fixed", price: 15000 },
            { id: "sem-full", name: "Full day seminar", detail: "Up to 30 people. Adds structured tasting and a takeaway pack", type: "fixed", price: 25000 },
            { id: "sem-workshop", name: "Hands on workshop", detail: "Up to 15 people. Everyone works a machine", type: "fixed", price: 22000 },
            { id: "sem-brand", name: "Brand masterclass", detail: "Up to 25 people. Co branded with a supplier or equipment partner", type: "fixed", price: 35000 },
            { id: "sem-clinic", name: "Competition clinic", detail: "Up to 12 people, two days. Latte art, barista or bartending prep", type: "fixed", price: 30000 }
          ],
          footnote: "Extra participants PHP 500 each for seminars, PHP 1,200 for hands on formats. Three or more events a year take 20 percent off every event fee."
        }
      ]
    },

    /* ---------------- 06 CONSULTANCY ---------------- */
    {
      id: "consultancy", no: "06", brand: "Cafe Mystika Studio", title: "Consultancy",
      intro: "For owners who need someone to look at the whole thing and tell them the truth with numbers attached. Delivered engagements include cafes in Cebu and Negros Oriental, LGU beverage programs, university hospitality programs and multi brand operations builds.",
      note: "We will not tell you your concept is good if it is not. If the real problem is that the business should not open yet, you hear it on day one and get the balance of your fee back.",
      groups: [
        {
          title: "Engagements",
          kind: "items", unit: ["engagement", "engagements"], head: ["Engagement", "Price"],
          items: [
            { id: "consult-diagnostic", name: "Diagnostic Day", detail: "One day on your floor during trading hours, written report in three working days. Credited in full against a larger engagement within 60 days", type: "fixed", price: 7500, badge: "Start here" },
            { id: "consult-menu", name: "Menu Development Sprint", detail: "Three days. Rebuilt, costed beverage menu with recipe cards and staff handover", type: "fixed", price: 25000 },
            { id: "consult-launch", name: "Cafe Setup and Launch", detail: "Five days. Concept, equipment and layout, costed menu, suppliers, checklists, training and launch plan", type: "fixed", price: 50000 },
            { id: "consult-ops", name: "Full Operations Build", detail: "Ten days phased. Adds handbook, recipe deck, checklists, costing workbook, HR and brand standards", type: "fixed", price: 95000 },
            { id: "consult-costing", name: "Beverage costing and pricing workbook", type: "fixed", price: 12000 },
            { id: "consult-handbook", name: "Operations handbook only", detail: "Existing business", type: "fixed", price: 30000 },
            { id: "consult-retainer", name: "Monthly advisory retainer", detail: "Two visits a month", type: "fixed", price: 15000, unit: ["month", "months"] }
          ],
          footnote: "Travel outside Negros Oriental at cost. Fifty percent on signing, balance on delivery. Everything is delivered in writing and in editable files that are yours."
        }
      ]
    },

    /* ---------------- 07 EVENTS ---------------- */
    {
      id: "events", no: "07", brand: "Mystique Flavors and Cafe Mystika Mobile", title: "Events and mobile stations",
      intro: "Staffed beverage stations for weddings, corporate functions, LGU events, launches, conferences and resorts. One main bar, Cocktail, Coffee or Dry Bar, plus up to two attached stations on the same unit. Prices include bar build, equipment, staff, base ingredients, serviceware, menu cards, set up, pack down, waste handling and a 10 percent coordinator share.",
      note: "A Signature package with a cocktail main bar and two stations is PHP 18,500 plus PHP 8,500 twice: PHP 35,500 for 100 guests across three service points. Unopened leftover stock is credited back.",
      groups: [
        {
          title: "Packages by guest count",
          kind: "events",
          items: [
            { key: "intimate", name: "Intimate", guests: 30, servings: 60, hours: 2, staff: 1, main: 10500, station: 4500 },
            { key: "small", name: "Small", guests: 50, servings: 100, hours: 2, staff: 2, main: 14000, station: 5500 },
            { key: "signature", name: "Signature", guests: 100, servings: 200, hours: 2, staff: 2, main: 18500, station: 8500 },
            { key: "grand", name: "Grand", guests: 150, servings: 300, hours: 3, staff: 3, main: 25500, station: 10500 },
            { key: "estate", name: "Estate", guests: 200, servings: 400, hours: 3, staff: 4, main: 30500, station: 13500 }
          ],
          footnote: "Above 200 guests is quoted as two units. Smaller barangay and school events are quoted down, so ask."
        },
        {
          title: "Main bars and stations",
          kind: "list",
          rows: [
            ["Cocktail Bar, Mystique Flavors", "Classics, house crafts and a signature built for your client's theme"],
            ["Coffee Bar, Cafe Mystika Mobile", "Espresso on a working machine, hot and iced, dairy free options, latte art on request"],
            ["Dry Bar", "A full mocktail programme for corporate, church, school and family events"],
            ["Attached stations", "The Matcha Bar, dessert (halo halo, taho, ice cream, gelato), boba and milk tea, lemonade and slushie, gin station, soda station, self service coffee"]
          ]
        },
        {
          title: "Add ons",
          kind: "items", unit: ["item", "items"], head: ["Add on", "Price"],
          items: [
            { id: "ev-hour", name: "Extra hour of service", type: "fixed", price: 2500, unit: ["hour", "hours"] },
            { id: "ev-servings", name: "Extra 50 servings", type: "fixed", price: 3500, unit: ["block", "blocks"] },
            { id: "ev-syrups", name: "House made syrups, cordials and craft builds", type: "fixed", price: 3500 },
            { id: "ev-bespoke", name: "Bespoke on the spot builds", detail: "Bartender inventing to order", type: "fixed", price: 5000 },
            { id: "ev-lighting", name: "Event lighting and designer lamps", type: "fixed", price: 3500 },
            { id: "ev-early", name: "Load in before 8 am or teardown after midnight", type: "fixed", price: 2000 },
            { id: "ev-travel", name: "Travel outside Valencia and Dumaguete", detail: "PHP 25 per km round trip, minimum PHP 1,500", type: "quote" },
            { id: "ev-spirits", name: "Premium or client specified spirits", detail: "At cost plus 20 percent", type: "quote" },
            { id: "ev-floral", name: "Floral dressing, generator, Siquijor, Bohol, Dipolog", type: "quote" }
          ]
        }
      ],
      terms: "Dates are held only against a signed booking sheet and a deposit. Peak season Saturdays go three to six months ahead. If your event is inside 30 days, call rather than message."
    },

    /* ---------------- EVENT SUPPORT (from the Cafes and Bars card) ---------------- */
    {
      id: "support", no: "07b", brand: "Cafe Mystika Studio", title: "Support for the mobile bar you already run",
      intro: "We do not compete with your mobile bar. We supply it. Machines for the road, relief staff under your name, and a package you have actually costed.",
      groups: [
        {
          title: "Equipment, per event day",
          kind: "items", unit: ["day", "days"], head: ["Item", "Price"],
          items: [
            { id: "sup-single", name: "Single group espresso machine and grinder", type: "fixed", price: 3500 },
            { id: "sup-double", name: "Double group espresso machine and grinder", type: "fixed", price: 5500 },
            { id: "sup-grinder", name: "Grinder only", type: "fixed", price: 1500 },
            { id: "sup-kit", name: "Bar tool kit, glassware and ice bins", type: "fixed", price: 1500 },
            { id: "sup-setup", name: "Delivery, on site setup and calibration", type: "fixed", price: 1500 }
          ],
          footnote: "Refundable deposit applies. Second and third consecutive day less 30 percent. Bean accounts at 30 kg a month take 20 percent off all rental."
        },
        {
          title: "Relief and overflow staff, per person per event day",
          kind: "items", unit: ["person", "people"], head: ["Role, up to 8 hours", "Price"],
          items: [
            { id: "sup-barista", name: "Trained barista or bartender", type: "fixed", price: 2000 },
            { id: "sup-lead", name: "Lead or bar supervisor", type: "fixed", price: 2800 },
            { id: "sup-flair", name: "Flair bartender, performance", type: "fixed", price: 3500 }
          ],
          footnote: "Overtime PHP 250 an hour. Uniformed, briefed and working under your name. Book seven days out."
        },
        {
          title: "Build the offer properly",
          kind: "items", unit: ["job", "jobs"], head: ["Engagement", "Price"],
          items: [
            { id: "sup-costing", name: "Event package costing model", detail: "Per guest cost from real receipts, a package ladder and a profit floor", type: "fixed", price: 12000 },
            { id: "sup-menu", name: "Mobile bar menu build", detail: "Two days, costed recipe cards and serving specs", type: "fixed", price: 15000 },
            { id: "sup-design", name: "Mobile bar unit design package", detail: "Modular build, colourways and dressing", type: "fixed", price: 20000 },
            { id: "sup-roadkit", name: "Road kit service", detail: "Pre event check and post event flush on your machine", type: "fixed", price: 2500, unit: ["event", "events"] }
          ]
        }
      ]
    },

    /* ---------------- 08 PACKAGES ---------------- */
    {
      id: "packages", no: "08", brand: "All brands", title: "Packages",
      intro: "Almost every failing coffee bar has three problems at once: an uncalibrated grinder, staff shown once and never trained, and a menu priced by copying the shop next door. Fixing one does nothing, so we stopped selling them one at a time.",
      groups: [
        {
          title: "Bundles",
          kind: "packages", unit: ["package", "packages"],
          items: [
            { id: "pkg-starter", name: "The Starter", for: "A kiosk, a small shop, or an owner with almost no budget", price: 7900, list: 10260, points: ["Espresso Calibration, public batch, one person", "Grinder calibration on your machine", "Machine check up, single group", "5 kg of The Game Changer"], pay: "Payable in two parts" },
            { id: "pkg-upgrade", name: "The Upgrade", for: "A shop already trading that is losing to the place down the road", price: 26000, list: 34970, points: ["Latte Art 101 for two staff", "Espresso Calibration for one", "Coffee Sensory Course for one", "Deep external check and grinder calibration", "10 kg of beans at Band 2"], pay: "Payable in three parts" },
            { id: "pkg-opening", name: "The Opening", for: "A cafe that has not opened yet", price: 55000, list: 75970, points: ["Barista 101 for two staff", "Menu Development Sprint, fully costed", "Machine installation and both calibrations", "Espresso Calibration for one", "10 kg opening stock at Band 2", "CARE maintenance plan, first year"], pay: "Three parts, the last 30 days after opening day", featured: true },
            { id: "pkg-floor", name: "The Floor", for: "Hotels, resorts, restaurant groups and schools", price: 170000, list: 250000, points: ["Barista 101 for ten staff", "Mixology 101 for ten staff", "Coffee Sensory Course for ten staff", "On your dates, on your equipment, matched to your menu"], pay: "Payable across the three course blocks" },
            { id: "pkg-house", name: "The House Account", for: "Any shop that commits to 30 kg a month for six months", price: 0, noFee: true, points: ["Band 3 pricing from the first order", "Quarterly grinder calibration and machine check up", "Priority stock and free delivery in Valencia and Dumaguete", "One free public course seat a year", "First refusal on new specialty lots"], pay: "No fee. About PHP 22,000 a year of included service" }
          ]
        }
      ]
    },

    /* ---------------- SCHOOLS ---------------- */
    {
      id: "schools", no: "10", brand: "Cafe Mystika Training and Development", title: "Colleges, schools and LGUs",
      intro: "For deans, programme chairs and training heads of hospitality, tourism, culinary and tech voc programmes. Faculty are trained first so capability stays with the institution, students follow in cohorts, and a competition squad becomes the visible proof of the programme.",
      note: "Certificates state completion and competency against course outcomes. They are not national certificates. TESDA NC II assessment is done separately through an accredited centre.",
      groups: [
        {
          title: "Start here",
          kind: "items", unit: ["engagement", "engagements"], head: ["Engagement", "Price"],
          items: [
            { id: "inst-diagnostic", name: "Academic and Laboratory Diagnostic", detail: "One day on campus plus five days desk work. Written report with costed recommendations. Credited in full against any track within 90 days", type: "fixed", price: 25000, badge: "Start here" },
            { id: "inst-ojt", name: "Industry immersion and OJT partnership", detail: "Placement across the coffee bar, studio, roastery, mobile bars and bistro under a Memorandum of Agreement", type: "free" }
          ]
        },
        {
          title: "Institutional tracks, worked examples",
          kind: "items", unit: ["track", "tracks"], head: ["Track", "Contract value"],
          items: [
            { id: "inst-track-1", name: "Track 1, Faculty capability build", detail: "Barista 101, Espresso Calibration, Sensory. 8 faculty, 7 days", type: "fixed", price: 129600 },
            { id: "inst-track-2", name: "Track 2, Student barista certification", detail: "Barista 101. 30 students, 4 days, PHP 7,000 each", type: "fixed", price: 210000 },
            { id: "inst-track-3", name: "Track 3, Student bar and beverage", detail: "Mixology 101 and Milk Tea. 30 students, 5 days", type: "fixed", price: 315000 },
            { id: "inst-track-4", name: "Track 4, Competition squad", detail: "Latte Art 102 and Flairtending 101. 6 candidates, 9 days", type: "fixed", price: 97200 },
            { id: "inst-track-5", name: "Track 5, Events and fine service", detail: "Wine and High Tea Appreciation. 25 students, 4 days", type: "fixed", price: 175000 }
          ],
          footnote: "Plus deployment. Change the cohort size and the price recalculates on the batch matrix below."
        },
        {
          title: "Batch matrix on the published fee",
          kind: "list",
          rows: [["One on one", "Plus 50 percent"], ["2 to 5 seats", "Published fee"], ["6 to 12 seats", "Less 10 percent"], ["13 to 20 seats", "Less 20 percent"], ["21 to 30 seats", "Less 30 percent"], ["31 to 45 seats", "Less 40 percent, non espresso courses only"]]
        },
        {
          title: "Institutional services",
          kind: "items", unit: ["service", "services"], head: ["Service", "Price"],
          items: [
            { id: "inst-lab-design", name: "Laboratory design", detail: "Layout, workflow, stations, utilities, equipment schedule", type: "fixed", price: 45000 },
            { id: "inst-blueprint", name: "Laboratory blueprint", detail: "Measured drawing set", type: "fixed", price: 35000 },
            { id: "inst-curriculum", name: "Curriculum mapping", detail: "Per qualification", type: "fixed", price: 35000 },
            { id: "inst-faculty-prep", name: "Faculty trainer preparation", detail: "Per faculty member", type: "fixed", price: 25000 },
            { id: "inst-tot", name: "Training of Trainers", detail: "Five personnel, five days", type: "fixed", price: 95000 },
            { id: "inst-cupping-lab", name: "Cupping and quality laboratory setup", type: "fixed", price: 120000 },
            { id: "inst-equipment", name: "Equipment specification and sourcing", type: "fixed", price: 45000 },
            { id: "inst-squad", name: "Competition squad retainer", type: "fixed", price: 25000, unit: ["month", "months"] },
            { id: "inst-faculty-day", name: "Job order teaching faculty", detail: "Per eight hour day", type: "fixed", price: 3400, unit: ["day", "days"] },
            { id: "inst-sem-half", name: "F and B seminar, half day", detail: "Up to 50 participants", type: "fixed", price: 18000 },
            { id: "inst-sem-full", name: "F and B seminar, full day", detail: "Up to 50 participants", type: "fixed", price: 30000 },
            { id: "inst-enterprise", name: "Enterprise Block", detail: "Two days per batch, business and costing module", type: "fixed", price: 45000 }
          ]
        },
        {
          title: "Deployment",
          kind: "list",
          rows: [["At Cafe Mystika Studio, Valencia", "No charge, counts as industry immersion"], ["On campus within 15 km, all Dumaguete campuses", "PHP 6,000 per deployment block"], ["On campus beyond 15 km", "PHP 12,000 per block of up to five days, plus PHP 2,500 per trainer per night"], ["Minimum on campus block", "PHP 60,000 of instruction"]]
        },
        {
          title: "Ways to pay for it",
          kind: "list",
          rows: [["Faculty development budget", "Diagnostic and Track 1"], ["Student enrichment fee", "Students fund their own cohort. Track 2 at 30 students costs the institution PHP 0"], ["Lab or course fee integration", "Recurring annual cohorts"], ["Extension and community service", "Cohorts with barangay or LGU partners"], ["Industry partner subsidy", "A hotel or cafe group sponsors a cohort for first access to graduates"], ["Hybrid, recommended", "Institution funds diagnostic and faculty, students fund certification"]]
        }
      ],
      terms: "Prices in the institutional catalogue are valid 90 days from 8 September 2026. Contracted seats are payable whether filled or not, with free substitution up to seven days before start."
    }
  ],

  terms: [
    ["Payment", "Opening bean and pastry orders are payment first. Weekly terms after three clean cycles. Cash, bank transfer and GCash."],
    ["Installments", "Training, consultancy, overhauls and packages above PHP 7,000 split into three payments at no interest."],
    ["Lead times", "Beans three to five working days from cleared payment. Pastry weekly. Custom cakes five working days. Overhauls three to ten days."],
    ["Returns", "Bean claims within seven days with bag and roast date intact. Pastry claims on the day with a photo."],
    ["Quotes", "Written quotes are valid 15 days. Confirmed orders are honoured at the confirmed price."],
    ["Confidentiality", "Your recipes, costings and numbers stay yours. We never tell a competitor what you buy."]
  ]
};
