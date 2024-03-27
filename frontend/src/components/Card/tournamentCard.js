import { Component } from "../../core/index.js";

class TournamentCard extends Component {
  render() {
    const container = document.createElement("div");
    container.className = `w-[224.40px] h-[224.40px] relative`;

    const cardBoard = document.createElement("div");
    cardBoard.className = `w-[224.40px] h-[224.40px] left-0 top-0 absolute bg-primary-card_background dark:bg-secondary-card_background rounded-[51px] shadow-md`;

    const insideContainer = document.createElement("div");
    insideContainer.className = "left-[54px] top-[35px] absolute flex-col justify-start items-center gap-2 inline-flex";

    const imageContainer = document.createElement("div");
    imageContainer.className = "w-[116.64px] h-[116.64px] shadow-md rounded-full justify-center items-center inline-flex";


    const image = document.createElement("img");
    image.src = this.props.imageSrc;
    image.className = `w-[116.64px] h-[116.64px] relative`;

    imageContainer.appendChild(image);

    const textContainer = document.createElement("div");
    textContainer.className = "justify-center items-center gap-2 inline-flex";

    const name = document.createElement("div");
    name.className = "text-primary-text dark:text-secondary-text text-2xl font-semibold font-['Inter']";
    name.innerHTML = this.props.name;

    textContainer.appendChild(name);
    
    insideContainer.appendChild(imageContainer);
    insideContainer.appendChild(textContainer);

    container.appendChild(cardBoard);
    container.appendChild(insideContainer);

    return container;
  }
}

export default TournamentCard;