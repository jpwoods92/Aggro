/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/aggro.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/aggro.js":
/*!**********************!*\
  !*** ./lib/aggro.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

const canvasContainer = document.getElementById('canvasContainer')
const canvas = document.getElementsByTagName('canvas')[0]
const startButton = document.getElementById('startButton')
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
      this.maxSpeed.x = 3
      this.maxSpeed.y = 3
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

function handleClick () {
  document.location.reload()
}

function endGame () {
  startButton.innerText = 'retry'
  startButton.addEventListener('click', handleClick)
  if (player.dead) {
    startButton.style.cssText = 'display: block;'
    endGameText = 'you have been eaten'
    return endGameText
  } else if (player.width < 6) {
    startButton.style.cssText = 'display: block;'
    endGameText = 'you have starved to death'
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
    camera.updatePos()
    player.move()
    player.draw()
    scoreText.innerText = `${Math.floor(player.width)}`
    requestAnimationFrame(animate)
  }
}

function handleStart () {
  startButton.style.cssText = 'display: none;'
  gems(500)
  animate()
}

function start () {
  startButton.addEventListener('click', handleStart)
}

start()

canvas.addEventListener('mousemove',
  (e) => {
    mousePos.x = e.clientX - canvas.offsetLeft
    mousePos.y = e.clientY - canvas.offsetTop
  })


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map