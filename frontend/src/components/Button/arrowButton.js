import { Component } from "../../core/index.js";

class ArrowButton extends Component {
  render() {
    const arrowButton = document.createElement("button");
    arrowButton.className = "w-[72px] h-[72px] left-0 top-0 absolute";

    const arrowImage = document.createElement("img");
    arrowImage.className = "w-[72px] h-[72px]";
    arrowImage.src = this.props.iconSrc;

    arrowButton.appendChild(arrowImage);
    return arrowButton;
  }
}

export default ArrowButton;
