import { context, player, camera } from './aggro'

export default class Gem {
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
  }
}
