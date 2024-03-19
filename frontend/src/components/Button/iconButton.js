import { Component } from "../../core/index.js";
import Store from "../../store/index.js";

class IconButton extends Component {
  handleClick() {
    if (this.props.optionName) {
      Store.dispatch(this.props.optionName);
    }
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  render() {
    const iconContainer = document.createElement("button");
    iconContainer.className = `${this.props.containerWidth} ${this.props.containerHeight} relative`;

    const iconBg = document.createElement("div");
    iconBg.className = `absolute inset-0 m-auto flex items-center justify-center ${this.props.bgColorClass} rounded-full`;

    const iconImage = document.createElement("img");
    iconImage.src = this.props.iconSrc;
    iconImage.className = `${this.props.iconWidth} ${this.props.iconHeight}`;

    iconBg.appendChild(iconImage);
    iconContainer.appendChild(iconBg);

    iconContainer.addEventListener("click", this.handleClick.bind(this));

    return iconContainer;
  }
}

export default IconButton;
