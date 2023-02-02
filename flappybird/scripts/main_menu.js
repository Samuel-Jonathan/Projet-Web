
function initMainMenu() {

    canvas.style.background = 'url(/flappybird/assets/main_menu/background.png)';

    ctx.drawImage(title, canvas.width / 2 - title.width / 2,
        canvas.height / 2 - title.height / 2 - 100);

    ctx.drawImage(playButton, canvas.width / 2 - playButton.width / 2,
        canvas.height / 2 - playButton.height / 2 + 100);

    ctx.drawImage(rankingButton, canvas.width / 2 - rankingButton.width / 2 + 400,
        canvas.height / 2 - rankingButton.height / 2 + 235, 120, 120);

    ctx.drawImage(successButton, canvas.width / 2 - successButton.width / 2 + 200,
        canvas.height / 2 - successButton.height / 2 + 235, 120, 120);

    ctx.drawImage(shopButton, canvas.width / 2 - shopButton.width / 2 - 200,
        canvas.height / 2 - shopButton.height / 2 + 235, 120, 120);

    ctx.drawImage(settingsButton, canvas.width / 2 - settingsButton.width / 2 - 390,
        canvas.height / 2 - settingsButton.height / 2 + 235, 120, 120);


}
