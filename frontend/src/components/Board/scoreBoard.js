import { Component } from "../../core/index.js";

class ScoreBoard extends Component {
  render() {
    const container = document.createElement("div");
    container.className =
      "w-44 pl-[15px] pr-12 py-[9px] bg-primary-card_background dark:bg-secondary-card_background rounded-[67px] shadow justify-start items-center gap-8 inline-flex";

    const profile = document.createElement("div");
    profile.className = "w-[54px] h-[54px] justify-center items-center flex";

    const profileImg = document.createElement("div");
    profileImg.className = "w-[54px] h-[54px] relative";

    const img = document.createElement("img");
    img.className = "w-[54px] h-[54px] shadow-md rounded-full";
    img.src = this.props.imgSrc;

    profileImg.appendChild(img);
    profile.appendChild(profileImg);

    const score = document.createElement("div");
    score.id = this.props.id;
    score.className =
      "text-primary-text dark:text-secondary-text text-[40px] font-black font-['Inter']";
    score.innerText = "0";

    container.appendChild(profile);
    container.appendChild(score);

    return container;
  }
}

export default ScoreBoard;
