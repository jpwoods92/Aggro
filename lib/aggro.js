import Player from './player.js'
import Gem from './gem.js'
import { randomTrack } from './random_track'
import { canvas, context, mousePos, camera } from './dom_elements'
import { time, currentTime, tick, startTime } from './time_calculation'

const pauseButton = document.getElementById('pause-button')
const music = new Audio(randomTrack())
const nameField = document.getElementById('name-field')
const startButton = document.getElementById('start-button')
const timer = document.getElementById('timer')
const welcome = document.getElementById('welcome-header')
const defaultCanvasWidth = 1200
const defaultCanvasHeight = 600
const midCanvasWidth = 2400
const midCanvasHeight = 1200
const maxCanvasWidth = 4800
const maxCanvasHeight = 2400
let paused = false
let musicStatus = true
export let player
const scoreText = document.getElementById('scoreData')

let endGameText = null

let gemsArray = []

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

function levelLogic (idx, level) {
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
    }
  }
}

function updateGems () {
  let level = Math.floor(time / 60)
  gemsArray.forEach((gem, idx) => {
    if (gem && gem.collision) {
      levelLogic(idx, level)
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
    nameField.style.cssText = 'display: block'
    endGameText = `you have starved to death, you survived for ${currentTime}`
    firebase.database().ref('scores').push({name: player.name, score: time})
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

let fetchScores = firebase.database().ref('scores').orderByChild('score').limitToLast(5)
let scores = []

function scoreSort (a, b) {
  if (a.score > b.score) {
    return -1
  } else if (a.score === b.score) {
    return 0
  } else return 1
}

fetchScores.on('child_added', snapshot => {
  scores.push(snapshot.val())
  scores = scores.sort(scoreSort)
  scores.length = Math.min(scores.length, 5)
})

function renderScores () {
  let pos = 10
  scores.forEach((el) => {
    pos += 20
    let rendered = el.name + ': ' + el.score
    context.font = '15px Arial'
    context.fillStyle = '#fff'
    context.fillText(rendered, 20, pos)
  })
}

function drawBorder () {
  context.strokeStyle = '#fff'
  context.lineWidth = 5
  context.strokeRect(-2.5 - camera.pos.x, -2.5 - camera.pos.y, 5005, 3755)
}

function animate () {
  if (paused) {
    requestAnimationFrame(animate)
    welcome.innerText = 'Paused'
    welcome.style.cssText = 'display: block'
    welcome.style.cssText = 'left: 770px'
    return null
  }
  context.clearRect(player.x - camera.pos.x - (canvas.width / 2) - 5, player.y - camera.pos.y - (canvas.height / 2) - 5, canvas.width + 10, canvas.height + 10)
  if (endGame()) {
    welcome.innerText = endGameText
    welcome.style.cssText = 'display: block'
    welcome.style.cssText = 'left: 570px'
  } else {
    welcome.style.cssText = 'display: none'
    resizeCanvas()
    context.fillStyle = 'transparent'
    context.fillRect(0, 0, canvas.width, canvas.height)
    updateGems()
    drawBorder()
    camera.updatePos()
    player.move()
    player.draw()
    tick()
    timer.innerText = `${currentTime}`
    scoreText.innerText = `${Math.floor(player.width)}`
    requestAnimationFrame(animate)
  }
  renderScores()
}

function handleStart () {
  startTime()
  let name = nameField.value || null
  player = new Player(name)
  nameField.style.cssText = 'display: none'
  welcome.style.cssText = 'display: none;'
  startButton.style.cssText = 'display: none;'
  gems(500)
  animate()
}

function handleMusic () {
  if (musicStatus) {
    musicStatus = false
    pauseButton.innerHTML = 'Play Music'
    music.pause()
  } else {
    pauseButton.innerHTML = 'Pause Music'
    musicStatus = true
    music.play()
  }
}

startButton.addEventListener('click', handleStart)
canvas.addEventListener('mousemove',
  (e) => {
    mousePos.x = e.clientX - canvas.offsetLeft - 160
    mousePos.y = e.clientY - canvas.offsetTop - 83
  })

document.addEventListener('DOMContentLoaded', function () {
  const playMusic = music.play()
  if (playMusic !== undefined) {
    playMusic.then(_ => {}).catch(() => {
      musicStatus = false
      pauseButton.innerText = 'Play Music'
      pauseButton.addEventListener('click', handleMusic)
    })
  }
  music.loop = true
})

function handlePauseGame (e) {
  if (e.key === 'p') {
    paused = !paused
  }
}

document.addEventListener('keypress', handlePauseGame)
pauseButton.addEventListener('click', handleMusic)
