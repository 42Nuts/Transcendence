import { Component, createComponent } from "../core/index.js";
import { TwoPlayerMode } from "./index.js";
import { TournamentTable, TournamentResult } from "./Tournament/index.js";

class TournamentMode extends Component {
  render() {
    // 여기서 createComponent 함수를 사용하여 TournamentTable 컴포넌트를 생성.

    // 그다음 TwoPlayerMode 컴포넌트를 생성.

    // TwoPlayerMode가 종료가 되면 그다음 대진표를 TournamentTable 컴포넌트로 변경.

    // 다시 큐로 어떻게 들어가는지는 모르겠지만 TwoPlayerMode 다시 생성.

    // 모드가 종료되면 TournamentResult 컴포넌트로 변경.
  }
}

export default TournamentMode;
