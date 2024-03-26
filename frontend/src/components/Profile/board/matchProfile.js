import { Component } from "../../../core/index.js";

class MatchProfile extends Component {
  render() {
    const container = document.createElement("div");
    container.className = "min-w-11 h-[54px] flex flex-col items-center justify-start";

    const profile = document.createElement("img");
    profile.src = this.props.src;
    profile.className = "w-10 h-10 justify-center items-center inline-flex";

    const name = document.createElement("div");
    name.className = "text-primary-text text-[10px] font-bold font-['Inter']";
    name.innerHTML = this.props.name;

    container.appendChild(profile);
    container.appendChild(name);

    return container;
  }
}

export default MatchProfile;