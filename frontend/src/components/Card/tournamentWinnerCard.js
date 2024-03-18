import { Component } from "../../core/index.js";

class TournamentWinnerCard extends Component {
  render() {
    const container = document.createElement("div");
    container.className = "flex-col justify-start items-center gap-12 inline-flex";

    const box = document.createElement("div");
    box.className = "w-[366px] h-[294.43px] relative";

    const boardBox = document.createElement("div");
    boardBox.className = "w-[264px] h-[264px] left-[52px] top-[16px] absolute";

    const board = document.createElement("div");
    board.className = "w-[264px] h-[264px] left-0 top-0 absolute bg-primary-card_background dark:bg-secondary-card_background rounded-[60px]";

    const insideBoard = document.createElement("div");
    insideBoard.className = "left-[60px] top-[36px] absolute flex-col justify-start items-center gap-2 inline-flex";

    const imageContainer = document.createElement("div");
    imageContainer.className = "w-36 h-36 justify-center items-center inline-flex";

    const imageBox = document.createElement("div");
    imageBox.className = "w-36 h-36 relative";

    const image = document.createElement("img");
    image.src = this.props.imageSrc;
    image.className = "w-36 h-36 left-0 top-0 absolute shadow-md rounded-full";

    imageBox.appendChild(image);
    imageContainer.appendChild(imageBox);

    const nameContainer = document.createElement("div");
    nameContainer.className = "justify-center items-center gap-2 inline-flex";

    const name = document.createElement("div");
    name.className = "text-primary-text dark:text-secondary-text text-[32px] font-semibold font-['Inter']";
    name.innerHTML = this.props.name;

    nameContainer.appendChild(name);

    insideBoard.appendChild(imageContainer);
    insideBoard.appendChild(nameContainer);

    boardBox.appendChild(board);
    board.appendChild(insideBoard);

    const winnerImageContainer = document.createElement("div");
    winnerImageContainer.className = "w-[366px] h-[294.43px] left-0 top-0 absolute";

    const winnerImage = document.createElement("img");
    winnerImage.src = "/static/assets/images/winner.svg";
    winnerImage.className = "w-[366px] h-[294.43px]";

    winnerImageContainer.appendChild(winnerImage);

    box.appendChild(boardBox);
    box.appendChild(winnerImageContainer);

    const title = document.createElement("div");
    title.className = "text-primary-color5 text-[40px] font-black font-['Inter']";
    title.innerHTML = "1st";

    container.appendChild(box);
    container.appendChild(title);

    return container;
  }
}

export default TournamentWinnerCard;