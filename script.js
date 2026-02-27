/* =========================
   LENIS SETUP
========================= */

const lenis = new Lenis({
  duration: 1.4,
  lerp: 0.08,
  smoothWheel: true,
  smoothTouch: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);



/* =========================
   HERO PARALLAX
========================= */

const hero = document.querySelector(".hero");
const heroBg = document.querySelector(".hero-bg");

if (hero && heroBg) {
  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    heroBg.style.transform =
      `translate(${x * -20}px, ${y * -20}px) scale(1.05)`;
  });

  hero.addEventListener("mouseleave", () => {
    heroBg.style.transform = "translate(0,0) scale(1)";
  });
}



/* =========================
   PARTICLES
========================= */

const particlesContainer = document.querySelector(".particles");

if (particlesContainer) {
  for (let i = 0; i < 25; i++) {
    const span = document.createElement("span");
    span.style.left = Math.random() * 100 + "%";
    span.style.animationDuration = 8 + Math.random() * 8 + "s";
    span.style.opacity = Math.random();
    particlesContainer.appendChild(span);
  }
}



/* =========================
   STACK SCROLL LOCK SYSTEM
========================= */

const stackSection = document.querySelector(".journey-stack-section");
const cards = document.querySelectorAll(".stack-card");

let currentIndex = 0;
let locked = false;
let animating = false;

/* Initial card state */
function renderCards() {
  cards.forEach((card, index) => {
    const offset = index - currentIndex;

    card.style.transform = `
      translateY(${offset * 20}px)
      rotateY(${offset * 12}deg)
      scale(${1 - Math.abs(offset) * 0.05})
    `;

    card.style.opacity = offset < 0 ? 0 : 1;
    card.style.zIndex = cards.length - index;
  });
}

renderCards();

/* Lock scroll ONLY when section fully fills viewport */
function checkLock() {

  if (!stackSection) return;

  const rect = stackSection.getBoundingClientRect();
  const sectionCenter = rect.top + rect.height / 2;
  const viewportCenter = window.innerHeight / 2;

  const distance = Math.abs(sectionCenter - viewportCenter);

  if (distance < 5 && !locked) {
    locked = true;
    lenis.stop();
  }

}

function unlock() {
  locked = false;
  lenis.start();
}

/* Wheel card navigation */
function handleWheel(e) {

  if (!locked) return;

  e.preventDefault();

  if (animating) return;

  animating = true;

  if (e.deltaY > 0 && currentIndex < cards.length - 1) {
    currentIndex++;
  } 
  else if (e.deltaY < 0 && currentIndex > 0) {
    currentIndex--;
  } 
  else {
    unlock();
    animating = false;
    return;
  }

  renderCards();

  setTimeout(() => {
    animating = false;
  }, 500);
}

window.addEventListener("wheel", handleWheel, { passive: false });

lenis.on("scroll", checkLock);



/* =========================
   CINEMATIC SCROLL EFFECT
========================= */

const sections = document.querySelectorAll("section");

function cinematicScroll() {

  const windowH = window.innerHeight;

  sections.forEach(section => {

    if (section.classList.contains("journey-stack-section")) return;

    const inner = section.querySelector(".section-inner");
    if (!inner) return;

    const rect = section.getBoundingClientRect();

    if (rect.top < windowH && rect.bottom > 0) {

      const progress = rect.top / windowH;

      inner.style.transform =
        `translateY(${progress * 30}px) scale(${1 - Math.abs(progress) * 0.03})`;

    } else {
      inner.style.transform = "translateY(0px) scale(1)";
    }

  });

}

lenis.on("scroll", cinematicScroll);
cinematicScroll();













const fairyContainer = document.querySelector(".fairy-container");

window.addEventListener("mousemove", (e) => {

    for (let i = 0; i < 2; i++) {

        const particle = document.createElement("div");
        particle.classList.add("fairy-particle");

        const size = Math.random() * 8 + 3;

        particle.style.width = size + "px";
        particle.style.height = size + "px";

        particle.style.left = e.clientX + (Math.random() * 25 - 12) + "px";
        particle.style.top = e.clientY + (Math.random() * 25 - 12) + "px";

        particle.style.opacity = Math.random() * 0.8 + 0.2;

        fairyContainer.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 1400);
    }

});