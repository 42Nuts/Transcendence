import { Component, createComponent } from "../../core/index.js";
import { BasicButton } from "../../components/Button/index.js";
import { TournamentCard } from "../../components/Card/index.js";

class TournamentTable extends Component {
  render() {
    const container = document.createElement("div");
    container.className = "fixed inset-0 bg-primary z-50 flex justify-center items-center";

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
      imageSrc: this.props.player1Image,
      name: this.props.player1Name,
    });

    const bridgeLeft = document.createElement("div");
    bridgeLeft.className =
      "w-[224.40px] h-[224.40px] flex justify-start items-center";

    const bridgeLeftImage = document.createElement("img");
    bridgeLeftImage.className = "absolute left-[104px]";
    bridgeLeftImage.src = "/static/assets/images/line-left.svg";

    bridgeLeft.appendChild(bridgeLeftImage);

    const person2 = createComponent(TournamentCard, {
      imageSrc: this.props.player2Image,
      name: this.props.player2Name,
    });

    leftContainer.appendChild(person1);
    leftContainer.appendChild(bridgeLeft);
    leftContainer.appendChild(person2);

    const middleContainer = document.createElement("div");
    middleContainer.className = "justify-start items-start gap-[280px] flex";


    let nextRoundLeft = document.createElement("div");
    let nextRoundRight = document.createElement("div");

    if (this.props.isFinal) {
      nextRoundLeft = createComponent(TournamentCard, {
        imageSrc: this.props.playerLeftImage,
        name: this.props.playerLeftName,
      });

      nextRoundRight = createComponent(TournamentCard, {
        imageSrc: this.props.playerRightImage,
        name: this.props.playerRightName,
      });

    } else {
      nextRoundLeft.className = "w-[224.40px] h-[224.40px]";

      const nextRoundLeftImage = document.createElement("img");
      nextRoundLeftImage.className = "w-[224.40px] h-[224.40px]";
      nextRoundLeftImage.src = "/static/assets/images/empty-area-big.svg";

      nextRoundLeft.appendChild(nextRoundLeftImage);

      nextRoundRight.className = "w-[224.40px] h-[224.40px]";

      const nextRoundRightImage = document.createElement("img");
      nextRoundRightImage.className = "w-[224.40px] h-[224.40px]";
      nextRoundRightImage.src = "/static/assets/images/empty-area-big.svg";

      nextRoundRight.appendChild(nextRoundRightImage);
    }

    middleContainer.appendChild(nextRoundLeft);
    middleContainer.appendChild(nextRoundRight);

    const rightContainer = document.createElement("div");
    rightContainer.className =
      "flex-col justify-start items-start gap-0 inline-flex";

    const person3 = createComponent(TournamentCard, {
      imageSrc: this.props.player3Image,
      name: this.props.player3Name,
    });

    const bridgeRight = document.createElement("div");
    bridgeRight.className =
      "w-[224.40px] h-[224.40px] flex justify-end items-center";

    const bridgeRightImage = document.createElement("img");
    bridgeRightImage.className = "absolute end-[104px]";
    bridgeRightImage.src = "/static/assets/images/line-right.svg";

    bridgeRight.appendChild(bridgeRightImage);

    const person4 = createComponent(TournamentCard, {
      imageSrc: this.props.player4Image,
      name: this.props.player4Name,
    });

    rightContainer.appendChild(person3);
    rightContainer.appendChild(bridgeRight);
    rightContainer.appendChild(person4);

    roundContainer.appendChild(leftContainer);
    roundContainer.appendChild(middleContainer);
    roundContainer.appendChild(rightContainer);
    round1.appendChild(roundContainer);

    //image
    const imageContainer = document.createElement("div");
    imageContainer.className = "absolute";

    const image = document.createElement("img");
    image.src = "/static/assets/images/character-champion.svg";

    imageContainer.appendChild(image);

    container.appendChild(round1);
    container.appendChild(imageContainer);
    return container;
  }
}

export default TournamentTable;
