// Theme toggle: light is the default; the choice is remembered if storage works.
(function () {
  var root = document.documentElement;
  var button = document.getElementById('theme-toggle');
  var label = document.getElementById('theme-toggle-label');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    button.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    label.textContent = theme === 'dark' ? 'Light theme' : 'Dark theme';
  }

  var saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) {}
  applyTheme(saved === 'dark' ? 'dark' : 'light');

  button.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });
})();

// Decision scenarios: pick an answer to see feedback on that choice.
(function () {
  var scenarios = document.querySelectorAll('[data-scenario]');

  scenarios.forEach(function (scenario) {
    var buttons = scenario.querySelectorAll('.options button');
    var feedbacks = scenario.querySelectorAll('.fb');

    buttons.forEach(function (btn) {
      btn.setAttribute('aria-pressed', 'false');
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
        feedbacks.forEach(function (f) { f.hidden = true; });
        btn.setAttribute('aria-pressed', 'true');
        document.getElementById(btn.getAttribute('data-fb')).hidden = false;
      });
    });
  });
})();
