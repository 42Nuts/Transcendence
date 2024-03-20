import { Component } from "../../core/index.js";

class Countdown extends Component {
  render() {
    const overlay = document.createElement("div");
    overlay.className = "fixed inset-0 bg-primary-text bg-opacity-50 z-50 flex justify-center items-center";

    const countdownText = document.createElement("div");
    countdownText.className = "text-center text-primary-button_text text-[240px] font-black font-['Inter'] leading-[240px]";
    countdownText.innerText = "3";

    overlay.appendChild(countdownText);

    const intervalId = setInterval(() => {
      const currentCount = parseInt(countdownText.innerText);
      if (currentCount === 1) {
        clearInterval(intervalId);
        overlay.remove();
      } else {
        countdownText.innerText = (currentCount - 1).toString();
      }
    }, 700);

    return overlay;
  }
}

export default Countdown;