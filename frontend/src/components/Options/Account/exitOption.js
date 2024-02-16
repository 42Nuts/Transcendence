import { Component } from "../../../core/index.js";

class ExitOption extends Component {
  render() {
    const option = document.createElement("div");
    option.className = "justify-start items-center gap-10 inline-flex";

    const optionText = document.createElement("div");
    optionText.className =
      "text-center text-primary-text text-[40px] font-semibold font-['Inter'] leading-10";
    optionText.textContent = this.props.text;

    const iconContainer = document.createElement("div");
    iconContainer.className = "w-[72px] h-[72px] relative";

    const iconBg = document.createElement("div");
    iconBg.className = `absolute inset-0 m-auto flex items-center justify-center ${this.props.bgColorClass} rounded-full`;

    const iconImage = document.createElement("img");
    iconImage.src = this.props.iconSrc;
    iconImage.className = "w-[48px] h-[48px]";

    iconBg.appendChild(iconImage);
    iconContainer.appendChild(iconBg);
    option.appendChild(optionText);
    option.appendChild(iconContainer);

    return option;
  }
}

export default ExitOption;
