import { Component, createComponent } from "../core/index.js";
import {
  TournamentResultCard,
  TournamentWinnerCard,
} from "../components/Card/index.js";
import { BasicButton } from "../components/Button/index.js";

class TournamentResultPage extends Component {
  render() {
    const container = document.createElement("div");
    container.className = "flex items-center justify-center min-h-screen";

    // result
    const resultContainer = document.createElement("div");
    resultContainer.className = "absolute";

    const resultBox = document.createElement("div");
    resultBox.className =
      "w-[1118px] h-[390.43px] justify-start items-end gap-[152px] inline-flex";

    const second = createComponent(TournamentResultCard, {
      imageSrc: "/static/assets/images/profile-taeypark.svg",
      name: "taeypark",
      order: "2nd",
    });

    const first = createComponent(TournamentWinnerCard, {
      imageSrc: "/static/assets/images/profile-hyeoan.svg",
      name: "hyeoan",
    });

    const third = createComponent(TournamentResultCard, {
      imageSrc: "/static/assets/images/profile-yim.svg",
      name: "yim",
      order: "3rd",
    });

    resultBox.appendChild(second);
    resultBox.appendChild(first);
    resultBox.appendChild(third);

    resultContainer.appendChild(resultBox);

    // exit button
    const exitButtonPos = document.createElement("div");
    exitButtonPos.className = "absolute top-[85%]";

    const exitButtonHref = document.createElement("a");
    exitButtonHref.setAttribute("href", "/gameMode/");

    const exitButton = createComponent(BasicButton, { text: "Exit" });

    exitButtonHref.appendChild(exitButton);
    exitButtonPos.appendChild(exitButtonHref);

    container.appendChild(resultContainer);
    container.appendChild(exitButtonPos);

    const canvas = document.createElement("canvas");
    canvas.id = "canvas";
    container.appendChild(canvas);

    const style = document.createElement("style");
    style.innerHTML = `canvas{z-index:10;pointer-events: none;position: fixed;top: 0;transform: scale(1.1);}`;
    container.appendChild(style);

    const script = document.createElement("script");
    script.src = "/static/assets/effects/confetti_v2.js";
    script.onload = function () {
      SetGlobals();
      InitializeConfetti();

      setTimeout(() => {
        DeactivateConfetti();
      }, 5000);
    };
    container.appendChild(script);

    return container;
  }
}

export default TournamentResultPage;
