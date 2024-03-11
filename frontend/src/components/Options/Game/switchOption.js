import { Component, createComponent } from "../../../core/index.js";
import { ModeButton } from "../../Button/index.js";

class SwitchOption extends Component {
  render() {
    // 옵션 컨테이너
    const optionContainer = document.createElement("div");
    optionContainer.className = "justify-start items-center gap-10 inline-flex";

    // 텍스트 영역
    const optionText = document.createElement("div");
    optionText.className =
      "text-center text-primary-text dark:text-secondary-text text-[40px] font-semibold font-['Inter'] leading-10";
    optionText.textContent = this.props.textContent;

    const modeButton = createComponent(ModeButton, {
      imageSrc: this.props.imageSrc,
      optionName: this.props.optionName,
      startIndex: this.props.startIndex,
    });

    // 구조 조립
    optionContainer.appendChild(optionText);
    optionContainer.appendChild(modeButton);

    return optionContainer;
  }
}

export default SwitchOption;
