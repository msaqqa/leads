// Navigation
// Add Shadow for Navbar after Scrolling Hero Height
document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const hero = document.getElementById("hero");

  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;
    const heroHeight = hero
      ? hero.offsetHeight - navbar.offsetHeight
      : navbar.offsetHeight;

    if (scrollPosition > heroHeight) {
      navbar.classList.add("shadow-lg");
    } else {
      navbar.classList.remove("shadow-lg");
    }
  });
});

// Hero
// Store the Initialized Sliders Hero Section
const swiperInstances = {};
// Initialize Swiper and Store it if it is not Initialized
const initializeSwiper = (selector, swiperName) => {
  if (!swiperInstances[swiperName]) {
    swiperInstances[swiperName] = new Swiper(selector, {
      slidesPerView: 1,
      spaceBetween: 10,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: `.swiper-pagination`,
        clickable: true,
      },
    });
  } else {
    swiperInstances[swiperName].slideToLoop(0, 0); // Start the Show from the First Slide.
    swiperInstances[swiperName].autoplay.start(); // Play Slider if it is Stopped
  }
};
// Stop the Swiper Slider
const stopSwiper = (swiperName) => {
  if (swiperInstances[swiperName]) {
    swiperInstances[swiperName].autoplay.stop();
  }
};
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
      const swiperElement = targetContent.querySelector(
        `.swiper[data-swiper-name]`
      );
      const swiperName = swiperElement
        ? swiperElement.getAttribute("data-swiper-name")
        : null;

      if (i === index) {
        tab.setAttribute("data-twe-nav-active", "");
        tab.setAttribute("aria-selected", "true");
        targetContent.setAttribute("data-twe-tab-active", "");
        targetContent.classList.remove("hidden", "opacity-0");
        targetContent.classList.add("opacity-100");
        if (swiperElement && swiperName) {
          initializeSwiper(swiperElement, swiperName);
        }
      } else {
        tab.removeAttribute("data-twe-nav-active");
        tab.setAttribute("aria-selected", "false");
        targetContent.removeAttribute("data-twe-tab-active");
        targetContent.classList.add("hidden", "opacity-0");
        targetContent.classList.remove("opacity-100");
        if (swiperName) {
          stopSwiper(swiperName);
        }
      }
    });
  };

  const startAutoSwitch = () => {
    intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % tabs.length;
      switchTab(currentIndex);
    }, 30000); // 30 seconds
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      clearInterval(intervalId); // Stop Auto Switching
      currentIndex = index;
      switchTab(currentIndex);
      startAutoSwitch(); // Restart Auto Switch
    });
  });

  // Initialize the First Tab when Page Loading
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

// Testimonials
// Function to render the rating
document.addEventListener("DOMContentLoaded", () => {
  // Select all the rating containers
  const ratingContainers = document.querySelectorAll(".ratings");
  if (ratingContainers) {
    ratingContainers.forEach((container) => {
      // Get the `ul` where the stars will be rendered
      const ratingStars = container.querySelector("ul");

      // Get the rating value from the `p` element's data attribute
      const ratingValueElement = container.querySelector(".rating-value");
      const ratingValue = Math.round(
        parseFloat(ratingValueElement.dataset.ratingValue)
      );

      // Clear any existing stars in the `ul`
      ratingStars.innerHTML = "";

      // Generate stars dynamically based on the rating value
      for (let i = 1; i <= 5; i++) {
        const star = document.createElement("li");
        star.innerHTML =
          i <= ratingValue
            ? '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-6 h-6 text-orange-400"><path d="M12 .587l3.668 7.431L23.6 9.75l-5.546 5.41L19.42 24 12 19.807 4.58 24l1.366-8.84L.4 9.75l7.932-1.732L12 .587z" /></svg>'
            : '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6 text-gray-400"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 .587l3.668 7.431L23.6 9.75l-5.546 5.41L19.42 24 12 19.807 4.58 24l1.366-8.84L.4 9.75l7.932-1.732L12 .587z" /></svg>';
        ratingStars.appendChild(star);
      }
    });
  }
});

// Initialize WOW Animated
document.addEventListener("DOMContentLoaded", function () {
  if (WOW) {
    new WOW().init();
  }
});
