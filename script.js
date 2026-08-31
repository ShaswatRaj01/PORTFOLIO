const root = document.documentElement;
const nav = document.getElementById('nav');
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
const glow = document.querySelector('.cursor-glow');
let mouseX = innerWidth/2, mouseY = innerHeight/2, ringX = mouseX, ringY = mouseY, glowX = mouseX, glowY = mouseY;

window.addEventListener('pointermove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  root.style.setProperty('--mx', `${mouseX}px`);
  root.style.setProperty('--my', `${mouseY}px`);
  if(dot){ dot.style.left = mouseX+'px'; dot.style.top = mouseY+'px'; }
  document.querySelectorAll('.project-card').forEach(card=>{
    const r=card.getBoundingClientRect();
    card.style.setProperty('--cx', `${mouseX-r.left}px`);
    card.style.setProperty('--cy', `${mouseY-r.top}px`);
  });
});
function cursorLoop(){
  ringX += (mouseX-ringX)*.18; ringY += (mouseY-ringY)*.18;
  glowX += (mouseX-glowX)*.08; glowY += (mouseY-glowY)*.08;
  if(ring){ring.style.left=ringX+'px';ring.style.top=ringY+'px'}
  if(glow){glow.style.left=glowX+'px';glow.style.top=glowY+'px'}
  requestAnimationFrame(cursorLoop);
}
cursorLoop();

window.addEventListener('scroll',()=>{
  nav.classList.toggle('scrolled', scrollY>30);
  root.style.setProperty('--scroll', scrollY);
});

const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{ if(entry.isIntersecting){entry.target.classList.add('visible'); observer.unobserve(entry.target)}});
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

document.querySelectorAll('.tilt').forEach(card=>{
  card.addEventListener('pointermove',e=>{
    if(matchMedia('(pointer:coarse)').matches) return;
    const r=card.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`perspective(900px) rotateX(${(-y*5).toFixed(2)}deg) rotateY(${(x*7).toFixed(2)}deg) translateY(-3px)`;
  });
  card.addEventListener('pointerleave',()=>card.style.transform='');
});

document.querySelectorAll('.magnetic').forEach(el=>{
  el.addEventListener('pointermove',e=>{
    if(matchMedia('(pointer:coarse)').matches)return;
    const r=el.getBoundingClientRect();
    const x=e.clientX-r.left-r.width/2, y=e.clientY-r.top-r.height/2;
    el.style.transform=`translate(${x*.14}px,${y*.14}px)`;
  });
  el.addEventListener('pointerleave',()=>el.style.transform='');
});

const menu=document.querySelector('.menu');
menu?.addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const orb=document.querySelector('.orb-core');
window.addEventListener('pointermove',e=>{
  if(!orb || matchMedia('(pointer:coarse)').matches)return;
  const x=(e.clientX/innerWidth-.5)*18, y=(e.clientY/innerHeight-.5)*18;
  orb.style.transform=`translate(${x}px,${y}px)`;
});
