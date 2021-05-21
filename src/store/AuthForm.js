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
        await axios.post(rootGetters.urls.apiLoginUrl, {
          challenge: rootState.challenge,
          connection: 'password',
          email,
          password,
          remember: (remember === '1'),
        });
        commit('authError', '');
      } catch (error) {
        if (error.response) {
          commit('authError', error.response.data.error_message);
        }
      }
    },

    async autoLogin({ commit, rootState, rootGetters }, { previousLogin }) {
      try {
        await axios.post(rootGetters.urls.apiLoginUrl, {
          challenge: rootState.challenge,
          previousLogin,
        });
        commit('authError', '');
      } catch (error) {
        if (error.response) {
          commit('authError', error.response.data.error_message);
        }
      }
    },

    clearAuthError({ commit }) {
      commit('authError', '');
    },
  },
};
