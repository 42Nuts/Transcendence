import { Component, createComponent } from "../core/index.js";
import { BasicButton } from "../components/Button/index.js";
import { NickNamePopup } from "../components/PopUp/index.js";
import { profileImages } from "../config/index.js";
import Store from "../store/index.js";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.initState();
    Store.events.subscribe("darkModeChange", () => {
      if (Store.state.darkMode) {
        this.bgDiv.style.backgroundImage = 'url("/static/assets/images/net-dark.svg")';
      } else {
        this.bgDiv.style.backgroundImage = 'url("/static/assets/images/net.svg")';
      } 
    });
  }

  initState() {
    Promise.all([
      fetch(`/v2/users/${userId}/profile-index/`, { 
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => response.json()),
      fetch(`/v2/users/${userId}/theme-index/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => response.json()),
      fetch(`/v2/users/${userId}/dark-mode/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => response.json()),
      fetch(`/v2/users/${userId}/nickname/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => response.json()),
    ])
      .then((data) => {
        Store.state.profile = data[0].profile_index;
        Store.state.theme = data[1].theme_index;
        Store.state.darkMode = data[2].dark_mode;
        Store.state.nickname = data[3].nickname;

        // 모든 fetch 요청이 완료된 후에 UI 업데이트를 위한 코드 실행
        this.updateUI();
        if (Store.state.darkMode) {
          document.documentElement.classList.add("dark");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  updateUI() {
    // UI 업데이트 로직, 예를 들어 프로필 이미지 업데이트
    const profileImage = document.querySelector(".profile-image");
    if (profileImage) {
      profileImage.src = profileImages[Store.state.profile];
    }
  }

  render() {
    // 최상위 div 생성 및 클래스 추가
    this.bgDiv = document.createElement("div");
    this.bgDiv.classList.add("bg-no-repeat", "bg-cover");
    if (Store.state.darkMode) {
      this.bgDiv.style.backgroundImage = 'url("/static/assets/images/net-dark.svg")';
    } else {
      this.bgDiv.style.backgroundImage = 'url("/static/assets/images/net.svg")';
    }
    this.bgDiv.style.backgroundPosition = "calc(100% + 390px) center";

    // flex 컨테이너 생성 및 클래스 추가
    const flexContainer = document.createElement("div");
    flexContainer.className = "flex justify-center items-center min-h-screen";

    // 메인 컨텐츠 div 생성 및 클래스 추가
    const mainContentDiv = document.createElement("div");
    mainContentDiv.className =
      "w-[1136px] h-[480px] flex-col justify-start items-start gap-60 inline-flex";

    // 타이틀 div 생성 및 클래스 추가
    const titleDiv = document.createElement("div");
    titleDiv.className =
      "text-primary-text dark:text-secondary-text text-[80px] font-bold font-['Inter'] leading-[80px] tracking-[4px]";
    titleDiv.textContent = "PING PONG";

    // 버튼 컨테이너 div 생성 및 클래스 추가
    const buttonContainer = document.createElement("div");
    buttonContainer.className =
      "justify-start items-end gap-[863px] inline-flex";

    // Play 버튼 div 생성 및 설정
    const playButtonHref = document.createElement("a");
    playButtonHref.setAttribute("href", "/gameMode/");
    playButtonHref.setAttribute("class", "play-button");
    const playButton = createComponent(BasicButton, { text: "Play" });
    playButtonHref.appendChild(playButton);

    // Options 버튼 div 생성 및 설정
    const optionsButtonHref = document.createElement("a");
    optionsButtonHref.setAttribute("href", "/options/");
    optionsButtonHref.setAttribute("class", "options-button");
    const optionsButton = createComponent(BasicButton, { text: "Options" });
    optionsButtonHref.appendChild(optionsButton);

    // 프로필 이미지 설정
    const profileImageHref = document.createElement("a");
    profileImageHref.setAttribute("href", "/profile/");

    const profileImage = document.createElement("img");
    profileImage.className = "profile-image w-[72px] h-[72px]";
    profileImage.src = profileImages[Store.state.nickname];
    profileImageHref.appendChild(profileImage);

    // 구조 조립
    this.bgDiv.appendChild(flexContainer);
    flexContainer.appendChild(mainContentDiv);
    mainContentDiv.appendChild(titleDiv);

    const buttonsFlexContainer = document.createElement("div");
    buttonsFlexContainer.className =
      "flex-col justify-start items-start gap-8 inline-flex";
    buttonsFlexContainer.appendChild(playButtonHref);
    buttonsFlexContainer.appendChild(optionsButtonHref);

    buttonContainer.appendChild(buttonsFlexContainer);
    buttonContainer.appendChild(profileImageHref);
    mainContentDiv.appendChild(buttonContainer);

    // 닉네임 팝업 컴포넌트 추가
    const nickNamePopup = createComponent(NickNamePopup, {
      mode: "home",
    });
    this.bgDiv.appendChild(nickNamePopup);

    return this.bgDiv;
  }
}

export default HomePage;
