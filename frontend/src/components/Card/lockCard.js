import { Component } from "../../core/index.js";

class LockCard extends Component {
  render() {
    const card = document.createElement("div");
    card.className = "w-[264px] h-[264px] relative";

    const cardBoard = document.createElement("div");
    cardBoard.className = "w-[264px] h-[264px] left-0 top-0 absolute bg-primary-card_background rounded-[60px]";

    const cardImage = document.createElement("img");
    cardImage.className = "w-60 h-60 left-[12px] top-0 absolute";
    cardImage.src = this.props.image;

    const cardTitle = document.createElement("div");
    cardTitle.className = `${this.props.titleLeft} top-[204px] absolute text-center text-primary-text text-4xl font-semibold font-['Inter'] leading-9`;
    cardTitle.innerText = this.props.title;

    const cardOverlay = document.createElement("div");
    cardOverlay.className = "w-[264px] h-[264px] left-0 top-0 absolute opacity-10 bg-primary-text rounded-[60px]";

    const cardLock = document.createElement("img");
    cardLock.className = "w-24 h-24 left-[84px] top-[84px] absolute";
    cardLock.src = this.props.lock;


    card.appendChild(cardBoard);
    card.appendChild(cardImage);
    card.appendChild(cardTitle);
    card.appendChild(cardOverlay);
    card.appendChild(cardLock);

    return card;
  }
}

export default LockCard;
