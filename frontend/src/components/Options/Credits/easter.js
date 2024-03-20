import { Component } from "../../../core/index.js";

class Easter extends Component {
  render() {
    const easter = document.createElement("div");
    easter.className = "fixed inset-0 bg-primary-text bg-opacity-20 z-50 flex justify-center items-center";

    const easterContainer = document.createElement("img");
    easterContainer.src = "/static/assets/images/sun.png";
    easterContainer.className = "w-[500px] h-[500px] rounded-3xl border-8 border-primary-card_background dark:border-secondary-card_background";

    easter.appendChild(easterContainer);

    easter.addEventListener("click", () => {
      easter.remove();
    });

    return easter;
  }
}

export default Easter;