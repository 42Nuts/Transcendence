import { Component } from "../../core/index.js";

class GameOption extends Component {
  render() {
    const container = document.createElement("div");
    container.className =
      "col-end-8 mt-auto mb-auto w-[400px] h-48 flex-col justify-start items-end gap-12 inline-flex";

    // Theme 옵션
    const themeOption = document.createElement("div");
    themeOption.className = "justify-start items-center gap-10 inline-flex";
    const themeText = document.createElement("div");
    themeText.className =
      "text-center text-primary-text text-[40px] font-semibold font-['Inter'] leading-10";
    themeText.textContent = "Theme";
    const themeImageContainer = document.createElement("div");
    themeImageContainer.className = "w-[72px] h-[72px] relative";
    const themeImage = document.createElement("img");
    themeImage.src = "./src/assets/images/ball-pingpong.svg";
    themeImage.className = "w-[72px] h-[72px]";
    themeImageContainer.appendChild(themeImage);
    themeOption.appendChild(themeText);
    themeOption.appendChild(themeImageContainer);

    // Dark Mode 옵션
    const darkModeOption = document.createElement("div");
    darkModeOption.className = "justify-start items-center gap-10 inline-flex";
    const darkModeText = document.createElement("div");
    darkModeText.className =
      "text-center text-primary-text text-[40px] font-semibold font-['Inter'] leading-10";
    darkModeText.textContent = "Dark Mode";
    const darkModeImageContainer = document.createElement("div");
    darkModeImageContainer.className = "w-[72px] h-[72px] relative";
    const darkModeImage = document.createElement("img");
    darkModeImage.src = "./src/assets/images/darkMode-light.svg";
    darkModeImage.className = "w-[72px] h-[72px]";
    darkModeImageContainer.appendChild(darkModeImage);
    darkModeOption.appendChild(darkModeText);
    darkModeOption.appendChild(darkModeImageContainer);

    // 컨테이너에 옵션 추가
    container.appendChild(themeOption);
    container.appendChild(darkModeOption);

    return container;
  }
}

export default GameOption;
