import axios from 'axios';
import { postMessage } from '@/postMessage';

export default {
  namespaced: true,

  state: {
    token: '',
    authError: false,
    userinfo: null,
    isAuthorised: false,
  },

  mutations: {
    token(state, value) {
      state.token = value;
    },
    authError(state, value) {
      state.authError = value;
    },
    userinfo(state, value) {
      state.userinfo = value;
    },
    isAuthorised(state, value) {
      state.isAuthorised = value;
    },
  },

  actions: {
    async authoriseWithLogin({ commit, rootState, rootGetters }, { username, password }) {
      try {
        const { data } = await axios.post(rootGetters.urls.apiLoginUrl, {
          client_id: rootState.clientID,
          connection: 'password',
          email: username,
          password,
          redirect_uri: rootState.redirectUri,
        });

        if (data.access_token) {
          commit('token', data.access_token);
        }
        if (data.url) {
          postMessage('REDIRECT_REQUESTED', data.url);
        }
        commit('isAuthorised', true);
        commit('authError', '');
      } catch (error) {
        if (error.response) {
          commit('authError', error.response.data.error);
        }
      }
    },
  },
};
