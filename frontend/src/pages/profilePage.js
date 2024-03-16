import { Component, createComponent } from "../core/index.js";
import { BackIconButton } from "../components/Button/index.js";
import {
  MyProfileCard,
  MyProfileEdit,
} from "../components/Profile/left/index.js";
import { MatchHistory } from "../components/Profile/right/index.js";
import Store from "../store/index.js";

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    Store.events.subscribe("darkMode", this.updateBackground.bind(this));
    this.leftProfileCard = null;
  }

  updateBackground() {
    if (Store.state.darkMode) {
      this.container.style.backgroundImage =
        'url("/static/assets/images/net-dark.svg")';
    } else {
      this.container.style.backgroundImage =
        'url("/static/assets/images/net.svg")';
    }
  }

  showMyProfileCard() {
    this.leftProfileCard.innerHTML = "";
    const myProfileCard = createComponent(MyProfileCard, {
      onEdit: this.showMyProfileEdit.bind(this),
    });
    this.leftProfileCard.appendChild(myProfileCard);
  }

  showMyProfileEdit() {
    this.leftProfileCard.innerHTML = "";
    const myProfileEdit = createComponent(MyProfileEdit, {
      onCancel: this.showMyProfileCard.bind(this),
    });
    this.leftProfileCard.appendChild(myProfileEdit);
  }

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
    this.leftProfileCard = document.createElement("div");
    this.leftProfileCard.className = "col-start-6 col-span-3 relative w-[296px] h-[632px]";
    gridContainer.appendChild(this.leftProfileCard);

    this.showMyProfileCard();

    // rightProfileCard 추가
    const rightProfileCard = createComponent(MatchHistory, {});

    gridContainer.appendChild(rightProfileCard);

    this.container.appendChild(gridContainer);
    return this.container;
  }
}

export default ProfilePage;
