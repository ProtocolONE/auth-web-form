import axios from 'axios';

export default {
  namespaced: true,

  state: {
    token: '',
    registerError: '',
    isRegistered: false,
  },

  mutations: {
    token(state, value) {
      state.token = value;
    },
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
          client_id: rootState.clientID,
          connection: 'password',
          email: username,
          password,
        });
        if (data.access_token) {
          commit('token', data.access_token);
        }
        if (data.url) {
          window.location.href = data.url;
        }
        commit('isRegistered', true);
        commit('registerError', '');
      } catch (error) {
        if (error.response) {
          commit('authError', error.response.data.error);
        }
      }
    },
  },
};
