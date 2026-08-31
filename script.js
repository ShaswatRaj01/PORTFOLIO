const glow=document.getElementById("cursorGlow");
let mx=innerWidth/2,my=innerHeight/2;
addEventListener("pointermove",e=>{mx=e.clientX;my=e.clientY;glow.style.transform=`translate(${mx-110}px,${my-110}px)`});
const orb=document.getElementById("orb");
addEventListener("pointermove",e=>{if(innerWidth>850){const x=(e.clientX/innerWidth-.5)*16,y=(e.clientY/innerHeight-.5)*-16;orb.style.transform=`rotateX(${y}deg) rotateY(${x}deg)`}});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("show")}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(x=>observer.observe(x));

document.querySelectorAll(".project-card,.skill-card,.cert-card,.sport-item").forEach(card=>{
  card.addEventListener("pointermove",e=>{
    if(innerWidth<850)return;
    const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    card.style.setProperty("--rx",`${-y*4}deg`);card.style.setProperty("--ry",`${x*5}deg`);
  });
  card.addEventListener("pointerleave",()=>{card.style.setProperty("--rx","0deg");card.style.setProperty("--ry","0deg")});
});
document.querySelectorAll(".cert-card[data-cert] button").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const card=btn.closest(".cert-card"),file=card.dataset.cert,modal=document.getElementById("certModal");
    document.getElementById("certFrame").src=file;modal.classList.add("open");modal.setAttribute("aria-hidden","false");
  });
});
const modal=document.getElementById("certModal");
function closeModal(){modal.classList.remove("open");modal.setAttribute("aria-hidden","true");document.getElementById("certFrame").src=""}
document.querySelector(".close").onclick=closeModal;document.querySelector(".modal-backdrop").onclick=closeModal;
addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});

const canvas=document.getElementById("stars"),ctx=canvas.getContext("2d");
function resize(){canvas.width=innerWidth*devicePixelRatio;canvas.height=innerHeight*devicePixelRatio;ctx.scale(devicePixelRatio,devicePixelRatio)}
resize();addEventListener("resize",resize);
const pts=Array.from({length:90},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.3+.2,s:Math.random()*.25+.08}));
function stars(){ctx.clearRect(0,0,innerWidth,innerHeight);for(const p of pts){p.y-=p.s;if(p.y<0)p.y=innerHeight;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle="rgba(170,220,255,.5)";ctx.fill()}requestAnimationFrame(stars)}stars();

document.querySelector(".menu").addEventListener("click",()=>document.querySelector(".navlinks").classList.toggle("open"));
