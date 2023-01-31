const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const title = document.getElementById("title");
const flappybird = document.getElementById("flappy_bird");


ctx.drawImage(title, canvas.width / 2 - title.width / 2,
  canvas.height / 2 - title.height / 2 - 100);
