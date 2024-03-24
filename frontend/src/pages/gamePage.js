import { Component, createComponent } from "../core/index.js";
import { TwoPlayerMode, ThreePlayerMode, FourPlayerMode, TournamentMode } from "../game/index.js";
import { GameRouter } from "../utils/index.js";
import { Loading } from "../game/Loading/index.js";
import Store from "../store/index.js";

class GamePage extends Component {
  constructor(props) {
    super(props);
    Store.events.subscribe("gameStartChange", this.onGameStartChange.bind(this));

    this.gameRouter = new GameRouter({
      "2p": TwoPlayerMode,
      "3p": ThreePlayerMode,
      "4p": FourPlayerMode,
      "tournament": TournamentMode,
    });
  }

  onGameStartChange() {
    this.load.remove();
  }

  render() {
    const container = document.createElement("div");
    console.log("Store theme", Store.state.theme);

    this.load = createComponent(Loading, {});

    const game = this.gameRouter.getComponent(Store.state.gameMode);

    container.appendChild(game);
    container.appendChild(this.load);

    return container;
  }
}

export default GamePage;
