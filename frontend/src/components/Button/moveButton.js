import { Component } from "../../core/index.js";

class MoveButton extends Component {
  render() {
    const container = document.createElement("div");
    container.className = "justify-start items-center gap-4 inline-flex";

    // left arrow
    const leftButton = document.createElement("button");
    leftButton.className = "w-[18px] h-[18px] relative";

    const leftImage = document.createElement("img");
    leftImage.src = "/static/assets/images/icon-arrow-left.svg";
    leftImage.className = "w-[18px] h-[18px] relative";

    leftButton.appendChild(leftImage);

    // point
    const buttonsContainer = document.createElement("div");
    buttonsContainer.className = "justify-center items-center gap-1.5 flex";

    const point1 = document.createElement("div");
    point1.className = "w-[9px] h-[9px] bg-primary-text rounded-full";

    const point2 = document.createElement("div");
    point2.className = "w-2 h-2 bg-primary-inner_card_top rounded-full";

    const point3 = document.createElement("div");
    point3.className = "w-2 h-2 bg-primary-inner_card_top rounded-full";

    const point4 = document.createElement("div");
    point4.className = "w-2 h-2 bg-primary-inner_card_top rounded-full";

    const point5 = document.createElement("div");
    point5.className = "w-2 h-2 bg-primary-inner_card_top rounded-full";

    buttonsContainer.appendChild(point1);
    buttonsContainer.appendChild(point2);
    buttonsContainer.appendChild(point3);
    buttonsContainer.appendChild(point4);
    buttonsContainer.appendChild(point5);

    // right arrow
    const rightButton = document.createElement("button");
    rightButton.className = "w-[18px] h-[18px] relative";

    const rightImage = document.createElement("img");
    rightImage.src = "/static/assets/images/icon-arrow-right.svg";
    rightButton.className = "w-[18px] h-[18px] relative";

    rightButton.appendChild(rightImage);

    container.appendChild(leftButton);
    container.appendChild(buttonsContainer);
    container.appendChild(rightButton);

    return container;
  }
}

export default MoveButton;
