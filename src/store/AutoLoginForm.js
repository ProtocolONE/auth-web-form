import axios from 'axios';

export default {
  namespaced: true,

  state: {
    authError: false,
  },

  mutations: {
    authError(state, value) {
      state.authError = value;
    },
  },

  actions: {
    async autoLogin({ commit, rootState, rootGetters }) {
      try {
        const { data } = await axios.post(rootGetters.urls.apiLoginUrl, {
          challenge: rootState.challenge,
          csrf: rootState.csrf,
          previousLogin: rootState.previousLogin,
        });
        commit('authError', '');
        window.location.href = data.url;
      } catch (error) {
        if (error.response) {
          commit('authError', error.response.data.error_message);
        }
      }
    },
  },
};
