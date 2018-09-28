const canvasContainer = document.getElementById('canvasContainer')
const canvas = document.getElementsByTagName('canvas')[0]
const defaultCanvasWidth = 1000
const defaultCanvasHeight = 500

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

  draw () {
    if (this.isCollidedWith(player)) {
      this.collideWith(player)
    }
    context.fillStyle = this.color
    context.fillRect(this.pos.x - camera.pos.x,
      this.pos.y - camera.pos.y,
      this.width, this.height)
    context.strokeStyle = '#000'
    context.strokeRect(this.pos.x - camera.pos.x,
      this.pos.y - camera.pos.y,
      this.width, this.height)
  }

  growPlayer () {
    if (player.width < player.maxSize) {
      player.width += this.value / 2
      player.height += this.value / 2
      player.maxSpeed.x -= 0.005
      player.maxSpeed.y -= 0.005
    } else {
      return null
    }
  }

  collideWith (otherObject) {
    if (otherObject instanceof Player) {
      this.collision = true
      this.growPlayer()
    }
  }

  isCollidedWith (otherObject) {
    if (this.pos.x < otherObject.x + (otherObject.width / 2) &&
      this.pos.x + this.width > otherObject.x - (otherObject.width / 2) &&
      this.pos.y < otherObject.y + (otherObject.height / 2) &&
      this.pos.y + this.height > otherObject.y - (otherObject.height / 2)) {
      return true
    }
  }
}

class Player {
  constructor () {
    this.x = canvas.width / 2
    this.y = canvas.height / 2
    this.speed = {x: 0, y: 0}
    this.maxSpeed = {x: 5, y: 5}
    this.width = 25
    this.height = 25
    this.maxSize = 1000
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
    if (this.width > 5 && this.width < 100) {
      this.width -= 0.02
      this.height -= 0.02
    } else {
      this.width -= 0.1
      this.height -= 0.1
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
let EnemiesArray = []
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
const background = new Background()
const player = new Player()
const gems = (num) => {
  for (let index = 0; index < num; index++) {
    let pos = {
      x: Math.floor(Math.random() * 4985),
      y: Math.floor(Math.random() * 3735)
    }
    let picker = Math.ceil(Math.random() * 50)
    let color, value
    if (picker < 2) {
      color = '#fff'
      value = 10
    } else if (picker > 1 && picker <= 5) {
      color = 'blue'
      value = 30
    } else if (picker > 5 && picker < 25) {
      color = 'red'
      value = 20
    } else {
      color = 'green'
      value = 10
    }
    gemsArray.push(new Gem(pos.x, pos.y, color, value))
  }
}

function updateGems () {
  gemsArray.forEach((gem, idx) => {
    if (gem.collision) {
      gemsArray.splice(idx, 1)
      gems(1)
    }
    gem.draw()
  })
}

function endGame () {
  alert('you have starved to death')
}

function resizeCanvas () {
  if (player.width > canvas.width / 4) {
    canvas.width += defaultCanvasWidth / 2
    canvas.height += defaultCanvasHeight / 2
  } else if (player.width < canvas.width / 10) {
    debugger
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
function animate () {
  if (player.width < 6) {
    endGame()
  } else {
    resizeCanvas()
    context.fillStyle = '#000'
    context.fillRect(0, 0, canvas.width, canvas.height)
    camera.updatePos()
    player.move()
    background.draw()
    player.draw()
    updateGems()
    requestAnimationFrame(animate)
  }
}
function start () {
  gems(500)
  animate()
}

start()

canvas.addEventListener('mousemove',
  (e) => {
    mousePos.x = e.clientX - canvas.offsetLeft
    mousePos.y = e.clientY - canvas.offsetTop
  })
