import { Component } from "../../core/index.js";
import Store from "../../store/index.js";

class BackIconButton extends Component {
  constructor(props) {
    super(props);
    Store.events.subscribe("darkModeChange", this.updateImage.bind(this));
  }

  updateImage() {
    if (Store.state.darkMode) {
      this.image.src = "/static/assets/images/icon-arrow-back-dark.svg";
    } else {
      this.image.src = "/static/assets/images/icon-arrow-back.svg";
    }
  }

  render() {
    const icon = document.createElement("a");
    icon.href = "/home/";
    icon.className = "w-[72px] h-[72px] mt-32 inline-block";

    this.image = document.createElement("img");
    if (Store.state.darkMode) {
      this.image.src = "/static/assets/images/icon-arrow-back-dark.svg";
    } else {
      this.image.src = "/static/assets/images/icon-arrow-back.svg";
    }
    this.image.className = "w-[72px] h-[72px]";
    this.image.alt = "Back to home";

    icon.appendChild(this.image);

    return icon;
  }
}

export default BackIconButton;
