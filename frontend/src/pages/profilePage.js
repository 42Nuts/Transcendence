import { Component, createComponent } from "../core/index.js";
import { BackIconButton } from "../components/Button/index.js";
import { MyProfileCard } from "../components/Profile/left/index.js";
import Store from "../store/index.js";

class ProfilePage extends Component {
  render() {
    this.container = document.createElement("div");
    this.container.className =
      "flex items-center justify-center min-h-screen bg-no-repeat bg-cover";
    if (Store.state.darkMode) {
      this.container.style.backgroundImage =
        'url("/static/assets/images/net-dark.svg")';
    } else {
      this.container.style.backgroundImage =
        'url("/static/assets/images/net.svg")';
    }
    this.container.style.backgroundPosition = "calc(100% - 680px) center";

    // grid 레이아웃을 사용하는 컨테이너 생성
    const gridContainer = document.createElement("div");
    gridContainer.className =
      "grid grid-cols-12 gap-10 flex flex-col items-center justify-center min-h-screen";

    // BackIconButton 추가
    const backIcon = createComponent(BackIconButton, {});
    backIcon.classList.add("absolute", "top-0");
    gridContainer.appendChild(backIcon);

    // leftProfileCard 추가
    const leftProfileCard = createComponent(MyProfileCard, {});

    // rightProfileCard 추가
    const rightProfileCard = document.createElement("div");
    rightProfileCard.className =
      "col-start-9 col-span-4 relative w-[408px] h-[632px]";

    const board2 = document.createElement("div");
    board2.className =
      "w-[408px] h-[632px] left-0 top-0 absolute bg-primary-card_background rounded-2xl border-8 border-primary-button";

    rightProfileCard.appendChild(board2);

    gridContainer.appendChild(leftProfileCard);
    gridContainer.appendChild(rightProfileCard);

    this.container.appendChild(gridContainer);
    return this.container;
  }
}

export default ProfilePage;
