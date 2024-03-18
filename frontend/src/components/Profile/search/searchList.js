import { Component, createComponent } from "../../../core/index.js";
import { FriendBoard } from "../board/index.js";

class SearchList extends Component {
  render() {
    const container = document.createElement("div");
    container.className = "flex-col justify-start items-start flex";

    const result = document.createElement("div");
    result.className = "p-2.5 justify-center items-center gap-2.5 inline-flex";

    const title = document.createElement("div");
    title.className =
      "text-primary-text text-base font-semibold font-['Inter']";
    title.innerText = this.props.result;

    result.appendChild(title);

    const list = document.createElement("div");
    list.className = "flex-col justify-start items-center flex";

    if (this.props.friends) {
      this.props.friends.forEach((friend) => {
        const friendBoard = createComponent(FriendBoard, {
          name: friend.name,
          friend: friend.friend,
          profileSrc: friend.profileSrc,
          tierSrc: friend.tierSrc,
        });

        list.appendChild(friendBoard);
      });
    }

    container.appendChild(result);
    container.appendChild(list);

    return container;
  }
}

export default SearchList;
