import { Component } from "../../core/index.js";

class AccountOption extends Component {
  render() {
    const container = document.createElement("div");
    container.className =
      "col-end-8 mt-auto mb-auto w-[416px] h-44 flex-col justify-start items-end gap-8 inline-flex";

    // Logout 옵션
    const logoutOption = this.createOption(
      "Logout",
      "./src/assets/images/icon-logout.svg",
      "bg-primary-text"
    );
    container.appendChild(logoutOption);

    // Delete account 옵션
    const deleteAccountOption = this.createOption(
      "Delete account",
      "./src/assets/images/icon-delete.svg",
      "bg-primary-logo"
    );
    container.appendChild(deleteAccountOption);

    return container;
  }

  createOption(text, iconSrc, bgColorClass) {
    const option = document.createElement("div");
    option.className = "justify-start items-center gap-10 inline-flex";

    const optionText = document.createElement("div");
    optionText.className =
      "text-center text-primary-text text-[40px] font-semibold font-['Inter'] leading-10";
    optionText.textContent = text;

    const iconContainer = document.createElement("div");
    iconContainer.className = "w-[72px] h-[72px] relative";

    const iconBg = document.createElement("div");
    iconBg.className = `absolute inset-0 m-auto flex items-center justify-center ${bgColorClass} rounded-full`;

    const iconImage = document.createElement("img");
    iconImage.src = iconSrc;
    iconImage.className = "w-[48px] h-[48px]";

    iconBg.appendChild(iconImage);
    iconContainer.appendChild(iconBg);
    option.appendChild(optionText);
    option.appendChild(iconContainer);

    return option;
  }
}

export default AccountOption;
