document.addEventListener('DOMContentLoaded', function () {
  const grid = document.querySelector('.grid');
  const doodler = document.createElement('div');

  const gridHeight = grid.clientHeight;
  const gridWidth = grid.clientWidth;
  const platformWidth = 15;

  let doodlerLeftPosition = 50;
  let doodlerBottomPosition = 150;
  let isGameOver = false;
  let platformCount = 5;

  function createDoodler() {
    grid.appendChild(doodler);
    doodler.classList.add('doodler');
    doodler.style.left = doodlerLeftPosition + 'px';
    doodler.style.bottom = doodlerBottomPosition + 'px';
  }

  class Platform {
    constructor(newPlataformBottomPosition) {
      this.bottom = newPlataformBottomPosition;
      this.left = Math.floor(Math.random() * (gridWidth - platformWidth));
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
    }
  }

  function start() {
    if (!isGameOver) {
      createDoodler();
      createPlatforms();
    }
  }
  // TODO - ATTACH BUTTON
  start();
})