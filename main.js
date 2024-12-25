const video = document.getElementById("myVideo");
const playPauseBtn = document.getElementById("playPauseBtn");
const muteBtn = document.getElementById("muteBtn");
const volumeSlider = document.getElementById("volumeSlider");
const _10sNext = document.getElementById("10sNext");
const _10sPrev = document.getElementById("10sPrev");
const pauseOverlay = document.getElementById("pauseOverlay");
const settings = document.getElementById("settings");
const fullscreenBtn = document.getElementById("fullscreenBtn")
const qualities = document.getElementsByClassName("qualities")[0];
const controls = document.getElementsByClassName("controls")[0];

video.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      console.log('Esc tugmasi faqat ushbu element uchun bloklandi');
        event.preventDefault();
        event.stopPropagation();
    }
});

function togglePlayPause() {
  if (video.paused) {
    video.play();
    playPauseBtn.innerHTML = "<img src='./smallPlayButton.png' alt='▶' />";
    pauseOverlay.style.display = "none";
    settings.style.display = "block";
    document.getElementsByClassName('black')[0].style.display = 'none';
  } else {
    video.pause();
    playPauseBtn.innerHTML = "<img src='./pauseButton.png' alt='⏸' />";
    pauseOverlay.style.display = "block";
  }
}
playPauseBtn.addEventListener("click", function () {
  togglePlayPause();
});
video.addEventListener("click", function () {
  togglePlayPause();
});
pauseOverlay.addEventListener("click", function () {
    togglePlayPause();
});

muteBtn.addEventListener("click", function () {
  video.muted = !video.muted;
  if (video.muted) {
    volumeSlider.value = 0;
  } else {
    volumeSlider.value = video.volume;
  }
  muteBtn.innerHTML = video.muted ? "<img src='./volume-down.png' alt='🔈'/>" : "<img src='./volume-up.png' alt='🔊'/>";
});

volumeSlider.addEventListener("input", function () {
  video.volume = volumeSlider.value;
  video.muted = video.volume == 0;
  muteBtn.innerHTML = volumeSlider.value == 0 ? "<img src='./volume-down.png' alt='🔈'/>" : "<img src='./volume-up.png' alt='🔊'/>";
});

_10sNext.addEventListener("click", function () {
  video.currentTime += 10;
});

_10sPrev.addEventListener("click", function () {
  video.currentTime -= 10;
});

let currentTime = 0;

const buttons = document.querySelectorAll(".quality-btn");

function changeQuality(quality) {
  const currentTime = video.currentTime;
  let videoSource = "";

  if (quality === "360p") {
    videoSource = "https://gold77.top/Kinolar/Yaxshi bo'lish osonmi 4 2024.mp4";
  } else if (quality === "480p") {
    videoSource = "https://gold77.top/Kinolar/Yaxshi bo'lish osonmi 4 2024.mp4";
  } else if (quality === "720p") {
    videoSource = "https://gold77.top/Kinolar/Yaxshi bo'lish osonmi 4 2024.mp4";
  } else if (quality === "1440p") {
    videoSource = "https://gold77.top/Kinolar/Yaxshi bo'lish osonmi 4 2024.mp4";
  }

  video.src = videoSource;
  video.load();
  video.currentTime = currentTime;
  video.play();

  buttons.forEach(button => {
    if (button.getAttribute("data-quality") === quality) {
      button.classList.add("active");
      qualities.classList.remove("active-qualities")
    } else {
      button.classList.remove("active");
    }
  });
}

buttons.forEach(button => {
  button.addEventListener("click", (e) => {
    const quality = e.target.getAttribute("data-quality");
    changeQuality(quality);
  });
});

function toggleFullscreen() {
  const videoContainer = document.getElementById("video-container");
  videoContainer.classList.toggle("active")

  if (!document.fullscreenElement) {
      videoContainer.requestFullscreen().catch((err) => {
          console.error("Failed to enter fullscreen mode:", err);
      });
  } else {
      document.exitFullscreen();
      
      if (screen.orientation && screen.orientation.unlock) {
          screen.orientation.unlock();
      }
  }
}



fullscreenBtn.addEventListener('click', function () {
  toggleFullscreen();
})

document.addEventListener("keydown", function (event) {
  const videoContainer = document.getElementById("video-container");
  videoContainer.classList.remove("active")
  
  if (event.key === "f") {
    toggleFullscreen();
  } else if (event.code === "Space") {
    event.preventDefault();
    playPauseBtn.click();
    document.getElementsByClassName('black')[0].style.display = 'none';
  } else if (event.key === "ArrowRight") {
    video.currentTime += 5;
  } else if (event.key === "ArrowLeft") {
    video.currentTime -= 5;
  }
});


const progressBar = document.getElementById("progressBar");
const tooltip = document.getElementById("tooltip");
const progressContainer = document.querySelector(".progress-container");

function updateProgress() {
  const progressPercent = (video.currentTime / video.duration) * 100;
  progressBar.style.width = `${progressPercent}%`;
}

video.addEventListener("timeupdate", updateProgress);


progressContainer.addEventListener("mousemove", function (event) {
  const containerRect = progressContainer.getBoundingClientRect();
  const x = event.clientX - containerRect.left;
  const percent = (x / containerRect.width) * 100;
  const time = (percent / 100) * video.duration;
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  tooltip.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  tooltip.style.left = `${x}px`;
  tooltip.style.top = `${progressContainer.offsetHeight + 5}px`;
  tooltip.style.display = "block";
});


progressContainer.addEventListener("mouseleave", function () {
  tooltip.style.display = "none";
});


progressContainer.addEventListener("click", function (event) {
  const containerRect = progressContainer.getBoundingClientRect();
  const x = event.clientX - containerRect.left;
  const percent = (x / containerRect.width) * 100;
  video.currentTime = (percent / 100) * video.duration;
});

settings.addEventListener('click', function () {
  if(settings) {
    qualities.classList.toggle("active-qualities");
  }
})

const videoContainer = document.getElementById("video-container"); 
let controlsTimeout;

function showControls() {
  controls.style.opacity = 1;  
  videoContainer.style.cursor = "default"; 
  
  clearTimeout(controlsTimeout);

  
  controlsTimeout = setTimeout(() => {
    controls.style.opacity = 0;
    videoContainer.style.cursor = "none";
  }, 2000); 
}


videoContainer.addEventListener("mousemove", showControls);


video.addEventListener("click", showControls);



const currentTimeElem = document.getElementById("current-time");
const durationElem = document.getElementById("duration");


function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);  
    const mins = Math.floor((seconds % 3600) / 60);  
    const secs = Math.floor(seconds % 60);  
    
    
    const hours = hrs < 10 ? `0${hrs}` : hrs;
    const minutes = mins < 10 ? `0${mins}` : mins;
    const formattedSeconds = secs < 10 ? `0${secs}` : secs;  
    
    return `${hours}:${minutes}:${formattedSeconds}`;
}


function updateCurrentTime() {
    const currentTime = video.currentTime;
    currentTimeElem.textContent = formatTime(currentTime);
}


function updateDuration() {
    const duration = video.duration;
    durationElem.textContent = formatTime(duration);
}


video.addEventListener('loadedmetadata', function () {
    updateDuration();
});


video.addEventListener('timeupdate', function () {
    updateCurrentTime();
});
