const body = document.body;
const html = document.documentElement;

const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".mobile-menu");
const overlay = document.querySelector(".menu-overlay");

function openMenu() {
  menu.classList.add("active");
  overlay.classList.add("active");

  html.classList.add("menu-open");
  body.classList.add("menu-open");

  hamburger.setAttribute("aria-expanded", "true");
}

function closeMenu() {
  menu.classList.remove("active");
  overlay.classList.remove("active");

  html.classList.remove("menu-open");
  body.classList.remove("menu-open");

  hamburger.setAttribute("aria-expanded", "false");
}

function toggleMenu() {
  menu.classList.contains("active") ? closeMenu() : openMenu();
}

hamburger.addEventListener("click", toggleMenu);
overlay.addEventListener("click", closeMenu);

document.querySelectorAll(".mobile-menu a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// fixed navbar on scroll
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

/* =============================
   SCROLL & ANIMATIONS
============================= */
function initScrollToTop() {
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  if (!scrollTopBtn) return;
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) scrollTopBtn.classList.add("show");
    else scrollTopBtn.classList.remove("show");
  });
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

initScrollToTop();

/* =============================
   TESTIMONIAL SCROLL
============================= */
document.addEventListener("DOMContentLoaded", () => {
  const row = document.querySelector(".testimonial-row");
  const indicator = document.getElementById("testimonial-indicator");
  const boxes = document.querySelectorAll(".testimonial-box");
  const nextBtn = document.querySelector(".test-next");
  const prevBtn = document.querySelector(".test-prev");

  // 1. Create the dashes
  boxes.forEach((_, index) => {
    const dash = document.createElement("div");
    dash.classList.add("indicator-dash");
    if (index === 0) dash.classList.add("active");
    indicator.appendChild(dash);
  });

  const dashes = document.querySelectorAll(".indicator-dash");

  const updateDashes = () => {
    const currentIndex = Math.round(row.scrollLeft / row.offsetWidth);
    dashes.forEach((dash, index) => {
      dash.classList.toggle("active", index === currentIndex);
    });
  };

  // 2. Navigation Functions
  const showNext = () => {
    // If we're at the last card, loop back to the first
    if (row.scrollLeft + row.offsetWidth >= row.scrollWidth - 10) {
      row.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      row.scrollBy({ left: row.offsetWidth, behavior: "smooth" });
    }
  };

  const showPrev = () => {
    if (row.scrollLeft <= 0) {
      row.scrollTo({ left: row.scrollWidth, behavior: "smooth" });
    } else {
      row.scrollBy({ left: -row.offsetWidth, behavior: "smooth" });
    }
  };

  // 3. Auto-Scroll Logic
  let autoScroll = setInterval(showNext, 5000); // Change 5000 to adjust speed (5s)

  const resetTimer = () => {
    clearInterval(autoScroll);
    autoScroll = setInterval(showNext, 5000);
  };

  // 4. Event Listeners
  nextBtn.addEventListener("click", () => {
    showNext();
    resetTimer(); // Restarts the timer so it doesn't "jump" right after a click
  });

  prevBtn.addEventListener("click", () => {
    showPrev();
    resetTimer();
  });

  // Pause on Hover
  row.addEventListener("mouseenter", () => clearInterval(autoScroll));
  row.addEventListener("mouseleave", () => {
    autoScroll = setInterval(showNext, 5000);
  });

  row.addEventListener("scroll", updateDashes);
});
