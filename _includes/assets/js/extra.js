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

(function() {
  const back_links = document.querySelectorAll('a.back');
  back_links.forEach(link => link.addEventListener('click', event => {
    if (window.history.length > 1) {
      event.preventDefault();
      window.history.back();
      setTimeout(() => window.location.href = link.href, 300);
    }
  }));
})();
