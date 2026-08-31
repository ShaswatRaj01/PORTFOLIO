document.addEventListener("DOMContentLoaded", () => {
  /* -------------------------------------------------------
     1. Flowing alphabet effect
     Hover a letter and the nearby letters gently follow.
     ------------------------------------------------------- */
  const title = document.querySelector(".hero-title");

  if (title) {
    const text = title.textContent;
    title.textContent = "";

    [...text].forEach((char) => {
      if (char === " ") {
        const space = document.createElement("span");
        space.className = "flow-space";
        title.appendChild(space);
        return;
      }

      const letter = document.createElement("span");
      letter.className = "flow-letter";
      letter.textContent = char;
      title.appendChild(letter);
    });

    const letters = [...title.querySelectorAll(".flow-letter")];

    letters.forEach((letter, index) => {
      letter.addEventListener("mouseenter", () => {
        letters.forEach((other, otherIndex) => {
          const distance = Math.abs(index - otherIndex);

          if (distance === 0) {
            other.style.transform = "translateY(-10px) rotate(-2deg)";
          } else if (distance === 1) {
            other.style.transform = "translateY(-5px) rotate(1deg)";
          } else if (distance === 2) {
            other.style.transform = "translateY(-2px)";
          } else {
            other.style.transform = "";
          }
        });
      });

      letter.addEventListener("mouseleave", () => {
        letters.forEach((other) => {
          other.style.transform = "";
        });
      });
    });
  }

  /* -------------------------------------------------------
     2. Star-field background
     Small, calm stars — no flashy animation.
     ------------------------------------------------------- */
  const canvas = document.getElementById("stars");
  const ctx = canvas.getContext("2d");

  let stars = [];
  let width = 0;
  let height = 0;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.min(180, Math.floor((width * height) / 8500));

    stars = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.25 + 0.25,
      alpha: Math.random() * 0.65 + 0.15,
      drift: Math.random() * 0.35 + 0.05,
      phase: Math.random() * Math.PI * 2
    }));
  }

  function drawStars(time) {
    ctx.clearRect(0, 0, width, height);

    stars.forEach((star) => {
      const twinkle = 0.82 + Math.sin(time * 0.001 * star.drift + star.phase) * 0.18;

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(190, 211, 255, ${star.alpha * twinkle})`;
      ctx.fill();
    });

    requestAnimationFrame(drawStars);
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
  requestAnimationFrame(drawStars);

  /* -------------------------------------------------------
     3. Very subtle cursor surface
     A soft field follows the cursor instead of a bright glow.
     ------------------------------------------------------- */
  const cursorSurface = document.querySelector(".cursor-surface");

  window.addEventListener("pointermove", (event) => {
    cursorSurface.style.left = `${event.clientX}px`;
    cursorSurface.style.top = `${event.clientY}px`;
  });

  /* -------------------------------------------------------
     4. Tiny 3D movement for the hero portrait
     Subtle enough that it doesn't distract.
     ------------------------------------------------------- */
  const visual = document.querySelector(".hero-visual");
  const portrait = document.querySelector(".portrait-wrap");

  window.addEventListener("pointermove", (event) => {
    if (!visual || window.innerWidth < 900) return;

    const x = (event.clientX / window.innerWidth - 0.5) * 2;
    const y = (event.clientY / window.innerHeight - 0.5) * 2;

    visual.style.transform = `translate(${x * 4}px, ${y * 3}px)`;
    portrait.style.transform =
      `translate(${x * 5}px, ${y * 4}px) translateZ(20px)`;
  });

  /* -------------------------------------------------------
     5. Scroll reveal
     ------------------------------------------------------- */
  const revealItems = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
});
