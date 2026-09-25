/* Chat de atendimento: Brevo Conversations */
(function(d,w,c){
  w.BrevoConversationsID='6ab542ac211659ed540ed076';
  w[c]=w[c]||function(){(w[c].q=w[c].q||[]).push(arguments);};
  var s=d.createElement('script');s.async=true;
  s.src='https://conversations-widget.brevo.com/brevo-conversations.js';
  if(d.head)d.head.appendChild(s);
  d.addEventListener('click',function(e){
    var b=e.target.closest&&e.target.closest('#navChat,[data-abrir-chat]');
    if(!b)return;e.preventDefault();w[c]('openChat',true);
  });
})(document,window,'BrevoConversations');
