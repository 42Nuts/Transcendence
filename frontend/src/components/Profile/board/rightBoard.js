import { Component } from "../../../core/index.js";

class RightBoard extends Component {
  render() {
    const board = document.createElement("div");
    board.className = "w-[408px] h-[632px] left-0 top-0 absolute bg-primary-card_background rounded-2xl border-8 border-primary-button";

    return board;
  }
}

export default RightBoard;