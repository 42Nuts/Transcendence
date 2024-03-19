import { Component, createComponent } from "../../core/index.js";
import { SwitchOption } from "./Game/index.js";
import {
  profileImages,
  themeImages,
  darkModeImages,
} from "../../config/index.js";
import Store from "../../store/index.js";

class GameOption extends Component {
  render() {
    const container = document.createElement("div");
    container.className =
      "col-end-8 mt-auto mb-auto w-[400px] h-48 flex-col justify-start items-end gap-12 inline-flex";

    // Theme 옵션
    const themeOption = createComponent(SwitchOption, {
      textContent: "Theme",
      imageSrc: themeImages,
      startIndex: Store.state.theme,
      optionName: "updateTheme",
    });

    // Dark Mode 옵션
    const darkModeOption = createComponent(SwitchOption, {
      textContent: "Dark Mode",
      imageSrc: darkModeImages,
      startIndex: Store.state.darkMode ? 1 : 0,
      optionName: "toggleDarkMode",
    });

    // 컨테이너에 옵션 추가
    container.appendChild(themeOption);
    container.appendChild(darkModeOption);

    return container;
  }
}

export default GameOption;
