function loadExitManager() {
  const trades = JSON.parse(localStorage.getItem('trades') || '[]');
  const rows = trades.map((t,i) => `
    <tr>
      <td>${t.symbol}</td>
      <td>${t.entry}</td>
      <td>${t.stop}</td>
      <td>${t.qty}</td>
      <td><input type="number" data-index="${i}" class="price-input p-1 border" /></td>
      <td id="em-status-${i}"></td>
    </tr>`);
  document.getElementById('exit-table').innerHTML = rows.join('');
}

function checkPrices() {
  const trades = JSON.parse(localStorage.getItem('trades') || '[]');
  document.querySelectorAll('.price-input').forEach(input => {
    const idx = input.dataset.index;
    const price = parseFloat(input.value);
    if (!isNaN(price) && trades[idx]) {
      const statusEl = document.getElementById('em-status-' + idx);
      if (price < trades[idx].stop) {
        statusEl.textContent = 'Exit!';
        statusEl.classList.add('text-red-500');
      } else {
        statusEl.textContent = '';
        statusEl.classList.remove('text-red-500');
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadExitManager();
  document.getElementById('check-prices').addEventListener('click', checkPrices);
});
