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

// Shop all (10 Nov 2026): a photo shown in full gets a soft blurred copy of itself behind it,
// a floating arrow takes shoppers back to the categories, and the product details show the
// styled-at-events photos.
(function(){
  document.querySelectorAll('.product-image img.img-full').forEach(function(img){
    function fill(){if(img.currentSrc)img.parentElement.style.setProperty('--fill','url("'+img.currentSrc+'")');}
    if(img.complete&&img.naturalWidth)fill();else img.addEventListener('load',fill,{once:true});
  });

  var shop=document.getElementById('shop'),cats=document.getElementById('shopCategories'),top=document.getElementById('shopTop');
  if(shop&&cats&&top){
    var ticking=false;
    function update(){
      ticking=false;
      var c=cats.getBoundingClientRect(),s=shop.getBoundingClientRect();
      top.classList.toggle('show',c.bottom<0&&s.bottom>window.innerHeight*.6);
    }
    window.addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(update);}},{passive:true});
    window.addEventListener('resize',update);
    update();
    top.addEventListener('click',function(e){
      e.preventDefault();
      cats.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth',block:'start'});
      var active=cats.querySelector('.shop-filter.active');
      if(active)active.focus({preventScroll:true});
    });
  }

  var wrap=document.getElementById('productModalStyled'),row=document.getElementById('productModalThumbs'),main=document.getElementById('productModalImage');
  if(!wrap||!row||!main)return;
  function thumb(src,alt,pressed){
    var b=document.createElement('button'),i=document.createElement('img');
    b.type='button';b.setAttribute('aria-pressed',pressed?'true':'false');b.setAttribute('aria-label','Show '+alt);
    i.src=src;i.alt='';b.appendChild(i);
    b.addEventListener('click',function(){
      main.src=src;main.alt=alt;main.style.objectPosition='50% 50%';
      row.querySelectorAll('button').forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false');});
    });
    return b;
  }
  document.querySelectorAll('.product-card').forEach(function(card){
    var btn=card.querySelector('.product-image');
    if(!btn)return;
    btn.addEventListener('click',function(){
      var styled=card.querySelectorAll('.styled-insets img');
      row.replaceChildren();
      wrap.hidden=!styled.length;
      if(!styled.length)return;
      var photo=card.querySelector('img');
      row.appendChild(thumb(photo.currentSrc||photo.src,photo.alt,true));
      styled.forEach(function(img){row.appendChild(thumb(img.currentSrc||img.src,img.alt,false));});
    });
  });
})();
