import { Component } from "../../core/index.js";

class MoveButton extends Component {
  constructor(props) {
    super(props);

    this.points = [];
  }

  movePointRight() {
    const firstPoint = this.points.shift();
    this.points.push(firstPoint);

    this.updatePointsClasses();
  }

  movePointLeft() {
    const lastPoint = this.points.pop();
    this.points.unshift(lastPoint);

    this.updatePointsClasses();
  }

  updatePointsClasses() {
    this.points.forEach((point) => {
      point.className = "w-2 h-2 bg-primary-inner_card_top rounded-full";
    });

    this.points[0].className = "w-[9px] h-[9px] bg-primary-text rounded-full";
  }

  render() {
    const container = document.createElement("div");
    container.className = "justify-start items-center gap-4 inline-flex";

    // point
    const buttonsContainer = document.createElement("div");
    buttonsContainer.className = "justify-center items-center gap-1.5 flex";
    
    for (let i = 0; i < 5; i++) {
      const point = document.createElement("div");
      point.className =
      i === 0
      ? "w-[9px] h-[9px] bg-primary-text rounded-full"
      : "w-2 h-2 bg-primary-inner_card_top rounded-full";
      this.points.push(point);
      buttonsContainer.appendChild(point);
    }

    // left arrow
    const leftButton = document.createElement("button");
    leftButton.className = "w-[18px] h-[18px] relative";

    const leftImage = document.createElement("img");
    leftImage.src = "/static/assets/images/icon-arrow-left.svg";
    leftImage.className = "w-[18px] h-[18px] relative";

    leftButton.appendChild(leftImage);

    leftButton.addEventListener("click", () => this.movePointLeft());

    // right arrow
    const rightButton = document.createElement("button");
    rightButton.className = "w-[18px] h-[18px] relative";

    const rightImage = document.createElement("img");
    rightImage.src = "/static/assets/images/icon-arrow-right.svg";
    rightButton.className = "w-[18px] h-[18px] relative";

    rightButton.appendChild(rightImage);

    rightButton.addEventListener("click", () => this.movePointRight());

    container.appendChild(leftButton);
    container.appendChild(buttonsContainer);
    container.appendChild(rightButton);

    return container;
  }
}

export default MoveButton;
