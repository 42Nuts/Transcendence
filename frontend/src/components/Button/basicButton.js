import { Component } from "../../core/index.js";

class BasicButton extends Component {
  render() {
    const buttonDiv = document.createElement("button");
    buttonDiv.className =
      "px-6 py-3 bg-primary-button dark:bg-secondary-button rounded-[28px] justify-center items-center inline-flex";

    buttonDiv.addEventListener("mouseenter", () => {
      buttonDiv.classList.replace(
        "bg-primary-button",
        "bg-primary-button_hover"
      );
      buttonDiv.classList.replace(
        "dark:bg-secondary-button",
        "dark:bg-primary-button_hover"
      );
    });

    buttonDiv.addEventListener("mouseleave", () => {
      buttonDiv.classList.replace(
        "bg-primary-button_hover",
        "bg-primary-button"
      );
      buttonDiv.classList.replace(
        "dark:bg-primary-button_hover",
        "dark:bg-secondary-button"
      );
    });

    if (this.props.onClick) {
      buttonDiv.addEventListener("click", this.props.onClick);
    }

    const buttonText = document.createElement("div");
    buttonText.className =
      "text-center text-primary-button_text text-[40px] font-semibold font-['Inter'] leading-10";
    buttonText.textContent = this.props.text;

    buttonDiv.appendChild(buttonText);

    return buttonDiv;
  }
}

export default BasicButton;
