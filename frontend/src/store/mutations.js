export default {
  // Game Options
  updateNickName(state) {
    state.nickName += 1;
    return state;
  },
  updateTheme(state) {
    state.theme += 1;
    return state;
  },
  toggleDarkMode(state) {
    state.darkMode = !state.darkMode;
    return state;
  },
  // Account Options
  toggleLogout(state) {
    state.logout = !state.logout;
    return state;
  },
  toggleDeleteAccount(state) {
    state.accountDelete = !state.accountDelete;
    return state;
  },
  // Game Mode
  updateGameMode(state) {
    state.gameMode += 1;
    return state;
  },
};
