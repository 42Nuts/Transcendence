import { Component } from "../../core/index.js";
import Store from "../../store/index.js";

class ModeButton extends Component {
  handleClick() {
    Store.dispatch(this.props.optionName);
    this.handleStateChange();
  }

  handleStateChange() {
    const newState = Store.state;
    var newImageSrc;

    if (this.props.optionName === "updateNickName") {
      newImageSrc = this.props.imageSrc[newState.nickname];
    } else if (this.props.optionName === "updateTheme") {
      newImageSrc = this.props.imageSrc[newState.theme];
    } else if (this.props.optionName === "toggleDarkMode") {
      const darkModeValue = newState.darkMode ? 1 : 0;
      newImageSrc = this.props.imageSrc[darkModeValue];
    }

    this.updateImage(newImageSrc);
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
    image.src = this.props.imageSrc[0];
    image.className = "w-[72px] h-[72px]";
    this.button.appendChild(image);

    this.button.addEventListener("click", this.handleClick.bind(this));

    return this.button;
  }
}

export default ModeButton;
