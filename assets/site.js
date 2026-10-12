// Chrome Web Store link for Receipt Insights. Leave empty until the listing is
// approved; buttons then say it's in review instead of linking anywhere.
const STORE_URL = "https://chromewebstore.google.com/detail/mjdbkpdljblpinnincknloiacdmjhejg";

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

// Click a screenshot to see it full size. Click again, or press Esc, to close.
const viewer = document.createElement("dialog");
viewer.className = "viewer";
viewer.innerHTML = '<img alt=""><span class="viewer-hint">Click or press Esc to close</span>';
document.body.append(viewer);
viewer.addEventListener("click", () => viewer.close());

document.querySelectorAll("img.shot").forEach((img) => {
  img.tabIndex = 0;
  img.title = "Click to enlarge";
  const open = () => {
    const big = viewer.querySelector("img");
    big.src = img.currentSrc || img.src;
    big.alt = img.alt;
    viewer.showModal();
  };
  img.addEventListener("click", open);
  img.addEventListener("keydown", (e) => { if (e.key === "Enter") open(); });
});
