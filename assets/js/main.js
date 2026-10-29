/* Jonathan Cruz Orozco — idioma (ES/EN), menú móvil y año del pie de página */
(function () {
  var root = document.documentElement;

  function currentLang() {
    return root.getAttribute('data-lang') === 'en' ? 'en' : 'es';
  }

  function applyMeta(lang) {
    var title = document.querySelector('title');
    if (title) {
      if (!title.dataset.es) title.dataset.es = title.textContent;
      title.textContent = lang === 'en' && title.dataset.en ? title.dataset.en : title.dataset.es;
    }
    var desc = document.querySelector('meta[name="description"]');
    if (desc) {
      if (!desc.dataset.es) desc.dataset.es = desc.getAttribute('content');
      desc.setAttribute('content', lang === 'en' && desc.dataset.en ? desc.dataset.en : desc.dataset.es);
    }
  }

  function setLang(lang) {
    root.setAttribute('data-lang', lang);
    root.lang = lang;
    try { localStorage.setItem('lang', lang); } catch (e) {}
    applyMeta(lang);
    // Quita ?lang= de la URL para que no se quede fijo al navegar
    try {
      var url = new URL(window.location.href);
      if (url.searchParams.has('lang')) {
        url.searchParams.delete('lang');
        history.replaceState(null, '', url.pathname + url.search + url.hash);
      }
    } catch (e) {}
  }

  document.addEventListener('DOMContentLoaded', function () {
    applyMeta(currentLang());

    var langBtn = document.querySelector('.lang-toggle');
    if (langBtn) {
      langBtn.addEventListener('click', function () {
        setLang(currentLang() === 'es' ? 'en' : 'es');
      });
    }

    var navBtn = document.querySelector('.nav-toggle');
    var nav = document.getElementById('site-nav');
    if (navBtn && nav) {
      navBtn.addEventListener('click', function () {
        var open = nav.classList.toggle('is-open');
        navBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      nav.addEventListener('click', function (e) {
        if (e.target.closest('a')) {
          nav.classList.remove('is-open');
          navBtn.setAttribute('aria-expanded', 'false');
        }
      });
    }

    var year = document.querySelectorAll('[data-year]');
    for (var i = 0; i < year.length; i++) year[i].textContent = new Date().getFullYear();

    // Cuenta las apps con insignia "Disponible" para no actualizar el número a mano
    var published = document.querySelector('[data-published-count]');
    if (published) published.textContent = document.querySelectorAll('.app-card .badge:not(.badge-soon)').length;
  });
})();
