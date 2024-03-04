import { Component, createComponent } from "../../core/index.js";
import Store from "../../store/index.js";

class NickNamePopUp extends Component {
  constructor(props) {
    super(props);
    this.name = "";
  }

  render() {
    const overlay = document.createElement("div");
    overlay.className =
      "absolute m-auto fixed inset-0 bg-primary-text bg-opacity-50 flex justify-center items-center";
    overlay.id = "nickName";
    if (Store.state.nickName === true) {
      overlay.style.display = "none";
    } else {
      overlay.style.display = "flex";
    }

    const box = document.createElement("div");
    box.className = "flex justify-center items-center min-h-screen";

    const container = document.createElement("div");
    container.className =
      "w-[594px] h-[268px] px-16 py-8 bg-white rounded-[50px] flex-col justify-start items-center gap-6 inline-flex";

    const textContainer = document.createElement("div");
    textContainer.className = "flex-col justify-start items-center gap-4 flex";

    const title = document.createElement("div");
    title.className = "text-primary-text text-[40px] font-bold font-['Inter']";
    title.textContent = "Enter the nickname";

    const inputContainer = document.createElement("div");
    inputContainer.className =
      "w-[466px] px-6 py-2 bg-white rounded-[89px] border-2 border-primary-text justify-between items-center inline-flex";

    const input = document.createElement("input");
    input.className =
      "w-full opacity-50 text-primary-text text-2xl font-medium font-['Inter'] outline-none";
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "search");

    const checkContainer = document.createElement("div");
    checkContainer.className = "w-9 h-9 relative opacity-50";

    const check = document.createElement("div");
    check.className =
      "w-9 h-9 left-0 top-0 absolute bg-primary-text rounded-full";

    const checkIcon = document.createElement("img");
    checkIcon.className = "w-6 h-6 left-[6px] top-[6px] absolute";
    checkIcon.src = "./src/assets/images/icon-check.svg";

    const buttonContainer = document.createElement("button");
    buttonContainer.className =
      "px-8 py-3 opacity-50 bg-primary-text rounded-[28px] justify-center items-center inline-flex";

    const confirmButton = document.createElement("div");
    confirmButton.className =
      "text-center text-primary-button_text text-[32px] font-semibold font-['Inter'] leading-8";
    confirmButton.textContent = "OK";

    input.addEventListener("input", () => {
      if (input.value.length > 0) {
        checkContainer.classList.replace("opacity-50", "opacity-100");
        check.classList.replace("bg-primary-text", "bg-primary-color4");
        inputContainer.classList.replace(
          "border-primary-text",
          "border-primary-color4"
        );
        buttonContainer.classList.replace("opacity-50", "opacity-100");
        buttonContainer.classList.replace(
          "bg-primary-text",
          "bg-primary-color4"
        );
      } else {
        checkContainer.classList.replace("opacity-100", "opacity-50");
        check.classList.replace("bg-primary-color4", "bg-primary-text");
        inputContainer.classList.replace(
          "border-primary-color4",
          "border-primary-text"
        );
        buttonContainer.classList.replace("opacity-100", "opacity-50");
        buttonContainer.classList.replace(
          "bg-primary-color4",
          "bg-primary-text"
        );
      }
    });

    input.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        this.name = input.value;
        overlay.style.display = "none";
        Store.dispatch("updateNickName");
        console.log(this.name);
      }
    });

    buttonContainer.addEventListener("click", () => {
      this.name = input.value;
      overlay.style.display = "none";
      Store.dispatch("updateNickName");
      console.log(this.name);
    });

    textContainer.appendChild(title);
    checkContainer.appendChild(check);
    check.appendChild(checkIcon);
    inputContainer.appendChild(input);
    inputContainer.appendChild(checkContainer);
    buttonContainer.appendChild(confirmButton);
    container.appendChild(textContainer);
    container.appendChild(inputContainer);
    container.appendChild(buttonContainer);

    box.appendChild(container);
    overlay.appendChild(box);

    return overlay;
  }
}

export default NickNamePopUp;
