// Executive membership math, matching the extension: 2% back on qualifying
// purchases, capped at $1,250/yr, against a $65 upgrade ($130 vs $65).
const RATE = 0.02, CAP = 1250, UPGRADE = 65;
let per = "month";

const $ = (id) => document.getElementById(id);
const money = (n) => (n < 0 ? "-$" : "$") + Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function update() {
  const factor = per === "month" ? 12 : 1;
  const spend = Math.max(0, parseFloat($("spend").value) || 0) * factor;
  const gas = Math.min(spend, Math.max(0, parseFloat($("gas").value) || 0) * factor);
  const eligible = spend - gas;
  const reward = Math.min(eligible * RATE, CAP);
  const net = reward - UPGRADE;
  const worth = net > 0;
  $("verdict").textContent = worth ? "Yes, it pays for itself" : "Not at this spending";
  $("verdict").className = `verdict ${worth ? "yes" : "no"}`;
  $("net").textContent = (net > 0 ? "+" : "") + money(net);
  $("netLabel").textContent = worth
    ? "a year more back than the upgrade costs"
    : `a year. Spend ${money(3250 - eligible)} more a year on qualifying items to break even.`;
  $("eligible").textContent = money(eligible);
  $("reward").textContent = money(reward) + (reward >= CAP ? " (capped)" : "");
}

document.querySelectorAll("[data-per]").forEach((b) => b.addEventListener("click", () => {
  if (b.dataset.per === per) return;
  // Keep the same yearly amount when switching between monthly and yearly.
  const k = b.dataset.per === "year" ? 12 : 1 / 12;
  for (const id of ["spend", "gas"]) $(id).value = Math.round((parseFloat($(id).value) || 0) * k);
  per = b.dataset.per;
  document.querySelectorAll("[data-per]").forEach((x) => x.classList.toggle("on", x === b));
  update();
}));
$("spend").addEventListener("input", update);
$("gas").addEventListener("input", update);
update();
