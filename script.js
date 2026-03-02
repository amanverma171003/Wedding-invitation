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


const slider = document.querySelector(".stack-cards");
const cards = document.querySelectorAll(".stack-card");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let currentIndex = 0;
const totalCards = cards.length;

function updateSlider() {
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % totalCards;
  updateSlider();
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + totalCards) % totalCards;
  updateSlider();
});



/* =========================
   CINEMATIC SCROLL EFFECT
========================= */

// const sections = document.querySelectorAll("section");

// function cinematicScroll() {

//   const windowH = window.innerHeight;

//   sections.forEach(section => {

//     if (section.classList.contains("journey-stack-section")) return;

//     const inner = section.querySelector(".section-inner");
//     if (!inner) return;

//     const rect = section.getBoundingClientRect();

//     if (rect.top < windowH && rect.bottom > 0) {

//       const progress = rect.top / windowH;

//       inner.style.transform =
//         `translateY(${progress * 30}px) scale(${1 - Math.abs(progress) * 0.03})`;

//     } else {
//       inner.style.transform = "translateY(0px) scale(1)";
//     }

//   });

// }

// lenis.on("scroll", cinematicScroll);
// cinematicScroll();













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













const weddingDate = new Date("June 16, 2026 00:00:00").getTime();

const timer = setInterval(function () {

  const now = new Date().getTime();
  const distance = weddingDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;

  if (distance < 0) {
    clearInterval(timer);
    document.querySelector(".countdown-boxes").innerHTML = "<h2>We Are Married ❤️</h2>";
  }

}, 1000);