/* Shared helpers for every page: DOM, storage, toast, sending messages, form checks, modal focus. */
(function () {
  "use strict";

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var money = function (n) { return "₱" + Number(n).toLocaleString("en-PH"); };

  /* ---------- Storage (optional, pages work without it) ---------- */
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* ignore */ } }
  };

  /* ---------- Toast: a persistent live region, shown with a class ---------- */
  var toastTimer;
  function hideToast() {
    var t = $("[data-toast]");
    if (!t) return;
    t.classList.remove("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.innerHTML = ""; }, 200);
  }
  function toast(text, actionLabel, action, ms) {
    var t = $("[data-toast]");
    if (!t) return;
    clearTimeout(toastTimer);
    t.innerHTML = "<span>" + esc(text) + "</span>" + (actionLabel ? '<button type="button">' + esc(actionLabel) + "</button>" : "");
    if (actionLabel) $("button", t).addEventListener("click", function () { hideToast(); action(); });
    t.classList.add("show");
    toastTimer = setTimeout(hideToast, ms || 5000);
  }

  /* ---------- Sending: text, Messenger or email, no backend needed ---------- */
  var isPhone = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;

  function send(channel, message, B, subject) {
    if (channel === "sms") {
      toast(isPhone
        ? "Opening your messages app with everything written. Press send there."
        : "Texting works best from a phone. If nothing opened, use Messenger, email or call " + B.phoneDisplay + ".", null, null, 6000);
      window.location.href = "sms:" + B.phone + "?body=" + encodeURIComponent(message);
      return;
    }
    if (channel === "email" && B.email) {
      toast("Opening your email app with everything written. Press send there.", null, null, 6000);
      window.location.href = "mailto:" + B.email + "?subject=" + encodeURIComponent(subject || "Enquiry from cafemystika.com") + "&body=" + encodeURIComponent(message);
      return;
    }
    var open = function () { window.open(B.messenger, "_blank", "noopener"); };
    var failed = function () {
      toast("Messenger is opening. Type your message there, or send by text instead.", null, null, 6000);
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

  /* ---------- Modal focus: make everything outside the open panel inert ---------- */
  function setBackgroundInert(on) {
    $$("body > a.skip, body > .statusbar, body > .site-header, body > main, body > footer, body > .actionbar").forEach(function (el) {
      if (on) { el.setAttribute("inert", ""); el.setAttribute("aria-hidden", "true"); }
      else { el.removeAttribute("inert"); el.removeAttribute("aria-hidden"); }
    });
  }

  /* ---------- Form checks with inline messages ---------- */
  var MESSAGES = {
    name: "Add your name so we know who it is for.",
    time: "Choose a pickup time.",
    date: "Pick the date you would like.",
    pax: "Enter how many people are coming, 1 or more.",
    phone: "Enter your mobile number with 11 digits, like 0917 123 4567.",
    business: "Add your business or school name.",
    town: "Add your town or city so we can work out delivery.",
    need: "Tell us in a few words what you are trying to fix."
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

  /* ---------- Small shared bits ---------- */
  function renderLinks(B) {
    var links = {
      tel: "tel:" + B.phone,
      sms: "sms:" + B.phone,
      email: B.email ? "mailto:" + B.email : "",
      messenger: B.messenger,
      facebook: B.facebook,
      instagram: B.instagram,
      tripadvisor: B.tripadvisor,
      directions: "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(B.mapsQuery)
    };
    $$("[data-link]").forEach(function (a) {
      var href = links[a.getAttribute("data-link")];
      if (href) a.href = href; else a.hidden = true;
    });
    $$('a[target="_blank"]').forEach(function (a) {
      if (!$(".sr-only", a)) a.insertAdjacentHTML("beforeend", '<span class="sr-only"> (opens in a new tab)</span>');
    });
    $$("[data-address]").forEach(function (el) { el.textContent = B.address; });
    $$("[data-phone-display]").forEach(function (el) { el.textContent = B.phoneDisplay; });
    $$("[data-email-display]").forEach(function (el) { el.textContent = B.email; });
    $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }

  window.MK = {
    $: $, $$: $$, esc: esc, money: money, store: store,
    toast: toast, hideToast: hideToast, send: send, isPhone: isPhone,
    setBackgroundInert: setBackgroundInert,
    checkField: checkField, validate: validate, renderLinks: renderLinks
  };
})();
