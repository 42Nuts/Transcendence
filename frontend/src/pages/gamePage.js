import { Component, createComponent } from "../core/index.js";
import { TwoPlayerMode } from "../game/index.js";

class GamePage extends Component {
  render() {
    const game = createComponent(TwoPlayerMode, {});

    return game;
  }
}

export default GamePage;
