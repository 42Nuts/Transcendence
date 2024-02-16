import { Component, createComponent } from "../../core/index.js";
import { SwitchOption } from "./Game/index.js";

class GameOption extends Component {
  render() {
    const container = document.createElement("div");
    container.className =
      "col-end-8 mt-auto mb-auto w-[400px] h-48 flex-col justify-start items-end gap-12 inline-flex";

    // Theme 옵션
    const themeOption = createComponent(SwitchOption, {
      textContent: "Theme",
      imageSrc: "./src/assets/images/ball-pingpong.svg",
    });

    // Dark Mode 옵션
    const darkModeOption = createComponent(SwitchOption, {
      textContent: "Dark Mode",
      imageSrc: "./src/assets/images/darkMode-light.svg",
    });

    // 컨테이너에 옵션 추가
    container.appendChild(themeOption);
    container.appendChild(darkModeOption);

    return container;
  }
}

export default GameOption;
