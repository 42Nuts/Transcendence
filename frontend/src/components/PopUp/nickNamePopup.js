import { Component, createComponent } from "../../core/index.js";
import { IconButton } from "../Button/index.js";

class NickNamePopUp extends Component {
  render() {
    const overlay = document.createElement("div");
    overlay.className =
      "absolute m-auto fixed inset-0 bg-primary-text bg-opacity-50 flex justify-center items-center";
    overlay.id = "nickName";
    overlay.style.display = "none";

    const box = document.createElement("div");
    box.className = "flex justify-center items-center min-h-screen";

    box.appendChild(container);
    overlay.appendChild(box);

    return overlay;
  }
}

export default NickNamePopUp;
