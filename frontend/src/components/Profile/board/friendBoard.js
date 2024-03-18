import { Component, createComponent } from "../../../core/index.js";
import { FriendsSmallButton } from "../../Button/index.js";

class FriendBoard extends Component {
  render() {
    const board = document.createElement("div");
    board.className = "w-80 px-4 py-2 justify-between items-center inline-flex";

    const contents = document.createElement("div");
    contents.className = "justify-start items-center gap-2 flex";

    const profileBox = document.createElement("div");
    profileBox.className = "w-10 h-10 justify-center items-center flex";

    const profile = document.createElement("img");
    profile.className = "w-10 h-10 rounded-full shadow-md";
    profile.src = this.props.profileSrc;

    profileBox.appendChild(profile);

    const nameBox = document.createElement("div");
    nameBox.className = "justify-center items-center gap-1 flex";

    const tier = document.createElement("img");
    tier.className = "w-[18px] h-[18px] justify-center items-center flex";
    tier.src = this.props.tierSrc;

    const name = document.createElement("div");
    name.className = "text-primary-text text-[15px] font-semibold font-['Inter']";
    name.innerText = this.props.name;

    nameBox.appendChild(tier);
    nameBox.appendChild(name);

    contents.appendChild(profileBox);
    contents.appendChild(nameBox);

    const button = createComponent(FriendsSmallButton, {
      friend: this.props.friend,
    });

    board.appendChild(contents);
    board.appendChild(button);

    return board;
  }
}

export default FriendBoard;
