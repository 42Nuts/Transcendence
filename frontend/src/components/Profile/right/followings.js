import { Component, createComponent } from "../../../core/index.js";
import { IconButton } from "../../Button/index.js";
import { RightBoard } from "../board/index.js";
import { SearchList } from "../search/index.js";
import { CannotFind } from "../search/index.js";
import Store from "../../../store/index.js";

class Followings extends Component {
  constructor(props) {
    super(props);
    Store.events.subscribe("darkModeChange", this.updateLine.bind(this));
  }

  updateLine() {
    if (Store.state.darkMode) {
      this.line.src = "/static/assets/images/line-match-dark.svg";
    } else {
      this.line.src = "/static/assets/images/line-match.svg";
    }
  }

  render() {
    const container = document.createElement("div");
    container.className = "col-start-9 col-span-4 relative w-[408px] h-[632px]";

    // card
    const board = createComponent(RightBoard, {});

    //contents
    const contents = document.createElement("div");
    contents.className =
      "w-[359px] h-[92px] left-[25px] top-[32px] absolute flex-col justify-start items-center gap-6 inline-flex";

    const title = document.createElement("div");
    title.className = "text-primary-text dark:text-secondary-text text-2xl font-bold font-['Inter']";
    title.innerText = "Followings";

    this.line = document.createElement("img");
    if (Store.state.darkMode) {
      this.line.src = "/static/assets/images/line-match-dark.svg";
    } else {
      this.line.src = "/static/assets/images/line-match.svg";
    }

    // const list = createComponent(SearchList, {
    //   result: "0 Following",
    // });

    const cannotFind = createComponent(CannotFind, {
      text: "Sorry, you have no following.",
    });

    contents.appendChild(title);
    contents.appendChild(this.line);
    // contents.appendChild(list);
    contents.appendChild(cannotFind);

    // close button
    const closeContainer = document.createElement("div");
    closeContainer.className =
      "p-2 left-[356px] top-0 absolute justify-start items-start gap-2.5 inline-flex";

    const closeButton = createComponent(IconButton, {
      iconSrc: Store.state.darkMode ? "/static/assets/images/icon-close-dark.svg" : "/static/assets/images/icon-close.svg",
      bgColorClass: "bg-primary-text dark:bg-secondary-text",
      containerWidth: "w-9",
      containerHeight: "h-9",
      iconWidth: "w-6",
      iconHeight: "h-6",
      onClick: this.props.onCancel,
    });

    closeContainer.appendChild(closeButton);

    // append
    container.appendChild(board);
    container.appendChild(contents);
    container.appendChild(closeContainer);

    return container;
  }
}

export default Followings;
