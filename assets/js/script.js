'use strict';

/* navbar toggle */

const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navbar = document.querySelector("[data-navbar]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const navElemArr = [navOpenBtn, navCloseBtn, overlay];

const navToggleEvent = (elem) => {
   for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener("click", () => {
         navbar.classList.toggle("active");
         overlay.classList.toggle("active");
      })
   }
}

navToggleEvent(navElemArr);
navToggleEvent(navLinks);

/**
 * header sticky & go to top
 */

const header = document.querySelector("[data-header]");
const goToBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", () => {
   if (window.scrollY >= 160) {
      header.classList.add("active");
      goToBtn.classList.add("active")
   } else {
      header.classList.remove("active");
      goToBtn.classList.remove("active")
   }
});

goToBtn.addEventListener('click', (e) => {
   e.preventDefault();
   // const headerPosition = header.getBoundingClientRect();
   smoothScrollTo(0, 1350);
});

// Hàm cuộn mượt
function smoothScrollTo(targetY, duration) {
   const startY = window.scrollY; // Vị trí hiện tại
   const distance = targetY - startY; // Khoảng cách cần cuộn
   const startTime = performance.now(); // Thời gian bắt đầu

   function scrollStep(currentTime) {
      const elapsed = currentTime - startTime; // Thời gian đã trôi qua
      const progress = Math.min(elapsed / duration, 1); // Tính tỷ lệ cuộn (0 đến 1)
      const ease = easeInOutCubic(progress); // Tính toán hàm easing
      window.scrollTo(0, startY + distance * ease); // Cuộn đến vị trí mới

      if (elapsed < duration) {
         requestAnimationFrame(scrollStep); // Gọi hàm tiếp theo
      }
   }

   requestAnimationFrame(scrollStep); // Bắt đầu quá trình cuộn
}

// Hàm easing
function easeInOutCubic(t) {
   return t < 0.5 ?
      4 * t * t * t :
      1 - Math.pow(-2 * t + 2, 3) / 2;
}