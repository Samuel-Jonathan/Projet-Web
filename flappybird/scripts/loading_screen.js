const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const title = document.getElementById("title");
const flappybird = document.getElementById("flappy_bird");

var timer = 0;

function initLoadingScreen() {
  ctx.drawImage(title, canvas.width / 2 - title.width / 2,
    canvas.height / 2 - title.height / 2 - 100);
  window.requestAnimationFrame(loopLoadingScreen);
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
  document.body.removeChild(flappybird);
  document.body.removeChild(loading_bar);
  window.cancelAnimationFrame(loopLoadingScreen);
  timer = 0;
}

initLoadingScreen();


