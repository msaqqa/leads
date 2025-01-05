// window.addEventListener("load", function () {
//   const preloader = document.getElementById("preloader");

//   if (preloader) {
//     preloader.style.transition = "opacity 0.5s ease"; // Adjust duration as needed
//     preloader.style.opacity = 0;

//     // Wait for the transition to complete before removing the element
//     setTimeout(() => {
//       preloader.remove();
//     }, 500); // Match this duration with the CSS transition
//   }
// });

const heroSwiper = new Swiper(".hero-swiper", {
  slidesPerView: 1,
  // spaceBetween: 10,
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

// Initialize the Partners Swiper
const partnersSwiper = new Swiper(".partners-swiper", {
  slidesPerView: 1,
  spaceBetween: 10,
  grabCursor: true,
  loop: true,
  autoplay: {
    delay: 3000, // Time between slides (in milliseconds)
    disableOnInteraction: false, // Keeps autoplay running after user interaction
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
    992: {
      slidesPerView: 7,
      spaceBetween: 0,
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
  // autoplay: {
  //   delay: 3000,
  //   disableOnInteraction: false,
  // },
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
      spaceBetween: 30,
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
