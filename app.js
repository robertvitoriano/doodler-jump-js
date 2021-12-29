document.addEventListener('DOMContentLoaded', function () {
  const grid = document.querySelector('.grid');
  const doodler = document.createElement('div');

  const gridHeight = grid.clientHeight;
  const gridWidth = grid.clientWidth;
  const gameScreenBottomLimit = window.innerHeight - gridHeight;
  const gameScreenTopLimit = gridHeight - doodler.clientHeight;
  const platformWidth = 15;
  const platforms = []

  let doodlerLeftPosition = 50;
  let doodlerBottomPosition = 150;
  let isGameOver = false;
  let platformCount = 5;
  let upDoodlerSetInterval;
  let downDoodlerSetInterval;


  function createDoodler() {
    grid.appendChild(doodler);
    doodler.classList.add('doodler');
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
    if (doodlerBottomPosition > 200) {
      platforms.forEach(platform => {
        platform.bottom -= 4;
        platform.visual.style.bottom = platform.bottom + 'px';
      });
    }
  }

  function handleDoodlerJump() {
    clearInterval(downDoodlerSetInterval);
    upDoodlerSetInterval = setInterval(() => {
      doodlerBottomPosition += 8;
      doodler.style.bottom = doodlerBottomPosition + 'px';
      if (doodlerBottomPosition >= 350) {
        handleDoodlerFall();
      }
    }, 30)
  }

  function handleDoodlerFall() {
    clearInterval(upDoodlerSetInterval);
    downDoodlerSetInterval = setInterval(() => {
      doodlerBottomPosition -= 8;
      doodler.style.bottom = doodlerBottomPosition + 'px';
      if (doodlerBottomPosition <= 0) {
        gameOver();
        doodler.style.bottom = 0 + 'px';
      }
    }, 30);
  }

  function gameOver() {
    isGameOver = true;
    doodler.classList.add('doodler-dead');
    doodler.style.bottom = gameScreenBottomLimit + 'px';
    console.log('Game Over');
    clearInterval(downDoodlerSetInterval);
  }


  function start() {
    if (!isGameOver) {
      createDoodler();
      createPlatforms();
      setInterval(movePlatforms, 20);
      handleDoodlerJump();
    }
  }
  // TODO - ATTACH BUTTON
  start();
})