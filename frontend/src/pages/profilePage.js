import { Component } from "../core/index.js";
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
    this.container.style.backgroundPosition = "calc(100% + 390px) center";

    return this.container;
  }
}

export default ProfilePage;
