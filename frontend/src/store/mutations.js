export default {
  // Game Options
  updateNickName(state) {
    state.nickName = (state.nickName + 1) % 5;
    return state;
  },
  updateTheme(state) {
    state.theme = (state.theme + 1) % 6;
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
    state.deleteAccount = !state.deleteAccount;
    return state;
  },
  // Game Mode
  updateGameMode(state, payload) {
    state.gameMode = payload;
    return state;
  },
};
