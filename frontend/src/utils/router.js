class Router {
  constructor(routes) {
    if (!routes) {
      console.error("routes가 필요합니다.");
    }
    this.routes = routes;
  }

  init(rootElementId) {
    if (!rootElementId) {
      console.error("rootElementId가 필요합니다.");
      return null;
    }
    this.rootElementId = rootElementId;

    this.routing(window.location.pathname);

    window.addEventListener('click', (e) => {
      if (e.target.closest('a')) {
        e.preventDefault();
        this.routePush(e.target.closest('a').href);
      }
    });

    window.onpopstate = () => this.routing(window.location.pathname);
  }

  routePush(pathname) {
    window.history.pushState({}, null, pathname);
    this.routing(window.location.pathname);
  }

  routing(pathname) {
    let page = '';

    if (this.routes[pathname]) {
      const component = new this.routes[pathname]();
      page = component.initialize();
    }

    if (page) {
      this.render(page);
    }
  }

  render(page) {
    const rootElement = document.querySelector(this.rootElementId);
    rootElement.innerHTML = '';
    rootElement.appendChild(page);
  }
}

export default Router;
