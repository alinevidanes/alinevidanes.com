// Consentimento de cookies (LGPD/RGPD) e marcação de conversões para o Google Tag Manager.
// Nada de análise é ativado antes de a pessoa clicar em "Aceitar".
(function () {
  var KEY = 'cookie-consent';
  var lang = (document.documentElement.lang || 'pt').slice(0, 2);
  var T = {
    pt: { msg: 'Usamos cookies de análise (Google Analytics e Microsoft Clarity) só com a sua autorização, para entender como o site é usado. ', more: 'Política de Privacidade', yes: 'Aceitar', no: 'Recusar', prefs: 'Preferências de cookies' },
    en: { msg: 'We use analytics cookies (Google Analytics and Microsoft Clarity) only with your permission, to understand how the site is used. ', more: 'Privacy Policy (in Portuguese)', yes: 'Accept', no: 'Decline', prefs: 'Cookie preferences' },
    es: { msg: 'Usamos cookies de análisis (Google Analytics y Microsoft Clarity) solo con su autorización, para entender cómo se usa el sitio. ', more: 'Política de Privacidad (en portugués)', yes: 'Aceptar', no: 'Rechazar', prefs: 'Preferencias de cookies' }
  }[lang] || null;
  if (!T) T = { msg: '', more: '', yes: 'Aceitar', no: 'Recusar', prefs: 'Preferências de cookies' };
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function decide(v) {
    set(v);
    gtag('consent', 'update', { analytics_storage: v === 'granted' ? 'granted' : 'denied' });
    window.dataLayer.push({ event: v === 'granted' ? 'consent_granted' : 'consent_denied' });
    var b = document.getElementById('cookie-banner'); if (b) b.remove();
  }

  function banner() {
    if (document.getElementById('cookie-banner')) return;
    var st = document.createElement('style');
    st.textContent = '#cookie-banner{position:fixed;left:16px;right:16px;bottom:16px;z-index:100;max-width:760px;margin:0 auto;background:#141312;color:#F3EEE6;padding:18px 20px;box-shadow:0 12px 40px rgba(0,0,0,.25);font:14px/1.55 inherit;font-family:inherit;display:flex;flex-wrap:wrap;gap:12px 18px;align-items:center}' +
      '#cookie-banner p{margin:0;flex:1 1 320px;color:#F3EEE6}#cookie-banner a{color:inherit;text-decoration:underline}' +
      '#cookie-banner .cb-btns{display:flex;gap:10px}#cookie-banner button{font:inherit;font-weight:600;min-height:44px;padding:8px 22px;cursor:pointer;border:1px solid #F3EEE6;background:transparent;color:#F3EEE6}' +
      '#cookie-banner button.cb-yes{background:#F3EEE6;color:#141312}';
    document.head.appendChild(st);
    var d = document.createElement('div');
    d.id = 'cookie-banner'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-label', T.prefs);
    d.innerHTML = '<p>' + T.msg + '<a href="/politica-de-privacidade.html">' + T.more + '</a>.</p>' +
      '<div class="cb-btns"><button type="button" class="cb-no">' + T.no + '</button><button type="button" class="cb-yes">' + T.yes + '</button></div>';
    document.body.appendChild(d);
    d.querySelector('.cb-yes').addEventListener('click', function () { decide('granted'); });
    d.querySelector('.cb-no').addEventListener('click', function () { decide('denied'); });
  }
  window.openCookiePrefs = banner;

  document.addEventListener('DOMContentLoaded', function () {
    if (!get()) banner();
    // link "Preferências de cookies" no rodapé
    var legal = document.querySelector('footer .legal') || document.querySelector('footer');
    if (legal) {
      var a = document.createElement('a'); a.href = '#'; a.textContent = T.prefs;
      a.addEventListener('click', function (e) { e.preventDefault(); banner(); });
      legal.appendChild(a);
    }
  });

  // Conversões: cada clique em elemento com data-track vira um evento no dataLayer.
  document.addEventListener('click', function (e) {
    var el = e.target.closest ? e.target.closest('[data-track]') : null;
    if (!el || el.tagName === 'FORM') return;
    window.dataLayer.push({ event: 'conversao', conversao: el.getAttribute('data-track'), link_url: el.href || '' });
  }, true);

  // Autoavaliação de estresse: a gravação do Clarity é interrompida ao interagir com o teste,
  // para que respostas (dado de saúde) nunca sejam registradas.
  document.addEventListener('pointerdown', function (e) {
    if (e.target.closest && e.target.closest('#autoavaliacao, #quiz') && typeof window.clarity === 'function') window.clarity('stop');
  }, true);
})();
