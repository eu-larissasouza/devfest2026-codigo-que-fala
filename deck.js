(function () {
  // Links do slide "Material". Troque aqui quando o repositório e o artigo existirem.
  var LINKS = {
    slides: 'https://eu-larissasouza.github.io/devfest2026-codigo-que-fala/',
    demo: 'demo.html',
    repo: 'https://github.com/eu-larissasouza/devfest2026-codigo-que-fala',
    artigo: null // ex.: 'https://dev.to/larysouza/...' quando publicar
  };

  var stage = document.getElementById('stage');
  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  var count = document.getElementById('count');
  var pos = document.querySelector('.trail .pos');
  var i = 0;

  // preenche links do slide de material
  document.querySelectorAll('[data-link]').forEach(function (a) {
    var key = a.getAttribute('data-link');
    var url = LINKS[key];
    if (url) {
      a.setAttribute('href', url);
      a.textContent = url.replace(/^https?:\/\//, '');
    } else {
      a.removeAttribute('href');
      a.textContent = 'em breve';
      a.style.opacity = '.6';
    }
  });

  // escala o palco 1920x1080 para caber em qualquer janela (mantém proporção)
  function fit() {
    var s = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    stage.style.transform = 'translate(-50%,-50%) scale(' + s + ')';
  }

  function show(n) {
    i = Math.max(0, Math.min(slides.length - 1, n));
    slides.forEach(function (s, k) { s.classList.toggle('active', k === i); });
    count.textContent = String(i + 1).padStart(2, '0') + ' / ' + String(slides.length).padStart(2, '0');
    pos.style.left = (slides.length > 1 ? (i / (slides.length - 1)) * 100 : 0) + '%';
    history.replaceState(null, '', '#' + (i + 1));
  }

  document.getElementById('prev').onclick = function () { show(i - 1); };
  document.getElementById('next').onclick = function () { show(i + 1); };

  document.addEventListener('keydown', function (e) {
    if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].indexOf(e.key) > -1) { e.preventDefault(); show(i + 1); }
    if (['ArrowLeft', 'ArrowUp', 'PageUp'].indexOf(e.key) > -1) { e.preventDefault(); show(i - 1); }
    if (e.key === 'Home') show(0);
    if (e.key === 'End') show(slides.length - 1);
  });

  var tx = null;
  document.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; }, { passive: true });
  document.addEventListener('touchend', function (e) {
    if (tx === null) return;
    var dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 40) show(i + (dx < 0 ? 1 : -1));
    tx = null;
  });

  window.addEventListener('resize', fit);
  fit();
  var start = parseInt((location.hash || '').slice(1), 10);
  show(isNaN(start) ? 0 : start - 1);
})();
