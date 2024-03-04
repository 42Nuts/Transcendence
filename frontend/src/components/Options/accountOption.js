import { Component, createComponent } from "../../core/index.js";
import { ExitOption } from "./Account/index.js";

class AccountOption extends Component {
  render() {
    const container = document.createElement("div");
    container.className =
      "col-end-8 mt-auto mb-auto w-[416px] h-44 flex-col justify-start items-end gap-8 inline-flex";

    // Logout 옵션
    const logoutOption = createComponent(ExitOption, {
      text: "Logout",
      iconSrc: "./src/assets/images/icon-logout.svg",
      bgColorClass: "bg-primary-text",
      optionName: "toggleLogout",
    });

    // Delete account 옵션
    const deleteAccountOption = createComponent(ExitOption, {
      text: "Delete account",
      iconSrc: "./src/assets/images/icon-delete.svg",
      bgColorClass: "bg-primary-logo",
      optionName: "toggleDeleteAccount",
    });

    container.appendChild(logoutOption);
    container.appendChild(deleteAccountOption);

    return container;
  }
}

export default AccountOption;
