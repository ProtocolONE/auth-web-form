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
    async registerWithEmail({ commit, rootState, rootGetters }, { username, password, remember }) {
      try {
        const { data } = await axios.post(rootGetters.urls.apiRegisterUrl, {
          challenge: rootState.challenge,
          email: username,
          password,
          remember: (remember === '1'),
        });
        commit('registerError', '');
        window.location.href = data.url;
      } catch (error) {
        if (error.response) {
          commit('registerError', error.response.data.error_message);
        }
      }
    },
  },
};
