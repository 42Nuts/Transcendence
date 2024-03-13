import { Component } from "../../core/index.js";
import Store from "../../store/index.js";

class Card extends Component {
  constructor(props) {
    super(props);
    Store.events.subscribe("gameModeChange", () => {
      if (Store.state.gameMode === this.props.gameMode) {
        this.cardBoard.classList.add("border-8", "border-primary-button");
      } else {
        this.cardBoard.classList.remove("border-8", "border-primary-button");
      }
    });
  }

  handleClick() {
    Store.dispatch(this.props.optionName, this.props.gameMode);
  }

  render() {
    const card = document.createElement("button");
    card.className = "w-[264px] h-[264px] relative";

    this.cardBoard = document.createElement("div");
    this.cardBoard.className =
      "w-[264px] h-[264px] left-0 top-0 absolute bg-primary-card_background dark:bg-secondary-card_background rounded-[60px]";
    this.cardBoard.classList.add("shadow-md");
    if (Store.state.gameMode === this.props.gameMode) {
      this.cardBoard.classList.add("border-8", "border-primary-button");
    }

    const cardImage = document.createElement("img");
    cardImage.className = "w-60 h-60 left-[12px] top-0 absolute";
    cardImage.src = this.props.image;

    const cardTitle = document.createElement("div");
    cardTitle.className = `${this.props.titleLeft} top-[204px] absolute text-center text-primary-text dark:text-secondary-text text-4xl font-semibold font-['Inter'] leading-9`;
    cardTitle.innerText = this.props.title;

    card.addEventListener("mouseover", () => {
      card.classList.add("scale-110");
    });

    card.addEventListener("mouseout", () => {
      card.classList.remove("scale-110");
    });

    card.appendChild(this.cardBoard);
    card.appendChild(cardImage);
    card.appendChild(cardTitle);

    card.addEventListener("click", this.handleClick.bind(this));

    return card;
  }
}

export default Card;
