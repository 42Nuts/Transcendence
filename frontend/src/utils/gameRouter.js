import { createComponent } from "../core/index.js";

class GameRouter {
  constructor(props) {
    this.routes = props;
  }

  getComponent(gameMode) {
    const Component = this.routes[gameMode];
    if (Component) {
      return createComponent(Component, {});
    } else {
      console.error("Invalid game mode: ", gameMode);
      return null;
    }
  }
}

export default GameRouter;