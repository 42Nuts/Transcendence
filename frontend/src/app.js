import { Router } from "./utils/index.js";
import { HomePage, OptionsPage, ProfilePage, GamePage } from "./pages/index.js";

class App {
  constructor(props) {
    this.props = props;
  }

  async setup() {
    const { el } = this.props;

    this.router = new Router({
      "/home/": HomePage,
      "/options/": OptionsPage,
      "/profile/": ProfilePage,
      "/gameMode/": GamePage,
    });

    this.router.init(el);
  }
}

export default App;
