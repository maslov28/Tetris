import { SIZE_BLOCK, COLUMNS, ROWS } from "../index.js";

export class View {
  constructor (container) {
    this.container = container;
    this.preview();
  }
  colors = {
    J: 'Crimson',
    I: 'SeaGreen',
    O: 'LightSeaGreen',
    L: 'Tomato',
    2: 'Gold',
    T: 'BlueViolet',
    S: 'DarkSlateGray'
  };
  
  canvas = document.createElement('canvas');

  preview() {
    this.container.textContent = '';
    const textBlock = document.createElement('div');
    textBlock.innerHTML = 'Press ENTER <br> to start';
    textBlock.style.cssText = `
    border: 3px solid black;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    padding: 50px;
    grid-column: 1 / 3;
    `;
    this.container.append(textBlock);
  }

  init() {
    this.container.textContent = '';
    this.canvas.style.gridArea = 'game';
    this.canvas.classList.add('game-area');
    this.container.append(this.canvas);
    this.canvas.width = SIZE_BLOCK * COLUMNS;
    this.canvas.height = SIZE_BLOCK * ROWS;
  }

  createBlockScore() {
    const scoreBlock = document.createElement('div');
    scoreBlock.style.cssText = `
    border: 2px solid black;
    font-size: 18px;
    text-align: center;
    padding: 20px;
    grid-area: score;
    `;

    const linesElem = document.createElement('p');
    const scoreElem = document.createElement('p');
    const levelElem = document.createElement('p');
    const recordElem = document.createElement('p');

    scoreBlock.append(linesElem, scoreElem, levelElem, recordElem);

    this.container.append(scoreBlock);

    return (lines, score, level, record) => {
      linesElem.textContent = `lines ${lines}`;
      scoreElem.textContent = `score ${score}`;
      levelElem.textContent = `level ${level}`;
      recordElem.textContent = `record ${record}`;
    }
  }

  createBlockNextTetramino() {
    const tetraminoBlock = document.createElement('div');
    tetraminoBlock.style.cssText = `
    width: ${SIZE_BLOCK * 4}px;
    height: ${SIZE_BLOCK * 4}px;
    border: 2px solid black;
    padding: 10px;
    grid-area: next;
    display: flex;
    align-items: center;
    justify-content: center;
    `;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    tetraminoBlock.append(canvas);

    this.container.append(tetraminoBlock);

    return (tetramino) => {
      canvas.width = SIZE_BLOCK * tetramino.length;
      canvas.height = SIZE_BLOCK * tetramino.length;
      context.clearRect(0, 0, canvas.width, canvas.height);
  
      for (let y = 0; y < tetramino.length; y++) {
        const line = tetramino[y];
        for (let x = 0; x < line.length; x++) {
          const block = line[x];
          if (block !== 'o') {
            context.fillStyle = this.colors[block];
            context.strokeStyle = 'white';
            context.fillRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
            context.strokeRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
          }
        }
      }
    }
  }
  
  showArea(area) {
    const context = this.canvas.getContext('2d');
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  
    for (let y = 0; y < area.length; y++) {
      const line = area[y];
      for (let x = 0; x < line.length; x++) {
        const block = line[x];
        if (block !== 'o') {
          context.fillStyle = this.colors[block];
          context.strokeStyle = 'white';
          context.fillRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
          context.strokeRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
        }
      }
    }
  };
}