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
    async authoriseWithLogin({ commit, rootState, rootGetters }, { email, password, remember }) {
      try {
        const { data } = await axios.post(rootGetters.urls.apiLoginUrl, {
          challenge: rootState.challenge,
          connection: 'password',
          email,
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

    async autoLogin({ commit, rootState, rootGetters }, { previousLogin }) {
      try {
        const { data } = await axios.post(rootGetters.urls.apiLoginUrl, {
          challenge: rootState.challenge,
          previousLogin,
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
