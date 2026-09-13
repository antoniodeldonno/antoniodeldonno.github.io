/* All original links, photographs and EmailJS configuration are retained. */
(() => {
  'use strict';
  function init() {
    const body = document.body;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const fancy = document.getElementById('toggleFancyMode');
    const canvas = document.getElementById('hyperbolic-field');
    // Draw genuine Poincaré geodesics once. Only the canvas layer rotates.
    if (canvas) {
      const size = 1200;
      canvas.width = canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.translate(size / 2, size / 2);
        const R = size * .47;
        ctx.save();
        ctx.beginPath(); ctx.arc(0, 0, R, 0, Math.PI * 2); ctx.clip();
        const colors = ['#7affe28a', '#bf81ff73', '#ff84dd66'];
        [.15, .29, .48, .72, 1.02, 1.32].forEach((delta, ring) => {
          for (let i = 0; i < 20; i++) {
            const angle = i * Math.PI / 10 + (ring % 2) * Math.PI / 20;
            const c = R / Math.cos(delta), r = R * Math.tan(delta);
            ctx.strokeStyle = colors[ring % colors.length];
            ctx.lineWidth = ring < 2 ? .8 : 1;
            ctx.beginPath(); ctx.arc(c * Math.cos(angle), c * Math.sin(angle), r, 0, Math.PI * 2); ctx.stroke();
          }
        });
        // Equal hyperbolic distance steps: Euclidean radius = tanh(rho / 2).
        for (let rho = .8; rho < 6; rho += .8) {
          ctx.strokeStyle = '#a7a2dd40'; ctx.lineWidth = .75;
          ctx.beginPath(); ctx.arc(0, 0, R * Math.tanh(rho / 2), 0, Math.PI * 2); ctx.stroke();
        }
        ctx.restore();
        ctx.strokeStyle = '#92e9e998';ctx.lineWidth = 1.4;
        ctx.beginPath();ctx.arc(0,0,R,0,Math.PI*2);ctx.stroke();
      }
    }

    // Progressive enhancement: content stays readable if JS or a CDN fails.
    if ('IntersectionObserver' in window && !reduced.matches) {
      const reveal = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('is-pending');
            reveal.unobserve(entry.target);
          }
        });
      }, {threshold: 0, rootMargin: '0px 0px -35px 0px'});
      document.querySelectorAll('.section').forEach(section => {
        if (section.getBoundingClientRect().top > window.innerHeight) section.classList.add('is-pending');
        reveal.observe(section);
      });
    }
    const hamburger = document.querySelector('.hamburger');
    const nav = document.getElementById('main-navigation');
    function closeNav(){nav.classList.remove('active');hamburger.setAttribute('aria-expanded','false');hamburger.textContent='☰';}
    hamburger.addEventListener('click', () => {
      const opened = nav.classList.toggle('active');
      hamburger.setAttribute('aria-expanded',String(opened));hamburger.textContent=opened?'×':'☰';
    });
    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click',()=>{
        closeNav();
        const target=document.querySelector(link.getAttribute('href'));
        target?.classList.remove('is-pending');
      });
    });
    document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav.classList.contains('active')){closeNav();hamburger.focus();}});
    const portrait = document.getElementById('gif-toggle');
    function changePortrait(){const shown=portrait.classList.toggle('show-photo');portrait.setAttribute('aria-pressed',String(shown));}
    portrait.addEventListener('click',changePortrait);
    portrait.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();changePortrait();}});

    // One gallery, overlapping photographs and a real crossfade.
    const photoUrls = ["https://i.imgur.com/VdB2OMP.jpg", "https://i.imgur.com/ohPZApS.jpg", "https://i.imgur.com/bxD6pD0.jpg", "https://i.imgur.com/ip3Qsdi.jpg", "https://i.imgur.com/zvoTiYG.jpg", "https://i.imgur.com/OXL4pyn.jpg", "https://i.imgur.com/HOKuPTI.jpg", "https://i.imgur.com/bHoP4az.jpg", "https://i.imgur.com/ylkowuA.jpg", "https://i.imgur.com/ZkdXs0R.jpg", "https://i.imgur.com/OWYlyn6.jpg", "https://i.imgur.com/Ci4Snrl.jpg", "https://i.imgur.com/nS46GNX.jpg", "https://i.imgur.com/owE5tfB.jpg", "https://i.imgur.com/MvDc1ev.jpg", "https://i.imgur.com/nKaF7eg.jpg", "https://i.imgur.com/Po9zUVQ.jpg", "https://i.imgur.com/B31j1Ow.jpg", "https://i.imgur.com/HGPUVRV.jpg", "https://i.imgur.com/H3BPatM.jpg", "https://i.imgur.com/xQgwxyu.jpg", "https://i.imgur.com/PNI9ayY.jpg", "https://i.imgur.com/lptpO27.jpg", "https://i.imgur.com/AVMyrfS.jpg"];
    const slides = document.getElementById('slides-container');
    const dots = document.getElementById('dots-container');
    const gallery = document.querySelector('.slideshow-container');
    const pause = document.getElementById('slideshow-pause');
    const photography = document.getElementById('photography');
    gallery.setAttribute('role','region');gallery.setAttribute('aria-label','Photography slideshow');
    gallery.tabIndex=0;
    let index=0, timer=null, userPaused=false, hovering=false, focused=false, inView=false, requested=0, navigationToken=0, explicitPlay=false;
    photoUrls.forEach((url,i)=>{
      const slide=document.createElement('div');slide.className='slide'+(i===0?' active':'');
      slide.setAttribute('aria-hidden',String(i!==0));
      const img=document.createElement('img');img.dataset.src=url;img.alt='Photograph '+(i+1)+' by Antonio Del Donno';img.decoding='async';
      img.addEventListener('error',()=>{
        img.style.display='none';const fallback=document.createElement('p');fallback.className='slide-error';fallback.textContent='This photograph is temporarily unavailable.';slide.appendChild(fallback);
      },{once:true});
      slide.appendChild(img);slides.appendChild(slide);
      const dot=document.createElement('button');dot.type='button';dot.className='dot'+(i===0?' active':'');
      dot.setAttribute('aria-label','Show photograph '+(i+1));dot.setAttribute('aria-pressed',String(i===0));
      dot.addEventListener('click',()=>show(i));dots.appendChild(dot);
    });
    function load(i){const img=slides.children[(i+photoUrls.length)%photoUrls.length].querySelector('img');if(!img.getAttribute('src'))img.src=img.dataset.src;return img;}
    function playback(){
      clearInterval(timer);timer=null;
      const staticMode=reduced.matches||body.classList.contains('sobrio-mode');
      pause.textContent=staticMode?'Slideshow paused · manual navigation':userPaused?'Play slideshow':'Pause slideshow';
      pause.setAttribute('aria-pressed',String(userPaused||staticMode));pause.disabled=staticMode;
      if(inView&&!userPaused&&!staticMode&&(!hovering||explicitPlay)&&(!focused||explicitPlay)&&!document.hidden&&!document.getElementById('thoughts-room').open){timer=setInterval(()=>show(requested+1),6500);}
    }
    async function show(n){
      clearInterval(timer);timer=null;
      requested=(n+photoUrls.length)%photoUrls.length;
      const token=++navigationToken,target=requested,img=load(target);
      try { await img.decode(); } catch {}
      if(token!==navigationToken)return;
      index=target;load(index+1);load(index-1);
      [...slides.children].forEach((slide,i)=>{slide.classList.toggle('active',i===index);slide.setAttribute('aria-hidden',String(i!==index));});
      [...dots.children].forEach((dot,i)=>{dot.classList.toggle('active',i===index);dot.setAttribute('aria-pressed',String(i===index));});
      playback();
    }
    load(0);
    document.querySelector('.prev').addEventListener('click',()=>show(requested-1));
    document.querySelector('.next').addEventListener('click',()=>show(requested+1));
    gallery.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();show(requested+(e.key==='ArrowRight'?1:-1));}});
    photography.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'){explicitPlay=false;hovering=true;playback();}});
    photography.addEventListener('pointerleave',()=>{hovering=false;playback();});
    photography.addEventListener('focusin',()=>{explicitPlay=false;focused=true;playback();});
    photography.addEventListener('focusout',e=>{focused=photography.contains(e.relatedTarget);playback();});
    pause.addEventListener('click',()=>{userPaused=!userPaused;explicitPlay=!userPaused;playback();});
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;if(inView)load(index+1);playback();},{threshold:.05}).observe(gallery);
    } else {inView=true;}
    fancy.addEventListener('click',()=>{
      const normal=body.classList.toggle('sobrio-mode');
      fancy.textContent=normal?'Fancy mode: off':'Fancy mode: on';fancy.setAttribute('aria-pressed',String(!normal));playback();
    });
    reduced.addEventListener('change',()=>{
      if(reduced.matches)document.querySelectorAll('.is-pending').forEach(s=>s.classList.remove('is-pending'));
      playback();
    });
    document.addEventListener('visibilitychange',()=>{body.classList.toggle('is-backgrounded',document.hidden);playback();});

    // A hidden room. There is deliberately no hash route or navigation link.
    const room=document.getElementById('thoughts-room');
    const key=document.getElementById('thoughts-key');
    key.addEventListener('click',()=>{room.showModal();body.classList.add('room-open');playback();});
    document.getElementById('thoughts-close').addEventListener('click',()=>room.close());
    room.addEventListener('click',event=>{if(event.target===room){const r=room.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)room.close();}});
    room.addEventListener('close',()=>{body.classList.remove('room-open');key.focus({preventScroll:true});playback();});
    // Add your own writing here. Example structure:
    // { type: 'poem', title: 'Your title', text: 'First line\\nSecond line' }
    const thoughts=[];
    if(thoughts.length){
      const entries=document.getElementById('thoughts-entries');entries.replaceChildren();
      thoughts.forEach(thought=>{
        const article=document.createElement('article');article.className='thought-entry';
        const type=document.createElement('p');type.className='thought-type';type.textContent=thought.type;
        const title=document.createElement('h3');title.textContent=thought.title;
        const text=document.createElement('p');text.className='thought-body';text.textContent=thought.text;
        article.append(type,title,text);entries.appendChild(article);
      });
    }

    // Keep the original contact delivery, but do not let its CDN block the site.
    let emailReady=false;
    function initEmail(){if(!emailReady&&window.emailjs){try{window.emailjs.init('Tojo1ys_IV6ZVDLmf');emailReady=true;}catch{}}}
    initEmail();
    const form=document.getElementById('contact-form');
    const status=document.getElementById('contact-status');
    form.addEventListener('submit',async event=>{
      event.preventDefault();const send=form.querySelector('button[type="submit"]');
      if(send.disabled)return;initEmail();
      if(!emailReady){status.textContent='The form is temporarily unavailable. Please use the email link above.';return;}
      send.disabled=true;send.textContent='SENDING…';status.textContent='';
      try{
        await window.emailjs.send('service_hqrzjdm','template_uq6fkln',{name:form.elements.name.value,email:form.elements.email.value,message:form.elements.message.value});
        status.textContent='Message sent. Thank you!';form.reset();
      }catch{status.textContent='Unable to send. Please try again or use the email link above.';}
      finally{send.disabled=false;send.textContent='SEND TRANSMISSION';}
    });
    playback();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();


/* Mathematical motion: bounded rendering and one cancellable idle cycle. */
function initMathematicalMotion() {
  'use strict';
  const body = document.body;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const room = document.getElementById('thoughts-room');
  const blocked = () => reduced.matches || document.hidden || body.classList.contains('sobrio-mode') || body.classList.contains('room-open') || (room && room.open);

  /* Each section gets a restrained mathematical motif layered over its original GIF. */
  const motifMap = {
    about: {kind:'orbit', label:'phase portrait', color:'#ff62d5'},
    mathematics: {kind:'hopf', label:'Hopf fibres / quantum geometry', color:'#5ffff1'},
    music: {kind:'lissajous', label:'Lissajous / harmonic ratios', color:'#eeff72'},
    photography: {kind:'spiral', label:'golden spiral / composition', color:'#ff9bdc'},
    contact: {kind:'field', label:'vector field / connection', color:'#5ffff1'}
  };
  const sectionObserver=new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.classList.toggle('motion-offscreen',!entry.isIntersecting)),{rootMargin:'180px'});
  document.querySelectorAll('.section').forEach(section=>sectionObserver.observe(section));
  const visuals = [];
  Object.keys(motifMap).forEach(id => {
    const section = document.getElementById(id);
    if (!section || !section.querySelector('.container')) return;
    const spec = motifMap[id];
    const host = document.createElement('div');
    host.className = 'math-visual';
    host.dataset.math = spec.kind;
    host.setAttribute('aria-hidden', 'true');
    const canvas = document.createElement('canvas');
    canvas.width = 360;
    canvas.height = 240;
    host.append(canvas);
    section.insertBefore(host, section.querySelector('.container'));
    const ctx = canvas.getContext('2d');
    if (ctx) visuals.push({section, canvas, ctx, spec});
  });

  const TAU = Math.PI * 2;
  function colorFor(spec, alpha){
    const raw = spec.color.replace('#','');
    const r = parseInt(raw.slice(0,2),16), g = parseInt(raw.slice(2,4),16), b = parseInt(raw.slice(4,6),16);
    return 'rgba('+r+','+g+','+b+','+alpha+')';
  }
  function prep(ctx){
    ctx.clearRect(0,0,360,240);
    ctx.save();
    ctx.translate(180,120);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }
  function finish(ctx){ctx.restore();}
  function drawOrbit(item, phase){
    const ctx=item.ctx, spec=item.spec; prep(ctx);
    ctx.strokeStyle=colorFor(spec,.16);ctx.lineWidth=1;ctx.setLineDash([2,5]);
    ctx.beginPath();ctx.arc(0,0,80,0,TAU);ctx.stroke();ctx.setLineDash([]);
    for(let ring=0;ring<4;ring++){
      const rx=46+ring*20, ry=18+ring*15, tilt=ring*.35+phase*.06;
      ctx.strokeStyle=colorFor(spec,.42-ring*.06);ctx.lineWidth=1.15;
      ctx.beginPath();
      for(let t=0;t<=TAU+.08;t+=.08){
        const x=rx*Math.cos(t), y=ry*Math.sin(t), px=x*Math.cos(tilt)-y*Math.sin(tilt), py=x*Math.sin(tilt)+y*Math.cos(tilt);
        if(t===0)ctx.moveTo(px,py);else ctx.lineTo(px,py);
      }
      ctx.stroke();
    }
    const nodeT=phase*.8, nx=92*Math.cos(nodeT), ny=39*Math.sin(nodeT);
    ctx.shadowBlur=16;ctx.shadowColor=spec.color;ctx.fillStyle=colorFor(spec,.95);ctx.beginPath();ctx.arc(nx,ny,3.2,0,TAU);ctx.fill();ctx.shadowBlur=0;
    ctx.strokeStyle=colorFor(spec,.34);ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(-114,0);ctx.lineTo(114,0);ctx.moveTo(0,-83);ctx.lineTo(0,83);ctx.stroke();
    finish(ctx);
  }
  function drawHopf(item, phase){
    const ctx=item.ctx, spec=item.spec; prep(ctx);
    ctx.strokeStyle=colorFor(spec,.14);ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(0,0,112,60,0,0,TAU);ctx.stroke();
    for(let fibre=0;fibre<13;fibre++){
      const offset=fibre/13*TAU, hueAlpha=.2+(fibre%4)*.045;
      ctx.strokeStyle=colorFor(spec,hueAlpha);ctx.lineWidth=fibre%3===0?1.55:1;
      ctx.beginPath();
      for(let t=0;t<=TAU+.06;t+=.065){
        const u=t+phase*.22, v=offset+.58*Math.sin(t*2+phase*.33+fibre*.25);
        const R=59, r=22, x3=(R+r*Math.cos(v))*Math.cos(u), y3=(R+r*Math.cos(v))*Math.sin(u), z3=r*Math.sin(v);
        const yaw=phase*.025, x=x3*Math.cos(yaw)-z3*Math.sin(yaw), z=x3*Math.sin(yaw)+z3*Math.cos(yaw);
        const scale=1/(1+z/290), px=x*scale, py=(y3*.63-z*.22)*scale;
        if(t===0)ctx.moveTo(px,py);else ctx.lineTo(px,py);
      }
      ctx.stroke();
    }
    ctx.shadowBlur=12;ctx.shadowColor=spec.color;ctx.fillStyle=colorFor(spec,.9);ctx.beginPath();ctx.arc(66*Math.cos(phase*.22),36*Math.sin(phase*.22),2.6,0,TAU);ctx.fill();ctx.shadowBlur=0;
    finish(ctx);
  }
  function drawLissajous(item, phase){
    const ctx=item.ctx, spec=item.spec; prep(ctx);
    ctx.strokeStyle=colorFor(spec,.16);ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(-132,0);ctx.lineTo(132,0);ctx.moveTo(0,-84);ctx.lineTo(0,84);ctx.stroke();
    const ratios=[[3,4,.54],[5,6,.27],[7,8,.16]];
    ratios.forEach((ratio,k)=>{
      ctx.strokeStyle=colorFor(spec,ratio[2]);ctx.lineWidth=k===0?1.7:1;
      ctx.beginPath();
      for(let t=0;t<=TAU+.04;t+=.045){
        const x=116*Math.sin(ratio[0]*t+phase*(.22+k*.06)), y=73*Math.sin(ratio[1]*t+phase*.13+k*.4);
        if(t===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
      }
      ctx.stroke();
    });
    for(let i=0;i<18;i++){
      const amp=8+Math.abs(Math.sin(i*1.7+phase*.12))*22;
      ctx.fillStyle=colorFor(spec,.2+(i%3)*.08);ctx.fillRect(-120+i*14,92-amp/2,5,amp);
    }
    finish(ctx);
  }
  function drawSpiral(item, phase){
    const ctx=item.ctx, spec=item.spec; prep(ctx);
    ctx.strokeStyle=colorFor(spec,.16);ctx.lineWidth=1;[34,67,101].forEach(r=>{ctx.beginPath();ctx.arc(0,0,r,0,TAU);ctx.stroke();});
    ctx.strokeStyle=colorFor(spec,.5);ctx.lineWidth=1.45;ctx.beginPath();
    for(let t=0;t<Math.PI*5.7;t+=.07){
      const radius=4.5*Math.exp(.18*t), a=t+phase*.12, x=radius*Math.cos(a), y=radius*Math.sin(a)*.72;
      if(t===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
    }
    ctx.stroke();
    ctx.strokeStyle=colorFor(spec,.2);ctx.setLineDash([1,6]);ctx.beginPath();ctx.moveTo(-125,-78);ctx.lineTo(125,-78);ctx.moveTo(-125,78);ctx.lineTo(125,78);ctx.stroke();ctx.setLineDash([]);
    const a=phase*.22, x=76*Math.cos(a), y=55*Math.sin(a);ctx.shadowBlur=14;ctx.shadowColor=spec.color;ctx.fillStyle=colorFor(spec,.95);ctx.beginPath();ctx.arc(x,y,3,0,TAU);ctx.fill();ctx.shadowBlur=0;
    finish(ctx);
  }
  function drawField(item, phase){
    const ctx=item.ctx, spec=item.spec; prep(ctx);
    for(let row=-4;row<=4;row++){
      for(let col=-7;col<=7;col++){
        let x=col*18,y=row*18;
        ctx.strokeStyle=colorFor(spec,.18+(row+col+20)%3*.035);ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x,y);
        for(let step=0;step<18;step++){
          const angle=Math.sin(y*.045+phase*.13)+Math.cos(x*.038-phase*.1);
          x+=Math.cos(angle)*4.3;y+=Math.sin(angle)*4.3;
          if(x<-142||x>142||y<-92||y>92)break;
          ctx.lineTo(x,y);
        }
        ctx.stroke();
      }
    }
    ctx.shadowBlur=12;ctx.shadowColor=spec.color;ctx.fillStyle=colorFor(spec,.92);ctx.beginPath();ctx.arc(70*Math.cos(phase*.15),38*Math.sin(phase*.19),3,0,TAU);ctx.fill();ctx.shadowBlur=0;
    finish(ctx);
  }
  function drawVisual(item, phase){
    if(item.spec.kind==='orbit')drawOrbit(item,phase);
    else if(item.spec.kind==='hopf')drawHopf(item,phase);
    else if(item.spec.kind==='lissajous')drawLissajous(item,phase);
    else if(item.spec.kind==='spiral')drawSpiral(item,phase);
    else drawField(item,phase);
  }
  let visualRaf=0, visualLast=0;
  const visibleMotifs=new Set();
  const motifObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{const item=visuals.find(v=>v.canvas===entry.target);if(entry.isIntersecting)visibleMotifs.add(item);else visibleMotifs.delete(item);});
    resumeVisuals();
  },{rootMargin:'120px'});
  visuals.forEach(item=>motifObserver.observe(item.canvas));
  function renderVisuals(now){
    visualRaf=0;
    if(blocked()||!visibleMotifs.size)return;
    if(now-visualLast<32){visualRaf=requestAnimationFrame(renderVisuals);return;}
    visualLast=now;
    const phase=now/1000;
    visibleMotifs.forEach(item=>drawVisual(item,phase));
    visualRaf=requestAnimationFrame(renderVisuals);
  }
  visuals.forEach(item=>drawVisual(item,0));
  function resumeVisuals(){if(!blocked()&&visibleMotifs.size&&!visualRaf)visualRaf=requestAnimationFrame(renderVisuals);}
  resumeVisuals();

  /* A low-resolution Mandelbrot / Julia / hyperbolic cycle, close to the old idle effect. */
  let fractalCanvas=null, fractalCtx=null, fractalRaf=0, fractalTimer=0, idleTimer=0, fractalActive=false, fractalKind=-1, lastFractal=0;
  const fractalKinds=['mandelbrot','julia','hyperbolic'];
  function ensureFractal(){
    if(fractalCanvas)return;
    fractalCanvas=document.createElement('canvas');fractalCanvas.id='fractal-overlay';fractalCanvas.setAttribute('aria-hidden','true');
    fractalCtx=fractalCanvas.getContext('2d',{alpha:true});body.appendChild(fractalCanvas);resizeFractal();
  }
  function resizeFractal(){
    if(!fractalCanvas)return;
    fractalCanvas.width=Math.min(520,Math.max(260,Math.floor(window.innerWidth*.48)));
    fractalCanvas.height=Math.min(360,Math.max(180,Math.floor(window.innerHeight*.38)));
    frameImage=null;
  }
  // Render in short cancellable slices; never hold up scrolling for a whole image.
  let frameTask=0, frameEpoch=0, frameImage=null;
  function hueToRgb(p0,q0,tc){if(tc<0)tc+=6;if(tc>6)tc-=6;if(tc<1)return p0+(q0-p0)*6*tc;if(tc<3)return q0;if(tc<4)return p0+(q0-p0)*(4-tc);return p0;}
  function renderFractal(now){
    fractalRaf=0;
    if(!fractalCtx||!fractalCanvas||!fractalActive||blocked())return;
    const epoch=frameEpoch;
    const w=fractalCanvas.width,h=fractalCanvas.height;
    if(!frameImage||frameImage.width!==w||frameImage.height!==h)frameImage=fractalCtx.createImageData(w,h);
    const img=frameImage,data=img.data;
    const t=now/1000,maxIter=48,zoom=1.05+.08*Math.sin(t*.18),kind=fractalKinds[fractalKind];
    const cJReal=-.79+Math.sin(t*.12)*.08,cJImag=.15+Math.cos(t*.1)*.07;
    let py=0;
    function slice(){
      frameTask=0;
      if(epoch!==frameEpoch||!fractalActive||blocked())return;
      const deadline=performance.now()+3;
      do {
      for(let px=0;px<w;px++){
        const i=(py*w+px)*4, sx=(px-w*.52)/(w*.30*zoom), sy=(py-h*.5)/(w*.30*zoom);
        let zx,zy,cx,cy;
        if(kind==='julia'){zx=sx;zy=sy;cx=cJReal;cy=cJImag;}
        else if(kind==='hyperbolic'){const rr=Math.hypot(sx,sy),aa=Math.atan2(sy,sx)+t*.025;cx=1.46*Math.tanh(rr*.72)*Math.cos(aa);cy=1.46*Math.tanh(rr*.72)*Math.sin(aa);zx=sx*.52;zy=sy*.52;}
        else {zx=0;zy=0;cx=sx-.54;cy=sy;}
        let iter=0;
        for(;iter<maxIter&&zx*zx+zy*zy<4;iter++){const xx=zx*zx-zy*zy+cx;zy=2*zx*zy+cy;zx=xx;}
        if(iter===maxIter){data[i+3]=0;continue;}
        const hue=(fractalKind*112+iter*8.8+t*9+Math.hypot(sx,sy)*18)%360, light=48+Math.min(25,iter*.6), alpha=Math.min(150,20+iter*3.2);
        const h0=hue/60,s0=.92,l0=light/100;
        const q=l0<.5?l0*(1+s0):l0+s0-l0*s0,p=2*l0-q;
        data[i]=Math.round(hueToRgb(p,q,h0+2)*255);data[i+1]=Math.round(hueToRgb(p,q,h0)*255);data[i+2]=Math.round(hueToRgb(p,q,h0-2)*255);data[i+3]=Math.round(alpha);
      }

        py++;
      } while(py<h&&performance.now()<deadline);
      if(py<h){frameTask=setTimeout(slice,0);return;}
      fractalCtx.putImageData(img,0,0);
      frameTask=setTimeout(()=>{frameTask=0;if(epoch===frameEpoch&&fractalActive&&!blocked())fractalRaf=requestAnimationFrame(renderFractal);},Math.max(0,72-(performance.now()-now)));
    }
    slice();
  }
  function stopFractal(){frameEpoch++;clearTimeout(frameTask);frameTask=0;fractalActive=false;clearTimeout(fractalTimer);cancelAnimationFrame(fractalRaf);fractalRaf=0;if(fractalCanvas)fractalCanvas.style.opacity='0';}
  function startFractal(){
    if(fractalActive||blocked())return;
    ensureFractal();resizeFractal();fractalKind=(fractalKind+1)%fractalKinds.length;fractalActive=true;fractalCanvas.style.opacity='.22';lastFractal=0;renderFractal(performance.now());
    fractalTimer=setTimeout(()=>{stopFractal();armIdle();},10500);
  }
  function armIdle(){stopFractal();clearTimeout(idleTimer);if(!blocked())idleTimer=setTimeout(startFractal,5200);}
  ['pointermove','pointerdown','wheel','touchstart','keydown','scroll'].forEach(event=>window.addEventListener(event,armIdle,{passive:true}));
  window.addEventListener('resize',armIdle,{passive:true});
  reduced.addEventListener?.('change',()=>{armIdle();resumeVisuals();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stopFractal();armIdle();resumeVisuals();});
  document.getElementById('toggleFancyMode')?.addEventListener('click',()=>setTimeout(()=>{armIdle();resumeVisuals();},0));
  room?.addEventListener('close',()=>setTimeout(()=>{armIdle();resumeVisuals();},0));
  new MutationObserver(()=>{if(blocked())stopFractal();else{armIdle();resumeVisuals();}}).observe(body,{attributes:true,attributeFilter:['class']});
  armIdle();

}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initMathematicalMotion,{once:true});else initMathematicalMotion();
