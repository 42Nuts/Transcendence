import { Router } from "./utils/index.js";
import {
  HomePage,
  OptionsPage,
  ProfilePage,
  GameModePage,
  LoadingPage,
} from "./pages/index.js";
import Component from "./core/component.js";

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
      "/gameMode/": GameModePage,
      "/loading/": LoadingPage,
      // "/game/": GamePage,
    });

    Object.values(this.router.routes).forEach((Page) => {
      if (Page.prototype instanceof Component) {
        Page.prototype.route = this.router.routePush.bind(this.router);
      }
    });

    this.router.init(el);
  }
}

export default App;
