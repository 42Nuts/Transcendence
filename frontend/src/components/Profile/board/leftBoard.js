import { Component } from "../../../core/index.js";

class LeftBoard extends Component {
  render() {
    const board = document.createElement("div");
    board.className = "w-[296px] h-[632px] relative";

    const lowerBoard = document.createElement("div");
    lowerBoard.className = "w-[296px] h-[632px] left-0 top-0 absolute bg-primary-card_background rounded-2xl";

    const upperBoard = document.createElement("div");
    upperBoard.className = "w-[296px] h-[280px] left-0 top-0 absolute bg-primary-button rounded-tl-2xl rounded-tr-2xl";

    board.appendChild(lowerBoard);
    board.appendChild(upperBoard);

    return board;
  }
}

export default LeftBoard;