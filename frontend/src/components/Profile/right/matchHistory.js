import { Component, createComponent } from "../../../core/index.js";
import { RightBoard, MatchBoard } from "../board/index.js";
import { CannotFind } from "../search/index.js";

class MatchHistory extends Component {
  render() {
    const container = document.createElement("div");
    container.className = "col-start-9 col-span-4 relative w-[408px] h-[632px]";

    // contents
    const board = createComponent(RightBoard, {});

    // match history
    const matchHistory = document.createElement("div");
    matchHistory.className =
      "h-[287px] left-[24px] top-[31px] absolute flex-col justify-start items-center gap-6 inline-flex";

    const title = document.createElement("div");
    title.className = "text-primary-text text-2xl font-bold font-['Inter']";
    title.innerHTML = "Match History";

    const line = document.createElement("img");
    line.src = "/static/assets/images/line-match.svg";

    const histories = document.createElement("div");
    histories.className = "flex-col justify-start items-start gap-6 flex";

    // const match = createComponent(MatchBoard, {
    //   gameMode: "2 Players",
    //   gameResult: "VICTORY",
    // });

    // histories.appendChild(match);

    const messageContainer = document.createElement("div");
    messageContainer.className = "w-[359px] flex-col justify-start items-center flex";

    const message = createComponent(CannotFind, {
      text: "Sorry, there is no match history.",
    });

    messageContainer.appendChild(message);

    histories.appendChild(messageContainer);

    matchHistory.appendChild(title);
    matchHistory.appendChild(line);
    matchHistory.appendChild(histories);

    container.appendChild(board);
    container.appendChild(matchHistory);

    return container;
  }
}

export default MatchHistory;
