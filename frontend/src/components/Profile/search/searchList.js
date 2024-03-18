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

    const friend1 = createComponent(FriendBoard, {
      profileSrc: "/static/assets/images/profile-taeypark.svg",
      tierSrc: "/static/assets/images/tier-diamond.svg",
      name: "euiclee",
      friend: true,
    });

    const friend2 = createComponent(FriendBoard, {
      profileSrc: "/static/assets/images/profile-yim.svg",
      tierSrc: "/static/assets/images/tier-gold.svg",
      name: "yim",
      friend: false,
    });

    list.appendChild(friend1);
    list.appendChild(friend2);

    container.appendChild(result);
    container.appendChild(list);

    return container;
  }
}

export default SearchList;
