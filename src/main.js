/**
 * App entry point
 */

// import * as Sentry from '@sentry/browser';
import Vue from 'vue';
import { includes } from 'lodash-es';
import assert from 'assert';
import './plugins/vuelidate';
import axios from 'axios';
import App from './App.vue';
import store from './store/RootStore';
import i18n from './i18n';
import { postMessage, receiveMessages } from './postMessage';
import './globalComponents';
import './vueExtentions';

axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = '_csrf';
axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';

// if (process.env.NODE_ENV === 'production') {
//   Sentry.init({
//     dsn: 'https://3e4a24900f064243a9de45162660a66d@sentry.tst.protocol.one/3',
//     integrations: [new Sentry.Integrations.Vue({ Vue })],
//   });
// }

Vue.config.productionTip = false;

const isPageInsideIframe = window.location !== window.parent.location;

/**
 * Cuts out language 2-letters code from navigator.language
 *
 * @return {String}
 */
function getLanguage() {
  if (navigator && navigator.language) {
    return navigator.language.slice(0, 2);
  }
  return 'en';
}

/**
 * Mounts the app into element
 *
 * @param {Object} formData
 * @param {Object} options
 */
async function mountApp(formData = {}, options = {}) {
  let mode = 'login';
  assert(document.querySelector('#auth-form'), 'Define "#auth-form" element in the document');
  if (formData.success === undefined && options.action !== 'changePassword') {
    assert(formData.challenge, 'Login challenge in required at mountApp');
  }
  if (options.action === 'changePassword') {
    assert(formData.clientId, 'Client ID in required at mountApp');
  }

  if (isPageInsideIframe) {
    document.body.classList.add('inside-iframe');
  }

  if (options.viewSize) {
    options.viewSize.forEach((item) => {
      document.body.classList.add(`size-${item}`);
    });
  }

  if (window.AUTH_CHANGE_PASSWORD !== undefined) {
    mode = 'changePassword';
  }
  await store.dispatch('initState', {
    formData,
    options: {
      ...options,
      isPageInsideIframe,
      apiUrl: options.apiUrl || window.AUTH_API_URL,
      mode,
    },
  });

  const language = getLanguage();

  if (includes([
    '5d81e74895f3f60001874ab1', // production app
    '5d2efdbb0f98f200016ee285', // stg app
    '5c77953f51c0950001436152', // test app
    '5dcaf274acda5200db813482', // local/dev app
  ], formData.clientId)) {
    Vue.prototype.$view = 'PaySuper';
  } else {
    Vue.prototype.$view = 'Common';
  }

  const VueApp = Vue.extend(App);
  new VueApp({
    store,
    i18n: i18n(options.language || language),
  }).$mount('#auth-form');
}

let selfInitTimeout;
receiveMessages(
  'P1_AUTH_WEB_SDK',
  {
    REQUEST_INIT_FORM: 'requestInitForm',
  },
  {
    REQUEST_INIT_FORM(data = {}) {
      const { formData, options } = data;
      if (window.AUTH_LOGOUT !== undefined) {
        postMessage('LOGOUT_PROCESSED', window.AUTH_LOGOUT);
        return;
      }
      if (window.AUTH_CALLBACK_PAYLOAD !== undefined) {
        postMessage('TOKEN_RECEIVED', window.AUTH_CALLBACK_PAYLOAD);
        return;
      }
      /**
       * Outside formData inserting is restricted in production mode
       */
      if (process.env.NODE_ENV === 'development') {
        mountApp(formData, options);
      } else {
        const initData = window.AUTH_CHANGE_PASSWORD || window.AUTH_FORM_DATA;
        mountApp(
          initData,
          options,
        );
      }

      clearTimeout(selfInitTimeout);
    },
  },
);
postMessage('INITED');

selfInitTimeout = setTimeout(() => {
  mountApp(
    window.AUTH_FORM_DATA,
    {
      isModal: false,
    },
  );
}, 100);
