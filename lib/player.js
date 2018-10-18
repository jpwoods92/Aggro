import { randomColor } from './random_color'
import { canvas, canvasContainer, context, camera, mousePos } from './dom_elements'
import { time } from './time_calculation'
export default class Player {
  constructor (name = 'guest') {
    this.name = name
    this.x = canvas.width / 2
    this.y = canvas.height / 2
    this.speed = {x: 0, y: 0}
    this.maxSpeed = {x: 3, y: 3}
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
    this.speed.x += (mousePos.x - centerX) / (centerX)
    if (Math.abs(this.speed.x) > this.maxSpeed.x) {
      this.speed.x = Math.sign(this.speed.x) * this.maxSpeed.x
    }
    this.speed.y += (mousePos.y - centerY) / (centerY)
    if (Math.abs(this.speed.y) > this.maxSpeed.y) {
      this.speed.y = Math.sign(this.speed.y) * this.maxSpeed.y
    }
  }

  shrink () {
    let level = Math.floor(time / 60)
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
    } else {
      this.width -= 0.1
      this.height -= 0.1
      this.maxSpeed.x = 7
      this.maxSpeed.y = 7
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
  }
}
