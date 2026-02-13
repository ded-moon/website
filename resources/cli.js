// cli.js  lord have mercy

///TO DO: add the rest of the old commands
//        complete the filesystem structure

import { commands } from "./commands.js";
import { fileSystem } from "./fs.js";

/// Utility / Output ================================ 

export class Terminal {
    constructor(logElement, inputElement) {
        this.log = logElement;
        this.input = inputElement;
        this.c_loc = "/home";
        this.fs = fileSystem;
        this.history = [];
        this.historyIndex = -1;

        this.bindEvents();
    }

    print(text = "") {
        const line = document.createElement("div");
        line.textContent = text;
        this.log.appendChild(line);
        this.scroll();
    }

    append(text = "") {
      let last = this.log.lastElementChild;

      if (!last) {
          last = document.createElement("div");
          this.log.appendChild(last);
      }

      last.textContent += text;
      this.scroll();
    }


    printHTML(html) {
        const line = document.createElement("div");
        line.innerHTML = html;
        this.log.appendChild(line);
        this.scroll();
    }

    scroll() {
        this.log.scrollTop = this.log.scrollHeight;
    }

    clear() {
        this.log.innerHTML = "";
    }

    prompt() {
        return ` dedmoon:${this.c_loc}$`;
    }

/// Input Handling ================================ 

    bindEvents() {
        this.input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                const value = this.input.value.trim();
                if (!value) return;

                this.print(`${this.prompt()} ${value}`);
                this.history.push(value);
                this.historyIndex = this.history.length;

                this.executeLine(value);
                this.input.value = "";
            }

            // Arrow history
            if (e.key === "ArrowUp") {
                if (this.historyIndex > 0) {
                    this.historyIndex--;
                    this.input.value = this.history[this.historyIndex];
                }
            }

            if (e.key === "ArrowDown") {
                if (this.historyIndex < this.history.length - 1) {
                    this.historyIndex++;
                    this.input.value = this.history[this.historyIndex];
                } else {
                    this.input.value = "";
                }
            }
        });

        this.input.addEventListener("paste", e => e.preventDefault());
    }

/// Parsing ================================ 

    executeLine(line) {
        // Support multiple commands separated by ;
        const commands = this.splitBySemicolon(line);

        for (const cmd of commands) {
            const parsed = this.parseCommand(cmd);
            if (!parsed) continue;
            this.execute(parsed);
        }
    }

    splitBySemicolon(line) {
        return line.split(";").map(c => c.trim()).filter(Boolean);
    }

    parseCommand(input) {
        const tokens = [];
        let current = "";
        let inQuotes = false;

        for (let char of input) {
            if (char === '"') {
                inQuotes = !inQuotes;
                continue;
            }

            if (char === " " && !inQuotes) {
                if (current) {
                    tokens.push(current);
                    current = "";
                }
            } else {
                current += char;
            }
        }

        if (current) tokens.push(current);

        if (tokens.length === 0) return null;

        return {
            name: tokens[0].toLowerCase(),
            args: tokens.slice(1)
        };
    }

/// Execution ================================ 

    async execute({ name, args }) {
        let command = commands[name];
        if (!command) {
            command = Object.values(commands).find(cmd =>
                cmd.aliases && cmd.aliases.includes(name)
            );
        }


        if (!command) {
            this.print(`Command not found: ${name}`);
            return;
        }

        try {
            await command.execute(this, args);
        } catch (err) {
            console.error(err);
            this.print("An error occurred.");
        }
    }

/// Filesystem ================================ 

    resolvePath(path) {
        if (!path) return this.c_loc;

        if (path.startsWith("/")) return path;

        if (path === "..") {
            const parts = this.c_loc.split("/").filter(Boolean);
            parts.pop();
            return "/" + parts.join("/");
        }

        if (path === ".") return this.c_loc;

        return this.c_loc === "/"
            ? `/${path}`
            : `${this.c_loc}/${path}`;
    }

    getNode(path) {
        const parts = path.split("/").filter(Boolean);
        let current = this.fs["/"];

        for (const part of parts) {
            if (!current.children || !current.children[part]) {
                return null;
            }
            current = current.children[part];
        }

        return current;
    }

/// Clickable Commands ================================ 

    printClickable(commandName, description = "") {
        const line = document.createElement("div");

        const cmdSpan = document.createElement("span");
        cmdSpan.textContent = "- " + commandName;
        cmdSpan.className = "cli-link";

        cmdSpan.addEventListener("click", () => {
            this.print(`${this.prompt()} ${commandName}`);
            this.executeLine(commandName);
        });

        line.appendChild(cmdSpan);

        if (description) {
            const descSpan = document.createElement("span");
            descSpan.textContent = " - " + description;
            descSpan.style.color = "gray";
            line.appendChild(descSpan);
        }

        this.log.appendChild(line);
        this.scroll();
    }

/// Overlayed Pages  ================================ 

    async openPage(path) {
        try {
            const response = await fetch(path);
            const html = await response.text();

            const overlay = document.getElementById("overlay");
            const overlayContent = document.getElementById("overlayContent");
            const returnContainer = document.getElementById("returnButtonContainer");

            overlayContent.innerHTML = html;
            overlay.style.display = "block";
            returnContainer.style.display = "block";
        } catch (err) {
            this.print("Failed to load page content.");
        }
    }
    
}

window.closeOverlay = function () {
    const overlay = document.getElementById("overlay");
    const overlayContent = document.getElementById("overlayContent");
    const returnButtonContainer = document.getElementById("returnButtonContainer");

    overlay.style.display = "none";
    overlayContent.innerHTML = "";
    returnButtonContainer.style.display = "none";
};

