import { Component, createComponent } from "../../core/index.js";
import { BasicButton } from "../../components/Button/index.js";
import { TournamentCard } from "../../components/Card/index.js";

class TournamentTable extends Component {
  render() {
    const container = document.createElement("div");
    container.className = "flex items-center justify-center min-h-screen";

    //round1
    const round1 = document.createElement("div");
    round1.className = "absolute";

    const roundContainer = document.createElement("div");
    roundContainer.className =
      "w-[1337.60px] h-[688.80px] justify-start items-center gap-20 inline-flex";

    const leftContainer = document.createElement("div");
    leftContainer.className =
      "flex-col justify-start items-start gap-0 inline-flex";

    const person1 = createComponent(TournamentCard, {
      size: "224.40px",
      imageSize: "116.64px",
      imageSrc: "/static/assets/images/profile-taeypark.svg",
      name: "taeypark",
    });

    const bridgeLeft = document.createElement("div");
    bridgeLeft.className =
      "w-[224.40px] h-[224.40px] flex justify-start items-center";

    const bridgeLeftImage = document.createElement("img");
    bridgeLeftImage.className = "absolute left-[104px]";
    bridgeLeftImage.src = "/static/assets/images/line-left.svg";

    bridgeLeft.appendChild(bridgeLeftImage);

    const person2 = createComponent(TournamentCard, {
      size: "224.40px",
      imageSize: "116.64px",
      imageSrc: "/static/assets/images/profile-jinheo.svg",
      name: "jinheo",
    });

    leftContainer.appendChild(person1);
    leftContainer.appendChild(bridgeLeft);
    leftContainer.appendChild(person2);

    const middleContainer = document.createElement("div");
    middleContainer.className = "justify-start items-start gap-[280px] flex";

    const nextRoundLeft = document.createElement("div");
    nextRoundLeft.className = "w-[224.40px] h-[224.40px]";

    const nextRoundLeftImage = document.createElement("img");
    nextRoundLeftImage.className = "w-[224.40px] h-[224.40px]";
    nextRoundLeftImage.src = "/static/assets/images/empty-area-big.svg";

    nextRoundLeft.appendChild(nextRoundLeftImage);

    const nextRoundRight = document.createElement("div");
    nextRoundRight.className = "w-[224.40px] h-[224.40px]";

    const nextRoundRightImage = document.createElement("img");
    nextRoundRightImage.className = "w-[224.40px] h-[224.40px]";
    nextRoundRightImage.src = "/static/assets/images/empty-area-big.svg";

    nextRoundRight.appendChild(nextRoundRightImage);

    middleContainer.appendChild(nextRoundLeft);
    middleContainer.appendChild(nextRoundRight);

    const rightContainer = document.createElement("div");
    rightContainer.className =
      "flex-col justify-start items-start gap-0 inline-flex";

    const person3 = createComponent(TournamentCard, {
      size: "224.40px",
      imageSize: "116.64px",
      imageSrc: "/static/assets/images/profile-hyeoan.svg",
      name: "hyeoan",
    });

    const bridgeRight = document.createElement("div");
    bridgeRight.className =
      "w-[224.40px] h-[224.40px] flex justify-end items-center";

    const bridgeRightImage = document.createElement("img");
    bridgeRightImage.className = "absolute end-[104px]";
    bridgeRightImage.src = "/static/assets/images/line-right.svg";

    bridgeRight.appendChild(bridgeRightImage);

    const person4 = createComponent(TournamentCard, {
      size: "224.40px",
      imageSize: "116.64px",
      imageSrc: "/static/assets/images/profile-yim.svg",
      name: "yim",
    });

    rightContainer.appendChild(person3);
    rightContainer.appendChild(bridgeRight);
    rightContainer.appendChild(person4);

    roundContainer.appendChild(leftContainer);
    roundContainer.appendChild(middleContainer);
    roundContainer.appendChild(rightContainer);
    round1.appendChild(roundContainer);

    //round2
    const round2 = document.createElement("div");
    round2.className = "absolute top-2/3";

    const round2Container = document.createElement("div");
    round2Container.className =
      "w-[314px] h-[117px] justify-start items-start gap-20 inline-flex";

    const round2Left = document.createElement("div");
    round2Left.className = "w-[117px] h-[117px] relative";

    const round2LeftImage = document.createElement("img");
    round2LeftImage.className = "w-[117px] h-[117px] left-0 top-0 absolute";
    round2LeftImage.src = "/static/assets/images/empty-area-small.svg";

    round2Left.appendChild(round2LeftImage);

    const round2Right = document.createElement("div");
    round2Right.className = "w-[117px] h-[117px] relative";

    const round2RightImage = document.createElement("img");
    round2RightImage.className = "w-[117px] h-[117px] left-0 top-0 absolute";
    round2RightImage.src = "/static/assets/images/empty-area-small.svg";

    round2Right.appendChild(round2RightImage);

    round2Container.appendChild(round2Left);
    round2Container.appendChild(round2Right);

    round2.appendChild(round2Container);

    //image
    const imageContainer = document.createElement("div");
    imageContainer.className = "absolute";

    const image = document.createElement("img");
    image.src = "/static/assets/images/character-champion.svg";

    imageContainer.appendChild(image);

    //play button
    const playButtonPos = document.createElement("div");
    playButtonPos.className = "absolute top-[80%]";

    const playButtonHref = document.createElement("a");
    playButtonHref.setAttribute("href", "/gameMode/");
    const playButton = createComponent(BasicButton, {
      text: "Play",
    });

    playButtonHref.appendChild(playButton);
    playButtonPos.appendChild(playButtonHref);

    container.appendChild(round1);
    container.appendChild(round2);
    container.appendChild(imageContainer);
    container.appendChild(playButtonPos);
    return container;
  }
}

export default TournamentTable;
