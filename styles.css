/* Antonio Del Donno — the original neon / CRT palette, with continuous motion. */
@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
:root{color-scheme:dark;--cyan:#5ffff1;--pink:#ff62d5;--yellow:#eeff72;--ease:cubic-bezier(.22,1,.36,1)}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;scroll-padding-top:24px}
body{font-family:'VT323',monospace;background:#1c1830;color:#f2eff9;line-height:1.7;overflow-x:hidden;isolation:isolate}
body::before{content:'';position:fixed;inset:-15%;z-index:-2;pointer-events:none;background:radial-gradient(ellipse at 15% 20%,#8e44ad99,transparent 60%),radial-gradient(ellipse at 90% 70%,#27ae6077,transparent 65%),#1c1830;animation:ambient-drift 32s ease-in-out infinite alternate}
body::after{content:'';position:fixed;inset:0;pointer-events:none;z-index:20;opacity:.16;background:repeating-linear-gradient(0deg,#000 0 1px,transparent 1px 4px)}
@keyframes ambient-drift{to{transform:translate3d(3%,-3%,0) scale(1.06)}}
#hyperbolic-field{position:fixed;z-index:-1;pointer-events:none;width:min(1120px,130vw);height:auto;aspect-ratio:1;right:-24%;top:calc(50vh - min(560px,65vw));opacity:.58;animation:hyperbolic-turn 140s linear infinite;transition:opacity .6s ease}
@keyframes hyperbolic-turn{to{transform:rotate(360deg)}}
.neon-grid{position:fixed;inset:auto -30% -24% -30%;height:65vh;pointer-events:none;z-index:-1;opacity:.2;background-image:linear-gradient(#61fff12e 1px,transparent 1px),linear-gradient(90deg,#61fff12e 1px,transparent 1px);background-size:56px 56px;transform:perspective(420px) rotateX(58deg);mask-image:linear-gradient(transparent,#000)}
.cyber-overlay,.vhs-overlay,.crt-curvature,.center-glow{display:none}
header,main,footer{position:relative;z-index:1}
header{padding:32px 0 26px;text-align:center;background:#080914c9;border-bottom:1px solid #a35fcc80}
.container{width:90%;max-width:1100px;margin:auto;padding:15px 30px;position:relative}
header h1{font-size:2.8rem;font-weight:400;line-height:1.1;margin:0 0 24px;color:#bd7bde;text-shadow:2px 0 #e75ac060,-2px 0 #56ffff70,0 0 24px #a762bc66}
nav ul{list-style:none;display:flex;justify-content:center;gap:12px;flex-wrap:wrap}
nav li:nth-child(1){--nav-color:#00ffff}nav li:nth-child(2){--nav-color:#ff00cc}nav li:nth-child(3){--nav-color:#ffff00}nav li:nth-child(4){--nav-color:#b974df}nav li:nth-child(5){--nav-color:#42d97e}
nav a{display:block;text-decoration:none;color:var(--nav-color);border:1px solid var(--nav-color);background:color-mix(in srgb,var(--nav-color) 14%,#11121c);border-radius:4px;padding:5px 13px;font-size:1.2rem;box-shadow:0 0 14px color-mix(in srgb,var(--nav-color) 15%,transparent);transition:transform .35s var(--ease),background .25s}
nav a:hover,nav a[aria-current]{transform:translateY(-3px);background:color-mix(in srgb,var(--nav-color) 27%,#11121c)}
button,input,textarea{font:inherit}button,a{-webkit-tap-highlight-color:transparent}button{cursor:pointer}a{color:var(--yellow);text-underline-offset:4px;transition:color .25s,text-shadow .25s}a:hover{color:white;text-shadow:0 0 10px #eeff7270}
:focus-visible{outline:2px solid var(--yellow);outline-offset:6px}
.hamburger{display:none}
#toggleFancyMode{position:fixed;top:18px;right:18px;z-index:30;color:var(--cyan);background:#10121ce8;border:1px solid #5ffff175;border-radius:3px;padding:8px 13px;font-size:1rem;transition:background .25s}
#toggleFancyMode:hover{background:#1e3940}
.section{position:relative;padding:42px 0;margin:18px 0;background:#080b14bd;border-block:1px solid #aa69d341;overflow:hidden;scroll-margin-top:18px}
.section .container{transition:opacity .75s var(--ease),transform .75s var(--ease)}
.section.is-pending .container{opacity:0;transform:translateY(22px)}
.section-bg{position:absolute;inset:-3%;background-size:cover;background-position:center;opacity:.075;filter:blur(4px) saturate(.65);pointer-events:none;z-index:-1}
.cyber-border{position:absolute;inset:0;pointer-events:none;border-left:2px solid #ff62d55c;border-right:2px solid #5ffff13a;mask-image:linear-gradient(transparent,#000 25%,#000 75%,transparent)}
.section-title{font-size:2.5rem;font-weight:400;color:#7ce594;margin-bottom:22px;text-shadow:0 0 18px #27ae6040}
.subsection-title{font-size:1.8rem;font-weight:400;color:#ff917d;margin:25px 0 12px}
.section-body{font-size:1.15rem;margin:0 20px 22px;line-height:1.65}
.section-list{padding-left:22px}.section-list li{font-size:1.2rem;margin:16px 20px}
.neon-cyan{color:var(--cyan)}.neon-pink{color:var(--pink)}.neon-yellow{color:var(--yellow)}
.neon-cyan,.neon-pink,.neon-yellow{text-shadow:0 0 10px color-mix(in srgb,currentColor 22%,transparent)}
.neon-link{color:var(--yellow);text-shadow:0 0 10px #eeff7230}
.about-content{display:flex;align-items:center;gap:40px}.about-text{flex:1;min-width:0}.about-image{flex:0 0 150px}
#gif-toggle{position:relative;width:150px;height:150px;border-radius:50%;border:3px solid #ac68d0;box-shadow:0 0 32px #a559c02e;overflow:hidden;cursor:pointer}
.about-image img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:opacity .65s ease,transform 1s var(--ease)}
#photo-image{opacity:0}.show-photo #photo-image{opacity:1}.show-photo #gif-image{opacity:0}
#gif-toggle:hover img{transform:scale(1.045)}
.hologram::after{content:'';position:absolute;inset:0;pointer-events:none;background:linear-gradient(110deg,transparent 20%,#ffffff26 45%,transparent 70%);transform:translateX(-130%);animation:hologram-sweep 9s ease-in-out infinite}
@keyframes hologram-sweep{0%,65%{transform:translateX(-130%)}100%{transform:translateX(130%)}}
.youtube-wrapper{position:relative;aspect-ratio:16/9;margin:22px 0;border:1px solid #5ffff170;border-radius:7px;overflow:hidden;box-shadow:0 0 18px #5ffff11a}
.youtube-wrapper iframe{position:absolute;inset:0;width:100%;height:100%;border:0}
.spotify-players{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:22px;padding:16px 0}.spotify-wrapper{min-width:0;height:352px}.spotify-wrapper iframe{width:100%;height:352px;border:0;display:block}
.slideshow-container{position:relative;height:clamp(300px,52vw,600px);margin:28px 0 16px;border:1px solid #5ffff150;border-radius:10px;background:#080b12;overflow:hidden}
.slides{position:absolute;inset:0}.slide{position:absolute;inset:0;opacity:0;visibility:hidden;transition:opacity .8s ease,visibility .8s;pointer-events:none}.slide.active{opacity:1;visibility:visible;pointer-events:auto}
.slide img{display:block;width:100%;height:100%;object-fit:contain}.slide-error{position:absolute;inset:40% 15%;text-align:center;font-size:1.2rem;color:#b3b3c6}
.neon-button{padding:10px 20px;color:var(--cyan);font-size:1.2rem;border:1px solid #5ffff180;background:#0b1d24;transition:background .25s,transform .35s var(--ease)}
.neon-button:hover{background:#1b3e44}.neon-button:disabled{opacity:.6;cursor:wait}
.prev,.next{position:absolute;top:50%;transform:translateY(-50%);z-index:2;min-width:44px;min-height:48px;padding:8px 14px;background:#080b14c9}.prev{left:14px}.next{right:14px}
.dots{display:flex;flex-wrap:wrap;justify-content:center;gap:0}.dot{width:28px;height:32px;position:relative;border:0;background:transparent}.dot::before{content:'';position:absolute;width:8px;height:8px;left:10px;top:12px;border:1px solid var(--cyan);border-radius:50%;opacity:.5;transition:opacity .3s,transform .3s,background .3s}.dot.active::before{opacity:1;background:var(--cyan);transform:scale(1.35)}
.playback-button{display:block;margin:12px auto 0;background:none;border:0;color:var(--cyan);font-size:1rem;text-decoration:underline;text-underline-offset:4px;padding:8px;min-height:44px}
.contact-form{max-width:650px;margin:auto}.form-group{margin-bottom:20px}.form-group label{display:block;font-size:1.1rem;color:var(--cyan);margin-bottom:6px}.form-group input,.form-group textarea{display:block;width:100%;border:1px solid #5ffff160;border-radius:3px;background:#090e19c9;color:#f2eff9;padding:12px 16px;font-size:1.1rem}.form-group textarea{resize:vertical;min-height:160px}#contact-status{min-height:1.8em;margin-top:14px;color:var(--yellow);font-size:1.1rem}
footer{padding:28px 70px 28px 0;background:#080b14bd;min-height:110px;border-top:1px solid #ac68d060}footer p{font-size:1.1rem}
#thoughts-key{position:absolute;right:24px;bottom:24px;width:50px;height:50px;border:0;background:transparent;color:#c49acb;display:grid;place-items:center;transition:color .3s}
#thoughts-key svg{width:40px;height:40px;fill:none;stroke:currentColor;stroke-width:1;animation:hyperbolic-turn 22s linear infinite;filter:drop-shadow(0 0 6px #ff62d540)}
#thoughts-key:hover,#thoughts-key:focus-visible{color:var(--cyan)}#thoughts-key:hover svg{animation-play-state:paused}
#thoughts-room{position:fixed;inset:0;margin:auto;width:min(740px,calc(100% - 32px));max-height:calc(100dvh - 48px);border:1px solid #bd84c675;border-radius:4px;background:#11111d;color:#ede7f2;box-shadow:0 30px 100px #0009;padding:0;overflow:auto;overscroll-behavior:contain}
#thoughts-room::backdrop{background:#080a15e8;backdrop-filter:blur(9px)}
#thoughts-room[open]{animation:room-enter .55s var(--ease)}
@keyframes room-enter{from{opacity:0;transform:translateY(18px) scale(.985)}to{opacity:1;transform:none}}
.thoughts-paper{position:relative;padding:64px 72px 40px;min-height:490px;background:radial-gradient(ellipse at 100% 0,#72558725,transparent 65%)}
#thoughts-close{position:absolute;top:14px;right:14px;width:44px;height:44px;border:0;background:transparent;color:#c3aaca;font-size:2rem}
.thoughts-mark{position:absolute;right:70px;top:76px;color:#aa72b54d;font:4rem Georgia,serif}
.thoughts-kicker{font-size:.95rem;letter-spacing:.14em;color:#bba2c3;margin-bottom:18px}
#thoughts-title{font:italic 3.3rem/1.15 Georgia,serif;letter-spacing:-.05em;color:#efd8f2;margin-bottom:18px}
.thoughts-categories{font-size:1.1rem;color:#c7a5ce;padding-bottom:30px;border-bottom:1px solid #aa72b530}
.thoughts-empty{font:1.05rem/1.9 Georgia,serif;color:#aaa2b6;margin:40px 0 44px}.thoughts-end{text-align:center;color:#be8bce;font-size:1.7rem;margin-top:35px}
.thought-entry{padding:30px 0;border-bottom:1px solid #aa72b530}.thought-entry .thought-type{color:#b999c5;font-size:1rem}.thought-entry h3{font:1.55rem Georgia,serif;margin:10px 0 20px}.thought-entry .thought-body{white-space:pre-wrap;font:1.05rem/1.9 Georgia,serif}
body.room-open{overflow:hidden}body.room-open #hyperbolic-field{opacity:.15}
body.sobrio-mode{background:#17171d}body.sobrio-mode::before,body.sobrio-mode::after,body.sobrio-mode #hyperbolic-field,body.sobrio-mode .neon-grid,body.sobrio-mode .section-bg,body.sobrio-mode .cyber-border{display:none}body.sobrio-mode .hologram::after{display:none}body.sobrio-mode #thoughts-key svg{animation:none}body.sobrio-mode :is(h1,h2,h3,a,strong,p){text-shadow:none}body.sobrio-mode nav a{background:#22222b;box-shadow:none}body.sobrio-mode .section{background:#101014}body.sobrio-mode #gif-image{opacity:0}body.sobrio-mode #photo-image{opacity:1}
body.is-backgrounded *,body.is-backgrounded::before{animation-play-state:paused!important}
@media(min-width:1100px){header .container{padding-top:20px}}
@media(max-width:768px){.container{width:95%;padding:12px 18px}header{padding:78px 0 22px}header h1{font-size:2.6rem;margin-bottom:8px}.hamburger{display:block;position:fixed;top:16px;left:18px;z-index:30;width:44px;height:40px;border:1px solid #5ffff160;border-radius:3px;background:#10121ce8;color:var(--cyan);font-size:1.5rem}header{z-index:25}nav ul{display:none;position:fixed;top:66px;left:16px;right:16px;background:#0d101af5;border:1px solid #70538b;padding:18px;gap:10px;box-shadow:0 20px 40px #0009}nav ul.active{display:flex;flex-direction:column}nav a{padding:9px}#toggleFancyMode{top:16px;right:18px}.section{padding:28px 0;margin:12px 0}.section-title{font-size:2.2rem}.subsection-title{font-size:1.6rem}.section-body{margin:0 0 20px;font-size:1.12rem}.section-list li{margin:14px 0;font-size:1.12rem}.about-content{flex-direction:column;gap:22px}.about-image{flex-basis:auto}.spotify-players{grid-template-columns:1fr}.slideshow-container{height:380px}.prev{left:8px}.next{right:8px}#hyperbolic-field{width:145vw;right:-65%;top:12vh;opacity:.35}.thoughts-paper{padding:55px 26px 28px;min-height:430px}#thoughts-title{font-size:2.7rem}.thoughts-mark{right:26px;top:66px;font-size:3rem}.thoughts-categories{font-size:1rem}footer{padding-right:54px}footer .container{padding-left:20px}#thoughts-key{right:16px}}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}*,*::before,*::after{animation:none!important;transition:none!important}.section.is-pending .container{opacity:1;transform:none}#gif-image{opacity:0}#photo-image{opacity:1}.section-bg{display:none}}


/* Psychedelic motion layer: a brighter return to the original analogue energy. */
.cyber-overlay{display:block;position:fixed;inset:-18%;z-index:18;pointer-events:none;opacity:.34;mix-blend-mode:screen;background:conic-gradient(from 130deg at 42% 46%,transparent 0deg,#ff35dd16 72deg,transparent 124deg,#5ffff11a 188deg,transparent 246deg,#eeff7212 312deg,transparent 360deg);filter:blur(18px);animation:psychedelic-shift 28s ease-in-out infinite alternate}
.vhs-overlay{display:block;position:fixed;inset:0;z-index:19;pointer-events:none;opacity:.12;background:repeating-linear-gradient(90deg,transparent 0 8px,#ff62d50b 8px 9px),repeating-linear-gradient(0deg,transparent 0 3px,#5ffff10b 3px 4px);mix-blend-mode:screen;animation:scanline-float 12s linear infinite}
.crt-curvature{display:block;position:fixed;inset:0;z-index:17;pointer-events:none;border-radius:4%;box-shadow:inset 0 0 120px #050013b8,inset 0 0 22px #ff62d51c}
.center-glow{display:block;position:fixed;inset:0;z-index:-1;pointer-events:none;background:radial-gradient(circle at 18% 28%,#ff62d51a,transparent 24%),radial-gradient(circle at 86% 64%,#5ffff118,transparent 27%),radial-gradient(circle at 52% 12%,#eeff7212,transparent 18%);mix-blend-mode:screen;animation:center-breathe 16s ease-in-out infinite alternate}
@keyframes psychedelic-shift{from{transform:rotate(-5deg) scale(1.02) translate3d(-2%,1%,0)}to{transform:rotate(7deg) scale(1.12) translate3d(3%,-2%,0)}}
@keyframes scanline-float{to{background-position:42px 0,0 34px}}
@keyframes center-breathe{to{transform:scale(1.06) rotate(2deg);opacity:.76}}
.section::before{content:'';position:absolute;inset:-48%;z-index:0;pointer-events:none;background:conic-gradient(from 20deg,transparent 0 14%,#5ffff11c 20%,transparent 28% 44%,#ff62d51c 53%,transparent 61% 75%,#eeff7218 84%,transparent 92%);filter:blur(30px);opacity:.6;mix-blend-mode:screen;animation:section-aurora 25s linear infinite}
.section::after{content:'';position:absolute;inset:0;z-index:0;pointer-events:none;opacity:.3;background-image:radial-gradient(circle at 16% 24%,#5ffff15c 0 1px,transparent 2px),radial-gradient(circle at 72% 64%,#ff62d550 0 1px,transparent 2px),radial-gradient(circle at 44% 84%,#eeff7240 0 1px,transparent 2px);background-size:92px 114px,130px 150px,164px 180px;animation:particle-drift 28s linear infinite}
.section .container{z-index:1}
@keyframes section-aurora{to{transform:rotate(360deg) translate3d(3%,-2%,0)}}
@keyframes particle-drift{to{background-position:92px 114px,-130px 150px,164px -180px}}
header h1,.section-title,.subsection-title{background:linear-gradient(105deg,#bd7bde 12%,#5ffff1 34%,#ffffff 47%,#ff62d5 58%,#eeff72 70%,#bd7bde 88%);background-size:260% auto;-webkit-background-clip:text;background-clip:text;color:transparent;text-shadow:none;animation:title-shine 7s ease-in-out infinite,title-pulse 3.8s ease-in-out infinite}
.section-title::after,.subsection-title::after{content:'';display:block;width:min(190px,42%);height:2px;margin-top:8px;background:linear-gradient(90deg,transparent,var(--pink),var(--cyan),transparent);box-shadow:0 0 12px #5ffff17d;transform-origin:left;animation:title-sweep 4.5s ease-in-out infinite}
@keyframes title-shine{0%,100%{background-position:160% 0}50%{background-position:-40% 0}}
@keyframes title-pulse{0%,100%{filter:drop-shadow(0 0 3px #5ffff155)}50%{filter:drop-shadow(0 0 11px #ff62d580) drop-shadow(0 0 22px #eeff7240)}}
@keyframes title-sweep{0%,100%{transform:scaleX(.55);opacity:.55}50%{transform:scaleX(1);opacity:1}}
#thoughts-room{border-color:#5ffff1a8;background:#0b1020f2;box-shadow:0 0 0 1px #ff62d53d,0 0 36px #5ffff130,0 30px 100px #000c}
#thoughts-room::backdrop{background:#070716e8;backdrop-filter:blur(11px) saturate(1.25)}
.thoughts-paper{overflow:hidden;font-family:'VT323',monospace;background:linear-gradient(135deg,#0b1424f5,#160f29f5),radial-gradient(circle at 80% 5%,#ff62d526,transparent 34%),radial-gradient(circle at 12% 88%,#5ffff11c,transparent 38%)}
.thoughts-paper::before{content:'';position:absolute;inset:0;pointer-events:none;opacity:.22;background-image:linear-gradient(#5ffff118 1px,transparent 1px),linear-gradient(90deg,#5ffff118 1px,transparent 1px);background-size:34px 34px;mask-image:linear-gradient(135deg,transparent 0,#000 45%,transparent 100%);animation:paper-grid 18s linear infinite}
.thoughts-paper::after{content:'';position:absolute;inset:-45%;pointer-events:none;opacity:.28;background:conic-gradient(from 45deg,transparent,#ff62d51c,transparent 24%,#5ffff11f,transparent 54%,#eeff7215,transparent 78%);filter:blur(28px);mix-blend-mode:screen;animation:section-aurora 22s linear infinite reverse}
.thoughts-paper > :not(.thoughts-mark){position:relative;z-index:1}
@keyframes paper-grid{to{background-position:34px 34px}}
#thoughts-title{font:normal 3.3rem/1.15 'VT323',monospace;letter-spacing:.02em;color:var(--cyan);text-shadow:0 0 8px #5ffff17d,0 0 25px #ff62d54d;animation:title-shine 7s ease-in-out infinite,title-pulse 3.8s ease-in-out infinite}
.thoughts-kicker{font-family:'VT323',monospace;color:var(--pink);text-shadow:0 0 8px #ff62d566}
.thoughts-categories{font-family:'VT323',monospace;color:var(--yellow);border-color:#5ffff14d;text-shadow:0 0 8px #eeff7240}
.thoughts-empty,.thought-entry .thought-body{font-family:'VT323',monospace;font-size:1.15rem;line-height:1.75;color:#f2eff9}
.thoughts-empty{padding:18px 20px;border-left:2px solid var(--pink);background:#15182b99;box-shadow:inset 0 0 28px #5ffff111}
.thought-entry{border-color:#5ffff140}.thought-entry h3{font-family:'VT323',monospace;color:var(--yellow);text-shadow:0 0 9px #eeff7255}.thought-entry .thought-type{font-family:'VT323',monospace;color:var(--pink)}
.thoughts-mark{color:var(--pink);text-shadow:0 0 10px #ff62d580;animation:mark-spin 16s linear infinite}
@keyframes mark-spin{to{transform:rotate(360deg)}}
#thoughts-close{color:var(--pink);text-shadow:0 0 10px #ff62d580;transition:color .25s,transform .35s var(--ease)}
#thoughts-close:hover{color:var(--cyan);transform:rotate(90deg)}
.thoughts-end{color:var(--cyan);text-shadow:0 0 12px #5ffff180}
body.sobrio-mode .cyber-overlay,body.sobrio-mode .vhs-overlay,body.sobrio-mode .crt-curvature,body.sobrio-mode .center-glow,body.sobrio-mode .section::before,body.sobrio-mode .section::after{display:none}
@media(prefers-reduced-motion:reduce){.cyber-overlay,.vhs-overlay,.center-glow,.section::before,.section::after,.thoughts-paper::before,.thoughts-paper::after{animation:none!important}.section-title::after,.subsection-title::after{animation:none!important;transform:none!important}.thoughts-mark{animation:none!important}}


/* Mathematical section backdrops: the original GIF atmosphere, with a clearer visual language. */
.section{isolation:isolate}
.section-bg{z-index:0;opacity:.14;filter:blur(1.5px) saturate(1.2) contrast(1.06);mix-blend-mode:screen;mask-image:radial-gradient(ellipse at center,#000 30%,transparent 92%);animation:section-bg-drift 34s ease-in-out infinite alternate}
.section::before,.section::after{z-index:0}
.section>.container{position:relative;z-index:3}
.math-visual{position:absolute;top:12px;right:1.5%;width:min(380px,43vw);height:240px;z-index:1;pointer-events:none;opacity:.3;mix-blend-mode:screen;filter:saturate(1.35) contrast(1.08);mask-image:linear-gradient(90deg,transparent,#000 18%,#000 82%,transparent)}
.math-visual canvas{display:block;width:100%;height:100%}
.math-visual-label{position:absolute;right:18px;bottom:8px;color:#5ffff18a;font-size:.78rem;letter-spacing:.12em;text-transform:uppercase;text-shadow:0 0 8px #5ffff160;white-space:nowrap}
#about .math-visual-label{color:#ff62d58a}#mathematics .math-visual-label{color:#5ffff18a}#music .math-visual-label{color:#eeff728a}#photography .math-visual-label{color:#ff9bdc8a}#contact .math-visual-label{color:#5ffff18a}
#about .section-bg{filter:blur(1.5px) saturate(1.25) hue-rotate(282deg) contrast(1.08)}
#mathematics .section-bg{filter:blur(1.5px) saturate(1.25) hue-rotate(158deg) contrast(1.08)}
#music .section-bg{filter:blur(1.5px) saturate(1.25) hue-rotate(34deg) contrast(1.08)}
#photography .section-bg{filter:blur(1.5px) saturate(1.25) hue-rotate(320deg) contrast(1.08)}
#contact .section-bg{filter:blur(1.5px) saturate(1.25) hue-rotate(92deg) contrast(1.08)}
@keyframes section-bg-drift{0%{transform:scale(1.02) translate3d(-1%,1%,0)}100%{transform:scale(1.09) rotate(1deg) translate3d(2%,-2%,0);background-position:54% 46%}}

/* Legacy fractals return as a quiet, low-resolution idle layer. */
#fractal-overlay{position:fixed;inset:0;width:100%;height:100%;z-index:16;pointer-events:none;opacity:0;mix-blend-mode:screen;filter:saturate(1.25) contrast(1.06) blur(.35px);transition:opacity 1.8s var(--ease);will-change:opacity,transform}
#fractal-overlay::after{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at center,transparent 42%,#ff62d508 76%,#05001324 100%)}
body.sobrio-mode #fractal-overlay,body.room-open #fractal-overlay{opacity:0!important}

/* Seminar feed cards keep the existing talk prominent while welcoming future releases. */
.seminar-intro{margin-bottom:14px;color:#d8d2e6}
.seminar-feed{display:grid;gap:24px;margin:20px}
.seminar-card{position:relative;border:1px solid #5ffff155;border-radius:8px;padding:18px;background:linear-gradient(135deg,#0a1522d9,#15102bd9);box-shadow:0 0 24px #5ffff112,inset 0 0 24px #ff62d509;animation:seminar-in .75s var(--ease) both}
.seminar-card::before{content:'';position:absolute;inset:0;pointer-events:none;border-radius:inherit;background:linear-gradient(120deg,#5ffff114,transparent 35%,#ff62d511 70%,transparent);opacity:.8}
.seminar-card>*{position:relative;z-index:1}
.seminar-card-head{display:flex;justify-content:space-between;gap:16px;align-items:center;flex-wrap:wrap;color:#9da1c7;font-size:.9rem;letter-spacing:.1em}
.seminar-tag{color:var(--pink);text-shadow:0 0 8px #ff62d560}.seminar-date{color:var(--yellow);text-shadow:0 0 8px #eeff7240}
.seminar-card h4{font-size:1.4rem;font-weight:400;line-height:1.25;margin:10px 0 0}
.seminar-card .youtube-wrapper{margin:16px 0 0}
.seminar-card.is-new{border-color:#ff62d5a8;box-shadow:0 0 30px #ff62d522,inset 0 0 28px #5ffff111}
.seminar-feed-status{min-height:1.4em;margin:0 4px;color:#bdb8d3;font-size:1rem;letter-spacing:.03em}
.seminar-feed-status.is-error{color:var(--yellow)}
@keyframes seminar-in{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}

@media(max-width:700px){.section-bg{opacity:.11}.math-visual{top:auto;right:0;bottom:2px;width:100%;height:180px;opacity:.17}.math-visual-label{right:14px}.seminar-feed{margin-inline:8px}.seminar-card{padding:14px}.seminar-card h4{font-size:1.2rem}}
@media(prefers-reduced-motion:reduce){.section-bg,.math-visual,.seminar-card{animation:none!important}.math-visual{opacity:.14}#fractal-overlay{display:none!important}}

.seminar-playlist-card{position:relative;border:1px dashed #bd84c675;border-radius:8px;padding:18px;background:linear-gradient(135deg,#111125b8,#0d1921b8);box-shadow:inset 0 0 24px #5ffff10b}
.seminar-playlist-card>*{position:relative;z-index:1}.seminar-playlist-card h4{font-size:1.3rem;font-weight:400;line-height:1.25;margin:10px 0 0}.seminar-playlist-note{margin:10px 0 0;color:#bdb8d3;font-size:1rem}.seminar-playlist-card .youtube-wrapper{margin:16px 0 0}
@media(max-width:700px){.seminar-playlist-card{padding:14px}.seminar-playlist-card h4{font-size:1.15rem}}
