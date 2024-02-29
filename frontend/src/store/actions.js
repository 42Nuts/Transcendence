export default {
  // Game Options
  updateNickName(context) {
    context.commit("updateNickName");
  },
  updateTheme(context) {
    context.commit("updateTheme");
  },
  toggleDarkMode(context) {
    context.commit("toggleDarkMode");
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