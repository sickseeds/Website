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
// Fluxer Real-Time Status Badge
const FLUXER_USER_ID = '1472455581679869974';

function connectFluxerGateway() {
    const dot = document.getElementById('fluxer-dot');
    const text = document.getElementById('fluxer-text');
    const activityBox = document.getElementById('fluxer-activity');

    // Parse the token safely from the URL hash after OAuth authorization redirects back
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    const token = urlParams.get('access_token');

    if (!token) {
        console.warn("SYSTEM: NO_TOKEN_FOUND. Run authorization flow or add your token.");
        dot.className = 'corrupted-dot offline';
        text.innerText = 'NEED_AUTH';
        return;
    }

    // Connect directly to the Fluxer live gateway stream
    const socket = new WebSocket('wss://gateway.fluxer.app/v1');

    socket.onopen = () => {
        console.log('GATEWAY: STABLE_SIGNAL');

        // Identify your session to the gateway to start listening to events
        socket.send(JSON.stringify({
            op: 2, // Gateway Identify Code
            d: {
                token: token,
                properties: {
                    os: 'linux',
                    browser: 'kitty'
                }
            }
        }));
    };

    socket.onmessage = (event) => {
        try {
            const payload = JSON.parse(event.data);

            // Handle initial dispatch payload or real-time presence changes
            if (payload.t === 'PRESENCE_UPDATE' && payload.d.user.id === FLUXER_USER_ID) {
                const status = payload.d.status || 'offline';
                const activity = payload.d.activities?.[0]?.name || '';

                // Reset base visual tracking classes
                dot.className = 'corrupted-dot';

                if (['online', 'idle', 'dnd'].includes(status)) {
                    dot.classList.add(status);
                    text.innerText = status === 'dnd' ? 'DO_NOT_DISTURB' : status.toUpperCase();

                    if (activity) {
                        activityBox.innerText = `EXEC: ${activity.toUpperCase()}`;
                        activityBox.style.display = 'block';
                    } else {
                        activityBox.style.display = 'none';
                    }
                } else {
                    dot.classList.add('offline');
                    text.innerText = 'NOT_HERE';
                    activityBox.style.display = 'none';
                }
            }
        } catch (err) {
            console.error('Data stream corrupt:', err);
        }
    };

    socket.onerror = () => {
        dot.className = 'corrupted-dot offline';
        text.innerText = 'SIGNAL_LOST';
        activityBox.style.display = 'none';
    };

    socket.onclose = () => {
        console.warn('GATEWAY: DISCONNECTED. TRYING RECONNECT IN 5S...');
        dot.className = 'corrupted-dot offline';
        text.innerText = 'FEED_LOST';
        activityBox.style.display = 'none';
        setTimeout(connectFluxerGateway, 5000);
    };
}

document.addEventListener('DOMContentLoaded', connectFluxerGateway);
