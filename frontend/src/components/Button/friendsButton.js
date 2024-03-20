import { Component } from "../../core/index.js";

class FriendsButton extends Component {
  render() {
    const container = document.createElement("button");
    container.className = `self-stretch px-4 py-[5px] ${this.props.bgColor} rounded-lg justify-center items-center gap-2 inline-flex`;

    const icon = document.createElement("img");
    icon.src = this.props.iconSrc;
    icon.className = "w-4 h-4 relative";

    const text = document.createElement("div");
    text.className = `text-xs font-semibold font-['Inter'] ${this.props.textColor}`;
    text.innerText = this.props.text;

    container.appendChild(icon);
    container.appendChild(text);

    return container;
  }
}

export default FriendsButton;