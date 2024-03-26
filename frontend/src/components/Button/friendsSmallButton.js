import { Component } from "../../core/index.js";

class FriendsSmallButton extends Component {
  constructor (props) {
    super(props);

    this.bgColor = this.props.friend ? "bg-primary-inner_card_top dark:bg-secondary-inner_card_top" : "bg-primary-button dark:bg-secondary-button";
    this.iconSrc = this.props.friend ? "/static/assets/images/icon-person-check.svg" : "/static/assets/images/icon-person-add.svg";
  }

  updater() {
    this.props.friend = !this.props.friend;

    this.bgColor = this.props.friend ? "bg-primary-inner_card_top dark:bg-secondary-inner_card_top" : "bg-primary-button dark:bg-secondary-button";
    this.iconSrc = this.props.friend ? "/static/assets/images/icon-person-check.svg" : "/static/assets/images/icon-person-add.svg";

    this.button.className = `px-3 py-1 ${this.bgColor} rounded-[14px] justify-start items-start gap-2.5 flex`;
    this.icon.src = this.iconSrc;
  }

  render() {
    this.button = document.createElement("button");
    this.button.className = `px-3 py-1 ${this.bgColor} rounded-[14px] justify-start items-start gap-2.5 flex`;

    this.icon = document.createElement("img");
    this.icon.className = "w-4 h-4 relative";
    this.icon.src = this.iconSrc;

    this.button.appendChild(this.icon);

    this.button.addEventListener("click", () => this.updater());

    return this.button;
  }
}

export default FriendsSmallButton;