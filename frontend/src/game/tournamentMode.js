import { Component, createComponent } from "../core/index.js";
import { TournamentTable, TournamentResult, TournamentTeam } from "./Tournament/index.js";

class TournamentMode extends Component {
  initGame() {
    this.gameSocket = new WebSocket(
      "wss://" + window.location.host + `/ws/game/?mode=tournament&userId=${userId}`
    );
  }

  render() {
    this.initGame();
    // 여기서 createComponent 함수를 사용하여 TournamentTable 컴포넌트를 생성.
    const game = createComponent(TournamentTeam, {gameSocket: this.gameSocket});

    const game2 = createComponent(TournamentTeam, {gameSocket: this.gameSocket});

    // 그다음 TwoPlayerMode 컴포넌트를 생성.

    // TwoPlayerMode가 종료가 되면 그다음 대진표를 TournamentTable 컴포넌트로 변경.

    // 다시 큐로 어떻게 들어가는지는 모르겠지만 TwoPlayerMode 다시 생성.

    // 모드가 종료되면 TournamentResult 컴포넌트로 변경.
    return ;
  }
}

export default TournamentMode;
