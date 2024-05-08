/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/img/goblin.png
const goblin_namespaceObject = __webpack_require__.p + "2dbd01ce16c0fa83cb67.png";
;// CONCATENATED MODULE: ./src/js/Goblin.js

class Goblin {
  constructor() {
    this.icon = document.createElement("img");
    this.icon.className = "goblin";
    this.icon.src = goblin_namespaceObject;
    this.icon.alt = "goblin";
  }
}
;// CONCATENATED MODULE: ./src/img/hummer.png
const hummer_namespaceObject = __webpack_require__.p + "4711da172d868b169051.png";
;// CONCATENATED MODULE: ./src/js/cursor.js

function changeCursor(element) {
  element.style.cursor = `url(${hummer_namespaceObject}), auto`;
}
;// CONCATENATED MODULE: ./src/js/Game.js


class Game {
  constructor() {
    this.boardSize = 16;
    this.cells = [];
    this.container = null;
    this.currentIndex = 0;
    this.speed = null;
    this.enemy = new Goblin();
    this.miss = 0;
    this.hit = 0;
    this.showEnemyBound = this.showEnemy.bind(this);
  }
  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error("container is not HTMLElement");
    }
    this.container = container;
  }
  drawField() {
    for (let i = 0; i < this.boardSize; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      this.container.insertAdjacentElement("afterbegin", cell);
    }
  }
  showEnemy() {
    this.cells = document.querySelectorAll(".cell");
    this.cells.forEach(el => {
      el.classList.remove("active");
    });
    let icon = document.querySelector(".goblin");
    if (icon) {
      icon.remove();
    }
    const randomIndex = Math.floor(Math.random() * this.cells.length);
    if (this.currentIndex !== randomIndex) {
      this.cells[randomIndex].insertAdjacentElement("afterbegin", this.enemy.icon);
      this.cells[randomIndex].classList.add("active");
      this.currentIndex = randomIndex;
    }
  }
  start(speed) {
    this.speed = speed;
    setInterval(this.showEnemyBound, this.speed);
  }
  countHits() {
    const body = document.querySelector("body");
    const counter = document.createElement("div");
    body.insertAdjacentElement("afterbegin", counter);
    this.container.addEventListener("click", e => {
      const cell = e.target;
      if (cell.contains(this.enemy.icon)) {
        this.hit++;
        changeCursor(cell);
        this.enemy.icon.remove();
      } else {
        this.miss++;
      }
      counter.textContent = `Всего попаданий: ${this.hit}  Всего промахов: ${this.miss}`;
      this.checkLoss();
    });
  }
  checkLoss() {
    if (this.miss >= 5) {
      alert("Вы проиграли:(");
      location.reload();
    }
  }
}
;// CONCATENATED MODULE: ./src/js/app.js

const gamePlay = new Game();
gamePlay.bindToDOM(document.querySelector(".container"));
gamePlay.drawField();
gamePlay.start(1000);
gamePlay.countHits();
;// CONCATENATED MODULE: ./src/index.js





// TODO: write your code in app.js
/******/ })()
;