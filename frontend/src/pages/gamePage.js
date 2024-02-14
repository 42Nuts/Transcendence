import { Component } from "../core/index.js";

class GamePage extends Component {
  render() {
    const container = document.createElement("div");
    const element = document.createElement("h1");
    element.innerHTML = "Game Page";

    const anchor = document.createElement("a");
    anchor.href = "/";
    anchor.innerText = "Go Home";

    container.appendChild(element);
    container.appendChild(anchor);

    return container;
  }
}

export default GamePage;
