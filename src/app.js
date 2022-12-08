class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.playBtn = document.querySelector(".play");
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.index = 0;
    this.bpm = 130;
  }

  activatePad(pad) {
    if (!pad.classList.contains("active")) {
      pad.classList.add("active");
    } else {
      pad.classList.remove("active");
    }
  }

  repeater() {
    let step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);
    console.log(step);
    this.index++;
  }

  play() {
    const calculatedBpmInterval = (60 / this.bpm) * 1000;
    setInterval(() => {
      this.repeater();
    }, calculatedBpmInterval);
  }
}

const drumKit = new DrumKit();

drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", function () {
    drumKit.activatePad(pad);
  });
});

drumKit.playBtn.addEventListener("click", function () {
  drumKit.play();
});
