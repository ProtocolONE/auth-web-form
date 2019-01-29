import Vue from 'vue';
import Vuex from 'vuex';
import AuthForm from './AuthForm';
import RegisterForm from './RegisterForm';
import Userinfo from './Userinfo';
import { postMessage } from '../postMessage';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lastSize: {
      width: 0,
      height: 0,
    },
    clientID: '5c221cde5ffa56fdd05257df',
    token: '',
    isLoading: false,
    isAuthorised: false,
    isRegistered: false,
  },
  mutations: {
    lastSize(state, value) {
      state.lastSize = value;
    },
    token(state, value) {
      state.token = value;
    },
    isLoading(state, value) {
      state.isLoading = value;
    },
    isAuthorised(state, value) {
      state.isAuthorised = value;
    },
    isRegistered(state, value) {
      state.isRegistered = value;
    },
  },
  actions: {
    reportResize({ state, commit }, newSize) {
      if (
        state.lastSize.width === newSize.width
        && state.lastSize.height === newSize.height
      ) {
        return;
      }
      postMessage('FORM_RESIZE', newSize);
      commit('lastSize', newSize);
    },

    setAuthorised({ commit }, value) {
      commit('isAuthorised', value);
    },

    setRegistered({ commit }, value) {
      commit('isRegistered', value);
    },

    setToken({ commit }, value) {
      commit('token', value);
    },

    setLoading({ commit }, value) {
      commit('isLoading', value);
    },
  },

  modules: {
    AuthForm,
    RegisterForm,
    Userinfo,
  },
});
