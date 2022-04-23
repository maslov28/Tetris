

export class Controller {
  constructor(game, view) {
    this.game = game;
    this.view = view;
  }

  init(codeKey) {
    window.addEventListener('keydown', event => {
      if (event.code === codeKey) {
        this.view.init();
        this.start();
      }
    })
  }

  start() {
    this.view.showArea(this.game.viewArea);
    const showScore = this.view.createBlockScore();
    const showNextTetramino = this.view.createBlockNextTetramino();

    this.game.createUpdatePanels(showScore, showNextTetramino);

    const tick = () => {
      const time = (1100 - 100 * this.game.lvl);
      if (this.game.gameOver) return;
      setTimeout(() => {
        this.game.moveDown();
        this.view.showArea(this.game.viewArea);
        tick();
      }, time > 100 ? time : 100);
    };

    tick();

    window.addEventListener('keydown', event => {
      const key = event.code;

      switch (key) {
        case 'ArrowLeft':
          this.game.moveLeft();
          this.view.showArea(this.game.viewArea);
        break;
        case 'ArrowRight':
          this.game.moveRight();
          this.view.showArea(this.game.viewArea);
        break;
        case 'ArrowDown':
          this.game.moveDown();
          this.view.showArea(this.game.viewArea);
        break;
        case 'ArrowUp':
          this.game.rotateTetramino();
          this.view.showArea(this.game.viewArea);
        break;
      }
    });
  }
}