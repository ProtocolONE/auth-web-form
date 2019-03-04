import axios from 'axios';
import { postMessage } from '@/postMessage';

export default {
  namespaced: true,

  state: {
    authError: false,
    isAuthorised: false,
  },

  mutations: {
    authError(state, value) {
      state.authError = value;
    },
    isAuthorised(state, value) {
      state.isAuthorised = value;
    },
  },

  actions: {
    async authoriseWithLogin({ commit, rootState, rootGetters }, { username, password }) {
      try {
        const { data } = await axios.post(rootGetters.urls.apiLoginUrl, {
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
        commit('authError', '');
      } catch (error) {
        if (error.response) {
          commit('authError', error.response.data.error_message);
        }
      }
    },
  },
};
