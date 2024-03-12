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

    container.appendChild(flexContainer);
    return container;
  }
}

export default GamePage;