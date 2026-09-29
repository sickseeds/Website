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
// ==================== ONLINE/OFFLINE INDICATOR ====================
const onlineDot = document.getElementById("onlineDot");
const onlineText = document.getElementById("onlineText");

function updateOnlineStatus() {
    // Note: this detects the VISITOR's connection, not yours
    const isOnline = navigator.onLine;
    onlineDot.className = "online-dot " + (isOnline ? "online" : "offline");
    onlineText.className = "online-text " + (isOnline ? "online" : "offline");
    onlineText.textContent = isOnline ? "signal found" : "signal lost";
}

window.addEventListener("online", updateOnlineStatus);
window.addEventListener("offline", updateOnlineStatus);
updateOnlineStatus();

// ==================== GLITCHY UPTIME NUMBERS ====================
const glitchChars = "0123456789ABCDEF?#%&@";
const uptimeEl = document.getElementById("uptime-status");

function glitchNumber(length) {
    let result = "";
    for (let i = 0; i < length; i++) {
        result += glitchChars[Math.floor(Math.random() * glitchChars.length)];
    }
    return result;
}

// Rapidly corrupt the numbers
setInterval(() => {
    if (!uptimeEl) return;
    if (Math.random() > 0.4) {
        uptimeEl.textContent = glitchNumber(2) + ":" + glitchNumber(2) + ":" + glitchNumber(2);
    }
}, 120);

// Occasionally show a coherent "fake" timestamp to trick the eye
setInterval(() => {
    if (!uptimeEl) return;
    if (Math.random() > 0.7) {
        const fakeHours = String(Math.floor(Math.random() * 99)).padStart(2, "0");
        const fakeMins = String(Math.floor(Math.random() * 60)).padStart(2, "0");
        const fakeSecs = String(Math.floor(Math.random() * 60)).padStart(2, "0");
        uptimeEl.textContent = fakeHours + ":" + fakeMins + ":" + fakeSecs;
        setTimeout(() => {
            uptimeEl.textContent = glitchNumber(2) + ":" + glitchNumber(2) + ":" + glitchNumber(2);
        }, 400);
    }
}, 5000);
