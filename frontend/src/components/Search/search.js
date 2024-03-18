import { Component } from "../../core/index.js";

class Search extends Component {
  render() {
    const container = document.createElement("div");
    container.className = "w-[466px] px-6 py-2 bg-white rounded-[89px] border-2 border-primary-text justify-between items-center inline-flex";

    const input = document.createElement("input");
    input.className = "w-full opacity-50 text-primary-text text-2xl font-medium font-['Inter'] outline-none";
    input.setAttribute("type", "text");
    input.setAttribute("maxlength", "10");
    input.setAttribute("placeholder", "search");

    const iconContainer = document.createElement("div");
    iconContainer.className = "w-9 h-9 relative opacity-50";

    const icon = document.createElement("div");
    icon.className = "w-9 h-9 left-0 top-0 absolute bg-primary-text rounded-full";

    const iconImage = document.createElement("img");
    iconImage.className = "w-6 h-6 left-[6px] top-[6px] absolute";
    iconImage.src = "/static/assets/images/icon-search.svg";

    icon.appendChild(iconImage);
    iconContainer.appendChild(icon);

    container.appendChild(input);
    container.appendChild(iconContainer);

    return container;
  }
}

export default Search;