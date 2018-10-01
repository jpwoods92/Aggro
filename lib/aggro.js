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

class Enemy {
  constructor (x, y, color, size) {
    this.pos = {x: x, y: y}
    this.color = color
    this.width = size.width
    this.height = size.height
    this.collision = false
    this.dead = false
    this.speed = {x: 0, y: 0}
    this.maxSpeed = {x: 5, y: 5}
    this.maxSize = 1000
    this.color = randomColor()
    this.draw = this.draw.bind(this)
    this.dirX = 0
    this.dirY = 0
  }

  growObject (object) {
    if (object.width < object.maxSize) {
      object.width += this.width / 5
      object.height += this.height / 5
      object.maxSpeed.x -= 0.005
      object.maxSpeed.y -= 0.005
    } else {
      return null
    }
  }

  collideWith (otherObject) {
    if (this.width > otherObject.width) {
      if (otherObject instanceof Player || otherObject instanceof Enemy) {
        this.collision = true
        this.dead = false
        player.dead = true
      }
    } else {
      this.collision = true
      this.dead = true
      this.growObject(otherObject)
    }
  }

  notice (otherObject) {
    if (this.pos.x - this.width < otherObject.x &&
      this.pos.x + this.width + this.width > otherObject.x + otherObject.width &&
      this.pos.y - this.height < otherObject.y &&
      this.pos.y + this.height + this.height > otherObject.y + otherObject.height) {
      return true
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

  pursue (otherObject) {
    this.dirX = otherObject.x
    this.dirY = otherObject.y
    this.speed.x += (this.pos.x - this.dirX) / this.dirX
    if (Math.abs(this.speed.x) > this.maxSpeed.x) {
      this.speed.x = Math.sign(this.speed.x) * this.maxSpeed.x
    }
    this.speed.y += (this.pos.y - this.dirY) / this.dirY
    if (Math.abs(this.speed.y) > this.maxSpeed.y) {
      this.speed.y = Math.sign(this.speed.y) * this.maxSpeed.y
    }
  }

  flee (otherObject) {
    this.dirX = this.pos.x + otherObject.x
    this.dirY = this.pos.y + otherObject.y
    this.speed.x += (this.pos.x - this.dirX) / this.dirX
    if (Math.abs(this.speed.x) > this.maxSpeed.x) {
      this.speed.x = Math.sign(this.speed.x) * this.maxSpeed.x
    }
    this.speed.y += (this.pos.y - this.dirY) / this.dirY
    if (Math.abs(this.speed.y) > this.maxSpeed.y) {
      this.speed.y = Math.sign(this.speed.y) * this.maxSpeed.y
    }
  }

  move () {
    this.dirX = Math.floor(Math.random() * 5000) + this.width
    this.dirY = Math.floor(Math.random() * 3750) + this.height
    this.speed.x += (this.pos.x - this.dirX) / this.dirX
    if (Math.abs(this.speed.x) > this.maxSpeed.x) {
      this.speed.x = Math.sign(this.speed.x) * this.maxSpeed.x
    }
    this.speed.y += (this.pos.y - this.dirY) / this.dirY
    if (Math.abs(this.speed.y) > this.maxSpeed.y) {
      this.speed.y = Math.sign(this.speed.y) * this.maxSpeed.y
    }
  }

  draw () {
    if (this.notice(player)) {
      if (this.width > player.width) {
        this.pursue(player)
      } else {
        this.flee(player)
      }
    } else {
      setTimeout(this.move(), 8000)
    }
    if (this.isCollidedWith(player)) {
      this.collideWith(player)
    }
    if (this.pos.x < 0) {
      this.pos.x = 0 + this.width
      this.speed.x = 0
    }
    if (this.pos.y < 0) {
      this.pos.y = 0 + this.height
      this.speed.y = 0
    }
    if (this.pos.x + this.width > 5000) {
      this.pos.x = 5000 - this.width
      this.speed.x = 0
    }
    if (this.pos.y + this.height > 3750) {
      this.pos.y = 3750 - this.height
      this.speed.y = 0
    }
    this.pos.x += this.speed.x
    this.pos.y += this.speed.y
    context.fillStyle = this.color
    context.fillRect(this.pos.x - camera.pos.x,
      this.pos.y - camera.pos.y,
      this.width, this.height)
    context.strokeStyle = '#000'
    context.strokeRect(this.pos.x - camera.pos.x,
      this.pos.y - camera.pos.y,
      this.width, this.height)
  }
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
      object.maxSpeed.x -= 0.002
      object.maxSpeed.y -= 0.002
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

  collideWithEnemy () {
    enemiesArray.forEach((enemy) => {
      if (this.isCollidedWith(enemy)) {
        this.collideWith(enemy)
      }
    })
  }

  draw () {
    if (this.isCollidedWith(player)) {
      this.collideWith(player)
    }
    this.collideWithEnemy()
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
    this.maxSpeed = {x: 5, y: 5}
    this.width = 35
    this.height = 35
    this.maxSize = 1000
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
    if (this.width > 5 && this.width < 500) {
      this.width -= 0.02
      this.height -= 0.02
      this.maxSpeed.x = 5
      this.maxSpeed.y = 5
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
let enemiesArray = []
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
const background = new Background()
const player = new Player()
const enemies = (num) => {
  for (let index = 0; index < num; index++) {
    let pos = {
      x: Math.floor(Math.random() * 4200) + 1200,
      y: Math.floor(Math.random() * 3000) + 600
    }
    let color = randomColor()
    let value = Math.floor((Math.random()) * 700) + 25
    let size = {
      width: value,
      height: value
    }
    enemiesArray.push(new Enemy(pos.x, pos.y, color, size))
  }
}
const gems = (num) => {
  for (let index = 0; index < num; index++) {
    let pos = {
      x: Math.floor(Math.random() * 4985),
      y: Math.floor(Math.random() * 3735)
    }
    let picker = Math.ceil(Math.random() * 50)
    let color, value
    if (picker < 2) {
      color = '#858EFF'
      value = 10
    } else if (picker > 1 && picker <= 5) {
      color = '#FFE400'
      value = 3
    } else if (picker > 5 && picker < 25) {
      color = '#7A993B'
      value = 2
    } else {
      color = '#90CC14'
      value = 1
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

function updateEnemies () {
  enemiesArray.forEach((enemy, idx) => {
    if (enemy.collision && enemy.dead) {
      enemiesArray.splice(idx, 1)
      enemies(1)
    } else {
      enemy.draw()
    }
  })
}

function handleClick () {
  document.location.reload()
}

function endGame () {
  if (player.dead) {
    endGameText = ('you have been eaten, click anywhere to try again')
    canvas.addEventListener('click', handleClick)
    return endGameText
  } else if (player.width < 6) {
    endGameText = ('you have starved to death, click anywhere to try again')
    canvas.addEventListener('click', handleClick)
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
function animate () {
  if (endGame()) {
    context.font = 'Noto Sans'
    context.fillStyle = '#000'
    context.fillText(endGameText, player.x - camera.pos.x - 100, player.y - camera.pos.y - 50)
  } else {
    resizeCanvas()
    context.fillStyle = '#000'
    context.fillRect(0, 0, canvas.width, canvas.height)
    background.draw()
    updateGems()
    updateEnemies()
    camera.updatePos()
    player.move()
    player.draw()
    scoreText.innerText = `${Math.floor(player.width)}`
    requestAnimationFrame(animate)
  }
}

function start () {
  gems(500)
  enemies(5)
  animate()
}

start()

canvas.addEventListener('mousemove',
  (e) => {
    mousePos.x = e.clientX - canvas.offsetLeft
    mousePos.y = e.clientY - canvas.offsetTop
  })
