import { Component } from "../../core/index.js";
import Store from "../../store/index.js";

class IconButton extends Component {
  constructor(props) {
    super(props);
  }

  handleClick() {
    Store.dispatch(this.props.optionName);
  }

  render() {
    const iconContainer = document.createElement("button");
    iconContainer.className = "w-[72px] h-[72px] relative";

    const iconBg = document.createElement("div");
    iconBg.className = `absolute inset-0 m-auto flex items-center justify-center ${this.props.bgColorClass} rounded-full`;

    const iconImage = document.createElement("img");
    iconImage.src = this.props.iconSrc;
    iconImage.className = "w-[48px] h-[48px]";

    iconBg.appendChild(iconImage);
    iconContainer.appendChild(iconBg);

    iconContainer.addEventListener("click", this.handleClick.bind(this));

    return iconContainer;
  }
}

export default IconButton;
