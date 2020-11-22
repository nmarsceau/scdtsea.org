(function() {
  const toggle = document.getElementById('toggle');
  const menu = document.getElementById('menu');
  toggle.addEventListener('click', function() {
    if (menu.classList.contains('collapse')) {
      toggle.setAttribute('aria-expanded', 'true');
      menu.classList.remove('collapse');
    }
    else {
      menu.classList.add('collapse');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();

(function() {
  const copyright_current_year = document.getElementById('copyright-current-year');
  if (copyright_current_year !== null) {
    copyright_current_year.innerText = (new Date()).getFullYear();
  }
})();
