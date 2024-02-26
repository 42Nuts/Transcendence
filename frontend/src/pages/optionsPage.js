import { Component, createComponent } from "../core/index.js";
import { BasicButton, BackIconButton } from "../components/Button/index.js";
import {
  GameOption,
  AccountOption,
  CreditsOption,
} from "../components/Options/index.js";
import { PopUp } from "../components/PopUp/index.js";
import Store from "../store/index.js";

class OptionsPage extends Component {
  constructor(props) {
    super(props);
    this.state = { activeOption: "Game" };
    this.activeComponentNode = null;
    Store.events.subscribe("logoutChange", async () => {
      if (Store.state.logout === true) {
        document.getElementById("popup").style.display = "flex";
      }
    });
  }

  setState(newState) {
    // 현재 상태와 새 상태를 병합
    this.state = { ...this.state, ...newState };
    this.updater(); // 변경된 상태를 반영하여 컴포넌트 업데이트
  }

  updater() {
    // 이전에 추가된 activeComponent가 있으면 제거
    if (this.activeComponentNode) {
      this.gridContainer.removeChild(this.activeComponentNode);
    }

    // 상태에 따라 새로운 activeComponent 추가
    let activeComponent;
    switch (this.state.activeOption) {
      case "Game":
        activeComponent = createComponent(GameOption, {});
        break;
      case "Account":
        activeComponent = createComponent(AccountOption, {});
        break;
      case "Credits":
        activeComponent = createComponent(CreditsOption, {});
        break;
    }

    // 새로운 activeComponent를 gridContainer에 추가
    this.activeComponentNode = activeComponent; // 추가된 컴포넌트의 레퍼런스를 저장
    this.gridContainer.appendChild(this.activeComponentNode);
  }

  render() {
    const container = document.createElement("div");
    container.className = "container mx-auto";

    // grid 레이아웃을 사용하는 컨테이너 생성
    this.gridContainer = document.createElement("div");
    this.gridContainer.className = "grid grid-cols-12 gap-10 min-h-screen";

    // BackIconButton 추가
    const backIcon = createComponent(BackIconButton, {});
    this.gridContainer.appendChild(backIcon);

    // 메뉴 버튼들을 포함할 div 생성
    const menuContainer = document.createElement("div");
    menuContainer.className =
      "col-start-3 mt-auto mb-auto w-[211px] h-72 flex-col justify-center items-start gap-12 inline-flex";

    // 메뉴 버튼들을 생성하고 이벤트 핸들러를 설정합니다.
    const options = ["Game", "Account", "Credits"];
    options.forEach((option) => {
      const button = createComponent(BasicButton, {
        text: option,
        onClick: () => this.setState({ activeOption: option }),
      });
      menuContainer.appendChild(button);
    });
    this.gridContainer.appendChild(menuContainer);

    this.updater();

    
    const popupProps = {
      title: "Logout",
      description: "Are you sure you want to logout? This cannot be undone.",
    };
    this.logoutPopup = createComponent(PopUp, popupProps);
    
    container.appendChild(this.gridContainer);
    container.appendChild(this.logoutPopup);
    return container;
  }
}

export default OptionsPage;
