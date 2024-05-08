import hummerImage from "../img/hummer.png";

export default function changeCursor(element) {
  element.style.cursor = `url(${hummerImage}), auto`;
}
