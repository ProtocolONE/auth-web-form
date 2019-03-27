import Vue from 'vue';
import Vuex from 'vuex';
import assert from 'simple-assert';
import axios from 'axios';
import qs from 'qs';
import AuthForm from './AuthForm';
import RegisterForm from './RegisterForm';
import AutoLoginForm from './AutoLoginForm';
import Userinfo from './Userinfo';
import SocialAuth from './SocialAuth';
import ChangePassword from './ChangePassword';
import { postMessage } from '@/postMessage';
import getFunctionalUrls from '@/getFunctionalUrls';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lastSize: {
      width: 0,
      height: 0,
    },
    challenge: '',
    token: '',
    clientId: '',
    isLoading: false,
    isModal: false,
    apiUrl: undefined,
    previousLogin: '',
    mode: 'login',
  },
  getters: {
    urls(state) {
      return getFunctionalUrls(state.apiUrl);
    },
  },
  mutations: {
    lastSize(state, value) {
      state.lastSize = value;
    },
    challenge(state, value) {
      state.challenge = value;
    },
    csrf(state, value) {
      state.csrf = value;
    },
    clientId(state, value) {
      state.clientId = value;
    },
    previousLogin(state, value) {
      state.previousLogin = value;
    },
    mode(state, value) {
      state.mode = value;
    },
    token(state, value) {
      state.token = value;
      postMessage('TOKEN_RECEIVED', value);
    },
    isLoading(state, value) {
      state.isLoading = value;
    },
    isModal(state, value) {
      state.isModal = value;
    },
    apiUrl(state, value) {
      state.apiUrl = value;
    },
  },
  actions: {
    initState({ commit }, { formData, options }) {
      if (formData.success === undefined && options.mode === 'login') {
        const { challenge, csrf } = formData;
        assert(challenge, 'challenge is undefined at RootStore');
        assert(csrf, 'csrf is undefined at RootStore');
      }
      if (options.mode === 'changePassword') {
        const { clientId } = formData;
        assert(clientId, 'clientId is undefined at RootStore');
      }
      commit('challenge', formData.challenge);
      commit('csrf', formData.csrf);
      commit('clientId', formData.clientId);
      commit('previousLogin', formData.previousLogin);
      commit('isModal', options.isModal);
      commit('apiUrl', options.apiUrl);
      commit('mode', options.mode);
    },

    async logout({ getters }) {
      try {
        const query = {
          redirect_uri: 'http://localhost:8080/?logout=success',
        };
        await axios.get(
          `${getters.urls.apiLogoutUrl}?${qs.stringify(query)}`,
        );
        // eslint-disable-next-line
      } catch (error) { }
    },

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

    setToken({ state, commit }, value) {
      if (state.token === value) {
        return;
      }
      commit('token', value);
    },

    setLoading({ commit }, value) {
      commit('isLoading', value);
    },
  },

  modules: {
    AuthForm,
    RegisterForm,
    AutoLoginForm,
    Userinfo,
    SocialAuth,
    ChangePassword,
  },
});
