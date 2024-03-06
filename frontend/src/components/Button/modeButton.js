import { Component } from "../../core/index.js";
import Store from "../../store/index.js";
import { profileImages, themeImages } from "../../config/index.js";

class ModeButton extends Component {
  handleClick() {
    Store.dispatch(this.props.optionName);
    this.handleStateChange();
  }

  handleStateChange() {
    const newState = Store.state;
    this.updateImage(profileImages[newState.nickname]);
  }

  updateImage(newImageSrc) {
    const image = this.button.querySelector("img");
    if (image) {
      image.src = newImageSrc;
    }
  }

  render() {
    this.button = document.createElement("button");
    this.button.className =
      "w-[72px] h-[72px] relative inline-flex justify-center items-center";

    const image = document.createElement("img");
    image.src = this.props.imageSrc;
    image.className = "w-[72px] h-[72px]";
    this.button.appendChild(image);

    this.button.addEventListener("click", this.handleClick.bind(this));

    return this.button;
  }
}

export default ModeButton;
