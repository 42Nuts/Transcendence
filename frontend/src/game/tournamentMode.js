import { Component, createComponent } from "../core/index.js";
import { TournamentTable, TournamentTeam } from "./Tournament/index.js";
import { profileImages } from "../config/index.js";
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
    const uri = Store.state.nextRoom
      ? Store.state.nextRoom
      : `/ws/game/?mode=tournament&userId=${userId}`;
    this.gameSocket = new WebSocket("wss://" + window.location.host + uri);
  }

  render() {
    // this.initGame();

    // this.container = document.createElement("div");

    // const game = createComponent(TournamentTeam, {
    //   gameSocket: this.gameSocket,
    // });

    // this.container.appendChild(game);

    // return this.container;
    const container = createComponent(TournamentTable, {
      player1Name: "player1",
      player1Image: profileImages[0],
      player2Name: "player2",
      player2Image: profileImages[1],
      player3Name: "player3",
      player3Image: profileImages[2],
      player4Name: "player4",
      player4Image: profileImages[3],
      isFinal: false,
    });

    return container;
  }
}

export default TournamentMode;
