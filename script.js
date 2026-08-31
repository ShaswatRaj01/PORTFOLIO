// ===== Portfolio interactions =====
// Deliberately keeps interactions subtle: no cursor glow, card tilt, or hover spotlight.

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Certificate modal
document.querySelectorAll(".cert-card[data-cert] button").forEach(button => {
  button.addEventListener("click", () => {
    const card = button.closest(".cert-card");
    const modal = document.getElementById("certModal");
    document.getElementById("certFrame").src = card.dataset.cert;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  });
});

const modal = document.getElementById("certModal");
function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.getElementById("certFrame").src = "";
}

const closeButton = document.querySelector(".close");
if (closeButton) closeButton.addEventListener("click", closeModal);
const backdrop = document.querySelector(".modal-backdrop");
if (backdrop) backdrop.addEventListener("click", closeModal);
addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

// Calm star field with a very subtle twinkle.
const canvas = document.getElementById("stars");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let width = innerWidth;
  let height = innerHeight;
  let dpr = Math.min(devicePixelRatio || 1, 2);

  function resize() {
    width = innerWidth;
    height = innerHeight;
    dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  const stars = Array.from({ length: 230 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 1.1 + 0.2,
    speed: Math.random() * 0.08 + 0.02,
    phase: Math.random() * Math.PI * 2
  }));

  resize();
  addEventListener("resize", resize);

  function drawStars(time) {
    ctx.clearRect(0, 0, width, height);
    for (const star of stars) {
      star.y -= star.speed;
      if (star.y < -2) star.y = height + 2;
      const alpha = 0.20 + (Math.sin(time * 0.0007 + star.phase) + 1) * 0.07;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(190,215,255,${alpha})`;
      ctx.fill();
    }
    requestAnimationFrame(drawStars);
  }
  requestAnimationFrame(drawStars);
}

const menu = document.querySelector(".menu");
if (menu) {
  menu.addEventListener("click", () => document.querySelector(".navlinks").classList.toggle("open"));
}
