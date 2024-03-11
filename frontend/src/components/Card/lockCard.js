import { Component } from "../../core/index.js";
import Store from "../../store/index.js";

class LockCard extends Component {
  constructor(props) {
    super(props);
    Store.events.subscribe("darkModeChange", this.updateImage.bind(this));
  }

  updateImage() {
    if (Store.state.darkMode) {
      this.cardLock.src = "/static/assets/images/icon-lock-dark.svg";
    } else {
      this.cardLock.src = "/static/assets/images/icon-lock.svg";
    }
  }

  render() {
    const card = document.createElement("button");
    card.className = "w-[264px] h-[264px] relative";

    const cardBoard = document.createElement("div");
    cardBoard.className =
      "w-[264px] h-[264px] left-0 top-0 absolute bg-primary-card_background dark:bg-secondary-card_background rounded-[60px]";
    cardBoard.classList.add("shadow-md");

    const cardImage = document.createElement("img");
    cardImage.className = "w-60 h-60 left-[12px] top-0 absolute";
    cardImage.src = this.props.image;

    const cardTitle = document.createElement("div");
    cardTitle.className = `${this.props.titleLeft} top-[204px] absolute text-center text-primary-text dark:text-secondary-text text-4xl font-semibold font-['Inter'] leading-9`;
    cardTitle.innerText = this.props.title;

    const cardOverlay = document.createElement("div");
    cardOverlay.className =
      "w-[264px] h-[264px] left-0 top-0 absolute opacity-10 bg-primary-text dark:bg-secondary-text rounded-[60px]";

    this.cardLock = document.createElement("img");
    this.cardLock.className = "w-24 h-24 left-[84px] top-[84px] absolute";
    if (Store.state.darkMode) {
      this.cardLock.src = "/static/assets/images/icon-lock-dark.svg";
    } else {
      this.cardLock.src = "/static/assets/images/icon-lock.svg";
    }

    card.addEventListener("mouseover", () => {
      card.classList.add("scale-110");
    });

    card.addEventListener("mouseout", () => {
      card.classList.remove("scale-110");
    });

    card.appendChild(cardBoard);
    card.appendChild(cardImage);
    card.appendChild(cardTitle);
    card.appendChild(cardOverlay);
    card.appendChild(this.cardLock);

    return card;
  }
}

export default LockCard;
