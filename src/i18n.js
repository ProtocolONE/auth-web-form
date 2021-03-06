/**
 * Подключение модуля интернационализации
 */

import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { set, reverse } from 'lodash-es';

Vue.use(VueI18n);

function loadLocaleMessages() {
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i);
  const messages = {};
  locales.keys().forEach((key) => {
    const [filename, view] = reverse(key.split('/'));
    const matched = filename.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const [, locale] = matched;
      set(messages, [locale, view].filter(item => item && item !== '.'), locales(key));
    }
  });
  return messages;
}

const fallbackLocale = process.env.VUE_APP_I18N_FALLBACK_LOCALE;
export default function (locale) {
  return new VueI18n({
    fallbackLocale,
    locale: locale || fallbackLocale,
    messages: loadLocaleMessages(),
    silentTranslationWarn: true,
  });
}
