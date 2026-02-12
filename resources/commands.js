// commands.js

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
    }
};
