const flappyBird = document.getElementById("flappy_bird");
const loadingBar = document.getElementById("loading_bar");

var timer = 0;

function initLoadingScreen() {
  window.requestAnimationFrame(loopLoadingScreen);
}

function drawElements() {

  ctx.drawImage(title, canvas.width / 2 - title.width / 2,
    canvas.height / 2 - title.height / 2 - 100);
}

function loopLoadingScreen() {
   drawElements();
  timer++;

  if (timer >= 80) {
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
  timer = 0;
  window.cancelAnimationFrame(loopLoadingScreen);

}



