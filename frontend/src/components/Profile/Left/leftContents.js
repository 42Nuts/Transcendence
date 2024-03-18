import { Component, createComponent } from "../../../core/index.js";
import { IconButton, FriendsButton } from "../../Button/index.js";
import Store from "../../../store/index.js";

class LeftContents extends Component {
  constructor(props) {
    super(props);
    Store.events.subscribe("darkMode", this.updater.bind(this));
  }

  updater() {
    if (Store.state.darkMode) {
      this.line.src = "/static/assets/images/line-profile-dark.svg";
      this.editButton.querySelector("img").src =
        "/static/assets/images/icon-stylus-dark.svg";
    } else {
      this.line.src = "/static/assets/images/line-profile.svg";
      this.editButton.querySelector("img").src =
        "/static/assets/images/icon-stylus.svg";
    }
  }

  render() {
    const container = document.createElement("div");
    container.className = "flex-col justify-center items-center gap-8 flex";

    // box
    const box = document.createElement("div");
    box.className = "flex-col justify-center items-center gap-4 flex";

    const name = document.createElement("div");
    name.className =
      "text-primary-text dark:text-secondary-text text-2xl font-semibold font-['Inter']";
    name.innerText = Store.state.nickname;

    const friendsContainer = document.createElement("div");
    friendsContainer.className =
      "flex-col justify-start items-start gap-2 flex";

    const friendsList = document.createElement("div");
    friendsList.className = "justify-start items-start gap-4 inline-flex";

    const followers = document.createElement("button");
    followers.className =
      "text-primary-button dark:secondary-button text-xs font-medium font-['Inter']";
    followers.innerText = `${this.props.followers} Followers`;

    followers.addEventListener("click", () => this.props.onFollowers());

    const followings = document.createElement("button");
    followings.className =
      "text-primary-button dark:secondary-button text-xs font-medium font-['Inter']";
    followings.innerText = `${this.props.following} Following`;
    
    followings.addEventListener("click", () => this.props.onFollowings());

    friendsList.appendChild(followers);
    friendsList.appendChild(followings);

    const friendsButton = createComponent(FriendsButton, {
      iconSrc: "/static/assets/images/icon-person-add.svg",
      bgColor: "bg-primary-button dark:bg-secondary-button",
      textColor: "text-primary-button_text",
      text: "ADD FRIENDS",
    });

    friendsButton.addEventListener("click", () => this.props.onFriends());

    friendsContainer.appendChild(friendsList);
    friendsContainer.appendChild(friendsButton);

    box.appendChild(name);
    box.appendChild(friendsContainer);

    // line
    this.line = document.createElement("img");
    if (Store.state.darkMode) {
      this.line.src = "/static/assets/images/line-profile-dark.svg";
    } else {
      this.line.src = "/static/assets/images/line-profile.svg";
    }

    // win lose rate
    const winLoseRate = document.createElement("div");
    winLoseRate.className =
      "text-primary-text dark:text-secondary-text text-xs font-medium font-['Inter']";
    winLoseRate.innerText = "0 WIN / 0 LOSE";

    // icon button
    this.editButton = createComponent(IconButton, {
      iconSrc: Store.state.darkMode
        ? "/static/assets/images/icon-stylus-dark.svg"
        : "/static/assets/images/icon-stylus.svg",
      bgColorClass: "bg-primary-text dark:bg-secondary-text",
      containerWidth: "w-[72px]",
      containerHeight: "h-[72px]",
      iconWidth: "w-[48px]",
      iconHeight: "h-[48px]",
      onClick: this.props.onEdit,
    });

    container.appendChild(box);
    container.appendChild(this.line);
    container.appendChild(winLoseRate);
    container.appendChild(this.editButton);

    return container;
  }
}

export default LeftContents;
