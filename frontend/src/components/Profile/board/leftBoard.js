import { Component } from "../../../core/index.js";
import { backgroundColors } from "../../../config/index.js";
import Store from "../../../store/index.js";

class LeftBoard extends Component {
  constructor(props) {
    super(props);

    Store.events.subscribe("backgroundChange", this.updateBackground.bind(this));
  }

  updateBackground() {
    const upperBoard = document.getElementById("upperBoard");

    console.log(Store.state.background);
    upperBoard.className = `w-[296px] h-[280px] left-0 top-0 absolute bg-${backgroundColors[Store.state.background]} rounded-tl-2xl rounded-tr-2xl`;
  }

  render() {
    const board = document.createElement("div");
    board.className = "w-[296px] h-[632px] relative";

    const lowerBoard = document.createElement("div");
    lowerBoard.className = "w-[296px] h-[632px] left-0 top-0 absolute bg-primary-card_background dark:bg-secondary-card_background rounded-2xl";

    const upperBoard = document.createElement("div");
    upperBoard.id = "upperBoard";
    upperBoard.className = `w-[296px] h-[280px] left-0 top-0 absolute bg-${backgroundColors[Store.state.background]} rounded-tl-2xl rounded-tr-2xl`;

    board.appendChild(lowerBoard);
    board.appendChild(upperBoard);

    return board;
  }
}

export default LeftBoard;