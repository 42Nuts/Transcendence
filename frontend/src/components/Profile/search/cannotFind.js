import { Component } from "../../../core/index.js";

class CannotFind extends Component {
  render () {
    const container = document.createElement("div");
    container.className = "w-[270px] h-[278px] flex-col justify-start items-center inline-flex";

    const image = document.createElement("img");
    image.src = "/static/assets/images/character-detective.svg";
    image.className = "w-60 h-60";

    const text = document.createElement("div");
    text.className = "text-center text-primary-text dark:text-secondary-text text-base font-normal font-['Inter']";
    text.innerHTML = this.props.text;

    container.appendChild(image);
    container.appendChild(text);

    return container;
  }
}

export default CannotFind;