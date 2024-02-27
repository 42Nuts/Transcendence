import { Component } from "../../core/index.js";

class Card extends Component {
  render() {
    const container = document.createElement("div");
    container.className = `${this.props.left} absolute`;

    const cardBoard = document.createElement("div");
    cardBoard.className =
      "w-[264px] h-[334px] left-0 top-0 absolute bg-primary-card_background rounded-[20px] shadow";

    const cardContent = document.createElement("div");
    cardContent.className = "w-60 h-[272px] left-[12px] top-[13px] absolute flex-col justify-start items-center inline-flex";

    const cardImage = document.createElement("img");
    cardImage.className = "w-60 h-60";
    cardImage.src = this.props.imageSrc;

    const cardTitle = document.createElement("div");
    cardTitle.className = "text-center text-primary-text text-[32px] font-semibold font-['Inter'] leading-loose";
    cardTitle.innerText = this.props.title;

    cardContent.appendChild(cardImage);
    cardContent.appendChild(cardTitle);

    container.appendChild(cardBoard);
    container.appendChild(cardContent);

    return container;
  }
}

export default Card;
