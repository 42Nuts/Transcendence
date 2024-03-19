export default {
  updateNickname(context, payload) {
    context.commit("updateNickname", payload);
  },
  // Game Options
  updateTheme(context) {
    context.commit("updateTheme");
  },
  toggleDarkMode(context) {
    context.commit("toggleDarkMode");
  },
  // Profile
  updateProfile(context, payload) {
    context.commit("updateProfile", payload);
  },
  updateBackgroundColor(context, payload) {
    context.commit("updateBackgroundColor", payload);
  },
  // Account Options
  toggleLogout(context) {
    context.commit("toggleLogout");
  },
  toggleDeleteAccount(context) {
    context.commit("toggleDeleteAccount");
  },
  // Game Mode
  updateGameMode(context, payload) {
    context.commit("updateGameMode", payload);
  },
};
