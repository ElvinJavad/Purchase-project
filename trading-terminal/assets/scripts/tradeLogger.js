function loadTrades() {
  const trades = JSON.parse(localStorage.getItem('trades') || '[]');
  const rows = trades.map(t => `<tr><td>${t.symbol}</td><td>${t.entry}</td><td>${t.stop}</td><td>${t.qty}</td></tr>`);
  document.getElementById('trade-list').innerHTML = rows.join('');
}

function addTrade(e) {
  e.preventDefault();
  const symbol = document.getElementById('tl-symbol').value;
  const entry = parseFloat(document.getElementById('tl-entry').value);
  const stop = parseFloat(document.getElementById('tl-stop').value);
  const qty = parseInt(document.getElementById('tl-qty').value, 10);
  const trades = JSON.parse(localStorage.getItem('trades') || '[]');
  trades.push({symbol, entry, stop, qty});
  localStorage.setItem('trades', JSON.stringify(trades));
  loadTrades();
  e.target.reset();
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('trade-form').addEventListener('submit', addTrade);
  loadTrades();
});
