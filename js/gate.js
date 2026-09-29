// Particle system
const symbols = ["+", "x", "*", "/", "=", "!", "?", "@", "#"];
const particleContainer = document.getElementById("particles");

for (let i = 0; i < 25; i++) {
    const particle = document.createElement("span");
    particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 6 + "s";
    particle.style.fontSize = (Math.random() * 10 + 10) + "px";
    particleContainer.appendChild(particle);
}

// Optional: Random glitch effect
setInterval(() => {
    if (Math.random() > 0.97) {
        document.body.style.filter = "contrast(120%)";
        setTimeout(() => {
            document.body.style.filter = "";
        }, 80);
    }
}, 1500);
