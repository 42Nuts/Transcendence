import { Component, createComponent } from "../core/index.js";
import { BasicButton } from "../components/Button/index.js";
import { ScoreBoard } from "../components/Board/index.js";

class GamePage extends Component {
  render() {
    const container = document.createElement("div");
    container.className =
      "mx-auto flex flex-col items-center justify-center min-h-screen";

    // score board
    const grid = document.createElement("div");
    grid.className = "grid grid-cols-12 gap-10 min-h-screen";

    const scoreContainer = document.createElement("div");
    scoreContainer.className = "col-start-10 mt-80 w-44 h-44 flex-col justify-start items-start gap-8 inline-flex";

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

    grid.appendChild(scoreContainer);

    // canvas to draw the game
    const board = document.createElement("canvas");
    board.id = "game";
    board.className = "absolute rounded-3xl border-8 border-primary-card_background dark:border-secondary-card_background shadow-md";

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
    container.appendChild(grid);
    container.appendChild(board);
    container.appendChild(script);
    container.appendChild(exitButtonPos);

    return container;
  }
}

export default GamePage;
