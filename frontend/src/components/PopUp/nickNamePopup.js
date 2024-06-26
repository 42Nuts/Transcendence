import { Component, createComponent } from "../../core/index.js";
import { GamePage, GameModePage } from "../../pages/index.js";
import Store from "../../store/index.js";
import getCookie from "../../utils/getCookie.js"

class NickNamePopUp extends Component {
  constructor(props) {
    super(props);
    this.name = "";
  }

  gotoGamePage() {
    window.history.pushState({}, "", "/game/");

    // 페이지 컨텐츠를 동적으로 변경합니다.
    const rootElement = document.querySelector("#root");
    if (rootElement) {
      rootElement.innerHTML = ""; // 기존 컨텐츠를 지웁니다.

      // GamePage 컴포넌트를 생성하고 초기화합니다.
      const gamePageComponent = new GamePage();
      const gamePageElement = gamePageComponent.initialize(); // 가정: initialize 메서드가 DOM 요소를 반환

      // 생성된 페이지 요소를 rootElement에 추가합니다.
      rootElement.appendChild(gamePageElement);
    }

    // 뒤로 가기를 위한 onpopstate 이벤트 처리
    window.onpopstate = () => {
      const rootElement = document.querySelector("#root");
      if (rootElement) {
        rootElement.innerHTML = ""; // 기존 컨텐츠를 지웁니다.

        // GameModePage 컴포넌트를 생성하고 초기화합니다.
        const gameModePageComponent = new GameModePage();
        const gameModePageElement = gameModePageComponent.initialize(); // 가정: initialize 메서드가 DOM 요소를 반환

        // 생성된 페이지 요소를 rootElement에 추가합니다.
        rootElement.appendChild(gameModePageElement);
      }
    };
  }

  putNickName() {
    this.name = this.input.value;
    // this.name = "test";
    this.overlay.style.display = "none";
    requireNickName = false;

    console.log("this.name: ", this.name);
    // put nickname to store
    Store.dispatch("updateNickname", this.name);
    // fetch nickname to server
    fetch(`/v2/users/${userId}/nickname/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie('csrftoken'),
      },
      body: JSON.stringify({ nickname: this.name }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  render() {
    this.overlay = document.createElement("div");
    this.overlay.className =
      "absolute m-auto fixed inset-0 bg-primary-text bg-opacity-50 flex justify-center items-center";
    this.overlay.id = "nickname";
    if (requireNickName === "True") {
      this.overlay.style.display = "flex";
      // this.putNickName();
    } else {
      this.overlay.style.display = "none";
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

    this.input = document.createElement("input");
    this.input.className =
      "w-full opacity-50 text-primary-text text-2xl font-medium font-['Inter'] outline-none";
    this.input.setAttribute("type", "text");
    this.input.setAttribute("maxlength", "7");
    this.input.setAttribute("placeholder", "search");

    const checkContainer = document.createElement("div");
    checkContainer.className = "w-9 h-9 relative opacity-50";

    const check = document.createElement("div");
    check.className =
      "w-9 h-9 left-0 top-0 absolute bg-primary-text rounded-full";

    const checkIcon = document.createElement("img");
    checkIcon.className = "w-6 h-6 left-[6px] top-[6px] absolute";
    checkIcon.src = "/static/assets/images/icon-check.svg";

    const buttonContainer = document.createElement("button");
    buttonContainer.className =
      "px-8 py-3 opacity-50 bg-primary-text rounded-[28px] justify-center items-center inline-flex";

    const confirmButton = document.createElement("div");
    confirmButton.className =
      "text-center text-primary-button_text text-[32px] font-semibold font-['Inter'] leading-8";
    confirmButton.textContent = "OK";

    this.input.addEventListener("input", () => {
      if (this.input.value.length > 0) {
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

    this.input.addEventListener("keypress", (event) => {
      if (event.key === "Enter" && this.input.value.length > 0) {
        this.putNickName();
        if (this.props.mode == "tournament") {
          this.gotoGamePage();
        }
      }
    });

    buttonContainer.addEventListener("click", () => {
      if (this.input.value.length > 0) {
        this.putNickName();
        if (this.props.mode == "tournament") {
          this.gotoGamePage();
        }
      }
    });

    textContainer.appendChild(title);
    checkContainer.appendChild(check);
    check.appendChild(checkIcon);
    inputContainer.appendChild(this.input);
    inputContainer.appendChild(checkContainer);
    buttonContainer.appendChild(confirmButton);
    container.appendChild(textContainer);
    container.appendChild(inputContainer);
    container.appendChild(buttonContainer);

    box.appendChild(container);
    this.overlay.appendChild(box);

    return this.overlay;
  }
}

export default NickNamePopUp;
