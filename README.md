![](https://fontmeme.com/permalink/190115/4f00ef057837286d0eb8f1b65654103e.png)

## Background and Overview

Hoop is a simple but addictive game. The main focus of the game is to use your mouse/touchscreen to draw a hoop around blue orbs on the board while avoiding red orbs. Hooping around the blue orb will increase your score, multiplier, and replenish your health. Hooping around red orbs will decrease your health and reset your multiplier.

The longer you survive, the faster objects will show up. Each object has a certain lifetime and will disappear when it expires. Blue will flash before disappearing as an alert so you can give those priority. Allowing blue orbs to die will reset your multiplier and decrease your health.

The traced mouse trail will only last a certain amount of time before fading away. Objects must be fully encompassed with an active trail to count. Hooping around multiple friendlies with the same hoop will result in a bonus.

Play until your health is depleted!

### Demo
[Live Link](https://jon-dominguez94.github.io/hoop)

## Technologies

Hoop was built with pure `Javascript` and no external libraries. All game rendering and styling was done with `HTML5 Canvas`

## Site

### Landing Page

Hoop is currently working on all modern browsers, as well as iOS and Android. However, mobile versions start in the muted mode.

<div style="display: flex; align-items: center; justify-content: space-between;">
  <img src='./screenshots/landing.png' width="63%" height="auto" style="margin-right:10px">
  <img src='./screenshots/ios.png' width="33%" height="auto">
</div>

While playing, fully drawn hoops by the user will highlight with the game theme color. Notifications will show for points, health depletion, and multipliers

![](./screenshots/playing.png)

Upon game death, the menu will reappear with your score and buttton to start a new game

## Features

### Player Trail

There are many things rendering on the board at once so it was difficult to create the game logic. I went through many implementations to figure out when and where orbs were encompassed but I finally landed on the following:

* Render the players trail
  * Array of points connected with quadratic curves
* Check every combination of four points in the trail to see if there are any collisions
  * At least four points to create a closed circle
* Save the start index, end index, and collision point
* Fill that area with a radial-gradient to signify closed circle
* For each active orb, grab each pixel position on the board
  * Each orb is its own canvas on top of the original canvas. Therefore, each orb's position on the window has a matching position on the board
* Check those pixels on the board
  * If it is clear, do nothing. If it has the color of the radial-gradient, orb has been enclosed so react depending on the orb type

```
for(let i = this.enemies.length - 1; i >= 0; i--){
  const enemy = this.enemies[i];
  const ex = Math.round(enemy.x);
  const ey = Math.round(enemy.y);

  const indices = [
    ((ey * bmpw) + Math.round(ex - constants.ENEMY_SIZE)) * 4,
    ((ey * bmpw) + Math.round(ex + constants.ENEMY_SIZE)) * 4,
    ((Math.round(ey - constants.ENEMY_SIZE) * bmpw) + ex) * 4,
    ((Math.round(ey + constants.ENEMY_SIZE) * bmpw) + ex) * 4
  ];
  for(j = indices.length - 1; j >= 0; j++){}
    const index = indices[j];
    if (pixels[index + 1] >= 0 && pixels[index + 2] >= 200) {
      if (enemy.type === constants.ENEMY_TYPE_BOMB || enemy.type === constants.ENEMY_TYPE_BOMB_MOVER) {
        this.handleBombInClosure(enemy);
      }
      else {
        this.handleEnemyInClosure(enemy);

        casualties.push(enemy);
      }

      this.enemies.splice(i, 1);
      break;
    }
  }
}
```