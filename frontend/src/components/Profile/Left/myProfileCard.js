import { Component, createComponent } from "../../../core/index.js";
import { MMRBoard } from "../mmr/index.js";
import { LeftBoard } from "../board/index.js";

class MyProfileCard extends Component {
  render() {
    const container = document.createElement("div");
    container.className = "col-start-6 col-span-3 relative w-[296px] h-[632px]";

    // card board
    const board = createComponent(LeftBoard, {});

    // mmr gauge board
    const mmrBoard = createComponent(MMRBoard, {});

    // tier with contents
    const contentContainer = document.createElement("div");
    contentContainer.className = "left-[76px] top-[244px] absolute flex-col justify-start items-center gap-2 inline-flex";

    const tierContainer = document.createElement("div");
    tierContainer.className = "w-[72px] h-[72px] relative";

    const tierBox = document.createElement("div");
    tierBox.className = "w-[72px] h-[72px] left-0 top-0 absolute";

    const tierImage = document.createElement("img");
    tierImage.src = "/static/assets/images/tier/bronze.png";
    tierImage.className = "w-[64.68px] h-[72px] left-[4px] top-0 absolute";

    tierBox.appendChild(tierImage);
    tierContainer.appendChild(tierBox);

    contentContainer.appendChild(tierContainer);

    container.appendChild(board);
    container.appendChild(mmrBoard);

    return container;
  }
}

export default MyProfileCard;