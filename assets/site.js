// Chrome Web Store link for Receipt Insights. Leave empty until the listing is
// approved; buttons then say it's in review instead of linking anywhere.
const STORE_URL = "";

document.querySelectorAll("[data-store-link]").forEach((a) => {
  if (STORE_URL) {
    a.href = STORE_URL;
  } else {
    a.removeAttribute("href");
    a.classList.add("pending");
    a.textContent = "Coming soon to the Chrome Web Store";
  }
});

document.querySelectorAll("[data-year]").forEach((el) => { el.textContent = new Date().getFullYear(); });
