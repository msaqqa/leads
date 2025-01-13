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
    }, 30000); // 30 ثانية
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      clearInterval(intervalId); // إيقاف التبديل التلقائي
      currentIndex = index;
      switchTab(currentIndex);
      startAutoSwitch(); // إعادة تشغيل التبديل التلقائي
    });
  });

  // تهيئة أول تبويب عند التحميل
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
