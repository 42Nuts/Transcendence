import { Component, createComponent } from "../core/index.js";
import { TournamentTeam } from "./Tournament/index.js";
import Store from "../store/index.js";

class TournamentMode extends Component {
  constructor(props) {
    super(props);
    Store.events.subscribe("tournamentModeChange", this.nextRound.bind(this));
  }

  nextRound() {
    if (Store.state.tournamentMode == 1) {
      this.initGame();
      Store.dispatch("updateNextRoom", "");
      this.container.innerHTML = "";
      console.log(this.gameSocket);
      const game = createComponent(TournamentTeam, {
        gameSocket: this.gameSocket,
      });
      this.container.appendChild(game);
    }
  }

  initGame() {
    console.log(`websocket 열림!`)
    const uri = Store.state.nextRoom
      ? Store.state.nextRoom
      : `/ws/game/?mode=tournament&userId=${userId}`;
    this.gameSocket = new WebSocket("wss://" + window.location.host + uri);
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
