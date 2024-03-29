import { Component, createComponent } from "../core/index.js";
import { BackIconButton, BasicButton } from "../components/Button/index.js";
import { Card, LockCard } from "../components/Card/index.js";
import { NickNamePopup } from "../components/PopUp/index.js";
import { GamePage } from "../pages/index.js";
import Store from "../store/index.js";
import getCookie from "../utils/getCookie.js";

class GameModePage extends Component {
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
      title: "Local",
      titleLeft: "left-[85px]",
      image: "/static/assets/images/character-AI.svg",
      gameMode: "1p",
      optionName: "updateGameMode",
    });

    const card2 = createComponent(Card, {
      title: "2 Players",
      titleLeft: "left-[52px]",
      image: "/static/assets/images/character-vs.svg",
      gameMode: "2p",
      optionName: "updateGameMode",
    });

    const card3 = createComponent(LockCard, {
      title: "3 Players",
      titleLeft: "left-[52px]",
      image: "/static/assets/images/character-triangle.svg",
    });

    gameBoardUp.appendChild(card1);
    gameBoardUp.appendChild(card2);
    gameBoardUp.appendChild(card3);

    const gameBoardDown = document.createElement("div");
    gameBoardDown.className = "justify-start items-start gap-36 inline-flex";

    const card4 = createComponent(Card, {
      title: "4 Players",
      titleLeft: "left-[52px]",
      image: "/static/assets/images/character-sonny.svg",
      gameMode: "4p",
      optionName: "updateGameMode",
    });

    const card5 = createComponent(Card, {
      title: "Tournament",
      titleLeft: "left-[27px]",
      image: "/static/assets/images/character-champion.svg",
      gameMode: "tournament",
      optionName: "updateGameMode",
    });

    const card6 = createComponent(LockCard, {
      title: "AI",
      titleLeft: "left-[114px]",
      image: "/static/assets/images/character-AI.svg",
    });

    gameBoardDown.appendChild(card4);
    gameBoardDown.appendChild(card5);
    gameBoardDown.appendChild(card6);

    gameBoard.appendChild(gameBoardUp);
    gameBoard.appendChild(gameBoardDown);

    // play button
    const playButtonPos = document.createElement("div");
    playButtonPos.className = "absolute top-[80%]";

    // const playButtonHref = document.createElement("a");
    // playButtonHref.setAttribute("href", "/game/");
    const playButton = createComponent(BasicButton, {
      text: "Play",
    });

    playButton.addEventListener("click", () => {
      if (Store.state.gameMode == "tournament") {
        const nickname = document.getElementById("nickname");
        if (nickname) {
          nickname.style.display = "flex";
        }
      } else {
        window.history.pushState({}, "", "/game/");

        // 페이지 컨텐츠를 동적으로 변경합니다.
        const rootElement = document.querySelector("#root");
        if (rootElement) {
          rootElement.innerHTML = ""; // 기존 컨텐츠를 지웁니다.

          // GamePage 컴포넌트를 생성하고 초기화합니다.
          const gamePageComponent = new GamePage();
          const gamePageElement = gamePageComponent.initialize(); // 가정: initialize 메서드가 DOM 요소를 반환

          // 생성된 페이지 요소를 rootElement에 추가합니다.
          rootElement.appendChild(gamePageElement);
        }

        // 뒤로 가기를 위한 onpopstate 이벤트 처리
        window.onpopstate = () => {
          const rootElement = document.querySelector("#root");
          if (rootElement) {
            rootElement.innerHTML = ""; // 기존 컨텐츠를 지웁니다.

            // GameModePage 컴포넌트를 생성하고 초기화합니다.
            const gameModePageComponent = new GameModePage();
            const gameModePageElement = gameModePageComponent.initialize(); // 가정: initialize 메서드가 DOM 요소를 반환

            // 생성된 페이지 요소를 rootElement에 추가합니다.
            rootElement.appendChild(gameModePageElement);
          }
        };
      }
    });
    // playButtonHref.appendChild(playButton);
    playButtonPos.appendChild(playButton);

    container.appendChild(this.gridContainer);
    container.appendChild(gameBoard);
    container.appendChild(playButtonPos);

    const nickNamePopup = createComponent(NickNamePopup, {
      mode: "tournament",
    });
    container.appendChild(nickNamePopup);

    return container;
  }
}

export default GameModePage;
