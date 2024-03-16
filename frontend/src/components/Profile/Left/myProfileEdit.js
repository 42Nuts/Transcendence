import { Component, createComponent } from "../../../core/index.js";
import { IconButton, moveButton } from "../../../components/Button/index.js";
import { LeftBoard } from "../board/index.js";
import { profileImages } from "../../../config/index.js";
import Store from "../../../store/index.js";

class MyProfileEdit extends Component {
  constructor(props) {
    super(props);

    Store.events.subscribe("profileChange", this.updateProfile.bind(this));
  }

  updateProfile() {
    const profileImage = document.getElementById("profileImage");
    if (profileImage) {
      profileImage.src = profileImages[Store.state.profile];
    }
  }

  render() {
    const container = document.createElement("div");
    container.className = "col-start-6 col-span-3 relative w-[296px] h-[632px]";

    // card board
    const board = createComponent(LeftBoard, {});

    // edit option
    const optionContainer = document.createElement("div");
    optionContainer.className =
      "left-[81px] top-[351px] absolute flex-col justify-start items-start gap-8 inline-flex";

    const profileEdit = document.createElement("div");
    profileEdit.className = "flex-col justify-center items-center gap-2.5 flex";

    const profileEditTitle = document.createElement("div");
    profileEditTitle.className =
      "text-primary-text text-sm font-semibold font-['Inter']";
    profileEditTitle.innerText = "Profile Icon";

    const profileMove = createComponent(moveButton, {
      activeIndex: Store.state.profile,
      dispatch: "updateProfile",
    });

    profileEdit.appendChild(profileEditTitle);
    profileEdit.appendChild(profileMove);

    const line = document.createElement("img");
    line.src = "/static/assets/images/line-profile.svg";

    const backgroundEdit = document.createElement("div");
    backgroundEdit.className =
      "flex-col justify-center items-center gap-2.5 flex";

    const backgroundEditTitle = document.createElement("div");
    backgroundEditTitle.className =
      "text-primary-text text-sm font-semibold font-['Inter']";
    backgroundEditTitle.innerText = "Background Color";

    const backgroundMove = createComponent(moveButton, {
      activeIndex: Store.state.background,
      dispatch: "updateBackgroundColor",
    });

    backgroundEdit.appendChild(backgroundEditTitle);
    backgroundEdit.appendChild(backgroundMove);

    optionContainer.appendChild(profileEdit);
    optionContainer.appendChild(line);
    optionContainer.appendChild(backgroundEdit);

    // profile image
    const profileContainer = document.createElement("div");
    profileContainer.className =
      "w-36 h-36 left-[76px] top-[68px] absolute justify-center items-center inline-flex";

    const profileImage = document.createElement("img");
    profileImage.id = "profileImage";
    profileImage.src = profileImages[Store.state.profile];
    profileImage.className = "w-36 h-36 relative";

    profileContainer.appendChild(profileImage);

    // upload button
    const uploadContainer = document.createElement("div");
    uploadContainer.className =
      "p-1 left-[176px] top-[168px] absolute justify-start items-start gap-2.5 inline-flex";

    const uploadButton = createComponent(IconButton, {
      iconSrc: "/static/assets/images/icon-upload.svg",
      bgColorClass: "bg-primary-text",
      containerWidth: "w-9",
      containerHeight: "h-9",
      iconWidth: "w-6",
      iconHeight: "h-6",
    });

    uploadContainer.appendChild(uploadButton);

    // close button
    const closeContainer = document.createElement("div");
    closeContainer.className =
      "p-2 left-[244px] top-0 absolute justify-start items-start gap-2.5 inline-flex";

    const closeButton = createComponent(IconButton, {
      iconSrc: "/static/assets/images/icon-close.svg",
      bgColorClass: "bg-primary-text",
      containerWidth: "w-9",
      containerHeight: "h-9",
      iconWidth: "w-6",
      iconHeight: "h-6",
      onClick: this.props.onCancel,
    });

    closeContainer.appendChild(closeButton);

    container.appendChild(board);
    container.appendChild(optionContainer);
    container.appendChild(profileContainer);
    container.appendChild(uploadContainer);
    container.appendChild(closeContainer);

    return container;
  }
}

export default MyProfileEdit;
