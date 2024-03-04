import { Component } from "../../core/index.js";

class CreditsOption extends Component {
  render() {
    const container = document.createElement("div");
    container.className =
      "col-end-8 mt-auto mb-auto w-[280px] h-[782px] flex-col justify-start items-center gap-8 inline-flex";

    // Logo
    const logoContainer = document.createElement("div");
    logoContainer.className =
      "w-[92px] h-[92px] px-[7.50px] pt-[4.50px] pb-[4.51px] justify-center items-center inline-flex";
    const logoImg = document.createElement("img");
    logoImg.src = "./src/assets/images/42Nuts-logo.svg";
    logoImg.className = "w-[80px] h-[80px]";
    logoContainer.appendChild(logoImg);
    container.appendChild(logoContainer);

    // Sections
    const sections = [
      { title: "Design Director", names: ["euiclee"] },
      { title: "Production", names: ["euiclee", "hyeoan", "taeypark", "yim"] },
      {
        title: "Programming",
        names: ["euiclee", "hyeoan", "taeypark", "yim", "jinheo"],
      },
      { title: "Produced by 42 Seoul", names: [] },
      { title: "Licenses", names: ["© 2024. 42Nuts."] },
    ];

    sections.forEach(({ title, names }) => {
      const section = document.createElement("div");
      section.className = "flex-col justify-start items-center gap-4 flex";

      const titleDiv = document.createElement("div");
      titleDiv.className =
        "text-primary-text text-2xl font-semibold font-['Inter']";
      titleDiv.textContent = title;
      section.appendChild(titleDiv);

      if (names.length) {
        const namesContainer = document.createElement("div");
        namesContainer.className =
          "flex-col justify-start items-center gap-2 flex";
        names.forEach((name) => {
          const nameDiv = document.createElement("div");
          nameDiv.className =
            "text-primary-text text-xl font-normal font-['Inter']";
          nameDiv.textContent = name;
          namesContainer.appendChild(nameDiv);
        });
        section.appendChild(namesContainer);
      }

      container.appendChild(section);
    });

    // GitHub icon for Licenses section
    const githubIconContainer = document.createElement("div");
    githubIconContainer.className = "w-[25px] h-[25px] relative";

    const githubIcon = document.createElement("div");
    githubIcon.className =
      "absolute inset-0 m-auto flex items-center justify-center bg-primary-text rounded-full";
    const githubImg = document.createElement("img");
    githubImg.src = "./src/assets/images/icon-github.svg";
    githubImg.className = "w-[20px] h-[20px]";
    githubIcon.appendChild(githubImg);
    githubIconContainer.appendChild(githubIcon);
    // Assuming the last section is Licenses and it should contain the GitHub icon
    container.lastChild.lastChild.appendChild(githubIconContainer);
    // Change lastChild class flex-col to flex-row
    container.lastChild.lastChild.className =
      "flex-row justify-start items-center gap-2 flex";

    // click event for GitHub icon
    githubIconContainer.addEventListener("click", () => {
      window.open("https://github.com/42Nuts/Transcendence", "_blank");
    });

    return container;
  }
}

export default CreditsOption;
