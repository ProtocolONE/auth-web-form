import axios from 'axios';
import { postMessage } from '@/postMessage';

export default {
  namespaced: true,

  state: {
    token: '',
    registerError: '',
    isRegistered: false,
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
    async registerWithEmail({ commit, rootState, rootGetters }, { username, password }) {
      try {
        const { data } = await axios.post(rootGetters.urls.apiRegisterUrl, {
          challenge: rootState.challenge,
          connection: 'password',
          email: username,
          password,
          csrf: rootState.csrf,
        });
        if (rootState.isPageInsideIframe) {
          postMessage('REDIRECT_REQUESTED', data.url);
        } else {
          window.location.href = data.url;
        }
        commit('registerError', '');
      } catch (error) {
        if (error.response) {
          commit('registerError', error.response.data.error_message);
        }
      }
    },
  },
};
