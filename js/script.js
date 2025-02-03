const mainAnimation = document.querySelector(".main-animation");
const items = mainAnimation.querySelectorAll(".item");
let timeout;

mainAnimation.addEventListener("mousemove", (e) => {
  if (timeout) {
    window.cancelAnimationFrame(timeout);
  }

  timeout = window.requestAnimationFrame(() => {
    const bounds = mainAnimation.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;

    items.forEach((item) => {
      const itemBounds = item.getBoundingClientRect();
      const itemX = itemBounds.left - bounds.left + itemBounds.width / 2;
      const itemY = itemBounds.top - bounds.top + itemBounds.height / 2;

      const deltaX = x - itemX;
      const deltaY = y - itemY;

      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDistance = 300;
      const factor = Math.max(0, 1 - distance / maxDistance);

      const moveX = deltaX * factor * 0.2;
      const moveY = deltaY * factor * 0.2;

      const currentTransform =
        item.style.transform || item.getAttribute("style")?.transform || "";
      const rotateMatch = currentTransform.match(/rotate\((\d+)deg\)/);
      const currentRotate = rotateMatch
        ? rotateMatch[1]
        : getDefaultRotate(item);

      item.style.transform = `rotate(${currentRotate}deg) translate(${moveX}px, ${moveY}px)`;
    });
  });
});

function getDefaultRotate(item) {
  if (item.classList.contains("react")) return 40;
  if (item.classList.contains("java")) return 15;
  if (item.classList.contains("html")) return 355;
  if (item.classList.contains("css")) return 350;
  if (item.classList.contains("js")) return 350;
  return 0;
}

mainAnimation.addEventListener("mouseleave", () => {
  items.forEach((item) => {
    const currentRotate = getDefaultRotate(item);
    item.style.transform = `rotate(${currentRotate}deg)`;
  });
});

// scroll

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const headerHeight = document.querySelector("header").offsetHeight;
      const startPosition = window.pageYOffset;
      const targetPosition =
        targetSection.getBoundingClientRect().top +
        startPosition -
        headerHeight;
      const distance = targetPosition - startPosition;
      const duration = 1000;
      let start = null;

      function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);

        const easeInOutCubic = (progress) => {
          return progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        };

        window.scrollTo(
          0,
          startPosition + distance * easeInOutCubic(progress) + 150
        );

        if (progress < 1) {
          requestAnimationFrame(animation);
        }
      }

      requestAnimationFrame(animation);
    }
  });
});

document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";

    document.querySelectorAll(".faq-question").forEach((btn) => {
      btn.setAttribute("aria-expanded", "false");
      btn.nextElementSibling.setAttribute("aria-hidden", "true");
    });

    if (!expanded) {
      button.setAttribute("aria-expanded", "true");
      button.nextElementSibling.setAttribute("aria-hidden", "false");
    }
  });
});


$(document).ready(function () {
  $(".testimonials-slider").owlCarousel({
    loop: true,
    margin: 24,
    nav: true,
    dots: true,
    autoplay: false,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    navText: [
      '<i class="fa-solid fa-chevron-left"></i>',
      '<i class="fa-solid fa-chevron-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
        nav: false,
      },
      1028: {
        items: 2,
        nav: false,
      },
      1440: {
        items: 3,
        nav: true,
      },
    },
    onInitialized: function () {
      $(".testimonial-card").addClass("animate__animated animate__fadeIn");
    },
  });
});


document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');
  const body = document.body;

  const overlay = document.createElement('div');
  overlay.classList.add('menu-overlay');
  body.appendChild(overlay);

  function toggleMenu() {
    mobileMenuBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    body.style.overflow = body.style.overflow === 'hidden' ? '' : 'hidden';
  }

  // Обработчики событий
  mobileMenuBtn.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', toggleMenu);

  // Закрытие меню при клике на ссылку
  const menuLinks = navMenu.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu();
    });
  });

  // Закрытие меню при изменении размера окна
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
      toggleMenu();
    }
  });
});