import { Component, createComponent } from "../core/index.js";
import { BasicButton } from "../components/Button/index.js";

class TournamentPage extends Component {
  render() {
    const container = document.createElement("div");
    container.className = "flex items-center justify-center min-h-screen";

    //round1

    //round2

    //image

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

    container.appendChild(playButtonPos);
    return container;
  }
}

export default TournamentPage;
