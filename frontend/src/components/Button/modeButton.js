import { Component } from "../../core/index.js";
import Store from "../../store/index.js";

class ModeButton extends Component {
  handleClick() {
    Store.dispatch(this.props.optionName);
  }

  render() {
    const button = document.createElement("button");
    button.className =
      "w-[72px] h-[72px] relative inline-flex justify-center items-center";

    const image = document.createElement("img");
    image.src = this.props.imageSrc;
    image.className = "w-[72px] h-[72px]";
    button.appendChild(image);

    button.addEventListener("click", this.handleClick.bind(this));

    return button;
  }
}

export default ModeButton;
