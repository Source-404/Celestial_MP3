//song playlist
const songURL = [
  "https://datashat.net/music_for_programming_1-datassette.mp3",
  "https://datashat.net/music_for_programming_2-sunjammer.mp3",
  "https://datashat.net/music_for_programming_3-datassette.mp3",
  "https://datashat.net/music_for_programming_4-com_truise.mp3",
  "https://datashat.net/music_for_programming_5-abe_mangger.mp3",
  "https://datashat.net/music_for_programming_6-gods_of_the_new_age.mp3",
  "https://datashat.net/music_for_programming_7-tahlhoff_garten_and_untitled.mp3",
  "https://datashat.net/music_for_programming_8-connectedness_locus.mp3",
  "https://datashat.net/music_for_programming_9-datassette.mp3",
  "https://datashat.net/music_for_programming_10-unity_gain_temple.mp3",
];

//buttons
const startBtn = document.querySelector(".start");
// const pauseBtn = document.querySelector(".pause");
const volupBtn = document.querySelector(".volup");
const voldownBtn = document.querySelector(".voldown");
const forwardBtn = document.querySelector(".forward");
const backwardBtn = document.querySelector(".backward");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

//the music player (audio tag)
const music = document.querySelector(".music");
const musicSource = document.querySelector(".musicSource");
var currentMusic = 0;
var vol = 10;

//textual tags
const playing = document.querySelector(".playing");
const voltext = document.querySelector(".voltext");

//button functionings
startBtn.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    changePlaying(currentMusic);
  } else {
    music.pause();
  }
});

volupBtn.addEventListener("click", () => {
  if (vol != 10) {
    vol += 1;
    music.volume = vol / 10;
    voltext.innerHTML = music.volume * 100 + " % ";
  }
});

voldownBtn.addEventListener("click", () => {
  if (vol != 0) {
    vol -= 1;
    music.volume = vol / 10;
    voltext.innerHTML = music.volume * 100 + " % ";
  }
});

forwardBtn.addEventListener("click", () => {
  music.currentTime += 20;
});

backwardBtn.addEventListener("click", () => {
  music.currentTime -= 20;
});

nextBtn.addEventListener("click", () => {
  currentMusic = (currentMusic + 1) % songURL.length;

  musicSource.src = songURL[currentMusic];
  music.load();
  music.play();
  changePlaying(currentMusic);
});

prevBtn.addEventListener("click", () => {
  if (currentMusic != 0) {
    currentMusic--;
    musicSource.src = songURL[currentMusic];
    music.load();
    music.play();
    changePlaying(currentMusic);
  } else {
    currentMusic = songURL.length - 1;
    musicSource.src = songURL[currentMusic];
    music.load();
    music.play();
    changePlaying(currentMusic);
  }
});

//textual functions
const changePlaying = (currentMusic) => {
  playing.innerHTML = "Now Playing: " + (currentMusic + 1) + "-";
  playing.innerHTML += songURL[currentMusic]
    .split("-")[1]
    .split(".")[0]
    .split("_")
    .join(" ")
    .toUpperCase();
};
