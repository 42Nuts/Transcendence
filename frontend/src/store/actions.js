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
  toggleAccountDelete(context) {
    context.commit("toggleAccountDelete");
  },
  // Game Mode
  updateGameMode(context) {
    context.commit("updateGameMode");
  },
};