(function(){
  /* Formulários de cadastro direto (newsletter e Banco de Prompts): envia para /api/lead (Brevo).
     Se o Brevo não estiver configurado, mostra o formulário alternativo (Tally) sem perder o contato. */
  function st(f,msg,erro){var s=f.querySelector('.nl-st');if(s){s.textContent=msg;s.classList.toggle('erro',!!erro);}}
  document.addEventListener('submit',function(e){
    var f=e.target.closest('form.nl-form');if(!f)return;e.preventDefault();
    var dados={tipo:f.getAttribute('data-tipo')||'newsletter',origem:f.getAttribute('data-origem')||''};
    var campos=f.querySelectorAll('input[name]');
    for(var i=0;i<campos.length;i++){var c=campos[i];dados[c.name]=c.type==='checkbox'?c.checked:c.value.trim();}
    for(var j=0;j<campos.length;j++){var x=campos[j];if(x.required&&(x.type==='checkbox'?!x.checked:!x.value.trim())){x.focus();st(f,x.type==='checkbox'?'Marque a caixa de consentimento para continuar.':'Preencha '+(x.getAttribute('data-nome')||'este campo')+'.',true);return;}}
    var b=f.querySelector('button[type=submit]');if(b)b.disabled=true;st(f,'Enviando…');
    fetch('/api/lead',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(dados)})
      .then(function(r){return r.json().catch(function(){return {ok:false,fallback:true};});})
      .then(function(j){
        if(b)b.disabled=false;
        if(j&&j.ok){st(f,j.mensagem||'Pronto!');f.reset();f.classList.add('nl-feito');f.dispatchEvent(new CustomEvent('lead:ok',{bubbles:true}));return;}
        if(f.getAttribute('data-tipo')==='prompts'&&j&&j.fallback){st(f,'Acesso liberado. Bom proveito!');f.classList.add('nl-feito');f.dispatchEvent(new CustomEvent('lead:ok',{bubbles:true}));return;}
        st(f,(j&&j.mensagem)||'Não foi possível concluir agora.',true);
        if(j&&j.fallback){var fb=document.getElementById(f.getAttribute('data-fallback')||'');if(fb){fb.hidden=false;var ifr=fb.querySelector('iframe[data-src]');if(ifr&&!ifr.src)ifr.src=ifr.getAttribute('data-src');fb.scrollIntoView({behavior:'smooth',block:'nearest'});}}
        if(j&&j.campo){var el=f.querySelector('[name='+j.campo+']');if(el)el.focus();}
      })
      .catch(function(){if(b)b.disabled=false;if(f.getAttribute('data-tipo')==='prompts'){st(f,'Acesso liberado. Bom proveito!');f.dispatchEvent(new CustomEvent('lead:ok',{bubbles:true}));return;}st(f,'Sem conexão agora. Tente de novo em instantes.',true);});
  });
})();
