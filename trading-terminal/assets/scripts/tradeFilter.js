async function loadWatchlist() {
  try {
    const res = await fetch('data/stock_data.csv');
    const text = await res.text();
    const lines = text.trim().split('\n').slice(1);
    const latest = {};
    lines.forEach(l => {
      const [sym,date,close] = l.split(',');
      latest[sym] = parseFloat(close);
    });
    const list = Object.entries(latest)
      .filter(([s,c]) => c > 300)
      .map(([s,c]) => `<li>${s} (${c})</li>`);
    document.getElementById('watchlist').innerHTML = list.join('');
  } catch (e) {
    document.getElementById('watchlist').innerHTML = '<li>Error loading data</li>';
  }
}
document.addEventListener('DOMContentLoaded', loadWatchlist);
