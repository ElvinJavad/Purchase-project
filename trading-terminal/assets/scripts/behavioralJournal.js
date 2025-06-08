function loadJournal() {
  const entries = JSON.parse(localStorage.getItem('journal') || '[]');
  const last5 = entries.slice(-5).reverse();
  document.getElementById('journal-list').innerHTML = last5.map(e => `<li>${e.date}: ${e.note}</li>`).join('');
}

function addEntry(e) {
  e.preventDefault();
  const note = document.getElementById('journal-note').value;
  const entries = JSON.parse(localStorage.getItem('journal') || '[]');
  entries.push({date: new Date().toLocaleDateString(), note});
  localStorage.setItem('journal', JSON.stringify(entries));
  loadJournal();
  e.target.reset();
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('journal-form').addEventListener('submit', addEntry);
  loadJournal();
});
