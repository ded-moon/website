const bootText = [
    "ObscurWare BIOS - Build 13.37.Δ",
    "Developed by Transylvanian Systems S.R.L.",
    "© 1984–2005 Institutul Tehnologic de Calcul ",
    "Performing Power-On Self-Test (POST)...",
    "System Manufacturer: Project Vidra.",
    "Model: DeskPro 386/25e",
    " ",  
    "CPU: Intel 80386DX @ 33MHz",
    "RAM: 6144KB [STABLE]",
    "Keyboard: Detected",
    "Mouse: Not Found",
    "Primary Master: 540MB IDE HDD",
    "Primary Slave: None",
    "Secondary Master: CD-ROM Drive 2X",
    "Boot device: A:\\ Floppy Drive",
    " ",
    "Initializing system...",
    "Detecting hardware components...",
    "Loading kernel...",
    "Checking memory...",
    "Mounting file system...",
    "Verifying disk integrity...",
    "WARNING: Disk sector 3452 unreadable, recovery failed.",
    "All devices initialized successfully.",
    "Initializing network interfaces...",
    "Establishing secure channel with central node...",
    "Network connection established.",
    "Starting system services...",
    "Verifying system integrity...",
    "No unauthorized modifications detected.",
    "Applying pending security patches...",
    "Loading user configuration...",
    "Setting up user environment...",
    "Finalizing setup...",
    " ",
    "Boot complete. Welcome!"
  ];


  const bootDiv = document.getElementById("boot");
  const mainDiv = document.getElementById("main");
  const bootContainer = document.getElementById("boot-container");
  let lineIndex = 0;
  
  // Switch hidden parts
  mainDiv.classList.add("hidden");
  document.body.appendChild(mainDiv);
  bootContainer.classList.remove("hidden");
  document.body.appendChild(bootContainer);

  function typeLine() {
    if (lineIndex < bootText.length) {
      const line = document.createElement("div");
      const text = bootText[lineIndex];
  
      line.textContent = text;
  
      // Style if warning
      if (text.includes("WARNING")) {
        line.classList.add("error");
      } 
  
      line.classList.add("cursor");
      bootDiv.appendChild(line);
  
      // Scroll to bottom after appending
      bootContainer.scrollTop = bootContainer.scrollHeight;
  
      // Delay logic
      const delay = Math.random() * 500 + 100;
      const needsOK = [
        "Checking memory...",
        "Mounting file system...",
        "Verifying disk integrity...",
        "Initializing network interfaces..."
      ].some(t => text.includes(t));
  
      if (needsOK) {
        setTimeout(() => {
          line.textContent = text + " [OK]";
          line.classList.remove("cursor");
  
          // Scroll again after OK is added
          bootContainer.scrollTop = bootContainer.scrollHeight;
  
          setTimeout(() => {
            lineIndex++;
            typeLine();
          }, 200); // short delay before next line
        }, 900); // delay for [OK]
      } else {
        setTimeout(() => {
          line.classList.remove("cursor");
          lineIndex++;
          typeLine();
        }, delay);
      }
    } else {
        setTimeout(() => {
            bootContainer.scrollTop = bootContainer.scrollHeight;
        }, 0);
      // End of boot
      setTimeout(() => {
        document.body.classList.add("blackout");
        document.body.innerHTML = "";
        setTimeout(() => {
          document.body.classList.remove("blackout");
          window.location.href = "/home";

          setTimeout(() => {
          mainDiv.classList.remove("hidden");
          document.body.appendChild(mainDiv);
          }, 5000)
        }, 500);
      }, 2200);
    }
  }
  
  document.addEventListener("keydown", skipBoot);
  document.addEventListener("touchstart", skipBoot);
  document.addEventListener("click", skipBoot);

  function skipBoot() {
    lineIndex = bootText.length;
  }

  const hint = document.createElement("div");
  hint.textContent = "(Press any key to skip...)";
  hint.style.opacity = "0.5";
  hint.style.marginTop = "2em";
  bootDiv.appendChild(hint);