import axios from 'axios';
import { includes } from 'lodash-es';
import assert from 'simple-assert';
import { postMessage, receiveMessages } from '@/postMessage';
import qs from 'qs';

const ALLOWED_STAGES = ['initial', 'requestLinking', 'success'];

export default {
  namespaced: true,

  state: {
    stage: 'initial',
    token: '',
    email: '',
    errorMessage: false,
    openedWindow: null,
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
  },
  actions: {
    initState({ state, commit }) {
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
          SUCCESS({ token, url } = {}) {
            if (!state.openedWindow) {
              return;
            }


            if (token) {
              commit('token', token);
            }
            commit('stage', 'success');

            if (url) {
              postMessage('REDIRECT_REQUESTED', url);
            }

            state.openedWindow.close();
          },
        },
      );
    },

    beginSocialAuth({
      commit, rootState, rootGetters,
    }, { connection }) {
      commit('errorMessage', '');

      const params = qs.stringify({
        connection,
        client_id: '5c221cde5ffa56fdd05257df',
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
          client_id: rootState.clientID,
          code: state.token,
          action,
          password: action === 'link' ? password : '',
          redirect_uri: rootState.redirectUri,
        };
        const { data } = await axios.get(
          `${rootGetters.urls.apiSocialAuthLinkUrl}?${qs.stringify(query)}`,
        );

        if (data.access_token) {
          commit('token', data.access_token);
        }
        if (data.url) {
          postMessage('REDIRECT_REQUESTED', data.url);
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
