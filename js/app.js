const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

function togglePlay() {
  const action = video.paused ? "play" : "pause";
  video[action]();
  //Or we can do the old way below
  //     if (video.paused) {
  //     video.play();
  //   } else {
  //     video.pause();
  //   }
}
function updateButton() {
  console.log("update button");
  const icon = this.paused ? "▶" : "||";
  toggle.textContent = icon;
}
function skip() {
  console.log(this.dataset.skip);
  video.currentTime += parseFloat(this.dataset.skip);
}
function sliders() {
  //looking at the html we can look at the input tags and we can see its attributes the 2 key attributes we want to see is its value and name
  console.log(this.value);
  console.log(this.name);
  //because we intentionally gave the same name of the video's property to our input rather than saying video['volume'], or video['playbackRate'] we just simply do this

  video[this.name] = this.value;
}
function handleProgress() {
  //currentTime and duration like play, pause, volume, playbackRate are just some of the properties that video has which we can use to control the settings on the videos
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}
function scrub(e) {
  console.log(e);
  //by console logging e we can see that offsetX is one of the properties shoing how many pixels is related to the screen width of the viewer
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}
//========Handling Progess==============//
video.addEventListener("timeupdate", handleProgress);
//time update is an event which allows us to listen for time updates or when the video is updating its time code, similarly you can use PROGRESS as an event listener for this both progress/timeupdate will do the same thing
let mouseDown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", e => mouseDown && scrub(e));
progress.addEventListener("mousedown", () => (mouseDown = true));
progress.addEventListener("mouseup", () => (mouseDown = false));

//========Pausing/Playing================//
video.addEventListener("click", togglePlay);
toggle.addEventListener("click", togglePlay);

//the two even listener is used to update the button to show wether the movie is paused or playing
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);

//============Skipping======================//
//since we are listening for all elements with the (data-skip) we will need to run it through a loop to listen for all changes
skipButtons.forEach(button => button.addEventListener("click", skip));

//==============Sliders/range===============//
ranges.forEach(range => range.addEventListener("change", sliders));
//===VOLUME====//
