import { Component, createComponent } from "../../core/index.js";
import { IconButton } from "../Button/index.js";

class PopUp extends Component {
  render() {
    const overlay = document.createElement("div");
    overlay.className =
      "absolute m-auto fixed inset-0 bg-primary-text bg-opacity-50 flex justify-center items-center";
    overlay.id = `${this.props.popupName}`;
    overlay.style.display = "none";
    // 이제 box 대신 overlay를 최상위 컨테이너로 사용

    const box = document.createElement("div");
    box.className = "flex justify-center items-center min-h-screen";

    const container = document.createElement("div");
    container.className = `w-[${this.props.boxWidth}] h-[298px] px-16 py-8 bg-primary-card_background rounded-[50px] flex-col justify-start items-center gap-6 inline-flex`;

    const textContainer = document.createElement("div");
    textContainer.className = "flex-col justify-start items-center gap-4 flex";

    const title = document.createElement("div");
    title.className = "text-primary-text text-[40px] font-bold font-['Inter']";
    title.textContent = this.props.title;

    const description = document.createElement("div");
    description.className =
      "text-center text-primary-text text-2xl font-medium font-['Inter']";

    const paragraph = document.createElement("p");
    paragraph.textContent = this.props.description;
    description.appendChild(paragraph);

    const paragraph2 = document.createElement("p");
    paragraph2.textContent = this.props.description2;
    description.appendChild(paragraph2);

    const buttonContainer = document.createElement("div");
    buttonContainer.className =
      "justify-center items-center gap-16 inline-flex";

    const cancelButton = createComponent(IconButton, {
      iconSrc: "./src/assets/images/icon-close.svg",
      bgColorClass: "bg-primary-text",
      optionName: this.props.optionName,
    });

    const confirmButton = createComponent(IconButton, {
      iconSrc: "./src/assets/images/icon-check.svg",
      bgColorClass: "bg-primary-text",
    });

    textContainer.appendChild(title);
    textContainer.appendChild(description);
    buttonContainer.appendChild(cancelButton);
    buttonContainer.appendChild(confirmButton);
    container.appendChild(textContainer);
    container.appendChild(buttonContainer);
    box.appendChild(container);
    overlay.appendChild(box); // box를 overlay에 추가

    return overlay;
  }
}

export default PopUp;
