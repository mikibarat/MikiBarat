document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('site-nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  const gamesInput = document.getElementById('games');
  const totalPointsInput = document.getElementById('total-points');
  const totalReboundsInput = document.getElementById('total-rebounds');
  const totalAssistsInput = document.getElementById('total-assists');
  const calcBtn = document.getElementById('calc-btn');
  const statsError = document.getElementById('stats-error');
  const statsResults = document.getElementById('stats-results');

  if (gamesInput && totalPointsInput && totalReboundsInput && totalAssistsInput && calcBtn && statsResults) {
    calcBtn.addEventListener('click', () => {
      statsError.textContent = "";

      const games = Number(gamesInput.value);
      const totalPoints = Number(totalPointsInput.value);
      const totalRebounds = Number(totalReboundsInput.value);
      const totalAssists = Number(totalAssistsInput.value);

      if (!games || games <= 0 || isNaN(games)) {
        statsError.textContent = "Add meg, hány mérkőzést játszottál le (legalább 1).";
        return;
      }

      if (totalPoints < 0 || totalRebounds < 0 || totalAssists < 0) {
        statsError.textContent = "A statisztikai értékek nem lehetnek negatívak.";
        return;
      }

      const ppg = games ? (totalPoints / games) : 0;
      const rpg = games ? (totalRebounds / games) : 0;
      const apg = games ? (totalAssists / games) : 0;

      let summary = "Stabil kiindulópont, érdemes több mérkőzésen keresztül figyelni az átlagok alakulását.";

      if (ppg >= 20) {
        summary = "Magas pontátlag, erős támadójátékra utal. A dobásszelekció és a döntéshozatal további finomhangolása sokat dobhat a hatékonyságon.";
      } else if (ppg >= 12) {
        summary = "Jó pontátlag, amely kiegyensúlyozott támadójátékot jelez. Tudatos szerepvállalással könnyen tovább erősíthető.";
      }

      if (rpg >= 10) {
        summary += " A lepattanóátlag alapján komoly palánk alatti munka van mögötte, ami a csapat szempontjából kiemelten értékes.";
      } else if (apg >= 7) {
        summary += " A gólpasszok száma szerint fontos szerepet töltesz be a játék szervezésében és a csapattársak helyzetbe hozásában.";
      }

      statsResults.innerHTML = `
        <h3>Eredmények</h3>
        <div class="stats-grid">
          <div class="stats-badge">Pont / meccs: <strong>${ppg.toFixed(1)}</strong></div>
          <div class="stats-badge">Lepattanó / meccs: <strong>${rpg.toFixed(1)}</strong></div>
          <div class="stats-badge">Gólpassz / meccs: <strong>${apg.toFixed(1)}</strong></div>
        </div>
        <p style="margin-top:0.9rem;">${summary}</p>
      `;
    });
  }
});
