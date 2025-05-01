// =============NAV BUTTON===========

const goTopBtn = document.querySelector(".go-top-btn");

window.addEventListener("scroll", checkHeight);

function checkHeight() {
    if (window.scrollY > 200) {
    goTopBtn.style.bottom= "35px"
  } 
    else {
    goTopBtn.style.bottom= "-100%"
  }
}

goTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// ==================STATIS COUNTER===================
let nums = document.querySelectorAll(".nums .num");
let section = document.querySelector(".three");
let started = false;

window.onscroll = function () {
  if (window.scrollY + 200 >= section.offsetTop - 100) {
    if (!started) {
      nums.forEach((num) => startCount(num));
    }
    started = true;
  }
};

function startCount(el) {
  let goal = el.dataset.goal;
  let count = setInterval(() => {
    el.textContent++;
    if (el.textContent == goal) {
      clearInterval(count);
    }
  }, 2000 / goal);
}

// 3d effect ======================================

document.querySelectorAll('.feature-card').forEach(card => {
        const shine = card.querySelector('.shine');

        card.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = card.getBoundingClientRect();
            const x = e.clientX - left; // X position relative to card
            const y = e.clientY - top;  // Y position relative to card

            // Normalize mouse position to -0.5 to +0.5
            const normalizedX = (x / width) - 0.5; 
            const normalizedY = (y / height) - 0.5;

            // Apply rotation based on mouse position with a clamp of -35deg to 35deg
            const rotateX = Math.max(Math.min(normalizedY * -35, 35), -35); // Vertical rotation
            const rotateY = Math.max(Math.min(normalizedX * 35, 35), -35); // Horizontal rotation

            // Apply the calculated rotation to the card
            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

            // Create shine effect at mouse position
            const percentX = (x / width) * 100; // X position percentage
            const percentY = (y / height) * 100; // Y position percentage
            if (shine) {
                shine.style.background = `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(139, 58, 98, 0.5), transparent 10%)`;
                shine.style.opacity = 1; // Show the shine effect
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `rotateX(0deg) rotateY(0deg)`; // Reset rotation
            card.style.transition = 'transform 0.3s ease'; // Smooth transition on leave
            if (shine) {
                shine.style.opacity = 0; // Hide the shine effect
            }
            setTimeout(() => {
                card.style.transition = ''; // Remove the transition after it's done to make hover instant
            }, 300);
        });
    });

// ====================================================



    (function() {
    // Initialize EmailJS
    emailjs.init("ngLjHaSK8D7NvI6kl");
  })();

  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = form.elements["name"].value;
      const email = form.elements["email"].value;
      const message = form.elements["message"].value;

      emailjs.send("service_e8mkrqf", "template_klpboni", {
        name: name,
        email: email,
        message: message
      }).then(function (response) {
        alert("Message sent!");
        form.reset();
      }, function (error) {
        alert("FAILED: " + JSON.stringify(error));
      });
    });
  });
