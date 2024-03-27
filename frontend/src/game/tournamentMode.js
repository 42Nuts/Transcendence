import { Component, createComponent } from "../core/index.js";
import {
  TournamentTable,
  TournamentResult,
  TournamentTeam,
} from "./Tournament/index.js";
import Store from "../store/index.js";

class TournamentMode extends Component {
  constructor(props) {
    super(props);
    Store.events.subscribe("tournamentModeChange", this.nextRound.bind(this));
  }

  nextRound() {
    console.log(`Store.state.tournamentMode : ${Store.state.tournamentMode}`)
    if (Store.state.tournamentMode == 1) {
      this.container.innerHTML = "";
      const game = createComponent(TournamentTeam, {
        gameSocket: this.gameSocket,
      });
      this.container.appendChild(game);
    }
  }

  initGame() {
    this.gameSocket = new WebSocket(
      "wss://" +
        window.location.host +
        `/ws/game/?mode=tournament&userId=${userId}`
    );
  }

  render() {
    this.initGame();

    this.container = document.createElement("div");

    const game = createComponent(TournamentTeam, {
      gameSocket: this.gameSocket,
    });

    this.container.appendChild(game);

    return this.container;
  }
}

export default TournamentMode;
