// Select elements
let cards = document.querySelectorAll(".card");
let nowPlaying = document.querySelector("#nowPlaying");
let audio = document.getElementById("audio");
audio.volume = 1;
let playBtn = document.getElementById("playBtn");
let progressBar = document.getElementById("progressBar");
let currentTimeEl = document.getElementById("currentTime");
let durationEl = document.getElementById("duration");
let volumeControl = document.getElementById("volumeControl");

let songs = [
  {
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    title: "Daily Mix 1"
  },
  {
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    title: "Lo-Fi Beats"
  },
  {
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    title: "Party Songs"
  },
  {
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    title: "Top Hits"
  },
  {
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    title: "Chill Vibes"
  },
  {
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    title: "Workout Mix"
  }
];

let currentSongIndex = 0;

// Play song when card is clicked
cards.forEach(function(card, index) {
  card.addEventListener("click", function() {
    currentSongIndex = index;

let song = songs[index].src;
let title = songs[index].title;

    audio.src = song;
    audio.currentTime = 0;
    audio.play();

    playBtn.innerText = "⏸";
    nowPlaying.innerText = "Now Playing: " + title + " 🎵";
    cards.forEach(c => c.classList.remove("active"));
    card.classList.add("active");
  });
});

// Play / Pause button
playBtn.addEventListener("click", function() {
  if (audio.paused) {
    audio.play();
    playBtn.innerText = "⏸";
  } else {
    audio.pause();
    playBtn.innerText = "▶";
  }
});
audio.addEventListener("timeupdate", function () {
  if (audio.duration) {
    let progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;

    // Format current time
    let currentMinutes = Math.floor(audio.currentTime / 60);
    let currentSeconds = Math.floor(audio.currentTime % 60);
    if (currentSeconds < 10) currentSeconds = "0" + currentSeconds;

    // Format duration
    let durationMinutes = Math.floor(audio.duration / 60);
    let durationSeconds = Math.floor(audio.duration % 60);
    if (durationSeconds < 10) durationSeconds = "0" + durationSeconds;

    // Update UI
    currentTimeEl.innerText = currentMinutes + ":" + currentSeconds;
    durationEl.innerText = durationMinutes + ":" + durationSeconds;
  }
});
progressBar.addEventListener("input", function () {
  if (audio.duration) {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
  }
});
audio.addEventListener("ended", function () {
  currentSongIndex++;

  // If last song → go to first
  if (currentSongIndex >= songs.length) {
    currentSongIndex = 0;
  }

  // Play next song
  audio.src = songs[currentSongIndex].src;
  audio.currentTime = 0;
  audio.play();

  // Update UI
  nowPlaying.innerText = "Now Playing: " + songs[currentSongIndex].title + " 🎵";
  playBtn.innerText = "⏸";
  cards.forEach(c => c.classList.remove("active"));
  cards[currentSongIndex].classList.add("active");
});
volumeControl.addEventListener("input", function () {
  audio.volume = volumeControl.value;
});