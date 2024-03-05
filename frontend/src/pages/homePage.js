import { Component, createComponent } from "../core/index.js";
import { BasicButton } from "../components/Button/index.js";
import { NickNamePopup } from "../components/PopUp/index.js";

class HomePage extends Component {
  render() {
    // 최상위 div 생성 및 클래스 추가
    const bgDiv = document.createElement("div");
    bgDiv.classList.add("bg-no-repeat", "bg-cover");
    bgDiv.style.backgroundImage = 'url(\"/static/assets/images/net.svg\")';
    bgDiv.style.backgroundPosition = "calc(100% + 390px) center";

    // flex 컨테이너 생성 및 클래스 추가
    const flexContainer = document.createElement("div");
    flexContainer.classList.add(
      "flex",
      "justify-center",
      "items-center",
      "min-h-screen"
    );

    // 메인 컨텐츠 div 생성 및 클래스 추가
    const mainContentDiv = document.createElement("div");
    mainContentDiv.classList.add(
      "w-[1136px]",
      "h-[480px]",
      "flex-col",
      "justify-start",
      "items-start",
      "gap-60",
      "inline-flex"
    );

    // 타이틀 div 생성 및 클래스 추가
    const titleDiv = document.createElement("div");
    titleDiv.classList.add(
      "text-primary-text",
      "text-[80px]",
      "font-bold",
      "font-['Inter']",
      "leading-[80px]",
      "tracking-[4px]"
    );
    titleDiv.textContent = "PING PONG";

    // 버튼 컨테이너 div 생성 및 클래스 추가
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add(
      "justify-start",
      "items-end",
      "gap-[863px]",
      "inline-flex"
    );

    // Play 버튼 div 생성 및 설정
    const playButtonHref = document.createElement("a");
    playButtonHref.setAttribute("href", "/game/");
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
    const profileImage = document.createElement("img");
    profileImage.classList.add("profile-image", "w-[72px]", "h-[72px]");
    profileImage.src = "/static/assets/images/profile-default.svg";

    // 구조 조립
    bgDiv.appendChild(flexContainer);
    flexContainer.appendChild(mainContentDiv);
    mainContentDiv.appendChild(titleDiv);

    const buttonsFlexContainer = document.createElement("div");
    buttonsFlexContainer.classList.add(
      "flex-col",
      "justify-start",
      "items-start",
      "gap-8",
      "inline-flex"
    );
    buttonsFlexContainer.appendChild(playButtonHref);
    buttonsFlexContainer.appendChild(optionsButtonHref);

    buttonContainer.appendChild(buttonsFlexContainer);
    buttonContainer.appendChild(profileImage);
    mainContentDiv.appendChild(buttonContainer);

    // 닉네임 팝업 컴포넌트 추가
    const nickNamePopup = createComponent(NickNamePopup, {});
    bgDiv.appendChild(nickNamePopup);

    return bgDiv;
  }
}

export default HomePage;
