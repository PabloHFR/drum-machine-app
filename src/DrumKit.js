export default class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.playBtn = document.querySelector(".play");
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.clapAudio = document.querySelector(".clap-sound");
    this.openhatAudio = document.querySelector(".openhat-sound");
    this.rideAudio = document.querySelector(".ride-sound");
    this.cowbellAudio = document.querySelector(".cowbell-sound");
    this.index = 0;
    this.step = 0;
    this.bpm = 130;
    this.isPlaying = null;
    this.allSelectElements = document.querySelectorAll("select");
    this.muteBtns = document.querySelectorAll(".mute-btn");
    this.tempoSlider = document.querySelector(".tempo-slider");
  }

  activatePad(pad) {
    if (!pad.classList.contains("active")) {
      pad.classList.add("active");
    } else {
      pad.classList.remove("active");
    }
  }

  repeater() {
    this.step = this.index % 16;
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
        if (bar.classList.contains("clap-pad")) {
          this.clapAudio.currentTime = 0;
          this.clapAudio.play();
        }
        if (bar.classList.contains("openhat-pad")) {
          this.openhatAudio.currentTime = 0;
          this.openhatAudio.play();
        }
        if (bar.classList.contains("ride-pad")) {
          this.rideAudio.currentTime = 0;
          this.rideAudio.play();
        }
        if (bar.classList.contains("cowbell-pad")) {
          this.cowbellAudio.currentTime = 0;
          this.cowbellAudio.play();
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
      this.playBtn.classList.add("active");
    } else {
      this.playBtn.innerText = "Tocar";
      this.playBtn.classList.remove("active");
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
      case "clap-select":
        this.clapAudio.src = selectedSoundOptionValue;
        break;
      case "openhat-select":
        this.openhatAudio.src = selectedSoundOptionValue;
        break;
      case "ride-select":
        this.rideAudio.src = selectedSoundOptionValue;
        break;
      case "cowbell-select":
        this.cowbellAudio.src = selectedSoundOptionValue;
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
        case "3":
          this.clapAudio.volume = 0;
          break;
        case "4":
          this.openhatAudio.volume = 0;
          break;
        case "5":
          this.rideAudio.volume = 0;
          break;
        case "6":
          this.cowbellAudio.volume = 0;
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
        case "3":
          this.clapAudio.volume = 1;
          break;
        case "4":
          this.openhatAudio.volume = 1;
          break;
        case "5":
          this.rideAudio.volume = 1;
          break;
        case "6":
          this.cowbellAudio.volume = 1;
          break;
      }
    }
  }

  changeTempo(e) {
    const tempoText = document.querySelector(".tempo-number");
    tempoText.innerText = e.target.value;
  }

  updateTempo(e) {
    this.bpm = e.target.value;
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    const playBtn = document.querySelector(".play");

    if (playBtn.classList.contains("active")) {
      this.start();
    }
  }
}
