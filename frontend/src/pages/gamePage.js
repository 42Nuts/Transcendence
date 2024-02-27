import { Component, createComponent } from "../core/index.js";
import {
  BackIconButton,
  BasicButton,
  ArrowButton,
} from "../components/Button/index.js";

class GamePage extends Component {
  render() {
    const container = document.createElement("div");
    container.className =
      "container mx-auto flex flex-col items-center justify-center min-h-screen";

    // grid 레이아웃을 사용하는 컨테이너 생성
    this.gridContainer = document.createElement("div");
    this.gridContainer.className = "grid grid-cols-12 gap-10 min-h-screen";

    // BackIconButton 추가
    const backIcon = createComponent(BackIconButton, {});
    this.gridContainer.appendChild(backIcon);

    // game board
    const gameBoard = document.createElement("div");
    gameBoard.className = "absolute w-[4040px] h-[417.50px]";

    const rightArrowContainer = document.createElement("div");
    rightArrowContainer.className = "w-[72px] h-[72px] left-[2224px] top-[174.75px] absolute";
    const rightArrowButton = createComponent(ArrowButton, {
      iconSrc: "./src/assets/images/icon-arrow-forward-ios.svg",
    });
    rightArrowContainer.appendChild(rightArrowButton);

    const leftArrowContainer = document.createElement("div");
    leftArrowContainer.className = "w-[72px] h-[72px] left-[1744px] top-[174.75px] absolute";
    const leftArrowButton = createComponent(ArrowButton, {
      iconSrc: "./src/assets/images/icon-arrow-back-ios.svg",
    });
    leftArrowContainer.appendChild(leftArrowButton);

    gameBoard.appendChild(rightArrowContainer);
    gameBoard.appendChild(leftArrowContainer);

    // play button
    const playButtonPos = document.createElement("div");
    playButtonPos.className = "absolute top-[80%]";
    const playButton = createComponent(BasicButton, { text: "Play" });
    playButtonPos.appendChild(playButton);

    container.appendChild(this.gridContainer);
    container.appendChild(gameBoard);
    container.appendChild(playButtonPos);
    return container;
  }
}

export default GamePage;
