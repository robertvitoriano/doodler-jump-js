document.addEventListener('DOMContentLoaded', function () {
  const grid = document.querySelector('.grid');
  const doodler = document.createElement('div');

  const gridHeight = grid.clientHeight;
  const gridWidth = grid.clientWidth;
  const gameScreenBottomLimit = window.innerHeight - gridHeight;
  const gameScreenTopLimit = gridHeight - doodler.clientHeight;
  const platformWidth = 15;
  const platformHeight = 15;
  const platforms = []

  let doodlerLeftPosition = 50;
  let startPoint = 150;
  let doodlerBottomPosition = startPoint;
  let isGameOver = false;
  let platformCount = 5;
  let upDoodlerSetInterval;
  let downDoodlerSetInterval;
  let leftDoodlerSetInterval;
  let isJumping = true;
  let isGoingLeft = false;
  let isGoingRight = false;



  function createDoodler() {
    grid.appendChild(doodler);
    doodler.classList.add('doodler');
    doodlerLeftPosition = platforms[0].left
    doodlerBottomPosition = platforms[0].bottom + platformHeight;
    doodler.style.left = doodlerLeftPosition + 'px';
    doodler.style.bottom = doodlerBottomPosition + 'px';
  }

  class Platform {
    constructor(newPlataformBottomPosition) {
      this.bottom = newPlataformBottomPosition;
      this.left = Math.floor(Math.random() * (gridWidth - gridWidth / platformCount));
      this.visual = document.createElement('div');

      const visual = this.visual;
      visual.classList.add('platform');
      visual.style.left = this.left + 'px';
      visual.style.bottom = this.bottom + 'px';
      grid.appendChild(visual);
    }
  }

  function createPlatforms() {

    for (let i = 0; i < platformCount; i++) {
      const platformGap = gridHeight / platformCount;
      const newPlatformBottomPosition = 100 + (platformGap * i);
      const newPlatform = new Platform(newPlatformBottomPosition);
      platforms.push(newPlatform);

    }
  }

  function movePlatforms() {
    if (doodlerBottomPosition > 0) {
      platforms.forEach((platform, index) => {
        platform.bottom -= 1;
        platform.visual.style.bottom = platform.bottom + 'px';

      });
    }
  }

  function handleDoodlerJump() {
    clearInterval(downDoodlerSetInterval);
    isJumping = true;
    upDoodlerSetInterval = setInterval(() => {
      doodlerBottomPosition += 8;
      doodler.style.bottom = doodlerBottomPosition + 'px';
      if (doodlerBottomPosition > startPoint + 200) {
        handleDoodlerFall();
      }
    }, 30)
  }

  function moveDoodlerLeft() {

    isGoingLeft = true;
    leftDoodlerSetInterval = setInterval(() => {
      doodlerLeftPosition -= 5;
      doodler.style.left = doodlerLeftPosition + 'px';

    }, 30)

  }

  function handleDoodlerFall() {
    clearInterval(upDoodlerSetInterval);
    isJumping = false;
    downDoodlerSetInterval = setInterval(() => {
      doodlerBottomPosition -= 8;
      doodler.style.bottom = doodlerBottomPosition + 'px';
      if (doodlerBottomPosition <= 0) {
        gameOver();
        doodler.style.bottom = 0 + 'px';
      }

      platforms.forEach((platform, index) => {
        if (
          (doodlerBottomPosition >= platform.bottom) &&
          (doodlerBottomPosition <= platform.bottom + platformHeight) &&
          (doodlerLeftPosition + doodler.clientWidth >= platform.left) &&
          (doodlerLeftPosition <= platform.left + platformWidth) &&
          !isJumping
        ) {
          startPoint = doodlerBottomPosition;
          handleDoodlerJump();
        }
      });

    }, 30);
  }

  function gameOver() {
    isGameOver = true;
    doodler.classList.add('doodler-dead');
    doodler.style.bottom = gameScreenBottomLimit + 'px';
    console.log('Game Over');
    clearInterval(upDoodlerSetInterval);
    clearInterval(downDoodlerSetInterval);
  }

  function handleDoodleMoments(e) {
    switch (e.key) {
      case 'ArrowUp':
        handleDoodlerJump();
        break;
      case 'ArrowDown':
        //movedoodleDown();
        break;
      case 'ArrowLeft':
        moveDoodlerLeft();
        break;
      case 'ArrowRight':
        //movedoodleRight();
        break;
    }
  }

  function start() {
    if (!isGameOver) {
      createPlatforms();
      createDoodler();
      setInterval(movePlatforms, 20);
      addEventListener("keydown", handleDoodleMoments);
    }
  }
  // TODO - ATTACH BUTTON
  start();
})