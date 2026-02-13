// commands.js

/// Utilities =================================

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


///
export const commands = {

    help: {
        description: "Lists available commands",
        visible: true,
        aliases: ["help_me"],

        async execute(term) {
            term.print(" ");
            term.print("Available commands:");

            Object.entries(commands)
                .filter(([_, cmd]) => cmd.visible !== false)
                .forEach(([name, cmd]) => {
                    term.printClickable(name, cmd.description);
                });
            term.print(" ");
        }
    },

    home: {
        description: "Returns to homepage",
        visible: true,
        aliases: ["return", "main"],

        async execute(term) {
            term.executeLine("clear");
            const now = new Date();

            term.print("Welcome - I'm ded_moon.");
            term.print(" ");
            term.print("Current time is: " + now.toLocaleString());
            term.print("This system hosts a collection of my work, experiments, and notes.");
            term.print(" ");

            Object.entries(commands)
                .filter(([name, cmd]) => cmd.visible !== false && name !== "home")
                .forEach(([name, cmd]) => {
                    term.printClickable(name, cmd.description);
                });
            term.print(" ");
        }
    },


    clear: {
        description: "Clears terminal",
        visible: false,
        async execute(term) {
            term.clear();
        }
    },

    about: {
        description: "Enter \"about me\" page",
        visible: true,
        aliases: ["about_me", "me", "ded_moon"],
        async execute(term) {
            await term.openPage("/resources/data/pages/about.html");
        }
    },

    contact: {
        description: "Enter \"contacts\" page",
        visible: true,
        aliases: ["social", "socials"],
        async execute(term) {
            await term.openPage("/resources/data/pages/contact.html");
        }
    },

    echo: {
        description: "Prints the provided text to the terminal.",
        visible: false,
        async execute(term, args) {
            term.print(args.join(" "));
        }
    },

    pwd: {
        description: "Prints the current working directory",
        visible: true,
        async execute(term) {
            term.print(term.c_loc);
        }
    },

    ls: {
        description: "Prints files and directories in working directory",
        visible: true,
        async execute(term, args) {
            const path = term.resolvePath(args[0]);
            const node = term.getNode(path);

            if (!node || node.type !== "dir") {
                term.print("Directory not found.");
                return;
            }

            Object.keys(node.children).forEach(name => {
                term.print(name);
            });
        }
    },

    cd: {
        description: "Opens specified directory",
        visible: true,

        async execute(term, args) {
            const path = term.resolvePath(args[0]);
            const node = term.getNode(path);

            if (!node || node.type !== "dir") {
                term.print("Directory not found.");
                return;
            }

            term.c_loc = path;
        }
    },

    cat: {
      description: "Opens specified file",
      visible: true,
      aliases: ["open"],

      async execute(term, args) {
        const path = term.resolvePath(args[0]);
        const node = term.getNode(path);

        if (!node || node.type !== "file") {
          term.print("File not found.");
          return;
        }

        if (node.contentType === "html") {
          await term.openPage("/resources/data/pages/" + node.content);
        } else {
            term.print(node.content);
        }
      }
    },

    time: {
      description: "Displays system time",
      visible: true,
      async execute(term) {
        term.print(new Date().toLocaleString());
      }
    },

    weather: {
      description: "Prints current weather conditions in your location",
      visible:true,
      async execute(term) {
        term.print("Fetching data...");
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
                                term.print(" ");
                                term.print(`Current weather at (apox.) ${latitude}, ${longitude} :`);
                                term.print(`Weather: ${getWeatherDescription(weather.weathercode)}`);
                                term.print(`Temperature: ${weather.temperature}°C`);
                                term.print(`Wind Speed: ${weather.windspeed} km/h`);
                                term.print(`Time: ${weather.time}`);
                                term.print(" ");
                            } else {
                                term.print("Weather data is unavailable at the moment.");
                            }
                        });
                })
                .catch(error => {
                    console.error("Error fetching IP-based location:", error);
                    term.print("An error occurred while fetching your location.");
                });
      }
    }


};
