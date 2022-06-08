const player = document.querySelector(".player");
const video = document.querySelector("video");
const audio = document.querySelector("audio");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const playBtn = document.getElementById("play-btn");
const volumeIcon = document.getElementById("volume-icon");
const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");
const currentTime = document.querySelector(".time-elapsed");
const duration = document.querySelector(".time-duration");
const speed = document.querySelector(".player-speed");
const fullscreenBtn = document.querySelector(".fullscreen");
const controls = document.querySelector(".show-controls");
let pressed = false;
// Play & Pause ----------------------------------- //

function showPlayIcon() {
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
}

function decreaseTimer(time) {
  time = timer;
  if (timer > 1) {
    timerId = setTimeout(decreaseTimer, 1000);
    timer--;
  } else if (timer < 1.5 && timer > 0) {
    timerId = setTimeout(decreaseTimer, 0001);
    timer -= 0.001;
  }
  if (timer === 0) {
    video.currentTime = 0;
    let Start = timer;
    // return Start;
    console.log(Start);
  }
  console.log(timer);
}

function stop(timer) {
  if (timer) {
    clearTimeout(timer);
    timer = 0;
  }
}

let timerId;

function togglePlay() {
  if (video.paused) {
    pressed = true;
    // decreaseTimer(video.duration);
    video.play();
    audio.play();
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "Pause");
    return pressed;
  } else if (video.loop) {
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "Pause");
  } else {
    // Start = 0 + timer;
    video.pause();
    audio.pause();
    showPlayIcon();
  }
}

// On video end, show play button icon

// Progress Bar ---------------------------------- //

// Format current time, duration
function displayTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  seconds = seconds > 9 ? seconds : `0${seconds}`;
  return `${minutes}:${seconds}`;
}

// Update progress bar as video plays
function updateProgress() {
  if (audio.duration > video.duration) {
    progressBar.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
    currentTime.textContent = `${displayTime(audio.currentTime)} /`;
    duration.textContent = `${displayTime(audio.duration)}`;
    audio.addEventListener("ended", showPlayIcon);
    // OH MY GGGGGGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA ----------------- ||||||||||
    // OH MY GGGGGGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA ----------------- ||||||||||
    // OH MY GGGGGGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA ----------------- ||||||||||
    if (video.ended) {
      video.play();
      audio.play();
    }
    if (video.loop) {
      video.play();
      audio.play();
      togglePlay();
    }
    if (audio.ended) {
      video.pause();
      audio.pause();
    }
  } else {
    progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
    currentTime.textContent = `${displayTime(video.currentTime)} /`;
    duration.textContent = `${displayTime(video.duration)}`;
    video.addEventListener("ended", showPlayIcon);
    if (video.ended) {
      video.pause();
      audio.pause();
    }
  }
}

// Click to seek within the video
function setProgress(e) {
  const newTime = e.offsetX / progressRange.offsetWidth;
  progressBar.style.width = `${newTime * 100}%`;
  video.currentTime = newTime * video.duration;
  audio.currentTime = newTime * audio.duration;
}

// Add Audio
function addAudio() {
  var myvideo = document.getElementById("myvideo");
  var myaudio = document.getElementById("myaudio");
  myvideo.onplay = function () {
    myaudio.play();
  };
  myvideo.onpause = function () {
    myaudio.pause();
  };
}

// Volume Controls --------------------------- //

let lastVolume = 1;

// Mute
function toggleMute() {
  volumeIcon.className = "";
  if (video.volume) {
    lastVolume = video.volume;
    video.volume = 0;
    volumeIcon.classList.add("fas", "fa-volume-mute");
    volumeIcon.setAttribute("title", "Unmute");
    volumeBar.style.width = 0;
  } else {
    video.volume = lastVolume;
    volumeIcon.classList.add("fas", "fa-volume-up");
    volumeIcon.setAttribute("title", "Mute");
    volumeBar.style.width = `${lastVolume * 100}%`;
  }
}
// Volume Bar
function changeVolume(e) {
  let volume = e.offsetX / volumeRange.offsetWidth;
  // Rounding volume up or down
  if (volume < 0.1) {
    volume = 0;
    audio.volume = false;
  }
  if (volume > 0.9) {
    volume = 1;
    audio.volume = 1;
  }
  volumeBar.style.width = `${volume * 100}%` || audio * 100;
  video.volume = volume;
  audio.volume = volume;
  // Change icon depending on volume
  soundIcon(volume);
  lastVolume = volume;
}

function soundIcon(volume) {
  volumeIcon.className = "";
  if (volume >= 0.7) {
    volumeIcon.classList.add("fas", "fa-volume-up");
  } else if (volume < 0.7 && volume > 0) {
    volumeIcon.classList.add("fas", "fa-volume-down");
  } else if (volume <= 0) {
    volumeIcon.classList.add("fas", "fa-volume-off");
  }
}
// Change Playback Speed -------------------- //

function changeSpeed() {
  audio.playbackRate = speed.value;
  video.playbackRate = speed.value;
}

// Fullscreen ------------------------------- //

/* View in fullscreen */
function openFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    /* Firefox */
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    /* Chrome, Safari and Opera */
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    /* IE/Edge */
    element.msRequestFullscreen();
  }
  video.classList.add("video-fullscreen");
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE/Edge */
    document.msExitFullscreen();
  }
  video.classList.remove("video-fullscreen");
}

let fullscreen = false;

// Toggle fullscreen
function toggleFullscreen() {
  if (!fullscreen) {
    openFullscreen(player);
  } else {
    closeFullscreen();
  }
  fullscreen = !fullscreen;
}

// Event Listeners

// video
video.addEventListener("click", togglePlay);
video.addEventListener("timeupdate", updateProgress);
video.addEventListener("canplay", updateProgress);
video.addEventListener("click", addAudio);

// audio
audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("canplay", updateProgress);

// settings -------------------------------------------- ||||
playBtn.addEventListener("click", togglePlay);
progressRange.addEventListener("click", setProgress);

// volume settings
volumeRange.addEventListener("click", changeVolume);
volumeIcon.addEventListener("click", toggleMute);

// video settings
speed.addEventListener("change", changeSpeed);
fullscreenBtn.addEventListener("click", toggleFullscreen);

// key events -------------------------------------------- ||||
const keys = {
  // exit full screen
  Escape: {
    pressed: false,
  },
  // video/audio keys
  ArrowLeft: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowUp: {
    pressed: false,
  },
  ArrowDown: {
    pressed: false,
  },
  Shift: {
    pressed: false,
  },
};
let lastPress = null;
let volumeValue = 1
window.addEventListener("keydown", (event) => {
  if (pressed === true) {
    switch (event.key) {
      case "ArrowUp":
        if (!keys.ArrowUp.pressed) {
          keys.ArrowUp.pressed = true;
          if (!keys.Shift.pressed) {
            lastVolume += 0.25;
          } else {
            lastVolume += 0.1;
          }
          if (lastVolume >= 0.9) {
            lastVolume = 1;
          }
        }
            
        video.volume = lastVolume;
        audio.volume = lastVolume;
        volumeBar.style.width = `${lastVolume * 100}%`;
        soundIcon(lastVolume);
        break;
      case "ArrowDown":
        if (!keys.ArrowDown.pressed) {
          keys.ArrowDown.pressed = true;
            if (!keys.Shift.pressed) {
                if (lastPress === "ArrowDown" && lastVolume <= 0.25) {
                    
                }
                lastVolume += -0.25;
            } else {
                lastVolume += -0.1;
            }
            if (lastVolume <= 0.05) {
                lastVolume = 0
                toggleMute()
            }

        }
            
        console.log(lastVolume)
        video.volume = lastVolume;
        audio.volume = lastVolume;
        volumeBar.style.width = `${lastVolume * 100}%`;
        soundIcon(lastVolume);
        
        break;
      case "Shift":
        keys.Shift.pressed = true;
        break;
      case "ArrowLeft":
        if (!keys.ArrowLeft.pressed) {
          keys.ArrowLeft.pressed = true;
          video.currentTime -= 5;
          audio.currentTime -= 5;
        }
        break;
      case "ArrowRight":
        if (!keys.ArrowRight.pressed) {
          keys.ArrowRight.pressed = true;
          video.currentTime += 5;
          audio.currentTime += 5;
        }
        break;
      case " ":
        togglePlay();
        // let newStart = Start;
        // console.log(newStart);
        // if (video.pause && !video.paused) {
        //   stop();
        // } else {
        //   decreaseTimer(newStart);
        // }
        break;
    }
    console.log(event.key);
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "ArrowUp":
      lastPress = "ArrowUp";
      keys.ArrowUp.pressed = false;
      break;

    case "ArrowDown":
      lastPress = "ArrowDown";
      keys.ArrowDown.pressed = false;
      break;

    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;

    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;

    case "Shift":
      keys.Shift.pressed = false;
      break;
  }
});
