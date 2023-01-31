const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const title = document.getElementById("title");
const flappyBird = document.getElementById("flappy_bird");
const loadingBar = document.getElementById("loading_bar");

var timer = 0;

function initLoadingScreen() {
  if (currentGamestates == gamestates.LoadingScreen) {
    drawElements();
    window.requestAnimationFrame(loopLoadingScreen);
  }
}

function drawElements() {
  loadingBar.style.visibility = 'visible';
  flappyBird.style.visibility = 'visible';
  ctx.drawImage(title, canvas.width / 2 - title.width / 2,
    canvas.height / 2 - title.height / 2 - 100);
}

function loopLoadingScreen() {
  timer++;
  if (timer >= 90) {
    stopLoadingScreen();
  }
  window.requestAnimationFrame(loopLoadingScreen);
}

function stopLoadingScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  document.body.removeChild(title);
  document.body.removeChild(flappyBird);
  document.body.removeChild(loadingBar);
  window.cancelAnimationFrame(loopLoadingScreen);
  timer = 0;
}

initLoadingScreen();


