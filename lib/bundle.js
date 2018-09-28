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
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/slitherin.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/slitherin.js":
/*!**************************!*\
  !*** ./lib/slitherin.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

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

class Snake {
  constructor () {
    this.x = canvas.width / 2
    this.y = canvas.height / 2
    this.speed = {x: 0, y: 0}
    this.maxSpeed = {x: 10, y: 10}
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
const snakes = []
const gems = []
const context = canvas.getContext('2d')
const background = new Background(context, canvas.width, canvas.height)
const snake = new Snake()
const mousePos = {x: 0, y: 0}
const camera = {
  pos: {x: 0, y: 0},
  updatePos: function () {
    this.pos.x = snake.x - canvas.width / 2
    this.pos.y = snake.y - canvas.height / 2
  }
}

function start () {
  animate()
}

function animate () {
  context.fillStyle = '#000'
  context.fillRect(0, 0, canvas.width, canvas.height)
  camera.updatePos()
  snake.move()
  background.draw()
  snake.draw()
  requestAnimationFrame(animate)
}

start()

// let left = false
// let right = false
// let up = false
// let down = false

// const keyDownHandler = (e) => {
//   switch (e.keyCode) {
//     case 37:
//       left = true
//       break
//     case 38:
//       up = true
//       break
//     case 39:
//       right = true
//       break
//     case 40:
//       down = true
//       break
//     default:
//   }
//   snake.move(left, right, up, down)
// }

// const keyUpHandler = (e) => {
//   switch (e.keyCode) {
//     case 37:
//       left = false
//       break
//     case 38:
//       up = false
//       break
//     case 39:
//       right = false
//       break
//     case 40:
//       down = false
//       break
//     default:
//   }
//   snake.move(left, right, up, down)
// }

// document.addEventListener('keyup', keyUpHandler, false)
// document.addEventListener('keydown', keyDownHandler, false)
canvas.addEventListener('mousemove',
  (e) => {
    mousePos.x = e.clientX - canvas.offsetLeft
    mousePos.y = e.clientY - canvas.offsetTop
  })


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map