document.addEventListener('DOMContentLoaded', function () {
  const grid = document.querySelector('.grid');
  const doodler = document.createElement('div');

  const gridHeight = grid.clientHeight;
  const gridWidth = grid.clientWidth;
  const platformWidth = 15;
  const platforms = []

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
      this.left = Math.floor(Math.random() * (gridWidth - gridWidth/platformCount));
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
    if(doodlerBottomPosition >200){
      platforms.forEach(platform => {
        platform.visual.style.left = platform.left + 'px';
        platform.left -= 1;
        if(platform.left < 0){
          platform.left = gridWidth;
        }
      });
    }
  }

  function start() {
    if (!isGameOver) {
      createDoodler();
      createPlatforms();

      setInterval(function () {
        movePlatforms();
      }, 20);
    }
  }
  // TODO - ATTACH BUTTON
  start();
})