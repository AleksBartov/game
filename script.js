window.addEventListener('load', function() {
    const margin = 30;
  const canvas = this.document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  canvas.width = this.window.innerWidth - margin;
  canvas.height = this.window.innerHeight - margin;

  ctx.fillStyle = 'white';
  ctx.lineWidth = 4;
  ctx.strokeStyle = 'white';

  class Player {
    constructor(game) {
        this.game = game;
        this.collisionX = this.game.width * 0.5;
        this.collisionY = this.game.height * 0.5;
        this.collisionRadius = 50;
        this.speedX = 0;
        this.speedY = 0;
        this.dx = 0;
        this.dy = 0;
        this.speedModifier = 10;
    }
    draw(context) {
      context.beginPath();
      context.arc(this.collisionX, this.collisionY, this.collisionRadius, 0, Math.PI * 2);
      context.save();
      context.globalAlpha = 0.5;
      context.fill();
      context.restore();
      context.stroke();
      context.beginPath();
      context.moveTo(this.collisionX, this.collisionY);
      context.lineTo(this.game.mouse.x, this.game.mouse.y);
      context.stroke();
    }
    update() {
      this.dx = this.game.mouse.x - this.collisionX;
      this.dy = this.game.mouse.y - this.collisionY;
      const distance = Math.hypot(this.dy, this.dx);
      if (distance > this.speedModifier) {
        this.speedX = this.dx/distance || 0;
        this.speedY = this.dy/distance || 0;
      } else {
        this.speedX =  0;
        this.speedY = 0;
      }
      this.collisionX += this.speedX * this.speedModifier;
      this.collisionY += this.speedY * this.speedModifier;
    }
  }

  class Obstacle {
    constructor( game ) {
      this.game = game;
      this.collisionX = Math.random() * this.game.width;
      this.collisionY = Math.random() * this.game.height;
      this.collisionRadius = 80;
    }

    draw(context) {
      context.beginPath();
      context.arc(this.collisionX, this.collisionY, this.collisionRadius, 0, Math.PI * 2);
      context.save();
      context.globalAlpha = 0.5;
      context.fill();
      context.restore();
      context.stroke();
    }
  }

  class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.player = new Player(this);
        this.numOfObstacles = 6;
        this.obstacles = [];

        this.mouse = {
          x: this.width * 0.5,
          y: this.height * 0.5,
          pressed: false,
        }

        canvas.addEventListener('mousedown', (e) => {
          this.mouse.x = e.offsetX;
          this.mouse.y = e.offsetY;
          this.mouse.pressed = true;
        })
        canvas.addEventListener('mouseup', (e) => {
          this.mouse.x = e.offsetX;
          this.mouse.y = e.offsetY;
          this.mouse.pressed = false;
        })
        canvas.addEventListener('mousemove', (e) => {
          if(this.mouse.pressed) {
            this.mouse.x = e.offsetX;
            this.mouse.y = e.offsetY;
          }
        })
    }
    render(context) {
      this.player.draw(context);
      this.player.update();
      this.obstacles.forEach(obstacle => obstacle.draw(context));
    }

    init() {
      for (let i = 0; i < this.numOfObstacles; i++) {
        this.obstacles.push(new Obstacle(this));
      }
    }
  }

  const game = new Game(canvas);
  game.init();
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.render(ctx);
    requestAnimationFrame(animate);
  }

  animate();
});
