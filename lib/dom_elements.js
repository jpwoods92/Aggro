import { player } from './aggro'
export const canvasContainer = document.getElementById('canvasContainer')
export const canvas = document.getElementsByTagName('canvas')[0]
export const context = canvas.getContext('2d')
export const mousePos = {x: 0, y: 0}
export const camera = {
  pos: {x: 0, y: 0},
  updatePos: function () {
    this.pos.x = player.x - (canvas.width / 2)
    this.pos.y = player.y - (canvas.height / 2)
  }
}
