class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.playBtn = document.querySelector(".play");
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.index = 0;
    this.step = 0;
    this.bpm = 130;
    this.isPlaying = null;
    this.allSelectElements = document.querySelectorAll("select");
    this.muteBtns = document.querySelectorAll(".mute-btn");
  }

  activatePad(pad) {
    if (!pad.classList.contains("active")) {
      pad.classList.add("active");
    } else {
      pad.classList.remove("active");
    }
  }

  repeater() {
    this.step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${this.step}`);

    // Loop over pads
    activeBars.forEach((bar) => {
      bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;

      // Check if pads are active
      if (bar.classList.contains("active")) {
        // Check each sound
        if (bar.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
      }
    });
    this.index++;
  }

  start() {
    const calculatedBpmInterval = (60 / this.bpm) * 1000;

    if (!this.isPlaying) {
      this.isPlaying = setInterval(() => {
        this.repeater();
      }, calculatedBpmInterval);
    } else {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
      this.step = 0;
      this.index = 0;
    }
  }

  updateBtn() {
    if (!this.isPlaying) {
      this.playBtn.innerText = "Parar";
    } else {
      this.playBtn.innerText = "Tocar";
    }
  }

  changeSound(select) {
    const selectedSoundOption = select.target.name;
    const selectedSoundOptionValue = select.target.value;
    switch (selectedSoundOption) {
      case "kick-select":
        this.kickAudio.src = selectedSoundOptionValue;
        break;
      case "snare-select":
        this.snareAudio.src = selectedSoundOptionValue;
        break;
      case "hihat-select":
        this.hihatAudio.src = selectedSoundOptionValue;
        break;
    }
  }

  mute(e) {
    let muteIndex = e.target.getAttribute("data-track");
    e.target.classList.toggle("active");
    if (e.target.classList.contains("active")) {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 0;
          break;
        case "1":
          this.snareAudio.volume = 0;
          break;
        case "2":
          this.hihatAudio.volume = 0;
          break;
      }
    } else {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 1;
          break;
        case "1":
          this.snareAudio.volume = 1;
          break;
        case "2":
          this.hihatAudio.volume = 1;
          break;
      }
    }
  }
}

const drumKit = new DrumKit();

drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", function () {
    drumKit.activatePad(pad);
  });
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

drumKit.playBtn.addEventListener("click", function () {
  drumKit.updateBtn();
  drumKit.start();
});

drumKit.allSelectElements.forEach((select) => {
  select.addEventListener("change", function (select) {
    drumKit.changeSound(select);
  });
});

drumKit.muteBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    drumKit.mute(e);
  });
});
