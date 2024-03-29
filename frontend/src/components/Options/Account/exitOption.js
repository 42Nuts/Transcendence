import { Component, createComponent } from "../../../core/index.js";
import { IconButton } from "../../Button/index.js";

class ExitOption extends Component {
  render() {
    const option = document.createElement("div");
    option.className = "justify-start items-center gap-10 inline-flex";

    const optionText = document.createElement("div");
    optionText.className =
      "text-center text-primary-text dark:text-secondary-text text-[40px] font-semibold font-['Inter'] leading-10";
    optionText.textContent = this.props.text;

    const iconContainer = createComponent(IconButton, {
      iconSrc: this.props.iconSrc,
      bgColorClass: this.props.bgColorClass,
      optionName: this.props.optionName,
      containerWidth: "w-[72px]",
      containerHeight: "h-[72px]",
      iconWidth: "w-[48px]",
      iconHeight: "h-[48px]",
    });

    option.appendChild(optionText);
    option.appendChild(iconContainer);

    return option;
  }
}

export default ExitOption;
