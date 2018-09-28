class InitialBackground {
  constructor () {
    this.canvasWidth = 0
    this.canvasHeight = 0
    this.x = this.canvasWidth / 2
    this.y = this.canvasHeight / 2
    this.background = new Image()
    this.background.src = 'lib/images/geometric-background.png'
  }
}

class Background extends InitialBackground {
  constructor (context, canvasWidth, canvasHeight) {
    super(canvasWidth, canvasHeight)
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    this.context = context
    this.draw = this.draw.bind(this)
  }

  draw () {
    this.context.drawImage(this.background, this.x - camera.pos.x, this.y - camera.pos.y)
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
    this.width = 5
    this.height = 5
    this.value = value
    this.draw = this.draw.bind(this)
  }

  draw () {
    context.fillStyle = this.color
    debugger
    context.fillRect(this.pos.x - camera.pos.x, this.pos.y - camera.pos.y, this.width, this.height)
    context.strokeStyle = '#000'
    context.strokeRect(this.pos.x - camera.pos.x, this.pos.y - camera.pos.y, this.width, this.height)
  }
}

class Snake {
  constructor () {
    this.x = canvas.width / 2
    this.y = canvas.height / 2
    this.speed = {x: 0, y: 0}
    this.maxSpeed = {x: 5, y: 5}
    this.width = 20
    this.height = 20
    this.color = randomColor()
    this.draw = this.draw.bind(this)
  }

  move () {
    let centerX = canvas.width / 2
    let centerY = canvas.height / 2
    this.speed.x += (mousePos.x - centerX) / centerX
    if (Math.abs(this.speed.x) > this.maxSpeed.x) {
      this.speed.x = Math.sign(this.speed.x) * this.maxSpeed.x
    }
    this.speed.y += (mousePos.y - centerY) / centerY
    if (Math.abs(this.speed.y) > this.maxSpeed.y) {
      this.speed.y = Math.sign(this.speed.y) * this.maxSpeed.y
    }
  }

  collideWith (otherObject) {
    // default do nothing
  }

  draw () {
    if (this.x < 0) {
      this.x = 0
      this.speed.x = 0
    }
    if (this.y < 0) {
      this.y = 0
      this.speed.y = 0
    }
    if (this.x + this.width > 5000) {
      this.x = 5000 - this.width
      this.speed.x = 0
    }
    if (this.y + this.height > 3750) {
      this.y = 3750 - this.height
      this.speed.y = 0
    }
    this.x += this.speed.x
    this.y += this.speed.y
    context.fillStyle = this.color
    context.fillRect(this.x - camera.pos.x, this.y - camera.pos.y, this.width, this.height)
    context.strokeStyle = '#000'
    context.strokeRect(this.x - camera.pos.x, this.y - camera.pos.y, this.width, this.height)
  }

  isCollidedWith (otherObject) {
    // add collision check logic here
  }

  // remove () {
  //   this.game.remove(this)
  // }
}

const canvas = document.getElementsByTagName('canvas')[0]
let snakesArray = []
let gemsArray = []
const context = canvas.getContext('2d')
const mousePos = {x: 0, y: 0}
const camera = {
  pos: {x: 0, y: 0},
  updatePos: function () {
    this.pos.x = snake.x - canvas.width / 2
    this.pos.y = snake.y - canvas.height / 2
  }
}
const background = new Background(context, canvas.width, canvas.height)
const snake = new Snake()
const gems = (num) => {
  debugger
  for (let index = 0; index < num; index++) {
    let pos = {
      x: Math.ceil(Math.random() * 5000),
      y: Math.ceil(Math.random() * 3750)
    }
    let picker = Math.ceil(Math.random() * 30)
    let color, value
    if (picker < 5) {
      color = 'blue'
      value = 50
    } else if (picker > 5 && picker < 15) {
      color = 'red'
      value = 20
    } else {
      color = 'green'
      value = 5
    }
    gemsArray.push(new Gem(pos.x, pos.y, color, value))
  }
}

function start () {
  gems(30)
  animate()
}

function animate () {
  context.fillStyle = '#000'
  context.fillRect(0, 0, canvas.width, canvas.height)
  camera.updatePos()
  snake.move()
  background.draw()
  snake.draw()
  gemsArray.forEach((gem, idx) => {
    if (gem.pos.x - camera.pos.x < 0 || gem.pos.x - camera.pos.x > canvas.width) {
      gemsArray.splice(idx, 1)
      gems(1)
    } else if (gem.pos.y - camera.pos.y < 0 || gem.pos.y + gem.height - camera.pos.y > canvas.height) {
      gemsArray.splice(idx, 1)
      gems(1)
    } else {
      gem.draw()
    }
  })
  requestAnimationFrame(animate)
}

start()

canvas.addEventListener('mousemove',
  (e) => {
    mousePos.x = e.clientX - canvas.offsetLeft
    mousePos.y = e.clientY - canvas.offsetTop
  })
