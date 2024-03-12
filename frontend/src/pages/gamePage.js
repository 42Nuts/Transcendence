import { Component, createComponent } from "../core/index.js";
import { BasicButton } from "../components/Button/index.js";

class GamePage extends Component {
  render() {
    const container = document.createElement("div");

    const flexContainer = document.createElement("div");
    flexContainer.className = "flex justify-center items-center min-h-screen";

    const board= document.createElement("canvas");
    board.id = "game";

    const script = document.createElement("script");
    script.src = "/static/game/twoPlayerMode.js";
    script.type = "text/javascript";

    // score
    const scoreContainer = document.createElement("div");
    scoreContainer.id = "scoreContainer";
    scoreContainer.className = "absolute top-[5%] left-[5%] text-primary-text dark:text-secondary-text text-[20px] font-semibold font-['Inter'] leading-10";
    scoreContainer.innerText = "player1: 0, player2: 0";

    // button to exit the game
    const exitButtonPos = document.createElement("div");
    exitButtonPos.className = "absolute top-[85%]";

    const exitButtonHref = document.createElement("a");
    exitButtonHref.setAttribute("href", "/gameMode/");

    const exitButton = createComponent(BasicButton, { text: "Exit" });

    exitButtonHref.appendChild(exitButton);
    exitButtonPos.appendChild(exitButtonHref);

    flexContainer.appendChild(board);
    flexContainer.appendChild(script);
    flexContainer.appendChild(exitButtonPos);

    container.appendChild(scoreContainer);
    container.appendChild(flexContainer);
    return container;
  }
}

export default GamePage;