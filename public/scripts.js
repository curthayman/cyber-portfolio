    // Contact Modal Logic
    function openContactModal() {
      document.getElementById('contactModal').style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
    function closeContactModal() {
      document.getElementById('contactModal').style.display = 'none';
      document.body.style.overflow = '';
    }
    // Close modal on ESC or click outside
    window.addEventListener('keydown', function(e) {
      if (e.key === "Escape") closeContactModal();
    });
    document.getElementById('contactModal').addEventListener('click', function(e) {
      if (e.target === this) closeContactModal();
    });

    // Easter egg fortunes
    const fortunes = [
      "Hint: Sometimes the best secrets are hidden in plain sight (or in the source code)...",
      "The quieter you become, the more you are able to hear.",
      "Hack the planet!",
      "Try 'sudo make me a sandwich' 😉",
      "Security is a process, not a product.",
      "You are root... in your own life.",
      "There is no patch for human stupidity.",
      "The best way to predict the future is to invent it."
    ];

    // Matrix animation
    function matrixEffect() {
      let interval;
      const chars = "abcdefghijklmnopqrstuvwxyz0123456789#$%&@";
      let running = true;
      printLine("Matrix mode activated. Press ENTER to exit.");
      function randomLine() {
        let line = "";
        for (let i = 0; i < 60; i++) {
          line += chars[Math.floor(Math.random() * chars.length)];
        }
        printLine(`<span style="color:#00ff00;">${line}</span>`, true);
      }
      interval = setInterval(randomLine, 80);
      cliInput.disabled = false;
      cliInput.value = "";
      cliInput.focus();
      cliForm.onsubmit = function(e) {
        e.preventDefault();
        if (running) {
          clearInterval(interval);
          printLine("Matrix mode exited.");
          running = false;
          cliForm.onsubmit = cliSubmitHandler;
        }
        cliInput.value = "";
      };
    }

    // Uptime widget
    let pageLoadTime = Date.now();
    function getUptime() {
      const now = Date.now();
      let diff = Math.floor((now - pageLoadTime) / 1000);
      const hours = Math.floor(diff / 3600);
      diff %= 3600;
      const minutes = Math.floor(diff / 60);
      const seconds = diff % 60;
      return `${hours}h ${minutes}m ${seconds}s`;
    }

    // Real-Time Clock for CLI Statusbar
    function updateClock() {
      const now = new Date();
      const timeStr = now.toLocaleTimeString();
      const uptime = getUptime();
      document.getElementById('cliClock').textContent = `🕒 ${timeStr} | Uptime: ${uptime}`;
    }
    setInterval(updateClock, 1000);

    // Fake MOTD Banner
    function setMotd() {
      const now = new Date();
      // Fake last login: yesterday at a random time, from a random city
      const cities = ["Baltimore, MD", "New York, NY", "London, UK", "San Francisco, CA", "Berlin, DE", "Tokyo, JP"];
      const city = cities[Math.floor(Math.random() * cities.length)];
      const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      yesterday.setHours(Math.floor(Math.random() * 24));
      yesterday.setMinutes(Math.floor(Math.random() * 60));
      yesterday.setSeconds(Math.floor(Math.random() * 60));
      const lastLogin = yesterday.toLocaleString();
      document.getElementById('motdText').innerHTML =
        `<span style="color:#00ff99;">Welcome, Visitor. Last login: ${lastLogin} from ${city}</span>`;
      updateClock();
    }

// Typewriter effect for favorite commands only
function startTyping() {
  const commands = [
    "top -l 1 | head -n 10 | grep PhysMem | sed 's/, /\\n /g'",
    "sudo dscacheutil -flushcache;sudo killall -HUP mDNSResponder;say cache flushed",
    "sudo nmap -sV --script=vuln targetip",
    "curl cheat.sh/nmap",
    "openssl rand -base64 34" // <-- Add this line
  ];
  typeLine(commands[0], 'line1', () => {
    typeLine(commands[1], 'line2', () => {
      typeLine(commands[2], 'line3', () => {
        typeLine(commands[3], 'line4', () => {
          typeLine(commands[4], 'line5'); // <-- Add this line
        });
      });
    });
  });
}

// Helper: typewriter effect for a single line
function typeLine(text, elementId, callback) {
  const el = document.getElementById(elementId);
  el.textContent = "";
  let i = 0;
  function type() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(type, 18); // Adjust speed as desired
    } else if (callback) {
      callback();
    }
  }
  type();
}

// Enhanced copy function: changes button text and color on click
function copyTypedLine(lineId) {
  const text = document.getElementById(lineId).textContent;
  navigator.clipboard.writeText(text);

  // Find the button that was clicked (the one next to this line)
  const parent = document.getElementById(lineId).parentElement;
  const button = parent.querySelector('.copy-btn');
  const originalText = button.textContent;
  const originalBg = button.style.backgroundColor;
  const originalColor = button.style.color;

  // Change to "Copied" and highlight color
  button.textContent = "Copied";
  button.style.backgroundColor = "#00ff99"; // Neon green
  button.style.color = "#181f1f";           // Dark text for contrast
  button.disabled = true;

  setTimeout(() => {
    button.textContent = originalText;
    button.style.backgroundColor = originalBg;
    button.style.color = originalColor;
    button.disabled = false;
  }, 1200); // 1.2 seconds, adjust as you like
}

    function typeLine(text, elementId, callback) {
      let i = 0;
      const el = document.getElementById(elementId);
      el.textContent = '';
      const interval = setInterval(() => {
        el.textContent += text[i];
        i++;
        if (i === text.length) {
          clearInterval(interval);
          if (callback) setTimeout(callback, 300);
        }
      }, 40);
    }

  function displaySystemInfo() {
  document.getElementById('ua').textContent = navigator.userAgent;
  document.getElementById('platform').textContent = navigator.platform;
  // Fetch and display the visitor's IP address (no storage, just display)
fetch('https://api.ipify.org?format=json')
  .then(res => res.json())
  .then(data => {
    document.getElementById('ip').textContent = data.ip;
  })
  .catch(() => {
    document.getElementById('ip').textContent = "Unavailable";
  });
}
// Fetch and display the visitor's IP address and location (no storage, just display)
fetch('https://api.ipify.org?format=json')
  .then(res => res.json())
  .then(data => {
    document.getElementById('ip').textContent = data.ip;
    fetch('https://ipapi.co/' + data.ip + '/json/')
      .then(res => res.json())
      .then(loc => {
        function countryFlagEmoji(cc) {
          if (!cc) return '';
          return cc
            .toUpperCase()
            .replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt()));
        }
        let locationStr = '';
        if (loc.city) locationStr += loc.city + ', ';
        if (loc.region) locationStr += loc.region + ', ';
        if (loc.country_name) locationStr += loc.country_name + ' ';
        if (loc.country) locationStr += countryFlagEmoji(loc.country);
        if (loc.org) locationStr += ' (' + loc.org + ')';
        document.getElementById('ip-location').textContent = locationStr || "Unavailable";

        // Show interactive Leaflet map if coordinates are available
        const mapDiv = document.getElementById('ip-map');
        mapDiv.innerHTML = '';
        if (loc.latitude && loc.longitude) {
          mapDiv.style.display = 'block';
          // Remove any previous map instance
          if (window._leafletMap) {
            window._leafletMap.remove();
            window._leafletMap = null;
          }
          // Initialize Leaflet map with dark tiles
          window._leafletMap = L.map('ip-map').setView([loc.latitude, loc.longitude], 10);
          L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://carto.com/attributions">CARTO</a> | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            subdomains: 'abcd',
            maxZoom: 19
          }).addTo(window._leafletMap);

          // Neon green marker icon
          const neonIcon = L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
            shadowSize: [41, 41]
          });

          L.marker([loc.latitude, loc.longitude], { icon: neonIcon }).addTo(window._leafletMap)
            .bindPopup(locationStr).openPopup();
        } else {
          mapDiv.style.display = 'none';
        }
      })
      .catch(() => {
        document.getElementById('ip-location').textContent = "Unavailable";
        document.getElementById('ip-map').style.display = 'none';
      });
  })
  .catch(() => {
    document.getElementById('ip').textContent = "Unavailable";
    document.getElementById('ip-location').textContent = "Unavailable";
    document.getElementById('ip-map').style.display = 'none';
  });

    // CLI Terminal Logic
    const cliOutput = document.getElementById('cliOutput');
    const cliForm = document.getElementById('cliForm');
    const cliInput = document.getElementById('cliInput');

    const commands = {
      help: "Available commands: help, about, clear, certs, social, exit, uptime, fortune, matrix, sudo make me a sandwich, weather, nmap, hint, submit <flag>",
      about: "Curt Hayman, CEH | Penetration Tester. 15+ years WordPress 7+ years CyberSecurity, drone pilot, sneakerhead.",
      certs: "CEH, Digital Forensics, Bug Bounty, Master Ethical Hacker, Master Wifi Hacking, Wireshark.",
      social: "Droners: <a href='https://droners.com/curtthecoder' target='_blank'>Profile</a> | Facebook: <a href='https://www.facebook.com/groups/undergroundhiphoponly' target='_blank'>UGHHO</a> | Facebook: <a href='https://www.facebook.com/imcurthayman/' target='_blank'>Personal</a>",
      exit: "Session ended. Refresh to restart.",
      weather: "Cyber Weather Report: Packet storms expected. 0-day showers in the afternoon. Phishing attempts: 42%. Stay patched and carry an umbrella! ☔️",
      hint: "Hint: Sometimes the best secrets are hidden in plain sight (or in the source code)..."
    };

    function printLine(text, isHtml) {
      const div = document.createElement('div');
      if (isHtml) {
        div.innerHTML = text;
      } else {
        div.textContent = text;
      }
      cliOutput.appendChild(div);
      cliOutput.scrollTop = cliOutput.scrollHeight;
    }

    function cliSubmitHandler(e) {
  e.preventDefault();
  const rawInput = cliInput.value.trim();
  const cmd = rawInput.toLowerCase();

  printLine(`<span style="color:#fff;">curt@portfolio:~$</span> ${rawInput}`, true);

  // --- Easter Egg Commands ---
if (cmd === ":flag") {
  printLine("FLAG: curt{h4ck3d-th3-p0rtf0li0}");
  foundEasterEggs.flag = true;
  checkAchievement();
}
else if (cmd === ":matrix") {
  printLine("Activating Matrix mode...");
  startMatrixRain();
  foundEasterEggs.matrix = true;
  checkAchievement();
}
  else if (cmd === ":sudo") {
    printLine("Permission denied: You are not root. 😉");
  }
  // --- End Easter Egg Commands ---

  else if (cmd === "help" || cmd === "help") printLine(commands.help);
  else if (cmd === "about") printLine(commands.about);
  else if (cmd === "certs") printLine(commands.certs);
  else if (cmd === "social") printLine(commands.social, true);
  else if (cmd === "clear") cliOutput.innerHTML = "";
  else if (cmd === "exit") { printLine(commands.exit); cliInput.disabled = true; }
  else if (cmd === "uptime") printLine("Uptime: " + getUptime());
  else if (cmd === "fortune") printLine(fortunes[Math.floor(Math.random() * fortunes.length)]);
  else if (cmd === "sudo make me a sandwich") printLine("Okay. 🥪 (You're the boss!)");
  else if (cmd === "matrix") matrixEffect();
  else if (cmd === "hint") printLine(commands.hint);
  else if (cmd === "weather") printLine(commands.weather);
  else if (cmd.startsWith("nmap")) {
    printLine("Starting Nmap 7.94 ( https://nmap.org ) at " + new Date().toLocaleString());
    setTimeout(() => {
      printLine("Nmap scan report for localhost (127.0.0.1)");
      printLine("Host is up (0.00012s latency).");
      printLine("Not shown: 997 closed ports");
      printLine("PORT     STATE SERVICE");
      printLine("22/tcp   open  ssh");
      printLine("80/tcp   open  http");
      printLine("443/tcp  open  https");
      printLine("MAC Address: 00:0c:29:ab:cd:ef (VMware)");
      printLine("Nmap done: 1 IP address (1 host up) scanned in 0.12 seconds");
    }, 600);
  }
  else if (cmd.startsWith("submit ")) {
    // Accept the flag in any case (case-insinsensitive)
    const submittedFlag = rawInput.slice(7).trim();
    if (submittedFlag.toLowerCase() === "curt{h4ck3d-th3-p0rtf0li0}") {
      printLine("🎉 Congratulations! You found the flag and completed the mini CTF! 🏴‍☠️");
    } else {
      printLine("❌ Incorrect flag. Try again!");
    }
  }
  else if (cmd) printLine("Command not found. Type help for options.");

  cliInput.value = "";
}

    cliForm.onsubmit = cliSubmitHandler;

    printLine("Welcome to curt@terminal");
    printLine("Type help for commands.");

    // Fetch recent GitHub projects
    function fetchGitHubProjects() {
      const username = "curthayman";
      const projectsList = document.getElementById('githubProjects');
      fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`)
        .then(response => response.json())
        .then(repos => {
          projectsList.innerHTML = "";
          repos.slice(0, 5).forEach(repo => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>
              <span class="desc">${repo.description ? repo.description : ''}</span>`;
            projectsList.appendChild(li);
          });
          if (repos.length === 0) {
            projectsList.innerHTML = "<li>No public projects found.</li>";
          }
        })
        .catch(() => {
          projectsList.innerHTML = "<li>Could not load projects from GitHub.</li>";
        });
    }

    // Modal for cert images
    function expandImage(src) {
      const modal = document.getElementById('certModal');
      const modalImg = document.getElementById('modalImage');
      modal.style.display = "block";
      modalImg.src = src;
    }
    function closeModal() {
      document.getElementById('certModal').style.display = "none";
    }

    function copyText(text) {
      navigator.clipboard.writeText(text).then(() => {
        alert("✅ Command copied to clipboard!");
      });
    }

    function scrollCerts(amount) {
      const container = document.getElementById('certScroll');
      container.scrollLeft += amount;
    }

    function animateStats() {
      document.querySelectorAll('.stat-number').forEach(stat => {
        const target = +stat.getAttribute('data-target');
        let count = 0;
        const increment = Math.ceil(target / 60);
        function update() {
          count += increment;
          if (count > target) count = target;
          stat.textContent = count;
          if (count < target) {
            requestAnimationFrame(update);
          }
        }
        update();
      });
    }
const securityEvents = [
  "IDS initialized. Monitoring network traffic...",
  "New SSH connection detected from 192.168.1.42",
  "Blocked suspicious login attempt from 203.0.113.77",
  "Firewall: Port scan detected and mitigated.",
  "Malware signature update completed.",
  "User 'admin' logged in from 10.0.0.5",
  "Phishing email quarantined.",
  "Brute force attack detected on port 22.",
  "Vulnerability scan completed: 0 critical, 2 medium, 5 low.",
  "Suspicious outbound traffic blocked.",
  "SIEM: No critical alerts in the last hour.",
  "VPN connection established from 198.51.100.23",
  "Antivirus scan completed: No threats found.",
  "New device connected: RaspberryPi-3B+",
  "DDoS attempt detected and rate-limited.",
  "User 'curt' escalated privileges to root.",
  "Zero-day exploit attempt blocked.",
  "Security policy updated successfully.",
  "Log file rotated: /var/log/auth.log",
  "All systems nominal."
];

function addSecurityFeedLine() {
  const feed = document.getElementById('securityFeed');
  if (!feed) return;
  const now = new Date();
  const time = now.toTimeString().split(' ')[0];
  const event = securityEvents[Math.floor(Math.random() * securityEvents.length)];
  const div = document.createElement('div');
  div.className = 'security-feed-line';
  div.textContent = `[${time}] ${event}`;
  feed.appendChild(div);
  feed.scrollTop = feed.scrollHeight;
  // Limit to last 20 lines
  while (feed.children.length > 20) {
    feed.removeChild(feed.firstChild);
  }
}
    // Initialize everything on load
    window.onload = () => {
      window.scrollTo(0, 0);
      setMotd();
      startTyping();
      displaySystemInfo();
      fetchGitHubProjects();
      animateStats();
      setInterval(addSecurityFeedLine, 2200);
      // cliInput.focus(); // intentionally not focusing to prevent scroll
    };

  const bootMessages = [
    '<span class="boot-green">[BOOT]</span> Initializing system...',
    '<span class="boot-green">[OK]</span> Loading modules...',
    '<span class="boot-green">[OK]</span> Establishing secure connection...',
    '<span class="boot-green">[OK]</span> Authenticating user...',
    '<span class="boot-green">[OK]</span> Mounting encrypted volumes...',
    '<span class="boot-green">[OK]</span> Checking for rootkits...',
    '<span class="boot-green">[OK]</span> Starting IDS/IPS...',
    '<span class="boot-green">[OK]</span> Updating threat intelligence feeds...',
    '<span class="boot-green">[OK]</span> Verifying digital signatures...',
    '<span class="boot-green">[OK]</span> Loading hacking tools...',
    '<span class="boot-green">[OK]</span> Welcome, Visitor. System ready.'
  ];


 // Glitch Title Effect (cycles through all titles, never resets)
(function() {
  const titles = [
    "Cyber Security Analyst",
    "WordPress Administrator",
    "Ethical Hacker",
    "Penetration Tester",
    "B-Boy",
    "Website Developer"
  ];
  const glitchSpan = document.getElementById('glitchTitle');
  let lastIdx = titles.indexOf(glitchSpan.textContent.trim());
  function glitchTitle() {
    let idx;
    do {
      idx = Math.floor(Math.random() * titles.length);
    } while (idx === lastIdx);
    lastIdx = idx;
    glitchSpan.textContent = titles[idx];
    glitchSpan.classList.add('glitching');
    setTimeout(() => {
      glitchSpan.classList.remove('glitching');
    }, 1200);
  }
  setInterval(glitchTitle, 3400); // Glitch every 3.4 seconds
})();
   // Back to Top Button
(function() {
  const btn = document.getElementById('backToTopBtn');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 200) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  });
  btn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
   (function() {
  const privacy = document.getElementById('privacyGlitch');
  function glitchPrivacy() {
    privacy.classList.add('glitching');
    setTimeout(() => {
      privacy.classList.remove('glitching');
    }, 800);
  }
  setInterval(glitchPrivacy, 3200); // Glitch every 3.2 seconds
})();

// Clean ASCII art banner
const asciiArt = `
###     #####                   #     #               ###
 #     #     # ###### ######     #   #   ####  #    # ###
 #     #       #      #           # #   #    # #    # ###
 #      #####  #####  #####        #    #    # #    #  #
 #           # #      #            #    #    # #    #
 #     #     # #      #            #    #    # #    # ###
###     #####  ###### ######       #     ####   ####  ###
`;

// Tech stack badges
const techs = [
  { name: "HTML5", style: "background:#e44d26; color:#fff; padding:2px 8px; border-radius:4px; font-weight:bold;" },
  { name: "CSS3", style: "background:#2965f1; color:#fff; padding:2px 8px; border-radius:4px; font-weight:bold;" },
  { name: "JavaScript", style: "background:#f7df1e; color:#222; padding:2px 8px; border-radius:4px; font-weight:bold;" },
  { name: "Fira Code Font", style: "background:#181f1f; color:#00ff99; padding:2px 8px; border-radius:4px; font-weight:bold;" }
];

// Print ASCII art with one style
console.log("%c" + asciiArt, "color:#00ff99; font-family:monospace; font-size:1.1em; font-weight:bold;");

// Animated typewriter for tech stack
setTimeout(() => {
  console.log("%c👨‍💻 Built with:", "color:#00ff99; font-size:1.3em; font-weight:bold;");
  techs.forEach((tech, i) => {
    setTimeout(() => {
      console.log("%c" + tech.name, tech.style);
    }, 400 * (i + 1));
  });
  setTimeout(() => {
    console.log("%cLike what you see? Let's connect! github.com/curthayman", "color:#00ff99; font-size:1.1em; font-style:italic;");
  }, 400 * (techs.length + 1));
}, 600);
  function startMatrixRain() {
  const canvas = document.getElementById('matrix-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.display = 'block';

  const letters = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const fontSize = 18;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(1);

  let animationFrame;
  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00ff99";
    ctx.font = fontSize + "px monospace";
    for (let i = 0; i < drops.length; i++) {
      const text = letters[Math.floor(Math.random() * letters.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
    animationFrame = requestAnimationFrame(draw);
  }
  draw();

  // Stop after 5 seconds
  setTimeout(() => {
    cancelAnimationFrame(animationFrame);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.style.display = 'none';
  }, 5000);
}
window.getFlag = function() {
  console.log("%c🏴 FLAG: curt{c0ns0le-m4st3r}", "color:#00ff99; font-size:1.2em; font-weight:bold;");
  foundEasterEggs.consoleFlag = true;
  checkAchievement();
};
// Easter egg tracker and achievement logic
const foundEasterEggs = {
  flag: false,
  matrix: false,
  consoleFlag: false
};

function checkAchievement() {
  if (foundEasterEggs.flag && foundEasterEggs.matrix && foundEasterEggs.consoleFlag) {
    showAchievementBadge();
  }
}
function showAchievementBadge() {
  if (document.getElementById('achievement-badge')) return;
  const badge = document.createElement('div');
  badge.id = 'achievement-badge';
  badge.textContent = "🎉 Hacker Achievement Unlocked!";
  badge.style.position = 'fixed';
  badge.style.top = '30px';
  badge.style.right = '30px';
  badge.style.background = '#181f1f';
  badge.style.color = '#00ff99';
  badge.style.padding = '16px 28px';
  badge.style.borderRadius = '12px';
  badge.style.fontSize = '1.2em';
  badge.style.fontWeight = 'bold';
  badge.style.boxShadow = '0 4px 24px #00ff9955';
  badge.style.zIndex = 99999;
  document.body.appendChild(badge);
  setTimeout(() => {
    badge.remove();
  }, 6000);
}
  window.addEventListener('DOMContentLoaded', function() {
  const loader = document.getElementById('matrixLoader');
  const loadingText = document.getElementById('matrixLoadingText');
  const loadingString = "loading...";
  let i = 0;

  function typeMatrix() {
    if (i <= loadingString.length) {
      loadingText.innerHTML = `<span style="color:#00ff99;">${loadingString.slice(0, i)}</span>`;
      i++;
      setTimeout(typeMatrix, 110 + Math.random() * 60);
    } else {
      setTimeout(() => {
        loader.classList.add('hide');
        setTimeout(() => loader.style.display = 'none', 700);
      }, 600);
    }
  }
  typeMatrix();
});
