// Particle system
const symbols = ["+", "x", "*", "/", "=", "!", "?", "@", "#"];
const particleContainer = document.getElementById("particles");

for (let i = 0; i < 30; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 6 + "s";
    particle.style.fontSize = (Math.random() * 10 + 10) + "px";
    particleContainer.appendChild(particle);
}

// Clock in status bar
function updateClock() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString("ja-JP");
    document.getElementById("clock").textContent = timeStr;
}
setInterval(updateClock, 1000);
updateClock();

// Random screen glitches
setInterval(() => {
    if (Math.random() > 0.95) {
        document.body.style.filter = "brightness(90%)";
        setTimeout(() => {
            document.body.style.filter = "";
        }, 100);
    }
}, 2000);
