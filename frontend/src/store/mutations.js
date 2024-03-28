export default {
  updateNickname(state, payload) {
    state.nickname = payload;
    return state;
  },
  // Game Options
  updateTheme(state) {
    state.theme = (state.theme + 1) % 6;
    return state;
  },
  toggleDarkMode(state) {
    state.darkMode = !state.darkMode;
    return state;
  },
  // Profile
  updateProfile(state, payload) {
    state.profile = payload;
    return state;
  },
  updateBackgroundColor(state, payload) {
    state.background = payload;
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
  updateGameStart(state) {
    state.gameStart = !state.gameStart;
    return state;
  },
  updateTournamentMode(state, payload) {
    if (payload == 0) {
      state.tournamentMode = 0;
    } else {
      state.tournamentMode = (state.tournamentMode + 1) % 3;
    }
    return state;
  },
  updateNextRoom(state, payload) {
    state.nextRoom = payload;
    return state;
  },
};
