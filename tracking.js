// Consentimento de cookies (LGPD e RGPD, Google Consent Mode v2) e marcação de conversões.
// Nenhuma ferramenta de análise ou publicidade é ativada antes da escolha da pessoa.
(function () {
  var KEY = 'cookie-consent';
  // Mude para true somente se um Pixel ou outra ferramenta de marketing for instalada no Tag Manager.
  var MARKETING_TOOLS = false;
  var lang = (document.documentElement.lang || 'pt').slice(0, 2);
  var T = {
    pt: { title: 'Sua privacidade', msg: 'Usamos cookies de análise só com a sua autorização, para entender como o site é usado. Você pode aceitar, recusar ou escolher por categoria.', more: 'Política de Privacidade', yes: 'Aceitar', no: 'Recusar', custom: 'Personalizar', save: 'Salvar escolhas', prefs: 'Preferências de cookies',
          nec: ['Necessários', 'Guardam a sua escolha sobre cookies. Não podem ser desativados.'], ga: ['Estatísticas (Google Analytics)', 'Páginas visitadas, tempo de navegação, país aproximado e cliques em botões de contato.'], cl: ['Comportamento (Microsoft Clarity)', 'Como a página é rolada e clicada, de forma anonimizada. Não funciona na autoavaliação de estresse.'], mk: ['Marketing', 'Medição de anúncios em redes sociais.'], on: 'Ativo sempre' },
    en: { title: 'Your privacy', msg: 'We use analytics cookies only with your permission, to understand how the site is used. You can accept, decline or choose by category.', more: 'Privacy Policy (in Portuguese)', yes: 'Accept', no: 'Decline', custom: 'Customize', save: 'Save choices', prefs: 'Cookie preferences',
          nec: ['Necessary', 'Store your cookie choice. They cannot be turned off.'], ga: ['Statistics (Google Analytics)', 'Pages visited, time on site, approximate country and clicks on contact buttons.'], cl: ['Behavior (Microsoft Clarity)', 'How the page is scrolled and clicked, anonymized.'], mk: ['Marketing', 'Ad measurement on social networks.'], on: 'Always on' },
    es: { title: 'Su privacidad', msg: 'Usamos cookies de análisis solo con su autorización, para entender cómo se usa el sitio. Puede aceptar, rechazar o elegir por categoría.', more: 'Política de Privacidad (en portugués)', yes: 'Aceptar', no: 'Rechazar', custom: 'Personalizar', save: 'Guardar elección', prefs: 'Preferencias de cookies',
          nec: ['Necesarias', 'Guardan su elección sobre cookies. No se pueden desactivar.'], ga: ['Estadísticas (Google Analytics)', 'Páginas visitadas, tiempo de navegación, país aproximado y clics en botones de contacto.'], cl: ['Comportamiento (Microsoft Clarity)', 'Cómo se desplaza y se hace clic en la página, de forma anonimizada.'], mk: ['Marketing', 'Medición de anuncios en redes sociales.'], on: 'Siempre activas' }
  }[lang];
  if (!T) T = null;
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }

  function read() {
    try {
      var v = localStorage.getItem(KEY);
      if (!v) return null;
      if (v === 'granted') return { analytics: true, clarity: true, marketing: false };
      if (v === 'denied') return { analytics: false, clarity: false, marketing: false };
      return JSON.parse(v);
    } catch (e) { return null; }
  }
  function g(b) { return b ? 'granted' : 'denied'; }

  function apply(c, changed) {
    var before = read();
    try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {}
    gtag('consent', 'update', { analytics_storage: g(c.analytics), ad_storage: g(c.marketing), ad_user_data: g(c.marketing), ad_personalization: g(c.marketing) });
    window.dataLayer.push({ event: 'consent_update', consent_analytics: g(c.analytics), consent_clarity: g(c.clarity), consent_marketing: g(c.marketing) });
    close();
    // Se a pessoa retirar uma autorização dada antes, apagamos os cookies e recarregamos a página
    // para que as ferramentas deixem de funcionar imediatamente.
    if (before && ((before.analytics && !c.analytics) || (before.clarity && !c.clarity) || (before.marketing && !c.marketing))) {
      document.cookie.split(';').forEach(function (k) {
        var n = k.split('=')[0].trim();
        if (/^(_ga|_gid|_gat|_clck|_clsk|_fbp|_fbc)/.test(n)) {
          var h = location.hostname.replace(/^www\./, '');
          ['', '; domain=' + h, '; domain=.' + h].forEach(function (d) { document.cookie = n + '=; Max-Age=0; path=/' + d; });
        }
      });
      location.reload();
    }
  }

  function close() { var b = document.getElementById('cookie-banner'); if (b) b.remove(); }

  function row(id, t, checked, locked) {
    return '<label class="cb-row"><span><b>' + t[0] + '</b><small>' + t[1] + '</small></span>' +
      (locked ? '<em>' + T.on + '</em>' : '<input type="checkbox" id="' + id + '"' + (checked ? ' checked' : '') + '>') + '</label>';
  }

  function banner(openCustom) {
    if (!T) return;
    close();
    if (!document.getElementById('cb-style')) {
      var st = document.createElement('style'); st.id = 'cb-style';
      st.textContent = '#cookie-banner{position:fixed;left:16px;right:16px;bottom:16px;z-index:1000;max-width:620px;margin:0 auto;box-sizing:border-box;background:#14233A;color:#F7F3EC;padding:22px 24px;box-shadow:0 14px 44px rgba(0,0,0,.28);font-family:\'Manrope\',system-ui,sans-serif;font-size:14.5px;line-height:1.6;max-height:calc(100vh - 32px);overflow:auto}#cookie-banner p{margin:0 0 14px;color:#F7F3EC}#cookie-banner a{color:inherit;text-decoration:underline;text-underline-offset:3px}#cookie-banner .cb-t{font-family:\'Cormorant Garamond\',Georgia,serif;font-size:24px;line-height:1.2;margin-bottom:8px}#cookie-banner .cb-row{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:12px 0;border-top:1px solid rgba(247,243,236,.35);cursor:pointer}#cookie-banner .cb-row small{display:block;opacity:.8;font-size:13px}#cookie-banner .cb-row em{font-style:normal;font-size:12.5px;opacity:.8;white-space:nowrap}#cookie-banner input[type=checkbox]{width:22px;height:22px;flex:none;accent-color:#B08A57;cursor:pointer}#cookie-banner .cb-custom{margin-bottom:14px}#cookie-banner .cb-btns{display:flex;flex-wrap:wrap;gap:10px;align-items:center}#cookie-banner button{font-family:inherit;font-size:14px;font-weight:600;letter-spacing:.03em;border-radius:2px;min-height:46px;padding:10px 24px;cursor:pointer}#cookie-banner .cb-main{flex:1 1 150px;background:#F7F3EC;color:#14233A;border:1px solid #F7F3EC}#cookie-banner .cb-main:hover{background:#B08A57;border-color:#B08A57;color:#14233A}#cookie-banner .cb-link{flex:1 1 100%;background:transparent;color:#F7F3EC;border:1px solid rgba(247,243,236,.35)}#cookie-banner button:focus-visible,#cookie-banner input:focus-visible{outline:2px solid #B08A57;outline-offset:2px}#cookie-banner [hidden]{display:none!important}';
      document.head.appendChild(st);
    }
    var c = read() || { analytics: false, clarity: false, marketing: false };
    var d = document.createElement('div');
    d.id = 'cookie-banner'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-modal', 'false'); d.setAttribute('aria-labelledby', 'cb-t');
    d.innerHTML = '<p class="cb-t" id="cb-t">' + T.title + '</p><p>' + T.msg + ' <a href="/politica-de-privacidade.html">' + T.more + '</a>.</p>' +
      '<div class="cb-custom" hidden>' + row('', T.nec, true, true) + row('cb-ga', T.ga, c.analytics) + row('cb-cl', T.cl, c.clarity) +
      (MARKETING_TOOLS ? row('cb-mk', T.mk, c.marketing) : '') + '</div>' +
      '<div class="cb-btns"><button type="button" class="cb-main cb-no">' + T.no + '</button><button type="button" class="cb-main cb-yes">' + T.yes + '</button>' +
      '<button type="button" class="cb-link cb-custom-btn">' + T.custom + '</button><button type="button" class="cb-main cb-save" hidden>' + T.save + '</button></div>';
    document.body.appendChild(d);
    var box = d.querySelector('.cb-custom'), cbtn = d.querySelector('.cb-custom-btn'), save = d.querySelector('.cb-save');
    function showCustom() { box.hidden = false; cbtn.hidden = true; save.hidden = false; }
    d.querySelector('.cb-yes').addEventListener('click', function () { apply({ analytics: true, clarity: true, marketing: MARKETING_TOOLS }); });
    d.querySelector('.cb-no').addEventListener('click', function () { apply({ analytics: false, clarity: false, marketing: false }); });
    cbtn.addEventListener('click', showCustom);
    save.addEventListener('click', function () {
      var mk = d.querySelector('#cb-mk');
      apply({ analytics: d.querySelector('#cb-ga').checked, clarity: d.querySelector('#cb-cl').checked, marketing: !!(mk && mk.checked) });
    });
    if (openCustom) showCustom();
  }
  window.openCookiePrefs = function () { banner(true); };

  document.addEventListener('DOMContentLoaded', function () {
    if (!read()) banner(false);
    var legal = document.querySelector('footer .legal') || document.querySelector('footer');
    if (legal && T) {
      var a = document.createElement('a'); a.href = '#'; a.textContent = T.prefs;
      a.addEventListener('click', function (e) { e.preventDefault(); banner(true); });
      legal.appendChild(a);
    }
  });

  // Conversões: cada clique em elemento com data-track vira um evento no dataLayer.
  document.addEventListener('click', function (e) {
    var el = e.target.closest ? e.target.closest('[data-track]') : null;
    if (!el || el.tagName === 'FORM') return;
    window.dataLayer.push({ event: 'conversao', conversao: el.getAttribute('data-track'), link_url: el.href || '' });
  }, true);

  // Autoavaliação de estresse: a gravação do Clarity é interrompida ao interagir com o teste.
  document.addEventListener('pointerdown', function (e) {
    if (e.target.closest && e.target.closest('#autoavaliacao, #quiz') && typeof window.clarity === 'function') window.clarity('stop');
  }, true);
})();
