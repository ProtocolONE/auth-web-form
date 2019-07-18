import Vue from 'vue'
import VueI18n from 'vue-i18n'

import ru from '@/i18n/locales/ru'
import en from '@/i18n/locales/en'

let defaultLocale = 'en'
let currentLocale = defaultLocale

if (navigator && navigator.language) {
  currentLocale = navigator.language.slice(0, 2)
}

export { currentLocale as locale }
export default function (locale = currentLocale) {
  Vue.use(VueI18n)
  return new VueI18n({
    locale: locale,
    fallbackLocale: defaultLocale,
    messages: {
      en,
      ru
    }
  })
}
