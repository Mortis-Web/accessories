// ============= GO TO TOP BUTTON ============
const goTopBtn = document.querySelector(".go-top-btn");

function checkHeight() {
  if (window.scrollY > 200) {
    goTopBtn.style.bottom = "35px";
  } else {
    goTopBtn.style.bottom = "-100%";
  }
}

goTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// ============= STAT COUNTER =============
let nums = document.querySelectorAll(".nums .num");
let section = document.querySelector(".three");
let started = false;

function handleCounterScroll() {
  if (window.scrollY + 200 >= section.offsetTop - 100) {
    if (!started) {
      nums.forEach((num) => startCount(num));
      started = true;
    }
  }
}

function startCount(el) {
  let goal = el.dataset.goal;
  let count = setInterval(() => {
    el.textContent++;
    if (el.textContent == goal) {
      clearInterval(count);
    }
  }, 2000 / goal);
}

// ============= DEBOUNCED SCROLL LISTENER ============
let scrollTimeout;
window.addEventListener("scroll", () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    checkHeight();
    handleCounterScroll();
  }, 50);
});

// ============= 3D CARD EFFECT =============
document.querySelectorAll(".feature-wrapper").forEach((wrapper) => {
  const card = wrapper.querySelector(".feature-card");
  const shine = card.querySelector(".shine");

  wrapper.addEventListener("mousemove", (e) => {
    const { left, top, width, height } = wrapper.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const normalizedX = x / width - 0.5;
    const normalizedY = y / height - 0.5;

    const rotateX = Math.max(Math.min(normalizedY * -35, 35), -35);
    const rotateY = Math.max(Math.min(normalizedX * 35, 35), -35);

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    const percentX = (x / width) * 100;
    const percentY = (y / height) * 100;
    if (shine) {
      shine.style.background = `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(139, 58, 98, 0.5), transparent 10%)`;
      shine.style.opacity = 1;
    }
  });

  wrapper.addEventListener("mouseleave", () => {
    card.style.transform = `rotateX(0deg) rotateY(0deg)`;
    card.style.transition = "transform 0.3s ease";
    if (shine) {
      shine.style.opacity = 0;
    }
    setTimeout(() => {
      card.style.transition = "";
    }, 300);
  });
});

// ============= EMAILJS & FORM =============
document.addEventListener("DOMContentLoaded", function () {
  emailjs.init("ngLjHaSK8D7NvI6kl");

  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = form.elements["name"].value;
      const email = form.elements["email"].value;
      const message = form.elements["message"].value;

      emailjs
        .send("service_e8mkrqf", "template_klpboni", {
          name: name,
          email: email,
          message: message,
        })
        .then(
          function () {
            alert("Message sent!");
            form.reset();
          },
          function (error) {
            alert("FAILED: " + JSON.stringify(error));
          }
        );
    });
  }

  // ============= TYPED.JS =============
  const typedEl = document.querySelector("#typed");
  if (typedEl) {
    new Typed("#typed", {
      strings: ["Necklace", "Bracelet", "Watches", "Rings💍"],
      typeSpeed: 100,
      backSpeed: 140,
      loop: true,
    });
  }

  // ============= SWIPER.JS =============
  const swiper = new Swiper(".mySwiper", {
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    keyboard: {
      enabled: true,
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: true,
    },
    loop: true,
  });
});
