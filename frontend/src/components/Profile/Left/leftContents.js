import { Component, createComponent } from "../../../core/index.js";
import { IconButton, FriendsButton } from "../../Button/index.js";
import Store from "../../../store/index.js";

class LeftContents extends Component {
  render() {
    const container = document.createElement("div");
    container.className = "flex-col justify-center items-center gap-8 flex";

    // box
    const box = document.createElement("div");
    box.className = "flex-col justify-center items-center gap-4 flex";

    const name = document.createElement("div");
    name.className = "text-primary-text text-2xl font-semibold font-['Inter']";
    name.innerText = Store.state.nickname;

    const friendsContainer = document.createElement("div");
    friendsContainer.className = "flex-col justify-start items-start gap-2 flex";

    const friendsList = document.createElement("div");
    friendsList.className = "justify-start items-start gap-4 inline-flex";

    const followers = document.createElement("div");
    followers.className = "text-primary-button text-xs font-medium font-['Inter']";
    followers.innerText = "0 Followers";

    const followings = document.createElement("div");
    followings.className = "text-primary-button text-xs font-medium font-['Inter']";
    followings.innerText = "0 Following";

    friendsList.appendChild(followers);
    friendsList.appendChild(followings);

    const friendsButton = createComponent(FriendsButton, {
      iconSrc: "/static/assets/images/icon-person-add.svg",
      bgColor: "bg-primary-button",
      textColor: "text-primary-button_text",
      text: "ADD FRIENDS",
    });

    friendsContainer.appendChild(friendsList);
    friendsContainer.appendChild(friendsButton);

    box.appendChild(name);
    box.appendChild(friendsContainer);

    // line
    const line = document.createElement("img");
    line.src = "/static/assets/images/line-profile.svg";

    // win lose rate
    const winLoseRate = document.createElement("div");
    winLoseRate.className = "text-primary-text text-xs font-medium font-['Inter']";
    winLoseRate.innerText = "0 WIN / 0 LOSE";

    // icon button
    const editButton = createComponent(IconButton, {
      iconSrc: "/static/assets/images/icon-stylus.svg",
      bgColorClass: "bg-primary-text",
    });

    container.appendChild(box);
    container.appendChild(line);
    container.appendChild(winLoseRate);
    container.appendChild(editButton);

    return container;
  }
}

export default LeftContents;