const createComponent = (Component, props) => {
  const component = new Component(props);
  return component.initialize();
};

export default createComponent;
