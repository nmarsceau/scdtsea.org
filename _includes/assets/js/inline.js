document.querySelector('html').classList.add('js');

document.addEventListener('DOMContentLoaded', function() {
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
});

if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", user => {
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        document.location.href = "/admin/";
      });
    }
  });
}
