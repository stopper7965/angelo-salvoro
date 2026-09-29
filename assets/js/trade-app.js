(function () {
  "use strict";

  var T = window.MYSTIKA_TRADE;
  var B = window.MYSTIKA.business;
  var MK = window.MK;
  var $ = MK.$, $$ = MK.$$, esc = MK.esc, money = MK.money, store = MK.store;

  /* ---------- Normalise the catalogue into one item index ---------- */

  var ITEMS = {};

  function plural(unit, n) { return unit ? (n === 1 ? unit[0] : unit[1]) : ""; }

  function normalise() {
    T.sections.forEach(function (sec) {
      sec.groups.forEach(function (g) {
        if (g.kind === "bands") {
          g.items.forEach(function (it) {
            ITEMS[it.id] = Object.assign({ type: "bands", unit: g.unit, qty: g.qty, section: sec.id }, it);
          });
        } else if (g.kind === "items" && g.tierHead) {
          var mins = g.cakes ? [1, 2, 4] : [1, 24, 48];
          g.items = g.items.map(function (row) {
            var it = {
              id: row[0], name: row[1], type: "tiers", unit: g.unit, section: sec.id, retail: row[5],
              qty: g.cakes ? 1 : 24,
              tiers: [
                { min: mins[0], price: row[2], label: g.tierHead[0].toLowerCase() },
                { min: mins[1], price: row[3], label: g.tierHead[1] },
                { min: mins[2], price: row[4], label: g.tierHead[2] + " order" }
              ]
            };
            ITEMS[it.id] = it;
            return it;
          });
        } else if (g.kind === "courses") {
          g.items = g.items.map(function (row) {
            var it = { id: row[0], name: row[1], days: row[2], detail: row[3], closed: row[4], public: row[5], type: "course", unit: g.unit, qty: 1, section: sec.id };
            ITEMS[it.id] = it;
            return it;
          });
        } else if (g.kind === "events") {
          g.items.forEach(function (p) {
            var detail = "Up to " + p.guests + " guests, " + p.servings + " servings, " + p.hours + " hours, " + p.staff + (p.staff === 1 ? " staff" : " staff");
            ITEMS["ev-" + p.key + "-main"] = { id: "ev-" + p.key + "-main", name: p.name + " package, main bar", detail: detail, type: "fixed", price: p.main, unit: ["bar", "bars"], qty: 1, section: sec.id };
            ITEMS["ev-" + p.key + "-station"] = { id: "ev-" + p.key + "-station", name: p.name + " package, attached station", detail: "Up to two per main bar", type: "fixed", price: p.station, unit: ["station", "stations"], qty: 1, max: 2, section: sec.id };
          });
        } else if (g.kind === "packages") {
          g.items.forEach(function (it) {
            ITEMS[it.id] = Object.assign({ type: it.noFee ? "free" : "fixed", unit: g.unit, qty: 1, section: sec.id, detail: it.for }, it);
          });
        } else if (g.items) {
          g.items.forEach(function (it) {
            ITEMS[it.id] = Object.assign({ unit: g.unit, qty: 1, section: sec.id }, it);
          });
        }
      });
    });
  }

  /* ---------- Pricing rules, straight from the catalogue ---------- */

  function bandIndex(kg) { return kg >= 100 ? 4 : kg >= 50 ? 3 : kg >= 30 ? 2 : kg >= 10 ? 1 : 0; }
  function groupDiscount(n) { return n >= 16 ? 0.25 : n >= 10 ? 0.20 : n >= 5 ? 0.15 : 0; }      // closed rate courses
  function togetherDiscount(n) { return n >= 9 ? 0.25 : n >= 5 ? 0.20 : n >= 3 ? 0.15 : n >= 2 ? 0.10 : 0; } // coaching passes
  var BAND_LABELS = ["Band 1, 1 to 9 kg", "Band 2, 10 to 29 kg", "Band 3, 30 to 49 kg", "Band 4, 50 to 99 kg", "Band 5, 100 kg and up"];

  function beanKg() {
    return quote.reduce(function (s, l) { return s + (ITEMS[l.id].type === "bands" ? l.qty : 0); }, 0);
  }

  // Returns { each, total, note } in pesos; each is null when the line is quoted per job
  function price(line) {
    var it = ITEMS[line.id], q = line.qty, each, note = "";
    switch (it.type) {
      case "bands":
        var b = bandIndex(beanKg());
        each = it.bands[b]; note = BAND_LABELS[b].split(",")[0] + " price";
        break;
      case "tiers":
        var tier = it.tiers[0];
        it.tiers.forEach(function (t) { if (q >= t.min) tier = t; });
        each = tier.price; note = tier.label + " price";
        break;
      case "course":
        if (line.mode === "public") { each = it.public; note = "Public batch"; }
        else {
          var d = groupDiscount(q);
          each = Math.round(it.closed * (1 - d));
          note = "Your team only" + (d ? ", group rate less " + Math.round(d * 100) + "%" : "");
        }
        break;
      case "coach":
        var cd = it.group ? togetherDiscount(q) : 0;
        each = Math.round(it.price * (1 - cd));
        note = cd ? "Booked together, less " + Math.round(cd * 100) + "%" : "";
        break;
      case "fixed": each = it.price; break;
      case "free": each = 0; note = "No fee"; break;
      default: each = null; note = "Quoted per job";
    }
    return { each: each, total: each === null ? null : each * q, note: note };
  }

  /* ---------- Rendering the catalogue ---------- */

  function addBtn(it, label) {
    return '<button class="btn btn-ink btn-add" type="button" data-add="' + it.id + '" aria-label="Add ' + esc(it.name) + ' to quote">' + (label || "Add") + "</button>";
  }

  function priceCell(it) {
    if (it.type === "free") return '<span class="price">Free</span>';
    if (it.type === "quote") return it.price ? '<span class="price">From ' + money(it.price) + "</span>" : '<span class="price price-muted">Quoted</span>';
    if (it.type === "tiers" && !it.retail) {
      return '<ul class="tier-list">' + it.tiers.map(function (t) {
        return "<li><span class=\"price\">" + money(t.price) + "</span> " + esc(t.label) + "</li>";
      }).join("") + "</ul>";
    }
    return '<span class="price">' + money(it.price) + "</span>" + (it.unit && it.unit[0] !== "job" ? ' <span class="per">per ' + esc(it.unit[0]) + "</span>" : "");
  }

  function renderGroup(g) {
    var h = '<div class="pgroup"><h3>' + esc(g.title) + "</h3>";
    if (g.kind === "bands") {
      h += '<table class="ptable ptable-bands"><thead><tr><th scope="col">Profile</th>' +
        g.bandLabels.map(function (b) { return '<th scope="col" class="num">' + esc(b) + "</th>"; }).join("") +
        '<th scope="col"><span class="sr-only">Add</span></th></tr></thead><tbody>' +
        g.items.map(function (it) {
          return '<tr><th scope="row"><span class="pname">' + esc(it.name) + (it.badge ? ' <span class="badge">' + esc(it.badge) + "</span>" : "") + '</span><span class="pdetail">' + esc(it.detail) + "</span></th>" +
            it.bands.map(function (p, i) {
              var short = g.bandLabels[i].split(" ")[0] + "+ kg";
              return '<td class="num" data-label="' + esc(short) + '">' + money(p) + "</td>";
            }).join("") +
            '<td class="act">' + addBtn(it) + "</td></tr>";
        }).join("") + "</tbody></table>";
    } else if (g.kind === "items" && g.tierHead) {
      h += '<table class="ptable"><thead><tr><th scope="col">Item</th>' +
        g.tierHead.map(function (t) { return '<th scope="col" class="num">' + esc(t) + "</th>"; }).join("") +
        '<th scope="col">Suggested retail</th><th scope="col"><span class="sr-only">Add</span></th></tr></thead><tbody>' +
        g.items.map(function (it) {
          return '<tr><th scope="row"><span class="pname">' + esc(it.name) + "</span></th>" +
            it.tiers.map(function (t, i) { return '<td class="num" data-label="' + esc(g.tierHead[i]) + '">' + money(t.price) + "</td>"; }).join("") +
            '<td data-label="Suggested retail">₱' + esc(it.retail) + '</td><td class="act">' + addBtn(it) + "</td></tr>";
        }).join("") + "</tbody></table>";
    } else if (g.kind === "courses") {
      h += '<table class="ptable"><thead><tr><th scope="col">Course</th><th scope="col" class="num">Days</th><th scope="col" class="num">Your team only</th><th scope="col" class="num">Public batch</th><th scope="col"><span class="sr-only">Add</span></th></tr></thead><tbody>' +
        g.items.map(function (it) {
          return '<tr><th scope="row"><span class="pname">' + esc(it.name) + '</span><span class="pdetail">' + esc(it.detail) + "</span></th>" +
            '<td class="num" data-label="Days">' + it.days + '</td><td class="num" data-label="Your team only">' + money(it.closed) + '</td><td class="num" data-label="Public batch">' + money(it.public) + "</td>" +
            '<td class="act">' + addBtn(it) + "</td></tr>";
        }).join("") + "</tbody></table>";
    } else if (g.kind === "events") {
      h += '<table class="ptable"><thead><tr><th scope="col">Package</th><th scope="col" class="num">Guests</th><th scope="col" class="num">Servings</th><th scope="col" class="num">Hours</th><th scope="col" class="num">Staff</th><th scope="col" class="num">Main bar</th><th scope="col" class="num">Each station</th><th scope="col"><span class="sr-only">Add</span></th></tr></thead><tbody>' +
        g.items.map(function (p) {
          var main = ITEMS["ev-" + p.key + "-main"], st = ITEMS["ev-" + p.key + "-station"];
          return '<tr><th scope="row"><span class="pname">' + esc(p.name) + "</span></th>" +
            '<td class="num" data-label="Guests">Up to ' + p.guests + '</td><td class="num" data-label="Servings">' + p.servings + '</td><td class="num" data-label="Hours">' + p.hours + '</td><td class="num" data-label="Staff">' + p.staff + "</td>" +
            '<td class="num" data-label="Main bar">' + money(p.main) + '</td><td class="num" data-label="Each station">' + money(p.station) + "</td>" +
            '<td class="act act-2">' + addBtn(main, "Add bar") + addBtn(st, "Add station") + "</td></tr>";
        }).join("") + "</tbody></table>";
    } else if (g.kind === "list") {
      h += '<dl class="plist">' + g.rows.map(function (r) { return "<div><dt>" + esc(r[0]) + "</dt><dd>" + esc(r[1]) + "</dd></div>"; }).join("") + "</dl>";
    } else if (g.kind === "plans") {
      h += '<div class="plans">' + g.items.map(function (it) {
        return '<article class="plan' + (it.featured ? " plan-featured" : "") + '"><h4>' + esc(it.name) + "</h4>" +
          '<p class="plan-price"><span class="price">' + (it.from ? "From " : "") + money(it.price) + '</span> <span class="per">' + esc(it.per) + "</span></p>" +
          '<ul class="ticks">' + it.points.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ul>" +
          addBtn(it, it.type === "quote" ? "Ask for a site survey" : "Add to quote") + "</article>";
      }).join("") + "</div>";
    } else if (g.kind === "packages") {
      h += '<div class="pkgs">' + g.items.map(function (it) {
        var save = it.list ? it.list - it.price : 0;
        return '<article class="pkg' + (it.featured ? " pkg-featured" : "") + '"><h4>' + esc(it.name) + '</h4><p class="pkg-for">' + esc(it.for) + "</p>" +
          '<p class="pkg-price">' + (it.noFee ? '<span class="price">No fee</span>' :
            '<span class="price">' + money(it.price) + '</span> <span class="was"><span class="sr-only">instead of </span><s>' + money(it.list) + "</s></span>") + "</p>" +
          (save ? '<p class="save">You save ' + money(save) + "</p>" : "") +
          '<ul class="ticks">' + it.points.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ul>" +
          '<p class="pkg-pay">' + esc(it.pay) + "</p>" + addBtn(it, it.noFee ? "Ask to qualify" : "Add to quote") + "</article>";
      }).join("") + "</div>";
    } else {
      h += '<table class="ptable ptable-simple"><thead><tr><th scope="col">' + esc((g.head || ["Item"])[0]) + '</th><th scope="col" class="num">' + esc((g.head || ["", "Price"])[1]) + '</th><th scope="col"><span class="sr-only">Add</span></th></tr></thead><tbody>' +
        g.items.map(function (it) {
          return '<tr><th scope="row"><span class="pname">' + esc(it.name) + (it.badge ? ' <span class="badge">' + esc(it.badge) + "</span>" : "") + "</span>" + (it.detail ? '<span class="pdetail">' + esc(it.detail) + "</span>" : "") + "</th>" +
            '<td class="num" data-label="Price">' + priceCell(it) + '</td><td class="act">' + (it.id === "grind-free" ? "" : addBtn(it, it.type === "quote" ? "Ask" : "Add")) + "</td></tr>";
        }).join("") + "</tbody></table>";
    }
    if (g.footnote) h += '<p class="footnote">' + esc(g.footnote) + "</p>";
    return h + "</div>";
  }

  function renderSections() {
    $("[data-sections]").innerHTML = T.sections.map(function (sec, i) {
      return '<section class="section tsec' + (i % 2 ? " theme-dark" : " theme-light") + '" id="' + sec.id + '" aria-labelledby="' + sec.id + '-h">' +
        '<div class="wrap"><div class="section-head"><p class="tsec-brand">' + esc(sec.brand) + '</p><h2 id="' + sec.id + '-h">' + esc(sec.title) + "</h2>" +
        "<p>" + esc(sec.intro) + "</p></div>" +
        (sec.note ? '<p class="callout">' + esc(sec.note) + "</p>" : "") +
        sec.groups.map(renderGroup).join("") +
        (sec.terms ? '<p class="footnote footnote-terms">' + esc(sec.terms) + "</p>" : "") +
        "</div></section>";
    }).join("");
    $("[data-section-index]").innerHTML = T.sections.map(function (sec) {
      return '<li><a href="#' + sec.id + '">' + esc(sec.title) + "</a></li>";
    }).join("") + '<li><a href="#terms">Terms</a></li>';
  }

  var activeAud = T.audiences[0].id;
  function renderAudience() {
    $("[data-aud-tabs]").innerHTML = T.audiences.map(function (a) {
      var on = a.id === activeAud;
      return '<button type="button" role="tab" id="aud-' + a.id + '" aria-selected="' + on + '" aria-controls="aud-panel" tabindex="' + (on ? 0 : -1) + '" data-aud="' + a.id + '">' + esc(a.name) + "</button>";
    }).join("");
    var a = T.audiences.filter(function (x) { return x.id === activeAud; })[0];
    var panel = $("[data-aud-panel]");
    panel.id = "aud-panel";
    panel.setAttribute("aria-labelledby", "aud-" + a.id);
    panel.innerHTML = '<div class="aud-copy"><h3>' + esc(a.headline) + "</h3><p>" + esc(a.lead) + "</p>" +
      '<p class="aud-jump-h">Go straight to</p><ul class="aud-jump">' + a.jump.map(function (id) {
        var sec = T.sections.filter(function (s) { return s.id === id; })[0];
        return '<li><a href="#' + id + '">' + esc(sec.title) + "</a></li>";
      }).join("") + "</ul></div>" +
      '<div class="aud-picks"><p class="aud-picks-h">Start here</p>' + a.picks.map(function (id) {
        var it = ITEMS[id], pr = price({ id: id, qty: it.qty || 1, mode: "public" });
        var shown = it.type === "course" ? money(it.public) + " per person, public batch" :
          it.type === "free" ? "No fee" : it.type === "quote" ? (it.price ? "From " + money(it.price) : "Quoted") : money(pr.each) + (it.per ? " " + it.per : "");
        return '<div class="pick"><div><p class="pick-name">' + esc(it.name) + '</p><p class="pick-price">' + esc(shown) + "</p>" +
          (it.detail ? '<p class="pick-detail">' + esc(it.detail) + "</p>" : "") + "</div>" + addBtn(it) + "</div>";
      }).join("") + "</div>";
  }

  function renderStatic() {
    $("[data-validity]").textContent = T.validity + " " + T.installments;
    $("[data-credentials]").innerHTML = T.credentials.map(function (c) { return "<li>" + esc(c) + "</li>"; }).join("");
    $("[data-brands]").innerHTML = T.brands.map(function (b) {
      return "<li>" + (b.logo ? '<img src="' + esc(b.logo) + '" alt="" loading="lazy">' : '<span class="brand-initial" aria-hidden="true">' + esc(b.name.replace(/^The /, "").charAt(0)) + "</span>") +
        "<strong>" + esc(b.name) + "</strong><span>" + esc(b.does) + "</span></li>";
    }).join("");
    $("[data-terms]").innerHTML = T.terms.map(function (t) { return "<div><dt>" + esc(t[0]) + "</dt><dd>" + esc(t[1]) + "</dd></div>"; }).join("");
  }

  /* ---------- Quote state ---------- */

  var quote = [];

  function saveQuote() { store.set("mystika-quote", quote); renderQuote(); }

  function addToQuote(id) {
    var it = ITEMS[id];
    var line = quote.filter(function (l) { return l.id === id; })[0];
    if (line) {
      if (it.type === "free" || it.type === "quote") { MK.toast(it.name + " is already in your quote.", "View quote", openQuote); return; }
      line.qty += it.type === "bands" ? it.qty : 1;
      if (it.max) line.qty = Math.min(line.qty, it.max);
    } else {
      quote.push({ id: id, qty: it.qty || 1, mode: it.type === "course" ? "public" : undefined });
    }
    saveQuote();
    var l = quote.filter(function (x) { return x.id === id; })[0];
    MK.toast(it.name + " added" + (it.unit ? ", " + l.qty + " " + plural(it.unit, l.qty) : "") + ".", "View quote", openQuote);
    $$("[data-quote-count]").forEach(function (el) { el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump"); });
  }

  function renderQuote() {
    var count = quote.length;
    $$("[data-quote-count]").forEach(function (el) { el.textContent = count; el.hidden = count === 0; });
    $$("button[data-open-quote]").forEach(function (b) {
      if (b.closest(".header-actions") || b.closest(".actionbar")) b.setAttribute("aria-label", "Your quote, " + count + (count === 1 ? " item" : " items"));
    });

    $("[data-quote-lines]").innerHTML = quote.map(function (l, i) {
      var it = ITEMS[l.id], pr = price(l);
      var fixedQty = it.type === "free" || it.type === "quote";
      return '<li class="qline">' +
        '<div class="qline-info"><p class="cart-line-name">' + esc(it.name) + "</p>" +
        '<p class="cart-line-meta">' + (pr.each === null ? "Quoted per job" : pr.each === 0 ? "No fee" : money(pr.each) + " per " + esc(plural(it.unit, 1)) + (pr.note ? ", " + esc(pr.note) : "")) + "</p>" +
        (it.type === "course" ? '<div class="seg seg-sm" role="radiogroup" aria-label="' + esc(it.name) + ' format">' +
          ["public", "closed"].map(function (m) {
            var on = (l.mode || "public") === m;
            return '<button type="button" role="radio" aria-checked="' + on + '" tabindex="' + (on ? 0 : -1) + '" data-mode="' + m + '" data-line="' + i + '">' + (m === "public" ? "Public batch" : "Your team only") + "</button>";
          }).join("") + "</div>" : "") +
        "</div>" +
        '<div class="qline-side">' +
        (fixedQty ? "" :
          '<div class="qty qty-input" role="group" aria-label="Quantity of ' + esc(it.name) + '">' +
          '<button type="button" data-step="-1" data-line="' + i + '" aria-label="' + (l.qty === 1 ? "Remove " : "One less ") + esc(it.name) + '">−</button>' +
          '<label class="sr-only" for="qq-' + i + '">Quantity in ' + esc(plural(it.unit, 2)) + '</label>' +
          '<input id="qq-' + i + '" type="number" inputmode="numeric" min="1"' + (it.max ? ' max="' + it.max + '"' : "") + ' value="' + l.qty + '" data-qty-input="' + i + '">' +
          '<button type="button" data-step="1" data-line="' + i + '" aria-label="One more ' + esc(it.name) + '">+</button></div>' +
          '<p class="qline-unit">' + esc(plural(it.unit, l.qty)) + "</p>") +
        '<p class="qline-total">' + (pr.total === null ? "Quote" : pr.total === 0 ? "Free" : money(pr.total)) + "</p>" +
        '<button type="button" class="link-btn" data-remove="' + i + '">Remove<span class="sr-only"> ' + esc(it.name) + "</span></button>" +
        "</div></li>";
    }).join("");

    var kg = beanKg();
    var note = $("[data-band-note]");
    if (kg > 0) {
      var b = bandIndex(kg);
      var next = [10, 30, 50, 100][b];
      note.textContent = "Beans total " + kg + " kg, so " + BAND_LABELS[b] + " prices apply to every profile." +
        (next ? " Add " + (next - kg) + " kg more to reach Band " + (b + 2) + "." : "");
      note.hidden = false;
    } else note.hidden = true;

    var priced = quote.map(price).filter(function (p) { return p.total !== null; });
    var total = priced.reduce(function (s, p) { return s + p.total; }, 0);
    var quoted = quote.length - priced.length;
    $("[data-quote-empty]").hidden = quote.length > 0;
    $("[data-quote-total-row]").hidden = total === 0;
    $("[data-quote-total]").textContent = money(total);
    $("[data-quote-note]").textContent = (quoted ? quoted + (quoted === 1 ? " item is" : " items are") + " quoted per job and not in the estimate. " : "") +
      "We reply with a written quotation. Nothing is charged until you approve it.";
  }

  function quoteMessage(f) {
    var lines = quote.map(function (l) {
      var it = ITEMS[l.id], pr = price(l);
      var qty = (it.type === "free" || it.type === "quote") ? "" : ", " + l.qty + " " + plural(it.unit, l.qty);
      var mode = it.type === "course" ? (l.mode === "closed" ? ", our team only" : ", public batch") : "";
      var band = it.type === "bands" ? " (" + BAND_LABELS[bandIndex(beanKg())].split(",")[0] + ")" : "";
      return "- " + it.name + qty + mode + band + ": " + (pr.total === null ? "please quote" : pr.total === 0 ? "no fee" : money(pr.total));
    });
    var priced = quote.map(price).filter(function (p) { return p.total; });
    var total = priced.reduce(function (s, p) { return s + p.total; }, 0);
    var msg = "Hi Cafe Mystika! Quote request from cafemystika.com\n" +
      "Business: " + f.business.value.trim() + " (" + f.type.value + "), " + f.town.value.trim() + "\n" +
      "Contact: " + f.name.value.trim() + ", " + f.phone.value.trim() + "\n" +
      "What we are trying to fix: " + f.need.value.trim();
    if (lines.length) msg += "\n\nItems:\n" + lines.join("\n");
    if (total) msg += "\nEstimated at list: " + money(total);
    if (f.installment.checked) msg += "\nPlease include a three part installment plan.";
    return msg;
  }

  /* ---------- Drawer ---------- */

  var lastFocus = null;
  function openQuote() {
    lastFocus = document.activeElement;
    var saved = store.get("mystika-business", {});
    var f = $("[data-quote-form]");
    ["business", "type", "town", "name", "phone"].forEach(function (k) { if (saved[k] && !f[k].value) f[k].value = saved[k]; });
    if (saved.type) f.type.value = saved.type;
    MK.hideToast();
    MK.setBackgroundInert(true);
    var d = $("[data-quote]");
    d.hidden = false;
    document.body.classList.add("locked");
    requestAnimationFrame(function () { d.classList.add("open"); });
    $(".drawer-panel .icon-btn").focus();
  }

  function closeQuote() {
    var d = $("[data-quote]");
    d.classList.remove("open");
    document.body.classList.remove("locked");
    MK.setBackgroundInert(false);
    setTimeout(function () { d.hidden = true; }, 220);
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }

  function setQty(i, q) {
    var it = ITEMS[quote[i].id];
    if (it.max) q = Math.min(q, it.max);
    if (q <= 0) return removeLine(i);
    quote[i].qty = q;
    saveQuote();
  }

  function removeLine(i) {
    var before = quote.map(function (l) { return Object.assign({}, l); });
    var it = ITEMS[quote[i].id];
    quote.splice(i, 1);
    saveQuote();
    $(".drawer-panel .icon-btn").focus();
    MK.toast(it.name + " removed.", "Undo", function () { quote = before; saveQuote(); });
  }

  /* ---------- Events ---------- */

  document.addEventListener("click", function (e) {
    var t = e.target.closest("button, a");
    if (!t) return;
    if (t.hasAttribute("data-add")) { addToQuote(t.getAttribute("data-add")); return; }
    if (t.hasAttribute("data-open-quote")) { openQuote(); return; }
    if (t.hasAttribute("data-close-quote")) { closeQuote(); return; }
    if (t.hasAttribute("data-aud")) { selectAudience(t.getAttribute("data-aud"), true); return; }
    if (t.hasAttribute("data-step")) {
      var i = Number(t.getAttribute("data-line")), dir = t.getAttribute("data-step");
      var it = ITEMS[quote[i].id];
      var step = it.type === "bands" ? 1 : 1;
      var removing = quote[i].qty + Number(dir) * step <= 0;
      setQty(i, quote[i].qty + Number(dir) * step);
      if (!removing) { var same = $('[data-step="' + dir + '"][data-line="' + i + '"]'); if (same) same.focus(); }
      return;
    }
    if (t.hasAttribute("data-remove")) { removeLine(Number(t.getAttribute("data-remove"))); return; }
    if (t.hasAttribute("data-mode")) {
      var li = Number(t.getAttribute("data-line"));
      quote[li].mode = t.getAttribute("data-mode");
      saveQuote();
      var back = $('[data-mode="' + quote[li].mode + '"][data-line="' + li + '"]');
      if (back) back.focus();
      return;
    }
    if (t.hasAttribute("data-quote-send")) {
      var f = $("[data-quote-form]");
      if (!MK.validate(f, ["business", "town", "name", "phone", "need"])) return;
      store.set("mystika-business", { business: f.business.value.trim(), type: f.type.value, town: f.town.value.trim(), name: f.name.value.trim(), phone: f.phone.value.trim() });
      MK.send(t.getAttribute("data-quote-send"), quoteMessage(f), B, "Quote request: " + f.business.value.trim());
    }
  });

  document.addEventListener("change", function (e) {
    if (e.target.hasAttribute("data-qty-input")) {
      var i = Number(e.target.getAttribute("data-qty-input"));
      var v = Math.max(0, Math.floor(Number(e.target.value) || 0));
      setQty(i, v);
      var again = $('[data-qty-input="' + i + '"]');
      if (again) again.focus();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !$("[data-quote]").hidden) { closeQuote(); return; }
    var t = e.target;
    if (t.hasAttribute && t.hasAttribute("data-mode") && (e.key === "ArrowRight" || e.key === "ArrowLeft")) {
      e.preventDefault();
      var li = Number(t.getAttribute("data-line"));
      quote[li].mode = (quote[li].mode || "public") === "public" ? "closed" : "public";
      saveQuote();
      $('[data-mode="' + quote[li].mode + '"][data-line="' + li + '"]').focus();
    }
  });

  function selectAudience(id, focus) {
    activeAud = id;
    renderAudience();
    if (focus) $('[data-aud="' + id + '"]').focus();
    if (history.replaceState) history.replaceState(null, "", "#for-" + id);
  }

  $("[data-aud-tabs]").addEventListener("keydown", function (e) {
    var ids = T.audiences.map(function (a) { return a.id; });
    var i = ids.indexOf(activeAud);
    if (e.key === "ArrowRight") i += 1;
    else if (e.key === "ArrowLeft") i -= 1;
    else if (e.key === "Home") i = 0;
    else if (e.key === "End") i = ids.length - 1;
    else return;
    e.preventDefault();
    selectAudience(ids[(i + ids.length) % ids.length], true);
  });

  /* ---------- Boot ---------- */

  normalise();
  quote = store.get("mystika-quote", []).filter(function (l) { return ITEMS[l.id] && l.qty > 0; });
  renderStatic();
  renderSections();
  var m = /^#for-(\w+)$/.exec(location.hash);
  if (m && T.audiences.some(function (a) { return a.id === m[1]; })) activeAud = m[1];
  renderAudience();
  if (m) { var forSec = $("#for"); if (forSec) forSec.scrollIntoView(); }
  renderQuote();
  MK.renderAnnouncements(T.announcements);
  MK.renderLinks(B);
  if (/^#quote$/.test(location.hash)) openQuote();

  // Highlight the nav link for the section on screen
  if ("IntersectionObserver" in window) {
    var navLinks = $$('.nav a[href^="#"]');
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
