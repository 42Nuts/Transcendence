import { Component, createComponent } from "../core/index.js";
import { BackIconButton, BasicButton } from "../components/Button/index.js";

class GamePage extends Component {
  render() {
    const container = document.createElement("div");
    container.className = "container mx-auto flex flex-col items-center justify-center min-h-screen";

    // grid 레이아웃을 사용하는 컨테이너 생성
    this.gridContainer = document.createElement("div");
    this.gridContainer.className = "grid grid-cols-12 gap-10 min-h-screen";

    // BackIconButton 추가
    const backIcon = createComponent(BackIconButton, {});
    this.gridContainer.appendChild(backIcon);

    // play button
    const playButtonPos = document.createElement("div");
    playButtonPos.className = "absolute top-[80%]";
    const playButton = createComponent(BasicButton, { text: "Play" });
    playButtonPos.appendChild(playButton);

    container.appendChild(this.gridContainer);
    container.appendChild(playButtonPos);
    return container;
  }
}

export default GamePage;
