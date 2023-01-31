const playButton = document.getElementById("play_button");

function initMainMenu(){

    canvas.style.background = 'url(/flappybird/assets/main_menu/background.png)';
  
    ctx.drawImage(title, canvas.width / 2 - title.width / 2,
    canvas.height / 2 - title.height / 2 - 100);

    playButton.style.visibility = 'visible';
   




}