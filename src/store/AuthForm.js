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
    async authoriseWithLogin({ commit, rootState, rootGetters }, { username, password, remember }) {
      try {
        const { data } = await axios.post(rootGetters.urls.apiLoginUrl, {
          challenge: rootState.challenge,
          connection: 'password',
          email: username,
          password,
          remember: (remember === '1'),
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
