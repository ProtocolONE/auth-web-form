import axios from 'axios';
import { apiLoginUrl } from '../functionalUrls';

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
    async authoriseWithLogin({ commit }, { clientID, username, password }) {
      try {
        const { data } = await axios.post(apiLoginUrl, {
          client_id: clientID,
          connection: 'password',
          email: username,
          password,
        });

        commit('token', data.access_token);
        commit('isAuthorised', true);
        commit('authError', '');
      } catch (error) {
        commit('authError', error.response.data.error);
      }
    },
  },
};
