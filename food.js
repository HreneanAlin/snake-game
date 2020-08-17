import {onSnake, expandSnake} from "./snake.js";
import {randomGridPosition, getGridSize} from "./grid.js";

let food = getRandomFoodPosition()
let otherFood = getOtherPosition()
let specialFood = getSpecialFoodPosition()
let poisonFood = getPoisonFoodPosition()
let specialMoment = false
let positionDirectionUp = true
let badMoment = true
const EXPANSION_RATE = 1
const SPECIAL_EXPANSION_RATE = EXPANSION_RATE + 2


export function update() {
    if (onSnake(food)) {
        expandSnake(EXPANSION_RATE)
        food = getRandomFoodPosition()
        if (specialTime()) specialMoment = true
        tryDrawPoisonFood()
    }

    if (onSnake(otherFood)) {
        expandSnake(EXPANSION_RATE)
        otherFood = getOtherPosition()
        if (specialTime()) specialMoment = true
        tryDrawPoisonFood()
    }

    if (onSnake(specialFood)) {
        expandSnake(SPECIAL_EXPANSION_RATE)
        specialMoment = false
        specialFood = getSpecialFoodPosition()
        tryDrawPoisonFood()
    }


}

function tryDrawPoisonFood() {
    if (batTime()) {
        if (badMoment) {
            badMoment = false
        } else {
            badMoment = true
            poisonFood = getPoisonFoodPosition()
        }

    }

}

function batTime() {
    let randomNumber = Math.floor(Math.random() * 1) + 1
    let otherRandomNumber = Math.floor(Math.random() * 1) + 1
    if (randomNumber !== otherRandomNumber) return false
    return true

}

function specialTime() {
    let randomNumber = Math.floor(Math.random() * 3) + 1
    let otherRandomNumber = Math.floor(Math.random() * 3) + 1
    if (randomNumber !== otherRandomNumber) return false
    return true

}

export function draw(gameBoard) {

    const foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add('food')
    gameBoard.appendChild(foodElement)


}

export function drawOtherFood(gameBoard) {
    const foodElement = document.createElement('div')
    foodElement.style.gridRowStart = otherFood.y
    foodElement.style.gridColumnStart = otherFood.x
    foodElement.classList.add('food')
    gameBoard.appendChild(foodElement)

}

export function drawSpecialFood(gameBoard) {
    if (!specialMoment) return
    const specialFoodElement = document.createElement('div')
    specialFoodElement.style.gridRowStart = specialFood.y
    specialFoodElement.style.gridColumnStart = specialFood.x
    specialFoodElement.classList.add('special-food')
    gameBoard.appendChild(specialFoodElement)

}

export function drawPoisonFood(gameBoard) {
    if (!badMoment) return
    $('div').removeClass('poison-food')
    const poisonElement = document.createElement('div')
    poisonElement.style.gridRowStart = poisonFood.y
    poisonElement.style.gridColumnStart = poisonFood.x
    poisonElement.classList.add('poison-food')
    gameBoard.appendChild(poisonElement)
    movePoisonElement()
}

function movePoisonElement() {
    let number = Math.floor(Math.random()*2)+1
    if (number ===1) positionDirectionUp = false
    else positionDirectionUp = true
    if(!positionDirectionUp) {
        if (poisonFood.x > 1) {
            poisonFood.x -= 1
        } else {
            poisonFood.x += getGridSize()
        }
    }else {
        if (poisonFood.y > 1) {
            poisonFood.y -= 1
        } else {
            poisonFood.y += getGridSize()
        }
    }

}

function getSpecialFoodPosition() {
    let specialPosition = getOtherPosition()
    if (specialPosition === otherFood) getSpecialFoodPosition()
    return specialPosition

}

function getOtherPosition() {
    let otherPosition = randomGridPosition();
    if (otherPosition === food || otherPosition == null || onSnake(otherPosition)) getOtherPosition()
    return otherPosition
}


function getRandomFoodPosition() {
    let newFoodposition
    while (newFoodposition == null || onSnake(newFoodposition)) {
        newFoodposition = randomGridPosition()
    }
    return newFoodposition
}

function getPoisonFoodPosition() {
    let poisonPosition = randomGridPosition();
    if (poisonPosition === otherFood || poisonPosition === specialFood) getSpecialFoodPosition()
    return poisonPosition
}

export function getPoisonFood() {
    return poisonFood
}

