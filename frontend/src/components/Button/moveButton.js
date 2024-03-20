import { Component } from "../../core/index.js";
import Store from "../../store/index.js";

class MoveButton extends Component {
  constructor(props) {
    super(props);

    this.points = [];
    Store.events.subscribe("darkModeChange", this.updateImages.bind(this));
  }

  updateImages() {
    if (Store.state.darkMode) {
      this.leftImage.src = "/static/assets/images/icon-arrow-left-dark.svg";
      this.rightImage.src = "/static/assets/images/icon-arrow-right-dark.svg";
    } else {
      this.leftImage.src = "/static/assets/images/icon-arrow-left.svg";
      this.rightImage.src = "/static/assets/images/icon-arrow-right.svg";
    }
  }

  movePointRight() {
    this.props.activeIndex = (this.props.activeIndex + 1) % this.points.length;
    Store.dispatch(this.props.dispatch, this.props.activeIndex);

    this.updatePointsClasses();
  }

  movePointLeft() {
    this.props.activeIndex =
      (this.props.activeIndex - 1 + this.points.length) % this.points.length;
    Store.dispatch(this.props.dispatch, this.props.activeIndex);

    this.updatePointsClasses();
  }

  updatePointsClasses() {
    this.points.forEach((point, index) => {
      point.className =
        index === this.props.activeIndex
          ? "w-[9px] h-[9px] bg-primary-text dark:bg-secondary-text rounded-full"
          : "w-2 h-2 bg-primary-inner_card_top rounded-full";
    });
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
        i === this.props.activeIndex
          ? "w-[9px] h-[9px] bg-primary-text dark:bg-secondary-text rounded-full"
          : "w-2 h-2 bg-primary-inner_card_top rounded-full";
      this.points.push(point);
      buttonsContainer.appendChild(point);
    }

    // left arrow
    const leftButton = document.createElement("button");
    leftButton.className = "w-[18px] h-[18px] relative";

    this.leftImage = document.createElement("img");
    if (Store.state.darkMode) {
      this.leftImage.src = "/static/assets/images/icon-arrow-left-dark.svg";
    } else {
      this.leftImage.src = "/static/assets/images/icon-arrow-left.svg";
    }
    this.leftImage.className = "w-[18px] h-[18px] relative";

    leftButton.appendChild(this.leftImage);

    leftButton.addEventListener("click", () => this.movePointLeft());

    // right arrow
    const rightButton = document.createElement("button");
    rightButton.className = "w-[18px] h-[18px] relative";

    this.rightImage = document.createElement("img");
    if (Store.state.darkMode) {
      this.rightImage.src = "/static/assets/images/icon-arrow-right-dark.svg";
    } else {
      this.rightImage.src = "/static/assets/images/icon-arrow-right.svg";
    }
    rightButton.className = "w-[18px] h-[18px] relative";

    rightButton.appendChild(this.rightImage);

    rightButton.addEventListener("click", () => this.movePointRight());

    container.appendChild(leftButton);
    container.appendChild(buttonsContainer);
    container.appendChild(rightButton);

    return container;
  }
}

export default MoveButton;
