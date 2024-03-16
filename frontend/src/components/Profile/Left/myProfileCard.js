import { Component, createComponent } from "../../../core/index.js";
import { MMRBoard } from "../mmr/index.js";
import { LeftBoard } from "../board/index.js";
import { LeftContents } from "./index.js";
import Store from "../../../store/index.js";
import { profileImages } from "../../../config/index.js";

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
    contentContainer.className =
      "left-[76px] top-[244px] absolute flex-col justify-start items-center gap-2 inline-flex";

    // tier
    const tierContainer = document.createElement("div");
    tierContainer.className = "w-[72px] h-[72px] relative";

    const tierBox = document.createElement("div");
    tierBox.className = "w-[72px] h-[72px] left-0 top-0 absolute";

    const tierImage = document.createElement("img");
    tierImage.src = "/static/assets/images/tier-bronze.svg";
    tierImage.className = "w-[64.68px] h-[72px] left-[4px] top-0 absolute";

    tierBox.appendChild(tierImage);
    tierContainer.appendChild(tierBox);

    // contents
    const contents = createComponent(LeftContents, {});

    contentContainer.appendChild(tierContainer);
    contentContainer.appendChild(contents);

    // profile image
    const profileContainer = document.createElement("div");
    profileContainer.className =
      "w-36 h-36 left-[76px] top-[68px] absolute justify-center items-center inline-flex";

    const profileImage = document.createElement("img");
    profileImage.src = profileImages[Store.state.profile];
    profileImage.className = "w-36 h-36";

    profileContainer.appendChild(profileImage);

    container.appendChild(board);
    container.appendChild(mmrBoard);
    container.appendChild(contentContainer);
    container.appendChild(profileContainer);

    return container;
  }
}

export default MyProfileCard;
