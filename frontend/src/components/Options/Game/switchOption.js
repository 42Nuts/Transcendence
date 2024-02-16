import { Component } from "../../../core/index.js";

class SwitchOption extends Component {
  render() {
    // 옵션 컨테이너
    const optionContainer = document.createElement("div");
    optionContainer.className = "justify-start items-center gap-10 inline-flex";

    // 텍스트 영역
    const optionText = document.createElement("div");
    optionText.className =
      "text-center text-primary-text text-[40px] font-semibold font-['Inter'] leading-10";
    optionText.textContent = this.props.textContent;

    // 이미지 컨테이너
    const imageContainer = document.createElement("div");
    imageContainer.className = "w-[72px] h-[72px] relative";

    // 이미지
    const optionImage = document.createElement("img");
    optionImage.src = this.props.imageSrc;
    optionImage.className = "w-[72px] h-[72px]";

    // 구조 조립
    imageContainer.appendChild(optionImage);
    optionContainer.appendChild(optionText);
    optionContainer.appendChild(imageContainer);

    return optionContainer;
  }
}

export default SwitchOption;
