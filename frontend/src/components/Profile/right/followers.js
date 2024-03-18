import { Component, createComponent } from "../../../core/index.js";
import { IconButton } from "../../Button/index.js";
import { RightBoard } from "../board/index.js";
import { SearchList } from "../search/index.js";

class Followers extends Component {
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
    title.className = "text-primary-text text-2xl font-bold font-['Inter']";
    title.innerText = "Followers";

    const line = document.createElement("img");
    line.src = "/static/assets/images/line-match.svg";

    const list = createComponent(SearchList, {
      result: "2 Followers",
    });

    contents.appendChild(title);
    contents.appendChild(line);
    contents.appendChild(list);

    // close button
    const closeContainer = document.createElement("div");
    closeContainer.className =
      "p-2 left-[356px] top-0 absolute justify-start items-start gap-2.5 inline-flex";

    const closeButton = createComponent(IconButton, {
      iconSrc: "/static/assets/images/icon-close.svg",
      bgColorClass: "bg-primary-text",
      containerWidth: "w-9",
      containerHeight: "h-9",
      iconWidth: "w-6",
      iconHeight: "h-6",
    });

    closeContainer.appendChild(closeButton);

    // append
    container.appendChild(board);
    container.appendChild(contents);
    container.appendChild(closeContainer);

    return container;
  }
}

export default Followers;
