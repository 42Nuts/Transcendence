import { Component } from "../core/index.js";

class HomePage extends Component {
  render() {
    const container = document.createElement("div");
    const element = document.createElement("h1");
    element.innerHTML = "Home Page";

    const anchor = document.createElement("a");
    anchor.href = "/options";
    anchor.innerText = "options";
    anchor.style.marginRight = "10px";

    const anchor2 = document.createElement("a");
    anchor2.href = "/profile";
    anchor2.innerText = "profile";
    anchor2.style.marginRight = "10px";

    const anchor3 = document.createElement("a");
    anchor3.href = "/game";
    anchor3.innerText = "game start";
    anchor3.style.marginRight = "10px";

    container.appendChild(element);
    container.appendChild(anchor);
    container.appendChild(anchor2);
    container.appendChild(anchor3);

    return container;
  }
}

export default HomePage;
