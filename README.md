# Aggro Javascript Game

A survival game based on the popular Agar.io using HTML Canvas and JavaScript.
Move the mouse to get around and try to eat as much food as possible to survive.
The game gets harder as time progresses.

#### Keeping track of player movement:

I utilize a camera object that tracks the position of the player so that the canvas will always render the necessary content and keep the player object in the center.

```javascript
const camera = {
  pos: {x: 0, y: 0},
  updatePos: function () {
    this.pos.x = player.x - (canvas.width / 2)
    this.pos.y = player.y - (canvas.height / 2)
  }
}
```
### Calculating difficulty and food generation
Difficulty is passed in from a timer function where each level is represented by each minute that passes. Then the calculation for creating a gem is done based on the number rolled and a possible poison gem could also be created after a certain point.
```javascript
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

function levelLogic (gem, idx, level) {
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
    } else {
      gems(1)
    }
  }
}
```




### Resizing the canvas based on player size
Depending on the size of the player the canvas will dynamically resize to always keep the player in view.

```javascript
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
```
Before resize:

![home-page](/lib/images/Resize-Before.png)

After resize: 

![home-page](/lib/images/Resize-After.png)

#### Future steps

-Implement enemies logic
-Implement high score functionality
-Dynamically change the shape of the player object
