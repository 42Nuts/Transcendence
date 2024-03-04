import { Component } from "../../core/index.js";

class BackIconButton extends Component {
  render() {
    const icon = document.createElement("a");
    icon.href = "/";
    icon.className = "w-[72px] h-[72px] mt-32 inline-block";

    const image = document.createElement("img");
    image.src = "./src/assets/images/icon-arrow-back.svg";
    image.className = "w-[72px] h-[72px]";
    image.alt = "Back to home";

    icon.appendChild(image);

    return icon;
  }
}

export default BackIconButton;
