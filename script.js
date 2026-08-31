const surface=document.getElementById("cursorSurface");
const cursorDot=document.createElement("div");
cursorDot.className="cursor-dot";
document.body.appendChild(cursorDot);

let mouseX=innerWidth/2, mouseY=innerHeight/2;
let surfaceX=mouseX, surfaceY=mouseY;

addEventListener("pointermove",e=>{
  mouseX=e.clientX;
  mouseY=e.clientY;
  document.documentElement.style.setProperty("--cursor-x",`${mouseX}px`);
  document.documentElement.style.setProperty("--cursor-y",`${mouseY}px`);

  // Small, understated cursor indicator.
  cursorDot.style.transform=`translate(${mouseX}px,${mouseY}px) translate(-50%,-50%)`;
});

addEventListener("pointerover",e=>{
  if(e.target.closest("a,button,.skill-card,.project-card,.cert-card,.sport-item,.floating-chip"))
    cursorDot.classList.add("active");
  if(e.target.closest("a,button,.skill-card,.project-card,.cert-card,.sport-item,.floating-chip"))
    surface.classList.add("active");
});
addEventListener("pointerout",e=>{
  if(e.target.closest("a,button,.skill-card,.project-card,.cert-card,.sport-item,.floating-chip"))
    cursorDot.classList.remove("active");
  if(e.target.closest("a,button,.skill-card,.project-card,.cert-card,.sport-item,.floating-chip"))
    surface.classList.remove("active");
});

function animateSurface(){
  // Gentle lag creates the requested small moving surface.
  surfaceX += (mouseX - 55 - surfaceX) * .075;
  surfaceY += (mouseY - 55 - surfaceY) * .075;
  surface.style.transform=`translate(${surfaceX}px,${surfaceY}px)`;
  requestAnimationFrame(animateSurface);
}
animateSurface();

const orb=document.getElementById("portraitStage");
addEventListener("pointermove",e=>{
  if(innerWidth>850){
    const x=(e.clientX/innerWidth-.5)*16;
    const y=(e.clientY/innerHeight-.5)*-16;
    orb.style.transform=`rotateX(${y}deg) rotateY(${x}deg)`;
  }
});

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{
  if(e.isIntersecting)e.target.classList.add("show")
}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(x=>observer.observe(x));

document.querySelectorAll(".project-card,.skill-card,.cert-card,.sport-item").forEach(card=>{
  const spot=document.createElement("span");
  spot.className="cursor-spot";
  card.appendChild(spot);

  card.addEventListener("pointermove",e=>{
    if(innerWidth<850)return;
    const r=card.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    card.style.setProperty("--rx",`${-y*5}deg`);
    card.style.setProperty("--ry",`${x*7}deg`);
    card.style.setProperty("--mx",`${e.clientX-r.left}px`);
    card.style.setProperty("--my",`${e.clientY-r.top}px`);
  });
  card.addEventListener("pointerenter",()=>spot.style.opacity="1");
  card.addEventListener("pointerleave",()=>{
    card.style.setProperty("--rx","0deg");
    card.style.setProperty("--ry","0deg");
    spot.style.opacity="0";
  });
});

document.querySelectorAll(".cert-card[data-cert] button").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const card=btn.closest(".cert-card"),file=card.dataset.cert,modal=document.getElementById("certModal");
    document.getElementById("certFrame").src=file;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden","false");
  });
});

const modal=document.getElementById("certModal");
function closeModal(){
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden","true");
  document.getElementById("certFrame").src="";
}
document.querySelector(".close").onclick=closeModal;
document.querySelector(".modal-backdrop").onclick=closeModal;
addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});

const canvas=document.getElementById("stars"),ctx=canvas.getContext("2d");
function resize(){
  canvas.width=innerWidth*devicePixelRatio;
  canvas.height=innerHeight*devicePixelRatio;
  ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
}
resize();addEventListener("resize",resize);
const pts=Array.from({length:230},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.15+.18,s:Math.random()*.18+.035}));
function stars(){
  ctx.clearRect(0,0,innerWidth,innerHeight);
  for(const p of pts){
    p.y-=p.s;if(p.y<0)p.y=innerHeight;
    ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle=`rgba(190,215,255,${0.22 + p.r*0.22})`;ctx.fill();
  }
  requestAnimationFrame(stars);
}
stars();

document.querySelector(".menu").addEventListener("click",()=>document.querySelector(".navlinks").classList.toggle("open"));
