import { Component, createComponent } from "../../../core/index.js";
import { MatchProfile } from "./index.js";
import { profileImages } from "../../../config/index.js";
import Store from "../../../store/index.js";

class MatchBoard extends Component {
  render() {
    const container = document.createElement("div");
    container.className = "w-[359px] h-[93px] flex-col justify-start items-center flex"

    const upper = document.createElement("div");
    upper.className = "self-stretch px-[15px] py-1 bg-primary-inner_card_top rounded-tl-xl rounded-tr-xl justify-center items-center gap-[83px] inline-flex"

    const gameMode = document.createElement("div");
    gameMode.className = "text-primary-text text-xs font-semibold font-['Inter'] absolute left-4";
    gameMode.innerText = this.props.gameMode;

    const gameResult = document.createElement("div");
    gameResult.className = "text-center text-primary-color4 text-xs font-black font-['Inter'";
    gameResult.innerText = this.props.gameResult;

    upper.appendChild(gameMode);
    upper.appendChild(gameResult);

    const lower = document.createElement("div");
    lower.className = "w-[359px] px-24 py-2 bg-primary-inner_card_board rounded-bl-xl rounded-br-xl justify-center items-center gap-6 inline-flex"

    const me = createComponent(MatchProfile, {
      src: profileImages[Store.state.profile],
      name: Store.state.nickname,
    });

    const vs = document.createElement("div");
    vs.className = "text-2xl font-black font-['Inter'] text-primary-text";
    vs.innerHTML = "VS";

    const opponent = createComponent(MatchProfile, {
      src: "/static/assets/images/profile-taeypark.svg",
      name: "euiclee",
    });

    lower.appendChild(me);
    lower.appendChild(vs);
    lower.appendChild(opponent);

    container.appendChild(upper);
    container.appendChild(lower);
    return container;
  }
}

export default MatchBoard;