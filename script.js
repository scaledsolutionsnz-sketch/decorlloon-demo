// Mobile menu: open/close with the toggle or the X, close on a link, Escape or a tap outside,
// and lock the page behind it while it's open.
(function(){
  var toggle=document.getElementById('navToggle'),links=document.getElementById('navLinks'),
      close=document.getElementById('navClose'),backdrop=document.getElementById('navBackdrop');
  if(!toggle||!links)return;
  var root=document.documentElement;
  function setOpen(open){
    links.classList.toggle('open',open);
    root.classList.toggle('menu-open',open);
    toggle.setAttribute('aria-expanded',open?'true':'false');
    if(open&&close)close.focus({preventScroll:true});
  }
  toggle.addEventListener('click',function(){setOpen(!links.classList.contains('open'));});
  if(close)close.addEventListener('click',function(){setOpen(false);toggle.focus({preventScroll:true});});
  if(backdrop)backdrop.addEventListener('click',function(){setOpen(false);});
  links.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){setOpen(false);});});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&links.classList.contains('open'))setOpen(false);});
  window.matchMedia('(min-width:861px)').addEventListener('change',function(e){if(e.matches)setOpen(false);});
})();
