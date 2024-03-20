import { Component } from "../../core/index.js";

class TournamentResultCard extends Component {
  render() {
    const container = document.createElement("div");
    container.className =
      "flex-col justify-start items-center gap-12 inline-flex";

    const box = document.createElement("div");
    box.className = "w-56 h-56 relative";

    const board = document.createElement("div");
    board.className =
      "w-56 h-56 left-0 top-0 absolute bg-primary-card_background dark:bg-secondary-card_background rounded-[50.91px] shadow-md";

    const insideBoard = document.createElement("div");
    insideBoard.className =
      "left-[50.91px] top-[30.59px] absolute flex-col justify-start items-center gap-[6.79px] inline-flex";

    const imageContainer = document.createElement("div");
    imageContainer.className =
      "w-[122.18px] h-[122.18px] justify-center items-center inline-flex";

    const imageBox = document.createElement("div");
    imageBox.className = "w-[122.18px] h-[122.18px] relative";

    const image = document.createElement("img");
    image.src = this.props.imageSrc;
    image.className =
      "w-[122.18px] h-[122.18px] left-0 top-0 absolute shadow-md rounded-full";

    imageBox.appendChild(image);
    imageContainer.appendChild(imageBox);

    const textContainer = document.createElement("div");
    textContainer.className =
      "justify-center items-center gap-[6.79px] inline-flex";

    const name = document.createElement("div");
    name.className =
      "text-primary-text dark:text-secondary-text text-[27.15px] font-semibold font-['Inter']";
    name.innerHTML = this.props.name;

    textContainer.appendChild(name);

    insideBoard.appendChild(imageContainer);
    insideBoard.appendChild(textContainer);

    board.appendChild(insideBoard);
    box.appendChild(board);

    const title = document.createElement("div");
    title.className =
      "text-primary-text dark:text-secondary-text text-4xl font-black font-['Inter']";
    title.innerHTML = this.props.order;

    container.appendChild(box);
    container.appendChild(title);

    return container;
  }
}

export default TournamentResultCard;
