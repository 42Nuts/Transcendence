import { Component } from "../../core/index.js";

class BasicButton extends Component {
  render() {
    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add(
      "px-6",
      "py-3",
      "bg-primary-button",
      "rounded-[28px]",
      "justify-center",
      "items-center",
      "inline-flex"
    );

    buttonDiv.addEventListener("mouseenter", () => {
      buttonDiv.classList.replace(
        "bg-primary-button",
        "bg-primary-button_hover"
      );
    });

    buttonDiv.addEventListener("mouseleave", () => {
      buttonDiv.classList.replace(
        "bg-primary-button_hover",
        "bg-primary-button"
      );
    });

    const buttonText = document.createElement("div");
    buttonText.classList.add(
      "text-center",
      "text-primary-button_text",
      "text-[40px]",
      "font-semibold",
      "font-['Inter']",
      "leading-10"
    );
    buttonText.textContent = this.props.text;

    buttonDiv.appendChild(buttonText);

    return buttonDiv;
  }
}

export default BasicButton;
