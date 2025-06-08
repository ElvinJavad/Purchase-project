async function loadMacroData() {
  try {
    const res = await fetch('data/economic_data.json');
    const data = await res.json();
    const bull = data.gdp > 2 && data.unemployment < 5 && data.inflation < 3;
    const status = bull ? 'Bull' : 'Bear';
    document.getElementById('macro-status').textContent = status + ' market';
  } catch (e) {
    document.getElementById('macro-status').textContent = 'Unable to load data';
  }
}
document.addEventListener('DOMContentLoaded', loadMacroData);
