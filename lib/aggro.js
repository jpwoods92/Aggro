const canvasContainer = document.getElementById('canvasContainer')
const canvas = document.getElementsByTagName('canvas')[0]
const startButton = document.getElementById('startButton')
const timer = document.getElementById('timer')
const defaultCanvasWidth = 1000
const defaultCanvasHeight = 500
let startTime, endTime, currentTime, calculatedTime

class Background {
  constructor () {
    this.x = 0
    this.y = 0
    this.background = new Image()
    this.background.src = 'lib/images/geometric-background.png'
    this.draw = this.draw.bind(this)
  }

  draw () {
    context.drawImage(this.background,
      this.x - camera.pos.x, this.y - camera.pos.y)
  }
}

function randomColor () {
  const hexDigits = '0123456789ABCDEF'

  let color = '#'
  for (let i = 0; i < 3; i++) {
    color += hexDigits[Math.floor((Math.random() * 16))]
  }

  return color
}

class Gem {
  constructor (x, y, color, value) {
    this.pos = {x: x, y: y}
    this.color = color
    this.width = 15
    this.height = 15
    this.value = value
    this.collision = false
    this.draw = this.draw.bind(this)
  }

  growObject (object) {
    if (object.width < object.maxSize) {
      object.width += this.value / 2
      object.height += this.value / 2
    } else {
      return null
    }
  }

  collideWith (otherObject) {
    this.collision = true
    this.growObject(otherObject)
  }

  isCollidedWith (otherObject) {
    if (this.pos.x < otherObject.x + (otherObject.width / 2) &&
    this.pos.x + this.width > otherObject.x - (otherObject.width / 2) &&
    this.pos.y < otherObject.y + (otherObject.height / 2) &&
    this.pos.y + this.height > otherObject.y - (otherObject.height / 2)) {
      return true
    }
  }

  draw () {
    if (this.isCollidedWith(player)) {
      this.collideWith(player)
    }
    context.fillStyle = this.color
    context.fillRect(this.pos.x - camera.pos.x,
      this.pos.y - camera.pos.y,
      this.width, this.height)
    context.strokeStyle = '#000'
    context.lineWidth = 1
    context.strokeRect(this.pos.x - camera.pos.x,
      this.pos.y - camera.pos.y,
      this.width, this.height)
  }
}

class Player {
  constructor () {
    this.x = canvas.width / 2
    this.y = canvas.height / 2
    this.speed = {x: 0, y: 0}
    this.maxSpeed = {x: 3, y: 3}
    this.width = 35
    this.height = 35
    this.maxSize = 1500
    this.dead = false
    this.color = randomColor()
    this.draw = this.draw.bind(this)
    this.shrink = this.shrink.bind(this)
  }

  move () {
    let centerX = canvasContainer.offsetWidth / 2
    let centerY = canvasContainer.offsetHeight / 2
    this.speed.x += (mousePos.x - centerX) / centerX
    if (Math.abs(this.speed.x) > this.maxSpeed.x) {
      this.speed.x = Math.sign(this.speed.x) * this.maxSpeed.x
    }
    this.speed.y += (mousePos.y - centerY) / centerY
    if (Math.abs(this.speed.y) > this.maxSpeed.y) {
      this.speed.y = Math.sign(this.speed.y) * this.maxSpeed.y
    }
  }
  shrink () {
    let level = Math.floor((Math.abs(startTime - endTime) / 1000) / 60)
    if (level < 2) {
      this.width -= 0.02
      this.height -= 0.02
      this.maxSpeed.x = 3
      this.maxSpeed.y = 3
    } else if (level > 2 && level < 5) {
      this.width -= 0.05
      this.height -= 0.05
      this.maxSpeed.x = 5
      this.maxSpeed.y = 5
      this.maxSize = 800
    } else {
      this.width -= 0.1
      this.height -= 0.1
      this.maxSpeed.x = 7
      this.maxSpeed.y = 7
      this.maxSize = 500
    }
  }

  draw () {
    this.shrink()
    if (this.x - (this.width / 2) < 0) {
      this.x = 0 + (this.width / 2)
      this.speed.x = 0
    }
    if (this.y - (this.height / 2) < 0) {
      this.y = 0 + (this.height / 2)
      this.speed.y = 0
    }
    if (this.x + (this.width / 2) > 5000) {
      this.x = 5000 - (this.width / 2)
      this.speed.x = 0
    }
    if (this.y + (this.height / 2) > 3750) {
      this.y = 3750 - (this.height / 2)
      this.speed.y = 0
    }
    this.x += this.speed.x
    this.y += this.speed.y
    context.fillStyle = this.color
    context.fillRect(this.x - camera.pos.x - (this.width / 2),
      this.y - camera.pos.y - (this.height / 2),
      this.width, this.height)
    context.strokeStyle = '#000'
    context.strokeRect(this.x - camera.pos.x - (this.width / 2),
      this.y - camera.pos.y - (this.height / 2),
      this.width, this.height)
  }
}
// GAME LOGIC //
let gemsArray = []
const context = canvas.getContext('2d')
const mousePos = {x: 0, y: 0}
const camera = {
  pos: {x: 0, y: 0},
  updatePos: function () {
    this.pos.x = player.x - (canvas.width / 2)
    this.pos.y = player.y - (canvas.height / 2)
  }
}
let endGameText = null
const scoreText = document.getElementById('scoreData')

let background = new Background()
let player = new Player()
const gems = (num, difficulty = null) => {
  for (let index = 0; index < num; index++) {
    let pos = {
      x: Math.floor(Math.random() * 4985),
      y: Math.floor(Math.random() * 3735)
    }
    let picker = Math.ceil(Math.random() * 50)
    let color, value
    if (picker < 2) {
      color = '#858EFF'
      value = 100
    } else if (picker > 1 && picker <= 5) {
      color = '#FFE400'
      value = 30
    } else if (picker > 5 && picker < 25) {
      color = '#7A993B'
      value = 20
    } else if (difficulty) {
      color = 'red'
      value = -10
    } else {
      color = '#90CC14'
      value = 10
    }
    gemsArray.push(new Gem(pos.x, pos.y, color, value))
  }
}

function levelLogic (gem, idx, difficulty) {
  let roll = Math.ceil(Math.random() * 10)
  if (difficulty <= 1) {
    if (gem.collision) {
      gemsArray.splice(idx, 1)
      gems(1)
    }
    gem.draw()
  } else if (difficulty > 1 && difficulty <= 2) {
    if (gem.collision) {
      gemsArray.splice(idx, 1)
      if (roll > 5) {
        gems(1)
      }
    }
    gem.draw()
  } else if (difficulty > 2 && difficulty < 5) {
    if (gem.collision) {
      gemsArray.splice(idx, 1)
      if (roll > 7) {
        gems(1)
      } else {
        gems(1, difficulty)
      }
    }
    gem.draw()
  } else if (difficulty >= 5) {
    if (gem.collision) {
      gemsArray.splice(idx, 1)
      gems(1, difficulty)
      if (roll > 9) {
        gems(3)
      } else {
        gems(1, difficulty)
      }
    }
    gem.draw()
  }
}

function updateGems () {
  let level = Math.floor((Math.abs(startTime - endTime) / 1000) / 60)
  gemsArray.forEach((gem, idx) => {
    levelLogic(gem, idx, level)
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
  if (player.width > canvas.width / 4) {
    canvas.width += defaultCanvasWidth / 2
    canvas.height += defaultCanvasHeight / 2
  } else if (player.width < canvas.width / 10) {
    if (canvas.width > defaultCanvasWidth) {
      canvas.width -= canvas.width / 2
      canvas.heigth -= canvas.height / 2
    } else {
      canvas.width = defaultCanvasWidth
      canvas.height = defaultCanvasHeight
    }
  } else {
    return null
  }
}

function secondsToHms (d) {
  d = Number(d)
  let h = Math.floor(d / 3600)
  let m = Math.floor(d % 3600 / 60)
  let s = Math.floor(d % 3600 % 60)

  let mDisplay = m > 0 ? m + (m == 1 ? ' minute, ' : ' minutes, ') : ''
  let sDisplay = s > 0 ? s + (s == 1 ? ' second' : ' seconds') : ''
  return mDisplay + sDisplay
}

function tick () {
  endTime = new Date()
  calculatedTime = Math.abs(startTime - endTime) / 1000
  currentTime = secondsToHms(calculatedTime)
}

function animate () {
  if (endGame()) {
    context.font = '30px Arial'
    context.fillStyle = '#fff'
    context.textAlign = 'center'
    context.fillText(endGameText, player.x - camera.pos.x, player.y - camera.pos.y - 50)
  } else {
    resizeCanvas()
    context.fillStyle = '#000'
    context.fillRect(0, 0, canvas.width, canvas.height)
    background.draw()
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
  startTime = new Date()
  background = new Background()
  player = new Player()
  startButton.style.cssText = 'display: none;'
  gems(500)
  animate()
}

startButton.addEventListener('click', handleStart)
canvas.addEventListener('mousemove',
  (e) => {
    mousePos.x = e.clientX - canvas.offsetLeft
    mousePos.y = e.clientY - canvas.offsetTop
  })
