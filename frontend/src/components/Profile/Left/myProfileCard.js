import { Component, createComponent } from "../../../core/index.js";
import { MMRBoard, Tier } from "../mmr/index.js";
import { LeftBoard } from "../board/index.js";
import { LeftContents } from "./index.js";
import Store from "../../../store/index.js";
import { profileImages } from "../../../config/index.js";

class MyProfileCard extends Component {
  render() {
    const container = document.createElement("div");

    // card board
    const board = createComponent(LeftBoard, {});

    // mmr gauge board
    const mmrBoard = createComponent(MMRBoard, {});

    // tier with contents
    const contentContainer = document.createElement("div");
    contentContainer.className =
      "left-[76px] top-[244px] absolute flex-col justify-start items-center gap-2 inline-flex";

    // tier
    const tier = createComponent(Tier, {
      src: "/static/assets/images/tier-bronze.svg",
    });

    // contents
    const contents = createComponent(LeftContents, {
      onEdit: this.props.onEdit,
      onFollowers: this.props.onFollowers,
      followers: "2",
      following: "0",
    });

    contentContainer.appendChild(tier);
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
