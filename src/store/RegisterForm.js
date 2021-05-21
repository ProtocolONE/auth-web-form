import axios from 'axios';

export default {
  namespaced: true,

  state: {
    registerError: '',
  },

  mutations: {
    registerError(state, value) {
      state.registerError = value;
    },
    isRegistered(state, value) {
      state.isRegistered = value;
    },
  },

  actions: {
    async registerWithEmail({ commit, rootState, rootGetters }, { email, password, remember }) {
      try {
        await axios.post(rootGetters.urls.apiRegisterUrl, {
          challenge: rootState.challenge,
          email,
          password,
          remember: (remember === '1'),
        });
        commit('registerError', '');
      } catch (error) {
        if (error.response) {
          commit('registerError', error.response.data.error_message);
        }
      }
    },

    clearRegisterError({ commit }) {
      commit('registerError', '');
    },
  },
};
