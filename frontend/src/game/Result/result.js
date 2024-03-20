import { Component } from "../../core/index.js";
import { themeImages } from "../../config/index.js";
import Store from "../../store/index.js";

class Result extends Component {
  winner() {
    const overlay = document.createElement("a");
    overlay.className = "fixed inset-0 bg-primary-color4 bg-opacity-50 z-50 flex justify-center items-center";

    const resultContainer = document.createElement("div");
    resultContainer.className = "w-[234px] h-48 justify-start items-start gap-2.5 inline-flex";

    const resultText = document.createElement("div");
    resultText.className = "text-center text-primary-button_text text-8xl font-black font-['Inter'] leading-[96px] tracking-[9.60px]";
    resultText.innerText = "YOU\nWIN";

    const ballImageContainer = document.createElement("div");
    ballImageContainer.className = "w-[74px] h-[74px] absolute";

    const ballImage = document.createElement("img");
    ballImage.src = themeImages[Store.state.theme];
    ballImage.className = "top-[12px] left-[76px] absolute";

    ballImageContainer.appendChild(ballImage);

    resultContainer.appendChild(resultText);
    resultContainer.appendChild(ballImageContainer);

    overlay.appendChild(resultContainer);

    return overlay;
  }

  loser() {
    const overlay = document.createElement("a");
    overlay.className = "fixed inset-0 bg-primary-color3 bg-opacity-50 z-50 flex justify-center items-center";

    const resultContainer = document.createElement("div");
    resultContainer.className = "w-[281px] h-48 relative";

    const resultText = document.createElement("div");
    resultText.className = "left-0 top-0 absolute text-center text-primary-button_text text-8xl font-black font-['Inter'] leading-[96px] tracking-[9.60px]";
    resultText.innerText = "YOU\nLOSE";

    const ballImageContainer = document.createElement("div");
    ballImageContainer.className = "w-[74px] h-[74px] left-[100px] top-[12px] absolute";

    const ballImage = document.createElement("img");
    ballImage.src = themeImages[Store.state.theme];

    ballImageContainer.appendChild(ballImage);

    resultContainer.appendChild(resultText);
    resultContainer.appendChild(ballImageContainer);

    overlay.appendChild(resultContainer);

    return overlay;
  }

  render() {
    if (this.props.result === "win") {
      return this.winner();
    } else {
      return this.loser();
    }
  }
}

export default Result;
