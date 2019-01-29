/**
 * App entry point
 */

// import * as Sentry from '@sentry/browser';
import Vue from 'vue';
import assert from 'assert';
import './plugins/vuelidate';
import App from './App.vue';
import store from './store/RootStore';
import i18n from './i18n';
import { postMessage, receiveMessages } from './postMessage';
import './globalComponents';
import './vueExtentions';

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
  // if (isPageInsideIframe && process.env.NODE_ENV === 'development') {
  //   assert(formData, 'The initial data supposed to be recieved through postMessage is not defined');
  // } else {
  //   assert(formData, 'Define "window.P1PAYONE_FORM_DATA" property to set initial data');
  // }
  assert(document.querySelector('#auth-form'), 'Define "#p1payone-form" element in the document');

  if (isPageInsideIframe) {
    document.body.classList.add('inside-iframe');
  }

  if (options.viewSize) {
    options.viewSize.forEach((item) => {
      document.body.classList.add(`size-${item}`);
    });
  }

  // await store.dispatch('AuthForm/initState', {
  //   formData,
  //   options: {
  //     ...options,
  //     isPageInsideIframe,
  //   },
  // });

  const language = getLanguage();
  const VueApp = Vue.extend(App);
  new VueApp({
    store,
    i18n: i18n(options.language || language),
  }).$mount('#auth-form');
}

postMessage('INITED');

if (isPageInsideIframe) {
  receiveMessages(window, {
    REQUEST_INIT_FORM(data = {}) {
      const { formData, options } = data;

      /**
       * Outside formData inserting is restricted in production mode
       */
      if (process.env.NODE_ENV === 'development') {
        mountApp(formData, options);
      } else {
        mountApp(window.P1PAYONE_FORM_DATA, options);
      }
    },
  });
} else {
  // Case where the form is opened by as actual page inside browser, not inside iframe
  mountApp(window.P1PAYONE_FORM_DATA);
}
