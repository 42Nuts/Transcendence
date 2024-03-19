import { Component } from "../../../core/index.js";

class MMRBoard extends Component {
  render() {
    const container = document.createElement("div");
    container.className = "left-0 top-[272px] absolute flex-col justify-start items-start inline-flex";

    const board = document.createElement("div");
    board.className = "w-[296px] h-4 relative";

    const backBoard = document.createElement("div");
    backBoard.className = "w-[296px] h-4 left-0 top-0 absolute bg-primary-text dark:bg-secondary-text";

    const gaugeBoard = document.createElement("div");
    gaugeBoard.className = "w-20 h-4 left-0 top-0 absolute bg-gradient-to-r from-primary-bronze_from to-primary-bronze_to rounded-tr rounded-br";

    board.appendChild(backBoard);
    board.appendChild(gaugeBoard);

    container.appendChild(board);

    return container;
  }
}

export default MMRBoard;