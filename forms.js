// Envio dos formulários pelo Web3Forms, sem sair da página.
(function(){
  var L={
    pt:{sending:'Enviando…',ok:'Mensagem enviada. Obrigada! Responderei por e-mail.',err:'Não foi possível enviar agora. Escreva para '},
    en:{sending:'Sending…',ok:'Message sent. Thank you! I will reply by email.',err:'The message could not be sent right now. Please write to '},
    es:{sending:'Enviando…',ok:'Mensaje enviado. ¡Gracias! Le responderé por correo electrónico.',err:'No se pudo enviar en este momento. Escriba a '}
  };
  var t=L[(document.documentElement.lang||'pt').slice(0,2)]||L.pt;
  document.querySelectorAll('form[data-w3f]').forEach(function(f){
    var st=f.querySelector('.form-status'), btn=f.querySelector('[type=submit]');
    f.addEventListener('submit',function(e){
      e.preventDefault();
      if(!f.checkValidity()){f.reportValidity();return;}
      st.className='form-status sending'; st.textContent=t.sending; btn.disabled=true;
      fetch(f.action,{method:'POST',headers:{'Accept':'application/json'},body:new FormData(f)})
        .then(function(r){return r.json().then(function(j){if(!r.ok||!j.success)throw new Error(j.message||r.status);});})
        .then(function(){st.className='form-status ok'; st.textContent=t.ok; f.reset(); (window.dataLayer=window.dataLayer||[]).push({event:'conversao',conversao:f.getAttribute('data-track')||'formulario'});})
        .catch(function(){
          st.className='form-status err'; st.textContent=t.err;
          var a=document.createElement('a'); a.href='mailto:aline@alinevidanes.com'; a.textContent='aline@alinevidanes.com';
          st.appendChild(a); st.appendChild(document.createTextNode('.'));
        })
        .then(function(){btn.disabled=false;});
    });
  });
})();
