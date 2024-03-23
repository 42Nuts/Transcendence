import { Component } from "../../core/index.js";

class ScoreBoard extends Component {
  render() {
    const container = document.createElement("div");
    container.className =
      "w-44 h-[82px] pl-[27px] py-2.5 bg-primary-card_background dark:bg-secondary-card_background rounded-[67px] shadow justify-start items-center gap-[29px] inline-flex";

    const profileContainer = document.createElement("div");
    profileContainer.className = "flex-col justify-start items-center gap-0.5 inline-flex";

    const profile = document.createElement("div");
    profile.className = "w-[50px] h-[50px] justify-center items-center flex";

    const profileImg = document.createElement("div");
    profileImg.className = "w-[50px] h-[50px] relative";

    const img = document.createElement("img");
    img.id = "Img" + this.props.id;
    img.className = "w-[50px] h-[50px] shadow-md rounded-full";
    img.src = this.props.imgSrc;

    profileImg.appendChild(img);
    profile.appendChild(profileImg);

    const nameContainer = document.createElement("div");
    nameContainer.className = "justify-center items-center gap-0.5 inline-flex";

    const tier = document.createElement("img");
    tier.className = "w-2 h-2 pl-[0.46px] pr-[0.36px] justify-center items-center flex";
    tier.id = "Tier" + this.props.id;
    tier.src = this.props.tierSrc;

    const name = document.createElement("div");
    name.className = "text-primary-text dark:text-secondary-text text-[8px] font-bold font-['Inter']";
    name.id = "Name" + this.props.id;
    name.innerText = this.props.name;

    nameContainer.appendChild(tier);
    nameContainer.appendChild(name);

    profileContainer.appendChild(profile);
    profileContainer.appendChild(nameContainer);

    const score = document.createElement("div");
    score.id = "Score" + this.props.id;
    score.className =
      "text-primary-text dark:text-secondary-text text-[40px] font-black font-['Inter']";
    score.innerText = "0";

    container.appendChild(profileContainer);
    container.appendChild(score);

    return container;
  }
}

export default ScoreBoard;
