import { Component } from "../core/index.js";

class LoadingPage extends Component {
  componentDidMount() {
    console.log("LoadingPage mounted");
    setTimeout(() => {
      this.route("/gameMode/");
      // window.location.href = "/gameMode/";
    }, 3000);
  }

  render() {
    const container = document.createElement("div");
    container.className = "flex justify-center items-center min-h-screen";

    const loadingContainer = document.createElement("div");
    loadingContainer.className = "w-[424px] h-[468px] flex-col justify-start items-center gap-1 inline-flex";

    const loadingImg = document.createElement("img");
    loadingImg.className = "w-[424px] h-[424px]";
    loadingImg.src = "/static/assets/images/character-detective.svg";

    const loadingText = document.createElement("div");
    loadingText.className = "justify-start items-baseline inline-flex";

    const loadingTextTitle = document.createElement("div");
    loadingTextTitle.className = "text-center text-primary-text dark:text-secondary-text text-[40px] font-semibold font-['Inter'] leading-10";
    loadingTextTitle.innerText = "Looking for players";

    const loading = document.createElement("div");
    loading.className = "loading w-[37px] h-[17px] relative";

    const dot1 = document.createElement("div");
    dot1.className = "w-1.5 h-1.5 left-[5px] top-[11px] absolute bg-primary-text dark:bg-secondary-text rounded-full animate-bounce";
    dot1.style = "animation-delay: 0s;";

    const dot2 = document.createElement("div");
    dot2.className = "w-1.5 h-1.5 left-[16px] top-[11px] absolute bg-primary-text dark:bg-secondary-text rounded-full animate-bounce";
    dot2.style = "animation-delay: 0.2s;";

    const dot3 = document.createElement("div");
    dot3.className = "w-1.5 h-1.5 left-[27px] top-[11px] absolute bg-primary-text dark:bg-secondary-text rounded-full animate-bounce";
    dot3.style = "animation-delay: 0.4s;";

    loading.appendChild(dot1);
    loading.appendChild(dot2);
    loading.appendChild(dot3);

    loadingText.appendChild(loadingTextTitle);
    loadingText.appendChild(loading);

    loadingContainer.appendChild(loadingImg);
    loadingContainer.appendChild(loadingText);

    container.appendChild(loadingContainer);

    return container;
  }
}

export default LoadingPage;