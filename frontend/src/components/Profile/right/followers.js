import { Component, createComponent } from "../../../core/index.js";
import { IconButton } from "../../Button/index.js";
import { RightBoard } from "../board/index.js";

class Followers extends Component {
  render() {
    const container = document.createElement("div");
    container.className = "col-start-9 col-span-4 relative w-[408px] h-[632px]";

    // card
    const board = createComponent(RightBoard, {});

    //contents

    // close button
    const closeContainer = document.createElement("div");
    closeContainer.className = "p-2 left-[356px] top-0 absolute justify-start items-start gap-2.5 inline-flex";

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
    container.appendChild(closeContainer);

    return container;
  }
}

export default Followers;
