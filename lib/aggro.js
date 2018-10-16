import Player from './player.js'
import Gem from './gem.js'

export const canvasContainer = document.getElementById('canvasContainer')
export const canvas = document.getElementsByTagName('canvas')[0]
export const context = canvas.getContext('2d')
export const startButton = document.getElementById('startButton')
export const timer = document.getElementById('timer')
export const welcome = document.getElementById('welcome-header')
export const defaultCanvasWidth = 1200
export const defaultCanvasHeight = 600
export const midCanvasWidth = 2400
export const midCanvasHeight = 1200
export const maxCanvasWidth = 4800
export const maxCanvasHeight = 2400
export let player = new Player()
const scoreText = document.getElementById('scoreData')

let endGameText = null
let time, currentTime
let count = 0

export const randomColor = function () {
  const colors = ['#050D7F', '#0794DB', '#00BFEC', '#1CD0F8', '#1A649C']
  return colors[Math.floor(Math.random() * colors.length)]
}

let gemsArray = []
export const mousePos = {x: 0, y: 0}
export const camera = {
  pos: {x: 0, y: 0},
  updatePos: function () {
    this.pos.x = player.x - (canvas.width / 2)
    this.pos.y = player.y - (canvas.height / 2)
  }
}

const gems = (num, difficulty = null) => {
  for (let index = 0; index < num; index++) {
    let pos = {
      x: Math.floor(Math.random() * 4985),
      y: Math.floor(Math.random() * 3735)
    }
    let picker = Math.ceil(Math.random() * 50)
    let color, value
    if (picker < 2) {
      color = '#7B85AD'
      value = 15
    } else if (picker > 1 && picker <= 5) {
      color = '#515E91'
      value = 6
    } else if (picker > 5 && picker < 25) {
      color = '#172457'
      value = 4
    } else if (difficulty) {
      color = 'red'
      value = -10
    } else {
      color = '#303C74'
      value = 2
    }
    gemsArray.push(new Gem(pos.x, pos.y, color, value))
  }
}

function levelLogic (gem, idx, level) {
  let roll = Math.ceil(Math.random() * 10)
  if (level <= 1) {
    gemsArray[idx] = null
    gems(1)
  } else if (level > 1 && level <= 2) {
    gemsArray[idx] = null
    if (roll > 5) {
      gems(1)
    }
  } else if (level > 2 && level < 5) {
    gemsArray[idx] = null
    if (roll > 7) {
      gems(1)
    } else {
      gems(1, level)
    }
  } else if (level >= 5) {
    gemsArray[idx] = null
    gems(1, level)
    if (roll > 9) {
      gems(3)
    } else {
      gems(1)
    }
  }
}

function updateGems () {
  let level = Math.floor(time / 60)
  gemsArray.forEach((gem, idx) => {
    if (gem && gem.collision) {
      levelLogic(gem, idx, level)
    } else if (gem) {
      gem.draw()
    }
  })
}

function endGame () {
  if (player.width < 1) {
    startButton.innerText = 'retry'
    startButton.addEventListener('click', handleStart)
    startButton.style.cssText = 'display: block;'
    endGameText = `you have starved to death, you survived for ${currentTime}`
    gemsArray = []
    return endGameText
  } else {
    return null
  }
}

function resizeCanvas () {
  if (player.width > 400 && player.width < 700 && canvas.width !== midCanvasWidth) {
    canvas.height = midCanvasHeight
    canvas.width = midCanvasWidth
  } else if (player.width > 700 && canvas.width !== maxCanvasWidth) {
    canvas.height = maxCanvasHeight
    canvas.width = maxCanvasWidth
  } else if (player.width < 350 && canvas.width !== defaultCanvasWidth) {
    canvas.height = defaultCanvasHeight
    canvas.width = defaultCanvasWidth
  } else {
    return null
  }
}

function secondsToHms (d) {
  d = Number(d)
  let h = Math.floor(d / 3600)
  let m = Math.floor(d % 3600 / 60)
  let s = Math.floor(d % 3600 % 60)

  let hDisplay = h > 0 ? h + (h === 1 ? ' h, ' : " h's, ") : ''
  let mDisplay = m > 0 ? m + (m === 1 ? ' min, ' : " min's, ") : ''
  let sDisplay = s > 0 ? s + 's' : ''
  return hDisplay + mDisplay + sDisplay
}

function tick () {
  count += 1
  if (count === 60) {
    time += 1
    count = 0
  }
  currentTime = secondsToHms(time)
}

function animate () {
  context.clearRect(player.x - camera.pos.x - (canvas.width / 2) - 5, player.y - camera.pos.y - (canvas.height / 2) - 5, canvas.width + 10, canvas.height + 10)
  if (endGame()) {
    context.font = '30px Arial'
    context.fillStyle = '#fff'
    context.textAlign = 'center'
    context.fillText(endGameText, player.x - camera.pos.x, player.y - camera.pos.y - 50)
  } else {
    resizeCanvas()
    context.fillStyle = 'transparent'
    context.fillRect(0, 0, canvas.width, canvas.height)
    updateGems()
    camera.updatePos()
    player.move()
    player.draw()
    tick()
    timer.innerText = `${currentTime}`
    scoreText.innerText = `${Math.floor(player.width)}`
    requestAnimationFrame(animate)
  }
}

function handleStart () {
  time = 0
  player = new Player()
  welcome.style.cssText = 'display: none;'
  startButton.style.cssText = 'display: none;'
  gems(500)
  animate()
}

startButton.addEventListener('click', handleStart)
canvas.addEventListener('mousemove',
  (e) => {
    mousePos.x = e.clientX - canvas.offsetLeft - 160
    mousePos.y = e.clientY - canvas.offsetTop - 83
  })
