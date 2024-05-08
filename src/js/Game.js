import Goblin from "./Goblin.js";
import changeCursor from "./cursor.js";

export default class Game {
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
    this.cells.forEach((el) => {
      el.classList.remove("active");
    });
    let icon = document.querySelector(".goblin");
    if (icon) {
      icon.remove();
    }
    const randomIndex = Math.floor(Math.random() * this.cells.length);
    if (this.currentIndex !== randomIndex) {
      this.cells[randomIndex].insertAdjacentElement(
        "afterbegin",
        this.enemy.icon,
      );
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

    this.container.addEventListener("click", (e) => {
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
