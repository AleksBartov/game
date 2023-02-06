window.addEventListener('load', function() {
    const margin = 50;
  const canvas = this.document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  canvas.width = this.window.innerWidth - margin;
  canvas.height = this.window.innerHeight - margin;

  class Player {
    constructor(game) {
        this.game = game;
    }
  }

  class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.player = new Player(this);
    }
  }

  const game = new Game(canvas);
  console.log(game);

  function animate() {

  }
});