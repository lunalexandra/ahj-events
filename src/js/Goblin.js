import image from "../img/goblin.png";

export default class Goblin {
  constructor() {
    this.icon = document.createElement("img");
    this.icon.className = "goblin";
    this.icon.src = image;
    this.icon.alt = "goblin";
  }
}
