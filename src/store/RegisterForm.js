import axios from 'axios';
// import { throttle } from 'lodash-es';

// function redirectToLogin(url) {
//   window.location.replace(url);
// }

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
        commit('registerError', '');
        const { data } = await axios.post(rootGetters.urls.apiRegisterUrl, {
          challenge: rootState.challenge,
          email,
          password,
          remember: (remember === '1'),
        });
        return data.url;
        // const throttled = throttle(redirectToLogin(data.url), 100);
        // throttled();
      } catch (error) {
        if (error.response) {
          commit('registerError', error.response.data.error_message);
        }
        return '';
      }
    },

    clearRegisterError({ commit }) {
      commit('registerError', '');
    },
  },
};
