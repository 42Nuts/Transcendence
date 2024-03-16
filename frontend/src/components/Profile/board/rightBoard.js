import { Component } from "../../../core/index.js";
import { backgroundColors } from "../../../config/index.js";
import Store from "../../../store/index.js";

class RightBoard extends Component {
  constructor(props) {
    super(props);

    Store.events.subscribe("backgroundChange", this.updateBackground.bind(this));
  }

  updateBackground() {
    const board = document.getElementById("rightBoard");
    board.className = `w-[408px] h-[632px] left-0 top-0 absolute bg-primary-card_background rounded-2xl border-8 border-${backgroundColors[Store.state.background]}`;
  }

  render() {
    const board = document.createElement("div");
    board.id = "rightBoard";
    board.className = `w-[408px] h-[632px] left-0 top-0 absolute bg-primary-card_background rounded-2xl border-8 border-${backgroundColors[Store.state.background]}`;

    return board;
  }
}

export default RightBoard;