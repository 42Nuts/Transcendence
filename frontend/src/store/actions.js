export default {
  // Game Options
  updateProfile(context) {
    context.commit("updateProfile");
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
