// Initialize the Hero Swiper
const heroSwiper = new Swiper(".hero-swiper", {
  slidesPerView: 1,
  spaceBetween: 10,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
// Toggle Between Tabs in Hero Section
document.addEventListener("DOMContentLoaded", () => {
  const categoriesTabs = document.getElementById("categoriesTabs");
  if (!categoriesTabs) return;

  const tabs = categoriesTabs.querySelectorAll("[data-twe-toggle='pill']");
  let currentIndex = 0;
  let intervalId;

  const switchTab = (index) => {
    tabs.forEach((tab, i) => {
      const targetContent = document.querySelector(
        tab.getAttribute("data-twe-target")
      );
      if (i === index) {
        tab.setAttribute("data-twe-nav-active", "");
        tab.setAttribute("aria-selected", "true");
        targetContent.setAttribute("data-twe-tab-active", "");
        targetContent.classList.remove("hidden", "opacity-0");
        targetContent.classList.add("opacity-100");
      } else {
        tab.removeAttribute("data-twe-nav-active");
        tab.setAttribute("aria-selected", "false");
        targetContent.removeAttribute("data-twe-tab-active");
        targetContent.classList.add("hidden", "opacity-0");
        targetContent.classList.remove("opacity-100");
      }
    });
  };

  const startAutoSwitch = () => {
    intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % tabs.length;
      switchTab(currentIndex);
    }, 10000); // 30 seconds
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      clearInterval(intervalId); // Stop auto-switching
      currentIndex = index;
      switchTab(currentIndex);
      startAutoSwitch(); // Restart auto-switching after a delay
    });
  });

  // Initialize
  switchTab(currentIndex);
  startAutoSwitch();
});

// Initialize the Partners Swiper
const partnersSwiper = new Swiper(".partners-swiper", {
  slidesPerView: 1,
  spaceBetween: 10,
  grabCursor: true,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    480: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 5,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 8,
      spaceBetween: 25,
    },
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// Initialize the Testimonials Swiper
const testimonialsSwiper = new Swiper(".testimonials-swiper", {
  slidesPerView: 1,
  spaceBetween: 10,
  grabCursor: true,
  loop: false,
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    480: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3.2,
      spaceBetween: 20,
    },
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
  },
  on: {
    init: function () {
      // Calculating values ​​when initializing the slider
      updateSliderCounter(this);
    },
    slideChange: function () {
      // Update values ​​when the slide changes
      updateSliderCounter(this);
    },
  },
});

function updateSliderCounter(swiper) {
  const currentSlide = swiper.realIndex + 1;
  const totalSlides = swiper.slides.length;
  document.querySelector(".current-slide").textContent = currentSlide;
  document.querySelector(".total-slides").textContent = totalSlides;
}
