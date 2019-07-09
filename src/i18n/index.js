import Vue from 'vue'
import VueI18n from 'vue-i18n'

import ru from './locales/ru'
import en from './locales/en'

let defaultLocale = 'en'
let currentLocale = defaultLocale

// --- TODO: убрать коммент при пуше
// if (navigator && navigator.language) {
//   currentLocale = navigator.language.slice(0, 2)
// }

Vue.use(VueI18n)

export const locale = currentLocale
export default new VueI18n({
  locale: currentLocale,
  fallbackLocale: defaultLocale,
  messages: {
    en,
    ru
  }
})
