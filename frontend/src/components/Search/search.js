import { Component } from "../../core/index.js";

class Search extends Component {
  render() {
    const container = document.createElement("div");
    container.className = "w-80 h-[39px] px-[18px] py-1.5 bg-white rounded-[66.75px] border border-primary-text justify-between items-center inline-flex";

    const input = document.createElement("input");
    input.className = "opacity-50 text-primary-text text-lg font-medium font-['Inter'] outline-none";
    input.setAttribute("type", "text");
    input.setAttribute("maxlength", "10");
    input.setAttribute("placeholder", "search");

    const iconContainer = document.createElement("button");
    iconContainer.className = "w-[27px] h-[27px] relative opacity-50";

    const icon = document.createElement("div");
    icon.className = "w-[27px] h-[27px] left-0 top-0 absolute bg-primary-text rounded-full";

    const iconImage = document.createElement("img");
    iconImage.className = "w-[18px] h-[18px] left-[4.50px] top-[4.50px] absolute";
    iconImage.src = "/static/assets/images/icon-search.svg";

    icon.appendChild(iconImage);
    iconContainer.appendChild(icon);

    container.appendChild(input);
    container.appendChild(iconContainer);

    return container;
  }
}

export default Search;