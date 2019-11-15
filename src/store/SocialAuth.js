import axios from 'axios';
import qs from 'qs';
import { includes } from 'lodash-es';
import assert from 'simple-assert';
import { receiveMessages } from '@/postMessage';

const ALLOWED_STAGES = ['initial', 'requestLinking', 'success'];

export default {
  namespaced: true,

  state: {
    stage: 'initial',
    token: '',
    email: '',
    errorMessage: false,
    openedWindow: null,
    socialProviders: [],
  },

  mutations: {
    stage(state, value) {
      assert(
        includes(ALLOWED_STAGES, value),
        'SocialAuth stage value is incorrect',
      );
      state.stage = value;
    },
    token(state, value) {
      state.token = value;
    },
    email(state, value) {
      state.email = value;
    },
    errorMessage(state, value) {
      state.errorMessage = value;
    },
    openedWindow(state, value) {
      state.openedWindow = value;
    },
    socialProviders(state, value) {
      state.socialProviders = value;
    },
  },
  actions: {
    initState({
      rootGetters, rootState, state, commit,
    }) {
      commit('socialProviders', rootState.socialProviders);
      receiveMessages(
        'P1_AUTH_BACKEND',
        {
          SUCCESS: 'success',
          ERROR: 'error',
          LINK: 'link',
        },
        {
          LINK({ email, token } = {}) {
            commit('email', email);
            commit('token', token);
            commit('stage', 'requestLinking');
            state.openedWindow.close();
          },
          ERROR({ message } = {}) {
            commit('errorMessage', message);
            state.openedWindow.close();
          },
          SUCCESS({ token } = {}) {
            if (!state.openedWindow) {
              return;
            }
            state.openedWindow.close();
            axios.post(rootGetters.urls.apiLoginUrl, {
              challenge: rootState.challenge,
              token,
            }).then((response) => { window.location.href = response.data.url; });
          },
        },
      );
    },

    beginSocialAuth({
      commit, rootState, rootGetters,
    }, { key }) {
      commit('errorMessage', '');

      const params = qs.stringify({
        connection: key,
        client_id: rootState.clientId,
        redirect_uri: rootState.redirectUri,
      });

      const openedWindow = window.open(`${rootGetters.urls.apiSocialAuthUrl}?${params}`, '_blank');
      commit('openedWindow', openedWindow);
    },

    async linkProfiles({
      commit, state, rootState, rootGetters,
    }, { action, password }) {
      try {
        const query = {
          challenge: rootState.challenge,
          client_id: rootState.clientId,
          code: state.token,
          action,
          password: action === 'link' ? password : '',
          redirect_uri: rootState.redirectUri,
        };
        const { data } = await axios.get(
          `${rootGetters.urls.apiSocialAuthLinkUrl}?${qs.stringify(query)}`,
        );
        if (data.url) {
          window.location.href = data.url;
        }
        commit('stage', 'success');
        commit('errorMessage', '');
      } catch (error) {
        if (error.response) {
          commit('errorMessage', error.response.data);
        }
      }
    },
  },
};
