const title = document.getElementById("title");
const flappyBird = document.getElementById("flappy_bird");
const loadingBar = document.getElementById("loading_bar");

var timer = 0;

function initLoadingScreen() {
  drawElements();
  window.requestAnimationFrame(loopLoadingScreen);
}

function drawElements() {
  ctx.drawImage(title, canvas.width / 2 - title.width / 2,
    canvas.height / 2 - title.height / 2 - 100);
}

function loopLoadingScreen() {
  timer++;
  if (timer >= 90) {
    stopLoadingScreen();
    currentGamestates = gamestates.MainMenu;
    state();
  }
  window.requestAnimationFrame(loopLoadingScreen);
}

function stopLoadingScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  flappyBird.style.visibility = 'hidden';
  loadingBar.style.visibility = 'hidden';
  window.cancelAnimationFrame(loopLoadingScreen);
  timer = 0;
}


