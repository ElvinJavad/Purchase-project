async function runBacktest() {
  try {
    const res = await fetch('data/stock_data.csv');
    const text = await res.text();
    const lines = text.trim().split('\n').slice(1);
    const data = lines.map(l => {
      const [sym,date,close] = l.split(',');
      return {sym, close: parseFloat(close)};
    });

    let equity = 10000;
    const holdings = {};

    data.forEach(row => {
      if (!holdings[row.sym] && row.close > 300) {
        holdings[row.sym] = row.close;
        equity -= row.close;
      } else if (holdings[row.sym] && row.close < 300) {
        equity += row.close;
        delete holdings[row.sym];
      }
    });

    Object.keys(holdings).forEach(sym => {
      equity += holdings[sym];
      delete holdings[sym];
    });

    document.getElementById('backtest-result').textContent = 'Final Equity: $' + equity.toFixed(2);
  } catch (e) {
    document.getElementById('backtest-result').textContent = 'Backtest error';
  }
}
document.addEventListener('DOMContentLoaded', runBacktest);
