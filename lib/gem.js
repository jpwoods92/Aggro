import { context, camera } from './dom_elements'
import { player } from './aggro'
import { time } from './time_calculation'
export default class Gem {
  constructor (x, y, color, value) {
    this.pos = {x: x, y: y}
    this.color = color
    this.speed = {x: x, y: y}
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

  detectPlayer (otherObject) {
    if (this.pos.x - 200 < otherObject.x + (otherObject.width / 2) &&
      this.pos.x + this.width + 200 > otherObject.x - (otherObject.width / 2) &&
      this.pos.y - 200 < otherObject.y + (otherObject.height / 2) &&
      this.pos.y + this.height + 200 > otherObject.y - (otherObject.height / 2)) {
      return true
    }
  }

  detectClose (otherObject) {
    if (this.pos.x - 50 < otherObject.x + (otherObject.width / 2) &&
      this.pos.x + this.width + 50 > otherObject.x - (otherObject.width / 2) &&
      this.pos.y - 50 < otherObject.y + (otherObject.height / 2) &&
      this.pos.y + this.height + 50 > otherObject.y - (otherObject.height / 2)) {
      return true
    }
  }

  calculateSpeed () {
    if (this.detectClose(player)) {
      if (player.x + (player.width / 2) > this.pos.x + (this.width / 2)) {
        this.speed.x = Math.abs(player.speed.x / 2) * -1
      } else {
        this.speed.x = Math.abs(player.speed.x / 2)
      }
      if (player.y + (player.height / 2) > this.pos.y + (this.height / 2)) {
        this.speed.y = Math.abs(player.speed.y / 2) * -1
      } else {
        this.speed.y = Math.abs(player.speed.y / 2)
      }
    } else {
      if (player.x + (player.width / 2) > this.pos.x + (this.width / 2)) {
        this.speed.x = Math.abs(player.speed.x / 4) * -1
      } else {
        this.speed.x = Math.abs(player.speed.x / 4)
      }
      if (player.y + (player.height / 2) > this.pos.y + (this.height / 2)) {
        this.speed.y = Math.abs(player.speed.y / 4) * -1
      } else {
        this.speed.y = Math.abs(player.speed.y / 4)
      }
    }
  }

  draw () {
    let level = Math.floor(time / 60)
    if (this.isCollidedWith(player)) {
      this.collideWith(player)
    }
    context.fillStyle = this.color
    if (this.detectPlayer(player) && level > 5) {
      this.calculateSpeed()
      if (this.pos.x - (this.width / 2) < 0) {
        this.pos.x = 0 + (this.width / 2)
        this.speed.x = 0
      }
      if (this.pos.y - (this.height / 2) < 0) {
        this.pos.y = 0 + (this.height / 2)
        this.speed.y = 0
      }
      if (this.pos.x + (this.width / 2) > 5000) {
        this.pos.x = 5000 - (this.width / 2)
        this.speed.x = 0
      }
      if (this.pos.y + (this.height / 2) > 3750) {
        this.pos.y = 3750 - (this.height / 2)
        this.speed.y = 0
      }
      this.pos.x += this.speed.x
      this.pos.y += this.speed.y
    }
    context.fillRect(this.pos.x - camera.pos.x,
      this.pos.y - camera.pos.y,
      this.width, this.height)
    context.strokeStyle = '#000'
  }
}
