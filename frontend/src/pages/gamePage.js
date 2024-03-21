import { Component, createComponent } from "../core/index.js";
import { TwoPlayerMode, ThreePlayerMode } from "../game/index.js";
import { Loading } from "../game/Loading/index.js";
import Store from "../store/index.js";

class GamePage extends Component {
  constructor(props) {
    super(props);
    Store.events.subscribe("gameStartChange", this.onGameStartChange.bind(this));
  }

  onGameStartChange() {
    this.load.remove();
  }

  render() {
    const container = document.createElement("div");
    console.log("Store theme", Store.state.theme);

    this.load = createComponent(Loading, {});

    let game;
    switch (Store.state.gameMode) {
      case "2p":
        game = createComponent(TwoPlayerMode, {});
        break;
      case "3p":
        game = createComponent(ThreePlayerMode, {});
        break;
      default:
        game = createComponent(TwoPlayerMode, {});
        break;
    }

    container.appendChild(game);
    container.appendChild(this.load);

    return container;
  }
}

export default GamePage;
