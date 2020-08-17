import {
    update as updateSanke,
    draw as drawSnake,
    getSnakeHead,
    snakeIntersection,
    getCurentScore,
    onSnake


} from "./snake.js";
import {update as updateFood, draw as drawFood} from "./food.js";
import {outsideGrid} from "./grid.js";
import {drawOtherFood, drawSpecialFood, drawPoisonFood, getPoisonFood} from "./food.js";

let snakeSpeed = 0
let lastRenderTime = 0
const gameBoard = document.getElementById('game-board')
const scoreContainer = document.getElementById('score')
let gameOver = false
let pause = false


$(document).ready(() => {
    let difLevelSelector = $('#dif-level')
    snakeSpeed = difLevelSelector.val()

    difLevelSelector.change(() => {
        snakeSpeed = difLevelSelector.val()

    })


    $('#btn-start').click(() => {
        $('.game-menu').fadeOut('slow')
        window.requestAnimationFrame(main)

    })

    $(window).keyup(e => {
        if (e.key === 'p' || e.key === 'P') {
            if (!pause) {
                pause = true
            } else pause = false

        }


    })


})


function main(currentTime) {
    if (snakeSpeed === 0) return;

    if (gameOver) {
        if (confirm('You Lost. Press OK to restart')) {
            window.location = 'http://www.scs.ubbcluj.ro/~haci0197/snakeGame/snake.html'
        }
        return;
    }

    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender < 1 / snakeSpeed) return

    lastRenderTime = currentTime
    if (!pause) {
        update()
        draw()
        getScore()
    }

}


function update() {

    updateSanke()
    updateFood()
    checkDeath()

}

function draw() {

    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
    if (getCurentScore() >= 5) drawOtherFood(gameBoard)
    drawSpecialFood(gameBoard)
    drawPoisonFood(gameBoard)

}


function checkDeath() {

    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection() || onSnake(getPoisonFood())

}

function getScore() {

    scoreContainer.innerText = `${getCurentScore()}`
}
