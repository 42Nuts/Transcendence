import { Component } from "../../../core/index.js";

class Tier extends Component {
  render() {
    const container = document.createElement("div");
    container.className = "w-[72px] h-[72px] relative";

    const tierBox = document.createElement("div");
    tierBox.className = "w-[72px] h-[72px] left-0 top-0 absolute";

    const tierImage = document.createElement("img");
    tierImage.src = this.props.src;
    tierImage.className = "w-[64.68px] h-[72px] left-[4px] top-0 absolute";

    tierBox.appendChild(tierImage);
    container.appendChild(tierBox);

    return container;
  }
}

export default Tier;