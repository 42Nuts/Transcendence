import { Component, createComponent } from "../core/index.js";
import { BackIconButton } from "../components/Button/index.js";
import Store from "../store/index.js";

class ProfilePage extends Component {
  render() {
    this.container = document.createElement("div");
    this.container.className = "flex items-center justify-center min-h-screen bg-no-repeat bg-cover";
    if (Store.state.darkMode) {
      this.container.style.backgroundImage = 'url("/static/assets/images/net-dark.svg")';
    } else {
      this.container.style.backgroundImage = 'url("/static/assets/images/net.svg")';
    }
    this.container.style.backgroundPosition = "calc(100% - 680px) center";

    // grid 레이아웃을 사용하는 컨테이너 생성
    const gridContainer = document.createElement("div");
    gridContainer.className = "grid grid-cols-12 gap-10 min-h-screen";

    // BackIconButton 추가
    const backIcon = createComponent(BackIconButton, {});
    gridContainer.appendChild(backIcon);


    this.container.appendChild(gridContainer);
    return this.container;
  }
}

export default ProfilePage;
