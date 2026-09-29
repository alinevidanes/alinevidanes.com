// Número do WhatsApp: código do país + número, só dígitos
var WHATSAPP = "32471634305";
var MSG = "Olá, Aline! Vim pelo seu site e gostaria de agendar um atendimento.";
document.querySelectorAll('[data-wa]').forEach(function (a) {
  a.href = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(MSG);
  a.target = "_blank"; a.rel = "noopener";
});
var b = document.querySelector('.burger'), m = document.getElementById('menu');
if (b && m) {
  b.addEventListener('click', function () { var o = m.classList.toggle('open'); b.setAttribute('aria-expanded', o); });
  m.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { m.classList.remove('open'); b.setAttribute('aria-expanded', false); }); });
}
var y = document.getElementById('ano'); if (y) y.textContent = new Date().getFullYear();
