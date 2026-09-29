(function () {
  "use strict";

  var D = window.MYSTIKA;
  var B = D.business;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var money = function (n) { return B.currency + Number(n).toLocaleString("en-PH"); };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var uid = 0;

  /* ---------- Drink illustrations drawn from catalogue layers ---------- */

  var CUPS = {
    // [clip path for the liquid, outline path, liquid top y, liquid bottom y]
    glass: ["M24 22 L76 22 L70 122 L30 122 Z", "M24 22 L76 22 L70 122 Q70 126 66 126 L34 126 Q30 126 30 122 Z", 22, 122],
    mug: ["M20 44 L74 44 L74 112 Q74 122 64 122 L30 122 Q20 122 20 112 Z", "M20 44 L74 44 L74 112 Q74 122 64 122 L30 122 Q20 122 20 112 Z M74 58 Q92 58 92 76 Q92 94 74 94", 44, 122],
    demitasse: ["M28 70 L72 70 L68 112 Q66 120 58 120 L42 120 Q34 120 32 112 Z", "M28 70 L72 70 L68 112 Q66 120 58 120 L42 120 Q34 120 32 112 Z M71 80 Q84 80 84 92 Q84 104 69 104 M18 124 L82 124", 70, 120],
    carafe: ["M38 20 L62 20 L62 44 Q84 62 84 92 Q84 124 50 124 Q16 124 16 92 Q16 62 38 44 Z", "M38 20 L62 20 L62 44 Q84 62 84 92 Q84 124 50 124 Q16 124 16 92 Q16 62 38 44 Z M34 20 L66 20", 20, 124],
    coupe: ["M14 30 L86 30 Q84 70 50 74 Q16 70 14 30 Z", "M14 30 L86 30 Q84 70 50 74 Q16 70 14 30 Z M50 74 L50 118 M32 122 L68 122", 30, 74]
  };

  function drinkSVG(item, opts) {
    opts = opts || {};
    if (item.image) {
      return '<img src="' + esc(item.image) + '" alt="" loading="lazy">';
    }
    var cup = CUPS[item.cup || "glass"];
    var id = "clip" + (++uid);
    var top = cup[2], bottom = cup[3], span = bottom - top;
    var y = bottom, rects = "";
    (item.layers || []).forEach(function (l, i) {
      var h = l.h * span;
      y -= h;
      rects += '<rect class="layer" style="--i:' + i + '" x="0" y="' + y.toFixed(1) + '" width="100" height="' + (h + 0.6).toFixed(1) + '" fill="' + l.c + '"/>';
    });
    var ice = "";
    if (item.ice) {
      var iy = Math.max(y, top) + 4;
      ice = '<g class="ice" fill="#ffffff" fill-opacity=".38" stroke="#ffffff" stroke-opacity=".7">' +
        '<rect x="34" y="' + (iy + 2) + '" width="15" height="15" rx="3" transform="rotate(-12 41 ' + (iy + 9) + ')"/>' +
        '<rect x="51" y="' + (iy + 12) + '" width="14" height="14" rx="3" transform="rotate(14 58 ' + (iy + 19) + ')"/>' +
        '<rect x="40" y="' + (iy + 24) + '" width="13" height="13" rx="3" transform="rotate(6 46 ' + (iy + 30) + ')"/></g>';
    }
    return '<svg class="drink' + (opts.animate ? " animate" : "") + '" viewBox="0 0 100 130" aria-hidden="true" focusable="false">' +
      '<defs><clipPath id="' + id + '"><path d="' + cup[0] + '"/></clipPath></defs>' +
      '<g clip-path="url(#' + id + ')">' + rects + ice + '</g>' +
      '<path d="' + cup[1] + '" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>' +
      '</svg>';
  }

  function bagSVG(bean) {
    return '<svg class="bag" viewBox="0 0 100 130" aria-hidden="true" focusable="false">' +
      '<path d="M22 18 L78 18 L84 120 Q84 126 78 126 L22 126 Q16 126 16 120 Z" fill="' + bean.color + '"/>' +
      '<path d="M22 18 L78 18 L77 30 L23 30 Z" fill="#000" fill-opacity=".2"/>' +
      '<rect x="17" y="62" width="66" height="26" fill="#ff7f42"/>' +
      '<text x="50" y="80" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="500" font-size="15" fill="#fff">mystika</text>' +
      '</svg>';
  }

  /* ---------- Opening hours ---------- */

  function manilaNow() {
    var parts = new Intl.DateTimeFormat("en-US", {
      timeZone: B.timezone, hour: "numeric", minute: "numeric", hour12: false
    }).formatToParts(new Date());
    var h = 0, m = 0;
    parts.forEach(function (p) {
      if (p.type === "hour") h = Number(p.value) % 24;
      if (p.type === "minute") m = Number(p.value);
    });
    return { h: h, m: m, mins: h * 60 + m };
  }

  function fmtTime(mins) {
    var h = Math.floor(mins / 60) % 24, m = mins % 60;
    var ap = h >= 12 ? "PM" : "AM";
    var hh = h % 12 || 12;
    return hh + ":" + (m < 10 ? "0" : "") + m + " " + ap;
  }

  function hourLabel(h) { return fmtTime(h * 60).replace(":00", ""); }

  function renderStatus() {
    var now = manilaNow();
    var open = now.mins >= B.openHour * 60 && now.mins < B.closeHour * 60;
    var text;
    if (open) {
      var left = B.closeHour * 60 - now.mins;
      text = left <= 60 ? "Open now, closing at " + hourLabel(B.closeHour) : "Open now until " + hourLabel(B.closeHour);
    } else {
      text = "Closed now. Opens " + (now.mins < B.openHour * 60 ? "today" : "tomorrow") + " at " + hourLabel(B.openHour);
    }
    $$("[data-open-text]").forEach(function (el) { el.textContent = text; });
    $$("[data-open-dot]").forEach(function (el) { el.classList.toggle("is-open", open); });
    return open;
  }

  function pickupOptions() {
    var now = manilaNow();
    var openM = B.openHour * 60, closeM = B.closeHour * 60;
    var start = Math.ceil((now.mins + 15) / 15) * 15;
    var opts = [];
    if (now.mins >= openM && start < closeM) {
      opts.push({ v: "As soon as possible", t: "As soon as possible (about 15 min)" });
      for (var t = start; t < closeM && opts.length < 30; t += 15) opts.push({ v: "Today " + fmtTime(t), t: "Today " + fmtTime(t) });
    } else {
      var day = now.mins < openM ? "Today" : "Tomorrow";
      for (var u = openM; u < Math.min(closeM, openM + 6 * 60); u += 30) opts.push({ v: day + " " + fmtTime(u), t: day + " " + fmtTime(u) });
    }
    return opts;
  }

  /* ---------- Storage (optional, page works without it) ---------- */

  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* ignore */ } }
  };

  /* ---------- Cart ---------- */

  var cart = store.get("mystika-cart", []);
  var findProduct = function (id) {
    return D.menu.filter(function (x) { return x.id === id; })[0] || D.beans.filter(function (x) { return x.id === id; })[0];
  };
  cart = cart.filter(function (l) { return findProduct(l.id); });

  function addToCart(id, option) {
    var key = id + "|" + (option || "");
    var line = cart.filter(function (l) { return l.key === key; })[0];
    if (line) line.qty += 1;
    else cart.push({ key: key, id: id, option: option || "", qty: 1 });
    saveCart();
    var p = findProduct(id);
    toast(p.name + (option ? " (" + option + ")" : "") + " added.", "View order", openCart);
    bump();
  }

  function saveCart() { store.set("mystika-cart", cart); renderCart(); }

  function cartTotal() {
    return cart.reduce(function (s, l) { return s + findProduct(l.id).price * l.qty; }, 0);
  }

  function bump() {
    $$("[data-cart-count]").forEach(function (el) {
      el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump");
    });
  }

  function renderCart() {
    var count = cart.reduce(function (s, l) { return s + l.qty; }, 0);
    $$("[data-cart-count]").forEach(function (el) { el.textContent = count; el.hidden = count === 0; });
    $$("button[data-open-cart]").forEach(function (b) {
      b.setAttribute("aria-label", "Your order, " + count + (count === 1 ? " item" : " items"));
    });
    var list = $("[data-cart-lines]");
    list.innerHTML = cart.map(function (l) {
      var p = findProduct(l.id);
      return '<li class="cart-line">' +
        '<div class="cart-line-art">' + (p.layers ? drinkSVG(Object.assign({}, p, { ice: p.ice && l.option !== "Hot" })) : bagSVG(p)) + '</div>' +
        '<div class="cart-line-info"><p class="cart-line-name">' + esc(p.name) + '</p>' +
        '<p class="cart-line-meta">' + (l.option ? esc(l.option) + ", " : "") + money(p.price) + ' each</p></div>' +
        '<div class="qty" role="group" aria-label="Quantity of ' + esc(p.name) + '">' +
        '<button type="button" data-qty="-1" data-key="' + esc(l.key) + '" aria-label="' + (l.qty === 1 ? "Remove " : "One less ") + esc(p.name) + '">−</button>' +
        '<span aria-live="polite">' + l.qty + '</span>' +
        '<button type="button" data-qty="1" data-key="' + esc(l.key) + '" aria-label="One more ' + esc(p.name) + '">+</button></div>' +
        '</li>';
    }).join("");
    var empty = cart.length === 0;
    $("[data-cart-empty]").hidden = !empty;
    $("[data-cart-form]").hidden = empty;
    $("[data-cart-foot]").hidden = empty;
    $("[data-cart-total]").textContent = money(cartTotal());
  }

  var lastFocus = null;
  function setBackgroundInert(on) {
    $$("body > a.skip, body > .statusbar, body > .site-header, body > main, body > footer, body > .actionbar").forEach(function (el) {
      if (on) { el.setAttribute("inert", ""); el.setAttribute("aria-hidden", "true"); }
      else { el.removeAttribute("inert"); el.removeAttribute("aria-hidden"); }
    });
  }

  function openCart() {
    lastFocus = document.activeElement;
    var sel = $("[data-pickup-times]");
    var prev = sel.value;
    sel.innerHTML = pickupOptions().map(function (o) { return '<option value="' + esc(o.v) + '">' + esc(o.t) + "</option>"; }).join("");
    if (prev) sel.value = prev;
    var name = store.get("mystika-name", "");
    if (name && !$("#c-name").value) $("#c-name").value = name;
    hideToast();
    setBackgroundInert(true);
    $("[data-cart]").hidden = false;
    document.body.classList.add("locked");
    requestAnimationFrame(function () { $("[data-cart]").classList.add("open"); });
    $(".drawer-panel .icon-btn").focus();
  }

  function closeCart() {
    var el = $("[data-cart]");
    el.classList.remove("open");
    document.body.classList.remove("locked");
    setBackgroundInert(false);
    setTimeout(function () { el.hidden = true; }, 220);
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }

  function orderMessage(form) {
    var lines = cart.map(function (l) {
      var p = findProduct(l.id);
      return l.qty + " x " + p.name + (l.option ? " (" + l.option + ")" : "") + " = " + money(p.price * l.qty);
    });
    var msg = "Hi Cafe Mystika! Pickup order:\n" + lines.join("\n") +
      "\nTotal: " + money(cartTotal()) +
      "\nName: " + form.name.value.trim() +
      "\nPickup: " + form.time.value;
    if (form.notes.value.trim()) msg += "\nNotes: " + form.notes.value.trim();
    return msg;
  }

  /* ---------- Sending (SMS or Messenger, no backend needed) ---------- */

  var isPhone = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;

  function send(channel, message) {
    if (channel === "sms") {
      toast(isPhone
        ? "Opening your messages app with everything written. Press send there."
        : "Texting works best from a phone. If nothing opened, use Send on Messenger or call " + B.phoneDisplay + ".", null, null, 6000);
      window.location.href = "sms:" + B.phone + "?body=" + encodeURIComponent(message);
      return;
    }
    var open = function () { window.open(B.messenger, "_blank", "noopener"); };
    var failed = function () {
      toast("Messenger is opening. Type your order there, or use Send by text instead.", null, null, 6000);
      open();
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(message).then(function () {
        toast("Message copied. Paste it in the Messenger chat and press send.", null, null, 6000);
        open();
      }, failed);
    } else {
      failed();
    }
  }

  /* ---------- Toast ---------- */

  var toastTimer;
  function hideToast() {
    var t = $("[data-toast]");
    t.classList.remove("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.innerHTML = ""; }, 200);
  }
  function toast(text, actionLabel, action, ms) {
    var t = $("[data-toast]");
    clearTimeout(toastTimer);
    t.innerHTML = "<span>" + esc(text) + "</span>" + (actionLabel ? '<button type="button">' + esc(actionLabel) + "</button>" : "");
    if (actionLabel) $("button", t).addEventListener("click", function () { hideToast(); action(); });
    t.classList.add("show");
    toastTimer = setTimeout(hideToast, ms || 5000);
  }

  /* ---------- Render sections ---------- */

  function optionToggle(item) {
    if (!item.options || item.options.length < 2) return "";
    return '<div class="seg" role="radiogroup" aria-label="' + esc(item.name) + ', hot or iced">' + item.options.map(function (o, i) {
      return '<button type="button" role="radio" aria-checked="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '" data-opt="' + esc(o) + '">' + esc(o) + "</button>";
    }).join("") + "</div>";
  }

  function productCard(item, cls) {
    return '<article class="' + cls + '" data-product="' + item.id + '">' +
      '<div class="art">' + drinkSVG(item) + "</div>" +
      '<div class="card-body">' +
      '<div class="card-top"><h3>' + esc(item.name) + '</h3><span class="price">' + money(item.price) + "</span></div>" +
      '<p class="desc">' + esc(item.desc) + "</p>" +
      '<div class="card-actions">' + optionToggle(item) +
      '<button class="btn btn-ink btn-add" type="button" data-add="' + item.id + '">Add</button></div>' +
      "</div></article>";
  }

  function bestCard(item) {
    return '<article class="card-best" data-product="' + item.id + '">' +
      '<div class="art">' + drinkSVG(item) + "</div>" +
      "<h3>" + esc(item.name) + "</h3>" +
      '<p class="desc">' + esc(item.desc) + "</p>" +
      optionToggle(item) +
      '<div class="best-foot"><span class="price">' + money(item.price) + "</span>" +
      '<button class="btn btn-ink btn-add" type="button" data-add="' + item.id + '">Add to order</button></div>' +
      "</article>";
  }

  function renderBento() {
    $("[data-bento-thumbs]").innerHTML = D.menu.filter(function (m) { return m.bestseller; }).slice(0, 4)
      .map(function (m) { return "<li>" + drinkSVG(m) + "<span>" + esc(m.name) + "</span></li>"; }).join("");
    $("[data-bento-bag]").innerHTML = bagSVG(D.beans[0]);
  }

  function renderBestsellers() {
    $("[data-bestsellers]").innerHTML = D.menu.filter(function (m) { return m.bestseller; }).map(bestCard).join("");
  }

  var activeCat = D.categories[0].id;
  function renderMenu() {
    $("[data-tabs]").innerHTML = D.categories.map(function (c) {
      var on = c.id === activeCat;
      return '<button type="button" role="tab" id="tab-' + c.id + '" aria-selected="' + on + '" aria-controls="menu-panel" tabindex="' + (on ? 0 : -1) + '" data-tab="' + c.id + '">' + esc(c.name) + "</button>";
    }).join("");
    var menu = $("[data-menu]");
    menu.id = "menu-panel";
    menu.setAttribute("role", "tabpanel");
    menu.setAttribute("aria-labelledby", "tab-" + activeCat);
    menu.innerHTML = D.menu.filter(function (m) { return m.cat === activeCat; })
      .map(function (m) { return productCard(m, "card card-row"); }).join("");
  }

  function renderBeans() {
    $("[data-beans]").innerHTML = D.beans.map(function (b) {
      return '<article class="bean" data-product="' + b.id + '">' +
        '<div class="art">' + bagSVG(b) + "</div>" +
        '<div class="card-body"><div class="card-top"><h3>' + esc(b.name) + '</h3><span class="price">' + money(b.price) + "</span></div>" +
        '<p class="desc">' + esc(b.desc) + "</p>" +
        '<ul class="notes">' + b.notes.map(function (n) { return "<li>" + esc(n) + "</li>"; }).join("") + "</ul>" +
        '<div class="best-foot"><span class="unit">' + esc(b.unit) + '</span><button class="btn btn-ink btn-add" type="button" data-add="' + b.id + '">Add to order</button></div></div></article>';
    }).join("");
  }

  function renderServices() {
    $$("[data-services]").forEach(function (wrap) {
      var group = wrap.getAttribute("data-services");
      wrap.innerHTML = D.services.filter(function (s) { return s.group === group; }).map(function (s) {
        return '<article class="service">' +
          "<h4>" + esc(s.name) + "</h4>" +
          '<p class="service-meta">' + esc(s.duration) + "</p>" +
          '<p class="desc">' + esc(s.desc) + "</p>" +
          '<p class="who">' + esc(s.who) + "</p>" +
          '<div class="service-foot"><span class="price">' + (s.price ? money(s.price) : esc(s.priceLabel)) + "</span>" +
          '<button class="btn btn-ink" type="button" data-book="' + s.id + '">Book this</button></div></article>';
      }).join("");
    });
  }

  function renderOffers() {
    $("[data-offers]").innerHTML = D.offers.map(function (o) {
      return "<li><strong>" + esc(o.title) + "</strong><span>" + esc(o.text) + "</span></li>";
    }).join("");
  }

  function renderReviews() {
    $("[data-reviews]").innerHTML = D.reviews.map(function (r) {
      return '<figure class="review"><div class="stars" role="img" aria-label="Rated 5 out of 5">★★★★★</div>' +
        "<blockquote>" + esc(r.text) + "</blockquote><figcaption>" + esc(r.who) + "</figcaption></figure>";
    }).join("");
  }

  function renderContact() {
    var links = {
      tel: "tel:" + B.phone,
      messenger: B.messenger,
      facebook: B.facebook,
      instagram: B.instagram,
      tripadvisor: B.tripadvisor,
      directions: "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(B.mapsQuery)
    };
    $$("[data-link]").forEach(function (a) { a.href = links[a.getAttribute("data-link")]; });
    $$('a[target="_blank"]').forEach(function (a) {
      if (!$(".sr-only", a)) a.insertAdjacentHTML("beforeend", '<span class="sr-only"> (opens in a new tab)</span>');
    });
    $$("[data-address]").forEach(function (el) { el.textContent = B.address; });
    $$("[data-phone-display]").forEach(function (el) { el.textContent = B.phoneDisplay; });
    $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
    var map = $("[data-map]");
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (e) {
        if (e[0].isIntersecting) { map.src = "https://maps.google.com/maps?q=" + encodeURIComponent(B.mapsQuery) + "&z=16&output=embed"; io.disconnect(); }
      }, { rootMargin: "400px" });
      io.observe(map);
    } else {
      map.src = "https://maps.google.com/maps?q=" + encodeURIComponent(B.mapsQuery) + "&z=16&output=embed";
    }
  }

  /* ---------- Booking ---------- */

  var dialog = $("[data-booking]");
  function openBooking(id) {
    var sel = $("[data-booking-services]");
    sel.innerHTML = D.services.map(function (s) { return '<option value="' + s.id + '">' + esc(s.name) + "</option>"; }).join("");
    sel.value = id;
    setBookingTitle();
    var today = new Date();
    var iso = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    $("#b-date").min = iso;
    var saved = store.get("mystika-contact", {});
    if (saved.name && !$("#b-name").value) $("#b-name").value = saved.name;
    if (saved.phone && !$("#b-phone").value) $("#b-phone").value = saved.phone;
    $$(".field-error", dialog).forEach(function (e) { e.hidden = true; });
    $$("[aria-invalid]", dialog).forEach(function (e) { e.removeAttribute("aria-invalid"); });
    if (dialog.showModal) dialog.showModal(); else dialog.setAttribute("open", "");
  }

  function setBookingTitle() {
    var s = D.services.filter(function (x) { return x.id === $("[data-booking-services]").value; })[0];
    $("[data-booking-title]").textContent = s ? s.name.charAt(0).toLowerCase() + s.name.slice(1) : "";
  }

  function bookingMessage(f) {
    var s = D.services.filter(function (x) { return x.id === f.service.value; })[0];
    var msg = "Hi Cafe Mystika! I'd like to book: " + s.name +
      "\nDate: " + f.date.value +
      "\nPeople: " + f.pax.value +
      "\nName: " + f.name.value.trim() +
      "\nMobile: " + f.phone.value.trim();
    if (f.notes.value.trim()) msg += "\nNotes: " + f.notes.value.trim();
    return msg;
  }

  var MESSAGES = {
    name: "Add your name so we know who it is for.",
    time: "Choose a pickup time.",
    date: "Pick the date you would like.",
    pax: "Enter how many people are coming, 1 or more.",
    phone: "Enter your mobile number with 11 digits, like 0917 123 4567."
  };

  function checkField(el) {
    var v = el.value.trim();
    var ok = v !== "" && el.checkValidity();
    if (el.name === "phone") {
      var digits = v.replace(/\D/g, "");
      ok = ok && digits.length >= 10 && digits.length <= 12;
    }
    if (el.name === "date" && ok && el.min) ok = v >= el.min;
    var err = document.getElementById(el.id + "-err");
    el.setAttribute("aria-invalid", String(!ok));
    if (err) {
      err.textContent = ok ? "" : MESSAGES[el.name];
      err.hidden = ok;
    }
    return ok;
  }

  function validate(form, fields) {
    form.setAttribute("data-tried", "");
    var bad = null;
    fields.forEach(function (n) {
      if (!checkField(form[n]) && !bad) bad = form[n];
    });
    if (bad) bad.focus();
    return !bad;
  }

  // Once someone has tried to send, re-check each field as they leave it
  document.addEventListener("focusout", function (e) {
    var el = e.target;
    var form = el.form;
    if (form && form.hasAttribute("data-tried") && MESSAGES[el.name]) checkField(el);
  });

  /* ---------- Events ---------- */

  document.addEventListener("click", function (e) {
    var t = e.target.closest("button, a");
    if (!t) return;

    if (t.hasAttribute("data-opt")) { selectOption(t); return; }
    if (t.hasAttribute("data-add")) {
      var card = t.closest("[data-product]");
      var chosen = card && $('[aria-checked="true"]', card);
      var p = findProduct(t.getAttribute("data-add"));
      addToCart(p.id, chosen ? chosen.getAttribute("data-opt") : (p.options ? p.options[0] : ""));
      return;
    }
    if (t.hasAttribute("data-tab")) {
      activeCat = t.getAttribute("data-tab");
      renderMenu();
      $('[data-tab="' + activeCat + '"]').focus();
      return;
    }
    if (t.hasAttribute("data-open-cart")) { openCart(); return; }
    if (t.hasAttribute("data-close-cart")) { closeCart(); return; }
    if (t.hasAttribute("data-qty")) {
      var key = t.getAttribute("data-key");
      var dir = t.getAttribute("data-qty");
      var before = cart.map(function (l) { return Object.assign({}, l); });
      var removed = null;
      cart.forEach(function (l) { if (l.key === key) { l.qty += Number(dir); if (l.qty <= 0) removed = l; } });
      cart = cart.filter(function (l) { return l.qty > 0; });
      saveCart();
      var same = $('[data-key="' + key.replace(/"/g, '\\"') + '"][data-qty="' + dir + '"]');
      if (same) same.focus();
      else $(".drawer-panel .icon-btn").focus();
      if (removed) {
        toast(findProduct(removed.id).name + " removed.", "Undo", function () {
          cart = before; saveCart();
          var back = $('[data-key="' + key.replace(/"/g, '\\"') + '"][data-qty="-1"]');
          if (back) back.focus();
        });
      }
      return;
    }
    if (t.hasAttribute("data-send")) {
      var f = $("[data-cart-form]");
      if (!validate(f, ["name", "time"])) return;
      store.set("mystika-name", f.name.value.trim());
      send(t.getAttribute("data-send"), orderMessage(f));
      return;
    }
    if (t.hasAttribute("data-book")) { openBooking(t.getAttribute("data-book")); return; }
    if (t.hasAttribute("data-book-send")) {
      var bf = $("[data-booking-form]");
      if (!validate(bf, ["date", "pax", "name", "phone"])) return;
      store.set("mystika-contact", { name: bf.name.value.trim(), phone: bf.phone.value.trim() });
      send(t.getAttribute("data-book-send"), bookingMessage(bf));
      return;
    }
  });

  $("[data-booking-services]").addEventListener("change", setBookingTitle);

  // Arrow key navigation for menu tabs
  $("[data-tabs]").addEventListener("keydown", function (e) {
    var ids = D.categories.map(function (c) { return c.id; });
    var i = ids.indexOf(activeCat);
    if (e.key === "ArrowRight") i += 1;
    else if (e.key === "ArrowLeft") i -= 1;
    else if (e.key === "Home") i = 0;
    else if (e.key === "End") i = ids.length - 1;
    else return;
    e.preventDefault();
    activeCat = ids[(i + ids.length) % ids.length];
    renderMenu();
    $('[data-tab="' + activeCat + '"]').focus();
  });

  function selectOption(btn) {
    $$("[data-opt]", btn.parentNode).forEach(function (b) {
      var on = b === btn;
      b.setAttribute("aria-checked", String(on));
      b.tabIndex = on ? 0 : -1;
    });
  }

  document.addEventListener("keydown", function (e) {
    var t = e.target;
    if (!t.hasAttribute || !t.hasAttribute("data-opt")) return;
    var keys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    if (!(e.key in keys)) return;
    e.preventDefault();
    var all = $$("[data-opt]", t.parentNode);
    var next = all[(all.indexOf(t) + keys[e.key] + all.length) % all.length];
    selectOption(next);
    next.focus();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !$("[data-cart]").hidden) closeCart();
  });

  dialog.addEventListener("click", function (e) { if (e.target === dialog) dialog.close(); });

  /* ---------- Boot ---------- */

  renderBento();
  renderBestsellers();
  renderMenu();
  renderBeans();
  renderServices();
  renderOffers();
  renderReviews();
  renderContact();
  renderCart();
  renderStatus();
  setInterval(renderStatus, 60000);

  // A link like cafemystika.com/#book-brewing-101 opens that booking form
  function bookFromHash() {
    var m = /^#book-(.+)$/.exec(location.hash);
    if (m && D.services.some(function (s) { return s.id === m[1]; })) openBooking(m[1]);
  }
  bookFromHash();
  window.addEventListener("hashchange", bookFromHash);

  // Highlight the nav link for the section on screen
  if ("IntersectionObserver" in window) {
    var navLinks = $$(".nav a");
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        navLinks.forEach(function (a) {
          if (a.getAttribute("href") === "#" + en.target.id) a.setAttribute("aria-current", "location");
          else a.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    navLinks.forEach(function (a) { var sec = $(a.getAttribute("href")); if (sec) spy.observe(sec); });
  }
})();
