// Select all the elements in the HTML page
let nowPlaying = document.querySelector(".now-playing");
let trackArt = document.querySelector(".track-art");
let trackName = document.querySelector(".track-name");
let trackArtist = document.querySelector(".track-artist");

let playPauseBtn = document.querySelector(".playpause-track");
let nextBtn = document.querySelector(".next-track");
let prevBtn = document.querySelector(".prev-track");

let seekSlider = document.querySelector(".seek_slider");
let volumeSlider = document.querySelector(".volume_slider");
let currentTime = document.querySelector(".current-time");
let totalDuration = document.querySelector(".total-duration");

// Specify globally used values
let trackIndex = 0;
let isPlaying = false;
let updateTimer;

// Create the audio element for the player
let audio = new Tone.Player({
  loop: true,
  autostart: false,
  volume: 0.5, // Adjust the initial volume as needed
}).toDestination();

// Define the list of tracks that have to be played
let trackList = [
  {
    name: "Aakasheo Olpo Nil",
    artist: "Arijit Singh",
    image: "path/to/track/art.jpg",
    path: "audio/ak.mp3",
  },
  {
    name: "Baby",
    artist: "Justin Biber",
    image: "path/to/track/art.jpg",
    path: "audio/baby.mp3",
  },
  {
    name: "Shipping Lanes",
    artist: "Chad Crouch",
    image: "path/to/track/art.jpg",
    path: "path/to/audio/shipping_lanes.mp3",
  },
];

// Function to load and play a new track
function loadTrack(trackIndex) {
  let track = trackList[trackIndex];

  audio.load(track.path).then(() => {
    trackArt.src = track.image;
    trackName.textContent = track.name;
    trackArtist.textContent = track.artist;
    playPauseBtn.textContent = "Pause";
    isPlaying = true;

    // Auto-play the loaded track
    playTrack();
  });
}

// Function to play the track
function playTrack() {
  audio.start();
  playPauseBtn.textContent = "Pause";
  isPlaying = true;
}

// Function to pause the track
function pauseTrack() {
  audio.stop();
  playPauseBtn.textContent = "Play";
  isPlaying = false;
}

// Function to play or pause the track
function playPauseTrack() {
  if (isPlaying) {
    pauseTrack();
  } else {
    playTrack();
  }
}

// Function to play the next track
function nextTrack() {
  pauseTrack();
  trackIndex = (trackIndex + 1) % trackList.length;
  loadTrack(trackIndex);
}

// Function to play the previous track
function prevTrack() {
  pauseTrack();
  trackIndex = (trackIndex - 1 + trackList.length) % trackList.length;
  loadTrack(trackIndex);
}

// Function to adjust the volume
function adjustVolume() {
  audio.volume.value = volumeSlider.value;
}

// Event listeners
playPauseBtn.addEventListener("click", playPauseTrack);
nextBtn.addEventListener("click", nextTrack);
prevBtn.addEventListener("click", prevTrack);
volumeSlider.addEventListener("input", adjustVolume);

// Load the initial track
loadTrack(trackIndex);
