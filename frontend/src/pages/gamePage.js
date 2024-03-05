import { Component, createComponent } from "../core/index.js";
import {
  BackIconButton,
  BasicButton,
  ArrowButton,
} from "../components/Button/index.js";
import { Card, LockCard } from "../components/Card/index.js";

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
    gameBoard.className =
      "absolute w-[1080px] h-[608px] flex-col justify-start items-start gap-20 inline-flex";

    const gameBoardUp = document.createElement("div");
    gameBoardUp.className = "justify-start items-start gap-36 inline-flex";

    const card1 = createComponent(Card, {
      title: "2 Players",
      titleLeft: "left-[52px]",
      image: "/static/assets/images/character-VS.svg",
      gameMode: "0",
      optionName: "updateGameMode",
    });

    const card2 = createComponent(Card, {
      title: "3 Players",
      titleLeft: "left-[52px]",
      image: "/static/assets/images/character-triangle.svg",
      gameMode: "1",
      optionName: "updateGameMode",
    });

    const card3 = createComponent(Card, {
      title: "4 Players",
      titleLeft: "left-[52px]",
      image: "/static/assets/images/character-sonny.svg",
      gameMode: "2",
      optionName: "updateGameMode",
    });

    gameBoardUp.appendChild(card1);
    gameBoardUp.appendChild(card2);
    gameBoardUp.appendChild(card3);

    const gameBoardDown = document.createElement("div");
    gameBoardDown.className = "justify-start items-start gap-36 inline-flex";

    const card4 = createComponent(LockCard, {
      title: "5 Players",
      titleLeft: "left-[52px]",
      image: "/static/assets/images/character-pentagon.svg",
      lock: "/static/assets/images/icon-lock.svg",
    });

    const card5 = createComponent(Card, {
      title: "Tournament",
      titleLeft: "left-[27px]",
      image: "/static/assets/images/character-champion.svg",
      gameMode: "3",
      optionName: "updateGameMode",
    });

    const card6 = createComponent(LockCard, {
      title: "AI",
      titleLeft: "left-[114px]",
      image: "/static/assets/images/character-AI.svg",
      lock: "/static/assets/images/icon-lock.svg",
    });

    gameBoardDown.appendChild(card4);
    gameBoardDown.appendChild(card5);
    gameBoardDown.appendChild(card6);

    gameBoard.appendChild(gameBoardUp);
    gameBoard.appendChild(gameBoardDown);

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
