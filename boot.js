const bootText = [
    "ObscurWare BIOS Version 1.14",
    "Copyright (C) 1989–1994 Transylvanian Systems S.R.L",
    "All Rights Reserved",
    " ",
    "System Manufacturer: Project Vidra.",
    "Model: DeskPro 386/25e",
    " ",
    "Performing Power-On Self-Test (POST)...",  
    "CPU: Intel 80386DX @ 33MHz",
    "Math Coprocessor: 80387 Present",
    "Memory: 6144KB ",
    " ",
    "Keyboard: Detected",
    "Pointing Device: Not Installed",
    " ",
    "Primary Master: 540MB IDE Hard Disk",
    "Primary Slave: None",
    "Secondary Master: CD-ROM Drive 2X",
    "Secondary Slave: None",
    " ",
    "CMOS Checksum: [OK] (defaults loaded)",
    "BIOS ROM Shadowing: Enabled",
    "Boot Sequence: A:, C:",
    "Booting from A:\\",
    " ",
    "Loading bootstrap loader...",
    "Initializing system...",
    " ",
    "Relocating system tables...",
    "Switching to protected mode...",
    "Detecting hardware configuration...",
    "Loading kernel...",
    "Checking memory...",
    "Mounting file system...",
    "Verifying disk integrity...",
    "WARNING: Disk sector 3452 unreadable, recovery failed.",
    "WARNING: Marking sector as bad.",
    "System initialization complete.",
    " ",
    "Initializing network interfaces...",
    "Synchronizing with network host...",
    "System clock updated.",
    "Network interface established.",
    " ",
    "Starting system services...",
    "Verifying system integrity...",
    "Reference state: 11/12/1993",
    "No unauthorized modifications detected.",
    "Note: Configuration differs from installation record.",
    "Updating system components...",
    "Enabling legacy compatibility mode...",
    "Loading user configuration...",
    "Setting up user environment...",
    "Note: One or more warnings were issued during startup.",
    "Finalizing setup...",
    " ",
    "System ready.",
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
  
      // Color adjustments 
      if (text.includes("WARNING")) {
        line.classList.add("error_red");
      } 
      else if (text.includes("Reference") || text.includes("Note:")) {
        line.classList.add("error_yellow");
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