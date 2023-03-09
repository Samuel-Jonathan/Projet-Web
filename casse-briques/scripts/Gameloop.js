import Ball from "./ball.js";
import Paddle from "./Paddle.js";
import Brick from "./bricks.js";
import Bonus from "./Bonus.js";
import { circRectsOverlap } from "./collisions.js";
import * as assets from "./Assets.js";
import Score from "./Score.js";
import { canvas, ctx } from "./Main.js";

let tabBricks = [];
let paddle, ball;
let score = 0;
let bonus = new Array();


var isPause = false;
var paddleHitSound = document.getElementById("paddleHit");
var brickHitSound = document.getElementById("brickHit");
var backgroundSound = document.getElementById("background")


backgroundSound.play();

export function setPause(value) {
    isPause = value;
}


export function initGame() {
    isPause = false;
    tabBricks = [];
    bonus = [];


    console.log("page chargée");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Crée la balle
    ball = new Ball(canvas.width / 2, canvas.height - 80, 10, "blue", 6, -6);
    // Crée la raquette
    paddle = new Paddle(assets.paddleImg, 75, canvas.height - 50, 100, 10, 10);
    // Crée les briques
    createBricks(9,9,10,10,100, 10, "#ff4af6");
    // Crée le score
    score = new Score(850, 500, 0, "red", "25");

    // Évènements de la raquette
    document.addEventListener("keydown", paddle.handleKeyDown.bind(paddle));
    document.addEventListener("keyup", paddle.handleKeyUp.bind(paddle));


    paddle.hasPaddleBonus = false;

    // Pause du jeu
    window.addEventListener("keydown", pause);

}

export function gameLoop() {

    if (!isPause) {
        // Efface le canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Dessine la balle
        ball.draw(ctx);
        // Dessine la raquette
        paddle.draw(ctx);
        // Dessine le score
        score.draw(ctx);

        // Crée des bonus
        createBonus();

        for (let i = 0; i < tabBricks.length; i++) {
            // Dessine les briques
            tabBricks[i].draw(ctx);
            // Collision de la balle avec les briques
            handleCollisionBallBrick(tabBricks[i]);
        }

        paddle.update(canvas.width);
        // Collision entre la balle et la raquette
        handleCollisionBallPaddle();
        ball.update(canvas.width, canvas.height);
    }

}

function createBonus() {
    // Spawn des bonus
    let spawnBonus = Math.round(random(1, 100));
    spawnBonus = (spawnBonus == 1) ? bonus.push(new Bonus("paddle_bonus", assets.paddleImg, 50, 10)) : null;

    for (let i = 0; i < bonus.length; i++) {
        bonus[i].draw(ctx);
        handleCollisionBonus(ball);
    }
}

function pause(event) {
    if (event.code == "Escape") {
        // Met le jeu en pause
        //arreter la musique 
        backgroundSound.pause();
        if (!isPause) {
            isPause = true;
            ctx.drawImage(assets.pauseImg, 400,350);
            // Relance le jeu
        } else {
    
            isPause = false;
            backgroundSound.play();
            gameLoop();
        }

    }
}

//permet de reinitialiser la music au debut 
export function resetMusic() {
    backgroundSound.currentTime = 0;
}



function handleCollisionBallPaddle() {
    if (circRectsOverlap(paddle.x, paddle.y, paddle.width, paddle.height, ball.x, ball.y, ball.radius)) {
        if (ball.y < paddle.y) {
            //collision par le haut
            ball.dy = -ball.dy;
            // On remet au point de contact
            ball.y = paddle.y - ball.radius;
        } else if (ball.y > (paddle.y + paddle.height)) {
            // collision par le bas
            ball.dy = -ball.dy;
            // On remet au point de contact
            ball.y = paddle.y + paddle.height + ball.radius;
        } else if (ball.x < paddle.x) {
            //collision par la gauche
            ball.dx = -ball.dx;
            // On remet au point de contact
            ball.x = paddle.x - ball.radius;
        } else {
            // collision par la droite
            ball.dx = -ball.dx;
            // On remet au point de contact
            ball.x = paddle.x + paddle.width + ball.radius;
        }
        paddleHitSound.play();
    }
}

function handleCollisionBallBrick(brick) {
    if (circRectsOverlap(brick.x, brick.y, brick.width, brick.height, ball.x, ball.y, ball.radius)) {
        if (ball.y < brick.y) {
            //collision par le haut
            ball.dy = -ball.dy;
            // On remet au point de contact
            ball.y = brick.y - ball.radius;
        } else if (ball.y > (brick.y + brick.height)) {
            // collision par le bas
            ball.dy = -ball.dy;
            // On remet au point de contact
            ball.y = brick.y + brick.height + ball.radius;
        } else if (ball.x < brick.x) {
            //collision par la gauche
            ball.dx = -ball.dx;
            // On remet au point de contact
            ball.x = brick.x - ball.radius;
        } else {
            // collision par la droite
            ball.dx = -ball.dx;
            // On remet au point de contact
            ball.x = brick.x + brick.width + ball.radius;
        }
        brickHitSound.play();

        //si la balle touche la brique, on la supprime
        const index = tabBricks.indexOf(brick);
        tabBricks.splice(index, 1);

        // Ajoute un point
        score.addScore(1);
    }
}


function handleCollisionBonus(ball) {
    for (let i = 0; i < bonus.length; i++) {
        if (circRectsOverlap(bonus[i].x, bonus[i].y, bonus[i].width, bonus[i].height, ball.x, ball.y, ball.radius)) {
            const index = bonus.indexOf(bonus[i]);
            bonus.splice(index, 1);
            paddle.hasPaddleBonus = true;
        }
    }
}



//creer une function score qui a chaque fois que la ballle touche une brick ca ajoute un point 

function createBricks(nblinebrick,nbcolonebrick,spacelinebrick,spacecolonebrick,brickWidth, brickHeight, brickColor) {
    for (let l = 0; l < nblinebrick; l++) {
        for (let c = 0; c < nbcolonebrick; c++) {
            let x = l * (brickWidth + spacelinebrick ); 
            let y = c * (brickHeight + spacecolonebrick); 
            let b = new Brick(x, y, brickWidth, brickHeight, brickColor);
            tabBricks.push(b);
        }
    }
}

function random(min, max) {
    return Math.random() * (max - min) + min;
}




