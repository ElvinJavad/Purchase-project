async function loadEntries() {
  try {
    const res = await fetch('data/stock_data.csv');
    const text = await res.text();
    const lines = text.trim().split('\n').slice(1);
    const latest = {};
    lines.forEach(l => {
      const [sym,date,close] = l.split(',');
      latest[sym] = parseFloat(close);
    });
    const rows = Object.entries(latest)
      .filter(([s,c]) => c > 300)
      .map(([s,c]) => {
        const sl = (c * 0.95).toFixed(2);
        const size = Math.floor(10000 / c);
        return `<tr><td>${s}</td><td>${c}</td><td>${sl}</td><td>${size}</td></tr>`;
      });
    document.getElementById('entry-table').innerHTML = rows.join('');
  } catch (e) {
    document.getElementById('entry-table').innerHTML = '<tr><td colspan="4">Error loading data</td></tr>';
  }
}
document.addEventListener('DOMContentLoaded', loadEntries);
