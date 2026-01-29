// Matrix Rain Effect
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const matrix = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;<>?";
const fontSize = 16;
const columns = canvas.width / fontSize;

const drops = [];
for (let i = 0; i < columns; i++) {
  drops[i] = 1;
}

function drawMatrix() {
  ctx.fillStyle = "rgba(10, 14, 39, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00ff41";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = matrix[Math.floor(Math.random() * matrix.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(drawMatrix, 50);

// Resize canvas on window resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Counter animation for stats
function animateCounter(element) {
  const target = parseFloat(element.getAttribute("data-target"));
  const duration = 2000;
  const increment = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current).toLocaleString();
  }, 16);
}

// Intersection Observer for stats animation
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll(".stat-number[data-target]");
        statNumbers.forEach((num) => animateCounter(num));
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);

const statsSection = document.querySelector(".stats");
if (statsSection) {
  statsObserver.observe(statsSection);
}

// CTA Button click effect
const ctaButton = document.querySelector(".cta-button");
if (ctaButton) {
  ctaButton.addEventListener("click", () => {
    alert(
      "🔒 Güvenlik taraması başlatılıyor...\n\n✓ Sistem analizi\n✓ Güvenlik duvarı kontrolü\n✓ Tehdit taraması\n\nTüm sistemler güvenli!",
    );
  });
}

// Add typing effect to threat monitor (simulate real-time updates)
function updateThreats() {
  const threatItems = document.querySelectorAll(".threat-item");
  threatItems.forEach((item, index) => {
    setTimeout(() => {
      item.style.opacity = "0";
      setTimeout(() => {
        const count = item.querySelector(".threat-count");
        const currentCount = parseInt(count.textContent.replace(/[^0-9]/g, ""));
        const newCount = currentCount + Math.floor(Math.random() * 10);
        count.textContent = newCount.toLocaleString() + " " + count.textContent.split(" ").slice(1).join(" ");
        item.style.opacity = "1";
      }, 200);
    }, index * 300);
  });
}

// Update threats every 10 seconds
setInterval(updateThreats, 10000);

// Terminal cursor blink effect is handled by CSS
console.log("%c🛡️ CyberShield Security System Initialized", "color: #00ff41; font-size: 20px; font-weight: bold;");
console.log("%c✓ All security protocols active", "color: #00ff41;");
console.log("%c✓ Real-time monitoring enabled", "color: #00ff41;");
console.log("%c✓ Firewall status: PROTECTING", "color: #00ff41;");
