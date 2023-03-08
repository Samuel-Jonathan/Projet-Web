import Ball from "./ball.js";
import Paddle from "./Paddle.js";
import Brick from "./bricks.js";
import Bonus from "./Bonus.js";
import { circRectsOverlap } from "./collisions.js";
import * as assets from "./Assets.js";
import Score from "./Score.js";
export let loop;

let tabBricks = [];
let canvas, ctx;
let paddle, ball;
let score = 0;
let bonus = new Array();
window.onload = init();


var isPause = false;


export function init() {
    isPause = false;
    tabBricks = [];
    console.log("page chargée");
    canvas = document.querySelector("#gameCanvas");
    ctx = canvas.getContext("2d");
    // Crée la balle
    ball = new Ball(canvas.width / 2, canvas.height - 80, 10, "blue", 6, -6);
    // Crée la raquette
    paddle = new Paddle(assets.paddleImg, 75, canvas.height - 50, 100, 10, 10);
    // Crée les briques
    createBricks(100, 10, "#ff4af6");
    // Crée le score
    score = new Score(500, 500, 0);

    // Évènements de la raquette
    document.addEventListener("keydown", paddle.handleKeyDown.bind(paddle));
    document.addEventListener("keyup", paddle.handleKeyUp.bind(paddle));

    // Pause du jeu
    window.addEventListener("keydown", pause);
    loop = requestAnimationFrame(gameLoop);
}

function gameLoop() {
    window.cancelAnimationFrame(loop);
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
  
    loop = (!isPause) ? requestAnimationFrame(gameLoop) : 0;

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
        if (!isPause) {
            isPause = true;
            // Relance le jeu
        } else {
            isPause = false;
            gameLoop();
        }

    }
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
        //si la balle touche la brique, on la supprime
        const index = tabBricks.indexOf(brick);
        score.addScore(1);
        tabBricks.splice(index, 1);
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

function createBricks(brickWidth, brickHeight, brickColor) {
    for (let l = 0; l < 9; l++) {
        for (let c = 0; c < 9; c++) {
            let x = l * (brickWidth + 10); // Add 10 pixels of spacing between bricks
            let y = c * (brickHeight + 20); // Add 20 pixels of spacing between rows of bricks
            let b = new Brick(x, y, brickWidth, brickHeight, brickColor);
            tabBricks.push(b);
        }
    }
}

function random(min, max) {
    return Math.random() * (max - min) + min;
}




