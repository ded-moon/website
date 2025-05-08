// Valid internal commands
const commands = {
    about: "/resources/data/pages/about.html",
    about_me: "/resources/data/pages/about.html",
    projects: "load-projects",
    projects_list: "load-projects",
    posts: "load-posts",
    contact: "/resources/data/pages/contact.html",
    social: "/resources/data/pages/contact.html",
    other: "./other",
    archive: "/resources/archived_resources/",
    clear: "clear",
    reload: "reload",
    restart: "stop",
    reset: "stop",
    shutdown: "stop",
    stop: "stop",
    help: "help",
    full_help: "full_help",
    root: "root",
    sudo: "sudo",
    git: "git",
    code: "git",
    github: "git",
    git_hub: "git",
    source: "git",
    home: "home",
    ls: "ls",
    dir: "ls",
    ded_moon: "ded",
    ded: "ded",
    dedmoon: "ded",
    moon: "ded",
    you: "ded",
    yes: "nuh-uh",
    whoami: "whoami",
    me: "whoami",
    ip: "ip",
    not_found: "/404.html",
    scream: "shout",
    shout: "shout",
    stare: "stare",
    void: "no_response",
    the_void: "no_response",
    blink: "blink",
    school: "/resources/school_websites",
    uname: "uname",
    user_agent: "uname",
    weather: "weather",
    time: "time",
    now: "time"
};

const helpList = [
    "about_me",
    "projects_list",
    "posts",
    "contact",
    "other",
    "archive",
    "reload",
    "help",
];

function getWeatherDescription(code) {
    const weatherCodes = {
        0: "Clear sky",
        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Overcast",
        45: "Fog",
        48: "Depositing rime fog",
        51: "Light drizzle",
        53: "Moderate drizzle",
        55: "Dense drizzle",
        61: "Slight rain",
        63: "Moderate rain",
        65: "Heavy rain",
        71: "Slight snow fall",
        73: "Moderate snow fall",
        75: "Heavy snow fall",
        95: "Thunderstorm",
        99: "Thunderstorm with hail"
        // Add more codes as needed
    };
    return weatherCodes[code] || "Unknown weather condition";
}



const log = document.getElementById("terminalLog");
const input = document.getElementById("command");

function escapeHTML(str) {
    return str.replace(/[&<>"']/g, tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    }[tag]));
}

function appendTextLine(text) {
    const line = document.createElement("div");
    line.textContent = text;
    log.appendChild(line);
    log.scrollTop = log.scrollHeight;
}

function appendHTMLLine(html) {
    const line = document.createElement("div");
    line.innerHTML = html;
    log.appendChild(line);
    log.scrollTop = log.scrollHeight;
}

function handleCommand(e) {
    e.preventDefault();
    const cmd = input.value.trim().toLowerCase();
    if (!cmd) return; // Ignore empty input

    appendTextLine(`> ${cmd}`);
    if (commands[cmd]) {
        const action = commands[cmd];
        if (action === "clear") {
            log.innerHTML = "";
        } else if (action === "help") {
            appendTextLine("Here is a list of commands you can use. Type one or click below:");

            helpList.forEach(cmd => {
                const action = commands[cmd];
                const el = document.createElement("div");
                el.innerHTML = `- <span class="cli-action-link" style="cursor: pointer; color: turquoise;">${escapeHTML(cmd)}</span>`;
                el.querySelector("span").addEventListener("click", () => {
                    input.value = cmd;
                    handleCommand({ preventDefault: () => {} });
                });
                log.appendChild(el);
            });

            log.scrollTop = log.scrollHeight;
        } else if (action === "full_help") {
            appendTextLine("All available commands:");

            Object.keys(commands).forEach(cmd => {
                const action = commands[cmd];
                const el = document.createElement("div");
                el.innerHTML = `- <span class="cli-action-link" style="cursor: pointer; color: turquoise;">${escapeHTML(cmd)}</span>`;
                el.querySelector("span").addEventListener("click", () => {
                    input.value = cmd;
                    handleCommand({ preventDefault: () => {} });
                });
                log.appendChild(el);
            });
        } else if (action === "home") {
            const now = new Date();
            appendTextLine("Welcome to my little website");
            appendTextLine("Current time: " + now.toLocaleString());
            appendTextLine("\nThis site is a collection of my personal work, experiments, and thoughts about tech, robotics etc.\n");

            helpList.forEach(cmd => {
                const action = commands[cmd];
                const el = document.createElement("div");
                el.innerHTML = `- <span class="cli-action-link" style="cursor: pointer; color: turquoise;">${escapeHTML(cmd)}</span>`;
                el.querySelector("span").addEventListener("click", () => {
                    input.value = cmd;
                    handleCommand({ preventDefault: () => {} });
                });
                log.appendChild(el);    
            });
        } else if (action === "load-posts") {
            fetch("/resources/data/posts.json")
                .then(res => res.json())
                .then(data => {
                    appendTextLine("\nPosts:");
                    data.forEach(post => {
                        appendHTMLLine(`[${escapeHTML(post.date)}] <a href="/posts/${escapeHTML(post.slug)}" class="cli-link" target="_blank" rel="noopener noreferrer">${escapeHTML(post.title)}</a><br> - ${escapeHTML(post.description)}`);
                    });
                });
        } else if (action === "load-projects") {
            fetch("/resources/data/projects.json")
                .then(res => res.json())
                .then(data => {
                    appendTextLine("\nProjects:");
                    data.forEach(project => {
                        appendHTMLLine(`[${escapeHTML(project.date)}] <a href="/projects/${escapeHTML(project.slug)}" class="cli-link" target="_blank" rel="noopener noreferrer">${escapeHTML(project.title)}</a><br> - ${escapeHTML(project.description)}`);
                    });
                });
        } else if (action === "reload") {
            input.value = "clear";
            handleCommand({ preventDefault: () => {} });
            appendTextLine("Reloaded succesfully.");
            input.value = "home";
            handleCommand({ preventDefault: () => {} });
        } else if (action === "stop") {
            input.value = "clear";
            handleCommand({ preventDefault: () => {} });
            appendTextLine("Shutting down...");
            setTimeout(() => {
                window.location.href = "/"; // redirect same tab
            }, 2000); // 2 seconds delay
        } else if (action === "blink") {
            const overlay = document.getElementById("blinkOverlay");
            appendTextLine("The universe is blinking");
            overlay.style.animation = "blinkEffect 2s ease-in-out";
        
            setTimeout(() => {
                overlay.style.animation = "none";
                overlay.style.opacity = 0;
            }, 2000);
        } else if (action === "weather") {
            fetch('https://ipapi.co/json/')
                .then(response => response.json())
                .then(locationData => {
                    const latitude = locationData.latitude;
                    const longitude = locationData.longitude;
                    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
        
                    fetch(url)
                        .then(res => res.json())
                        .then(weatherData => {
                            if (weatherData && weatherData.current_weather) {
                                const weather = weatherData.current_weather;
                                appendTextLine(`Current weather in your location:`);
                                appendTextLine(`Weather: ${getWeatherDescription(weather.weathercode)}`);
                                appendTextLine(`Temperature: ${weather.temperature}°C`);
                                appendTextLine(`Wind Speed: ${weather.windspeed} km/h`);
                                appendTextLine(`Time: ${weather.time}`);
                            } else {
                                appendTextLine("Weather data is unavailable at the moment.");
                            }
                        });
                })
                .catch(error => {
                    console.error("Error fetching IP-based location:", error);
                    appendTextLine("An error occurred while fetching your location.");
                });
        }        
         else if (action === "uname") {
            let agent = navigator.userAgent;
            appendTextLine(agent);
        } else if (action === "time") {
            const now = new Date();
            appendTextLine("Current time: " + now.toLocaleString());
        } else if (action === "no_response") {
            appendTextLine("...");
        }  else if (action === "root") {
            appendTextLine("Root Access Denied. Admin permissions required.");
        } else if (action === "ls") {
            appendTextLine("index.html");
        } else if (action === "sudo") {
            appendTextLine("Admin permissions required.");
        } else if (action === "nuh-uh") {
            appendTextLine("nuh-uh");
        } else if (action === "whoami") {
            appendTextLine("You're you, obviously");
        } else if (action === "ded") {
            appendTextLine("Yes, that's me, ded_moon");
        } else if (action === "shout") {
            appendTextLine("You shout into the void...");
            setTimeout(() => {
                appendTextLine("No response");
            }, 2000);
        } else if (action === "stare") {
            appendTextLine("You stare into the void...");
            setTimeout(() => {
                appendTextLine("It stares back at you.");
            }, 2000);
        } else if (action === "git") {
            appendTextLine("Link to this website's github page: https://github.com/ded-moon/website");
        } else {
            if (action === "/resources/data/pages/about.html" || action === "/resources/data/pages/contact.html" || action === "/resources/data/pages/about.html") {
                // Light page => fetch and show in terminal
                fetch(action)
                    .then(response => response.text())
                    .then(html => {
                        showOverlay(html);
                    })
                    .catch(error => {
                        console.error('Error fetching page:', error);
                        appendTextLine("Failed to load page content.");
                    });
            } else {
                // Heavy page => open new tab
                window.open(action, '_blank', 'noopener,noreferrer');
            }
        }
    } else {
        appendTextLine(`Unknown command: \"${cmd}\"`);
    }

    input.value = "";
}

function showOverlay(content) {
    const overlay = document.getElementById("overlay");
    const overlayContent = document.getElementById("overlayContent");
    const returnButtonContainer = document.getElementById("returnButtonContainer");

    overlayContent.innerHTML = content;
    overlay.style.display = "block";
    returnButtonContainer.style.display = "block";
}

function closeOverlay() {
    const overlay = document.getElementById("overlay");
    const overlayContent = document.getElementById("overlayContent");
    const returnButtonContainer = document.getElementById("returnButtonContainer");

    overlay.style.display = "none";
    overlayContent.innerHTML = ""; // Optional: clear content when closing
    returnButtonContainer.style.display = "none";
}


input.addEventListener("paste", e => e.preventDefault());

// Auto-run help on load
window.addEventListener("DOMContentLoaded", () => {
    input.value = "home";
    handleCommand({ preventDefault: () => {} });
});