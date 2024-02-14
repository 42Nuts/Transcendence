import { Component } from "../core/index.js";

class OptionsPage extends Component {
  render() {
    const container = document.createElement("div");
    const element = document.createElement("h1");
    element.innerHTML = "Options Page";

    const anchor = document.createElement("a");
    anchor.href = "/";
    anchor.innerText = "Go Home";

    container.appendChild(element);
    container.appendChild(anchor);

    return container;
  }
}

export default OptionsPage;
