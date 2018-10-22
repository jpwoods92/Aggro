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
/*! exports provided: player */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "player", function() { return player; });
/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player.js */ "./lib/player.js");
/* harmony import */ var _gem_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gem.js */ "./lib/gem.js");
/* harmony import */ var _random_track__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./random_track */ "./lib/random_track.js");
/* harmony import */ var _dom_elements__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dom_elements */ "./lib/dom_elements.js");
/* harmony import */ var _time_calculation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./time_calculation */ "./lib/time_calculation.js");






const pauseButton = document.getElementById('pause-button')
const music = new Audio(Object(_random_track__WEBPACK_IMPORTED_MODULE_2__["randomTrack"])())
const nameField = document.getElementById('name-field')
const startButton = document.getElementById('start-button')
const timer = document.getElementById('timer')
const welcome = document.getElementById('welcome-header')
const defaultCanvasWidth = 1200
const defaultCanvasHeight = 600
const midCanvasWidth = 2400
const midCanvasHeight = 1200
const maxCanvasWidth = 4800
const maxCanvasHeight = 2400
let paused = false
let musicStatus = true
let player
const scoreText = document.getElementById('scoreData')

let endGameText = null

let gemsArray = []

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
    gemsArray.push(new _gem_js__WEBPACK_IMPORTED_MODULE_1__["default"](pos.x, pos.y, color, value))
  }
}

function levelLogic (idx, level) {
  let roll = Math.ceil(Math.random() * 10)
  if (level <= 1) {
    gemsArray[idx] = null
    gems(1)
  } else if (level > 1 && level <= 2) {
    gemsArray[idx] = null
    if (roll > 5) {
      gems(1)
    }
  } else if (level > 2 && level < 5) {
    gemsArray[idx] = null
    if (roll > 7) {
      gems(1)
    } else {
      gems(1, level)
    }
  } else if (level >= 5) {
    gemsArray[idx] = null
    gems(1, level)
    if (roll > 9) {
      gems(3)
    }
  }
}

function updateGems () {
  let level = Math.floor(_time_calculation__WEBPACK_IMPORTED_MODULE_4__["time"] / 60)
  gemsArray.forEach((gem, idx) => {
    if (gem && gem.collision) {
      levelLogic(idx, level)
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
    nameField.style.cssText = 'display: block'
    endGameText = `you have starved to death, you survived for ${_time_calculation__WEBPACK_IMPORTED_MODULE_4__["currentTime"]}`
    firebase.database().ref('scores').push({name: player.name, score: _time_calculation__WEBPACK_IMPORTED_MODULE_4__["time"]})
    gemsArray = []
    return endGameText
  } else {
    return null
  }
}

function resizeCanvas () {
  if (player.width > 400 && player.width < 700 && _dom_elements__WEBPACK_IMPORTED_MODULE_3__["canvas"].width !== midCanvasWidth) {
    _dom_elements__WEBPACK_IMPORTED_MODULE_3__["canvas"].height = midCanvasHeight
    _dom_elements__WEBPACK_IMPORTED_MODULE_3__["canvas"].width = midCanvasWidth
  } else if (player.width > 700 && _dom_elements__WEBPACK_IMPORTED_MODULE_3__["canvas"].width !== maxCanvasWidth) {
    _dom_elements__WEBPACK_IMPORTED_MODULE_3__["canvas"].height = maxCanvasHeight
    _dom_elements__WEBPACK_IMPORTED_MODULE_3__["canvas"].width = maxCanvasWidth
  } else if (player.width < 350 && _dom_elements__WEBPACK_IMPORTED_MODULE_3__["canvas"].width !== defaultCanvasWidth) {
    _dom_elements__WEBPACK_IMPORTED_MODULE_3__["canvas"].height = defaultCanvasHeight
    _dom_elements__WEBPACK_IMPORTED_MODULE_3__["canvas"].width = defaultCanvasWidth
  } else {
    return null
  }
}

let fetchScores = firebase.database().ref('scores').orderByChild('score').limitToLast(5)
let scores = []

function scoreSort (a, b) {
  if (a.score > b.score) {
    return -1
  } else if (a.score === b.score) {
    return 0
  } else return 1
}

fetchScores.on('child_added', snapshot => {
  scores.push(snapshot.val())
  scores = scores.sort(scoreSort)
  scores.length = Math.min(scores.length, 5)
})

function renderScores () {
  let pos = 10
  scores.forEach((el) => {
    pos += 20
    let rendered = el.name + ': ' + el.score
    _dom_elements__WEBPACK_IMPORTED_MODULE_3__["context"].font = '15px Arial'
    _dom_elements__WEBPACK_IMPORTED_MODULE_3__["context"].fillStyle = '#fff'
    _dom_elements__WEBPACK_IMPORTED_MODULE_3__["context"].fillText(rendered, 20, pos)
  })
}

function drawBorder () {
  _dom_elements__WEBPACK_IMPORTED_MODULE_3__["context"].strokeStyle = '#fff'
  _dom_elements__WEBPACK_IMPORTED_MODULE_3__["context"].lineWidth = 5
  _dom_elements__WEBPACK_IMPORTED_MODULE_3__["context"].strokeRect(-2.5 - _dom_elements__WEBPACK_IMPORTED_MODULE_3__["camera"].pos.x, -2.5 - _dom_elements__WEBPACK_IMPORTED_MODULE_3__["camera"].pos.y, 5005, 3755)
}

function animate () {
  if (paused) {
    requestAnimationFrame(animate)
    welcome.innerText = 'Paused'
    welcome.style.cssText = 'display: block'
    welcome.style.cssText = 'left: 770px'
    return null
  }
  _dom_elements__WEBPACK_IMPORTED_MODULE_3__["context"].clearRect(player.x - _dom_elements__WEBPACK_IMPORTED_MODULE_3__["camera"].pos.x - (_dom_elements__WEBPACK_IMPORTED_MODULE_3__["canvas"].width / 2) - 5, player.y - _dom_elements__WEBPACK_IMPORTED_MODULE_3__["camera"].pos.y - (_dom_elements__WEBPACK_IMPORTED_MODULE_3__["canvas"].height / 2) - 5, _dom_elements__WEBPACK_IMPORTED_MODULE_3__["canvas"].width + 10, _dom_elements__WEBPACK_IMPORTED_MODULE_3__["canvas"].height + 10)
  if (endGame()) {
    welcome.innerText = endGameText
    welcome.style.cssText = 'display: block'
    welcome.style.cssText = 'left: 570px'
  } else {
    welcome.style.cssText = 'display: none'
    resizeCanvas()
    _dom_elements__WEBPACK_IMPORTED_MODULE_3__["context"].fillStyle = 'transparent'
    _dom_elements__WEBPACK_IMPORTED_MODULE_3__["context"].fillRect(0, 0, _dom_elements__WEBPACK_IMPORTED_MODULE_3__["canvas"].width, _dom_elements__WEBPACK_IMPORTED_MODULE_3__["canvas"].height)
    updateGems()
    drawBorder()
    _dom_elements__WEBPACK_IMPORTED_MODULE_3__["camera"].updatePos()
    player.move()
    player.draw()
    Object(_time_calculation__WEBPACK_IMPORTED_MODULE_4__["tick"])()
    timer.innerText = `${_time_calculation__WEBPACK_IMPORTED_MODULE_4__["currentTime"]}`
    scoreText.innerText = `${Math.floor(player.width)}`
    requestAnimationFrame(animate)
  }
  renderScores()
}

function handleStart () {
  Object(_time_calculation__WEBPACK_IMPORTED_MODULE_4__["startTime"])()
  let name = nameField.value || null
  player = new _player_js__WEBPACK_IMPORTED_MODULE_0__["default"](name)
  nameField.style.cssText = 'display: none'
  welcome.style.cssText = 'display: none;'
  startButton.style.cssText = 'display: none;'
  gems(500)
  animate()
}

function handleMusic () {
  if (musicStatus) {
    musicStatus = false
    pauseButton.innerHTML = 'Play Music'
    music.pause()
  } else {
    pauseButton.innerHTML = 'Pause Music'
    musicStatus = true
    music.play()
  }
}

startButton.addEventListener('click', handleStart)
_dom_elements__WEBPACK_IMPORTED_MODULE_3__["canvas"].addEventListener('mousemove',
  (e) => {
    _dom_elements__WEBPACK_IMPORTED_MODULE_3__["mousePos"].x = e.clientX - _dom_elements__WEBPACK_IMPORTED_MODULE_3__["canvas"].offsetLeft - 160
    _dom_elements__WEBPACK_IMPORTED_MODULE_3__["mousePos"].y = e.clientY - _dom_elements__WEBPACK_IMPORTED_MODULE_3__["canvas"].offsetTop - 83
  })

document.addEventListener('DOMContentLoaded', function () {
  const playMusic = music.play()
  if (playMusic !== undefined) {
    playMusic.then(_ => {}).catch(() => {
      musicStatus = false
      pauseButton.innerText = 'Play Music'
      pauseButton.addEventListener('click', handleMusic)
    })
  }
  music.loop = true
})

function handlePauseGame (e) {
  if (e.key === 'p') {
    paused = !paused
  }
}

document.addEventListener('keypress', handlePauseGame)
pauseButton.addEventListener('click', handleMusic)


/***/ }),

/***/ "./lib/dom_elements.js":
/*!*****************************!*\
  !*** ./lib/dom_elements.js ***!
  \*****************************/
/*! exports provided: canvasContainer, canvas, context, mousePos, camera */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canvasContainer", function() { return canvasContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canvas", function() { return canvas; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "context", function() { return context; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mousePos", function() { return mousePos; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "camera", function() { return camera; });
/* harmony import */ var _aggro__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./aggro */ "./lib/aggro.js");

const canvasContainer = document.getElementById('canvasContainer')
const canvas = document.getElementsByTagName('canvas')[0]
const context = canvas.getContext('2d')
const mousePos = {x: 0, y: 0}
const camera = {
  pos: {x: 0, y: 0},
  updatePos: function () {
    this.pos.x = _aggro__WEBPACK_IMPORTED_MODULE_0__["player"].x - (canvas.width / 2)
    this.pos.y = _aggro__WEBPACK_IMPORTED_MODULE_0__["player"].y - (canvas.height / 2)
  }
}


/***/ }),

/***/ "./lib/gem.js":
/*!********************!*\
  !*** ./lib/gem.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Gem; });
/* harmony import */ var _dom_elements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom_elements */ "./lib/dom_elements.js");
/* harmony import */ var _aggro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./aggro */ "./lib/aggro.js");
/* harmony import */ var _time_calculation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./time_calculation */ "./lib/time_calculation.js");



class Gem {
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
    if (this.detectClose(_aggro__WEBPACK_IMPORTED_MODULE_1__["player"])) {
      if (_aggro__WEBPACK_IMPORTED_MODULE_1__["player"].x + (_aggro__WEBPACK_IMPORTED_MODULE_1__["player"].width / 2) > this.pos.x + (this.width / 2)) {
        this.speed.x = Math.abs(_aggro__WEBPACK_IMPORTED_MODULE_1__["player"].speed.x / 2) * -1
      } else {
        this.speed.x = Math.abs(_aggro__WEBPACK_IMPORTED_MODULE_1__["player"].speed.x / 2)
      }
      if (_aggro__WEBPACK_IMPORTED_MODULE_1__["player"].y + (_aggro__WEBPACK_IMPORTED_MODULE_1__["player"].height / 2) > this.pos.y + (this.height / 2)) {
        this.speed.y = Math.abs(_aggro__WEBPACK_IMPORTED_MODULE_1__["player"].speed.y / 2) * -1
      } else {
        this.speed.y = Math.abs(_aggro__WEBPACK_IMPORTED_MODULE_1__["player"].speed.y / 2)
      }
    } else {
      if (_aggro__WEBPACK_IMPORTED_MODULE_1__["player"].x + (_aggro__WEBPACK_IMPORTED_MODULE_1__["player"].width / 2) > this.pos.x + (this.width / 2)) {
        this.speed.x = Math.abs(_aggro__WEBPACK_IMPORTED_MODULE_1__["player"].speed.x / 4) * -1
      } else {
        this.speed.x = Math.abs(_aggro__WEBPACK_IMPORTED_MODULE_1__["player"].speed.x / 4)
      }
      if (_aggro__WEBPACK_IMPORTED_MODULE_1__["player"].y + (_aggro__WEBPACK_IMPORTED_MODULE_1__["player"].height / 2) > this.pos.y + (this.height / 2)) {
        this.speed.y = Math.abs(_aggro__WEBPACK_IMPORTED_MODULE_1__["player"].speed.y / 4) * -1
      } else {
        this.speed.y = Math.abs(_aggro__WEBPACK_IMPORTED_MODULE_1__["player"].speed.y / 4)
      }
    }
  }

  draw () {
    let level = Math.floor(_time_calculation__WEBPACK_IMPORTED_MODULE_2__["time"] / 60)
    if (this.isCollidedWith(_aggro__WEBPACK_IMPORTED_MODULE_1__["player"])) {
      this.collideWith(_aggro__WEBPACK_IMPORTED_MODULE_1__["player"])
    }
    _dom_elements__WEBPACK_IMPORTED_MODULE_0__["context"].fillStyle = this.color
    if (this.detectPlayer(_aggro__WEBPACK_IMPORTED_MODULE_1__["player"]) && level > 5) {
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
    _dom_elements__WEBPACK_IMPORTED_MODULE_0__["context"].fillRect(this.pos.x - _dom_elements__WEBPACK_IMPORTED_MODULE_0__["camera"].pos.x,
      this.pos.y - _dom_elements__WEBPACK_IMPORTED_MODULE_0__["camera"].pos.y,
      this.width, this.height)
    _dom_elements__WEBPACK_IMPORTED_MODULE_0__["context"].strokeStyle = '#000'
  }
}


/***/ }),

/***/ "./lib/player.js":
/*!***********************!*\
  !*** ./lib/player.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Player; });
/* harmony import */ var _random_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./random_color */ "./lib/random_color.js");
/* harmony import */ var _dom_elements__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom_elements */ "./lib/dom_elements.js");
/* harmony import */ var _time_calculation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./time_calculation */ "./lib/time_calculation.js");



class Player {
  constructor (name = 'guest') {
    this.name = name
    this.x = _dom_elements__WEBPACK_IMPORTED_MODULE_1__["canvas"].width / 2
    this.y = _dom_elements__WEBPACK_IMPORTED_MODULE_1__["canvas"].height / 2
    this.speed = {x: 0, y: 0}
    this.maxSpeed = {x: 3, y: 3}
    this.width = 35
    this.height = 35
    this.maxSize = 1000
    this.dead = false
    this.color = Object(_random_color__WEBPACK_IMPORTED_MODULE_0__["randomColor"])()
    this.draw = this.draw.bind(this)
    this.shrink = this.shrink.bind(this)
  }

  move () {
    let centerX = _dom_elements__WEBPACK_IMPORTED_MODULE_1__["canvasContainer"].offsetWidth / 2
    let centerY = _dom_elements__WEBPACK_IMPORTED_MODULE_1__["canvasContainer"].offsetHeight / 2
    this.speed.x += (_dom_elements__WEBPACK_IMPORTED_MODULE_1__["mousePos"].x - centerX) / (centerX)
    if (Math.abs(this.speed.x) > this.maxSpeed.x) {
      this.speed.x = Math.sign(this.speed.x) * this.maxSpeed.x
    }
    this.speed.y += (_dom_elements__WEBPACK_IMPORTED_MODULE_1__["mousePos"].y - centerY) / (centerY)
    if (Math.abs(this.speed.y) > this.maxSpeed.y) {
      this.speed.y = Math.sign(this.speed.y) * this.maxSpeed.y
    }
  }

  shrink () {
    let level = Math.floor(_time_calculation__WEBPACK_IMPORTED_MODULE_2__["time"] / 60)
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
    _dom_elements__WEBPACK_IMPORTED_MODULE_1__["context"].fillStyle = this.color
    _dom_elements__WEBPACK_IMPORTED_MODULE_1__["context"].fillRect(this.x - _dom_elements__WEBPACK_IMPORTED_MODULE_1__["camera"].pos.x - (this.width / 2),
      this.y - _dom_elements__WEBPACK_IMPORTED_MODULE_1__["camera"].pos.y - (this.height / 2),
      this.width, this.height)
  }
}


/***/ }),

/***/ "./lib/random_color.js":
/*!*****************************!*\
  !*** ./lib/random_color.js ***!
  \*****************************/
/*! exports provided: randomColor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randomColor", function() { return randomColor; });
const randomColor = function () {
  const colors = ['#050D7F', '#0794DB', '#00BFEC', '#1CD0F8', '#1A649C']
  return colors[Math.floor(Math.random() * colors.length)]
}


/***/ }),

/***/ "./lib/random_track.js":
/*!*****************************!*\
  !*** ./lib/random_track.js ***!
  \*****************************/
/*! exports provided: randomTrack */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randomTrack", function() { return randomTrack; });
function randomTrack () {
  const musicTracks = ['lib/music/stellar.mp3', 'lib/music/starbound.mp3']
  let selected = musicTracks[Math.floor(Math.random() * musicTracks.length)]
  return selected
}


/***/ }),

/***/ "./lib/time_calculation.js":
/*!*********************************!*\
  !*** ./lib/time_calculation.js ***!
  \*********************************/
/*! exports provided: time, currentTime, count, startTime, secondsToHms, tick */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "time", function() { return time; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "currentTime", function() { return currentTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "count", function() { return count; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startTime", function() { return startTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "secondsToHms", function() { return secondsToHms; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tick", function() { return tick; });
let time, currentTime
let count = 0

function startTime () {
  time = 0
  currentTime = 0
}

function secondsToHms (d) {
  let h = Math.floor(d / 3600)
  let m = Math.floor(d % 3600 / 60)
  let s = Math.floor(d % 3600 % 60)

  let hDisplay = h > 0 ? h + (h === 1 ? ' h, ' : ' h, ') : ''
  let mDisplay = m > 0 ? m + (m === 1 ? ' m, ' : ' m, ') : ''
  let sDisplay = s > 0 ? s + ' s' : ''
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


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map