import { Component, createComponent } from "../core/index.js";
import { BasicButton } from "../components/Button/index.js";
import { ScoreBoard } from "../components/Board/index.js";

class GamePage extends Component {
  render() {
    const container = document.createElement("div");
    container.className =
      "flex items-center justify-center min-h-screen";

    // game container
    const gameContainer = document.createElement("div");
    gameContainer.className = "relative";

    // score board
    const scoreContainer = document.createElement("div");
    scoreContainer.className = "absolute w-44 h-44 flex-col justify-start items-start gap-8 inline-flex";
    scoreContainer.style = "left: 100%; top:0; margin-left: 64px;";

    const player1 = createComponent(ScoreBoard, {
      imgSrc: "/static/assets/images/profile-default.svg",
      id: "player1",
    });

    const player2 = createComponent(ScoreBoard, {
      imgSrc: "/static/assets/images/profile-taeypark.svg",
      id: "player2",
    });

    scoreContainer.appendChild(player1);
    scoreContainer.appendChild(player2);

    // // 커스텀 이벤트 수신
    // document.addEventListener('gameDataReceived', function(e) {
    //   const gameData = e.detail;
    //   // 게임 데이터 처리...
    //   console.log(gameData);
    // });

    // canvas to draw the game
    const board = document.createElement("canvas");
    board.id = "game";
    board.className = "rounded-3xl border-8 border-primary-card_background dark:border-secondary-card_background shadow-md";

    const script = document.createElement("script");
    script.src = "/static/game/twoPlayerMode.js";
    script.type = "text/javascript";

    // button to exit the game
    const exitButtonPos = document.createElement("div");
    exitButtonPos.className = "absolute top-[85%]";

    const exitButtonHref = document.createElement("a");
    exitButtonHref.setAttribute("href", "/gameMode/");

    const exitButton = createComponent(BasicButton, { text: "Exit" });

    exitButtonHref.appendChild(exitButton);
    exitButtonPos.appendChild(exitButtonHref);

    // append all elements to the container
    gameContainer.appendChild(board);
    gameContainer.appendChild(script);
    gameContainer.appendChild(scoreContainer);
    container.appendChild(gameContainer);
    container.appendChild(exitButtonPos);

    return container;
  }
}

export default GamePage;
