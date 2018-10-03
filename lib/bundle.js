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
const timer = document.getElementById('timer')
const welcome = document.getElementById('welcome-header')
const defaultCanvasWidth = 1200
const defaultCanvasHeight = 600
const midCanvasWidth = 2400
const midCanvasHeight = 1200
const maxCanvasWidth = 4800
const maxCanvasHeight = 2400
let time, currentTime
let count = 0

// class Background {
//   constructor () {
//     this.x = 0
//     this.y = 0
//     this.background = new Image()
//     this.background.src = 'lib/images/geometric-background.png'
//     this.draw = this.draw.bind(this)
//   }

//   draw () {
//     context.drawImage(this.background,
//       this.x - camera.pos.x, this.y - camera.pos.y)
//   }
// }

function randomColor () {
  const colors = ['#AFDCEB', '#CAE9F5', '#F0F8FF', '#ADD8E6', '#86C5D8']
  return colors[Math.floor(Math.random() * colors.length)]
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

// let background = new Background()
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

function levelLogic (gem, idx, difficulty) {
  let roll = Math.ceil(Math.random() * 10)
  if (difficulty <= 1) {
    gemsArray[idx] = null
    gems(1)
  } else if (difficulty > 1 && difficulty <= 2) {
    gemsArray[idx] = null
    if (roll > 5) {
      gems(1)
    }
  } else if (difficulty > 2 && difficulty < 5) {
    gemsArray[idx] = null
    if (roll > 7) {
      gems(1)
    } else {
      gems(1, difficulty)
    }
  } else if (difficulty >= 5) {
    gemsArray[idx] = null
    gems(1, difficulty)
    if (roll > 9) {
      gems(3)
    } else {
      gems(1)
    }
  }
}

function updateGems () {
  let level = Math.floor(time / 60)
  gemsArray.forEach((gem, idx) => {
    if (gem && gem.collision) {
      levelLogic(gem, idx, level)
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
    endGameText = `you have starved to death, you survived for ${currentTime}`
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

function secondsToHms (d) {
  d = Number(d)
  let h = Math.floor(d / 3600)
  let m = Math.floor(d % 3600 / 60)
  let s = Math.floor(d % 3600 % 60)

  let hDisplay = h > 0 ? h + (h === 1 ? ' hour, ' : ' hours, ') : ''
  let mDisplay = m > 0 ? m + (m === 1 ? ' minute, ' : ' minutes, ') : ''
  let sDisplay = s > 0 ? s + (s === 1 ? ' second' : ' seconds') : ''
  return hDisplay + mDisplay + sDisplay
}

function tick () {
  count += 1
  if (count === 60) {
    time += 1
    count = 0
  }
  currentTime = secondsToHms(time)
}

function animate () {
  context.clearRect(player.x - camera.pos.x - (canvas.width / 2), player.y - camera.pos.y - (canvas.height / 2), canvas.width + 5, canvas.height + 5)
  if (endGame()) {
    context.font = '30px Arial'
    context.fillStyle = '#fff'
    context.textAlign = 'center'
    context.fillText(endGameText, player.x - camera.pos.x, player.y - camera.pos.y - 50)
  } else {
    resizeCanvas()
    context.fillStyle = 'transparent'
    context.fillRect(0, 0, canvas.width, canvas.height)
    // background.draw()
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
  time = 0
  // background = new Background()
  player = new Player()
  welcome.style.cssText = 'display: none;'
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


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map